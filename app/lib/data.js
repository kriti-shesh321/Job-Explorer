import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

const ITEMS_PER_PAGE = 8;
export async function getFilteredJobs(query, currentPage, filters = {}) {
    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const conditions = [];

        if (query) {
            conditions.push(sql`
            (
                job_titles.name ILIKE ${`%${query}%`} OR 
                job_categories.name ILIKE ${`%${query}%`} OR
                companies.name ILIKE ${`%${query}%`} OR
                EXISTS (
                    SELECT 1 FROM job_tag_mappings jtm
                    JOIN job_tags jt ON jt.id = jtm.tag_id
                    WHERE jtm.job_id = jobs.id AND jt.name ILIKE ${`%${query}%`}
                )
            )
        `);
        }

        if (filters.category_id) {
            conditions.push(sql`jobs.category_id = ${filters.category_id}`);
        }

        if (filters.location?.length) {
            conditions.push(sql`jobs.location = ANY(${filters.location})`);
        }

        if (filters.type?.length) {
            conditions.push(sql`jobs.type = ANY(${filters.type})`);
        }

        if (filters.tag_ids?.length) {
            conditions.push(sql`
                EXISTS (
                SELECT 1 FROM job_tag_mappings jtm
                WHERE jtm.job_id = jobs.id AND jtm.tag_id = ANY(${filters.tag_ids})
                )
            `);
        }

        if (filters.posted) {
            const now = new Date();
            let pastDate;

            if (filters.posted === '1d') pastDate = new Date(now.setDate(now.getDate() - 1));
            if (filters.posted === '7d') pastDate = new Date(now.setDate(now.getDate() - 7));
            if (filters.posted === '30d') pastDate = new Date(now.setDate(now.getDate() - 30));

            if (pastDate) {
                conditions.push(sql`jobs.posted_at >= ${pastDate}`);
            }
        }

        const whereClause = conditions.length
            ? sql`WHERE ${conditions.reduce((acc, curr, i) =>
                i === 0 ? curr : sql`${acc} AND ${curr}`
            )}`
            : sql``;


        const data = await sql`
            SELECT
                jobs.id,
                jobs.description,
                jobs.roles_and_responsibilities,
                jobs.location,
                jobs.type,
                jobs.posted_at,
                jobs.salary_type,
                jobs.salary_amount,
                jobs.salary_currency,
                jobs.salary_period,
                companies.id AS company_id,
                companies.name AS company_name,
                companies.logo_url AS company_logo_url,
                companies.website AS company_website,
                job_categories.id AS category_id,
                job_categories.name AS category_name,
                job_categories.icon AS category_icon,
                job_titles.id AS title_id,
                job_titles.name AS title_name,
                ARRAY_AGG(job_tags.name) AS tag_names,
                ARRAY_AGG(job_tags.id) AS tag_ids
                FROM jobs
                JOIN companies ON jobs.company_id = companies.id
                JOIN job_categories ON jobs.category_id = job_categories.id
                JOIN job_titles ON jobs.title_id = job_titles.id
                LEFT JOIN job_tag_mappings ON jobs.id = job_tag_mappings.job_id
                LEFT JOIN job_tags ON job_tag_mappings.tag_id = job_tags.id
                ${whereClause}
                GROUP BY
                    jobs.id, companies.id, job_categories.id, job_titles.id
                ORDER BY jobs.posted_at DESC
                LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch jobs.');
    }

}

export async function getFilteredJobsPages(query, filters = {}) {
    try {
        const conditions = [];

        if (query) {
            conditions.push(sql`
        (
          job_titles.name ILIKE ${`%${query}%`} OR 
          job_categories.name ILIKE ${`%${query}%`} OR
          companies.name ILIKE ${`%${query}%`} OR
          EXISTS (
              SELECT 1 FROM job_tag_mappings jtm
              JOIN job_tags jt ON jt.id = jtm.tag_id
              WHERE jtm.job_id = jobs.id AND jt.name ILIKE ${`%${query}%`}
          )
        )
      `);
        }

        if (filters.category_id) {
            conditions.push(sql`jobs.category_id = ${filters.category_id}`);
        }

        if (filters.location?.length) {
            conditions.push(sql`jobs.location = ANY(${filters.location})`);
        }

        if (filters.type?.length) {
            conditions.push(sql`jobs.type = ANY(${filters.type})`);
        }

        if (filters.tag_ids?.length) {
            conditions.push(sql`
        EXISTS (
          SELECT 1 FROM job_tag_mappings jtm
          WHERE jtm.job_id = jobs.id AND jtm.tag_id = ANY(${filters.tag_ids})
        )
      `);
        }

        if (filters.posted) {
            const now = new Date();
            let pastDate;
            if (filters.posted === '1d') pastDate = new Date(now.setDate(now.getDate() - 1));
            if (filters.posted === '7d') pastDate = new Date(now.setDate(now.getDate() - 7));
            if (filters.posted === '30d') pastDate = new Date(now.setDate(now.getDate() - 30));
            if (pastDate) {
                conditions.push(sql`jobs.posted_at >= ${pastDate}`);
            }
        }

        const whereClause = conditions.length
            ? sql`WHERE ${conditions.reduce((acc, curr, i) =>
                i === 0 ? curr : sql`${acc} AND ${curr}`
            )}`
            : sql``;

        const data = await sql`
            SELECT COUNT(DISTINCT jobs.id) AS count
            FROM jobs
            JOIN companies ON jobs.company_id = companies.id
            JOIN job_categories ON jobs.category_id = job_categories.id
            JOIN job_titles ON jobs.title_id = job_titles.id
            LEFT JOIN job_tag_mappings ON jobs.id = job_tag_mappings.job_id
            LEFT JOIN job_tags ON job_tag_mappings.tag_id = job_tags.id
            ${whereClause};
        `;

        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of jobs.');
    }
}

export async function getAllTags() {
    try {
        return await sql`SELECT id, name FROM job_tags ORDER BY name`;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Could not load job tags.');
    }
}

export async function getAllCategories() {
    try {
        return await sql`SELECT id, name, icon FROM job_categories ORDER BY name`;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Could not load job categories.');
    }
}

export async function getAllLocations() {
    try {
        const result = await sql`
            SELECT DISTINCT location FROM jobs
            WHERE location IS NOT NULL
            ORDER BY location
        `;
        return result.map(row => row.location);
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw new Error('Could not load locations.');
    }
}

export async function getCompanyData() {
    try {
        const data = await sql`
            SELECT
            c.id,
            c.name,
            c.logo_url,
            c.website,
            c.location,
            COUNT(j.id) AS total_jobs
            FROM companies c
            LEFT JOIN jobs j ON c.id = j.company_id
            GROUP BY c.id
            ORDER BY total_jobs DESC;
        `;
        return data;
    } catch (error) {
        console.error('Error fetching company data:', error);
        throw new Error('Could not load companies.');
    }
}

export async function getJobById(jobId, userEmail = null) {
    try {
        const data = await sql`
            SELECT 
                j.id,
                j.description,
                j.roles_and_responsibilities,
                j.location,
                j.type,
                j.posted_at,
                j.salary_type,
                j.salary_amount,
                j.salary_currency,
                j.salary_period,

                jt.name AS title,
                
                c.name AS company,
                c.logo_url AS company_logo,
                c.website AS company_website,
                c.location AS company_location,

                ARRAY_AGG(DISTINCT tag.name) AS tag_names,
                ARRAY_AGG(DISTINCT tag.id) AS tag_ids,

                (SELECT COUNT(*) FROM bookmarks b WHERE b.job_id = j.id) AS bookmark_count,

                ${userEmail
                ? sql`EXISTS (
                        SELECT 1 FROM bookmarks b
                        JOIN users u ON b.user_id = u.id
                        WHERE b.job_id = j.id AND u.email = ${userEmail}
                    ) AS bookmarked`
                : sql`false AS bookmarked`
            }

            FROM jobs j
            JOIN job_titles jt ON j.title_id = jt.id
            JOIN companies c ON j.company_id = c.id
            LEFT JOIN job_tag_mappings jtm ON j.id = jtm.job_id
            LEFT JOIN job_tags tag ON tag.id = jtm.tag_id

            WHERE j.id = ${jobId}
            GROUP BY j.id, jt.name, c.name, c.logo_url, c.website, c.location;
        `;

        return data[0];
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        throw new Error('Could not load job details.');
    }
}

export async function getCategoryCardData() {
    try {
        const data = await sql`
            SELECT 
                jc.id,
                jc.name,
                jc.icon,
                COUNT(j.id) AS job_count
            FROM job_categories jc
            LEFT JOIN jobs j ON jc.id = j.category_id
            GROUP BY jc.id, jc.name, jc.icon
            ORDER BY job_count DESC;
        `;
        return data;
    } catch (error) {
        console.error('Error fetching category card data:', error);
        throw new Error('Could not load category cards.');
    }
}

export async function getRecentJobCardsData() {
    try {
        const data = await sql`
            SELECT 
                j.id,
                jt.name AS title,
                
                json_build_object(
                    'id', c.id,
                    'name', c.name,
                    'logo', c.logo_url
                ) AS company,

                j.salary_type,
                j.salary_amount,
                j.salary_currency,
                j.salary_period,

                j.location,
                j.type,
                j.posted_at,
                j.description

            FROM jobs j
            JOIN job_titles jt ON j.title_id = jt.id
            JOIN companies c ON j.company_id = c.id

            ORDER BY j.posted_at DESC
            LIMIT 6;
        `;
        return data;
    } catch (error) {
        console.error('Error fetching recent jobs:', error);
        throw new Error('Could not load recent jobs.');
    }
};

export async function getUser(email) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function createUser({ email, password }) {
    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await sql`
            INSERT INTO users (email, password, image_url)
            VALUES (${email}, ${hashed}, "test.png")
            RETURNING *;
        `;
        return newUser[0];
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user.');
    }
}

export async function addBookmark(userId, jobId) {
    try {
        const result = await sql`
            INSERT INTO bookmarks (user_id, job_id)
            VALUES (${userId}, ${jobId})
            RETURNING *;
        `;
        return result[0];
    } catch (error) {
        console.error('Failed to add bookmark:', error);
        throw new Error('Could not bookmark job.');
    }
}

export async function getUserBookmarks(userId) {
    try {
        const rows = await sql`
            SELECT job_id FROM bookmarks WHERE user_id = ${userId}
        `;
        return rows.map(row => row.job_id);
    } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
        return [];
    }
}

export async function isJobBookmarked(userId, jobId) {
    try {
        const res = await sql`
            SELECT 1 FROM bookmarks 
            WHERE user_id = ${userId} AND job_id = ${jobId}
            LIMIT 1
        `;
        return res.length > 0;
    } catch (error) {
        console.error('Failed to fetch bookmark status: ', error);
        throw new Error('Error fetching bookmark status.');
    }
}

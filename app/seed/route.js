import bcryptjs from 'bcryptjs';
import postgres from 'postgres';
import {
  categories,
  companies,
  jobTags,
  jobTitles,
  generateJobs,
  users
} from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function seedUsers(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      image_url VARCHAR(255),
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'recruiter', 'admin'))
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      return sql`
        INSERT INTO users (name, email, password, image_url, role)
        VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.image_url || null}, ${user.role || 'user'})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedJobCategories(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS job_categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      icon TEXT
    );
  `;

  const insertedJobCategories = [];
  for (const category of categories) {
    const result = await sql`
      INSERT INTO job_categories (name, icon)
      VALUES (${category.name}, ${category.icon})
      ON CONFLICT (name) DO UPDATE SET icon = EXCLUDED.icon
      RETURNING id, name;
    `;
    if (result.length > 0) insertedJobCategories.push(result[0]);
  }

  return insertedJobCategories;
}

async function seedCompanies(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS companies (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      logo_url VARCHAR(255),
      website VARCHAR(255),
      location TEXT
    );
  `;

  const insertedCompanies = [];
  for (const company of companies) {
    const result = await sql`
      INSERT INTO companies (name, logo_url, website, location)
      VALUES (${company.name}, ${company.logo_url}, ${company.website}, ${company.location})
      ON CONFLICT (name) DO UPDATE SET logo_url = EXCLUDED.logo_url, website = EXCLUDED.website, location = EXCLUDED.location
      RETURNING id, name;
    `;
    if (result.length > 0) insertedCompanies.push(result[0]);
  }

  return insertedCompanies;
}

async function seedJobTitles(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS job_titles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;

  const insertedJobTitles = [];
  for (const title of jobTitles) {
    const result = await sql`
      INSERT INTO job_titles (name)
      VALUES (${title.name})
      ON CONFLICT (name) DO NOTHING
      RETURNING id, name;
    `;
    if (result.length > 0) insertedJobTitles.push(result[0]);
  }

  return insertedJobTitles;
}

async function seedJobTags(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS job_tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;

  const insertedJobTags = [];
  for (const tag of jobTags) {
    const result = await sql`
      INSERT INTO job_tags (name)
      VALUES (${tag.name})
      ON CONFLICT (name) DO NOTHING
      RETURNING id, name;
    `;
    if (result.length > 0) insertedJobTags.push(result[0]);
  }

  return insertedJobTags;
}

async function seedJobs(sql, jobs) {
  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title_id INTEGER REFERENCES job_titles(id),
      company_id UUID REFERENCES companies(id),
      category_id INTEGER REFERENCES job_categories(id),
      location TEXT CHECK (location IN ('Remote', 'On-site', 'Hybrid')),
      type TEXT CHECK (type IN ('Full-Time', 'Part-Time', 'Contract-based', 'Internship')),
      description TEXT,
      roles_and_responsibilities TEXT,
      posted_at DATE,
      salary_type TEXT CHECK (salary_type IN ('fixed', 'negotiable', 'performance-based')),
      salary_amount INTEGER,
      salary_currency TEXT CHECK (salary_currency IN ('USD', 'INR', 'EUR')),
      salary_period TEXT CHECK (salary_period IN ('year', 'month', 'hour'))
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS job_tag_mappings (
      job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
      tag_id INTEGER REFERENCES job_tags(id) ON DELETE CASCADE,
      PRIMARY KEY (job_id, tag_id)
    );
  `;

  for (const job of jobs) {
    const [insertedJob] = await sql`
      INSERT INTO jobs (
        title_id,
        company_id,
        category_id,
        location,
        type,
        description,
        roles_and_responsibilities,
        posted_at,
        salary_type,
        salary_amount,
        salary_currency,
        salary_period
      )
      VALUES (
        ${job.title_id},         
        ${job.company_id},
        ${job.category_id},      
        ${job.location},
        ${job.type},
        ${job.description},
        ${job.roles_and_responsibilities},
        ${job.posted_at},
        ${job.salary.type},
        ${job.salary.amount},
        ${job.salary.currency},
        ${job.salary.period}
      )
      RETURNING id;
    `;

    const job_id = insertedJob.id;

    for (const tag_id of job.tag_ids) {
      await sql`
        INSERT INTO job_tag_mappings (job_id, tag_id)
        VALUES (${job_id}, ${tag_id});
      `;
    }
  }

  return { message: 'Jobs and tag mappings seeded' };
}

async function createBookmarkTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS bookmarks (
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, job_id)
    );
  `;
}

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`DROP TABLE IF EXISTS bookmarks, users, companies, job_categories, job_tags, job_titles, jobs, job_tag_mappings CASCADE`;

    await sql.begin(async (sql) => {
      await seedUsers(sql);
      const companies = await seedCompanies(sql);
      const categories = await seedJobCategories(sql);
      const jobTags = await seedJobTags(sql);
      const jobTitles = await seedJobTitles(sql);

      const jobs = generateJobs({ categories, companies, jobTitles, jobTags });
      await seedJobs(sql, jobs);
      await createBookmarkTable(sql);
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
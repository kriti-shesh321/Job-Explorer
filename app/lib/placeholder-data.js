const categories = [
    { name: "UI/UX Design", icon: "Paintbrush" },
    { name: "Marketing & Communication", icon: "Megaphone" },
    { name: "Software Development", icon: "Code" },
    { name: "Product Management", icon: "Box" },
    { name: "Customer Support", icon: "Headphones" },
    { name: "Data Science", icon: "BarChart" },
    { name: "Sales & Business", icon: "Briefcase" },
    { name: "Human Resources", icon: "Users" }
];

const companies = [
    {
        name: "TechNova",
        logo_url: "/company-logos/techNova.png",
        website: "https://technova.dev",
        location: "New York, US"
    },
    {
        name: "Innovix",
        logo_url: "/company-logos/innovix.png",
        website: "https://innovix.com",
        location: "London, UK"
    },
    {
        name: "CodeCraft",
        logo_url: "/company-logos/codeCraft.png",
        website: "https://codecraft.dev",
        location: "Toronto, Canada"
    },
    {
        name: "DesignIt",
        logo_url: "/company-logos/designIt.png",
        website: "https://designit.co",
        location: "Berlin, Germany"
    },
    {
        name: "MarketEase",
        logo_url: "/company-logos/marketEase.png",
        website: "https://marketease.io",
        location: "Paris, France"
    },
    {
        name: "FinPro",
        logo_url: "/company-logos/finPro.png",
        website: "https://finpro.finance",
        location: "Mumbai, India"
    },
    {
        name: "HealthHive",
        logo_url: "/company-logos/healthHive.png",
        website: "https://healthhive.org",
        location: "Austin, US"
    },
    {
        name: "NextStack",
        logo_url: "/company-logos/nextStack.png",
        website: "https://nextstack.tech",
        location: "Seoul, South Korea"
    },
    {
        name: "SecureSoft",
        logo_url: "/company-logos/secureSoft.png",
        website: "https://securesoft.ai",
        location: "Tokyo, Japan"
    },
    {
        name: "RedCloud",
        logo_url: "/company-logos/redCloud.png",
        website: "https://redcloud.green",
        location: "Sydney, Australia"
    }
];


const jobTitles = [
    { name: 'Frontend Developer' },
    { name: 'Backend Developer' },
    { name: 'UI/UX Designer' },
    { name: 'Marketing Specialist' },
    { name: 'Product Manager' },
    { name: 'Data Analyst' },
    { name: 'Sales Executive' },
    { name: 'HR Generalist' }
];

const jobTags = [
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'Node.js' },
    { name: 'Figma' },
    { name: 'SQL' },
    { name: 'Python' },
    { name: 'SEO' },
    { name: 'Leadership' }
];

function generateJobs({ categories, companies, jobTitles, jobTags }) {
    const locations = ["Remote", "On-site", "Hybrid"];
    const types = ["Full-Time", "Part-Time", "Contract-based", "Internship"];
    const salaryTypes = ["fixed", "negotiable", "performance-based"];
    const salaryPeriods = ["year", "month", "hour"];
    const currencies = ["USD", "INR", "EUR"];

    function randomDate() {
        const daysAgo = Math.floor(Math.random() * 365);
        return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
    }

    function randomTags() {
        return Array.from(
            new Set(
                Array.from({ length: 3 }, () => {
                    const tag = jobTags[Math.floor(Math.random() * jobTags.length)];
                    return tag.id;
                }),
            ),
        );
    }

    function randomSalary() {
        const typeChance = Math.random();
        if (typeChance < 0.6) {
            return {
                type: "fixed",
                amount: Math.floor(Math.random() * 100000 + 30000),
                currency: currencies[Math.floor(Math.random() * currencies.length)],
                period: salaryPeriods[Math.floor(Math.random() * salaryPeriods.length)],
            };
        } else {
            return {
                type: salaryTypes[Math.random() > 0.5 ? 1 : 2],
                amount: null,
                currency: null,
                period: null,
            };
        }
    }

    const guaranteedJobs = companies.map((company, i) => ({
        company_id: company.id,
        category_id: categories[i % categories.length].id,
        title_id: jobTitles[i % jobTitles.length].id,
        location: locations[Math.floor(Math.random() * locations.length)],
        type: types[Math.floor(Math.random() * types.length)],
        description:
            "This is a sample job description for testing. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
        roles_and_responsibilities:
            "- Collaborate Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n- Build Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.\n- Test Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n- Deliver Et harum quidem rerum facilis est et expedita distinctio.",
        tag_ids: randomTags(),
        posted_at: randomDate(),
        salary: randomSalary(),
    }));

    const additionalJobs = [];

    while (guaranteedJobs.length + additionalJobs.length < 80) {
        additionalJobs.push({
            company_id: companies[Math.floor(Math.random() * companies.length)].id,
            category_id: categories[Math.floor(Math.random() * categories.length)].id,
            title_id: jobTitles[Math.floor(Math.random() * jobTitles.length)].id,
            location: locations[Math.floor(Math.random() * locations.length)],
            type: types[Math.floor(Math.random() * types.length)],
            description:
                "This is a sample job description for testing.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            roles_and_responsibilities:
                "- Collaborate Et harum quidem rerum facilis est et expedita distinctio. \n- Build Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\n- Test Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n- Deliver Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            tag_ids: randomTags(),
            posted_at: randomDate(),
            salary: randomSalary(),
        });
    }

    return [...guaranteedJobs, ...additionalJobs];
}

const users = [
    {
        name: "Demo User",
        email: "user@example.com",
        password: "password123",
        image_url: "/users/demo-user.png",
        role: "user"
    },
    {
        name: "Demo Admin",
        email: "admin@example.com",
        password: "adminpass123",
        image_url: "/users/demo-admin.png",
        role: "admin"
    }
];

export { categories, companies, jobTags, jobTitles, users, generateJobs };
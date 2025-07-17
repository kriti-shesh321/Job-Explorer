import {
    getFilteredJobs,
    getFilteredJobsPages,
    getAllCategories,
    getAllLocations,
    getAllTags,
    getJobById
} from "@/app/lib/data";
import JobPageClient from "../ui/jobs/JobPageClient";

export const metadata = {
    title: "Jobs"
};

export default async function Page(props) {
    const [categories, tags, locations] = await Promise.all([
        getAllCategories(),
        getAllTags(),
        getAllLocations()
    ]);

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const filterKeys = ['category_id', 'location', 'type', 'tag_ids', 'posted'];
    const filters = {};

    for (const key of filterKeys) {
        const value = searchParams?.[key];
        if (value) {
            filters[key] = value.split(',');
        }
    }

    const totalPages = await getFilteredJobsPages(query, filters);
    const jobs = await getFilteredJobs(query, currentPage, filters);

    const selectedJobId = searchParams?.jobId || null;
    const selectedJob = selectedJobId ? await getJobById(selectedJobId) : null;

    return (
        <JobPageClient
            jobs={jobs}
            totalPages={totalPages}
            categories={categories}
            tags={tags}
            locations={locations}
            currentJob={selectedJob && selectedJob}
        />
    );
}

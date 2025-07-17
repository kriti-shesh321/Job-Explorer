import JobDetails from "@/app/ui/jobs/JobDetails";
import { getJobById } from '@/app/lib/data';
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata = {
    title: "Job"
};

export default async function JobDetailPage({ params }) {
    const job = await getJobById(params.id);

    return (
        <div className="w-full p-3 md:py-10 md:px-20 bg-gray-100">
            <Link href="/jobs" className="w-fit flex gap-2 px-3 py-2 items-center text-gray-500 md:shadow-md font-medium">
                <FaArrowLeft />
                <span>Back to Jobs</span>
            </Link>
            <JobDetails job={job} />
        </div>
    );
}

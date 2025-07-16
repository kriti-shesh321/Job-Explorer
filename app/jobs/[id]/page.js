import JobDetails from "@/app/ui/jobs/JobDetails";
import { getJobById } from '@/app/lib/data';
import { usePathname } from "next/navigation";

export const metadata = {
    title: "Job"
};

export default async function JobDetailPage({params}) {
    const pathname = usePathname()
    const job = await getJobById(params.id);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <JobDetails job={job} />
        </div>
    );
}

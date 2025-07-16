import { getJobById } from "@/app/lib/data";
import JobDetails from "./JobDetails";

export default async function JobDetailsServer({ jobId }) {
  const job = await getJobById(jobId);

  if (!job) return <div className="text-lg text-center font-bold text-gray-500">Job Not found.</div>;

  return <JobDetails job={job} />;
}
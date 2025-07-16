import { useRouter } from 'next/navigation';
import JobCard from "./JobCard";

export default function JobList({ jobs, setSelectedJob }) {

  const router = useRouter();

  const handleClick = (jobId) => {
    if (window.innerWidth < 1024) {
      router.push(`/jobs/${jobId}`);
    } else {
      setSelectedJob(jobId);
    }
  };

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <div key={job.id} onClick={() => handleClick(job.id)}>
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
}

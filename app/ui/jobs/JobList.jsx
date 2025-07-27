import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import JobCard from "./JobCard";

export default function JobList({ jobs, bookmarkSyncMap, updateBookmarkSync }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = (jobId) => {
    if (window.innerWidth < 1024) {
      router.push(`/jobs/${jobId}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set('jobId', jobId);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <div key={job.id} onClick={() => handleClick(job.id)}>
          <JobCard
            job={job}
            selected={job.id === searchParams.get('jobId')}
            bookmarkSync={bookmarkSyncMap[job.id]}
            onBookmarkToggle={() => updateBookmarkSync(job.id)}
          />
        </div>
      ))}
    </div>
  );
}
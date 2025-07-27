'use client';
import { useBookmark } from '@/app/hooks/useBookmark';
import JobDetails from "./JobDetails";

export default function JobDetailsClient({ job }) {
  const { isBookmarked: bookmarked, toggleBookmark, isLoading } = useBookmark(job.id);

  if (!job) return <div className="text-lg text-center font-bold text-gray-500">Job Not found.</div>;

  return (
    <JobDetails
      job={job}
      isBookmarked={bookmarked}
      toggleBookmark={toggleBookmark}
      isLoading={isLoading}
    />);
}
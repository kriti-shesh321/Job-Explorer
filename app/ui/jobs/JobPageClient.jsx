'use client';

import JobList from "./JobList";
import Search from "./Search";
import Pagination from "./Pagination";
import JobFilters from "./Filters";
import JobDetails from "./JobDetails";
import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function JobPageClient({ jobs, totalPages, categories, tags, locations, currentJob }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const jobId = searchParams.get('jobId');

  useEffect(() => {
    const screenIsLarge = window.innerWidth >= 1024;
    const params = new URLSearchParams(searchParams.toString());

    if (screenIsLarge) {

      if (!jobId && jobs.length > 0) {
        params.set('jobId', jobs[0].id);
        router.replace(`${pathname}?${params.toString()}`);
        return;
      }

      // If jobId is not part of current filtered jobs, reset to first job
      const jobExists = jobs.some((job) => job.id === jobId);
      if (!jobExists && jobs.length > 0) {
        params.set('jobId', jobs[0].id);
        router.replace(`${pathname}?${params.toString()}`);
        return;
      }
    } else {
      // remove jobId for small/md screens
      if (params.has('jobId')) {
        params.delete('jobId');
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [jobId, jobs, searchParams, router, pathname]);

  return (
    <div className="w-full bg-gradient-to-b from-blue-500 via-white to-white py-10">
      <div className="rounded-2xl mx-2 md:mx-20 pt-5 bg-white py-[2%]">
        <div className="w-full bg-white flex flex-col justify-between gap-2 px-1 md:px-[3%]">
          <Search placeholder="Search jobs..." />
          <JobFilters categories={categories} tags={tags} locations={locations} />
        </div>

        <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-100 px-2">
          <div className="w-full lg:w-[45%] h-full overflow-y-auto pr-2 py-2">
            <JobList jobs={jobs} />
          </div>
          <div className="hidden lg:block w-[55%] h-screen overflow-y-auto py-2 bg-gray-100">
            {currentJob ? (
              <JobDetails job={currentJob} />
            ) : (
              <div className="p-10 text-gray-500">Select a job to view details.</div>
            )}
          </div>
        </div>
      </div>
      <div className="w-fit mx-auto">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
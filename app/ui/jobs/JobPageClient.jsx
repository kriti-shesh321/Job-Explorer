'use client';

import { useState, useEffect } from 'react';
import JobList from "./JobList";
import Search from "./Search";
import Pagination from "./Pagination";
import JobFilters from "./Filters";
import JobDetails from "./JobDetails";

export default function JobPageClient({ jobs, totalPages, categories, tags, locations }) {
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setSelectedJob(jobs[0]?.id);
    }
  }, [jobs]);

  return (
    <div className="bg-gradient-to-b from-blue-500 via-white to-white py-10">
      <div className="rounded-2xl mx-2 md:mx-20 pt-5 bg-white py-[2%] px-1 md:px-[3%]">
        <div className="bg-white flex flex-col justify-between gap-2">
          <Search placeholder="Search jobs..." />
          <JobFilters categories={categories} tags={tags} locations={locations} />
        </div>

        <div className="flex flex-col lg:flex-row w-full h-screen py-[3%]">
          <div className="w-full lg:w-[45%] h-full overflow-y-auto">
            <JobList jobs={jobs} setSelectedJob={setSelectedJob} />
          </div>
          <div className="hidden lg:flex w-[55%] h-full overflow-y-auto">
            {selectedJob ? (
              <JobDetails jobId={selectedJob} />
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
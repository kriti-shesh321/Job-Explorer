'use client';
import Link from 'next/link';
import BookmarkedJobCard from "./BookmarkedJobCard";

export default function BookmarkedJobs({ jobs }) {
    if (!jobs?.length) {
        return (
            <div className="bg-white shadow-md rounded-xl p-6 text-gray-500 text-center">
                You haven't bookmarked any jobs yet.
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4 text-blue-500">Bookmarked Jobs</h2>
            <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-3">
                {jobs.map((job) => (
                    <BookmarkedJobCard job={job} key={job.id}/>
                ))}
            </div>
        </div>
    );
}
import { getRecentJobCardsData } from "@/app/lib/data";
import Link from "next/link";
import RecentJobCard from "./RecentJobCard";

export default async function RecentJobs() {
    const recentJobsList = await getRecentJobCardsData();

    return (
        <section className="py-10 px-5 md:py-20 md:px-14 lg:px-48 space-y-6 lg:space-y-14 bg-gradient-to-tr from-gray-100 via-blue-50 to-gray-200">
            <div className="flex justify-between items-start md:items-center">
                <div>
                    <h2 className="text-2xl lg:text-4xl font-bold mb-4">Recent Jobs</h2>
                    <p className="text-green-700 text-2xs md:text-sm md:mb-6">A sneak peek into currently available roles.</p>
                </div>
                <Link href="/jobs" className="min-w-fit text-xs md:text-md lg:text-lg p-1 md:px-5 md:py-2 border-2 border-gray-200 bg-white shadow-md hover:shadow-xl text-blue-500 hover:text-blue-900 font-semibold">
                    See All Jobs
                </Link>
            </div>
            <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">

                {recentJobsList.map((job) => (
                    <RecentJobCard key={job.id} job={job} />
                ))}

            </div>
        </section>
    );
}
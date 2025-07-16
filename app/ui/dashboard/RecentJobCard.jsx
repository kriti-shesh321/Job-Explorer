import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { formatSalary, formatDate } from "@/app/lib/utils";

export default function RecentJobCard({ job }) {

    const formattedSalary = formatSalary({
        amount: job?.salary_amount ?? null,
        currency: job?.salary_currency,
        period: job?.salary_period,
        type: job?.salary_type
    });

    return (
        <div className="p-4 md:p-8 rounded-sm shadow-md hover:shadow-xl bg-white md:space-y-3">
            <div className="grid grid-cols-[1.5fr_1fr] justify-between items-center">
                <div className="flex gap-3 items-center">
                    <Image
                        src={job.company.logo}
                        width={500}
                        height={500}
                        className="size-10 rounded-full"
                        alt={`${job.company.name}'s logo`}
                    />
                    <div>
                        <h3 className="font-medium text-gray-700">{job.company.name}</h3>
                        <p className="flex items-center gap-1 text-gray-400 text-sm"><FaLocationDot /> {job.location}</p>
                    </div>
                </div>
                <div className="text-gray-500 text-xs font-medium border-l border-gray-300 pl-2">
                    {formattedSalary}
                </div>
            </div>
            <div className="mb-3 md:mb-8 text-gray-400">
                <h3 className="text-gray-800 text-lg font-semibold mb-2">{job.title}</h3>
                <div className="flex gap-6 text-sm mb-4">
                    <p className="">{job.type}</p>
                    <p>|</p>
                    <p>{formatDate(job.posted_at)}</p>
                </div>
                <p className="text-sm">{job.description.slice(0, 120)}...</p>
            </div>
            <Link
                href={`/jobs/${job.id}`}
                className="text-blue-700 hover:text-blue-900 text-xs md:text-sm font-medium px-2 md:px-5 py-3 bg-blue-50 shadow-md hover:shadow-lg"
            >
                View details
            </Link>
        </div>
    );
}
'use client';
import Link from 'next/link';
import Image from "next/image";
import { formatDate } from "@/app/lib/utils";

export default function BookmarkedJobCard({ job }) {

    return (
        <Link href={`/jobs/${job.id}`} className="block">
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm hover:shadow-md transition cursor-pointer bg-white">
                <Image
                    height={500}
                    width={500}
                    src={job.company.logo || '/default-logo.png'}
                    alt={job.company.name}
                    className="w-12 h-12 rounded-sm object-cover"
                />
                <div className="flex-1">
                    <h3 className="text-md font-medium text-gray-700">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company.name}</p>
                </div>
                <div className="text-xs text-gray-500">Posted: {formatDate(job.posted_at)}</div>
            </div>
        </Link>
    );
}
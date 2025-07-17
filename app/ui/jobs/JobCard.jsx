import { formatDate } from "@/app/lib/utils";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';

export default function JobCard({ job }) {
  return (
    <div
      className='flex gap-[2%] p-2 md:p-4 rounded-lg cursor-pointer hover:shadow-md transition-all bg-white'
    >

      <Image
        src={job.company_logo_url}
        width={500}
        height={500}
        className="size-10 rounded-full"
        alt={`${job.company_name}'s logo`}
      />

      <div className="flex flex-col w-full space-y-[2%]">

        <div className="flex flex-1 justify-between">
          <div className="flex flex-col">
            <h3 className="md:text-lg font-semibold">{job.title_name}</h3>
            <div className="text-gray-500 text-xs md:text-sm">
              {job.company_name}
            </div>
          </div>
          <button className="max-h-fit flex items-center justify-between text-sm md:text-md px-2 md:px-3 py-1 bg-blue-50 text-blue-800 space-x-2">
            <span>Save Job </span>
            <FaRegBookmark />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-2xs md:text-xs items-center">
          <span>Tags: </span>
          {job.tag_names.map((tag, index) => (
            <span key={index} className="block bg-gray-100 text-gray-900 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="w-full mt-2 flex justify-between text-xs place-items-baseline md:items-center">
          <div className="flex flex-1 flex-wrap gap-[2%] place-items-baseline space-y-2">
            <span className="bg-blue-50 text-blue-900 px-2 md:py-1 rounded">
              {job.type}
            </span>
            <span className="bg-orange-100 text-orange-900 px-2 md:py-1 rounded">
              {job.location}
            </span>
            {job.salary_type === 'fixed' && job.salary_amount ? (
              <span className="bg-green-100 text-green-800 px-2 md:py-1 rounded">
                ${Math.floor(job.salary_amount / 1000)}k / {job.salary_period}
              </span>
            ) : (
              <span className="max-h-fit bg-yellow-100 text-yellow-800 px-2 md:py-1 rounded">
                {job.salary_type.charAt(0).toUpperCase() + job.salary_type.slice(1,)}
              </span>
            )}
          </div>

          <span className="min-w-fit text-xs md:text-sm text-gray-500">
            {formatDate(job.posted_at)}
          </span>
        </div>

      </div>
    </div>
  );
}

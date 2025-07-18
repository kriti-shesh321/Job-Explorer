import Image from "next/image";
import { FaCalendar, FaRegClock, FaWallet } from "react-icons/fa";
import { FaLocationDot, FaRegBookmark } from "react-icons/fa6";
import { formatDate } from "@/app/lib/utils";

export default function JobDetails({ job }) {

  if (!job) return <div className="text-lg text-center lg:text-left font-bold text-gray-500">Job Not found.</div>;
  
  return (
    <div className="w-full py-6 lg:px-2 lg:py-0 space-y-3">
      <div className="flex flex-col space-y-[3%] bg-white p-5 rounded-sm border-blue-500 border-l-6 lg:border-none">
        <div className="flex gap-[3%] items-center">
          <Image
            src={job.company_logo}
            width={500}
            height={500}
            className="size-20 md:size-28 rounded-lg border border-gray-200 p-1"
            alt={`${job.company_name}'s logo`}
          />
          <div className="min-h-3/4 flex flex-col">
            <h1 className="text-2xl md:text-4xl text-gray-700 font-bold">{job.title}</h1>
            <h5 className="text-gray-500 md:mt-3">{job.company}</h5>
          </div>
        </div>

        <div className="text-gray-500">
          <p className="flex gap-2 items-center"><FaLocationDot /> {job.location}</p>
          <p className="flex gap-2 items-center"><FaCalendar /> Updated on:  {formatDate(job.posted_at)}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center bg-white p-5 rounded-sm space-y-4 lg:space-y-0">
        <p className="text-gray-500">xx users bookmarked this job!</p>
        <button className="min-w-fit md:max-w-fit px-5 py-1 md:px-5 md:py-2 rounded-sm flex gap-3 items-center justify-between md:text-lg bg-blue-500 text-white">
          <span>Save Job </span>
          <FaRegBookmark />
        </button>
      </div>

      <div className="flex flex-col gap-6 bg-white px-5 py-4 rounded-sm">
        <div className="flex gap-4 items-center">
          <div className="p-4 bg-gray-100 rounded-lg">
            <FaRegClock className="text-2xl text-gray-500" />
          </div>
          <div>
            <p className="text-gray-500">Work Hours</p>
            <p className="text-gray-900">{job.type}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center text-gray-500">
          <div className="p-4 bg-gray-100 rounded-lg">
            <FaWallet className="text-2xl text-gray-500" />
          </div>
          <div>
            <p className="text-gray-500">Salary</p>
            {job.salary_type === 'fixed' && job.salary_amount ? (
              <p className="text-gray-900">
                ${Math.floor(job.salary_amount / 1000)}k / {job.salary_period}
              </p>
            ) : (
              <p className="text-gray-900">
                {job.salary_type.charAt(0).toUpperCase() + job.salary_type.slice(1,)}
              </p>
            )}
          </div>

        </div>
      </div>

      <div className="flex flex-col gap-3 py-4 bg-white  rounded-sm">
        <h2 className="px-5 text-2xl font-medium text-gray-700 border-l-5 border-blue-500">Job Description</h2>
        <p className="px-5 text-gray-500">{job.description}</p>
      </div>

      <div className="flex flex-col gap-3 py-4 bg-white  rounded-sm">
        <h2 className="px-5 text-2xl font-medium text-gray-700 border-l-5 border-blue-500">Responsibilities</h2>
        <div className="px-10 text-gray-500">
          <ul className="list-disc px-5 space-y-3">
            {job.roles_and_responsibilities.split('\n').map((line, i) => (
              <li key={i}>{line.replace(/^- /, '')}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4 bg-white  rounded-sm">
        <h2 className="px-5 text-2xl font-medium text-gray-700 border-l-5 border-blue-500">Mandatory Skills</h2>
        <div className="px-10 text-gray-500">
          <ul className="list-disc px-5 space-y-3">
            {job.tag_names.map((tag, index) => (
              <li key={index}> {tag}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

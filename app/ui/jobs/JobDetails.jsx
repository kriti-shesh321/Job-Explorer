
export default function JobDetails({ job }) {

  if (!job) return <div className="text-lg text-center lg:text-left font-bold text-gray-500">Job Not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{job.title_name}</h1>
        <p className="text-gray-500">{job.location} • {job.type}</p>
        {job.salary_type === 'fixed' && job.salary_amount && (
          <p className="text-blue-600 mt-1 font-semibold">
            ${Math.floor(job.salary_amount / 1000)}k / {job.salary_period}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">About the job</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Responsibilities</h2>
        <ul className="list-disc pl-5 text-gray-700">
          {job.roles_and_responsibilities.split('\n').map((line, i) => (
            <li key={i}>{line.replace(/^- /, '')}</li>
          ))}
        </ul>
      </div>

      {/* Add Apply/Save button as needed */}
    </div>
  );
}

import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 px-6 sm:px-12 lg:px-42">
      {/* SVG Background */}
      <svg
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#3b82bf"
          fillOpacity="0.1"
          d="M0,192L80,186.7C160,181,320,171,480,165.3C640,160,800,160,960,181.3C1120,203,1280,245,1360,266.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left: Text Content */}
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h2 className="text-2xl text-gray-700 font-semibold mb-2">About us</h2>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Where Talent <br /> Meets Opportunities
            </h1>
            <p className="mt-4 text-gray-500 max-w-lg font-medium text-sm">
              Job Explorer is the largest community-driven job engagement platform, crafted to help talent
              be unstoppable. Whether you're just starting out or looking to level up, we bring
              you filtered listings, smart search, and a seamless experience to connect with top employers.
            </p>
          </div>

          <Link href="/jobs">
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-base lg:text-lg">
              Explore Jobs
            </button>
          </Link>
        </div>

        <div className="lg:w-1/2">
          <img
            src="/about.png"
            alt="About us team grid"
            className="w-full h-auto max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
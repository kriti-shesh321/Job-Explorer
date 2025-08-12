const shimmer = 'relative overflow-hidden shimmer';

export function InputSkeleton() {
    return (
        <div className="relative overflow-hidden h-6 md:h-8 lg:h-10 w-full flex items-center gap-2 px-5 border border-gray-200 rounded-md shadow-sm">
            <div className="size-2 lg:size-5 rounded-full bg-gray-100"></div>
            <div className="h-[40%] w-3/4 rounded-full bg-gray-100"></div>
        </div>
    );
}

export function MultiInputSkeleton({ num }) {
    return (
        <div className="space-y-2 lg:space-y-4">
            {Array.from({ length: num }, (_, i) => (
                <InputSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl p-2 shadow-xl flex justify-between items-center bg-white mt-[5%]`}
        >
            <div className="">
                <div className="ml-2 h-16 w-16 rounded-sm bg-gray-200 text-sm font-medium" />
            </div>
            <div className="flex flex-col truncate rounded-xl bg-white px-4 py-8 space-y-[2%]">
                <div className="h-7 w-30 rounded-md bg-gray-200 truncate" />
                <div className="h-3 w-38 rounded-md bg-gray-200" />
            </div>
        </div>
    );
}

export function CategoryCardsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[10%] py-[8%] gap-[2%] bg-gradient-to-b from-blue-50 via-white to-blue-100">
            {Array.from({ length: 8 }, (_, i) => (
                <CategoryCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function RecentJobsCardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-sm bg-white p-4 shadow-sm`}
        >
            <div className="flex border-gray-200 gap-y-[3%] gap-[3%] justify-between items-center">
                <div className="flex flex-col w-[70%] space-y-[2%]">
                    <div className="h-5 w-1/2 rounded-sm bg-gray-200" />
                    <div className="h-6 w-2/3 rounded-md bg-gray-200" />
                </div>
                <div className="bg-gray-200 h-6 w-[30%] rounded-sm"></div>
            </div>
            <div className="space-y-[2%] mt-[5%]">
                <div className="size-8 rounded-sm bg-gray-200" />
                <div className="h-6 w-full rounded-md bg-gray-200 mt-[3%]" />
            </div>
            <div className="h-7 w-1/4 mt-[5%] bg-gray-200 rounded-sm"></div>
        </div>
    );
}

export function RecentJobsSkeleton() {
    return (
        <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 py-10 px-5 md:py-20 md:px-14 lg:px-48 bg-blue-50">
            <RecentJobsCardSkeleton />
            <RecentJobsCardSkeleton />
            <RecentJobsCardSkeleton />
            <RecentJobsCardSkeleton />
            <RecentJobsCardSkeleton />
            <RecentJobsCardSkeleton />
        </div>
    );
}

export function HomepageSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`
            }
        >
            <div className="w-full max-w-6xl mx-auto p-6 space-y-8 animate-pulse">
                {/* Large header section */}
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>

                {/* Big hero/image section */}
                <div className="h-64 bg-gray-200 rounded-lg"></div>

                {/* 3-column cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-40"></div>
                    ))}
                </div>

                {/* Text blocks */}
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                </div>

                {/* Another card row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
                    ))}
                </div>
            </div>
        </div >
    );

}

export function JobListSkeleton({ count = 5 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`${shimmer} relative bg-white p-4 rounded-md shadow-sm`}
                >
                    <div className="flex justify-between items-center mb-3">
                        <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
    );
}

export function JobDetailsSkeleton() {
    return (
        <div className={`${shimmer} relative bg-white p-6 rounded-md shadow-sm min-h-screen`}>
            <div className="h-8 w-2/3 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3 mb-10">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-3 w-full bg-gray-200 rounded"></div>
                ))}
            </div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
        </div>
    );
}

export function JobsPageSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 mx-2 md:mx-20 py-10 lg:py-20">
            <div className="w-full lg:w-[45%]">
                <JobListSkeleton count={6} />
            </div>
            <div className="hidden lg:block w-[55%]">
                <JobDetailsSkeleton />
            </div>
        </div>
    );
}

export function CompaniesSkeleton() {
    return (
        <section className="relative w-full min-h-screen bg-[url('/image.png')] bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-cover bg-center overflow-hidden py-14 px-6">
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="h-10 bg-white/50 rounded mx-auto mb-14 w-2/3 animate-pulse"></div>

                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white/80 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center animate-pulse"
                        >
                            <div className="w-12 h-12 bg-gray-300 rounded mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
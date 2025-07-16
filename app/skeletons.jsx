const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

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

export function HeroSkeleton() {
    return (
        <div className="">

        </div>
    )
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
            <div className="flex p-[20%] justify-between">
                <div className="size-[50%] rounded-sm bg-gray-200">
                    <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
                </div>
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                <div className="h-7 w-20 rounded-md bg-gray-200" />
            </div>
        </div >
    );

}
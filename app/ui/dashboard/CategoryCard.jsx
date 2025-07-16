import { getCategoryIcon } from "@/app/lib/utils";

export default function CategoryCard({ category }) {
    const Icon = getCategoryIcon(category.icon);

    return (
        <div
            className="grid grid-cols-[1fr_2.25fr] h-full items-center border border-gray-200 rounded-sm md:rounded-xl lg:rounded-3xl bg-white hover:bg-blue-500 hover:text-white group transition shadow-md  p-4 lg:py-8 lg:px-6"
        >
            <div>
                <Icon className="size-5 md:size-7 lg:size-14" />
            </div>
            <div>
                <p className="group-hover:text-white text-xs md:text-sm lg:text-xl font-medium lg:font-semibold text-gray-800">{category.name}</p>
                <p className="group-hover:text-white text-2xs md:text-xs lg:text-sm text-gray-400 lg:text-gray-500 mt-1">{category.job_count} Jobs Available</p>
            </div>
        </div>
    );
};
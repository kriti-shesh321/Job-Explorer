import { MultiInputSkeleton } from "@/app/skeletons";
import Image from "next/image";

export default function HeroImage() {
    return (
        <div className="relative flex justify-center lg:justify-end text-left">

            <div className="bg-white shadow-md rounded-xl py-5 px-8 md:p-10 w-[75%] md:w-[65%] lg:w-[80%] space-y-2 md:space-y-5 border border-gray-100">
                <p className="text-lg md:text-2xl font-medium lg:font-bold text-gray-600 md:text-gray-700">Find your job</p>
                <p className="text-2xs md:text-xs text-gray-500">
                    There are millions of jobs for you to explore, take it and make it happen now!
                </p>
                <MultiInputSkeleton num={3} />
                <button className="w-full py-1 md:py-2 bg-blue-500 opacity-80 text-gray-50 rounded-md md:mt-3">Search</button>
            </div>

            <div className="absolute top-2 md:top-5 left-[70%] md:left-[70%] lg:left-[78%] min-w-[40%] gap-1 md:gap-2 flex lg:gap-3 items-center bg-white shadow-md rounded-xl border border-gray-200 px-1 py-2 md:px-2 md:py-4 lg:p-4">
                <Image
                    src="/spotify-logo.png"
                    width={456}
                    height={456}
                    className="size-3 md:size-5"
                    alt="Spotify logo"
                />
                <div>
                    <p className="text-xs md:text-sm md:font-medium">UI/UX Designer</p>
                    <p className="text-2xs md:text-xs text-gray-400 lg:text-gray-500">Spotify</p>
                </div>
            </div>

            <div className="absolute top-[70%] md:top-[75%] lg:top-[70%] left-[-10%] lg:right-[60%] bg-white shadow-xl border border-gray-200 rounded-xl py-4 px-4">
                <p className="font-medium">Visitors</p>
                <Image
                    src="/bar-graph.png"
                    width={611}
                    height={612}
                    className="w-25 h-15 md:h-25 md:w-40 lg:h-30 lg:w-50"
                    alt="Bar graph image"
                />
            </div>
        </div>
    );
}
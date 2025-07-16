import HeroImage from "./HeroImage";
import { FaCircleCheck } from 'react-icons/fa6';

export default function Hero() {
    return (
        <section className="w-full px-10 md:px-20 md:pt-14 pb-36 lg:py-20 lg:px-40 lg:h-[calc(100vh-5rem)] bg-white mt-10 lg:mt-5">
            <div className="flex flex-col lg:flex-row gap-y-20 items-center lg:justify-between text-center lg:text-left">
                <div className="md:max-w-[75%] lg:max-w-[40%] space-y-7">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        The job you want, the career you <span className="italic">Deserve</span>
                    </h1>
                    <p className="max-w-2xl text-gray-600 text-xs md:text-sm lg:text-md">
                        Lorem ipsum dolor sit amet consectetur. Senectus at sed malesuada sit lobortis tristique odio lacus semper.
                    </p>
                    <button className="md:px-8 py-2 md:py-3 bg-blue-500 hover:bg-blue-700 md:text-xl text-white font-semibold rounded-md min-w-1/2">
                        Get Started
                    </button>
                    <div className="mt-3 md:mt-6 flex flex-col md:flex-row text-xs lg:text-sm text-gray-600 gap-3 lg:gap-0 items-center justify-center lg:justify-between">
                        <div className="flex items-center space-x-2">
                            <FaCircleCheck className="text-blue-500 lg:text-lg" />
                            <span>Trusted by 10+ top companies</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCircleCheck className="text-blue-500 lg:text-lg" />
                            <span>Personalized job recommendations</span>
                        </div>
                    </div>
                </div>
                <div>
                    <HeroImage />
                </div>
            </div>
        </section>
    );
}
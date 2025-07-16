'use client';

import CountUp from 'react-countup';
import { Briefcase, Building, Users } from 'lucide-react';

const stats = [
    {
        label: 'Jobs listed',
        value: 80,
        icon: <Briefcase className="size-4 md:size-8 text-violet-600" />,
    },
    {
        label: 'Companies hiring',
        value: 10,
        icon: <Building className="size-4 md:size-8 text-yellow-500" />,
    },
    {
        label: 'Active seekers',
        value: 200,
        icon: <Users className="size-4 md:size-8 text-pink-400" />,
    }
];

export default function StatsSnapshot() {
    return (
        <section className="py-10 md:py-14 bg-white">
            <div className="max-w-full md:max-w-2xl lg:max-w-6xl flex justify-between gap-1 md:gap-5 lg:gap-10 mx-auto py-4 px-3 md:p-10 lg:px-20 bg-gradient-to-tl from-[#1db2de] via-blue-200 to-[#1db2de] shadow-lg">

                {stats.map(({ label, value, icon }) => (
                    <div
                        key={label}
                        className="flex gap-2 md:gap-5 items-end"
                    >
                        <div className="bg-white p-3 md:p-4 lg:p-7 rounded-sm shadow-sm">{icon}</div>
                        <div>
                            <p className="text-2xl md:text-4xl lg:text-6xl font-bold md:font-semibold text-indigo-900 italic">
                                <CountUp end={value} duration={2} suffix="+" />
                            </p>
                            <p className="md:mt-2 text-[0.525rem] md:text-xs lg:text-md md:font-medium text-gray-700">{label.toUpperCase()}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

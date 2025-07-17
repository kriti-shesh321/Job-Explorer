'use client';

import { useEffect, useState } from 'react';

export default function CompaniesPage({ companies }) {
    const [floatingOffsets, setFloatingOffsets] = useState([]);

    useEffect(() => {
        const offsets = companies.map(() => Math.random() * 2);
        setFloatingOffsets(offsets);
    }, [companies]);

    return (
        <section className="relative w-full min-h-screen bg-[url('/image.png')] bg-blue-900 bg-cover bg-center overflow-hidden py-14 px-6">

            <div className="relative z-10 max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-white text-center mb-14">Our Partner Companies</h1>

                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {companies.map((company, i) => (
                        <div
                            key={company.id}
                            className="bg-white/100 backdrop-blur-md shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-xl animate-floating"
                            style={{ animationDelay: `${floatingOffsets[i]}s` }}
                        >
                            <img
                                src={company.logo_url || "/placeholder-logo.png"}
                                alt={company.name}
                                className="w-12 h-12 object-contain mb-4"
                            />
                            <h2 className="text-xl font-bold text-gray-800">{company.name}</h2>
                            <p className="text-sm text-gray-500 mb-2 break-words">{company.website}</p>
                            <p className="text-blue-700 font-medium"><span className="text-blue-900 font-extrabold italic text-2xl">{company.total_jobs}+</span> Jobs Posted</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-[#1db2de] to-blue-500 opacity-90 animate-pulse-slow rounded-xl blur-2xl z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white shadow-xl rounded-xl px-6 py-10 sm:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Find your next opportunity now.
        </h2>
        <p className="text-gray-600 mb-6">
          Join hundreds of professionals discovering jobs that match their skills and goals.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-800 transition-all duration-300"
        >
          Explore Jobs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const linkClass = (path) =>
    ` md:pr-20 lg:pr-0 lg:inline-block text-gray-500 hover:text-black pt-2 ${pathname === path ? "underline underline-offset-4" : ""
    }`;

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 md:px-20 md:py-4">
      <div className="flex justify-between md:justify-start md:space-x-20 items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Job Explorer Logo"
            className="h-8 w-auto"
          />
          <Link href="/" className="flex space-x-2 text-gray-900 font-semibold text-lg md:text-2xl">
            Job Explorer
          </Link>
        </div>

        <button
          className="lg:hidden absolute top-5 right-4 md:right-0 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-5 md:size-6" /> : <Menu className="size-5 md:size-6" />}
        </button>

        <div className={isOpen
          ? "absolute top-[8%] right-0 z-10 w-full items-end bg-white py-4 px-4 md:px-0 text-sm md:text-lg flex flex-col shadow-md"
          : "max-h-0 hidden lg:flex lg:justify-between lg:gap-10 items-center"
        }>
          <Link href="/" className={linkClass("/")} onClick={(prev) => setIsOpen(!prev)}>Home</Link>
          <Link href="/jobs" className={linkClass("/jobs")} onClick={(prev) => setIsOpen(!prev)}>Jobs</Link>
          <Link href="/companies" className={linkClass("/companies")} onClick={(prev) => setIsOpen(!prev)}>Companies</Link>
          <Link href="/about" className={linkClass("/about")} onClick={(prev) => setIsOpen(!prev)}>About Us</Link>
          <Link href="/login" className="max-w-fit lg:hidden px-4 py-1 md:mr-20 mt-3 bg-blue-500 text-white font-semibold rounded-sm">Log In</Link>
        </div>
      </div>

      <div className="hidden lg:flex space-x-3">
        <Link href="#" className="px-4 py-2 font-medium text-gray-800">Log in</Link>
        <Link href="#" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Get Started</Link>
      </div>

    </nav>
  );
}

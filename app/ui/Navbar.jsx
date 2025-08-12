'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavLinks from "./NavLinks";
import LogoutButton from './LogoutButton';
import { Menu, X } from 'lucide-react';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white px-4 py-3 lg:px-20 lg:py-4 shadow-sm">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex gap-1 md:gap-5">
          <Image src="/logo.png" width={32} height={32} alt="Job Explorer Logo" className="size-6 md:size-auto" />
          <Link href="/" className="text-md md:text-2xl font-bold text-gray-700">
            Job Explorer
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          {user &&
            <Link
              href="/profile"
              onClick={closeMenu}
              className="text-gray-600 hover:text-blue-600"
            >
              <UserCircleIcon className="size-6" />
            </Link>
          }
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <div className="flex items-center gap-4">
            <NavLinks />
          </div>
          {user ? (
            <div className="flex items-center gap-6">
              <Link
                href="/profile"
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600"
              >
                <UserCircleIcon className="size-8  hover:text-blue-500" />
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* md/sm screen Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 ">
          <NavLinks onClick={closeMenu} />
          {user ? (
            <div className="flex flex-col gap-3 items-end">
              <LogoutButton />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
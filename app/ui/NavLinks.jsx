'use client';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' },
    { name: 'About', href: '/about' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-end lg:justify-center gap-2 text-sm md:text-lg text-gray-600 font-medium hover:text-blue-600 lg:py-2 md:px-3",
                            {
                                "text-blue-600": pathname === link.href,
                            },
                        )}
                    >
                        <p className="block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}

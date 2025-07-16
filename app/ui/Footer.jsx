import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="pt-20 pb-5 text-sm text-gray-500">
            <div className="max-w-6xl mx-auto px-4 grid gap-10 md:[grid-template-columns:2fr_1fr_1fr] text-center md:text-left">

                <div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                        <Image
                            src="/logo.png"
                            alt="Job Explorer Logo"
                            width={32}
                            height={32}
                        />
                        <span className="font-semibold text-base text-gray-600">
                            Job Explorer
                        </span>
                    </div>
                    <p className="md:pr-48">
                        Explore job opportunities from across industries and find your perfect fit.
                        Your next career move starts here.
                    </p>
                </div>

                <div>
                    <h4 className="font-medium mb-3">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-black">Home</Link></li>
                        <li><Link href="/jobs" className="hover:text-black">Jobs</Link></li>
                        <li><Link href="/about" className="hover:text-black">About</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-3">Contact</h4>
                    <p>Email: contact@jobexplorer.com</p>
                    <p className="mt-1">Location: Bengaluru, India</p>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Job Explorer. All rights reserved.
            </div>
        </footer>
    );
}
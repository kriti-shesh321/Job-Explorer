'use client';

import { SessionProvider } from "next-auth/react";
import NavBar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
    return (
        <SessionProvider>
            <div className="flex w-full min-h-screen flex-col justify-between">
                <NavBar />
                <main>{children}</main>
                <Footer />
            </div>
        </SessionProvider>
    );
}
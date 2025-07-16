import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/Navbar";
import Footer from "./ui/Footer";

export const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template: " %s | Job Explorer Lite",
    default: "Job Explorer Lite"
  },
  description: "A simple job search application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex w-full min-h-screen flex-col text-gray-900 justify-between`}
      >
        <NavBar />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

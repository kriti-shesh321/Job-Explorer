import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ui/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template: "%s | Job Explorer Lite",
    default: "Job Explorer Lite",
  },
  description: "A simple job search application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased text-gray-900`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

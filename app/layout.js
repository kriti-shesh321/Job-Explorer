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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.variable} antialiased text-gray-900`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

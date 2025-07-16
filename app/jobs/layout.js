import CTABanner from "../ui/dashboard/CTABanner";

export default function RootLayout({ children }) {
    return (
        <>
            <div className="min-h-screen">
                {children}
            </div>
            <CTABanner />
        </>
    );
}

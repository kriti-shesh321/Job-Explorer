import AboutSection from "../ui/About";

export const metadata = {
    title: "About"
};

export default function AboutPage() {
    return (
        <div className="min-h-[70vh]">
            <AboutSection />
        </div>
    );
}
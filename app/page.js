import ChooseCategory from "./ui/dashboard/ChooseCategory";
import CTABanner from "./ui/dashboard/CTABanner";
import Hero from "./ui/dashboard/Hero";
import RecentJobs from "./ui/dashboard/RecentJobs";
import StatsSnapshot from "./ui/dashboard/StatsSnapshot";
import { Suspense } from "react";
import { CategoryCardsSkeleton, RecentJobsSkeleton } from "./skeletons";

export default function Page() {
  return (
    <main className="w-full mx-auto">
      <Hero />

      <Suspense fallback={<CategoryCardsSkeleton />}>
        <ChooseCategory />
      </Suspense>

      <StatsSnapshot />
      
      <Suspense fallback={<RecentJobsSkeleton />}>
        <RecentJobs />
      </Suspense>


      <CTABanner />
    </main>
  );
}
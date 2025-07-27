'use client';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useBookmark } from '@/app/hooks/useBookmark';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function BookmarkButton({ jobId, isBookmarked: externalBookmarked, toggleBookmark: externalToggle, isLoading: externalLoading }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const hook = useBookmark(jobId);
  const isBookmarked = externalBookmarked ?? hook.isBookmarked;
  const toggleBookmark = externalToggle ?? hook.toggleBookmark;
  const isLoading = externalLoading ?? hook.isLoading;

  if (status === "loading") return null;

  const handleClick = async (e) => {
    e.stopPropagation();
    if (!session?.user) {
      router.push("/login");
      return;
    }
    await toggleBookmark();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`relative z-10 max-h-fit flex items-center justify-between text-sm md:text-md px-2 md:px-3 py-1 bg-blue-50 text-blue-800 space-x-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span>{isBookmarked ? 'Saved' : 'Save Job'}</span>
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export function useBookmark(jobId) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (!session?.user || !jobId) return;

    const checkBookmark = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/bookmark/check?jobId=${jobId}`);
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error('Error checking bookmark:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmark();
  }, [jobId, session]);

  const toggleBookmark = async () => {
    if (!session?.user) {
      window.location.href = '/login';
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/bookmark/toggle', {
        method: 'POST',
        body: JSON.stringify({ jobId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    if (!session?.user || !jobId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/bookmark/check?jobId=${jobId}`);
      const data = await res.json();
      setIsBookmarked(data.isBookmarked);
    } catch (error) {
      console.error('Error checking bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [jobId, session]);

  return { isBookmarked, toggleBookmark, isLoading, refetch };
}
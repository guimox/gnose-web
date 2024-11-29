'use client';

import { useState, useEffect, useCallback } from 'react';
import QuoteCard from '@/components/quote/quote';
import { fetchWithBaseUrl } from '@/utils/api-client';

const QUOTES_PER_PAGE = 5;

interface Quote {
  id: string;
  // Add other quote properties
}

export default function InfiniteScrollQuotes({
  initialQuotes,
}: {
  initialQuotes: Quote[];
}) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreQuotes = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { data } = await fetchWithBaseUrl<{
        quotes: Quote[];
        totalPages: number;
      }>(`/quotes?page=${page}&size=${QUOTES_PER_PAGE}`, {
        cache: 'no-store',
      });

      if (data?.quotes?.length) {
        setQuotes((prevQuotes) => [...prevQuotes, ...data.quotes]);
        setPage((prevPage) => prevPage + 1);

        // Check if we've reached the last page
        if (data.quotes.length < QUOTES_PER_PAGE) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more quotes:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        loadMoreQuotes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreQuotes]);

  return (
    <>
      <div className="mb-20 grid gap-2 divide-y divide-solid">
        {quotes.map((quote: any, index) => (
          <QuoteCard quote={quote} key={`${quote.id}-${index}`} />
        ))}
      </div>
      {isLoading && (
        <div className="py-4 text-center">Loading more quotes...</div>
      )}
      {!hasMore && (
        <div className="py-4 text-center text-gray-500">
          No more quotes to load
        </div>
      )}
    </>
  );
}

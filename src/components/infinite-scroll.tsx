'use client';

import QuoteCard from '@/components/quote/quote';
import { fetchWithBaseUrl } from '@/utils/api-client';
import { useCallback, useEffect, useState } from 'react';

const QUOTES_PER_PAGE = 8;

interface Quote {
  id: string;
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
      }>(`/quotes?page=${page}&size=${QUOTES_PER_PAGE}`);

      if (data?.quotes?.length) {
        setQuotes((prevQuotes) => [...prevQuotes, ...data.quotes]);
        setPage((prevPage) => prevPage + 1);

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
        {quotes.map((quote: any) => (
          <QuoteCard quote={quote} key={quote.id} />
        ))}
      </div>
      {isLoading && (
        <div className="py-4 text-center">Loading more quotes...</div>
      )}
      {!hasMore && (
        <div className="py-4 text-center text-gray-500 sm:py-8">
          No more quotes to load
        </div>
      )}
    </>
  );
}

import DialogShare from '@/components/client/dialog-share';
import Header from '@/components/client/header/header';
import PaginationPage from '@/components/client/pagination-page';
import InfiniteScrollQuotes from '@/components/InfiniteScrollQuotes';
import QuoteCard from '@/components/quote/quote';
import { fetchWithBaseUrl } from '@/utils/api-client';
import { notFound } from 'next/navigation';

const QUOTES_PER_PAGE = 8;

async function getQuotes(page: number) {
  const { data, error } = await fetchWithBaseUrl<{
    quotes: Array<any>;
    totalPages: number;
  }>(`/quotes?page=${page}&size=${QUOTES_PER_PAGE}`, {
    cache: 'no-store',
  });

  if (error) {
    console.error('Error fetching quotes in main page:', error);
    return { quotes: [], totalPages: 0 };
  }

  return data || { quotes: [], totalPages: 0 };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const pageParam =
    searchParams && searchParams.page ? parseInt(searchParams.page) : 0;

  const currentPage = isNaN(pageParam) || pageParam < 1 ? 0 : pageParam - 1;

  const { quotes, totalPages } = await getQuotes(currentPage);

  if (!quotes.length) {
    notFound();
  }

  return (
    <>
      <Header />
      <InfiniteScrollQuotes initialQuotes={quotes} />

      <DialogShare />
    </>
  );
}

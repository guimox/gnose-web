import DialogShare from '@/components/client/dialog-share';
import Header from '@/components/client/header/header';
import InfiniteScrollQuotes from '@/components/infinite-scroll';
import SearchQuote from '@/components/server/search-quote';
import SelectTag from '@/components/server/select-tag';
import { fetchWithBaseUrl } from '@/utils/api-client';

const QUOTES_PER_PAGE = 8;

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function getQuotes(page: number) {
  const { data, error } = await fetchWithBaseUrl<{
    quotes: Array<any>;
    totalPages: number;
  }>(`/quotes?page=${page}&size=${QUOTES_PER_PAGE}`);

  if (error) {
    console.error('Error fetching quotes in main page:', error);
    return { quotes: [], totalPages: 0 };
  }

  return data || { quotes: [], totalPages: 0 };
}

export default async function HomePage() {
  const quotes = await getQuotes(0);

  return (
    <>
      <Header />
      <SelectTag />
      <InfiniteScrollQuotes initialQuotes={quotes.quotes} />
      <DialogShare />
    </>
  );
}

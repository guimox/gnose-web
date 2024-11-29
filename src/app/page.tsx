import DialogShare from '@/components/client/dialog-share';
import Header from '@/components/client/header/header';
import PaginationPage from '@/components/client/pagination-page';
import QuoteCard from '@/components/quote/quote';
import { fetchWithBaseUrl } from '@/utils/api-client';

const QUOTES_PER_PAGE = 10;

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
    ('no quotes');
  }

  return (
    <>
      <Header />
      <div className="mb-20 grid gap-2 divide-y divide-solid">
        {quotes.map((quote: any, index: number) => (
          <QuoteCard quote={quote} key={index} />
        ))}
      </div>
      <DialogShare />
      <PaginationPage currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

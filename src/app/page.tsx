import DialogShare from '@/components/client/dialog-share';
import Header from '@/components/client/header/header';
import PaginationPage from '@/components/client/pagination-page';
import QuoteCard from '@/components/quote/quote';
import { notFound } from 'next/navigation';

const QUOTES_PER_PAGE = 10;

async function getQuotes(page: number) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${API_URL}/quotes?page=${page}&size=${QUOTES_PER_PAGE}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const pageParam =
    searchParams && searchParams.page ? parseInt(searchParams.page) : 0;

  const currentPage = isNaN(pageParam) || pageParam < 1 ? 0 : pageParam - 1;

  const { quotes, totalPages, totalItems } = await getQuotes(currentPage);

  if (!quotes.length) {
    notFound();
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

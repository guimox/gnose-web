import Header from '@/components/client/header/header';
import QuoteCard from '@/components/quote/quote';
import { fetchWithBaseUrl } from '@/utils/api-client';

async function getQuote() {
  const response = await fetchWithBaseUrl<any>('/quotes/random');

  if (response.error) {
    console.error('Error fetching quote:', response.error);
    return null;
  }

  return response.data;
}

export default async function RandomPage() {
  const quoteData = await getQuote();

  if (!quoteData) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="mx-auto">
          <div className="my-10 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-700">
              Error loading quote. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <QuoteCard quote={quoteData} />
    </main>
  );
}

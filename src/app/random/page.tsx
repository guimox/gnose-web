import Header from '@/components/client/header/header';
import QuoteCard from '@/components/quote/quote';
import { fetchWithBaseUrl } from '@/utils/api-client';

async function getQuote() {
  const response = await fetchWithBaseUrl<any>('/quotes/10');

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
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
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
      <div className="container mx-auto px-4 py-8">
        <QuoteCard quote={quoteData} />
      </div>
    </main>
  );
}

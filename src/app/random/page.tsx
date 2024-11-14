// app/random/page.js

import Header from '@/components/client/header/header';
import QuoteCard from '@/components/quote/quote';

export default async function RandomPage() {
  const res = await fetch('http://localhost:8081/quotes/10', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <div>
        <p>Error loading quote. Please try again later.</p>
      </div>
    );
  }

  const quoteData = await res.json();

  return (
    <>
      <Header />
      <QuoteCard quote={quoteData} />
    </>
  );
}

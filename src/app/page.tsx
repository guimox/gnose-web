import DialogShare from '@/components/client/dialog-share';
import QuoteCard from '@/components/quote/quote';

async function getQuotes() {
  try {
    const response = await fetch('https://api.gnose.app/quotes', {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

export default async function HomePage() {
  const quotes = await getQuotes();

  return (
    <>
      <div className="grid gap-4 divide-y divide-solid">
        {quotes.map((quote: any, index: number) => (
          <QuoteCard quote={quote} key={index} />
        ))}
      </div>
      <DialogShare />
    </>
  );
}

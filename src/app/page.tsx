import DialogShare from '@/components/client/dialog-share';
import VoterQuote from '@/components/client/voter-quote';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        {quotes.map((quote: any) => (
          <div key={quote.id}>
            <div className="flex items-center justify-start gap-4 py-6">
              <div className="flex w-fit flex-col items-center justify-start gap-2 rounded-md border p-2">
                <VoterQuote quoteId={quote.id} initialVotes={quote.votes} />
              </div>
              <div className="flex flex-col justify-between gap-3">
                <p className="text-lg font-bold md:text-xl">{quote.quote}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="rounded-md">
                    Relationship
                  </Badge>
                </div>
                <p className="text-sm font-light text-gray-400">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DialogShare />
    </>
  );
}

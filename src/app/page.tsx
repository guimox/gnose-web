import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';

async function getQuotes() {
  try {
    const response = await fetch('https://test.gnose.app/api/quotes', {
      next: {
        revalidate: 60,
      },
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
    <div className="container mx-auto py-8">
      <nav className="pb-10">
        <ul className="flex gap-4 rounded-md py-4">
          <li className="cursor-pointer font-bold text-primary hover:opacity-50">
            Quotes
          </li>
          <li className="cursor-pointer font-bold text-primary hover:opacity-50">
            Share a quote
          </li>
          <li className="cursor-pointer font-bold text-primary hover:opacity-50">
            Random
          </li>
          <li className="cursor-pointer font-bold text-primary hover:opacity-50">
            About
          </li>
        </ul>
      </nav>
      <div className="grid gap-4 divide-y divide-dashed">
        {quotes.map(
          (quote: {
            id: number;
            quote: string;
            votes: number;
            createdAt: string;
          }) => (
            <div key={quote.id}>
              <div className="flex items-center justify-start gap-4 py-4">
                <div className="flex w-fit flex-col items-center justify-start gap-2 rounded-md border p-2">
                  <ChevronUp className="h-3 w-3 cursor-pointer hover:opacity-25" />
                  <p className="text-sm text-gray-500">{quote.votes}</p>
                  <ChevronDown className="h-3 w-3 cursor-pointer hover:opacity-25" />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-bold md:text-xl">{quote.quote}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Relationship</Badge>
                    <p className="text-sm font-light text-gray-400">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

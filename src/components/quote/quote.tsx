'use client';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Quote {
  key: number;
  id: number;
  createdAt: string;
  votes: number;
  quote: string;
  category: {
    name: string;
  };
  language: {
    name: string;
  };
}

export default function QuoteCard({ quote }: { quote: Quote }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(quote.quote).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div key={quote.id}>
      <div className="mt-4 flex items-center justify-start gap-4 py-6">
        <div className="flex flex-col justify-between gap-3">
          <p className="text-lg font-bold md:text-xl">{quote.quote}</p>
          <div className="flex items-center justify-start gap-4">
            {copySuccess ? (
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 border-none bg-primary p-1 text-white"
              >
                <ClipboardCheck />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 border-none bg-gray-100 p-1"
              >
                <Clipboard onClick={handleCopy} />
              </Button>
            )}
            <Badge
              variant="secondary"
              className="cursor-pointer rounded-md bg-gray-100 hover:opacity-50"
            >
              {quote.language.name}
            </Badge>{' '}
            <Badge
              variant="outline"
              className="cursor-pointer rounded-md hover:opacity-50"
            >
              {quote.category.name}
            </Badge>
          </div>
          <p className="text-sm font-light text-gray-400">
            {new Date(quote.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
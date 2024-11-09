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

function LanguageBadge({ language }: { language: string }) {
  let displayText;
  switch (language) {
    case 'English':
      displayText = 'EN';
      break;
    case 'Spanish':
      displayText = 'ES';
      break;
    case 'Portuguese':
      displayText = 'PT';
      break;
    default:
      displayText = 'Unknown';
  }

  return (
    <Badge variant="secondary" className="rounded-md bg-gray-100">
      {displayText}
    </Badge>
  );
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
      <div className="flex items-center justify-start gap-4 py-6">
        <div className="flex flex-col justify-between gap-3">
          <p className="text-lg font-bold md:text-xl">{quote.quote}</p>
          <div className="flex items-center justify-start gap-4">
            {copySuccess ? (
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 border-none bg-gray-100 p-1"
              >
                <ClipboardCheck />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 border-none bg-gray-100 p-1"
              >
                <Clipboard onClick={handleCopy} />
              </Button>
            )}
            <LanguageBadge language={quote.language.name} />
            <Badge variant="outline" className="rounded-md">
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

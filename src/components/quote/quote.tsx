'use client';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export default function QuoteCard({ quote }: any) {
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
          <div className="flex items-center gap-4">
            {copySuccess ? (
              <ClipboardCheck />
            ) : (
              <Clipboard
                size={15}
                className="cursor-pointer hover:opacity-50"
                onClick={handleCopy}
              />
            )}
            {/* <Badge variant="outline" className="rounded-md">
              Relationship
            </Badge> */}
          </div>
          <p className="text-sm font-light text-gray-400">
            {new Date(quote.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

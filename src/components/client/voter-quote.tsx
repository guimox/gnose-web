'use client';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { fetchWithBaseUrl } from '@/utils/api-client';

interface VoteResponse {
  votes: number;
}

export default function VoterQuote({
  initialVotes,
  quoteId,
}: {
  initialVotes: number;
  quoteId: number;
}) {
  const [votes, setVotes] = useState(initialVotes);

  const handleUpvote = async () => {
    const { data, error } = await fetchWithBaseUrl<VoteResponse>(
      `/quotes/${quoteId}/upvote`,
      {
        method: 'POST',
      }
    );

    if (!error) {
      setVotes(data.votes);
    } else {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    const { data, error } = await fetchWithBaseUrl<VoteResponse>(
      `/quotes/${quoteId}/downvote`,
      {
        method: 'POST',
      }
    );

    if (!error) {
      setVotes(data.votes);
    } else {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <>
      <ChevronUp
        className="h-3 w-3 cursor-pointer hover:opacity-25"
        onClick={handleUpvote}
      />
      <p className="text-sm text-gray-500">{votes}</p>
      <ChevronDown
        className="h-3 w-3 cursor-pointer hover:opacity-25"
        onClick={handleDownvote}
      />
    </>
  );
}

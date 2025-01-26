'use client';
import { useState, useEffect } from 'react';
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
  const [isPending, setIsPending] = useState(false);
  const [hasVoted, setHasVoted] = useState<[boolean, boolean]>([false, false]); // [upvoted, downvoted]

  useEffect(() => {
    const votedQuotes = JSON.parse(localStorage.getItem('votedQuotes') || '{}');
    if (votedQuotes[quoteId]) {
      setHasVoted(votedQuotes[quoteId]);
    }
  }, [quoteId]);

  const handleVote = async (isUpvote: boolean) => {
    if (isPending) return;

    const voteIndex = isUpvote ? 0 : 1;
    const oppositeVoteIndex = isUpvote ? 1 : 0;
    const alreadyVoted = hasVoted[voteIndex];

    setIsPending(true);

    const { data, error } = await fetchWithBaseUrl<VoteResponse>(
      `/quotes/${quoteId}/${isUpvote ? 'upvote' : 'downvote'}`,
      { method: 'POST' }
    );

    setIsPending(false);

    if (error) {
      console.error(`Error ${isUpvote ? 'upvoting' : 'downvoting'}:`, error);
    } else if (data) {
      let newVotes = data.votes;

      if (alreadyVoted) {
        newVotes = isUpvote ? votes - 1 : votes + 1;
      } else if (hasVoted[oppositeVoteIndex]) {
        newVotes = isUpvote ? votes + 1 : votes - 1;
      }

      setVotes(newVotes);

      const updatedHasVoted: [boolean, boolean] = [false, false];
      updatedHasVoted[voteIndex] = !alreadyVoted;
      setHasVoted(updatedHasVoted);

      const votedQuotes = JSON.parse(
        localStorage.getItem('votedQuotes') || '{}'
      );
      votedQuotes[quoteId] = updatedHasVoted;
      localStorage.setItem('votedQuotes', JSON.stringify(votedQuotes));
    }
  };

  return (
    <>
      <ChevronUp
        strokeWidth={5}
        className={`h-3 w-3 cursor-pointer ${
          hasVoted[0] ? 'font-bold text-primary' : 'hover:opacity-75'
        }`}
        onClick={() => handleVote(true)}
      />
      <p className="min-w-4 text-center text-sm text-gray-500">{votes}</p>
      <ChevronDown
        strokeWidth={5}
        className={`h-3 w-3 cursor-pointer ${
          hasVoted[1] ? 'font-bold text-primary' : 'hover:opacity-75'
        }`}
        onClick={() => handleVote(false)}
      />
    </>
  );
}

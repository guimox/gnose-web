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

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Quotes</h1>
      <div className="grid gap-4">
        {quotes.map(
          (quote: {
            id: number;
            quote: string;
            createdAt: string;
            updatedAt: string;
          }) => (
            <div key={quote.id}>
              <div className="py-4">
                <p className="text-lg">{quote.quote}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(quote.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

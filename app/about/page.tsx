import Header from '@/components/client/header/header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="mt-4 py-6">
        <p className="mb-4 text-gray-700">
          Welcome to <strong>Gnose</strong> — a place where people come to share
          the quotes that inspire, provoke, and resonate with them. We believe
          in the power of words and aim to create a space that celebrates
          meaningful thoughts, curated by the community.
        </p>
        <p className="mb-4 text-gray-700">
          Built with <strong>Spring Boot</strong> and <strong>Next.js</strong>,
          Gnose integrates <strong>OpenAI</strong> to ensure that shared content
          is moderated, corrected, and thoughtfully categorized. This technology
          helps keep the platform clean, relevant, and welcoming for all.
        </p>
        <p className="text-gray-700">
          I believe that simplicity always wins. I`ve crafted a minimalist
          experience so that the focus stays where it should — on the quotes
          themselves.
        </p>{' '}
      </div>
    </>
  );
}

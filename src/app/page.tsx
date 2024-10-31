import { FormQuote } from '@/components/client/form-quote';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full mb-10">
        <FormQuote />
      </main>{' '}
    </div>
  );
}

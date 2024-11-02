import { FormQuote } from '@/components/client/form-quote';

export default function Quotes() {
  return (
    <div className="flex min-h-screen items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 mb-10 flex w-full flex-col items-center gap-8 sm:items-start">
        <FormQuote />
      </main>{' '}
    </div>
  );
}

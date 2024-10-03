import { FormQuote } from "@/components/client/form-quote";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col max-h-20 gap-8 row-start-2 items-center sm:items-start w-full">
        <FormQuote />
      </main>{" "}
    </div>
  );
}

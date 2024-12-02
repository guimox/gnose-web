'use client';
import SearchQuote from '@/components/server/search-quote';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/ModalContext';
import NavLink from './navlink';

export default function Header() {
  const { openModal } = useModal();

  return (
    <nav className="mx-auto flex w-full items-center justify-between">
      <ul className="flex gap-4 rounded-md py-4">
        <NavLink href="/">Quotes</NavLink>
        <NavLink href="/random">Random</NavLink>
      </ul>
      <div className="flex w-fit items-center justify-end gap-3">
        <div className="w-1/2">
          <SearchQuote />
        </div>
        <Button onClick={openModal} size={'sm'}>
          Share a quote
        </Button>
      </div>
    </nav>
  );
}

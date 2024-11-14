'use client';
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
        <NavLink href="/about">About</NavLink>
      </ul>
      <Button onClick={openModal} size={'sm'}>
        Share a quote
      </Button>
    </nav>
  );
}

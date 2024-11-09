'use client';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/ModalContext';
import NavLink from './navlink';

export default function Header() {
  const { openModal } = useModal();

  return (
    <nav className="mx-auto flex w-full max-w-2xl items-center justify-between p-4">
      <ul className="flex gap-4 rounded-md py-4">
        <NavLink href="/">Quotes</NavLink>
        <NavLink href="/random">Random</NavLink>
        <NavLink href="/about">About</NavLink>
      </ul>
      <Button onClick={openModal}>Share a quote</Button>
    </nav>
  );
}

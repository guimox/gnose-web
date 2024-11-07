'use client';
import { useModal } from '@/context/ModalContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const NavLink = ({ href, children }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="relative">
      <Link href={href}>
        <span
          className={`hover:opacity-50 ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeBackground"
            className="mt-1 h-1 w-full rounded-md bg-primary"
            style={{ zIndex: -1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              bounce: 0,
              damping: 30,
            }}
          />
        )}
      </Link>
    </li>
  );
};

export default function Header() {
  const { openModal } = useModal();

  return (
    <nav className="mx-auto flex w-full max-w-2xl items-center justify-between px-4">
      <ul className="flex gap-4 rounded-md py-4">
        <NavLink href="/">Quotes</NavLink>
        <NavLink href="/random">Random</NavLink>
        <NavLink href="/about">About</NavLink>
      </ul>
      <Button onClick={openModal}>Share a quote</Button>
    </nav>
  );
}

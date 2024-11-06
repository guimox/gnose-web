'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useModal } from '@/context/ModalContext';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NavLink = ({ href, children }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="relative">
      <Link href={href}>
        <span
          className={`cursor-pointer font-bold hover:opacity-50 ${
            isActive ? 'text-primary' : 'text-gray-400'
          }`}
        >
          {children}
        </span>
      </Link>
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
    </li>
  );
};

export default function Header() {
  const { openModal } = useModal();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-2xl items-center justify-between px-4 pb-10"
    >
      <ul className="flex gap-4 rounded-md py-4">
        <NavLink href="/">Quotes</NavLink>
        <NavLink href="/random">Random</NavLink>
        <NavLink href="/about">About</NavLink>
      </ul>
      <motion.div
        className="w-fit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={openModal}>Share a quote</Button>
      </motion.div>
    </motion.nav>
  );
}

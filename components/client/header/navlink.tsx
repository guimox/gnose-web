'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }: any) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="relative">
      <Link href={href}>
        <span
          className={`hover:opacity-50 ${isActive ? 'font-bold text-primary' : 'text-gray-400'}`}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}

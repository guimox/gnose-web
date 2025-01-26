import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from '@/context/ModalContext';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import * as React from 'react';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Gnose - Share knowledge',
  description: 'Share your quotes to the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto w-full antialiased`}
      >
        <TooltipProvider>
          <ModalProvider>
            <main className="mx-auto w-full max-w-3xl px-4">{children}</main>
          </ModalProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}

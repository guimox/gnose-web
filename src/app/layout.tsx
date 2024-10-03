import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavMenu } from "@/components/client/nav-menu";
import Header from "@/components/server/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gnos - Share knowledge",
  description: "Share your quotes to the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-2xl mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}

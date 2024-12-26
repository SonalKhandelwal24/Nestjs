'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import dynamic from 'next/dynamic';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Include Navbar here */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}

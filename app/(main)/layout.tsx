"use client";
import MenuBar from "../components/MenuBar";
import { StackTheme } from "@stackframe/stack";
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StackTheme>
      <MenuBar />
      {children}
    </StackTheme>
  );
}

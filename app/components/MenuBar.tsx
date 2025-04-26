"use client";
import Link from "next/link";
import { useUser, useStackApp, UserButton } from "@stackframe/stack";

export default function MenuBar() {
  const user = useUser();
  const app = useStackApp();

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg select-none">K Business Academy</span>
      </div>
      <div className="flex items-center gap-4 font-semibold">
        {!user && <Link href="/blog" className="hover:text-blue-300">BLOG</Link>}
        {!user && (
          <button
            className="hover:text-blue-300 focus:outline-none bg-transparent border-none cursor-pointer"
            style={{ font: 'inherit' }}
            onClick={() => app && app.redirectToSignUp && app.redirectToSignUp()}
            type="button"
          >
            SIGN-UP / REGISTER
          </button>
        )}
        {user && (
          <>
            <Link href="/students" className="hover:text-blue-300">Students</Link>
            <UserButton />
          </>
        )}
      </div>
    </nav>
  );
}

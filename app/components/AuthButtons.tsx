"use client";
import { useStackApp, useUser, UserButton } from "@stackframe/stack";

export default function AuthButtons() {
  const app = useStackApp();
  const user = useUser();

  if (user) {
    return <UserButton />;
  }
  // Not signed in
  return (
    <>
      <button
        onClick={() => app.redirectToSignUp()}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
      >
        Sign Up
      </button>
      <button
        onClick={() => app.redirectToSignIn()}
        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-semibold"
      >
        Sign In
      </button>
    </>
  );
}


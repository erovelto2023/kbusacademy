"use client";
import { useUser, useStackApp } from "@stackframe/stack";

export default function SignOutButton() {
  const user = useUser();
  const app = useStackApp();

  const handleSignOut = () => {
    if (user && typeof user.signOut === "function") {
      user.signOut();
    } else {
      alert("Sign out is not available in this version of Stack Auth.");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold ml-2"
    >
      Sign Out
    </button>
  );
}

"use client";
import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link
      href="/students/profile"
      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 font-semibold ml-2"
    >
      Profile
    </Link>
  );
}

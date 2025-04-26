"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// TODO: Set this to your real admin email
const ADMIN_EMAIL = "erovelto@outlook.com";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const user = useUser({ or: "redirect" });
  const router = useRouter();

  // Only user.primaryEmail is used for admin check
  const email = user?.primaryEmail;
  // DEBUG: Log emails for troubleshooting
  if (typeof window !== 'undefined') {
    console.log("AdminGuard: user.primaryEmail =", email, "ADMIN_EMAIL =", ADMIN_EMAIL);
  }

  useEffect(() => {
    if (user && email !== ADMIN_EMAIL) {
      router.replace("/students");
    }
  }, [user, email, router]);

  if (!user || email !== ADMIN_EMAIL) {
    return null;
  }
  return <>{children}</>;
}

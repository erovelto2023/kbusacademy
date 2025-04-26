import StudentProfileClient from "./StudentProfileClient";
import { api } from "../../../convex/_generated/api";
import { Metadata } from "next";
// TODO: For full SEO, create a Next.js API route to fetch profile data server-side and use fetch here.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // No server helper available for Convex in this setup.
  // Fallback to generic metadata for now.
  return {
    title: `Student Profile`,
    description: `View the profile for this student.`,
  };
}

export default function StudentProfilePage({ params }: { params: { slug: string } }) {
  return <StudentProfileClient slug={params.slug} />;
}

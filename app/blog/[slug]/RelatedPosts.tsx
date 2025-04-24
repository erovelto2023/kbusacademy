"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

function shuffle<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RelatedPosts({ currentPostId }: { currentPostId: string }) {
  const allPosts = useQuery(api.posts.list) || [];
  // Exclude the current post
  const otherPosts = allPosts.filter((p: any) => p._id !== currentPostId);
  // Shuffle and take 10
  const related = shuffle(otherPosts).slice(0, 10);

  if (related.length === 0) return <div className="text-gray-500">No related posts.</div>;

  return (
    <ul className="space-y-2 text-sm">
      {related.map((post: any) => (
        <li key={post._id}>
          <Link href={`/blog/${post.slug || post._id}`} className="text-blue-600 hover:underline">
            {post.title}
          </Link>
          <div className="text-xs text-gray-400">{post.date ? new Date(post.date).toLocaleDateString() : null}</div>
        </li>
      ))}
    </ul>
  );
}

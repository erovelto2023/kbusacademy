"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { Id } from '../../../convex/_generated/dataModel';

function AuthorImage({ storageId, alt, className }: { storageId: string, alt?: string, className?: string }) {
  const url = useQuery(api.files.getFileUrl, { storageId });
  if (!url) return null;
  return <img src={url} alt={alt} className={className} />;
}

export default function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = React.use(params);
  const author = useQuery(api.authors.getBySlug, { slug });
  const allPosts = useQuery(api.posts.list) || [];

  // Filter posts by this author
  const posts = author ? allPosts.filter((p: any) => p.author === author._id) : [];

  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 25;
  const pagedPosts = posts.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(posts.length / pageSize);

  if (!author) return <div className="max-w-xl mx-auto py-12">Loading...</div>;
  if (author === null) return <div className="max-w-xl mx-auto py-12">Author not found.</div>;

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="flex items-center gap-6 mb-8">
        {author.image && (
          <AuthorImage storageId={author.image} alt={author.name} className="w-24 h-24 rounded-full object-cover border" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{author.name}</h1>
          <div className="text-gray-600 mt-2">{author.bio}</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Blog Posts by {author.name}</h2>
      {pagedPosts.length === 0 ? (
        <div className="text-gray-500">No posts found for this author.</div>
      ) : (
        <div className="space-y-4">
          {pagedPosts.map((post: any) => (
            <div key={post._id} className="bg-white rounded shadow p-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">{post.title}</div>
                <div className="text-sm text-gray-500">{post.date}</div>
              </div>
              <Link href={`/blog/${post.slug || post._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
                target="_blank"
              >
                Visit
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <span className="px-2 py-1">Page {page + 1} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

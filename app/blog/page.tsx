"use client";
"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import BlogCard from "./BlogCard";

import type { Id } from "../../convex/_generated/dataModel";

type Post = {
  _id: Id<"posts">;
  title: string;
  content: string;
  slug: string;
  createdAt?: number;
  featuredImage?: string;
};


export default function BlogListPage() {
  // Search state
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Get posts (search or all)
  const posts = useQuery(
    debouncedSearch ? api.posts.searchByTitle : api.posts.list,
    debouncedSearch ? { query: debouncedSearch } : {}
  ) as Post[] || [];

  // Pagination logic
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);
  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blog titles..."
            className="w-full max-w-md border rounded px-4 py-2 text-sm shadow bg-white"
          />
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">K Business Academy Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {paginatedPosts.length === 0 && <div className="col-span-full text-center text-gray-500">No posts yet.</div>}
          {paginatedPosts.map(post => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


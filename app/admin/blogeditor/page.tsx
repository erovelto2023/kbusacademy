"use client";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import type { Id } from '../../../convex/_generated/dataModel';

export default function BlogEditorPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date-desc");
  const posts = useQuery(api.posts.list) || [];
  const deletePost = useMutation(api.posts.deletePost);

  const filteredPosts = posts
    .filter((post: any) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.slug && post.slug.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      switch (sort) {
        case "date-desc": return (b.date || b.createdAt || 0).localeCompare(a.date || a.createdAt || 0);
        case "date-asc": return (a.date || a.createdAt || 0).localeCompare(b.date || b.createdAt || 0);
        case "title-asc": return a.title.localeCompare(b.title);
        case "title-desc": return b.title.localeCompare(a.title);
        case "likes-desc": return (b.likes || 0) - (a.likes || 0);
        case "likes-asc": return (a.likes || 0) - (b.likes || 0);
        default: return 0;
      }
    });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost({ id: id as Id<'posts'> });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900/95 border-r border-blue-900/40 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-blue-200 mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2 mb-8">
          <Link href="/admin" className="px-3 py-2 rounded text-gray-200 hover:bg-gray-800 hover:text-blue-300 transition-colors font-medium">Dashboard</Link>
          <Link href="/admin/blogeditor" className="px-3 py-2 rounded bg-blue-700 text-white font-semibold">Blog Editor</Link>
          <Link href="/admin/blog" className="px-3 py-2 rounded bg-blue-800 text-blue-100 font-semibold">Blog Posts</Link>
        </nav>
        <div className="mt-4">
          <h3 className="text-blue-400 font-bold mb-2 text-sm">Recent Posts</h3>
          <div className="flex flex-col gap-1">
            {posts.slice(0, 10).map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug || post._id}`} className="truncate px-2 py-1 rounded hover:bg-blue-800 text-blue-100 text-xs">
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <h1 className="text-3xl font-bold text-blue-300 mb-6">Blog Post Manager</h1>
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-blue-100 placeholder:text-blue-400 border-none shadow-inner w-full md:w-64"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-blue-100 border-none"
          >
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="likes-desc">Most Likes</option>
            <option value="likes-asc">Least Likes</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded shadow-lg">
          <table className="min-w-full bg-gray-900/80 text-blue-100">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Likes</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post: any) => (
                <tr key={post._id} className="border-t border-blue-900/40">
                  <td className="px-4 py-2 truncate max-w-xs">{post.title}</td>
                  <td className="px-4 py-2">{post.date ? post.date.substring(0, 10) : ''}</td>
                  <td className="px-4 py-2">{post.likes || 0}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        window.location.href = `/admin/blog?edit=${post._id}`;
                      }}
                      className="px-2 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
                    >Edit</button>
                    <button
                      onClick={async () => {
                        await handleDelete(post._id);
                        window.location.reload();
                      }}
                      className="px-2 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
                    >Delete</button>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-blue-400">No posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

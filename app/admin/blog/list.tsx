"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function BlogListManager() {
  const posts = useQuery(api.posts.list) || [];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
        <div className="h-16 flex items-center px-6 font-bold text-lg border-b">Manager</div>
        <nav className="flex-1 flex flex-col gap-2 px-2 mt-4">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Dashboard</Link>
          <Link href="/admin/blog/list" className="px-3 py-2 rounded bg-blue-200 font-medium">Blog Manager</Link>
          <Link href="/admin/users" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Users</Link>
          <Link href="/admin/settings" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Settings</Link>
          <Link href="/admin/sales" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Sales</Link>
          <Link href="/admin/programs" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Programs</Link>
          <Link href="/admin/links" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Links</Link>
          <Link href="/admin/tools" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Tools</Link>
          <Link href="/admin/community" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Community</Link>
          <Link href="/admin/classes" className="px-3 py-2 rounded hover:bg-blue-100 font-medium">Classes</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Blog Manager</h1>
          <Link href="/admin/blog" className="btn btn-primary">Add Blog Post</Link>
        </div>
        <div className="bg-white rounded shadow p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Stats</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post._id} className="border-t">
                  <td className="px-4 py-2">
                    <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{post.author}</td>
                  <td className="px-4 py-2">{post.likes || 0}</td>
                  <td className="px-4 py-2">{post.date ? post.date : ''}</td>
                  <td className="px-4 py-2">
                    <Link href={`/admin/blog?edit=${post._id}`} className="text-blue-500 hover:underline mr-3">Edit</Link>
                    <Link href={`/admin/blog?delete=${post._id}`} className="text-red-500 hover:underline">Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

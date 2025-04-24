"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { notFound } from "next/navigation";
import PostContent from "./PostContent";
import AuthorSidebarCard from "./AuthorSidebarCard";
import RelatedPosts from "./RelatedPosts";

import React from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const post = useQuery(api.posts.getBySlug, { slug });
  if (post === undefined) return <div>Loading...</div>;
  if (post === null) return notFound();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow p-8">
            <PostContent title={post.title} content={post.content} />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
          {/* About the Author */}
          <section className="bg-white rounded-lg shadow p-6">
            <AuthorSidebarCard authorId={post.author} />
          </section>

          {/* Related Posts */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold mb-3">Related Posts</div>
            <RelatedPosts currentPostId={post._id} />
          </section>

          {/* Categories */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold mb-3">Categories</div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-700">Web Development</span>
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-700">JavaScript</span>
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-700">React</span>
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-700">CSS</span>
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-700">UI/UX</span>
            </div>
          </section>

          {/* Newsletter */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold mb-3">Subscribe to Newsletter</div>
            <div className="text-xs text-gray-500 mb-2">Get the latest posts delivered to your email.</div>
            <form className="flex flex-col gap-2">
              <input type="email" placeholder="Your email address" className="border px-3 py-2 rounded text-sm" />
              <button type="submit" className="bg-black text-white rounded px-3 py-2 text-sm font-medium hover:bg-gray-800">Subscribe</button>
            </form>
          </section>
        </aside>
      </div>
    </div>
  );
}

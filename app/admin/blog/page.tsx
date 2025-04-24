"use client";
import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { api } from "../../../convex/_generated/api";
import type { Id } from '../../../convex/_generated/dataModel';
// Uncomment if needed:
// type Id<TableName extends string> = string;

const SlateEditor = dynamic(() => import("./SlateEditor"), { ssr: false });

// Sorting options
const SORT_OPTIONS = [
  { label: "Newest", value: "date-desc" },
  { label: "Oldest", value: "date-asc" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
  { label: "Most Likes", value: "likes-desc" },
  { label: "Least Likes", value: "likes-asc" },
];


import Link from "next/link";

function FeaturedImage({ storageId }: { storageId: string }) {
  console.log("FeaturedImage component received storageId:", storageId);
  const url = useQuery(api.files.getFileUrl, { storageId });
  console.log("Signed URL returned by useQuery:", url);
  if (!url) return null;
  return (
    <img
      src={url}
      alt="Featured Preview"
      className="mt-4 rounded-xl max-h-48 shadow-lg border border-blue-900"
    />
  );
}

export default function AdminBlogPage() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date-desc");
const [editId, setEditId] = useState<Id<'posts'> | null>(null);

  // Blog post fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState<Id<'authors'> | "">("");
  const [date, setDate] = useState("");
  // SSR-safe: set today's date on mount if empty
  useEffect(() => {
    if (!date) setDate(new Date().toISOString().substring(0, 10));
  }, [date]);
  const [tags, setTags] = useState("");
  const [likes, setLikes] = useState(0);
  const [saving, setSaving] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [editorValue, setEditorValue] = useState<string | null>(null);
  // Featured image state
  const [featuredImage, setFeaturedImage] = useState<string | undefined>(undefined);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | undefined>(undefined);
  // Convex file upload mutation
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);


  // Fetch authors
  const authors = useQuery(api.authors.list) || [];
  // Fetch posts
  const posts = useQuery(api.posts.list) || [];

  // Helper: sort and search
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

  // Load post for editing
  const handleEdit = (post: any) => {
    setEditId(post._id as Id<'posts'>);
    setTitle(post.title || "");
    setSlug(post.slug || "");
    setAuthor(post.author || ""); // Assumes post.author is the author ID
    setDate((post.date || "").substring(0, 10));
    setTags((post.tags || []).join(", "));
    setLikes(post.likes || 0);
    setEditorValue(post.content || "");
    // Always set both featuredImage and featuredImagePreview to the storageId if present
    if (post.featuredImage) {
      setFeaturedImage(post.featuredImage);
      setFeaturedImagePreview(post.featuredImage);
    } else {
      setFeaturedImage(undefined);
      setFeaturedImagePreview(undefined);
    }
    setSuccessId(null);
  };

  // Handle featured image file selection and upload
  const handleFeaturedImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // 1. Get an upload URL from Convex
      const uploadUrl = await generateUploadUrl();
      console.log("Convex uploadUrl:", uploadUrl);
      // 2. POST the file as the raw body (per Convex docs)
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      console.log("Upload response:", res);
      const { storageId } = await res.json();
      if (!storageId) {
        throw new Error("No storageId returned from upload.");
      }
      console.log("Set featuredImage:", storageId);
      setFeaturedImage(storageId);
      setFeaturedImagePreview(URL.createObjectURL(file));
    } catch (err) {
      alert("Image upload failed. Please try again.");
      setFeaturedImage(undefined);
      setFeaturedImagePreview(undefined);
    }
  };


  // Reset form for new post
  const handleNew = () => {
    setEditId(null);
    setTitle("");
    setSlug("");
    setAuthor("");
    setDate(new Date().toISOString().substring(0, 10));
    setTags("");
    setLikes(0);
    setEditorValue(null);
    // Clear featured image state when starting a new post
    setFeaturedImage(undefined);
    setFeaturedImagePreview(undefined);
    setSuccessId(null);
  };

  const createPost = useMutation(api.posts.create);
  const updatePost = useMutation(api.posts.update);

  const handleSave = async (content: string) => {
    setSaving(true);
    setSuccessId(null);
    try {
      let result;
      // Always include featuredImage in the payload
      if (editId) {
        result = await updatePost({
          id: editId,
          title,
          content,
          slug: slug.trim() || undefined,
          author: author.trim() || undefined,
          date: date || undefined,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
          likes: Number(likes) || 0,
          featuredImage: featuredImage || undefined,
        });
        setSuccessId(result.slug || slug);
      } else {
        result = await createPost({
          title,
          content,
          slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          author: author.trim() || undefined,
          date: date || undefined,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
          likes: Number(likes) || 0,
          featuredImage: featuredImage || undefined,
        });
        setSuccessId(result.slug || slug);
      }
    } catch (e) {
      // Handle error
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Collapsible Sidebar */}
      <aside className={`w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-screen ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="flex items-center justify-between mb-4 px-2 pt-2">
          <span className={`text-xl font-bold tracking-tight text-blue-600 transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 h-0 overflow-hidden'}`}>Admin</span>
          <button
            className="text-gray-500 hover:text-blue-600 focus:outline-none"
            onClick={() => setSidebarOpen(v => !v)}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? <span>&#x25C0;</span> : <span>&#x25B6;</span>}
          </button>
        </div>
        {/* Sidebar nav links (hidden when collapsed) */}
        {sidebarOpen && (
          <React.Fragment>
            <nav className="flex flex-col gap-2 px-2">
  <a href="/admin/blogeditor" className="px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors font-medium">Blog Editor</a>
  <div className="flex items-center gap-2 mt-2 mb-2">
    <span className="font-semibold text-blue-700 dark:text-blue-300">Blog Posts</span>
    <button onClick={handleNew} className="ml-auto px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">New</button>
  </div>
  <a href="/admin/blog" className="px-3 py-2 rounded hover:bg-green-100 dark:hover:bg-green-900 transition-colors font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950">All Posts</a>
  <a href="/admin/authors" className="mt-1 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950">Authors</a>
  <div className="mt-2">
    <div className="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-900 rounded shadow-inner">
      {posts.slice(0, 10).map((post: any) => (
        <a
          key={post._id}
          href={`/blog/${post.slug || post._id}`}
          className="block w-full text-left px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors text-sm truncate"
        >
          <div className="truncate">{post.title}</div>
          <div className="text-xs text-gray-500">{post.date ? post.date.substring(0, 10) : ''} &middot; {post.likes || 0} likes</div>
        </a>
      ))}
    </div>
  </div>
</nav>
            <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700 px-2">
              <button className="w-full px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors font-medium">Logout</button>
            </div>
          </React.Fragment>
        )}
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-300 drop-shadow-lg tracking-tight">Blog Editor</h1>
        <div className="w-full max-w-2xl mx-auto bg-gray-800/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl shadow-blue-900/40 border border-blue-900/40 p-10 flex flex-col items-center backdrop-blur-lg">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full px-4 py-3 mb-3 border-none rounded-xl text-lg bg-gray-900/80 text-blue-100 placeholder:text-blue-400 focus:ring-2 focus:ring-blue-500 shadow-inner"
          />
          <div className="flex flex-wrap gap-4 mb-6 w-full">
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="Slug (optional)"
              className="px-4 py-2 border-none rounded-lg flex-1 bg-gray-900/80 text-blue-100 placeholder:text-blue-400 shadow-inner"
            />
            <select
              value={author}
              onChange={e => setAuthor(e.target.value as Id<'authors'>)}
              className="px-4 py-2 border-none rounded-lg flex-1 bg-gray-900/80 text-blue-100 placeholder:text-blue-400 shadow-inner"
              required
            >
              <option value="">Select Author</option>
              {authors.map((a: any) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="px-4 py-2 border-none rounded-lg flex-1 bg-gray-900/80 text-blue-100 placeholder:text-blue-400 shadow-inner"
            />
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
              className="px-4 py-2 border-none rounded-lg flex-1 bg-gray-900/80 text-blue-100 placeholder:text-blue-400 shadow-inner"
            />
            <input
              type="number"
              value={likes}
              onChange={e => setLikes(Number(e.target.value))}
              placeholder="Likes"
              min={0}
              className="px-4 py-2 border-none rounded-lg flex-1 bg-gray-900/80 text-blue-100 placeholder:text-blue-400 shadow-inner"
            />
          </div>
          {/* Featured Image Upload */}
          <div className="w-full mb-6 flex flex-col items-center">
            <label className="block text-blue-200 mb-2 font-semibold">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFeaturedImageChange}
              className="block w-full text-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {(() => {
              console.log("featuredImagePreview:", featuredImagePreview, "featuredImage:", featuredImage);
              if (featuredImagePreview && featuredImagePreview.startsWith('blob:')) {
                return (
                  <img
                    src={featuredImagePreview}
                    alt="Featured Preview"
                    className="mt-4 rounded-xl max-h-48 shadow-lg border border-blue-900"
                  />
                );
              } else if (featuredImage) {
                return <FeaturedImage storageId={featuredImage} />;
              } else {
                return null;
              }
            })()}

          </div>
          <div className="w-full">
            <SlateEditor
              title={title}
              setTitle={setTitle}
              handleSave={handleSave}
              saving={saving}
              initialValue={editorValue}
              setEditorValue={setEditorValue}
              slug={slug}
              editId={editId}
            />
          </div>
          {successId && (
            <div className="mt-6 text-green-400 text-lg font-semibold drop-shadow">
              Post saved! View it at {" "}
              <a href={`/blog/${successId}`} className="underline text-blue-400 hover:text-blue-200">/blog/{successId}</a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


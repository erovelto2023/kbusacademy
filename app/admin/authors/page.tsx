"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from '../../../convex/_generated/dataModel';
import Link from "next/link";

export default function AdminAuthorsPage() {
  const authors = useQuery(api.authors.list) || [];
  const createAuthor = useMutation(api.authors.create);
  const updateAuthor = useMutation(api.authors.update);
  const deleteAuthor = useMutation(api.authors.deleteAuthor);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
function AuthorImage({ storageId, alt, className }: { storageId: string, alt?: string, className?: string }) {
  const url = useQuery(api.files.getFileUrl, { storageId });
  if (!url) return null;
  return <img src={url} alt={alt} className={className} />;
}

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  // Edit mode state
  const [editId, setEditId] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Failed to upload image");
      const { storageId } = await res.json();
      setImage(storageId);
      setImagePreview(URL.createObjectURL(file));
      // Optionally, fetch persistent signed URL for preview
      // const fileUrl = getFileUrl(storageId);
      // setImagePreview(fileUrl);
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateAuthor({ id: editId as Id<'authors'>, name, bio, image });
      } else {
        await createAuthor({ name, bio, image });
      }
      setName("");
      setBio("");
      setImage(undefined);
      setImagePreview(undefined);
      setEditId(null);
    } finally {
      setSaving(false);
    }
  };

  // Start editing an author
  const handleEdit = (author: any) => {
    setEditId(author._id);
    setName(author.name);
    setBio(author.bio);
    setImage(author.image);
    setImagePreview(author.image);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setName("");
    setBio("");
    setImage(undefined);
    setImagePreview(undefined);
  };

  // Delete an author
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      await deleteAuthor({ id: id as Id<'authors'> });
      if (editId === id) handleCancel();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Permanent Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen p-6">
        <div className="mb-8 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          <span className="text-lg font-bold tracking-tight text-blue-300">Admin Blog</span>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <a href="/admin" className="px-3 py-2 rounded text-gray-200 hover:bg-gray-800 hover:text-blue-300 transition-colors font-medium">Dashboard</a>
          <a href="/admin/blog" className="px-3 py-2 rounded text-gray-200 hover:bg-gray-800 hover:text-blue-300 transition-colors font-medium">Blog</a>
          <a href="/admin/blogeditor" className="px-3 py-2 rounded text-gray-200 hover:bg-gray-800 hover:text-blue-300 transition-colors font-medium">Blog Editor</a>
          <a href="/admin/authors" className="px-3 py-2 rounded text-blue-300 bg-gray-800 font-semibold">Authors</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-300">Manage Authors</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg shadow p-6 mb-10 flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Author Name"
            className="border border-gray-700 rounded px-4 py-2 bg-gray-800 text-gray-100 placeholder:text-gray-400"
            required
          />
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Author Bio"
            className="border border-gray-700 rounded px-4 py-2 min-h-[80px] bg-gray-800 text-gray-100 placeholder:text-gray-400"
            required
          />
          <div>
            <label className="block mb-2 font-medium text-gray-200">Author Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-gray-100" />
            {imagePreview && (
              imagePreview.startsWith('blob:') ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 rounded w-24 h-24 object-cover border border-gray-700"
                />
              ) : image ? (
                <AuthorImage storageId={image} alt="Preview" className="mt-2 rounded w-24 h-24 object-cover border border-gray-700" />
              ) : null
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 font-semibold mt-2 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? (editId ? "Updating..." : "Saving...") : (editId ? "Update Author" : "Add Author")}
          </button>
          {editId && (
            <button
              type="button"
              className="bg-gray-400 text-white rounded px-4 py-2 font-semibold mt-2 ml-2"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </form>
        <h2 className="text-xl font-semibold mb-4 text-gray-200">All Authors</h2>
        <ul className="space-y-4">
          {authors.map((author: any) => (
            <li key={author._id} className="flex items-center gap-4 bg-gray-800 rounded p-4">
              {author.image && (
                <AuthorImage storageId={author.image} alt={author.name} className="w-12 h-12 rounded-full object-cover border border-gray-700" />
              )}
              <div className="flex-1">
                <div className="font-bold text-gray-100">{author.name}</div>
                <div className="text-sm text-gray-300">{author.bio}</div>
              </div>
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                onClick={() => handleEdit(author)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded mr-2"
                onClick={() => handleDelete(author._id)}
              >
                Delete
              </button>
              <Link
                href={`/authors/${author.slug}`}
                className="px-3 py-1 bg-blue-600 text-white rounded"
                target="_blank"
              >
                Visit
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

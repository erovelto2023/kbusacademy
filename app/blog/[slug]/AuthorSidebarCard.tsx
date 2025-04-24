"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import type { Id } from '../../../convex/_generated/dataModel';

function AuthorImage({ storageId, alt, className }: { storageId: string, alt?: string, className?: string }) {
  const url = useQuery(api.files.getFileUrl, { storageId });
  if (!url) return <div className={className + " bg-gray-200"} />;
  return <img src={url} alt={alt} className={className} />;
}

function isValidConvexId(id: string) {
  // Convex IDs are typically 15+ chars, alphanumeric, not 'Anonymous' or empty
  return id && id !== 'Anonymous' && /^[a-zA-Z0-9_-]{10,}$/.test(id);
}

export default function AuthorSidebarCard({ authorId }: { authorId: string }) {
  if (!isValidConvexId(authorId)) {
    return <div className="text-gray-500">Unknown author</div>;
  }
  const author = useQuery(api.authors.get, { id: authorId as Id<'authors'> });

  if (!author) return <div>Loading author...</div>;
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {author.image ? (
          <AuthorImage storageId={author.image} alt={author.name} className="w-12 h-12 rounded-full object-cover border" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200" />
        )}
        <div>
          <div className="font-semibold">{author.name}</div>
          <div className="text-xs text-gray-500">Author</div>
        </div>
      </div>
      <div className="text-sm text-gray-700 mb-2">{author.bio}</div>
      <Link
        href={`/authors/${author.slug}`}
        className="w-full block mt-2 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium text-center"
        target="_blank"
      >
        View Profile
      </Link>
    </div>
  );
}

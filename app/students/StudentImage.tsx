"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function StudentImage({ storageId, alt }: { storageId?: string, alt: string }) {
  const imageUrl = useQuery(
    api.files.getFileUrl,
    storageId ? { storageId } : "skip"
  );
  if (!storageId || !imageUrl) {
    return <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">No Image</div>;
  }
  return (
    <img
      src={imageUrl}
      alt={alt}
      className="w-24 h-24 rounded-full object-cover mb-4 border"
      onError={e => {
        (e.target as HTMLImageElement).src = "/default-profile.png";
      }}
    />
  );
}

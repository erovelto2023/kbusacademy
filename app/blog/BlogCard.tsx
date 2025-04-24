"use client";
import { Card, CardContent, CardTitle, Badge, Button } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import PostExcerpt from "../../components/PostExcerpt";
import DateDisplay from "../../components/DateDisplay";
import type { Id } from "../../convex/_generated/dataModel";

type Post = {
  _id: Id<"posts">;
  title: string;
  content: string;
  slug: string;
  createdAt?: number;
  featuredImage?: string;
};

export default function BlogCard({ post }: { post: Post }) {
  const fileUrl = post.featuredImage
    ? useQuery(api.files.getFileUrl, { storageId: post.featuredImage })
    : null;

  return (
    <Card className="relative flex flex-col overflow-hidden group">
      {/* Featured or default image */}
      {fileUrl ? (
        <img
          src={fileUrl}
          alt="Featured"
          className="h-36 w-full object-cover"
        />
      ) : (
        <div className="h-36 w-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <span className="text-4xl text-muted-foreground font-bold">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="8" fill="#fff" fillOpacity="0.2"/><path d="M8 17l4-4 4 4M8 13l4-4 4 4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      )}
      {/* Badge */}
      <Badge className="absolute top-3 left-3">Published</Badge>
      {/* Card content */}
      <CardContent className="flex-1 flex flex-col p-4">
        <CardTitle className="mb-1 line-clamp-2">{post.title}</CardTitle>
        <div className="mb-2 text-xs text-muted-foreground"><DateDisplay date={post.createdAt!} /></div>
        <div className="flex-1 mb-4">
          <PostExcerpt excerpt={post.content} />
        </div>
        <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
          <Button asChild className="mt-auto w-full">Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

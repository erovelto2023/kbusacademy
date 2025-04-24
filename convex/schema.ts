import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  heroImages: defineTable({
    storageId: v.string(),
    isActive: v.boolean(),
  }),
  widgets: defineTable({
    name: v.string(),
    slug: v.string(),
    html: v.string(),
  }).index("by_slug", ["slug"]),
  authors: defineTable({
    name: v.string(),
    bio: v.string(),
    image: v.optional(v.string()), // File ID or URL
    slug: v.string(),
  }).index("by_slug", ["slug"]),
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    slug: v.string(),
    author: v.string(),
    date: v.string(),
    createdAt: v.number(),
    tags: v.array(v.string()),
    likes: v.number(),
    featuredImage: v.optional(v.string()), // File ID or URL for featured image
  }).index("by_slug", ["slug"]),
  comments: defineTable({
    postSlug: v.string(),
    author: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_post", ["postSlug"]),
  reactions: defineTable({
    postSlug: v.string(),
    type: v.string(), // e.g., 'like', 'dislike', 'love', etc.
    user: v.string(),
    createdAt: v.number(),
  }).index("by_post", ["postSlug"]),
});
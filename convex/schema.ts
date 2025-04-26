import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  students: defineTable({
    stackUserId: v.string(), // Stack Auth user id
    studentId: v.string(), // Auto-generated student ID
    email: v.string(),
    name: v.string(),
    bio: v.optional(v.string()),
    profileImage: v.optional(v.string()), // File ID or URL
    createdAt: v.number(),
    // Social links (all optional)
    amazon: v.optional(v.string()),
    discord: v.optional(v.string()),
    facebook: v.optional(v.string()),
    goodreads: v.optional(v.string()),
    instagram: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    pinterest: v.optional(v.string()),
    quora: v.optional(v.string()),
    reddit: v.optional(v.string()),
    threads: v.optional(v.string()),
    tiktok: v.optional(v.string()),
    twitch: v.optional(v.string()),
    website: v.optional(v.string()),
    wechat: v.optional(v.string()),
    youtube: v.optional(v.string()),
    // Profile questions
    primaryNiche: v.optional(v.string()),
    goals: v.optional(v.string()),
    biggestProblem: v.optional(v.string()),
    experienceLevel: v.optional(v.string()), // Newbie, Moderate, Advanced, Unsure
    whyJoined: v.optional(v.string()),
    slug: v.optional(v.string()), // SEO-friendly URL slug

  })
    .index("by_stackUserId", ["stackUserId"])
    .index("by_slug", ["slug"]),
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
import { query, mutation, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Query: List all posts
export const list = query({
  handler: async (ctx: QueryCtx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});

// Query: Search posts by title (case-insensitive, partial match)
export const searchByTitle = query({
  args: { query: v.string() },
  handler: async (ctx: QueryCtx, args: { query: string }) => {
    const q = args.query.trim().toLowerCase();
    if (!q) {
      return await ctx.db.query("posts").order("desc").collect();
    }
    const all = await ctx.db.query("posts").order("desc").collect();
    return all.filter(post => post.title.toLowerCase().includes(q));
  },
});

// Mutation: Create a post
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    slug: v.optional(v.string()),
    author: v.optional(v.string()),
    date: v.optional(v.string()), // ISO string
    tags: v.optional(v.array(v.string())),
    likes: v.optional(v.number()),
    featuredImage: v.optional(v.string()),
  },
  handler: async (
    ctx: MutationCtx,
    args: { title: string; content: string; slug?: string; author?: string; date?: string; tags?: string[]; likes?: number; featuredImage?: string }
  ) => {
    // Generate slug if not provided
    let slug = args.slug || args.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    // Ensure slug is unique
    let existing = await ctx.db.query("posts").withIndex("by_slug", q => q.eq("slug", slug)).first();
    let i = 2;
    let baseSlug = slug;
    while (existing) {
      slug = `${baseSlug}-${i++}`;
      existing = await ctx.db.query("posts").withIndex("by_slug", q => q.eq("slug", slug)).first();
    }
    const post = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      slug,
      author: args.author || "Anonymous",
      date: args.date || new Date().toISOString(),
      createdAt: Date.now(),
      tags: args.tags || [],
      likes: args.likes ?? 0,
      featuredImage: args.featuredImage || undefined,
    });
    return { id: post, slug };
  },
});

// Mutation: Update a post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    content: v.string(),
    slug: v.optional(v.string()),
    author: v.optional(v.string()),
    date: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    likes: v.optional(v.number()),
    featuredImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      slug: args.slug,
      author: args.author,
      date: args.date,
      tags: args.tags,
      likes: args.likes,
      featuredImage: args.featuredImage || undefined,
    });
    const updated = await ctx.db.get(args.id);
    return { id: args.id, slug: updated?.slug };
  }
});

// Query: Get a post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx: QueryCtx, args: { slug: string }) => {
    return await ctx.db.query("posts").withIndex("by_slug", q => q.eq("slug", args.slug)).first();
  },
});

import type { Id } from "./_generated/dataModel";

// Mutation: Delete a post
export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx: MutationCtx, args: { id: Id<"posts"> }) => {
    await ctx.db.delete(args.id);
    return { id: args.id };
  },
});

// Query: Get a single post by ID
export const get = query({
  args: { id: v.id("posts") },
  handler: async (ctx: QueryCtx, args: { id: Id<"posts"> }) => {
    return await ctx.db.get(args.id);
  },
});

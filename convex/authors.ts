import { query, mutation, MutationCtx, QueryCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { v } from "convex/values";

// Query: List all authors
export const list = query({
  handler: async (ctx: QueryCtx) => {
    return await ctx.db.query("authors").collect();
  },
});

// Query: Get a single author by ID
export const get = query({
  args: { id: v.id("authors") },
  handler: async (ctx: QueryCtx, args: { id: Id<"authors"> }) => {
    return await ctx.db.get(args.id);
  },
});

// Query: Get a single author by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx: QueryCtx, args: { slug: string }) => {
    return await ctx.db
      .query("authors")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .first();
  },
});

// Mutation: Update an author
export const update = mutation({
  args: {
    id: v.id("authors"),
    name: v.string(),
    bio: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args: { id: Id<"authors">; name: string; bio: string; image?: string }) => {
    // Generate slug from name
    function slugify(name: string) {
      return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    let slug = slugify(args.name);
    // Ensure uniqueness
    let existing = await ctx.db.query("authors").withIndex("by_slug", q => q.eq("slug", slug)).first();
    let suffix = 1;
    while (existing && existing._id !== args.id) {
      slug = `${slug}-${suffix++}`;
      existing = await ctx.db.query("authors").withIndex("by_slug", q => q.eq("slug", slug)).first();
    }
    await ctx.db.patch(args.id, {
      name: args.name,
      bio: args.bio,
      image: args.image,
      slug,
    });
    return { id: args.id };
  },
});

// Mutation: Delete an author
export const deleteAuthor = mutation({
  args: { id: v.id("authors") },
  handler: async (ctx: MutationCtx, args: { id: Id<"authors"> }) => {
    await ctx.db.delete(args.id);
    return { id: args.id };
  },
});

// Mutation: Create an author
export const create = mutation({
  args: {
    name: v.string(),
    bio: v.string(),
    image: v.optional(v.string()), // File ID or URL
  },
  handler: async (ctx: MutationCtx, args: { name: string; bio: string; image?: string }) => {
    // Generate slug from name
    function slugify(name: string) {
      return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    let slug = slugify(args.name);
    // Ensure uniqueness
    let existing = await ctx.db.query("authors").withIndex("by_slug", q => q.eq("slug", slug)).first();
    let suffix = 1;
    while (existing) {
      slug = `${slug}-${suffix++}`;
      existing = await ctx.db.query("authors").withIndex("by_slug", q => q.eq("slug", slug)).first();
    }
    const id = await ctx.db.insert("authors", {
      name: args.name,
      bio: args.bio,
      image: args.image,
      slug,
    });
    return { id };
  },
});

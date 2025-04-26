import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update a student's profile (upsert by stackUserId)
export const upsertProfile = mutation({
  args: {
    stackUserId: v.string(),
    studentId: v.string(),
    email: v.string(),
    name: v.string(),
    bio: v.optional(v.string()),
    profileImage: v.optional(v.string()),
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
    experienceLevel: v.optional(v.string()),
    whyJoined: v.optional(v.string()),
  },
  handler: async ({ db }, args) => {
    let student = await db
      .query("students")
      .withIndex("by_stackUserId", q => q.eq("stackUserId", args.stackUserId))
      .first();
    if (student) {
      // Generate slug from name
      function slugify(name: string) {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      let slug = slugify(args.name);
      // Ensure uniqueness
      let existing = await db.query("students").withIndex("by_slug", q => q.eq("slug", slug)).first();
      let suffix = 1;
      while (existing && existing._id !== student._id) {
        slug = `${slug}-${suffix++}`;
        existing = await db.query("students").withIndex("by_slug", q => q.eq("slug", slug)).first();
      }
      await db.patch(student._id, {
        studentId: args.studentId,
        email: args.email,
        name: args.name,
        bio: args.bio,
        profileImage: args.profileImage,
        amazon: args.amazon,
        discord: args.discord,
        facebook: args.facebook,
        goodreads: args.goodreads,
        instagram: args.instagram,
        linkedin: args.linkedin,
        pinterest: args.pinterest,
        quora: args.quora,
        reddit: args.reddit,
        threads: args.threads,
        tiktok: args.tiktok,
        twitch: args.twitch,
        website: args.website,
        wechat: args.wechat,
        youtube: args.youtube,
        primaryNiche: args.primaryNiche,
        goals: args.goals,
        biggestProblem: args.biggestProblem,
        experienceLevel: args.experienceLevel,
        whyJoined: args.whyJoined,
        slug,

      });
      return student._id;
    } else {
      return await db.insert("students", {
        ...args,
        createdAt: Date.now(),
      });
    }
  },
});

// Get current student's profile by stackUserId
export const getMyProfile = query({
  args: { stackUserId: v.string() },
  handler: async ({ db }, { stackUserId }) => {
    return await db
      .query("students")
      .withIndex("by_stackUserId", q => q.eq("stackUserId", stackUserId))
      .first();
  },
});

// Get a student by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    return await db.query("students").withIndex("by_slug", q => q.eq("slug", slug)).first();
  },
});

// List all students (for directory)
export const listDirectory = query(async ({ db }) => {
  return await db.query("students").collect();
});

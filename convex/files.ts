import { mutation, MutationCtx } from "./_generated/server";

// Convex file upload: generate an upload URL for the client
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx: MutationCtx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Get a signed URL for a file in storage
import { query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx: QueryCtx, args: { storageId: string }) => {
    if (!args.storageId) return null;
    return await ctx.storage.getUrl(args.storageId);
  },
});

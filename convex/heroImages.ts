import { query } from "./_generated/server";

export const getHeroImage = query({
  handler: async (ctx) => {
    const heroImageDoc = await ctx.db.query("heroImages")
      .filter(q => q.eq(q.field("isActive"), true))
      .first();
    if (!heroImageDoc) return null;
    const imageUrl = await ctx.storage.getUrl(heroImageDoc.storageId);
    return { imageUrl };
  },
});

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const filePath = path.join(process.cwd(), "posts", slug + ".json");
  const data = JSON.stringify({ title, content }, null, 2);
  try {
    fs.writeFileSync(filePath, data, "utf8");
    return NextResponse.json({ success: true, slug });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}

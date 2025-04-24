"use client";
import SlateRenderer from "./SlateRenderer";

interface PostExcerptProps {
  excerpt: string;
}

// Utility to extract plain text from Slate JSON
function slateToPlainText(slateValue: string): string {
  try {
    const nodes = JSON.parse(slateValue);
    return nodes.map((n: any) => n.children?.map((c: any) => c.text).join(" ")).join(" ");
  } catch {
    return "";
  }
}

function getExcerpt(text: string, maxLength = 200): string {
  // Try to get first 1-2 sentences or up to maxLength
  const match = text.match(/([^.!?]*[.!?]){1,2}/);
  let excerpt = match ? match[0] : text;
  if (excerpt.length > maxLength) excerpt = excerpt.slice(0, maxLength) + "...";
  return excerpt;
}

export default function PostExcerpt({ excerpt }: PostExcerptProps) {
  const plainText = slateToPlainText(excerpt);
  const shortText = getExcerpt(plainText);
  return (
    <div className="text-gray-600 dark:text-gray-300 mb-4">
      {shortText}
    </div>
  );
}


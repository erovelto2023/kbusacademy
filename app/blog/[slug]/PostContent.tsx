"use client";
import { Typography } from "@/components/ui/typography";
import SlateRenderer from "../../../components/SlateRenderer";

interface PostContentProps {
  title: string;
  content: string;
}

export default function PostContent({ title, content }: PostContentProps) {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <Typography.h1 className="mb-6">{title}</Typography.h1>
      <SlateRenderer value={content} />
    </div>
  );
}

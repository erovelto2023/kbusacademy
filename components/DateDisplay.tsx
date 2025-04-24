"use client";
export default function DateDisplay({ date }: { date: number }) {
  if (!date) return null;
  return <span>Updated {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>;
}

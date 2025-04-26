"use client";

import { type ReadonlyURLSearchParams } from "next/navigation";

export default function ErrorPage({ searchParams }: { searchParams: ReadonlyURLSearchParams }) {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: 'red' }}>Middleware Error</h1>
      <pre style={{ background: '#222', color: '#fff', padding: 20, borderRadius: 8 }}>
        {JSON.stringify(searchParams, null, 2)}
      </pre>
      <a href="/">Go Home</a>
    </div>
  );
}

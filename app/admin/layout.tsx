"use client";
import MenuBar from "../components/MenuBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <MenuBar />
      {children}
    </div>
  );
}

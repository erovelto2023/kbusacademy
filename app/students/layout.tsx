"use client";
import MenuBar from "../components/MenuBar";

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuBar />
      <main>{children}</main>
    </>
  );
}

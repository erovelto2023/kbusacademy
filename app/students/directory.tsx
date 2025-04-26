"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import Link from "next/link";
import StudentImage from "./StudentImage";
import { useState } from "react";

export default function StudentDirectory() {
  const students = useQuery(api.students.listDirectory) || [];
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 30;

  // Filter students by search
  const filtered = students.filter((s: any) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );
  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Student Directory</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name or email..."
          className="border rounded px-4 py-2 w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginated.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500">No students found.</div>
        ) : paginated.map((student: any) => (
          <div key={student._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <StudentImage storageId={student.profileImage} alt={student.name} />
            <Link href={`/students/${student.slug || student._id}`} className="font-bold text-lg mb-1 text-blue-700 hover:underline">
              {student.name}
            </Link>
            <div className="text-gray-600 mb-2">{student.email}</div>
            {student.bio && <div className="text-gray-800 text-center">{student.bio}</div>}
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >Prev</button>
        <span className="px-2">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >Next</button>
      </div>
    </div>
  );
}


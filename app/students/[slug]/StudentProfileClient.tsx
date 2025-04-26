"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { notFound } from "next/navigation";

export default function StudentProfileClient({ slug }: { slug: string }) {
  const student = useQuery(api.students.getBySlug, { slug });
  const imageUrl = useQuery(
    api.files.getFileUrl,
    student?.profileImage ? { storageId: student.profileImage } : "skip"
  );

  if (student === undefined) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (!student) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Cover photo/banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-pink-400 rounded-t-2xl shadow-lg flex items-end">
        {/* Avatar - overlaps banner */}
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={student.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg bg-white"
              onError={e => {
                (e.target as HTMLImageElement).src = "/default-profile.png";
              }}
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg text-2xl text-gray-500 font-bold">No Image</div>
          )}
        </div>
      </div>
      {/* Main profile card */}
      <div className="bg-white rounded-b-2xl shadow-lg pt-24 pb-10 px-8 -mt-16 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-2 text-center mt-8">{student.name}</h1>
        <div className="text-gray-600 text-center mb-2 text-lg">{student.email}</div>
        {student.bio && <div className="text-gray-800 text-center mb-4 text-base max-w-xl">{student.bio}</div>}
        {/* Social Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {student.website && <a href={student.website} target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold shadow-sm transition">Website</a>}
          {student.instagram && <a href={student.instagram} target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold shadow-sm transition">Instagram</a>}
          {student.linkedin && <a href={student.linkedin} target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold shadow-sm transition">LinkedIn</a>}
          {/* Add more social links as needed */}
        </div>
        {/* Profile Questions Section */}
        <div className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-inner p-6 mt-4">
          <h3 className="font-bold text-xl mb-4 text-blue-700">Profile Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.primaryNiche && <div><span className="font-semibold">Primary Niche:</span> {student.primaryNiche}</div>}
            {student.goals && <div><span className="font-semibold">Goals:</span> {student.goals}</div>}
            {student.biggestProblem && <div className="md:col-span-2"><span className="font-semibold">Biggest Problem:</span> {student.biggestProblem}</div>}
            {student.experienceLevel && <div><span className="font-semibold">Experience Level:</span> {student.experienceLevel}</div>}
            {student.whyJoined && <div className="md:col-span-2"><span className="font-semibold">Why Joined:</span> {student.whyJoined}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

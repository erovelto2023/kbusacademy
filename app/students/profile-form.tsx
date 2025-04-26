"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@stackframe/stack";

function ProfileImageFromStorage({ storageId }: { storageId: string }) {
  const imageUrl = useQuery(api.files.getFileUrl, storageId ? { storageId } : "skip");
  if (!imageUrl) return null;
  return (
    <img
      src={imageUrl}
      alt="Profile"
      className="mt-2 rounded w-24 h-24 object-cover border"
    />
  );
}

export default function StudentProfileForm() {
  // Social links
  const [amazon, setAmazon] = useState("");
  const [discord, setDiscord] = useState("");
  const [facebook, setFacebook] = useState("");
  const [goodreads, setGoodreads] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [quora, setQuora] = useState("");
  const [reddit, setReddit] = useState("");
  const [threads, setThreads] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitch, setTwitch] = useState("");
  const [website, setWebsite] = useState("");
  const [wechat, setWechat] = useState("");
  const [youtube, setYoutube] = useState("");
  // Profile questions
  const [primaryNiche, setPrimaryNiche] = useState("");
  const [goals, setGoals] = useState("");
  const [biggestProblem, setBiggestProblem] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [whyJoined, setWhyJoined] = useState("");
  const user = useUser();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>(undefined);
  const upsertProfile = useMutation(api.students.upsertProfile);
  const getMyProfile = useQuery(api.students.getMyProfile, user ? { stackUserId: user.id } : "skip");
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (getMyProfile) {
      setName(getMyProfile.name || "");
      setBio(getMyProfile.bio || "");
      setProfileImage(getMyProfile.profileImage);
      setProfileImagePreview(undefined);
      setAmazon(getMyProfile.amazon || "");
      setDiscord(getMyProfile.discord || "");
      setFacebook(getMyProfile.facebook || "");
      setGoodreads(getMyProfile.goodreads || "");
      setInstagram(getMyProfile.instagram || "");
      setLinkedin(getMyProfile.linkedin || "");
      setPinterest(getMyProfile.pinterest || "");
      setQuora(getMyProfile.quora || "");
      setReddit(getMyProfile.reddit || "");
      setThreads(getMyProfile.threads || "");
      setTiktok(getMyProfile.tiktok || "");
      setTwitch(getMyProfile.twitch || "");
      setWebsite(getMyProfile.website || "");
      setWechat(getMyProfile.wechat || "");
      setYoutube(getMyProfile.youtube || "");
      setPrimaryNiche(getMyProfile.primaryNiche || "");
      setGoals(getMyProfile.goals || "");
      setBiggestProblem(getMyProfile.biggestProblem || "");
      setExperienceLevel(getMyProfile.experienceLevel || "");
      setWhyJoined(getMyProfile.whyJoined || "");
    }
  }, [getMyProfile]);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Failed to upload image");
      const { storageId } = await res.json();
      setProfileImage(storageId);
      setProfileImagePreview(URL.createObjectURL(file));
    } catch (err) {
      alert("Image upload failed");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      // Generate studentId if not present (first creation)
const today = new Date();
const dateStr = today.getFullYear().toString() +
  String(today.getMonth() + 1).padStart(2, '0') +
  String(today.getDate()).padStart(2, '0');
const shortUserId = user.id.slice(0, 6);
// TODO: Ensure 'studentId' is added to your backend profile schema/type
type StudentProfile = typeof getMyProfile & { studentId?: string };
const studentId = (getMyProfile as StudentProfile)?.studentId || `${dateStr}-${shortUserId}`;

await upsertProfile({
  stackUserId: user.id,
  studentId,
  email: user.primaryEmail ?? "",
  name,
  bio,
  profileImage,
  amazon,
  discord,
  facebook,
  goodreads,
  instagram,
  linkedin,
  pinterest,
  quora,
  reddit,
  threads,
  tiktok,
  twitch,
  website,
  wechat,
  youtube,
  primaryNiche,
  goals,
  biggestProblem,
  experienceLevel,
  whyJoined,
});
      alert("Profile saved!");
    } finally {
      setSaving(false);
    }
  };
  if (!user) return <div className="text-center py-10">Please log in to edit your profile.</div>;
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col gap-6 mt-10">
      <h2 className="text-2xl font-bold mb-2 text-center">Your Student Profile</h2>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your Name"
        className="border rounded px-4 py-2"
        required
      />
      <textarea
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="Tell us about yourself..."
        className="border rounded px-4 py-2 min-h-[80px]"
      />
      <div className="flex flex-col items-center">
        <label className="block mb-1 font-semibold">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {profileImagePreview ? (
          <img
            src={profileImagePreview}
            alt="Profile"
            className="mt-2 rounded w-24 h-24 object-cover border"
          />
        ) : profileImage ? (
          <ProfileImageFromStorage storageId={profileImage} />
        ) : null}
      </div>

      {/* Social Links */}
      <h3 className="font-semibold mt-4">Social Links</h3>
      <input type="text" value={amazon} onChange={e => setAmazon(e.target.value)} placeholder="Amazon" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={discord} onChange={e => setDiscord(e.target.value)} placeholder="Discord" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="Facebook" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={goodreads} onChange={e => setGoodreads(e.target.value)} placeholder="Goodreads" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="Instagram" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={pinterest} onChange={e => setPinterest(e.target.value)} placeholder="Pinterest" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={quora} onChange={e => setQuora(e.target.value)} placeholder="Quora" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={reddit} onChange={e => setReddit(e.target.value)} placeholder="Reddit" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={threads} onChange={e => setThreads(e.target.value)} placeholder="Threads" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={tiktok} onChange={e => setTiktok(e.target.value)} placeholder="TikTok" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={twitch} onChange={e => setTwitch(e.target.value)} placeholder="Twitch" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={website} onChange={e => setWebsite(e.target.value)} placeholder="Website" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={wechat} onChange={e => setWechat(e.target.value)} placeholder="WeChat" className="border rounded px-4 py-2 mt-1" />
      <input type="text" value={youtube} onChange={e => setYoutube(e.target.value)} placeholder="YouTube" className="border rounded px-4 py-2 mt-1" />

      {/* Profile Questions */}
      <h3 className="font-semibold mt-6">Profile Questions</h3>
      <input type="text" value={primaryNiche} onChange={e => setPrimaryNiche(e.target.value)} placeholder="What is your primary niche?" className="border rounded px-4 py-2 mt-1" />
      <textarea value={goals} onChange={e => setGoals(e.target.value)} placeholder="What are your goals?" className="border rounded px-4 py-2 mt-1 min-h-[60px]" />
      <textarea value={biggestProblem} onChange={e => setBiggestProblem(e.target.value)} placeholder="What is your biggest problem when it comes to online business?" className="border rounded px-4 py-2 mt-1 min-h-[60px]" />
      <select value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} className="border rounded px-4 py-2 mt-1">
        <option value="">What are you? (Select one)</option>
        <option value="Newbie">Newbie</option>
        <option value="Moderate">Moderate</option>
        <option value="Advanced">Advanced</option>
        <option value="Unsure">Unsure</option>
      </select>
      <textarea value={whyJoined} onChange={e => setWhyJoined(e.target.value)} placeholder="Why did you join?" className="border rounded px-4 py-2 mt-1 min-h-[60px]" />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold mt-2 disabled:opacity-50"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}

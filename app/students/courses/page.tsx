export default function StudentCoursesDashboard() {
  // Placeholder for course cards
  const courses = [
    { title: "Intro to Business", desc: "Learn the basics of business management." },
    { title: "Marketing 101", desc: "An introduction to modern marketing techniques." },
    { title: "Ecommerce Essentials", desc: "Get started with selling online." },
    // Add more courses as needed
  ];
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col items-center py-8">
        <h2 className="text-xl font-bold mb-8">Courses Dashboard</h2>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {courses.map(course => (
          <div
            key={course.title}
            className="w-48 h-40 rounded-2xl bg-gradient-to-br from-blue-200 via-white to-pink-100 shadow-2xl hover:shadow-[0_8px_32px_0_rgba(31,41,55,0.25)] border border-blue-100 flex flex-col items-start p-4 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
            style={{ boxShadow: '0 8px 24px 0 rgba(31,41,55,0.18), 0 1.5px 5px 0 rgba(80,120,255,0.15)' }}
          >
            <span className="font-bold text-lg text-blue-900 mb-1 drop-shadow">{course.title}</span>
            <span className="text-gray-700 text-xs mb-3">{course.desc}</span>
            <button className="mt-auto px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-pink-600 text-xs transition-all">
              Start Course
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

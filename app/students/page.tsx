export default function StudentDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="w-full py-6 bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Courses</a>
            <a href="#" className="hover:underline">Profile</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 flex flex-col justify-center items-center text-center py-16">
        <h2 className="text-3xl font-extrabold mb-4">Welcome, Student!</h2>
        <p className="text-lg mb-8 max-w-xl">
          Here you can view your courses, check grades, access business tools, and manage your student profile. Use the navigation above to get started.
        </p>
        <div className="flex gap-4">
          <a
            href="/students/courses"
            className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition-colors font-semibold"
          >
            View Courses
          </a>
          <a
            href="/students/tools"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-semibold"
          >
            Tools
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} KBusiness. All rights reserved.
      </footer>
    </div>
  );
}

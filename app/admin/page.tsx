import Link from "next/link";


const metrics = [
  { label: "Students", value: "13,862", change: "+9.7%", color: "text-blue-600", bg: "bg-blue-50", icon: "👩‍🎓" },
  { label: "Teachers", value: "765", change: "+3.1%", color: "text-orange-600", bg: "bg-orange-50", icon: "👨‍🏫" },
  { label: "Awards", value: "24", change: "+1.6%", color: "text-green-600", bg: "bg-green-50", icon: "🏆" },
  { label: "Revenue", value: "$6,235", change: "+4.8%", color: "text-purple-600", bg: "bg-purple-50", icon: "💰" },
];

const actions = [
  { label: "Manage Courses", desc: "Create and manage LMS courses.", href: "#", icon: "📚", color: "bg-blue-100", btn: "Go to Courses", btnColor: "bg-blue-600" },
  { label: "Manage Classes", desc: "Add, edit, and organize LMS classes.", href: "#", icon: "🧑‍🏫", color: "bg-green-100", btn: "Go to Classes", btnColor: "bg-green-600" },
  { label: "Manage Lessons", desc: "Add and edit lessons for courses.", href: "#", icon: "📝", color: "bg-orange-100", btn: "Go to Lessons", btnColor: "bg-orange-600" },
  { label: "Manage Assignments", desc: "Create and manage assignments and quizzes.", href: "#", icon: "📋", color: "bg-purple-100", btn: "Go to Assignments", btnColor: "bg-purple-600" },
];

export default async function AdminDashboard(params: { searchParams: Promise<{ search?: string }> }) {
  const query = (await params.searchParams).search;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-6 px-4">
        <div className="mb-10 flex items-center gap-2">
          <span className="text-2xl">🧑‍💼</span>
          <span className="text-lg font-bold tracking-tight text-blue-700">K Business Academy</span>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
  {/* Sidebar options removed as requested */}
</nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <nav className="w-full flex items-center justify-between py-4 px-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 via-white to-pink-50 shadow sticky top-0 z-30 rounded-b-xl">
          <div className="flex gap-8 items-center">
            
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 font-semibold shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-150">+ Add Course</button>
            <span className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-200 to-pink-200 flex items-center justify-center text-xl shadow">👤</span>
          </div>
        </nav>
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-8">
          {metrics.map((m: { label: string, value: string, change: string, color: string, bg: string, icon: string }) => (
            <div key={m.label} className={`rounded-xl p-6 shadow ${m.bg} flex flex-col items-start`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{m.icon}</span>
                <span className={`text-2xl font-bold ${m.color}`}>{m.value}</span>
              </div>
              <span className="text-gray-600 text-sm font-semibold">{m.label}</span>
              <span className="text-xs mt-1 text-green-600 font-bold">{m.change}</span>
            </div>
          ))}
        </div>
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-8">
          {actions.map((a: { label: string, desc: string, href: string, icon: string, color: string, btn: string, btnColor: string }) => (
            <div key={a.label} className={`rounded-xl shadow p-6 flex flex-col items-start ${a.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{a.icon}</span>
                <span className="font-bold text-gray-800">{a.label}</span>
              </div>
              <span className="text-gray-700 text-sm mb-4">{a.desc}</span>
              <button className={`mt-auto px-4 py-2 rounded text-white font-semibold shadow ${a.btnColor} hover:brightness-110`}>{a.btn}</button>
            </div>
          ))}
        </div>
        {/* Functionality Cards */}
        <div className="mt-12 px-8">
          <h2 className="text-lg font-bold mb-4">AI Business Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Advertisements", desc: "Create and manage ad campaigns for your business." },
              { label: "Amazon", desc: "Tools for Amazon sellers and marketers." },
              { label: "Articles and Blogs", desc: "Generate and manage articles and blog content.", href: "/admin/blog" },
              { label: "Customer Service", desc: "Enhance your customer service operations." },
              { label: "eBook", desc: "Create, edit, and publish eBooks." },
              { label: "eBay", desc: "Tools for eBay sellers and listings." },
              { label: "Ecommerce", desc: "Comprehensive ecommerce solutions." },
              { label: "Emails", desc: "Generate and manage marketing emails." },
              { label: "Etsy", desc: "Tools for Etsy shop owners." },
              { label: "Letter", desc: "Create formal and informal letters." },
              { label: "Marketing", desc: "Marketing automation and strategy tools." },
              { label: "Niche Markets", desc: "Discover and target niche markets." },
              { label: "Pinterest", desc: "Pinterest marketing and automation tools." },
              { label: "Podcast", desc: "Podcast creation and management." },
              { label: "Press Release", desc: "Write and distribute press releases." },
              { label: "Research", desc: "AI-powered business and market research." },
              { label: "Reviews", desc: "Generate and manage reviews for products/services." },
              { label: "Rewriter", desc: "Rewrite and improve your content." },
              { label: "SEO", desc: "Search engine optimization tools." },
              { label: "Social Media", desc: "Manage and automate social media posts." },
              { label: "Video Scripts", desc: "Generate scripts for your video content." },
              { label: "Website Copy", desc: "Create compelling website copy." },
              { label: "YouTube", desc: "YouTube channel and video management tools." },
            ].map((tool) => (
              <div key={tool.label} className="rounded-xl shadow p-6 flex flex-col items-start bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800">{tool.label}</span>
                </div>
                <span className="text-gray-700 text-sm mb-4">{tool.desc}</span>
                {tool.href ? (
                  <a href={tool.href} className="mt-auto px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700">
                    Go to Blog Manager
                  </a>
                ) : (
                  <button className="mt-auto px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700" disabled>
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
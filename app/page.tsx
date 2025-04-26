import Image from "next/image";
import HeroImageConvex from "./HeroImageConvex";
import MenuBar from "./components/MenuBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-black via-blue-900 to-gray-900 text-gray-100">
      <MenuBar />

      {/* Hero Section */}
      <section className="relative flex-1 w-full flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden">
  {/* Hero image as background */}
  <div className="absolute inset-0 w-full h-full z-0">
    <HeroImageConvex />
    {/* Optional: overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-950/60 to-gray-900/60" />
  </div>
  {/* Content above the image */}
  <div className="relative z-10">
    <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-blue-200 to-pink-400 text-transparent bg-clip-text drop-shadow-2xl">
      Your Gateway to Online Success
    </h2>
    <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
      Discover the easiest way to start and grow your online business. <span className="font-bold text-blue-700">K Business Academy</span> empowers absolute beginners to become confident entrepreneurs—with clear guidance, tailored resources, and a thriving community.
    </p>
    <a
      href="#enroll"
      className="inline-block px-8 py-4 bg-gradient-to-r from-blue-700 to-pink-700 text-white rounded-xl shadow-2xl hover:from-blue-900 hover:to-pink-800 font-bold text-lg transition-all duration-150"
    >
      🚀 Start Your Journey
    </a>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-16 px-4 bg-gradient-to-br from-blue-950 via-black to-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-200 drop-shadow">Why Choose K Business Academy?</h3>
            <ul className="space-y-4 text-lg text-blue-100 dark:text-blue-100">
  <li><span className="font-bold text-blue-400">Clear Guidance:</span> <span className="text-blue-50">No jargon or fluff—just actionable steps that work.</span></li>
  <li><span className="font-bold text-blue-400">Tailored Resources:</span> <span className="text-blue-50">Learn at your pace, from basics to advanced strategies.</span></li>
  <li><span className="font-bold text-blue-400">Supportive Community:</span> <span className="text-blue-50">Connect, share, and grow with like-minded entrepreneurs.</span></li>
  <li><span className="font-bold text-blue-400">Proven Strategies:</span> <span className="text-blue-50">Skip the guesswork—master what works in today’s digital world.</span></li>
</ul>
<p className="mt-6 text-base text-blue-200 font-semibold">Unsure about your next step? K Business Academy is designed for you. Everyone can thrive in the digital economy—with the right guidance, practical tools, and a supportive community.</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl shadow-xl bg-gradient-to-r from-blue-100 to-pink-100 p-6">
              <h4 className="text-xl font-bold mb-2 text-blue-700">What We Offer</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
                <li>Brand Building &amp; Identity</li>
                <li>Content Creation (articles, emails, video scripts, social posts)</li>
                <li>Marketing Mastery (SEO, email, social media, customer service)</li>
                <li>Ecommerce Essentials (Amazon, Etsy, eBay, Pinterest, YouTube)</li>
                <li>Niche Market Discovery</li>
                <li>Monetization Techniques (eBooks, podcasts, press releases)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-16 px-4 bg-gradient-to-br from-black via-blue-950 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-extrabold mb-4 text-blue-300 drop-shadow">You’re in the Right Place</h3>
<p className="text-lg mb-6 text-blue-100">
  Unsure about your next step? <span className="font-bold text-blue-400">K Business Academy</span> is designed for you. Everyone can thrive in the digital economy—with the right guidance, practical tools, and a supportive community.
</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-full font-semibold shadow-2xl">Beginner Friendly</span>
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-pink-700 to-pink-400 text-white rounded-full font-semibold shadow-2xl">Active Community</span>
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-300 text-white rounded-full font-semibold shadow-2xl">Step-by-Step Training</span>
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-green-700 to-green-400 text-white rounded-full font-semibold shadow-2xl">Modern Tools</span>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="feature-cards" className="py-20 px-4 bg-gradient-to-br from-blue-950 via-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-blue-200 drop-shadow-lg">Unlock Every Tool for Online Success</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { title: "Advertisements", desc: "Stand out in the crowded online space with compelling advertisements that grab attention and drive results. At K Business Academy, we’ll teach you how to craft ads that speak directly to your audience, boost engagement, and grow your business—all while staying within your budget." },
              { title: "Amazon", desc: "Tap into the power of Amazon, one of the largest marketplaces in the world. Whether you’re selling products or promoting affiliate links, we’ll show you how to optimize your listings, increase visibility, and turn clicks into sales like a pro." },
              { title: "Articles and Blogs", desc: "Blogging is more than just writing—it’s about connecting with your audience and building trust. Learn how to create engaging articles and blog posts that not only inform but also inspire action, helping you establish authority in your niche." },
              { title: "Customer Service", desc: "Happy customers = loyal customers. Discover how exceptional customer service can set your business apart. From responding to inquiries to handling complaints gracefully, we’ll equip you with the skills to build lasting relationships that keep people coming back." },
              { title: "eBook", desc: "Turn your knowledge into profit by creating an eBook! Whether you’re sharing expertise, telling stories, or solving problems, we’ll guide you through writing, designing, and marketing your eBook so it reaches the right readers and generates income." },
              { title: "eBay", desc: "Selling on eBay doesn’t have to be complicated. We’ll walk you through setting up shop, listing items effectively, and managing transactions smoothly so you can start earning money from the comfort of your home." },
              { title: "Ecommerce", desc: "Ready to launch your own online store? Dive into the world of ecommerce with step-by-step guidance on everything from choosing the right platform to driving traffic and converting visitors into paying customers." },
              { title: "Emails", desc: "Email marketing remains one of the most powerful tools for growing your business. Learn how to write persuasive emails that engage subscribers, nurture leads, and convert prospects into loyal customers—all without being “salesy.”" },
              { title: "Etsy", desc: "If you’re crafty or creative, Etsy is the perfect place to showcase your work. We’ll help you set up a stunning storefront, price your products competitively, and attract buyers who love handmade and unique goods." },
              { title: "Letter", desc: "Whether it’s a formal business letter or a heartfelt thank-you note, effective communication builds trust and professionalism. Master the art of writing clear, impactful letters that leave a lasting impression on clients, partners, and customers." },
              { title: "Marketing", desc: "Marketing doesn’t have to feel overwhelming. With our easy-to-follow strategies, you’ll learn how to promote your business confidently, reach your target audience, and achieve measurable results—no matter your budget." },
              { title: "Niche Markets", desc: "Finding your niche is the key to standing out in a crowded market. Uncover hidden opportunities, identify underserved audiences, and tailor your offerings to meet their specific needs—setting yourself up for success from day one." },
              { title: "Pinterest", desc: "Pinterest isn’t just for inspiration boards; it’s a goldmine for driving traffic and sales. Learn how to leverage this visual platform to showcase your products, share valuable content, and connect with potential customers who are ready to buy." },
              { title: "Podcast", desc: "Start a podcast and amplify your voice in the digital space. We’ll show you how to plan, record, edit, and promote your episodes so you can build a loyal listener base and establish yourself as an industry expert." },
              { title: "Press Release", desc: "Announce big news, product launches, or milestones with a well-crafted press release. We’ll teach you how to write attention-grabbing releases that get noticed by media outlets and generate buzz around your brand." },
              { title: "Research", desc: "Knowledge is power. Conducting thorough research helps you understand your audience, stay ahead of trends, and make informed decisions. Unlock the secrets of effective research methods to give your business a competitive edge." },
              { title: "Reviews", desc: "Positive reviews build credibility and trust. Learn how to encourage satisfied customers to leave glowing feedback and manage negative reviews constructively to maintain a stellar reputation online." },
              { title: "Rewriter", desc: "Need to refresh old content or rephrase ideas? A rewriter tool can save time and enhance clarity. We’ll introduce you to tools and techniques that streamline your workflow and ensure your content always shines." },
              { title: "SEO", desc: "Get found by the right people at the right time. Search Engine Optimization (SEO) is essential for improving your website’s visibility. We’ll demystify SEO and show you how to rank higher on Google, driving organic traffic to your site." },
              { title: "Social Media", desc: "From Instagram to TikTok, social media is where your audience hangs out. Learn how to create captivating posts, engage with followers, and run campaigns that grow your brand’s presence and influence across platforms." },
              { title: "Video Scripts", desc: "Videos dominate today’s digital landscape. Write scripts that captivate viewers, convey your message clearly, and inspire action—whether you’re creating tutorials, promotional videos, or vlogs." },
              { title: "Website Copy", desc: "Your website is your virtual storefront. Craft copy that speaks directly to your audience, highlights your value proposition, and convinces visitors to take action—whether it’s making a purchase, signing up, or contacting you." },
              { title: "YouTube", desc: "YouTube is the second-largest search engine in the world. Learn how to create engaging video content, optimize your channel, and grow your subscriber base so you can monetize your passion and expand your reach." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-3xl shadow-2xl bg-gradient-to-br from-blue-900 via-black to-gray-900 border border-blue-800 p-6 flex flex-col items-start min-h-[250px] transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 group">
                <span className="font-bold text-xl text-blue-200 mb-2 drop-shadow group-hover:text-pink-400 transition-colors">{title}</span>
                <span className="text-gray-300 text-sm mb-3 leading-relaxed">{desc}</span>
                <button className="mt-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-pink-700 text-white font-semibold shadow-lg hover:from-blue-900 hover:to-pink-900 text-sm transition-all" disabled>
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="enroll" className="py-20 px-4 bg-gradient-to-r from-blue-900 via-black to-pink-900 text-white text-center shadow-inner">
        <h3 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Ready to Begin?</h3>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Take the first step toward building your dream business. Join <span className="font-bold">K Business Academy</span> and unlock your full potential—because here, success isn’t just possible, it’s inevitable.
        </p>
        <a
          href="/students"
          className="inline-block px-10 py-4 rounded-2xl bg-white text-blue-700 font-bold text-xl shadow-xl hover:bg-blue-50 hover:text-pink-600 transition-all duration-150 border-2 border-blue-700"
        >
          👉 Enroll Now
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gradient-to-r from-black via-blue-950 to-gray-900 border-t border-blue-900 text-center text-md mt-auto">
        &copy; {new Date().getFullYear()} K Business Academy. All rights reserved.
      </footer>
    </div>
  );
}



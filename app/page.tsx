import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-purple-200">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Support <span className="text-purple-600">Simplified.</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          A high-performance ticketing system built for scale. Whether you are managing dairy 
          logistics in the highlands or rural health access, we bridge the gap between users and experts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={userId ? "/tickets" : "/sign-up"}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all shadow-lg shadow-purple-500/25 hover:scale-105"
          >
            {userId ? "Go to Dashboard" : "Get Started Free"}
          </Link>
          <a
            href="#tutorial"
            className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            How it Works
          </a>
        </div>
      </section>

      {/* About Section*/}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-purple-600 rounded-3xl p-8 text-white shadow-2xl rotate-1">
             <h2 className="text-3xl font-bold mb-4">The Universal Engine</h2>
             <p className="opacity-90 leading-relaxed">
               Built with Next.js and Prisma, this system is designed to be **pluggable**. 
               It can be adapted and integrated into any existing application—from agricultural 
               insurance platforms to telemedicine portals—as a powerful 3rd party support layer.
             </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Why choose this system?</h3>
            <ul className="space-y-4">
              {[
                "Role-based access control for Admins, Agents, and Customers.",
                "Real-time data synchronization with Clerk Webhooks.",
                "Optimized for mobile and desktop environments.",
                "Customizable priorities and status tracking."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-2 w-2 bg-purple-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section id="tutorial" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">How to Get Started</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="text-4xl mb-4 block">📝</span>
              <h4 className="font-bold mb-2 dark:text-white">1. Create a Ticket</h4>
              <p className="text-sm text-slate-500">Customers log in and submit issues with specific priority levels.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="text-4xl mb-4 block">🛠️</span>
              <h4 className="font-bold mb-2 dark:text-white">2. Admin Assignment</h4>
              <p className="text-sm text-slate-500">Admins monitor the backlog and assign tickets to qualified agents.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="text-4xl mb-4 block">✅</span>
              <h4 className="font-bold mb-2 dark:text-white">3. Resolve & Track</h4>
              <p className="text-sm text-slate-500">Agents update the status until the issue is successfully resolved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-black text-purple-600">TICKETLY</div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Mudash Dev. Built in Kenya for the world.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/tickets" className="hover:text-purple-600">Dashboard</Link>
            <a href="#" className="hover:text-purple-600">Privacy</a>
            <a href="#" className="hover:text-purple-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
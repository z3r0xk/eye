'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-blue-950 to-gray-950">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex-1 flex items-center justify-center p-6 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-6xl mx-auto">
          {/* Hero Text */}
          <motion.div variants={fadeIn} className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-6">
              Eyes on Your Future
            </h1>
            <p className="text-xl text-blue-200/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate your academic journey with our interactive course visualization tools. 
              Understand prerequisites, explore relationships, and plan your path to success.
            </p>
          </motion.div>

          {/* Program Cards */}
          <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Diploma Option */}
            <Link 
              href="/diploma"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-purple-700/50 backdrop-blur-sm"
            >
              <div className="relative z-10">
                <div className="mb-6 p-3 w-16 h-16 rounded-2xl bg-purple-900/50 border border-purple-700/30 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-purple-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-purple-100 mb-3">
                  Eyes on Diploma
                </h2>
                <p className="text-purple-200/80 mb-6 text-lg">
                  Visualize and explore Computer Science Diploma course prerequisites and relationships.
                </p>
                <div className="flex items-center justify-center text-purple-300 gap-2">
                  <span className="text-sm font-medium">Explore Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>

            {/* B.Tech Option */}
            <Link 
              href="/btech"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-blue-900/50 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-blue-700/50 backdrop-blur-sm"
            >
              <div className="relative z-10">
                <div className="mb-6 p-3 w-16 h-16 rounded-2xl bg-blue-900/50 border border-blue-700/30 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-blue-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-blue-100 mb-3">
                  Eyes on B.Tech
                </h2>
                <p className="text-blue-200/80 mb-6 text-lg">
                  Navigate through Bachelor of Technology course requirements and dependencies.
                </p>
                <div className="flex items-center justify-center text-blue-300 gap-2">
                  <span className="text-sm font-medium">Explore Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </motion.div>

          {/* Features Section */}
          <motion.div variants={fadeIn} className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-900/50 border border-blue-700/30 p-2.5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-blue-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Interactive Visualization</h3>
              <p className="text-gray-300/80">Explore course relationships through an intuitive, interactive graph interface.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-purple-900/50 border border-purple-700/30 p-2.5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-purple-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Search</h3>
              <p className="text-gray-300/80">Quickly find courses and their prerequisites with our powerful search feature.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-900/50 border border-blue-700/30 p-2.5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-blue-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Course Analytics</h3>
              <p className="text-gray-300/80">Get insights into course dependencies and plan your academic progress effectively.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

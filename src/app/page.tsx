'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-950 to-gray-950">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eyes on Your Future
          </h1>
          <p className="text-lg text-blue-200 mb-12 max-w-2xl">
            Explore and understand your academic journey with our interactive course visualization tools.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Diploma Option */}
            <Link 
              href="/diploma"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-purple-700/50 backdrop-blur-sm"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-purple-100 mb-3">
                  Eyes on Diploma
                </h2>
                <p className="text-purple-200/80 mb-6">
                  Visualize and explore Computer Science Diploma course prerequisites and relationships.
                </p>
                <div className="flex items-center justify-between text-purple-300">
                  <span className="text-sm font-medium">Explore Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            {/* B.Tech Option */}
            <Link 
              href="/btech"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-blue-900/50 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-blue-700/50 backdrop-blur-sm"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-blue-100 mb-3">
                  Eyes on B.Tech
                </h2>
                <p className="text-blue-200/80 mb-6">
                  Navigate through Bachelor of Technology course requirements and dependencies.
                </p>
                <div className="flex items-center justify-between text-blue-300">
                  <span className="text-sm font-medium">Explore Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

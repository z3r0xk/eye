'use client';

import { useState } from 'react';
import CourseGraph from '@/components/CourseGraph';

export default function ProgramPage({ params }: { params: { program: string } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Handle course selection
  const handleCourseSelect = (courseId: string | null) => {
    setSelectedCourseId(courseId);
  };

  // Handle course info click
  const handleInfoClick = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-400"
        />
      </div>

      <div className="w-full h-[calc(100vh-12rem)] mt-8">
        <CourseGraph
          searchQuery={searchQuery}
          selectedCourseId={selectedCourseId}
          onCourseSelect={handleCourseSelect}
          onInfoClick={handleInfoClick}
        />
      </div>
    </main>
  );
} 
'use client';

import { useState, useCallback } from 'react';
import CourseGraph from '@/components/CourseGraph';
import Header from '@/components/Header';
import NoPrereqCourses from '@/components/NoPrereqCourses';
import { loadCourses } from '@/utils/courseLoader';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const courses = loadCourses();

  const handleCourseClick = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <NoPrereqCourses
          courses={courses}
          searchQuery={searchQuery}
          onCourseClick={handleCourseClick}
        />
        <CourseGraph
          searchQuery={searchQuery}
          selectedCourseId={selectedCourseId}
          onCourseSelect={setSelectedCourseId}
        />
      </div>
    </main>
  );
}

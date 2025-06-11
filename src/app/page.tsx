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
    <main className="h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="flex-none p-4">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>
      <div className="flex-1 flex gap-4 p-4 pt-0 min-h-0">
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

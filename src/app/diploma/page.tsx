'use client';

import { useState, useCallback } from 'react';
import CourseGraph from '@/components/CourseGraph';
import Header from '@/components/Header';
import RightPanel from '@/components/RightPanel';
import LeftPanel from '@/components/LeftPanel';
import { loadCourses } from '@/utils/courseLoader';

export default function DiplomaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const courses = loadCourses();

  const handleCourseSelect = useCallback((courseId: string | null) => {
    setSelectedCourseId(courseId);
    setIsRightSidebarOpen(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gray-950">
      <Header
        title="Diploma Course Prerequisites"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex-1 flex gap-6 p-6">
        <LeftPanel
          courses={courses}
          isOpen={isLeftSidebarOpen}
          onClose={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          onCourseSelect={handleCourseSelect}
        />
        <div className="flex-1">
          <CourseGraph
            courses={courses}
            selectedCourseId={selectedCourseId}
            onCourseSelect={handleCourseSelect}
            searchQuery={searchQuery}
          />
        </div>
        <RightPanel
          courses={courses}
          selectedCourseId={selectedCourseId}
          isOpen={isRightSidebarOpen}
          onClose={() => setIsRightSidebarOpen(false)}
        />
      </div>
    </main>
  );
} 
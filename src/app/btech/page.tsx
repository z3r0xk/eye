'use client';

import { useState, useCallback } from 'react';
import CourseGraph from '@/components/CourseGraph';
import Header from '@/components/Header';
import RightPanel from '@/components/RightPanel';
import LeftPanel from '@/components/LeftPanel';
import { loadBTechCourses } from '@/utils/courseLoader';

export default function BTechPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const courses = loadBTechCourses();

  // Filter courses with no prerequisites and match search query
  const foundationCourses = courses
    .filter(course => course.prerequisites.length === 0)
    .filter(course => 
      !searchQuery || 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selectedCourse = selectedCourseId ? courses.find(c => c.id === selectedCourseId) || null : null;

  const handleCourseClick = useCallback((courseId: string | null) => {
    setSelectedCourseId(courseId);
  }, []);

  const handleInfoClick = useCallback((courseId: string) => {
    const isSameCourse = courseId === selectedCourseId;
    
    // If clicking info on the same course, just toggle the sidebar
    if (isSameCourse) {
      setIsRightSidebarOpen(!isRightSidebarOpen);
    } else {
      // If clicking info on a different course, select it and ensure sidebar is open
      setSelectedCourseId(courseId);
      setIsRightSidebarOpen(true);
    }
  }, [selectedCourseId, isRightSidebarOpen]);

  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-950 to-gray-950">
      <div className="flex-none px-6 py-4">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>
      <div className="flex-1 flex gap-6 px-6 pb-6 min-h-0 overflow-hidden">
        <LeftPanel
          courses={foundationCourses}
          isOpen={isLeftSidebarOpen}
          onClose={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          onCourseSelect={handleCourseClick}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <CourseGraph
            searchQuery={searchQuery}
            selectedCourseId={selectedCourseId}
            onCourseSelect={handleCourseClick}
            onInfoClick={handleInfoClick}
          />
        </div>
        <RightPanel
          course={selectedCourse}
          isOpen={isRightSidebarOpen}
          onClose={() => setIsRightSidebarOpen(false)}
        />
      </div>
    </main>
  );
} 
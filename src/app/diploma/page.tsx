'use client';

import { useState, useEffect } from 'react';
import { Course } from '@/types/course';
import { loadCourses } from '@/utils/courseLoader';
import CourseGraph from '@/components/CourseGraph';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import Header from '@/components/Header';

export default function DiplomaPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  useEffect(() => {
    const loadProgramCourses = async () => {
      const courseData = await loadCourses();
      setCourses(courseData);
    };
    loadProgramCourses();
  }, []);

  const handleCourseSelect = (courseId: string | null) => {
    setSelectedCourseId(courseId);
  };

  const handleInfoClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsRightPanelOpen(true);
  };

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
          isOpen={isLeftPanelOpen}
          onClose={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
          onCourseSelect={handleCourseSelect}
        />
        <div className="flex-1">
          <CourseGraph
            courses={courses}
            selectedCourseId={selectedCourseId}
            onCourseSelect={handleCourseSelect}
            onInfoClick={handleInfoClick}
            searchQuery={searchQuery}
          />
        </div>
        <RightPanel
          courses={courses}
          selectedCourseId={selectedCourseId}
          isOpen={isRightPanelOpen}
          onClose={() => setIsRightPanelOpen(!isRightPanelOpen)}
        />
      </div>
    </main>
  );
} 
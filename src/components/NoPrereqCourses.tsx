import { Course } from '@/types/course';
import { useMemo, useState } from 'react';
import InfoButton from './InfoButton';
import { ChevronLeftIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface NoPrereqCoursesProps {
  courses: Course[];
  searchQuery: string;
  onCourseClick: (courseId: string | null) => void;
  onInfoClick?: (courseId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function NoPrereqCourses({
  courses,
  searchQuery,
  onCourseClick,
  onInfoClick,
  isOpen,
  onToggle,
}: NoPrereqCoursesProps) {
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);

  const foundationCourses = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return courses
      .filter((course) => course.prerequisites.length === 0)
      .filter(
        (course) =>
          course.code.toLowerCase().includes(lowerQuery) ||
          course.name.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => a.code.localeCompare(b.code)); // Sort by course code
  }, [courses, searchQuery]);

  const handleInfoClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    onInfoClick?.(courseId);
  };

  return (
    <div
      className={`flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-800 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'w-80' : 'w-12'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}>
          <h2 className="text-blue-100 font-medium whitespace-nowrap">
            Foundation Courses
          </h2>
        </div>
        <button
          onClick={onToggle}
          className={`p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-full transition-all duration-200 ${
            !isOpen ? 'ml-auto hover:scale-110' : 'hover:scale-105'
          }`}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronLeftIcon
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div className={`flex-1 overflow-y-auto ${isOpen ? '' : 'hidden'}`}>
        {foundationCourses.length > 0 ? (
          <div className="p-4 space-y-3">
            {foundationCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
                className="w-full text-left p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gray-700/50 text-gray-300 group-hover:bg-gray-700 group-hover:text-gray-200 transition-all duration-200">
                      <AcademicCapIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                      {course.code}
                    </span>
                  </div>
                  {onInfoClick && (
                    <InfoButton
                      variant="default"
                      onClick={(e) => handleInfoClick(e, course.id)}
                    />
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                  {course.name}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-sm text-gray-400 text-center">
            No foundation courses found
          </div>
        )}
      </div>
    </div>
  );
} 
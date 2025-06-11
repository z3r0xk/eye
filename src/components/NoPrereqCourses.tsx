import { Course } from '@/types/course';
import { useMemo, useState } from 'react';
import InfoButton from './InfoButton';
import { ChevronLeftIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface NoPrereqCoursesProps {
  courses: Course[];
  searchQuery: string;
  onCourseClick: (courseId: string) => void;
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
      );
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

      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        {foundationCourses.length === 0 ? (
          <div className="p-4 text-sm text-gray-400">No courses found</div>
        ) : (
          <div className="p-4 space-y-3">
            {foundationCourses.map((course) => (
              <div
                key={course.id}
                className={`group rounded-lg bg-gray-800/50 hover:bg-blue-900/20 border border-gray-700 hover:border-blue-700/50 transition-all duration-200 ease-in-out ${
                  hoveredCourseId === course.id ? 'scale-102 shadow-lg' : ''
                }`}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onCourseClick(course.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCourseClick(course.id);
                    }
                  }}
                  className="w-full text-left p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-900/30 text-blue-300 rounded-lg transition-colors group-hover:bg-blue-800/40 group-hover:text-blue-200">
                        <AcademicCapIcon className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-medium text-gray-100 group-hover:text-blue-100">
                        {course.code}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-full group-hover:bg-blue-800/40 group-hover:text-blue-200">
                        {course.hours.creditHours} cr
                      </div>
                      <InfoButton 
                        variant="default" 
                        onClick={(e) => handleInfoClick(e, course.id)}
                      />
                    </div>
                  </div>
                  <div className="mt-1.5 text-sm text-gray-400 group-hover:text-blue-200 transition-colors line-clamp-2">
                    {course.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
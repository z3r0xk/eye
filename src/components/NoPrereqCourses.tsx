import { Course } from '@/types/course';
import { useMemo } from 'react';

interface NoPrereqCoursesProps {
  courses: Course[];
  searchQuery: string;
  onCourseClick?: (courseId: string) => void;
}

export default function NoPrereqCourses({ courses, searchQuery, onCourseClick }: NoPrereqCoursesProps) {
  // Find courses that are used as prerequisites
  const prerequisiteIds = new Set<string>();
  courses.forEach(course => {
    course.prerequisites.forEach(prereqId => {
      prerequisiteIds.add(prereqId);
    });
  });

  // Get independent courses
  const independentCourses = useMemo(() => {
    const filteredCourses = courses.filter(course => 
      course.prerequisites.length === 0 && !prerequisiteIds.has(course.id)
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filteredCourses.filter(course =>
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query)
      );
    }

    return filteredCourses.sort((a, b) => a.code.localeCompare(b.code));
  }, [courses, searchQuery, prerequisiteIds]);

  if (independentCourses.length === 0) return null;

  return (
    <div className="w-64 h-full flex flex-col flex-none bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50">
      <div className="flex-none p-3 border-b border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-200 flex items-center justify-between">
          Independent Courses
          <span className="text-xs text-slate-400">
            {independentCourses.length}
          </span>
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar divide-y divide-slate-700/30">
        {independentCourses.map((course) => (
          <button
            key={course.id}
            onClick={() => onCourseClick?.(course.id)}
            className="w-full group flex flex-col p-2 hover:bg-slate-700/30 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                {course.code}
              </span>
              <span className="px-1.5 py-0.5 text-xs font-medium text-slate-400 bg-slate-800/50 rounded">
                {course.creditHours} cr
              </span>
            </div>
            <div className="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-2 mt-0.5">
              {course.name}
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 
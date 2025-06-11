import { Course } from '@/types/course';

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

  // Only show courses that have no prerequisites AND are not prerequisites for other courses
  const trueFoundationCourses = courses.filter(course => 
    course.prerequisites.length === 0 && !prerequisiteIds.has(course.id)
  );

  const filteredCourses = searchQuery
    ? trueFoundationCourses.filter(course =>
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trueFoundationCourses;

  if (filteredCourses.length === 0) return null;

  return (
    <div className="mb-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl">
      <h2 className="text-lg font-semibold text-slate-200 mb-3">Independent Courses</h2>
      <div className="flex flex-wrap gap-2">
        {filteredCourses.map((course) => (
          <button
            key={course.id}
            onClick={() => onCourseClick?.(course.id)}
            className="group flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                {course.code}
              </span>
              <span className="text-xs text-slate-400 group-hover:text-slate-300">
                {course.name}
              </span>
            </div>
            <span className="ml-2 px-1.5 py-0.5 text-xs font-medium text-slate-300 bg-slate-800/50 rounded">
              {course.creditHours} cr
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 
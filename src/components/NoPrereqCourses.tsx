import { Course } from '@/types/course';
import { AcademicCapIcon, ClockIcon } from '@heroicons/react/24/outline';

interface NoPrereqCoursesProps {
  courses: Course[];
  onCourseSelect?: (courseId: string | null) => void;
}

export default function NoPrereqCourses({ courses, onCourseSelect }: NoPrereqCoursesProps) {
  const handleCourseClick = (courseId: string) => {
    onCourseSelect?.(courseId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          onClick={() => handleCourseClick(course.id)}
          className="group px-4 py-3 rounded-md border-2 border-gray-700 bg-gray-800/50 shadow-xl transition-all duration-200 ease-in-out hover:scale-105 hover:border-gray-500 hover:bg-gray-800/70 cursor-pointer backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/60 group-hover:text-gray-200 transition-all duration-200 ease-in-out">
                <AcademicCapIcon className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium text-white">{course.code}</div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/60 group-hover:text-gray-200 transition-all duration-200 ease-in-out">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{course.hours.creditHours} cr</span>
            </div>
          </div>
          <div className="mt-2 text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
            {course.name}
          </div>
        </div>
      ))}
    </div>
  );
} 
} 
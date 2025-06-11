import { Course } from '@/types/course';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import NoPrereqCourses from './NoPrereqCourses';

interface LeftPanelProps {
  courses: Course[];
  isOpen: boolean;
  onClose: () => void;
  onCourseSelect?: (courseId: string | null) => void;
}

export default function LeftPanel({ courses, isOpen, onClose, onCourseSelect }: LeftPanelProps) {
  return (
    <div
      className={`flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-800 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'w-[800px]' : 'w-12'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}>
          <div>
            <h3 className="text-lg font-semibold text-white">Foundation Courses</h3>
            <p className="text-sm text-blue-300 mt-0.5">Courses with no prerequisites</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-full transition-all duration-200 ${
            !isOpen ? 'ml-auto hover:scale-110' : 'hover:scale-105'
          }`}
          title={isOpen ? "Collapse panel" : "Expand panel"}
        >
          <ChevronRightIcon
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0 p-4' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <NoPrereqCourses courses={courses} onCourseSelect={onCourseSelect} />
      </div>
    </div>
  );
} 
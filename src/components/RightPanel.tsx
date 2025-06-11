import { Course } from '@/types/course';
import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface RightPanelProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RightPanel({ course, isOpen, onClose }: RightPanelProps) {
  if (!course) return null;

  const { hours } = course;
  const totalHours = hours.lecture + hours.tutorial + hours.lab + hours.training;

  return (
    <div
      className={`flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-800 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'w-96' : 'w-12'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}>
          <div>
            <h3 className="text-lg font-semibold text-white">{course.code}</h3>
            <p className="text-sm text-blue-300 mt-0.5">{course.name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-full transition-all duration-200 ${
            !isOpen ? 'ml-auto hover:scale-110' : 'hover:scale-105'
          }`}
          title={isOpen ? "Collapse details" : "Expand details"}
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
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Hours Breakdown */}
          <div>
            <h4 className="text-sm font-medium text-blue-100 mb-3">Hours Breakdown</h4>
            <div className="space-y-3">
              {/* Credit Hours */}
              <div className="flex items-center justify-between p-2.5 rounded bg-purple-900/30 hover:bg-purple-900/40 transition-colors">
                <span className="text-sm text-gray-300">Credit Hours</span>
                <span className="text-sm font-medium text-purple-300">{hours.creditHours}</span>
              </div>

              {/* Contact Hours */}
              <div className="grid grid-cols-2 gap-2">
                {hours.lecture > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                    <span className="text-sm text-gray-300">Lecture</span>
                    <span className="text-sm font-medium text-blue-300">{hours.lecture}</span>
                  </div>
                )}
                {hours.tutorial > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                    <span className="text-sm text-gray-300">Tutorial</span>
                    <span className="text-sm font-medium text-blue-300">{hours.tutorial}</span>
                  </div>
                )}
                {hours.lab > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                    <span className="text-sm text-gray-300">Lab</span>
                    <span className="text-sm font-medium text-blue-300">{hours.lab}</span>
                  </div>
                )}
                {hours.training > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                    <span className="text-sm text-gray-300">Training</span>
                    <span className="text-sm font-medium text-blue-300">{hours.training}</span>
                  </div>
                )}
              </div>

              {/* Total Contact Hours */}
              <div className="flex items-center justify-between p-2.5 rounded bg-blue-900/30 hover:bg-blue-900/40 transition-colors">
                <span className="text-sm text-gray-300">Total Contact Hours</span>
                <span className="text-sm font-medium text-blue-300">{totalHours}</span>
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-blue-100 mb-2">Prerequisites</h4>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((prereq) => (
                  <span
                    key={prereq}
                    className="px-2.5 py-1.5 text-xs bg-indigo-900/30 text-indigo-300 rounded-full border border-indigo-800/50 hover:bg-indigo-900/40 transition-colors"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {course.description && (
            <div>
              <h4 className="text-sm font-medium text-blue-100 mb-2">Description</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {course.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
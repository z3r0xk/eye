import { Course } from '@/types/course';
import { ChevronLeftIcon, ClockIcon, AcademicCapIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface RightPanelProps {
  courses: Course[];
  selectedCourseId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RightPanel({ courses, selectedCourseId, isOpen, onClose }: RightPanelProps) {
  const selectedCourse = selectedCourseId ? courses.find(c => c.id === selectedCourseId) : null;
  const prerequisites = selectedCourse?.prerequisites.map(id => courses.find(c => c.id === id)) ?? [];
  const isPrerequisiteFor = courses.filter(course => course.prerequisites.includes(selectedCourse?.id ?? ''));

  if (!selectedCourse) return null;

  const totalContactHours = selectedCourse.hours.lecture + selectedCourse.hours.tutorial + 
    selectedCourse.hours.lab + selectedCourse.hours.training;

  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className={`flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-800 shadow-xl transition-all duration-300 ease-in-out h-[calc(100vh-7rem)] ${
        isOpen ? 'w-96' : 'w-12'
      }`}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-800/60 bg-gray-900/50">
        <motion.div
          variants={{
            open: { opacity: 1, width: 'auto' },
            closed: { opacity: 0, width: 0 }
          }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 ring-1 ring-indigo-700/50">
              <AcademicCapIcon className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">{selectedCourse.code}</h3>
              <p className="text-xs text-indigo-300/80">{selectedCourse.name}</p>
            </div>
          </div>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className={`p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 rounded-full transition-colors ${
            !isOpen ? 'ml-auto' : ''
          }`}
          title={isOpen ? "Collapse panel" : "Expand panel"}
        >
          <ChevronLeftIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
      </div>

      <motion.div
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: 20 }
        }}
        className={`flex-1 overflow-y-auto min-h-0 ${!isOpen ? 'hidden' : ''}`}
      >
        <div className="p-3 space-y-4">
          {/* Course Hours */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-medium text-indigo-100 uppercase tracking-wider">Hours</h4>
            </div>
            <div className="space-y-2">
              {/* Credit Hours */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-br from-purple-900/30 to-purple-900/20 border border-purple-800/30 hover:from-purple-900/40 hover:to-purple-900/30 transition-all duration-200"
              >
                <span className="text-xs text-gray-300">Credit Hours</span>
                <span className="text-xs font-medium text-purple-300">{selectedCourse.hours.creditHours}</span>
              </motion.div>

              {/* Contact Hours */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { type: 'Lecture', hours: selectedCourse.hours.lecture },
                  { type: 'Tutorial', hours: selectedCourse.hours.tutorial },
                  { type: 'Lab', hours: selectedCourse.hours.lab },
                  { type: 'Training', hours: selectedCourse.hours.training }
                ].map(({ type, hours }) => hours > 0 && (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/30 hover:from-gray-800/50 hover:to-gray-800/30 transition-all duration-200"
                  >
                    <span className="text-xs text-gray-300">{type}</span>
                    <span className="text-xs font-medium text-blue-300">{hours}</span>
                  </motion.div>
                ))}
              </div>

              {/* Total Contact Hours */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-br from-blue-900/30 to-blue-900/20 border border-blue-800/30 hover:from-blue-900/40 hover:to-blue-900/30 transition-all duration-200"
              >
                <span className="text-xs text-gray-300">Total Contact Hours</span>
                <span className="text-xs font-medium text-blue-300">{totalContactHours}</span>
              </motion.div>
            </div>
          </div>

          {/* Prerequisites */}
          {prerequisites.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookmarkIcon className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-medium text-indigo-100 uppercase tracking-wider">Prerequisites</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {prerequisites.map(course => course && (
                  <motion.span
                    key={course.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-1 text-xs bg-gradient-to-br from-indigo-900/30 to-indigo-900/20 text-indigo-300 rounded-full border border-indigo-800/30 hover:from-indigo-900/40 hover:to-indigo-900/30 transition-all duration-200 cursor-default"
                  >
                    {course.code}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Required For */}
          {isPrerequisiteFor.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookmarkIcon className="w-4 h-4 text-indigo-400 rotate-90" />
                <h4 className="text-xs font-medium text-indigo-100 uppercase tracking-wider">Required For</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {isPrerequisiteFor.map(course => (
                  <motion.span
                    key={course.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-1 text-xs bg-gradient-to-br from-blue-900/30 to-blue-900/20 text-blue-300 rounded-full border border-blue-800/30 hover:from-blue-900/40 hover:to-blue-900/30 transition-all duration-200 cursor-default"
                  >
                    {course.code}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {selectedCourse.description && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookmarkIcon className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-medium text-indigo-100 uppercase tracking-wider">Description</h4>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gray-300 leading-relaxed bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/30 rounded-lg p-3"
              >
                {selectedCourse.description}
              </motion.p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 
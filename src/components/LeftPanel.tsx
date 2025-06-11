import { Course } from '@/types/course';
import { ChevronRightIcon, AcademicCapIcon, MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface LeftPanelProps {
  courses: Course[];
  isOpen: boolean;
  onClose: () => void;
  onCourseSelect?: (courseId: string | null) => void;
}

export default function LeftPanel({ courses, isOpen, onClose, onCourseSelect }: LeftPanelProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'general' | 'core'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !localSearch || 
      course.code.toLowerCase().includes(localSearch.toLowerCase()) ||
      course.name.toLowerCase().includes(localSearch.toLowerCase());

    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case 'general':
        return course.code.startsWith('GUN') || course.code.startsWith('GAP');
      case 'core':
        return course.code.startsWith('ECT') || course.code.startsWith('CS');
      default:
        return true;
    }
  });

  const coursesByType = {
    general: filteredCourses.filter(c => c.code.startsWith('GUN') || c.code.startsWith('GAP')).length,
    core: filteredCourses.filter(c => c.code.startsWith('ECT') || c.code.startsWith('CS')).length
  };

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
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-900/50 to-blue-800/30 ring-1 ring-blue-700/50">
              <AcademicCapIcon className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Foundation Courses</h3>
              <p className="text-xs text-blue-300/80">Start your academic journey here</p>
            </div>
          </div>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className={`p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-full transition-colors ${
            !isOpen ? 'ml-auto' : ''
          }`}
          title={isOpen ? "Collapse panel" : "Expand panel"}
        >
          <ChevronRightIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
      </div>

      <motion.div
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: -20 }
        }}
        className={`p-3 border-b border-gray-800/60 bg-gray-900/30 ${!isOpen ? 'hidden' : ''}`}
      >
        <div className="relative group">
          <input
            type="text"
            placeholder="Search courses..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-800/50 text-gray-100 rounded-lg border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none placeholder-gray-500 text-sm transition-all duration-200"
          />
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200" />
        </div>
        <div className="flex gap-1.5 mt-2">
          {[
            { id: 'all', label: 'All', count: filteredCourses.length, color: 'blue' },
            { id: 'general', label: 'General', count: coursesByType.general, color: 'purple' },
            { id: 'core', label: 'Core', count: coursesByType.core, color: 'indigo' }
          ].map(({ id, label, count, color }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedFilter(id as any)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedFilter === id
                  ? `bg-${color}-900/50 text-${color}-300 border border-${color}-700/50 shadow-sm shadow-${color}-900/20`
                  : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
              }`}
            >
              {label} ({count})
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: -20 }
        }}
        className={`flex-1 overflow-y-auto min-h-0 ${!isOpen ? 'hidden' : ''}`}
      >
        <div className="p-3 space-y-2">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onCourseSelect?.(course.id)}
              className="group p-2.5 rounded-lg border border-gray-700/50 bg-gradient-to-br from-gray-800/30 to-gray-800/20 hover:from-gray-800/40 hover:to-gray-800/30 hover:border-gray-600/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-gray-700/50 to-gray-700/30 group-hover:from-gray-700/70 group-hover:to-gray-700/50 transition-all duration-200 ring-1 ring-gray-700/50 group-hover:ring-gray-600/50">
                  <BookOpenIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white truncate transition-colors duration-200">
                    {course.code}
                  </h4>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 mt-0.5 line-clamp-1 transition-colors duration-200">
                    {course.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Credits:</span>
                      <span className="text-xs font-medium text-blue-300/90 group-hover:text-blue-300 transition-colors duration-200">
                        {course.hours.creditHours}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Hours:</span>
                      <span className="text-xs font-medium text-blue-300/90 group-hover:text-blue-300 transition-colors duration-200">
                        {course.hours.totalContactHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <p className="text-gray-400 text-sm">No courses match your search criteria</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 
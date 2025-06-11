import { MagnifyingGlassIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCourses: number;
}

export default function Header({ searchQuery, onSearchChange, totalCourses }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl">
      <h1 className="text-2xl font-bold text-slate-100">
        Course Prerequisites Visualizer
      </h1>
      <div className="w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700/50 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
          <InformationCircleIcon className="w-5 h-5 text-indigo-400" />
          <span className="text-slate-300">{totalCourses} Courses</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <span>Click and drag to move courses</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <span>Scroll to zoom in/out</span>
        </div>
      </div>
    </header>
  );
} 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl">
      <h1 className="text-xl font-bold text-slate-100 sm:w-64">
        Course Prerequisites
      </h1>
      <div className="flex-1 flex justify-center max-w-2xl w-full">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="sm:w-64" /> {/* Spacer for centering */}
    </header>
  );
} 
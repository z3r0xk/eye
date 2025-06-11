import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { AcademicCapIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Course } from '@/types/course';
import InfoButton from './InfoButton';

interface ExtendedCourse extends Course {
  selected: boolean;
  isInPath: boolean;
  pathType: 'prerequisite' | 'dependent' | 'none';
  onInfoClick?: () => void;
}

export default function CourseNode({ data }: NodeProps<ExtendedCourse>) {
  const [isHovered, setIsHovered] = useState(false);

  const getNodeStyle = () => {
    if (data.selected) return 'border-purple-500 bg-purple-900/50 shadow-purple-900/50';
    if (data.pathType === 'prerequisite') return 'border-indigo-500 bg-indigo-900/50 shadow-indigo-900/50';
    if (data.pathType === 'dependent') return 'border-blue-500 bg-blue-900/50 shadow-blue-900/50';
    if (isHovered) return 'border-gray-500 bg-gray-800/70 shadow-gray-900/50';
    return 'border-gray-700 bg-gray-800/50 shadow-gray-900/50';
  };

  const getIconStyle = () => {
    if (data.selected) return 'bg-purple-900/50 text-purple-300 group-hover:bg-purple-800/60 group-hover:text-purple-200';
    if (data.pathType === 'prerequisite') return 'bg-indigo-900/50 text-indigo-300 group-hover:bg-indigo-800/60 group-hover:text-indigo-200';
    if (data.pathType === 'dependent') return 'bg-blue-900/50 text-blue-300 group-hover:bg-blue-800/60 group-hover:text-blue-200';
    return 'bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/60 group-hover:text-gray-200';
  };

  const getHandleStyle = () => {
    if (data.selected) return '!bg-purple-500 group-hover:!bg-purple-400';
    if (data.pathType === 'prerequisite') return '!bg-indigo-500 group-hover:!bg-indigo-400';
    if (data.pathType === 'dependent') return '!bg-blue-500 group-hover:!bg-blue-400';
    return 'group-hover:!bg-gray-400';
  };

  const getBadgeStyle = () => {
    if (data.selected) return 'bg-purple-900/50 text-purple-300 group-hover:bg-purple-800/60 group-hover:text-purple-200';
    if (data.pathType === 'prerequisite') return 'bg-indigo-900/50 text-indigo-300 group-hover:bg-indigo-800/60 group-hover:text-indigo-200';
    if (data.pathType === 'dependent') return 'bg-blue-900/50 text-blue-300 group-hover:bg-blue-800/60 group-hover:text-blue-200';
    return 'bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/60 group-hover:text-gray-200';
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    data.onInfoClick?.();
  };

  return (
    <div
      className={`group px-4 py-3 shadow-xl rounded-md border-2 min-w-[220px] transition-all duration-200 ease-in-out backdrop-blur-sm hover:scale-105 ${getNodeStyle()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={`w-16 transition-all duration-200 ease-in-out ${getHandleStyle()} ${
          data.selected || isHovered ? '!h-1.5' : '!h-1'
        }`}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg transition-all duration-200 ease-in-out ${getIconStyle()}`}>
            <AcademicCapIcon className="w-5 h-5" />
          </div>
          <div className="text-sm font-medium text-white">{data.code}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ease-in-out ${getBadgeStyle()}`}>
            <BookOpenIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{data.hours.creditHours} cr</span>
          </div>
          <InfoButton variant="graph" onClick={handleInfoClick} />
        </div>
      </div>
      
      <div className="mt-2 text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200">{data.name}</div>
      
      {data.prerequisites.length > 0 && (
        <div className={`mt-3 flex items-center gap-1.5 text-xs transition-all duration-200 ease-in-out ${getBadgeStyle()}`}>
          <ClockIcon className="w-4 h-4" />
          <span>{data.prerequisites.length} prerequisite{data.prerequisites.length > 1 ? 's' : ''}</span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className={`w-16 transition-all duration-200 ease-in-out ${getHandleStyle()} ${
          data.selected || isHovered ? '!h-1.5' : '!h-1'
        }`}
      />
    </div>
  );
} 
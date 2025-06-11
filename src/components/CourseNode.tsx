import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { AcademicCapIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Course } from '@/types/course';

interface ExtendedCourse extends Course {
  selected: boolean;
  isInPath: boolean;
  pathType: 'prerequisite' | 'dependent' | 'none';
}

export default function CourseNode({ data }: NodeProps<ExtendedCourse>) {
  const [isHovered, setIsHovered] = useState(false);

  const getNodeStyle = () => {
    if (data.selected) return 'border-indigo-500 bg-indigo-900/50 shadow-indigo-900/50';
    if (data.pathType === 'prerequisite') return 'border-amber-500 bg-amber-900/50 shadow-amber-900/50';
    if (data.pathType === 'dependent') return 'border-violet-500 bg-violet-900/50 shadow-violet-900/50';
    if (isHovered) return 'border-slate-500 bg-slate-800/50 shadow-slate-900/50';
    return 'border-slate-700 bg-slate-800/30 shadow-slate-900/50';
  };

  const getIconStyle = () => {
    if (data.selected) return 'bg-indigo-900/50 text-indigo-300';
    if (data.pathType === 'prerequisite') return 'bg-amber-900/50 text-amber-300';
    if (data.pathType === 'dependent') return 'bg-violet-900/50 text-violet-300';
    return 'bg-slate-800/50 text-slate-300';
  };

  const getHandleStyle = () => {
    if (data.selected) return '!bg-indigo-500';
    if (data.pathType === 'prerequisite') return '!bg-amber-500';
    if (data.pathType === 'dependent') return '!bg-violet-500';
    return '!bg-slate-500';
  };

  return (
    <div
      className={`px-4 py-3 shadow-xl rounded-md border-2 min-w-[220px] transition-all duration-200 backdrop-blur-sm ${getNodeStyle()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={`w-16 transition-all duration-200 ${getHandleStyle()} ${
          data.selected || isHovered ? '!h-1.5' : '!h-1'
        }`}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg transition-colors ${getIconStyle()}`}>
            <AcademicCapIcon className="w-5 h-5" />
          </div>
          <div className="font-medium text-sm text-slate-300">{data.code}</div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
          data.selected ? 'bg-indigo-900/50 text-indigo-300' :
          data.pathType === 'prerequisite' ? 'bg-amber-900/50 text-amber-300' :
          data.pathType === 'dependent' ? 'bg-violet-900/50 text-violet-300' :
          'bg-slate-800/50 text-slate-300'
        }`}>
          <BookOpenIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{data.creditHours} cr</span>
        </div>
      </div>
      
      <div className="mt-2 text-sm font-medium text-slate-200">{data.name}</div>
      
      {data.prerequisites.length > 0 && (
        <div className={`mt-3 flex items-center gap-1.5 text-xs transition-colors ${
          data.selected ? 'text-indigo-300' :
          data.pathType === 'prerequisite' ? 'text-amber-300' :
          data.pathType === 'dependent' ? 'text-violet-300' :
          'text-slate-400'
        }`}>
          <ClockIcon className="w-4 h-4" />
          <span>{data.prerequisites.length} prerequisite{data.prerequisites.length > 1 ? 's' : ''}</span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className={`w-16 transition-all duration-200 ${getHandleStyle()} ${
          data.selected || isHovered ? '!h-1.5' : '!h-1'
        }`}
      />
    </div>
  );
} 
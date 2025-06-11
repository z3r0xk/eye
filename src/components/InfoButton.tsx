import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface InfoButtonProps {
  onClick?: (event: React.MouseEvent) => void;
  variant?: 'default' | 'graph';
}

export default function InfoButton({ onClick, variant = 'default' }: InfoButtonProps) {
  const baseClasses = 'p-1 rounded-full transition-colors cursor-pointer';
  const variantClasses = variant === 'graph'
    ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent);
        }
      }}
      className={`${baseClasses} ${variantClasses}`}
    >
      <InformationCircleIcon className="w-5 h-5" />
    </div>
  );
} 
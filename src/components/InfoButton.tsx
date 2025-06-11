import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface InfoButtonProps {
  onClick?: (event: React.MouseEvent) => void;
  variant?: 'default' | 'graph';
}

export default function InfoButton({ onClick, variant = 'default' }: InfoButtonProps) {
  const baseClasses = 'p-1 rounded-full transition-colors';
  const variantClasses = variant === 'graph'
    ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      <InformationCircleIcon className="w-5 h-5" />
    </button>
  );
} 
import { cn } from '../../../lib/utils';

export default function UploadButton({
  onClick,
  disabled,
  loading,
  children,
  className = '',
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-green-100 text-sm py-2 px-10 font-bold text-white rounded-full',
        ' disabled:cursor-not-allowed',
        className,
      )}
    >
      {loading ? '업로드 중...' : children}
    </button>
  );
}

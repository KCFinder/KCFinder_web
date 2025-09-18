import { cn } from '../lib/utils';

export default function ContentsWrapper({ children, className }) {
  return (
    <div className={cn('flex-1 container mx-auto max-w-[894px]', className)}>
      {children}
    </div>
  );
}

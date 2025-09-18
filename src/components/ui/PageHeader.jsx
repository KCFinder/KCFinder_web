import { cn } from '../../lib/utils';

export default function PageHeader({ title, className }) {
  return (
    <h2
      className={cn(
        'text-lg md:text-2xl font-bold text-primary-100 mb-8 text-left',
        className,
      )}
    >
      {title}
    </h2>
  );
}

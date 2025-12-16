
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export const TimelineItem = ({ 
  year, 
  title, 
  description, 
  icon = <CalendarIcon size={18} />, 
  className 
}: TimelineItemProps) => {
  return (
    <div className={cn("relative pl-10 pb-10 last:pb-0", className)}>
      {/* Timeline vertical line */}
      <div className="absolute left-0 top-1 bottom-0 w-px bg-border"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
      </div>
      
      {/* Timeline content */}
      <div className="glass p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary">{icon}</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-sm">
            {year}
          </span>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

interface TimelineProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Timeline = ({ title, subtitle, children, className }: TimelineProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default Timeline;

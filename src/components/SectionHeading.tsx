
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true, 
  className, 
  ...props 
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        "mb-12", 
        centered && "text-center", 
        className
      )} 
      {...props}
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;


import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SkillCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  icon: React.ReactNode;
}

const SkillCard = ({ name, icon, className, ...props }: SkillCardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300",
        "hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
        "group cursor-pointer bg-background/50 border border-primary/20",
        className
      )} 
      {...props}
    >
      <div className="text-3xl text-primary relative p-3 rounded-full bg-background">
        {/* Clean, simplified icon container */}
        <div className="absolute inset-0 rounded-full bg-background/95 transition-colors duration-300"></div>
        
        {/* Icon */}
        <div className="relative z-10 group-hover:scale-110 transform transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="font-medium text-center text-sm sm:text-base group-hover:text-primary transition-colors">
        {name}
      </h3>
    </div>
  );
};

export default SkillCard;

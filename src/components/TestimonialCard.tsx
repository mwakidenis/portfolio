
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface TestimonialCardProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  author: string;
  role: string;
  avatarSrc?: string;
}

const TestimonialCard = ({ 
  content, 
  author, 
  role, 
  avatarSrc, 
  className, 
  ...props 
}: TestimonialCardProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl glass flex flex-col h-full",
        className
      )} 
      {...props}
    >
      <div className="mb-4 text-primary">
        <Quote className="h-8 w-8 opacity-70" />
      </div>
      
      <p className="flex-1 text-foreground/90 mb-6 text-lg">{content}</p>
      
      <div className="flex items-center gap-3">
        {avatarSrc ? (
          <img 
            src={avatarSrc} 
            alt={author} 
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {author.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

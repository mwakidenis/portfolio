
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  reversed?: boolean;
}

const ProjectCard = ({
  title,
  description,
  imageSrc,
  tags,
  liveDemoUrl,
  githubUrl,
  reversed = false,
}: ProjectCardProps) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
      reversed && "md:flex-row-reverse"
    )}>
      <div className={cn(
        "order-2",
        reversed ? "md:order-1" : "md:order-2"
      )}>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-secondary text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4">
          {liveDemoUrl && (
            <Button asChild>
              <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button variant="outline" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
      
      <div className={cn(
        "order-1 rounded-lg overflow-hidden border",
        reversed ? "md:order-2" : "md:order-1"
      )}>
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-auto object-cover aspect-[16/10] hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default ProjectCard;

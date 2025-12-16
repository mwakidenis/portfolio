
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CertificateCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  imageUrl?: string;
}

const CertificateCard = ({ 
  title, 
  issuer, 
  date, 
  icon, 
  imageUrl,
  className, 
  ...props 
}: CertificateCardProps) => {
  return (
    <Card 
      className={cn(
        "hover-lift overflow-hidden glass border-0",
        className
      )} 
      {...props}
    >
      {imageUrl && (
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <img 
              src={imageUrl} 
              alt={`${title} certificate`} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      )}
      
      <CardContent className={cn(
        "p-6 flex flex-col gap-4",
        imageUrl ? "relative -mt-12 z-10 bg-gradient-to-t from-background via-background/95 to-background/80" : ""
      )}>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-primary">{issuer}</p>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-muted-foreground">{date}</span>
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Verified ✓</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;

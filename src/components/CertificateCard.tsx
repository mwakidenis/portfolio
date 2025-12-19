import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ArrowUpRight } from 'lucide-react';

interface CertificateCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  imageUrl?: string;
  certificateLink?: string; // optional link to PDF
}

const CertificateCard = ({
  title,
  issuer,
  date,
  icon,
  imageUrl,
  certificateLink,
  className,
  ...props
}: CertificateCardProps) => {
  return (
    <Card
      className={cn(
        'hover-lift overflow-hidden glass border-0 flex flex-col',
        className
      )}
      {...props}
    >
      {/* Image Section */}
      {imageUrl && (
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={`${title} certificate`}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      )}

      {/* Content Section */}
      <CardContent
        className={cn(
          'p-6 flex flex-col gap-4 flex-1',
          imageUrl
            ? 'relative -mt-12 z-10 bg-gradient-to-t from-background via-background/95 to-background/80'
            : ''
        )}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>

        {/* Text + Button in one row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 flex-1">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-primary">{issuer}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{date}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Verified ✓
              </span>
            </div>
          </div>

          {certificateLink && (
            <a
              href={certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // prevent loader
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              View Certificate
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;

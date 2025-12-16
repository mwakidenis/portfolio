
import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  maxStars?: number;
  initialRating?: number;
  onChange?: (rating: number) => void;
  className?: string;
  onSave?: (rating: number) => Promise<void>;
}

const StarRating = ({
  maxStars = 5,
  initialRating = 0,
  onChange,
  className,
  onSave,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleRating = async (selectedRating: number) => {
    if (isRated || isSaving) return;
    
    setRating(selectedRating);
    setIsRated(true);
    onChange?.(selectedRating);
    
    if (onSave) {
      try {
        setIsSaving(true);
        await onSave(selectedRating);
        // Show thank you toast after successful save
        toast.success(`Thank you for rating ${selectedRating} stars!`, {
          description: "Your feedback has been recorded!",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error saving rating:", error);
        toast.error("Could not save your rating", {
          description: "Please try again later",
          duration: 3000,
        });
        // Allow retrying if saving failed
        setIsRated(false);
      } finally {
        setIsSaving(false);
      }
    } else {
      // Original behavior if no save function provided
      toast.success(`Thank you for rating ${selectedRating} stars!`, {
        description: "I appreciate your feedback!",
        duration: 3000,
      });
    }
    
    // Store rating in local storage
    localStorage.setItem('portfolioRating', selectedRating.toString());
  };

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hoverRating || rating);
        
        return (
          <button
            key={`star-${index}`}
            type="button"
            className={cn(
              "transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background p-1 rounded-full",
              (isRated || isSaving) ? "cursor-default" : "cursor-pointer"
            )}
            onMouseEnter={() => !isRated && !isSaving && setHoverRating(starValue)}
            onMouseLeave={() => !isRated && !isSaving && setHoverRating(0)}
            onClick={() => handleRating(starValue)}
            disabled={isRated || isSaving}
            aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                "transition-colors",
                isActive 
                  ? "fill-primary text-primary" 
                  : "fill-none text-muted-foreground hover:text-primary",
                isSaving && "opacity-50"
              )}
              size={24}
            />
          </button>
        );
      })}
      {isSaving && (
        <span className="ml-2 text-xs text-muted-foreground animate-pulse">
          Saving...
        </span>
      )}
    </div>
  );
};

export default StarRating;

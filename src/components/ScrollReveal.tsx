
import { useEffect, useRef, ReactNode, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
  rootMargin?: string;
  disabled?: boolean; // Add option to disable animations on low-end devices
}

const ScrollReveal = ({ 
  children, 
  className = '',
  threshold = 0.1,
  delay = 0,
  direction = 'up',
  duration = 800,
  once = true,
  rootMargin = '0px 0px -100px 0px',
  disabled = false
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  useEffect(() => {
    // If animations are disabled or reduced motion preference, skip animation
    if (disabled || isReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Use the Intersection Observer API for better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger animation when element enters viewport
        if (entry.isIntersecting && !isVisible) {
          // Only set once to avoid unnecessary rerenders
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        } else if (!entry.isIntersecting && !once && isVisible) {
          // If not using once, reset visibility when element leaves viewport
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay, isVisible, once, rootMargin, disabled, isReducedMotion]);
  
  // Define animation classes based on direction
  let animationClass = 'reveal-up';
  if (direction === 'down') animationClass = 'reveal-down';
  if (direction === 'left') animationClass = 'reveal-left';
  if (direction === 'right') animationClass = 'reveal-right';
  
  // If disabled or reduced motion preference, don't apply animation classes
  if (disabled || isReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div
      ref={ref}
      className={`reveal ${animationClass} ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ 
        willChange: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        // Use hardware acceleration for smoother animations
        transform: isVisible ? 'translate3d(0, 0, 0)' : undefined
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

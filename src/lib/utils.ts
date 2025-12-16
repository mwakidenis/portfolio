
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this helper function for creating dynamic tailwind classes
export function createAnimationClass(name: string, keyframes: object, settings: string) {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    const keyframeString = Object.entries(keyframes)
      .map(([key, value]) => {
        const cssProps = Object.entries(value as object)
          .map(([cssKey, cssValue]) => `${cssKey}: ${cssValue};`)
          .join(' ');
        return `${key} { ${cssProps} }`;
      })
      .join(' ');
    
    style.textContent = `@keyframes ${name} { ${keyframeString} } .animate-${name} { animation: ${name} ${settings}; }`;
    document.head.appendChild(style);
  }
  
  return `animate-${name}`;
}

// Create a slow bounce animation
if (typeof document !== 'undefined') {
  createAnimationClass('bounce-slow', {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' }
  }, '3s ease-in-out infinite');
}

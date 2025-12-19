import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

// Import main sections directly
import HeroSection from '@/components/sections/HeroSection';

// Lazy load other sections for better performance
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const CareerSection = lazy(() => import('@/components/sections/CareerSection'));
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'));
const EducationSection = lazy(() => import('@/components/sections/EducationSection'));
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'));
const BlogSection = lazy(() => import('@/components/sections/BlogSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const TetrisSection = lazy(() => import('@/components/sections/TetrisSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const RatingSection = lazy(() => import('@/components/sections/RatingSection'));
const NewsletterSection = lazy(() => import('@/components/sections/NewsletterSection'));

// Loading component for suspense fallback
const SectionSkeleton = () => (
  <div className="w-full py-8 sm:py-16">
    <Skeleton className="w-[80%] h-8 mx-auto mb-4" />
    <Skeleton className="w-[60%] h-6 mx-auto mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
      <Skeleton className="h-[150px] sm:h-[200px] w-full rounded-xl" />
      <Skeleton className="h-[150px] sm:h-[200px] w-full rounded-xl" />
    </div>
  </div>
);

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lowEndDevice, setLowEndDevice] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mark as loaded after a short delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Check if device is low-end based on memory and processor
    const checkDevicePerformance = () => {
      // @ts-ignore - Some browsers support this API
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        setLowEndDevice(true);
        return;
      }
      
      // Using a simple time-based test as fallback
      const start = performance.now();
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      const end = performance.now();
      
      // If the test takes more than 100ms, consider it a low-end device
      if (end - start > 100) {
        setLowEndDevice(true);
      }
    };
    
    checkDevicePerformance();
    
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll event handling
      requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 300);
      });
    };
    
    // Add hash change event to improve navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add slight delay to ensure smooth scrolling
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    // Check hash on initial load
    handleHashChange();
    
    // Passive true improves scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add CSS to improve scrolling performance
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Customize ScrollArea options based on device
  // Fix: Use proper type literal instead of string variable
  const scrollAreaProps = {
    className: "h-screen w-full",
    // Use simpler scroll behavior on low-end devices
    type: lowEndDevice ? "auto" as const : "hover" as const
  };

  return (
    <ScrollArea {...scrollAreaProps}>
      <div className={`flex flex-col min-h-screen w-full overflow-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main className="flex-1 w-full">
          {/* Hero section is not lazy loaded for immediate display */}
          <HeroSection />
          
          {/* Lazy-loaded sections with suspense fallbacks */}
          <Suspense fallback={<SectionSkeleton />}>
            <AboutSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <CareerSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <SkillsSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <EducationSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <TetrisSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <ProjectsSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <BlogSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <TestimonialsSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <NewsletterSection />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <RatingSection />
          </Suspense>
        </main>
        
        <Footer />
        
        {/* Scroll to top button - improved animation and mobile touch target */}
        <button
          onClick={scrollToTop}
          className={`fixed right-4 sm:right-6 bottom-20 sm:bottom-24 p-2 sm:p-3 rounded-full bg-primary text-white shadow-lg transition-all duration-300 z-40 ${
            showScrollTop ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
          aria-label="Scroll to top"
          style={{ touchAction: 'manipulation' }}
        >
          <ChevronUp size={isMobile ? 22 : 18} />
        </button>
        
        {/* WhatsApp Button */}
        <WhatsAppButton 
          phoneNumber="254798750585" 
          message="Hi Mwaki Denis👋! I saw your amazing✨ portfolio and I'm interested in working together🤝 on a project. When would be a good time to chat?"
        />
      </div>
    </ScrollArea>
  );
};

export default Index;

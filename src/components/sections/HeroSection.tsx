
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Only update if we're on desktop, avoid on mobile
      if (window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 10; // -5 to 5
        const y = (clientY / window.innerHeight - 0.5) * 10; // -5 to 5
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-4 md:space-y-6 text-center md:text-left">
            <ScrollReveal delay={200} direction="left">
              <div className="inline-block glass px-3 py-1.5 rounded-full mb-2 text-xs sm:text-sm">
                <span className="text-primary">✦</span> UI/UX Designer & Software Developer <span className="ml-1">🚀</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400} direction="left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-gradient">Mwaki Denis</span> <span className="inline-block animate-bounce">👋</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={600} direction="left">
              <p className="text-base md:text-xl text-muted-foreground">
              🎯 On a mission to bridge design & development by fusing UI/UX intuition with full-stack skills 💻. I create products that users love ❤️ and businesses value. 💼 <span className="text-primary">✨</span>
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={800} direction="left">
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                <Button size={isMobile ? "default" : "lg"} asChild>
                  <a href="#contact">
                    Get in touch <span className="ml-1">📩</span>
                  </a>
                </Button>
                <Button variant="outline" size={isMobile ? "default" : "lg"} asChild>
                  <a href="#projects">
                    View my work <span className="ml-1">👀</span>
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={1000} direction="right" className="md:col-span-5">
            <div className="relative w-full max-w-[300px] md:max-w-[400px] mx-auto h-[300px] md:h-[400px]">
              {/* Enhanced animated fluid/watery background effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-slow"></div>
                
                {/* Amplified watery blob corners */}
                <div className="absolute top-[-20px] left-[-20px] h-[100px] w-[100px] rounded-full bg-accent/40 blur-lg animate-blob"></div>
                <div className="absolute bottom-[-30px] right-[-10px] h-[120px] w-[120px] rounded-full bg-primary/40 blur-lg animate-blob animation-delay-2000"></div>
                <div className="absolute top-[60%] left-[-15px] h-[70px] w-[70px] rounded-full bg-primary/50 blur-lg animate-blob animation-delay-4000"></div>
                <div className="absolute top-[-10px] right-[25%] h-[80px] w-[80px] rounded-full bg-accent/50 blur-lg animate-blob animation-delay-3000"></div>
                
                {/* Enhanced ripple effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_40%,_rgba(var(--primary),0.15)_70%)]"></div>
                
                {/* More pronounced moving waves */}
                <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(var(--accent),0.2)_0%,transparent_100%)] animate-wave"></div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,rgba(var(--primary),0.2)_0%,transparent_100%)] animate-wave animation-delay-2000"></div>
                
                {/* More floating particles */}
                <div className="absolute h-4 w-4 rounded-full bg-primary/60 blur-sm animate-float" 
                  style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
                <div className="absolute h-3 w-3 rounded-full bg-primary/70 blur-sm animate-float" 
                  style={{ top: '70%', left: '15%', animationDelay: '1.5s' }}></div>
                <div className="absolute h-5 w-5 rounded-full bg-accent/60 blur-sm animate-float" 
                  style={{ top: '30%', right: '10%', animationDelay: '1s' }}></div>
                <div className="absolute h-3 w-3 rounded-full bg-accent/70 blur-sm animate-float" 
                  style={{ bottom: '20%', right: '15%', animationDelay: '2s' }}></div>
                
                {/* Additional watery particles */}
                <div className="absolute h-6 w-6 rounded-full bg-primary/30 blur-lg animate-float" 
                  style={{ top: '50%', left: '50%', animationDelay: '2.5s' }}></div>
                <div className="absolute h-4 w-4 rounded-full bg-accent/30 blur-lg animate-float" 
                  style={{ top: '40%', right: '30%', animationDelay: '3.5s' }}></div>
              </div>
              
              {/* Profile image with parallax effect - ensuring it's visible with z-index and size adjustments */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div 
                  className="w-[230px] h-[230px] md:w-[300px] md:h-[300px] relative"
                  style={{
                    transform: isMounted && !isMobile ? `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)` : 'none',
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img 
                    src="/20240814_132224.jpg" 
                    alt="Mwaki Denis"
                    className="w-full h-full object-cover rounded-full border-4 border-background shadow-2xl"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(var(--primary), 0.3))',
                      zIndex: 30
                    }}
                  />
                </div>
              </div>
              
              {/* Enhanced glowing border effect */}
              <div className="absolute inset-0 rounded-full opacity-80 z-10"
                style={{
                  background: 'radial-gradient(circle at center, transparent 60%, rgba(var(--primary), 0.2) 100%)'
                }}
              ></div>
              
              {/* Animated ring rotation */}
              <div className="absolute inset-[5%] border-2 border-dashed border-primary/30 rounded-full animate-[spin_40s_linear_infinite] z-10"></div>
              <div className="absolute inset-[15%] border-1 border-dotted border-accent/20 rounded-full animate-[spin_30s_linear_infinite_reverse] z-10"></div>
              
              {/* Outer glow */}
              <div className="absolute inset-[-10%] blur-xl bg-gradient-to-br from-primary/10 to-accent/10 rounded-full"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

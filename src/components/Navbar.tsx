
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Identify which section is currently in view
      const sections = [
        "home", "about", "career", "skills", 
        "education", "projects", "blog", 
        "testimonials", "contact"
      ];
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once to set initial active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking a link on mobile
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Career", href: "/#career" },
    { name: "Skills", href: "/#skills" },
    { name: "Education", href: "/#education" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-3 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between px-4 mx-auto max-w-[1400px]">
        <Link 
          to="/" 
          className="font-heading text-lg sm:text-xl font-bold flex items-center gap-2"
          onClick={closeMenu}
        >
          {/* Improved logo with better color contrast for both light and dark modes */}
          <div className="relative flex items-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-shift"></div>
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-background rounded-lg ring-1 ring-gray-400/50 dark:ring-white/50 overflow-hidden">
              <Code className="text-primary w-5 h-5 sm:w-6 sm:h-6 z-10" />
              <Sparkles className="absolute text-primary/90 w-6 h-6 sm:w-8 sm:h-8 animate-pulse-slow" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-500/40 animate-pulse"></div>
            </div>
            <span className="ml-2 font-extrabold tracking-tight text-sm sm:text-base">
              <span className="text-foreground bg-clip-text">Mark</span>
              <span className="text-foreground bg-clip-text">Lewis</span>
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <ul className="flex items-center gap-3 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = 
                (link.href === "/#home" && activeSection === "home") ||
                (link.href === "/#about" && activeSection === "about") ||
                (link.href === "/#career" && activeSection === "career") ||
                (link.href === "/#skills" && activeSection === "skills") ||
                (link.href === "/#education" && activeSection === "education") ||
                (link.href === "/#projects" && activeSection === "projects") ||
                (link.href === "/blog" && window.location.pathname === "/blog") ||
                (link.href === "/#testimonials" && activeSection === "testimonials") ||
                (link.href === "/#contact" && activeSection === "contact");
                
              return (
                <li key={link.name}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link 
                      to={link.href} 
                      className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all ${
                        isActive 
                          ? "text-foreground after:w-full" 
                          : "text-foreground/80 hover:text-foreground after:w-0 hover:after:w-full"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all ${
                        isActive 
                          ? "text-foreground after:w-full" 
                          : "text-foreground/80 hover:text-foreground after:w-0 hover:after:w-full"
                      }`}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <ThemeSwitcher />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeSwitcher />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleMenu}
            className="md:hidden p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu - Improved for better mobile experience */}
      <div 
        className={`md:hidden fixed top-[52px] left-0 right-0 bg-background/95 backdrop-blur-lg shadow-md transition-all duration-300 z-50 ${
          isMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden"
        }`}
        style={{ 
          boxShadow: isMenuOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
          visibility: isMenuOpen ? 'visible' : 'hidden',
          opacity: isMenuOpen ? 1 : 0
        }}
      >
        <nav className="container py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = 
                (link.href === "/#home" && activeSection === "home") ||
                (link.href === "/#about" && activeSection === "about") ||
                (link.href === "/#career" && activeSection === "career") ||
                (link.href === "/#skills" && activeSection === "skills") ||
                (link.href === "/#education" && activeSection === "education") ||
                (link.href === "/#projects" && activeSection === "projects") ||
                (link.href === "/blog" && window.location.pathname === "/blog") ||
                (link.href === "/#testimonials" && activeSection === "testimonials") ||
                (link.href === "/#contact" && activeSection === "contact");
              
              return (
                <li key={link.name}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link 
                      to={link.href} 
                      className={`block py-3 px-4 rounded-lg transition-all ${
                        isActive ? "bg-primary/10 text-foreground font-medium" : "text-foreground/80 hover:bg-background hover:text-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className={`block py-3 px-4 rounded-lg transition-all ${
                        isActive ? "bg-primary/10 text-foreground font-medium" : "text-foreground/80 hover:bg-background hover:text-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

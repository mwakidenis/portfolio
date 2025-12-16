
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default to dark
  const { toast } = useToast();

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      // Default to dark mode if no preference is stored
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Update DOM and localStorage
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      toast({
        title: "Dark Mode Activated",
        description: "Your eyes will thank you later! 😎",
        duration: 2000,
      });
    } else {
      document.documentElement.classList.remove("dark");
      toast({
        title: "Light Mode Activated",
        description: "Brightness is on! ☀️",
        duration: 2000,
      });
    }
    
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className={`relative rounded-full w-10 h-10 flex items-center justify-center transition-all duration-500 overflow-hidden ${
        theme === "dark" 
          ? "bg-primary/10 hover:bg-primary/20 text-primary" 
          : "bg-secondary hover:bg-secondary/80"
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ 
              opacity: 0, 
              rotate: theme === "light" ? 45 : -45,
              scale: 0.2
            }}
            animate={{ 
              opacity: 1, 
              rotate: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              rotate: theme === "light" ? -45 : 45,
              scale: 0.2
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Background animation */}
        <motion.div
          key={`${theme}-bg`}
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0 }}
          animate={{ 
            scale: theme === "dark" ? [0, 20, 0] : [0, 20, 0],
            backgroundColor: theme === "dark" ? "#8b5cf6" : "#fbbf24"
          }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </Button>
  );
};

export default ThemeSwitcher;

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

/* ---------------------------------------------
   Animated rotating messages (Software Engineer)
---------------------------------------------- */
function AnimatedTextRotator() {
  const messages = [
    {
      main: "Building Scalable",
      sub: "Software Solutions",
      tagline: "Clean Code • Performance • Reliability"
    },
    {
      main: "Computer Science",
      sub: "Meets Real-World Impact",
      tagline: "Algorithms • Data Structures • Systems"
    },
    {
      main: "Full-Stack Developer",
      sub: "From Idea to Production",
      tagline: "React • Node.js • APIs • Databases"
    },
    {
      main: "Engineering",
      sub: "Elegant Digital Experiences",
      tagline: "UI/UX • Cloud • Security • Optimization"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {messages[currentIndex].main}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient mb-2"
          >
            {messages[currentIndex].sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mt-4"
          >
            {messages[currentIndex].tagline}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------
   Main Loading Screen Component
---------------------------------------------- */
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setMounted(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  /* ---------------------------------------------
     Floating particles
  ---------------------------------------------- */
  const particles = useMemo(() => {
    if (!mounted) return [];
    const colors = [
      'rgba(59, 130, 246, 0.4)',
      'rgba(139, 92, 246, 0.4)',
      'rgba(6, 182, 212, 0.4)',
    ];

    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [dimensions, mounted]);

  /* ---------------------------------------------
     Developer-themed floating icons
  ---------------------------------------------- */
  const devIcons = useMemo(() => {
    if (!mounted) return [];
    return ['💻', '⚙️', '🧠', '🚀', '📦', '🌐'].map((icon, i) => ({
      id: i,
      icon,
      x: Math.random() * dimensions.width,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 3,
    }));
  }, [dimensions, mounted]);

  if (!isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center overflow-hidden pointer-events-none"
      >
        {/* Glowing background orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating particles */}
        {mounted &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{ width: p.size, height: p.size, background: p.color }}
              initial={{ x: p.x, y: dimensions.height + 50, opacity: 0 }}
              animate={{ y: [p.y, p.y - 150], opacity: [0, 1, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}

        {/* Floating dev icons */}
        {mounted &&
          devIcons.map((icon) => (
            <motion.div
              key={icon.id}
              className="absolute text-4xl opacity-20"
              initial={{ x: icon.x, y: dimensions.height + 50 }}
              animate={{ y: -100, rotate: 360, opacity: [0, 0.3, 0] }}
              transition={{ duration: icon.duration, repeat: Infinity, delay: icon.delay }}
            >
              {icon.icon}
            </motion.div>
          ))}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <AnimatedTextRotator />

          {/* Progress bar */}
          <div className="w-72 md:w-96 mt-12">
            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/30">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-xs md:text-sm text-gray-300 text-center mt-3">
              Booting up your software portfolio... 🚀
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

import { motion } from 'motion/react';
import { useEffect } from 'react';

interface SplashScreenProps {
  key?: string;
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Display for 2.5 seconds
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 md:gap-12"
      >
        <img src="/jp-logo.png" alt="Logo" className="h-16 md:h-24 w-auto object-contain opacity-80" />
        
        {/* Loading bar */}
        <div className="w-48 md:w-64 h-[1px] bg-white/20 overflow-hidden">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

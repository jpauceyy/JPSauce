import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function NotFound() {
  const [loading, setLoading] = useState(true);

  // Preloader duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#030303] text-white min-h-screen w-full relative flex flex-col justify-center overflow-hidden selection:bg-white selection:text-black">
      
      {/* 404 PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#090909] z-50 flex flex-col items-center justify-center gap-4"
          >
            {/* Quick warning text sequence */}
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500"
            >
              SYSTEM WARNING
            </motion.span>
            <motion.h2 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase font-light text-neutral-200"
            >
              Oh Foda-se...
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN 404 PAGE CONTENT */}
      <div className="px-6 md:px-12 pt-36 pb-20 max-w-6xl w-full mx-auto flex flex-col justify-between min-h-[90vh]">
        
        {/* Grid wrapper for Left Text and Right Videos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center my-auto w-full">
          
          {/* Left Column: Texts & Heading */}
          <div className="md:col-span-7 space-y-6 md:space-y-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 block leading-relaxed max-w-[420px]">
              Sh#t!! You were so close but you fell on a<br className="hidden sm:inline" /> 404 page instead...
            </span>
            
            <h1 className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[10rem] font-display font-light uppercase tracking-tighter leading-none text-white select-none">
              Foda-se
            </h1>
          </div>

          {/* Right Column: Video Grid */}
          <div className="md:col-span-5 w-full flex justify-start md:justify-end">
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-[380px]">
              {[
                { src: 'https://cristianaaraujo.s3.eu-west-2.amazonaws.com/404/ski-540.mp4', delay: 0.1 },
                { src: 'https://cristianaaraujo.s3.eu-west-2.amazonaws.com/404/ice-skating-540.mp4', delay: 0.2 },
                { src: 'https://cristianaaraujo.s3.eu-west-2.amazonaws.com/404/inline-540.mp4', delay: 0.3 }
              ].map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={!loading ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: video.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[3/4] relative bg-neutral-900 overflow-hidden border border-neutral-900/60 group rounded-sm"
                >
                  <video
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="pt-8 border-t border-neutral-900/60 w-full">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-neutral-400 transition-colors"
          >
            <span>[ RETURN TO BASE ]</span>
          </Link>
        </div>
        
      </div>

    </div>
  );
}

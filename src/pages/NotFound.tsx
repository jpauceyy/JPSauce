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
    <div className="bg-[#030303] text-white min-h-screen w-full relative flex flex-col justify-center overflow-hidden">

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
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN 404 PAGE CONTENT */}
      <div className="section-padding w-full mx-auto flex flex-col justify-between min-h-screen relative">

        {/* Top Section: Text Block */}
        <div className="text-left font-sans text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.2] text-white mt-8">
          <p>Sh#t!! You were so close but you fell on a</p>
          <p>404 page instead...</p>
          <p className="mt-2 text-neutral-300">Foda-se</p>
        </div>

        {/* Center Section: Subtle Centered Dot */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 text-neutral-700 text-3xl hidden md:block">
          •
        </div>

        {/* Bottom Section: Navigation on left, Videos on right */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-16 w-full">

          {/* Bottom Left: Return Link */}
          <div className="pb-2">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-neutral-400 transition-colors"
            >
              <span>[ RETURN TO BASE ]</span>
            </Link>
          </div>

          {/* Bottom Right: Video Cards */}
          <div className="flex flex-row justify-between items-end w-full md:w-[50%]">
            {[
              { src: '/Lan-video.mp4', delay: 0.1 },
              { src: '/airshow.mp4', delay: 0.2 },
              { src: '/lf-benching-brother.mp4', delay: 0.3 }
            ].map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={!loading ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: video.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[9/16] relative bg-neutral-950 overflow-hidden border border-neutral-900 group rounded-sm w-[32%]"
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

    </div>
  );
}

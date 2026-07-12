import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie, ArrowUpRight } from 'lucide-react';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for clean entrance
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 pointer-events-auto"
        >
          <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-sm flex flex-col gap-4 text-white">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                  <Cookie className="w-4 h-4" />
                </div>
                <h4 className="font-display font-medium tracking-tight text-lg">Cookie Preferences</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Close settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-wider leading-relaxed">
              We use cookies to optimize site features, analyze traffic, and personalize your experience. Choose your preferences below.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 mt-2">
              <button
                onClick={handleDecline}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 hover:text-[#194896] transition-colors cursor-pointer"
              >
                Decline
              </button>

              <div className="relative">
                <button
                  onClick={handleAccept}
                  className="group relative inline-flex items-center text-white font-sans font-medium text-xs tracking-tight leading-none pointer-events-auto cursor-pointer"
                  style={{ filter: 'url(#goo-cookie)' }}
                >
                  {/* Pill-shaped Text Container */}
                  <div className="bg-[#194896] border border-black/10 py-2.5 px-5 rounded-full font-semibold relative z-10 transition-colors duration-300">
                    Accept All
                  </div>
                  {/* Overlapping Circle with Arrow */}
                  <div className="w-8 h-8 -ml-2 bg-[#194896] border border-black/10 rounded-full flex items-center justify-center relative z-0 transition-all duration-[600ms] ease-[0.16,1,0.3,1] group-hover:translate-x-3 group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                {/* Gooey SVG Filter */}
                <svg className="hidden" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo-cookie">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                      <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

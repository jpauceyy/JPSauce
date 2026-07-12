import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie } from 'lucide-react';

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
                className="text-neutral-400 hover:text-white transition-colors p-1"
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
            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={handleDecline}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 hover:text-[#194896] transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 bg-white text-black font-semibold hover:bg-[#194896] hover:text-white transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

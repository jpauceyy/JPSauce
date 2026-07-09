import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const mockups = [
  { url: '/iphone-lf.jpg', alt: 'LF Coaching Mobile UI' },
  { url: '/iphone-grandzie.jpg', alt: 'GrandzieFPS Mobile UI' },
  { url: '/ipad-mockup.jpg', alt: 'Online Coaching Tablet Onboarding' }
];

export default function Footer() {
  const [currentMockupIndex, setCurrentMockupIndex] = useState(0);

  // Slideshow interval for mockups
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMockupIndex((prevIndex) => (prevIndex + 1) % mockups.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#030303] text-white w-full border-t border-neutral-900/60 overflow-hidden">
      {/* TOP SECTION (CONTENT) */}
      <div className="px-6 md:px-12 pt-20 pb-16">
        {/* Metadata Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-neutral-900 pb-8 mb-16 gap-4 text-[10px] tracking-[0.3em] font-mono text-neutral-500 uppercase">
          <div className="text-left">WEB DESIGN STUDIO</div>
          <div className="text-left md:text-center">COMMERCIAL VISUAL · AI MOTION</div>
          <div className="text-left md:text-right">EST. 2026 · LONDON</div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Info & Contact) */}
          <div className="md:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase block font-semibold">
                JPSauce Creative Co.
              </span>
              <p className="text-neutral-500 text-xs leading-relaxed max-w-sm font-sans">
                High-End Brand Identity, Graphic Design, and Frontend Web Engineering. 
                Integrating brand identity, interactive experience design, and Gen-AI visual technology, 
                we create internationally competitive digital visual narratives for brands.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <a 
                href="mailto:jspaul2000@proton.me" 
                className="block text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight hover:text-neutral-400 transition-colors duration-300"
              >
                jspaul2000@proton.me
              </a>
              <a
                href="tel:+447958123456" 
                className="block text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight hover:text-neutral-400 transition-colors duration-300"
              >
                +44 7958 123456
              </a>
              <span className="block text-[10px] font-mono tracking-[0.25em] text-neutral-600 uppercase mt-1">
                London, United Kingdom (Remote)
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-neutral-900 max-w-sm font-mono text-[10px] tracking-[0.2em]">
              {['INSTAGRAM', 'THREADS', 'FACEBOOK', 'BLOG'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="hover:text-neutral-400 transition-colors border-b border-transparent hover:border-neutral-400 pb-0.5"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Center Column (Interactive Circular Badge) */}
          <div className="md:col-span-3 flex justify-center items-center py-12 md:py-0 h-full self-center">
            <button
              onClick={handleScrollToTop}
              className="w-24 h-24 rounded-full border border-neutral-800 hover:border-white hover:bg-white hover:text-black transition-all duration-500 font-mono text-[10px] uppercase tracking-[0.35em] flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105"
            >
              EXPLORE
            </button>
          </div>

          {/* Right Column (Rotating Mockups) */}
          <div className="md:col-span-4 flex justify-start md:justify-end items-center">
            <Link 
              to="/work" 
              className="group block relative w-full max-w-[340px] aspect-[16/10] overflow-hidden bg-neutral-950 border border-neutral-900/60 rounded-sm"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentMockupIndex}
                  src={mockups[currentMockupIndex].url} 
                  alt={mockups[currentMockupIndex].alt} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION (GIANT EMBOSSED METALLIC BANNER) */}
      <div className="relative w-full overflow-hidden border-t border-neutral-900/60">
        {/* Floating Copyright info overlay on top-left of the banner */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-10 font-mono text-[10px] tracking-[0.25em] leading-relaxed text-neutral-500 select-none">
          <span className="block font-medium text-white/70">JPSauce Creative Co., Ltd.</span>
          <span>© 2026 JPSAUCE STUDIO. ALL RIGHTS RESERVED.</span>
        </div>

        {/* Banner image */}
        <img 
          src="/jpsauce-metallic-banner.png" 
          alt="JPSauce Banner" 
          className="w-full h-auto min-h-[300px] md:min-h-0 md:h-[45vh] object-cover origin-center select-none"
        />
      </div>
    </footer>
  );
}

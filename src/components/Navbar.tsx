import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[0.16,1,0.3,1] ${isScrolled ? 'pt-4 md:pt-6 px-4' : 'pt-0 px-0'}`}>
      <nav 
        className={`
          flex items-center justify-between pointer-events-auto text-white
          transition-all duration-700 ease-[0.16,1,0.3,1]
          ${isScrolled 
            ? 'w-full md:w-[600px] lg:w-[400px] py-3 px-6 md:px-8 bg-neutral-900/40 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl' 
            : 'w-full py-8 px-6 md:px-12 border border-transparent'
          }
        `}
      >
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`object-contain brightness-0 invert transition-all duration-700 ease-[0.16,1,0.3,1] ${isScrolled ? 'w-8 h-8 md:w-10 md:h-10' : 'w-12 h-12 md:w-16 md:h-16'}`} 
          />
        </Link>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-3 bg-[#111111] hover:bg-[#1a1a1a] transition-colors rounded-full pl-5 pr-2 py-2 ${!isScrolled && 'border border-white/10'}`}
          >
            <span className="font-sans font-medium text-sm tracking-wide text-white uppercase">Menu</span>
            <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-4 p-8 rounded-3xl bg-neutral-100/70 backdrop-blur-3xl text-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/50 flex flex-col gap-5 min-w-[220px]"
              >
                <Link to="/" onClick={() => setMenuOpen(false)} className="text-4xl md:text-5xl font-display font-medium tracking-tight hover:opacity-60 transition-opacity">Home</Link>
                <Link to="/work" onClick={() => setMenuOpen(false)} className="text-4xl md:text-5xl font-display font-medium tracking-tight hover:opacity-60 transition-opacity">Work</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-4xl md:text-5xl font-display font-medium tracking-tight hover:opacity-60 transition-opacity">Contact</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
}

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleScrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-black text-white w-full border-t border-neutral-900">
      {/* TOP SECTION (CONTENT) */}
      <div className="px-6 md:px-12 pt-16 pb-12">
        {/* Metadata Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-neutral-900 pb-8 mb-12 gap-4 text-[10px] tracking-[0.2em] font-mono text-neutral-400 uppercase">
          <div className="text-left">BRAND & WEB DESIGN STUDIO</div>
          <div className="text-left md:text-center">VISUAL SYSTEMS — FRONTEND ENGINEERING</div>
          <div className="text-left md:text-right">EST. 2026 — UNITED KINGDOM</div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column (Info & Contact) */}
          <div className="md:col-span-6 space-y-8">
            <p className="text-neutral-400 text-xs leading-relaxed max-w-md font-sans">
              JPSauce Creative | High-End Brand Identity, Graphic Design, and Frontend Web Engineering. 
              Integrating high-performance layout architecture, clean visual systems, and bespoke digital solutions 
              to create internationally competitive narratives for modern brands.
            </p>

            <div className="space-y-2">
              <a 
                href="mailto:jspaul2000@proton.me" 
                className="block text-2xl md:text-3xl font-display font-medium tracking-tight hover:opacity-80 transition-opacity"
              >
                jspaul2000@proton.me
              </a>
              <span className="block text-2xl md:text-3xl font-display font-medium tracking-tight text-white/90">
                +44 (0) 7958 123456
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1">
                London, United Kingdom (Remote)
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-neutral-900 max-w-sm">
              {['Instagram', 'Linkedin', 'Behance', 'Github'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono text-xs uppercase tracking-widest hover:text-neutral-400 transition-colors border-b border-white/10 hover:border-white pb-0.5"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Center Column (Explore Circle Button) */}
          <div className="md:col-span-3 flex justify-center items-center py-8 md:py-0 h-full self-center">
            <button
              onClick={handleScrollToTop}
              className="w-20 h-20 md:w-24 md:h-24 bg-white text-black hover:bg-neutral-200 transition-all duration-300 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
            >
              EXPLORE
            </button>
          </div>

          {/* Right Column (Featured Work Image) */}
          <div className="md:col-span-3 flex md:justify-end items-center">
            <Link 
              to="/work/lf" 
              className="group block relative w-full max-w-[280px] aspect-[16/10] overflow-hidden bg-neutral-950 border border-neutral-900"
            >
              <img 
                src="/iphone-lf.jpg" 
                alt="Case Study Showcase" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION (GIANT EMBOSSED METALLIC BANNER) */}
      <div className="relative w-full overflow-hidden border-t border-neutral-900">
        {/* Floating Copyright info overlay on top-left of the banner */}
        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-10 font-mono text-[9px] md:text-[10px] tracking-widest leading-relaxed text-neutral-400 select-none">
          <span className="block font-medium text-white/70">JPSauce Creative Co.</span>
          <span>© 2026 JPSAUCE STUDIO. ALL RIGHTS RESERVED.</span>
        </div>

        {/* Banner image */}
        <img 
          src="/jpsauce-metallic-banner.png" 
          alt="JPSauce Banner" 
          className="w-full h-auto min-h-[220px] md:min-h-0 object-cover origin-center"
        />
      </div>
    </footer>
  );
}

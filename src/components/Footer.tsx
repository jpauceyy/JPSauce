import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="pt-32 pb-12 px-6 md:px-12 flex flex-col min-h-[90vh] justify-between">
      <div className="mb-12">
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter">
          Let's build<br/>the next<br/>standard.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 border-t border-neutral-800 pt-12">
        {/* Navigation */}
        <div className="flex flex-col gap-3 font-mono text-sm">
          <span className="text-neutral-500 mb-2 uppercase text-xs tracking-widest">Menu</span>
          <Link to="/" className="hover:text-white transition-colors text-neutral-300 w-fit">Home</Link>
          <Link to="/work" className="hover:text-white transition-colors text-neutral-300 w-fit">Work</Link>
          <Link to="/contact" className="hover:text-white transition-colors text-neutral-300 w-fit">Contact</Link>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-3 font-mono text-sm">
          <span className="text-neutral-500 mb-2 uppercase text-xs tracking-widest">Headquarters</span>
          <span className="text-neutral-300">100 Premium Way</span>
          <span className="text-neutral-300">Design District, LDN</span>
          <span className="text-neutral-500 mt-2">UTC+00:00</span>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3 font-mono text-sm lowercase">
          <span className="text-neutral-500 mb-2 uppercase text-xs tracking-widest">Social</span>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors text-neutral-300 w-fit group">
            instagram <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors text-neutral-300 w-fit group">
            linkedin <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors text-neutral-300 w-fit group">
            behance <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors text-neutral-300 w-fit group">
            github <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3 font-mono text-sm">
          <span className="text-neutral-500 mb-2 uppercase text-xs tracking-widest">Newsletter</span>
          <p className="text-neutral-400 mb-4 text-xs leading-relaxed">Insights on design, tech, and performance.</p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="email address" 
              className="w-full bg-transparent border-b border-neutral-700 py-2 outline-none focus:border-white transition-colors text-sm text-white placeholder:text-neutral-600"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 uppercase text-xs text-neutral-500 group-focus-within:text-white hover:text-white transition-colors">
              Submit
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-24 font-mono text-xs text-neutral-600 uppercase tracking-widest">
        <span>© 2026 AGENCY</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
}

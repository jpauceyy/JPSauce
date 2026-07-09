import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  return (
    <motion.section 
      id="about" 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-24 md:py-32 px-6 md:px-12 bg-white text-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
        {/* Image Column */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[500px] group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-200 relative">
              <img 
                src="/me.png" 
                alt="Me" 
                className="w-full h-full object-cover grayscale absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              />
              <img 
                src="/Gemini_Generated_Image_yae9a4yae9a4yae9.png" 
                alt="Studio session" 
                className="w-full h-full object-cover grayscale absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center max-w-xl mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight font-medium mb-6 leading-[1.1]">
            About me
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
            I’m Joe, a UK-based digital designer and front-end developer fusing visual identity with clean engineering. Having picked up the craft over a decade ago, my journey has evolved from designing for elite esports rosters, sponsors, and creators into building comprehensive digital systems. Today, I bridge the gap between heavy graphic identity and minimalist web development to deliver mature, high-taste digital experiences.
          </p>
          
          <Link to="/contact" className="inline-flex items-center gap-1 text-lg font-medium hover:opacity-70 transition-opacity w-fit">
            Get Started <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

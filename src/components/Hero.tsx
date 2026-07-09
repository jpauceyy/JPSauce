import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track the progress through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the scale to grow from 75% to 100% of the viewport width.
  // Since it's full width by default, scaling from 0.75 to 1.0 does exactly this.
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1.0]);
  
  // Create a parallax effect where the image scales down slightly as the container scales up
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });
  
  const sectionOpacity = useTransform(exitProgress, [0, 0.5, 1], [1, 1, 0.4]);

  return (
    <motion.section ref={containerRef} style={{ opacity: sectionOpacity }} className="relative min-h-[200vh] bg-black">
      
      {/* Title layer - standard scroll, animated on view */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full flex flex-col items-center justify-start z-20 pointer-events-none pt-64 md:pt-72 px-4"
      >
        <h1 className="font-display text-[11vw] md:text-[7vw] lg:text-[6.5vw] font-black leading-[0.85] tracking-tighter text-center">
          High-end design.<br/>aggressive visuals.<br/>next-gen digital.
        </h1>
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-end overflow-hidden pb-12 pt-16">
        
        {/* Hero Image layer - scales up as we scroll */}
        <motion.div 
          style={{ scale }}
          className="w-full aspect-[4/5] md:aspect-[21/9] shadow-2xl overflow-hidden bg-neutral-900 border border-neutral-800 z-10 mt-auto"
        >
          <motion.video 
            style={{ scale: imageScale }}
            src="/videopromo.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-80 md:opacity-90 hover:opacity-100 transition-opacity duration-500 origin-center" 
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

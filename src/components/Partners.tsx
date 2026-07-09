import React, { useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame,
  AnimatePresence
} from 'motion/react';

const logos = [
  "/avng.png", "/grand-logo-1.png", "/ixo-logo.png", "/lf-logo.png", "/obn-logo.png", "/tuki.png", "/interfinancial.png"
];

// Duplicate for continuous seamless loop
const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default function Partners() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const tilt = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    // Determine scroll direction
    const currentVelocity = velocityFactor.get();
    if (currentVelocity < 0) {
      directionFactor.current = -1; // scrolling up -> move right
    } else if (currentVelocity > 0) {
      directionFactor.current = 1; // scrolling down -> move left
    }

    // Base speed + scroll speed
    let moveBy = directionFactor.current * -0.9 * (delta / 1000); 
    moveBy += directionFactor.current * Math.abs(currentVelocity) * (delta / 1000) * 1.25; 

    baseX.set(baseX.get() + moveBy);
  });

  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Smooth out cursor movement slightly
  const cursorXSpring = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const cursorYSpring = useSpring(cursorY, { damping: 40, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"]
  });

  const sectionFilter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(0px)", "blur(12px)"]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ filter: sectionFilter, opacity: sectionOpacity }}
      className="py-24 md:py-32 border-b border-neutral-800 bg-black overflow-hidden relative cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-0 left-0 pointer-events-none z-50 bg-white text-black font-mono text-sm tracking-widest px-4 py-3 uppercase font-medium whitespace-nowrap"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%'
            }}
          >
            TRUSTED BY
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 md:px-12 mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-white max-w-2xl leading-[1.1]">
          Clients I've worked with
        </h2>
      </div>

      <div className="w-full flex overflow-hidden">
        <motion.div
          className="flex w-max py-12"
          style={{ x }}
        >
          {/* Set 1 */}
          <div className="flex gap-8 md:gap-16 pr-8 md:pr-16">
            {repeatedLogos.map((logo, i) => (
              <motion.div 
                key={i}
                style={{ rotate: tilt }} 
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 flex items-center justify-center border border-neutral-800 bg-[#0a0a0a] transition-colors pointer-events-none"
              >
                <img 
                  src={logo} 
                  alt="Client logo" 
                  className="max-w-[60%] max-h-[60%] object-contain"
                />
              </motion.div>
            ))}
          </div>
          {/* Set 2 */}
          <div className="flex gap-8 md:gap-16 pr-8 md:pr-16">
            {repeatedLogos.map((logo, i) => (
              <motion.div 
                key={i}
                style={{ rotate: tilt }} 
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 flex items-center justify-center border border-neutral-800 bg-[#0a0a0a] transition-colors pointer-events-none"
              >
                <img 
                  src={logo} 
                  alt="Client logo" 
                  className="max-w-[60%] max-h-[60%] object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}


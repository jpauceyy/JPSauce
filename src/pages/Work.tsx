import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'ixo',
    numId: '01',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'IXO ESPORTS',
    desc: 'Fusing dynamic tech-focused typography with custom jersey layouts and modular team identity assets.',
    image: '/IXO.jpg',
    hoverVideo: '/ixo-jersey.mp4',
    year: '2023',
  },
  {
    id: 'lf',
    numId: '02',
    tags: ['WEB DESIGN', 'UI/UX'],
    title: 'LF COACHING',
    desc: 'Fusing minimalist user-interface structure with sharp data presentation to maximize high-intent client inquiries and conversions.',
    image: '/LF.jpg',
    hoverVideo: '/fenners-reel.mp4',
    year: '2024',
  },
  {
    id: 'avng',
    numId: '03',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'AVNG',
    desc: 'Deploying a high-energy, glitch-heavy aesthetic across customized promotional campaign materials and team branding.',
    image: '/avng.gif',
    year: '2023',
  },
  {
    id: 'oblivion',
    numId: '04',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'OBLIVION XC',
    desc: 'OblivionXC is a UK eSports organisation refounded in 2023 focusing on CSGO and Call Of Duty and exploring more within eSports',
    image: '/obn-cover.jpg',
    hoverVideo: '/obn-showcase.mp4',
    year: '2023',
  },
  {
    id: 'grandfps',
    numId: '05',
    tags: ['WEB DESIGN', 'UI/UX'],
    title: 'GRANDFPS',
    desc: 'A dynamic, high-visibility visual identity and broadcast overlay package designed for Europe’s premier FPS championship.',
    image: '/grandcover.png',
    hoverVideo: '/grand-vid.mp4',
    year: '2022',
  },
  {
    id: 'tuki',
    numId: '06',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'Tuki eSports',
    desc: 'An immersive championship branding and graphic campaign designed for TUKI UK & Ireland’s premier competitive lineups.',
    image: '/tuki-logo.jpg',
    year: '2024',
  }
];

export default function Work() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const scrollProjects = [...projects, projects[0]];

  const activeIndex = useTransform(scrollYProgress, (pos) => 
    Math.min(Math.round(pos * (scrollProjects.length - 1)), scrollProjects.length - 1)
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.1 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.1 });

  useEffect(() => {
    return activeIndex.on("change", (latest) => setCurrentIdx(latest % projects.length));
  }, [activeIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 64);
      mouseY.set(e.clientY - 64);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-black text-white">
      <div ref={targetRef} className="relative w-full">
        {/* Sticky HUD */}
        <div className="sticky top-0 h-screen w-full pointer-events-none z-10 overflow-hidden">
          
          {/* Fixed Left Text */}
          <div className="absolute left-6 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-12 mix-blend-difference text-white pointer-events-none max-w-[45vw]">
            <span className="font-mono text-[10px] md:text-xs tracking-widest opacity-60">
              {projects[currentIdx]?.numId || '01'}
            </span>
            <AnimatePresence mode="wait">
              <motion.h2 
                key={currentIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight uppercase leading-none"
              >
                {projects[currentIdx]?.title}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Fixed Right Text */}
          <div className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-12 mix-blend-difference text-white font-mono text-[10px] uppercase tracking-widest pointer-events-none">
            <span className="opacity-60 pointer-events-auto cursor-pointer hover:opacity-100 transition-opacity">Full case</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {projects[currentIdx]?.year}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Fixed Bottom Right Text */}
          <div className="absolute right-6 md:right-12 lg:right-24 bottom-12 hidden md:flex items-center gap-6 text-white font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 mix-blend-difference pointer-events-none">
            <span>Scroll to explore</span>
            <div className="w-8 h-[1px] bg-white/50"></div>
          </div>
        </div>

        {/* Vertical Scroll Items */}
        <div className="relative z-20 flex flex-col items-center w-full -mt-[100vh]">
          {scrollProjects.map((project, index) => (
            <div key={`${project.id}-${index}`} className="h-screen w-full flex items-center justify-center">
              <Link to={`/work/${project.id}`}>
                <div 
                  className="w-[65vw] md:w-[35vw] lg:w-[30vw] aspect-[4/3] relative overflow-hidden group cursor-none"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-all [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[100ms] ${
                      (project as any).hoverVideo 
                        ? 'duration-[1200ms] group-hover:scale-[1.08]' 
                        : 'duration-[3000ms] group-hover:scale-[1.12]'
                    }`} 
                  />
                  {(project as any).hoverVideo && (
                    <video 
                      src={(project as any).hoverVideo} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[100ms] group-hover:scale-[1.08]" 
                    />
                  )}
                  {/* Subtle dark overlay to ensure text is legible if mix-blend fails slightly on certain colors */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor hidden md:flex"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: 0.2 }
        }}
      >
        <div className="custom-cursor-text">
          VIEW PROJECT
        </div>
      </motion.div>
    </div>
  );
}

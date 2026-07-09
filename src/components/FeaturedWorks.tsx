import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Square } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'ixo',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'IXO ESPORTS REVAMP',
    desc: 'Fusing dynamic tech-focused typography with custom jersey layouts and modular team identity assets.',
    image: '/IXO.webp',
    hoverVideo: '/ixo-jersey.mp4',
    tagStyle: 'bg-gradient-to-b from-neutral-800/90 to-neutral-950/90 text-white backdrop-blur-md border border-white/10'
  },
  {
    id: 'lf',
    tags: ['WEB DESIGN', 'UI/UX'],
    title: 'LF COACHING',
    desc: 'Fusing minimalist user-interface structure with sharp data presentation to maximize high-intent client inquiries and conversions.',
    image: '/LF.webp',
    hoverVideo: '/fenners-reel.mp4',
    tagStyle: 'bg-white/20 text-white backdrop-blur-md border border-white/20'
  },
  {
    id: 'avng',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'AVNG',
    desc: 'Deploying a high-energy, glitch-heavy aesthetic across customized promotional campaign materials and team branding.',
    image: '/avng.gif',
    tagStyle: 'bg-white/20 text-white backdrop-blur-md border border-white/20'
  },
  {
    id: 'oblivion',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'OBN',
    desc: 'OblivionXC is a UK eSports organisation refounded in 2023 focusing on CSGO and Call Of Duty and exploring more within eSports',
    image: '/obn-logo.webp',
    hoverVideo: '/obn-showcase.mp4',
    tagStyle: 'bg-black/70 text-white backdrop-blur-sm border border-white/10'
  },
  {
    id: 'grandfps',
    tags: ['WEB DESIGN', 'UI/UX'],
    title: 'GRANDFPS',
    desc: 'A dynamic, high-visibility visual identity and broadcast overlay package designed for Europe’s premier FPS championship.',
    image: '/grandcover.webp',
    hoverVideo: '/grand-vid.mp4',
    tagStyle: 'bg-black/70 text-white backdrop-blur-sm border border-white/10'
  }
];

export default function FeaturedWorks() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.1 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.1 });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 64);
      mouseY.set(e.clientY - 64);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.section 
        id="work" 
        ref={sectionRef}
        style={{ opacity: sectionOpacity }}
      className="section-padding border-b border-neutral-800 bg-black"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-white">
          Selected<br />projects
        </h2>
        <a href="#" className="link-underlined self-start md:self-auto mb-2 md:mb-4">
          View all works
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id} 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={`flex flex-col group ${
              i === 0 ? 'md:col-span-7' : 
              i === 1 ? 'md:col-span-5' : 
              i === 2 ? 'md:col-span-12' :
              i === 3 ? 'md:col-span-5' :
              'md:col-span-7'
            }`}
          >
            <Link to={`/work/${project.id}`} className="flex flex-col w-full h-full">
              {/* Image Container */}
              <div 
                className={`relative w-full mb-8 overflow-hidden bg-neutral-900 cursor-none ${
                  i === 0 ? 'aspect-[4/5] md:aspect-[4/3]' : 
                  i === 1 ? 'aspect-[4/5] md:aspect-square' : 
                  i === 2 ? 'aspect-video md:aspect-[21/9]' :
                  i === 3 ? 'aspect-[4/5] md:aspect-square' :
                  'aspect-[4/5] md:aspect-[4/3]'
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Base Image Rendering */}
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-all [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[100ms] ${
                    (project as any).hoverVideo 
                      ? 'duration-[1200ms] group-hover:scale-[1.08]' 
                      : 'duration-[3000ms] group-hover:scale-[1.12]'
                  } opacity-100`} 
                />
                
                {(project as any).hoverVideo && (
                  <motion.video 
                    src={(project as any).hoverVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[100ms] group-hover:scale-[1.08] ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />
                )}
                
                {/* Tags Overlay */}
                <div className={`absolute bottom-6 left-6 right-6 flex flex-wrap gap-1 z-10 ${i === 2 || i === 4 ? 'md:justify-end' : ''}`}>
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag-badge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col px-2">
                <div className="flex items-center gap-3 mb-4 text-white">
                  <Square className="w-4 h-4 opacity-70" />
                  <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest leading-loose max-w-sm">
                  {project.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      </motion.section>

      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor hidden md:flex"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: hoveredProject ? 1 : 0,
          scale: hoveredProject ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: 0.2 }
        }}
      >
        <div className="custom-cursor-text">
          VIEW PROJECT
        </div>
      </motion.div>
    </>
  );
}


import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'ixo',
    index: '01',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'IXO ESPORTS REVAMP',
    desc: 'Fusing dynamic tech-focused typography with custom jersey layouts and modular team identity assets.',
    image: '/IXO.webp',
    hoverVideo: '/ixo-jersey.mp4',
  },
  {
    id: 'lf',
    index: '02',
    tags: ['WEB DESIGN', 'UI/UX'],
    title: 'LF COACHING',
    desc: 'Fusing minimalist user-interface structure with sharp data presentation to maximize high-intent client inquiries and conversions.',
    image: '/LF.webp',
    hoverVideo: '/fenners-reel.mp4',
  },
  {
    id: 'avng',
    index: '03',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'AVNG',
    desc: 'Deploying a high-energy, glitch-heavy aesthetic across customized promotional campaign materials and team branding.',
    image: '/avng.gif',
  },
  {
    id: 'oblivion',
    index: '04',
    tags: ['BRANDING', 'GRAPHIC DESIGN'],
    title: 'OBN',
    desc: 'OblivionXC is a UK eSports organisation refounded in 2023 focusing on CSGO and Call Of Duty and exploring more within eSports.',
    image: '/obn-logo.webp',
    hoverVideo: '/obn-showcase.mp4',
  },
  {
    id: 'grandfps',
    index: '05',
    tags: ['WEB DESIGN', 'UI/UX'],
    title: 'GRANDFPS',
    desc: "A dynamic, high-visibility visual identity and broadcast overlay package designed for Europe's premier FPS championship.",
    image: '/grandcover.webp',
    hoverVideo: '/grand-vid.mp4',
  }
];

const colClasses = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-12',
  'md:col-span-5',
  'md:col-span-7',
];
const aspects = [
  'aspect-square md:aspect-[4/3]',
  'aspect-square md:aspect-square',
  'aspect-square md:aspect-[21/9]',
  'aspect-square md:aspect-square',
  'aspect-square md:aspect-[4/3]',
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
    offset: ['end end', 'end start']
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 64);
      mouseY.set(e.clientY - 64);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.section
        id="work"
        ref={sectionRef}
        style={{ opacity: sectionOpacity }}
        className="section-padding border-b border-neutral-800 bg-black"
      >
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-3 block">
              Selected works — {projects.length.toString().padStart(2, '0')}
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white font-display">
              Selected<br />projects
            </h2>
          </div>

          <a
            href="/work"
            className="group self-start md:self-auto flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-widest pb-1 border-b border-white transition-colors duration-300 mb-2 md:mb-4 hover:text-[#194896] hover:border-[#194896]"
          >
            View all works
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* ── Project Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-20 md:gap-x-8 lg:gap-x-14">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col group ${colClasses[i]}`}
            >
              <Link to={`/work/${project.id}`} className="flex flex-col w-full h-full">

                {/* ── Image ── */}
                <div
                  className={`relative w-full mb-6 overflow-hidden bg-neutral-900 cursor-none ${aspects[i]}`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Base image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-all [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[80ms] ${
                      project.hoverVideo
                        ? 'duration-[1200ms] group-hover:scale-[1.07]'
                        : 'duration-[3000ms] group-hover:scale-[1.1]'
                    } opacity-100`}
                  />

                  {/* Hover video */}
                  {project.hoverVideo && (
                    <video
                      src={project.hoverVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[80ms] group-hover:scale-[1.07] ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {/* Subtle dark vignette on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 z-10" />

                  {/* Tags */}
                  <div className={`absolute bottom-5 left-5 flex flex-wrap gap-1.5 z-20 ${i === 2 || i === 4 ? 'md:justify-end md:right-5 md:left-auto' : ''}`}>
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Card Meta ── */}
                <div className="flex items-start justify-between gap-4 px-1">
                  <div className="flex-1">
                    {/* Index + Title row */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-mono text-[10px] text-neutral-600 tracking-widest shrink-0">
                        {project.index}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <p className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider leading-relaxed max-w-sm">
                      {project.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 mt-0.5 w-8 h-8 border border-neutral-800 flex items-center justify-center transition-all duration-300 group-hover:border-[#194896] group-hover:bg-[#194896]/10">
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 transition-colors duration-300 group-hover:text-[#194896]" />
                  </div>
                </div>

                {/* Thin divider */}
                <div className="mt-6 h-px bg-neutral-900 group-hover:bg-neutral-700 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Custom cursor */}
      <motion.div
        className="custom-cursor hidden md:flex"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          opacity: hoveredProject ? 1 : 0,
          scale: hoveredProject ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <div className="custom-cursor-text">
          VIEW PROJECT
        </div>
      </motion.div>
    </>
  );
}

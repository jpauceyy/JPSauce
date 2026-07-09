import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import React, { useRef } from 'react';

const services = [
  {
    id: '(01)',
    title: 'UI/UX Designer',
    desc: 'Engineering clean, minimalist digital products. Balancing bold, dark-mode brutalism with highly functional layout structures to build web experiences that feel premium and effortless to navigate.',
    image: '/ux-design.jpg'
  },
  {
    id: '(02)',
    title: 'Graphics',
    desc: 'Raw visual communication. Creating everything from heavyweight apparel typography and monospaced layout systems to high-contrast commercial brand elements.',
    image: '/IXO.jpg'
  },
  {
    id: '(03)',
    title: 'eSport team revamps',
    desc: 'Total visual overhauls for competitive organizations. High-energy branding, kinetic social graphics, and digital assets built to dominate timelines and elevate team identities.',
    image: '/esports.jpeg'
  }
];

const ServiceCard: React.FC<{ service: any, index: number, total: number, scrollYProgress: MotionValue<number> }> = ({ service, index, total, scrollYProgress }) => {
  // When scrollYProgress is:
  // (index - 1) / total -> this card is just starting to slide up into view from the bottom
  // (index) / total -> this card is fully at the top
  // (index + 1) / total -> this card is fully covered by the next card
  
  const fullyInView = index / total;
  const fullyCovered = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, (v: number) => {
    const p1 = fullyInView + 0.5 / total;
    const p2 = fullyCovered;
    
    if (v <= fullyInView) return 1;
    if (v > fullyInView && v < p1) {
      const p = (v - fullyInView) / (p1 - fullyInView);
      return 1 - p * 0.2; // 1 to 0.8
    }
    if (v >= p1 && v < p2) {
      const p = (v - p1) / (p2 - p1);
      return 0.8 - p * 0.5; // 0.8 to 0.3
    }
    return 0.3;
  });

  return (
    <div className="sticky top-0 w-full h-screen bg-black overflow-hidden">
      <motion.div 
        style={{ opacity }} 
        className="flex flex-col md:flex-row w-full h-full items-center border-t border-neutral-900"
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 flex flex-col justify-center h-full pt-32 md:pt-24 pb-12">
          <h2 className="font-display text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-black tracking-tighter mb-12 leading-[0.9] text-white">
            {service.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12">
            <span className="font-display font-bold text-lg text-white whitespace-nowrap">{service.id}</span>
            <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed max-w-sm">
              {service.desc}
            </p>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 flex items-center justify-center md:justify-end h-full py-12 md:py-24">
          <div className="relative w-full max-w-md lg:max-w-xl aspect-square overflow-hidden bg-neutral-900">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[600ms] ease-out hover:scale-105" 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Capabilities() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <section ref={containerRef} id="services" className="relative w-full bg-black">
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} total={services.length} scrollYProgress={scrollYProgress} />
      ))}
    </section>
  );
}

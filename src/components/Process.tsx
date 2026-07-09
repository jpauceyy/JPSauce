import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const processes = [
  {
    id: '01 / IDEATE',
    title: 'Strategy & alignment',
    desc: 'We start by tearing down assumptions. Finding the conceptual angle and aligning on a strategic narrative that separates you from the noise.'
  },
  {
    id: '02 / CREATE',
    title: 'Production & design',
    desc: 'Rapid development cycles and uncompromising asset creation. We design, build, and iterate with precise technical execution.'
  },
  {
    id: '03 / DELIVER',
    title: 'Launch & optimise',
    desc: 'Deployment is just the baseline. We execute the launch, optimize for absolute performance, and ensure the final output is flawless.'
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  return (
    <motion.section 
      id="process" 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className=""
    >
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-neutral-800">
        {processes.map((proc, i) => (
          <div key={proc.id} className={`px-6 py-12 md:p-12 ${i !== processes.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''} border-neutral-800 hover:bg-neutral-900/30 transition-colors`}>
            <span className="font-mono text-xs font-bold text-neutral-300 mb-8 block uppercase tracking-widest">{proc.id}</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
              {proc.title}
            </h3>
            <p className="font-mono text-sm text-neutral-400 leading-relaxed">
              {proc.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

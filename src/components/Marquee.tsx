import { motion } from 'motion/react';

export default function Marquee() {
  const words = ["VISUAL IDENTITY", "WEB DEVELOPMENT", "MOTION GRAPHICS", "CREATIVE DIRECTION"];
  // Duplicate for continuous seamless loop
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full overflow-hidden border-t border-neutral-800 py-4 md:py-6 flex bg-black">
      <motion.div
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {repeatedWords.map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display font-bold text-2xl md:text-5xl tracking-tighter uppercase px-8 text-neutral-300">
              {word}
            </span>
            <span className="text-neutral-700 text-xl md:text-3xl">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

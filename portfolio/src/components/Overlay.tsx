'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Opacity transforms for each section
  const section1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const section1Y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]);
  const section2X = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [-100, 0, -100]);

  const section3Opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0, 1, 0]);
  const section3X = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [100, 0, 100]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
        
        {/* Section 1: 0% */}
        <motion.div
          style={{ opacity: section1Opacity, y: section1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-lg mb-4">
            Rohit Revankar.
          </h1>
          <p className="text-xl md:text-3xl text-zinc-300 font-light tracking-wide">
            Full Stack Developer.
          </p>
        </motion.div>

        {/* Section 2: 30% */}
        <motion.div
          style={{ opacity: section2Opacity, x: section2X }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left max-w-7xl mx-auto px-8 w-full"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-white leading-tight">
            I build <span className="text-indigo-400">digital</span> <br /> experiences.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-zinc-400 font-light line-clamp-3">
            Crafting high-performance websites with fluid animations and bleeding-edge web technologies.
          </p>
        </motion.div>

        {/* Section 3: 60% */}
        <motion.div
          style={{ opacity: section3Opacity, x: section3X }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right max-w-7xl mx-auto px-8 w-full"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-white leading-tight">
            Bridging <span className="text-emerald-400">design</span> <br /> & engineering.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-zinc-400 font-light">
            Pixel-perfect execution from Figma to HTML5 Canvas, driven by intuition and data.
          </p>
        </motion.div>
        
      </div>
    </div>
  );
}

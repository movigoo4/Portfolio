'use client';

import { motion } from 'framer-motion';

export default function NanoBanana() {
  return (
    <motion.div
      initial={{ rotate: -10, y: 0 }}
      animate={{ 
        rotate: [10, -10, 10], 
        y: [0, -10, 0] 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 2, 
        ease: 'easeInOut' 
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)]"
    >
      <span className="text-xl">🍌</span>
      <span className="text-xs font-mono font-bold tracking-widest text-yellow-400/90 uppercase">
        Nano Banana
      </span>
    </motion.div>
  );
}

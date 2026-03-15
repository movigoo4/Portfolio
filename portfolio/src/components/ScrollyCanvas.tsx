'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

const FRAME_COUNT = 120;
const getFramePath = (index: number) =>
  `/frames/frame_${String(index).padStart(3, '0')}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Load first frame immediately for instant visual
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      setImages([...loadedImages]);
      setLoadProgress(1);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
          setImages([...loadedImages]);
        }
      };
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = useCallback((index: number) => {
    // Fallback to closest available frame if current index isn't loaded yet
    const targetImg = images[index] || images[0];
    if (!targetImg || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution to match window inner sizes to maintain aspect ratio 
    // and crispness on high DPI screens. Cap at 2.0 for performance.
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    const drawWidth = window.innerWidth * dpr;
    const drawHeight = window.innerHeight * dpr;
    
    if (canvas.width !== drawWidth || canvas.height !== drawHeight) {
      canvas.width = drawWidth;
      canvas.height = drawHeight;
    }

    // Object-fit: cover equivalent logic
    const img = targetImg;
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawW = canvas.width;
    let drawH = canvas.height;
    let x = 0;
    let y = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas, crop horizontally
      const scale = canvas.height / img.height;
      drawW = img.width * scale;
      drawH = canvas.height;
      
      // On mobile (narrow screens), we might want to shift the focus 
      // instead of strictly centering. Standard centering is (canvas.width - drawW) / 2
      const isMobile = window.innerWidth < 768;
      const horizontalOffset = isMobile ? 0.5 : 0.5; // Change 0.5 to 0.7 or 0.3 to shift focus
      
      x = (canvas.width - drawW) * horizontalOffset;
      y = 0;
    } else {
      // Image is taller than canvas, crop vertically
      const scale = canvas.width / img.width;
      drawW = canvas.width;
      drawH = img.height * scale;
      y = (canvas.height - drawH) * 0.5;
      x = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Use the simpler drawImage version as we've pre-calculated drawW/drawH to cover the canvas
    ctx.drawImage(targetImg, x, y, drawW, drawH);
  }, [images]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    renderFrame(Math.floor(latest));
  });

  // Render initial frame on mount if loaded, also handle resize
  useEffect(() => {
    renderFrame(0);
    
    const handleResize = () => renderFrame(Math.floor(frameIndex.get()));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame, frameIndex, images]);

  return (
     <div ref={containerRef} className="relative h-[500vh] w-full bg-slate-950">
       <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
         <canvas
           ref={canvasRef}
           className="absolute inset-0 h-full w-full"
           style={{ width: '100%', height: '100%' }}
         />
         {!imagesLoaded && (
           <div className="absolute top-6 right-6 z-50">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-indigo-200 uppercase">
                  Buffering {loadProgress}%
                </span>
              </div>
           </div>
         )}
       </div>
     </div>
  );
}

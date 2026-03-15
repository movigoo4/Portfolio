'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 120;
const getFramePath = (index: number) =>
  `/frames/frame_${String(index).padStart(3, '0')}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = (index: number) => {
    if (!images[index] || !canvasRef.current || !imagesLoaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution to match window inner sizes to maintain aspect ratio 
    // and crispness on high DPI screens
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const drawWidth = window.innerWidth * dpr;
    const drawHeight = window.innerHeight * dpr;
    
    if (canvas.width !== drawWidth || canvas.height !== drawHeight) {
      canvas.width = drawWidth;
      canvas.height = drawHeight;
    }

    // Object-fit: cover equivalent logic
    const img = images[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawW = canvas.width;
    let drawH = canvas.height;
    let x = 0;
    let y = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas, crop horizontally
      drawW = img.height * canvasRatio;
      x = (img.width - drawW) / 2;
      drawH = img.height;
    } else {
      // Image is taller than canvas, crop vertically
      drawH = img.width / canvasRatio;
      y = (img.height - drawH) / 2;
      drawW = img.width;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, drawW, drawH, 0, 0, canvas.width, canvas.height);
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (imagesLoaded) {
      renderFrame(Math.floor(latest));
    }
  });

  // Render initial frame on mount if loaded, also handle resize
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
      
      const handleResize = () => renderFrame(Math.floor(frameIndex.get()));
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-slate-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ width: '100%', height: '100%' }}
        />
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
              <p className="font-mono text-sm tracking-widest text-indigo-400 uppercase">
                Loading Experience
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

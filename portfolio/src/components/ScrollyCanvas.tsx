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

    // Use the canvas's own rendered size (clientWidth/clientHeight) instead of
    // window.innerWidth/innerHeight — this avoids the black bar on mobile caused
    // by the browser address bar shrinking the viewport after load.
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    const drawWidth = canvas.clientWidth * dpr;
    const drawHeight = canvas.clientHeight * dpr;

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
    ctx.drawImage(targetImg, x, y, drawW, drawH, 0, 0, canvas.width, canvas.height);
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
    <div ref={containerRef} className="relative w-full bg-slate-950" style={{ height: '500vh' }}>
      {/* Use inline style for height so dvh unit works reliably on mobile without Tailwind conflicts */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100dvh' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
          style={{ width: '100%', height: '100%', display: 'block' }}
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

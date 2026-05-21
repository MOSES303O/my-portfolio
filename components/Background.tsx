'use client';

import { useEffect, useRef } from 'react';

const initialPositions = [
  { x: -4, y: 0 },
  { x: -4, y: 0 },
  { x: 20, y: -8 },
  { x: 20, y: -8 },
];
const AnimatedBackground = () => {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let currentScroll = 0;
    let requestId: number;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      const scrollDelta = newScroll - currentScroll;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        const initialPos = initialPositions[index];

        const xOffset =
          Math.sin(newScroll / 100 + index * 0.5) * 340 +
          scrollDelta * 0.2;
        const yOffset =
          Math.cos(newScroll / 100 + index * 0.5) * 40 +
          scrollDelta * 0.08;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        blob.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    requestId = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestId);
    };
  },[]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute inset-0">
        <div
          ref={(el) => { blobRefs.current[0] = el; }}
          className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
        />
        <div
          ref={(el) => { blobRefs.current[1] = el; }}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"
        />
        <div
          ref={(el) => { blobRefs.current[2] = el; }}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
        />
        <div
          ref={(el) => { blobRefs.current[3] = el; }}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-size-[24px_24px]" />
    </div>
  );
};
export default AnimatedBackground;
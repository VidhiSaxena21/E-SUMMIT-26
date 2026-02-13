import Spline from '@splinetool/react-spline';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !splineContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Main parallax scroll animation
      gsap.to(splineContainerRef.current, {
        y: 200, // Move down as user scrolls
        scale: 1.1, // Slight zoom effect
        rotateX: 5, // Subtle 3D tilt
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5, // Smooth scrubbing with inertia
          invalidateOnRefresh: true,
        },
      });

      // Additional subtle rotation based on scroll
      gsap.to(splineContainerRef.current, {
        rotateY: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 bg-background"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={splineContainerRef}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

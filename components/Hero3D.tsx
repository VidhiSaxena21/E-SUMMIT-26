"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SplineScene = dynamic(() => import("@/components/SplineSceneClient"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950" />,
});

const HeroPlaceholder = () => (
  <div className="w-full h-full bg-slate-950" aria-hidden />
);

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handle = () => setIsMobile(mql.matches);
    handle();
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  return isMobile;
}

/** Static hero for mobile: hero3d image instead of Spline to avoid lag */
function Hero3DStatic() {
  return (
    <div className="absolute inset-0 -z-10 bg-slate-950">
      <div className="w-full h-full origin-center">
        <img 
          src="/attached_assets/hero3d.png" 
          alt="E-Summit 2026 Hero"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

/** Desktop hero: Spline + scroll-linked parallax */
function Hero3DInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadSpline, setLoadSpline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const onIdle = () => {
      if (!cancelled) setLoadSpline(true);
    };
    const id =
      typeof window !== "undefined" && window.requestIdleCallback
        ? window.requestIdleCallback(onIdle, { timeout: 600 })
        : setTimeout(onIdle, 300);
    return () => {
      cancelled = true;
      if (typeof id === "number" && window.cancelIdleCallback)
        window.cancelIdleCallback(id);
      else clearTimeout(id as ReturnType<typeof setTimeout>);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const motionStyle = useMemo(() => ({ scale, y }), [scale, y]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 bg-slate-950">
      <motion.div style={motionStyle} className="w-full h-full origin-center">
        {loadSpline ? (
          <Suspense fallback={<HeroPlaceholder />}>
            <SplineScene />
          </Suspense>
        ) : (
          <HeroPlaceholder />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export function Hero3D() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Hero3DStatic />;
  }

  return <Hero3DInteractive />;
}

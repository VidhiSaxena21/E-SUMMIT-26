"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EventHero } from "./EventHero";
import type { MotionValue } from "framer-motion";

interface HorizontalScrollerProps {
    eventCount: number;
    children: (scrollYProgress: MotionValue<number>) => React.ReactNode;
}

export function HorizontalScroller({ children, eventCount }: HorizontalScrollerProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    // Memoize the horizontal range calculation
    const horizontalRange = useMemo(() => [0.1, 1], []);
    const horizontalTransform = useMemo(() => `-${(eventCount - 1) * 100}%`, [eventCount]);
    
    // Scroll target is the tall container so progress 0→1 matches hero + horizontal section
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Calculate horizontal translation with optimized range
    const x = useTransform(scrollYProgress, horizontalRange, ["0%", horizontalTransform]);

    // Hero transition: move up and fade
    const heroY = useTransform(scrollYProgress, [0, 0.08], ["0%", "-100%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    return (
        <div className="bg-slate-950">
            <div ref={targetRef} className="relative h-[1400vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Hero Section - Layered on top */}
                    <motion.div
                        style={{ 
                            y: heroY, 
                            opacity: heroOpacity,
                            willChange: "transform, opacity"
                        }}
                        className="absolute inset-0 z-20 pointer-events-none"
                    >
                        <EventHero scrollProgress={scrollYProgress} />
                    </motion.div>

                    {/* Horizontal Track container - Behind the hero */}
                    <motion.div
                        style={{ 
                            x,
                            willChange: "transform"
                        }}
                        className="absolute inset-0 flex h-screen z-10"
                    >
                        {children(scrollYProgress)}
                    </motion.div>
                </div>
            </div>

          
        </div>
    );
}

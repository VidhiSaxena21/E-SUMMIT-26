"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EventHero } from "./EventHero";
import type { MotionValue } from "framer-motion";

interface HorizontalScrollerProps {
    eventCount: number;
    children: (scrollYProgress: MotionValue<number>) => React.ReactNode;
}

export function HorizontalScroller({ children, eventCount }: HorizontalScrollerProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    // Scroll target is the tall container so progress 0→1 matches hero + horizontal section
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Calculate horizontal translation
    const x = useTransform(scrollYProgress, [0.1, 1], ["0%", `-${(eventCount - 1) * 100}%`]);

    // Hero transition: move up and fade
    const heroY = useTransform(scrollYProgress, [0, 0.08], ["0%", "-100%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    return (
        <div className="bg-slate-950">
            <div ref={targetRef} className="relative h-[1400vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Hero Section - Layered on top */}
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="absolute inset-0 z-20 pointer-events-none"
                    >
                        <EventHero scrollProgress={scrollYProgress} />
                    </motion.div>

                    {/* Horizontal Track container - Behind the hero */}
                    <motion.div
                        style={{ x }}
                        className="absolute inset-0 flex h-screen z-10"
                    >
                        {children(scrollYProgress)}
                    </motion.div>
                </div>
            </div>

          
        </div>
    );
}

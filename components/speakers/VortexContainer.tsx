"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";

interface VortexContainerProps {
    children: ReactNode;
    itemCount: number;
}

export function VortexContainer({ children, itemCount }: VortexContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // This determines how long the user has to scroll. 
    // Higher value = slower zoom / more depth.
    const scrollHeight = 200 + itemCount * 300;

    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    // Warp intensity: Subtle scale and blur of the overall scene during scroll
    const warpScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1.05, 1.05, 1]);

    return (
        <div ref={containerRef} className="relative bg-slate-950" style={{ height: `${scrollHeight}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* 3D Global Perspective Engine */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ perspective: '1200px' }}
                >
                    <motion.div
                        style={{
                            transformStyle: 'preserve-3d',
                            scale: warpScale
                        }}
                        className="relative w-full h-full"
                    >
                        {children}
                    </motion.div>
                </div>

                {/* Atmospheric Depth Blur Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-40" />
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(2,6,23,1)]" />

                {/* Navigation and Title Layer */}
                <div className="absolute top-12 left-0 right-0 z-20 px-8 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-fuchsia-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-1">E-SUMMIT 2026</span>
                        <h2 className="text-white font-display font-medium text-xl tracking-tighter uppercase italic">Visionary Vortex</h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-0.5 w-12 bg-white/20 mt-3" />
                        <span className="text-white/40 font-mono text-[10px] mt-2">SCROLL TO ASCEND</span>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
                    <div className="h-64 w-px bg-white/5 relative">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                            className="absolute inset-0 w-px bg-fuchsia-500"
                        />
                    </div>
                    <motion.span
                        className="text-fuchsia-500 font-mono text-[10px] rotate-90"
                    >
                        {useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)}
                    </motion.span>
                </div>
            </div>
        </div>
    );
}

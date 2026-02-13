"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface GateProps {
    scrollProgress: MotionValue<number>;
    range: [number, number];
}

export function GateVertical({ scrollProgress, range }: GateProps) {
    const leftX = useTransform(scrollProgress, range, ["0%", "-100%"]);
    const rightX = useTransform(scrollProgress, range, ["0%", "100%"]);

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div
                style={{ x: leftX }}
                className="absolute top-0 left-0 h-full w-1/2 bg-slate-950 border-r border-fuchsia-500 shadow-[5px_0_20px_rgba(217,70,239,0.5)]"
            />
            <motion.div
                style={{ x: rightX }}
                className="absolute top-0 right-0 h-full w-1/2 bg-slate-950 border-l border-cyan-400 shadow-[-5px_0_20px_rgba(34,211,238,0.5)]"
            />
        </div>
    );
}

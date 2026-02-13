"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface GateProps {
    scrollProgress: MotionValue<number>;
    range: [number, number];
}

export function GateHorizontal({ scrollProgress, range }: GateProps) {
    const topY = useTransform(scrollProgress, range, ["0%", "-100%"]);
    const bottomY = useTransform(scrollProgress, range, ["0%", "100%"]);

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div
                style={{ y: topY }}
                className="absolute top-0 left-0 w-full h-1/2 bg-slate-950 border-b border-fuchsia-500 shadow-[0_5px_20px_rgba(217,70,239,0.5)]"
            />
            <motion.div
                style={{ y: bottomY }}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-950 border-t border-fuchsia-500 shadow-[0_-5px_20px_rgba(217,70,239,0.5)]"
            />
        </div>
    );
}

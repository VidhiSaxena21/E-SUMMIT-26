"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface EventHeroProps {
    scrollProgress: MotionValue<number>;
}

export function EventHero({ scrollProgress }: EventHeroProps) {
    // Title moves up, scales down, and fades out
    const titleOpacity = useTransform(scrollProgress, [0, 0.08], [1, 0]);
    const titleScale = useTransform(scrollProgress, [0, 0.08], [1, 0.9]);
    const titleY = useTransform(scrollProgress, [0, 0.08], [0, -150]);

    const subtitleOpacity = useTransform(scrollProgress, [0, 0.04], [1, 0]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center sticky top-0 bg-slate-950 overflow-hidden">
            <motion.div
                style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
                className="text-center"
            >
                <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-white leading-none">
                    EVENTS
                </h1>
                <motion.p
                    style={{ opacity: subtitleOpacity }}
                    className="text-purple-400 text-xl md:text-2xl mt-8 font-mono tracking-widest uppercase"
                >
                    Scroll to Explore
                </motion.p>
            </motion.div>

            {/* Background glow Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        </div>
    );
}

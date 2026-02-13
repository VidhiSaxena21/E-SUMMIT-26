"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SpeakerHero } from "./SpeakerHero";

interface SpeakerHorizontalScrollerProps {
    children: ReactNode;
    speakerCount: number;
}

export function SpeakerHorizontalScroller({ children, speakerCount }: SpeakerHorizontalScrollerProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal translation for speaker cards
    const x = useTransform(scrollYProgress, [0.1, 1], ["0%", `-${(speakerCount - 1) * 100}%`]);

    // Hero transition: smooth exit
    const heroY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const heroBlur = useTransform(scrollYProgress, [0, 0.1], ["blur(0px)", "blur(20px)"]);

    return (
        <div className="bg-slate-950">
            <div ref={targetRef} className="relative h-[800vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Hero Section */}
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }}
                        className="absolute inset-0 z-20 pointer-events-none"
                    >
                        <SpeakerHero scrollProgress={scrollYProgress} />
                    </motion.div>

                    {/* Horizontal Track container */}
                    <motion.div
                        style={{ x }}
                        className="absolute inset-0 flex h-screen z-10"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-30 bg-slate-950 pt-32 pb-20 border-t border-white/5">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter opacity-20">
                        E-SUMMIT 2026
                    </h2>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
                        <a href="#" className="hover:text-fuchsia-500 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-fuchsia-500 transition-colors">Linkedin</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

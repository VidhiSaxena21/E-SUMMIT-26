"use client";

import { useRef, useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

const SPEAKERS_TEXT = "Speakers";
const LETTER_IMAGES = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
];

interface SpeakerHeroProps {
    scrollProgress: MotionValue<number>;
}

export function SpeakerHero({ scrollProgress }: SpeakerHeroProps) {
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const letters = lettersRef.current.filter(Boolean);
        if (letters.length === 0) return;
        gsap.fromTo(letters,
            { y: 120, opacity: 0, rotateX: -90, transformOrigin: "bottom center" },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power3.out", stagger: 0.08, delay: 0.3 }
        );
    }, []);

    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute inset-y-0 left-1/4 w-px bg-purple-500/10 blur-[2px]" />
            <div className="absolute inset-y-0 right-1/4 w-px bg-fuchsia-500/10 blur-[2px]" />

            <div className="relative z-10 w-full px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-8"
                >
                    <span className="text-fuchsia-400 font-mono text-xs tracking-[0.5em] uppercase">E-Summit 2026 Exclusive</span>
                </motion.div>

                <h1
                    className="font-display font-black tracking-tighter uppercase select-none whitespace-nowrap w-full text-center relative"
                    style={{
                        lineHeight: 0.9,
                        fontSize: "min(calc((100vw - 4rem) / 6.5), 18rem)",
                        color: "white"
                    }}
                >
                    {SPEAKERS_TEXT.split("").map((letter, index) => {
                        const isHovered = hoveredIndex === index;
                        const imageUrl = LETTER_IMAGES[index % LETTER_IMAGES.length];

                        return (
                            <span
                                key={index}
                                ref={(el) => { lettersRef.current[index] = el; }}
                                className="inline-block relative cursor-pointer mx-[0.01em] transition-all duration-300 group"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <span
                                    className="block transition-all duration-500 ease-out leading-none relative"
                                    style={{
                                        transform: "scaleY(1.3)",
                                        transformOrigin: "center bottom",
                                        color: "transparent",
                                        backgroundImage: isHovered ? `url(${imageUrl})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextStroke: isHovered ? "2px transparent" : "2px rgba(168, 85, 247, 0.4)",
                                        filter: isHovered ? "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))" : "none",
                                    }}
                                >
                                    {letter}
                                </span>
                                <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#d946ef]`} />
                            </span>
                        );
                    })}
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mt-12 flex flex-col items-center gap-4"
                >
                    <div className="w-1 h-12 bg-gradient-to-b from-fuchsia-500 to-transparent animate-bounce" />
                    <span className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Scroll to explore the visionaries</span>
                </motion.div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}

"use client";

import { motion, useTransform, MotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface SpeakerMonolithProps {
    speaker: {
        name: string;
        role: string;
        image: string;
        bio?: string;
    };
    index: number;
    scrollProgress: MotionValue<number>;
    range: [number, number]; // [start, end] of its focal zone
}

export function SpeakerMonolith({ speaker, index, scrollProgress, range }: SpeakerMonolithProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // 1. Z-axis Depth (Warp)
    // We want the card to stay "back" and then zoom past the camera.
    // Each card has a range. It starts far away (-5000px) and moves towards and past the camera (2000px).
    const z = useTransform(scrollProgress, range, [1500, -3000]);
    const opacity = useTransform(scrollProgress,
        [range[0], range[0] + 0.05, range[0] + 0.1, range[1] - 0.1, range[1]],
        [0, 1, 1, 1, 0]
    );

    // 2. Focused blurring (Bokeh)
    // The focal point is around where z is 0. 
    // We'll calculate a "distance from center" within its range.
    const midPoint = (range[0] + range[1]) / 2;
    const distanceToFocalPoint = useTransform(scrollProgress, (val) => Math.abs(val - midPoint));
    const blurAmount = useTransform(distanceToFocalPoint, [0, 0.1], [0, 20]);
    const grayscale = useTransform(distanceToFocalPoint, [0, 0.1], [0, 0.8]);

    // 3. Mouse Parallax Refinement
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePos({
            x: (e.clientX - centerX) / (rect.width / 2),
            y: (e.clientY - centerY) / (rect.height / 2)
        });
    };

    const springConfig = { damping: 20, stiffness: 100 };
    const rotateX = useSpring(mousePos.y * -15, springConfig);
    const rotateY = useSpring(mousePos.x * 15, springConfig);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{
                translateZ: z,
                opacity,
                filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
                perspective: 1000
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-full max-w-lg aspect-[3/4] pointer-events-auto cursor-pointer group"
            >
                {/* Monolith Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/20 backdrop-blur-sm overflow-hidden shadow-2xl">

                    {/* Speaker Image */}
                    <motion.img
                        src={speaker.image}
                        alt={speaker.name}
                        style={{ filter: useTransform(grayscale, (v) => `grayscale(${v})`) }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />

                    {/* Scanning Line */}
                    <div className="absolute inset-x-0 h-[2px] bg-fuchsia-500/30 blur-[1px] animate-[scan_4s_linear_infinite]" />

                    {/* Bottom Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="w-8 h-px bg-fuchsia-500" />
                            <span className="text-fuchsia-400 font-mono text-[10px] uppercase tracking-[0.4em]">{speaker.role}</span>
                        </motion.div>

                        <h3 className="text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-4">
                            {speaker.name}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                            {speaker.bio || "Pushing the frontiers of technological innovation through immersive architecture and scalable neural networks."}
                        </p>
                    </div>

                    {/* Glass Glint */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Outer Glow */}
                <div className="absolute inset-0 -m-4 bg-fuchsia-500/5 blur-3xl rounded-full group-hover:bg-fuchsia-500/10 transition-all duration-700" />

                {/* Chromatic Corner Accents */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-fuchsia-500 shadow-[0_0_10px_#d946ef]" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </motion.div>

            {/* Floating Floating Name Backdrop (Perspective depth) */}
            <motion.div
                style={{ translateZ: useTransform(z, (v) => v * 0.5), opacity: useTransform(opacity, (v) => v * 0.2) }}
                className="absolute inset-x-0 -z-10 text-center pointer-events-none select-none"
            >
                <h2 className="text-[25vw] font-black uppercase text-white/5 outline-text leading-none">
                    {speaker.name.split(' ')[0]}
                </h2>
            </motion.div>

            <style jsx>{`
                .outline-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.1);
                    color: transparent;
                }
                @keyframes scan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
            `}</style>
        </motion.div>
    );
}

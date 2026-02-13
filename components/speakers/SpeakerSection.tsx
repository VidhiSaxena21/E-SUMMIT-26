"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { GateVertical } from "@/components/events/GateVertical";

interface SpeakerSectionProps {
    speaker: {
        name: string;
        role: string;
        image: string;
        bio?: string;
    };
    index: number;
    scrollProgress: MotionValue<number>;
    range: [number, number];
}

export function SpeakerSection({ speaker, index, scrollProgress, range }: SpeakerSectionProps) {
    // Content animations
    const opacity = useTransform(scrollProgress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [0, 1, 1, 0]
    );

    const scale = useTransform(scrollProgress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [0.8, 1, 1, 0.8]
    );

    const xPos = useTransform(scrollProgress,
        [range[0], range[1]],
        ["10%", "-10%"]
    );

    const backdropOpacity = useTransform(scrollProgress,
        [range[0], range[0] + 0.1, range[1] - 0.1, range[1]],
        [0, 0.05, 0.05, 0]
    );

    return (
        <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Cinematic Background Text */}
            <motion.div
                style={{ opacity: backdropOpacity, x: xPos }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
                <h2 className="text-[20vw] font-black uppercase text-white leading-none whitespace-nowrap opacity-10 blur-sm">
                    {speaker.name.split(' ')[0]}
                </h2>
            </motion.div>

            {/* Entrance Gate */}
            <GateVertical scrollProgress={scrollProgress} range={[range[0], range[0] + 0.08]} />

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 w-full max-w-6xl px-8 flex flex-col lg:flex-row items-center gap-12"
            >
                {/* Speaker Image Card */}
                <div className="relative group w-full lg:w-1/2 max-w-md aspect-[3/4]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-fuchsia-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
                        <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                        {/* Status Light */}
                        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-xl">
                            <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_8px_#d946ef]" />
                            <span className="text-[10px] font-mono text-fuchsia-300 uppercase tracking-widest"></span>
                        </div>
                    </div>
                </div>

                {/* Speaker Details */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-12 h-px bg-fuchsia-500/50" />
                            <span className="text-fuchsia-400 font-mono text-sm tracking-[0.3em] uppercase">{speaker.role}</span>
                        </motion.div>

                        <h3 className="text-6xl md:text-8xl font-display font-black text-white leading-tight uppercase tracking-tighter">
                            {speaker.name}
                        </h3>
                    </div>

                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                        {speaker.bio || "Pushing the boundaries of technology and innovation. A visionary leader dedicated to shaping the future of the digital landscape through creative excellence and strategic thinking."}
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-fuchsia-500 hover:text-white transition-all duration-300 rounded-none">
                            View Profile
                        </button>
                        
                    </div>
                </div>
            </motion.div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent blur-sm" />
        </section>
    );
}

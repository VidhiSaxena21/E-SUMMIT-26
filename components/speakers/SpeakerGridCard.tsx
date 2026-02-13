"use client";

import { motion } from "framer-motion";

interface SpeakerGridCardProps {
    speaker: {
        name: string;
        role: string;
        image: string;
    };
    index: number;
}

export function SpeakerGridCard({ speaker, index }: SpeakerGridCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
            }}
            viewport={{ once: true }}
            className="group relative flex flex-col items-center"
        >
            {/* Card Body */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-slate-900 group-hover:border-purple-500/50 transition-all duration-500 shadow-2xl">

                {/* Speaker Image */}
                <motion.img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ 
                        objectPosition: 'center',
                        objectFit: 'cover'
                    }}
                />

                {/* Hover overlay for role info */}
                <div className="absolute inset-x-0 bottom-0 bg-black/90 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-purple-500/30">
                    <div className="text-center">
                        <h3 className="text-fuchsia-500 font-display font-bold text-xl uppercase tracking-tighter mb-1">
                            {speaker.name}
                        </h3>
                        <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                            {speaker.role}
                        </p>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-fuchsia-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-fuchsia-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-fuchsia-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-fuchsia-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Reflection effect below */}
            <div className="mt-4 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}

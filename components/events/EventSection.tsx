"use client";

import { memo, useMemo } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { GateHorizontal } from "./GateHorizontal";
import { GateVertical } from "./GateVertical";
import { Button } from "@/components/ui/button";
import { useRegistration } from "@/components/RegistrationContext";

interface EventSectionProps {
    event: {
        id: number;
        title: string;
        description: string;
        time: string;
        location: string;
        speaker?: string;
        imageUrl?: string;
    };
    index: number;
    scrollProgress: MotionValue<number>;
    range: [number, number]; // [start, end] of this event in the scroll progress
}

export const EventSection = memo(function EventSection({ event, index, scrollProgress, range }: EventSectionProps) {
    const isEven = index % 2 === 0;
    const { openModal } = useRegistration();

    // Memoize animation ranges to prevent recalculation
    const animationRanges = useMemo(() => {
        const visibleStart = index === 0 ? 0.08 : range[0];
        const fadeOutStart = range[1] - 0.15;
        return {
            opacityRange: [visibleStart, fadeOutStart, range[1]] as [number, number, number],
            scaleRange: [visibleStart, fadeOutStart, range[1]] as [number, number, number],
            blurRange: [visibleStart, fadeOutStart, range[1]] as [number, number, number]
        };
    }, [index, range]);

    // Strict for ALL cards: fully shown first (opacity 1, no fade-in), then fade only on scroll past.
    const opacity = useTransform(scrollProgress, animationRanges.opacityRange, [1, 1, 0]);
    const scale = useTransform(scrollProgress, animationRanges.scaleRange, [1, 1, 0.98]); // Minimal scale change to prevent UI breaking
    const blur = useTransform(scrollProgress, animationRanges.blurRange, ["blur(0px)", "blur(0px)", "blur(6px)"]);

    return (
        <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-24 overflow-hidden">
            {/* Gate Animation - open immediately for all events */}
            <GateVertical scrollProgress={scrollProgress} range={[0, 0.05]} />

            <motion.div
                style={{ 
                    opacity, 
                    scale, 
                    filter: blur,
                    willChange: "transform, opacity, filter"
                }}
                className="relative z-10 w-full min-w-full max-w-none grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center px-2 sm:px-4 lg:px-8"
            >
                {/* Text Content */}
                <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                    <div className="inline-block px-3 sm:px-4 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs sm:text-xs font-bold tracking-widest uppercase">
                        {event.speaker || "TECH SHOWCASE"}
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-medium text-white leading-tight">
                        {event.title}
                    </h2>

                    <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl leading-relaxed">
                        {event.description}
                    </p>

                    <div className="flex flex-col gap-2 text-xs sm:text-sm font-mono text-blue-300">
                        <span>TIME: {event.time}</span>
                        <span className="text-white/90">LOCATION: {event.location}</span>
                    </div>

                    <Button
                        onClick={() => openModal(event.title)}
                        className="bg-white text-black hover:bg-blue-500 hover:text-white active:bg-blue-600 active:scale-95 transition-all duration-200 ease-out px-6 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg rounded-none ring-offset-slate-950 focus-visible:ring-blue-500 focus-visible:ring-2 font-semibold w-full sm:w-auto"
                    >
                        Reserve Seat
                    </Button>
                </div>

                {/* Cinematic Image Card */}
                <div className="relative aspect-[3/4] sm:aspect-[2/3] lg:aspect-[4/5] w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:ml-auto group order-1 lg:order-2">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl -m-2 blur-2xl transition-all duration-500 ease-out group-hover:from-blue-500/30 group-hover:blur-xl" />
                    
                    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-out group-hover:border-white/20 group-hover:shadow-3xl">
                        {/* Event Image */}
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                        />

                        {/* Neon Glow Border */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 ease-out group-hover:opacity-75" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
});

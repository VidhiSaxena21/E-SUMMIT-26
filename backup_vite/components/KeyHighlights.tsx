
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

const stats = [
    { label: "Attendees", value: 5000, suffix: "+" },
    { label: "Speakers", value: 120, suffix: "" },
    { label: "Events", value: 45, suffix: "+" },
    { label: "Countries", value: 25, suffix: "" },
];

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 15 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.round(latest).toLocaleString();
            }
        });
    }, [springValue]);

    return (
        <span className="flex">
            <span ref={ref}>0</span>
            {suffix}
        </span>
    );
};

export function KeyHighlights() {
    return (
        <section className="py-32 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent opacity-30 pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
                    >
                        Impact in Numbers
                    </motion.h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4 font-mono tracking-tighter"
                            >
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </motion.div>
                            <p className="text-primary text-sm md:text-base font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

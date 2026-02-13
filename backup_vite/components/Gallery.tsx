
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const galleryItems = [
    {
        id: 1,
        title: "Cybernetic Vision",
        date: "2023",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop",
        description: "First neural interface prototype demonstration."
    },
    {
        id: 2,
        title: "Neon Horizon",
        date: "2024",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
        description: "The expansion of the digital frontier."
    },
    {
        id: 3,
        title: "Digital Genesis",
        date: "2025",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        description: "Birth of the autonomous machine age."
    },
    {
        id: 4,
        title: "Sonic Void",
        date: "2025",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop",
        description: "Mapping the acoustic signature of silence."
    },
    {
        id: 5,
        title: "System Core",
        date: "2026",
        image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2574&auto=format&fit=crop",
        description: "The heart of the global network comes online."
    }
];

// Helper for parallax lift
function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

const FloatingCard = ({ item, index, scrollYProgress }: { item: any, index: number, scrollYProgress: MotionValue<number> }) => {
    // Determine the active range for this card based on index
    // We want them to appear sequentially as we scroll
    const start = index * 0.15;
    const end = start + 0.4;

    // Transform values
    // Opacity: Fade in then out
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    // Y: Move up as we scroll
    const y = useTransform(scrollYProgress, [start, end], [100, -100]);
    // Scale: Subtle grow
    const scale = useTransform(scrollYProgress, [start, start + 0.1, end], [0.8, 1, 1]);
    // Rotation: Slight tilt for 3D feel
    const rotateX = useTransform(scrollYProgress, [start, end], [10, -5]);

    // Blur to sharp
    const blur = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], ["10px", "0px", "0px", "10px"]);

    return (
        <motion.div
            style={{
                opacity,
                y,
                scale,
                rotateX,
                filter: `blur(${blur.get()})` // Ideally integrate blur properly, let's use style prop
            }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
            <motion.div
                style={{ filter: blur }}
                className="relative w-[300px] md:w-[500px] aspect-[3/4] md:aspect-video bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)] group pointer-events-auto transition-all duration-500 hover:shadow-[0_0_80px_rgba(139,92,246,0.3)] hover:border-primary/50"
            >
                {/* Image */}
                <div className="absolute inset-0 z-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 hover:scale-105 transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">{item.date}</span>
                        <div className="h-px flex-1 bg-white/20 mx-4" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">{item.description}</p>
                </div>

                {/* Neon Rim (Fake via inset shadow or border) */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/50 transition-all duration-500" />
            </motion.div>
        </motion.div>
    )
}


export function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Gate Animation
    // Opens quickly at the start
    const gateProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const leftGateX = useTransform(gateProgress, [0, 1], ["0%", "-100%"]);
    const rightGateX = useTransform(gateProgress, [0, 1], ["0%", "100%"]);
    const gateOpacity = useTransform(gateProgress, [0, 0.5], [1, 0]);

    // Header Animation (Fade out as gate opens)
    const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.05], [1, 1.2]);


    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen overflow-hiddenPerspective-2000">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>

                {/* 3D Scene Area */}
                <div className="relative w-full h-full flex items-center justify-center perspective-1000 z-10">
                    {/* Floating Cards Stack */}
                    <div className="relative w-full h-full max-w-4xl max-h-[800px]">
                        {galleryItems.map((item, index) => (
                            <FloatingCard key={item.id} item={item} index={index} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>

                {/* Gate Overlay */}
                <div className="absolute inset-0 z-50 pointer-events-none flex">
                    <motion.div
                        style={{ x: leftGateX, opacity: gateOpacity }}
                        className="w-1/2 h-full bg-black border-r border-white/10 relative flex items-center justify-end pr-12"
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 shadow-[0_0_30px_rgba(168,85,247,0.5)]"></div>
                    </motion.div>

                    <motion.div
                        style={{ x: rightGateX, opacity: gateOpacity }}
                        className="w-1/2 h-full bg-black border-l border-white/10 relative flex items-center justify-start pl-12"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 shadow-[0_0_30px_rgba(168,85,247,0.5)]"></div>
                    </motion.div>

                    {/* Initial Header (Visible when gate is closed) */}
                    <motion.div
                        style={{ opacity: headerOpacity, scale: headerScale }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    >
                        <h2 className="text-[12vw] leading-none font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter mix-blend-overlay">
                            GALLERY
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 font-mono mt-4 tracking-widest uppercase">
                            "Moments that defined us."
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: headerOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 z-50 pointer-events-none"
                >
                    <span className="text-xs uppercase tracking-widest">Unlock Vault</span>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                </motion.div>

            </div>
        </section>
    );
}

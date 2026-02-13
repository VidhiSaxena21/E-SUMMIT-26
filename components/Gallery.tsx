"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Search, MapPin, Calendar, Clock } from "lucide-react";

const galleryItems = [
    {
        id: 1,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770963526/esummit_bewbyv.jpg",
        aspect: "aspect-[2/3]",
        delay: 0
    },
    {
        id: 2,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770964313/_DSC0013_1_tt4yqq.jpg",
        aspect: "aspect-[3/4]",
        delay: 0.1
    },
    {
        id: 3,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770963152/IMG_1379_wgp3ha.jpg",
        aspect: "aspect-[3/5]",
        delay: 0.2
    },
    {
        id: 4,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770974308/_DSC0317_ii2fpz.jpg",
        aspect: "aspect-[2/3]",
        delay: 0.3
    },
    {
        id: 5,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770974307/_DSC0035_ayfrjy.jpg",
        aspect: "aspect-[4/5]",
        delay: 0.4
    },
    {
        id: 6,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770974308/_DSC0707_qo4gn8.jpg",
        aspect: "aspect-[2/3]",
        delay: 0.1
    },
    {
        id: 7,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770962908/IMG_1796_u7rdmw.jpg",
        aspect: "aspect-[3/4]",
        delay: 0.2
    },
    {
        id: 8,
        title: "",
        year: "",
        image: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770963160/IMG_1574_ukksxc.jpg",
        aspect: "aspect-[3/5]",
        delay: 0.3
    }
];

const GalleryItem = ({ item }: { item: typeof galleryItems[0] }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    const [isHovered, setIsHovered] = useState(false);

    // Parallax logic
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const springY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: item.delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ y: springY }}
            className="relative mb-6 break-inside-avoid"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`relative w-full ${item.aspect} rounded-xl overflow-hidden group border border-white/5 bg-white/5`}>

                {/* Clean Image with smooth transitions */}
                <motion.div
                    className="absolute inset-0 transition-all duration-700 ease-out z-0"
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        opacity: isHovered ? 1 : 0.9
                    }}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                                     className="w-full h-full object-cover transition-transform duration-700"
                       
                    />
                </motion.div>

                {/* Hover Glow Border */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none rounded-xl"
                    initial={false}
                    animate={{
                        boxShadow: isHovered ? "inset 0 0 30px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.2)" : "inset 0 0 0px rgba(168, 85, 247, 0)",
                        border: isHovered ? "1px solid rgba(168, 85, 247, 0.5)" : "1px solid rgba(255, 255, 255, 0.05)"
                    }}
                />

                {/* Info Overlay */}
                <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-1"
                    >
                        <span className="text-secondary font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
                            <div className="w-4 h-[1px] bg-secondary" />
                            {item.year}
                        </span>
                        <h3 className="text-xl font-display font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                            {item.title}
                        </h3>

                        {/* Micro Distortion Bar */}
                        <motion.div
                            className="h-[1px] bg-primary/50 w-full mt-2 overflow-hidden"
                            initial={{ scaleX: 0 }}
                            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                        >
                            <motion.div
                                className="h-full w-1/2 bg-white animate-pulse"
                                animate={{ x: ["0%", "200%"] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
            {/* Team Background */}
            <div 
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: 'url(/attached_assets/teambg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            />
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="flex flex-col items-center mb-20 text-center"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase">GALLERY</span>
                        <div className="w-12 h-[1px] bg-primary" />
                    </div>
                   
                    <p className="text-muted-foreground max-w-xl text-lg font-mono">
                        "Where Every Frame Tells a Story.."
                    </p>
                </motion.div>

                {/* Pinterest Style Masonry */}
                <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                    {galleryItems.map((item) => (
                        <GalleryItem key={item.id} item={item} />
                    ))}
                </div>
            </div>

            {/* Side Labels */}
            <div className="hidden xl:flex absolute top-1/2 left-8 -translate-y-1/2 flex-col gap-32 items-center">
                <span className="rotate-90 text-[10px] uppercase tracking-[1em] text-white/20 font-mono whitespace-nowrap"></span>
                <span className="rotate-90 text-[10px] uppercase tracking-[1em] text-primary/40 font-mono whitespace-nowrap"></span>
            </div>
        </section>
    );
}

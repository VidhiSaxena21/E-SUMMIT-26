"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlassSection, NarrativeBlock } from "@/components/AboutComponents";
import { Gallery } from "@/components/Gallery";
import { Play, Info, Users, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-950 text-white selection:bg-primary/30 relative">
            {/* Full page video background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="opacity-60"
                    style={{ 
                        transform: 'rotate(270deg) scale(1.5)', 
                        width: '100vh', 
                        height: '100vw', 
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-50vw',
                        marginLeft: '-50vh'
                    }}
                >
                    <source src="/attached_assets/aftermovie.mp4" type="video/mp4" />
                </video>
            </div>
            
            <Navigation />

            <main className="relative z-10">
                {/* HERO SECTION */}
                <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />

                    {/* Sidebar with E-SUMMIT'26 */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="writing-mode-vertical text-white/80"
                            style={{ writingMode: 'vertical-rl' }}
                        >
                            <h1 className="text-4xl font-display font-black tracking-widest uppercase">
                                E-SUMMIT'26
                            </h1>
                        </motion.div>
                    </div>

                    <div className="container relative z-10 px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase mb-6 italic italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                               
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light mb-10">
                               
                            </p>
                            
                        </motion.div>
                    </div>

                    {/* Scroll Down Hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-40">Scroll to Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                </section>

                {/* NARRATIVE SECTIONS */}
                <section className="py-32 relative">
                    {/* Background Image for rest of page */}
                    <div className="absolute inset-0">
                        <img
                            src="/attached_assets/aboutbg.png"
                            alt="About Background"
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-slate-950/80" />
                    </div>
                    
                    <div className="container relative z-10 px-4 space-y-32">
                        {/* ABOUT E-SUMMIT */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <NarrativeBlock
                                subtitle="The Legacy"
                                title="E-SUMMIT"
                                content={`E-Summit is the flagship entrepreneurship fest of TIET, dedicated to fostering the spirit of innovation and enterprise. It serves as a launchpad for startups and a platform for visionaries to share their journey with thousands of budding entrepreneurs.

Over the years, E-Summit has evolved into one of India's most prestigious entrepreneurship summits, bridging the gap between industry leaders and the student community.`}
                                icon={Rocket}
                                accentColor="var(--primary)"
                            />
                            <GlassSection className="aspect-[4/3] flex items-center justify-center">
                                <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-white/5">
                                    <img src="https://res.cloudinary.com/dgwll3dwe/image/upload/v1770963160/IMG_1574_ukksxc.jpg" className="w-full h-full object-cover opacity-50" alt="E-Summit" />
                                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40">
                                        <blockquote className="text-2xl font-display italic text-center">
                                            "Where vision meets execution, and ideas spark revolution."
                                        </blockquote>
                                    </div>
                                </div>
                            </GlassSection>
                        </div>

                        {/* ABOUT TVC */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <GlassSection className="order-2 lg:order-1 aspect-[4/3] flex items-center justify-center">
                                <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-white/5">
                                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670" className="w-full h-full object-cover opacity-50" alt="TVC" />
                                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-4 border border-white/10 rounded-xl bg-white/5">
                                                <div className="text-3xl font-bold text-secondary">50+</div>
                                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Events</div>
                                            </div>
                                            <div className="text-center p-4 border border-white/10 rounded-xl bg-white/5">
                                                <div className="text-3xl font-bold text-secondary">10K+</div>
                                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Reach</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassSection>
                            <NarrativeBlock
                                alignment="right"
                                subtitle="The Society"
                                title="THAPAR VENTURE CLUB"
                                content={`The Thapar Venture Club (TVC) is a student-led organization at TIET that drives the entrepreneurial ecosystem on campus. We believe in learning by doing, providing students with resources, mentorship, and a network to turn their ideas into reality.

TVC is responsible for conceptualizing and executing E-Summit, ensuring every edition pushes the boundaries of what a student-run festival can achieve.`}
                                icon={Users}
                                accentColor="var(--secondary)"
                            />
                        </div>

                        {/* ABOUT TIET */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <NarrativeBlock
                                subtitle="The Institution"
                                title="TIET PATIALA"
                                content={`Thapar Institute of Engineering and Technology (TIET) is one of India's oldest and most renowned technical institutes. Known for its academic excellence and research-driven environment, TIET has been the nurturing ground for thousands of engineers and entrepreneurs.

Located in the heart of Patiala, the campus is a melting pot of culture, technology, and ambition.`}
                                icon={Globe}
                                accentColor="var(--fuchsia-500)"
                            />
                            <GlassSection className="aspect-[4/3] flex items-center justify-center">
                                <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-white/5">
                                    <img src="https://cache.careers360.mobi/media/presets/720X480/colleges/social-media/media-gallery/174/2018/9/17/Campus%20View%20of%20Thapar%20Institute%20of%20Engineering%20and%20Technology%20Patiala_Campus-View.jpg" className="w-full h-full object-cover opacity-50" alt="TIET" />
                                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40">
                                        <div className="text-center">
                                            <h4 className="text-lg font-bold mb-2 uppercase tracking-wide">Excellence in Education</h4>
                                            <div className="h-[2px] w-12 bg-fuchsia-500 mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            </GlassSection>
                        </div>
                    </div>
                </section>

                {/* GALLERY SECTION (REUSED) */}
                <div className="border-t border-white/5">
                    <Gallery />
                </div>

                {/* CTA TO TEAM PAGE */}
                <section className="py-24 bg-slate-900/50 relative overflow-hidden">
                    <div className="container relative z-10 text-center">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Meet the Dreamers</h2>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto">Discover the passionate team behind E-Summit 2026.</p>
                        <Button variant="outline" size="lg" className="rounded-full border-primary/50 text-primary hover:bg-primary/10 px-8" asChild>
                            <a href="/team">VIEW OUR TEAM</a>
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                </section>
            </main>

            <Footer />
        </div>
    );
}

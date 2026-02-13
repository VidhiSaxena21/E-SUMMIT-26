"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SponsorTier } from "@/components/AboutComponents";
import ThreeBackground from "@/components/ThreeBackground";
import { SmoothScroll } from "@/components/events/SmoothScroll";

// Expanded sponsor data with categories
const SPONSORS_DATA = {
    title: [
        { name: "Global Innovation Hub", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" }
    ],
    platinum: [
        { name: "Future Systems", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" },
        { name: "Next Gen Tech", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
        { name: "Digital Edge", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" }
    ],
    gold: [
        { name: "Vortex Labs", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
        { name: "Cyber Dynamics", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/2048px-Tesla_logo.png" },
        { name: "Core Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/2560px-Intel-logo.svg.png" },
        { name: "Nebula AI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/NVIDIA_logo.svg/2560px-NVIDIA_logo.svg.png" }
    ],
    silver: [
        { name: "Stellar Soft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_logo.svg/2560px-Slack_Technologies_logo.svg.png" },
        { name: "Omega Networks", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cisco_logo.svg/2560px-Cisco_logo.svg.png" },
        { name: "Titan Solutions", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Oracle_logo.svg/2560px-Oracle_logo.svg.png" },
        { name: "Prism Media", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Spotify_1280.png/1200px-Spotify_1280.png" },
        { name: "Quantum Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Dropbox_logo_2017.svg/2560px-Dropbox_logo_2017.svg.png" }
    ],
    partners: [
        { name: "Partner 1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/2048px-Notion-logo.svg.png" },
        { name: "Partner 2", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vercel_logo_2024.svg/2560px-Vercel_logo_2024.svg.png" },
        { name: "Partner 3", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Figma-logo.svg/2560px-Figma-logo.svg.png" },
        { name: "Partner 4", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mailchimp_logo.svg/2560px-Mailchimp_logo.svg.png" },
        { name: "Partner 5", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png" },
        { name: "Partner 6", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" }
    ]
};

export default function SponsorsPage() {
    return (
        <SmoothScroll>
            <Navigation />

            <main className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
                {/* Cinematic Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <ThreeBackground />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950 z-0" />

                <div className="container relative z-10 px-4 mx-auto">
                    {/* Header Section */}
                    <header className="mb-32 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <div className="inline-block mb-4">
                                <span className="w-12 h-0.5 bg-secondary block mx-auto mb-2" />
                                <span className="text-secondary font-mono text-[10px] tracking-[0.5em] uppercase">E-Summit 2026 Partners</span>
                            </div>
                            <h1 className="text-7xl md:text-9xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6 italic">
                                SPONSORS
                            </h1>
                            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase bg-white/5 inline-block px-8 py-3 backdrop-blur-sm border border-white/5 rounded-full">
                                DRIVING INNOVATION • EMPOWERING ENTREPRENEURS
                            </p>
                        </motion.div>
                    </header>

                    <div className="space-y-40">
                        {/* Tiered Sponsors */}
                        <SponsorTier title="Title Sponsor" tier="title" sponsors={SPONSORS_DATA.title} />
                        <SponsorTier title="Platinum Sponsors" tier="platinum" sponsors={SPONSORS_DATA.platinum} />
                        <SponsorTier title="Gold Sponsors" tier="gold" sponsors={SPONSORS_DATA.gold} />
                        <SponsorTier title="Silver Sponsors" tier="silver" sponsors={SPONSORS_DATA.silver} />
                        <SponsorTier title="Media & Outreach Partners" tier="partners" sponsors={SPONSORS_DATA.partners} />
                    </div>

                    {/* Partner with us Section */}
                    <section className="mt-48 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto glass-panel border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-16 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 italic uppercase">Scale your impact</h2>
                            <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                                Join forces with North India's largest entrepreneurship summit. Connect with 10,000+ students, 100+ startups, and industry leaders.
                            </p>
                            <button className="px-12 py-5 rounded-full bg-white text-black font-bold tracking-widest uppercase hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                                BECOME A SPONSOR
                            </button>
                        </motion.div>
                    </section>
                </div>

                {/* Vertical Decorative text */}
                <div className="hidden 2xl:block fixed left-10 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] opacity-10">
                    <span className="font-mono text-xs tracking-[1em] uppercase text-white">COLLECTIVE_PROGRESS_2026</span>
                </div>
                <div className="hidden 2xl:block fixed right-10 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] opacity-10">
                    <span className="font-mono text-xs tracking-[1em] uppercase text-white">EMPOWERING_THE_Ecosystem</span>
                </div>
            </main>

            <Footer />
        </SmoothScroll>
    );
}

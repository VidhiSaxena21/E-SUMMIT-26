"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-16 pb-8 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-display font-bold text-white tracking-widest">TVC</h2>
                        <p className="text-muted-foreground font-mono text-sm tracking-wide">
                            Ideate, Ascend, Lead
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                
                                { icon: Instagram, href: "https://www.instagram.com/tvc.tiet/" },
                                { icon: Linkedin, href: "https://www.linkedin.com/school/thaparventureclub/posts/?feedView=all" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 hover:bg-primary/10 transition-all group"
                                >
                                    <social.icon className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest font-display">Contact Us</h3>
                        <div className="space-y-4 text-muted-foreground text-sm font-mono leading-relaxed max-w-md">
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                <p>
                                    Thapar Venture Club,
                                    Thapar Institute of Engineering & Technology
                                    Bhadson Road, Patiala-147004, Punjab
                                </p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Phone className="w-5 h-5 text-secondary shrink-0" />
                                <p>+91 7023720527</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <p>edc@thapar.edu</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
                    <p className="text-white/20 text-xs font-mono">
                        © 2026 TVC. All rights reserved.
                    </p>
                    <div className="w-12 h-[1px] bg-white/10 hidden md:block" />
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mb-32 -mr-32 pointer-events-none" />
        </footer>
    );
}

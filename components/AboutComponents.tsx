"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GlassSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function GlassSection({ children, className, delay = 0 }: GlassSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={cn(
                "glass-panel rounded-3xl p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden group",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

interface NarrativeBlockProps {
    title: string;
    subtitle?: string;
    content: string;
    icon?: LucideIcon;
    alignment?: "left" | "right";
    accentColor?: string;
}

export function NarrativeBlock({
    title,
    subtitle,
    content,
    icon: Icon,
    alignment = "left",
    accentColor = "var(--primary)",
}: NarrativeBlockProps) {
    return (
        <div className={cn("flex flex-col gap-6", alignment === "right" ? "lg:items-end lg:text-right" : "")}>
            <div className={cn("flex flex-col gap-2", alignment === "right" ? "lg:items-end" : "")}>
                {subtitle && (
                    <span
                        className="text-xs font-mono tracking-[0.4em] uppercase opacity-60"
                        style={{ color: accentColor }}
                    >
                        {subtitle}
                    </span>
                )}
                <div className="flex items-center gap-4">
                    {alignment === "left" && Icon && <Icon className="w-8 h-8" style={{ color: accentColor }} />}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                        {title}
                    </h2>
                    {alignment === "right" && Icon && <Icon className="w-8 h-8" style={{ color: accentColor }} />}
                </div>
            </div>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed whitespace-pre-line">
                {content}
            </p>
        </div>
    );
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
    department: string;
    linkedin?: string;
}

import { Mail, Linkedin } from "lucide-react";

export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group flex flex-col items-center gap-4"
        >
            <div className="relative w-full aspect-[4/5] overflow-hidden transition-all duration-500 rounded-[3rem_0.5rem_3rem_0.5rem] group-hover:rounded-[3rem_0.5rem_3rem_0.5rem]">
                {/* Background Shadow/Depth effect for the card shape */}
                <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-900/40 rounded-[0_0_3rem_0.5rem] blur-xl z-10" />

                {/* Profile Image */}
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 relative z-20"
                    style={{ 
                        objectPosition: member.name === 'Mudit Marwah' ? 'center 10%' : 
                                       member.name === 'Arihan Andotra' ? 'center 35%' : 'center 20%'
                    }}
                />

                {/* Hover Overlay - Gray/Desaturated */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 z-30">
                    {/* Corner Bracket Effect */}
                    <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-black/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-black/40 rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        {/* The actual visual bracket from the image */}
                        <div className="absolute -top-1 -left-1 w-20 h-20 border-t-2 border-l-2 border-black/80 rounded-tl-xl" />
                    </div>

                    {/* Social Icons */}
                    {member.linkedin && (
                        <motion.a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="w-10 h-10 bg-white rounded-md flex items-center justify-center cursor-pointer shadow-lg"
                        >
                            <Linkedin className="w-5 h-5 text-slate-900" />
                        </motion.a>
                    )}
                </div>

                {/* Decorative border matching the shape */}
                <div className="absolute inset-0 border border-white/10 rounded-[3rem_0.5rem_3rem_0.5rem] pointer-events-none z-40" />
            </div>

            {/* Content Below Image */}
            <div className="text-center flex flex-col items-center gap-1">
                <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase mb-1">
                    {member.name.split(' ').map((part, i) => (
                        <span key={i} className="block leading-none">{part}</span>
                    ))}
                </h3>
                <p className="text-slate-400 font-medium text-lg">
                    {member.role}
                </p>
            </div>
        </motion.div>
    );
}

interface Sponsor {
    name: string;
    logo: string;
    link?: string;
}

export function SponsorCard({ sponsor, size = "md" }: { sponsor: Sponsor; size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "h-20 md:h-24 px-6",
        md: "h-32 md:h-40 px-8",
        lg: "h-48 md:h-60 px-12",
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "glass-panel border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center group relative overflow-hidden",
                sizeClasses[size]
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={cn(
                    "w-full h-full object-contain filter brightness-[0.8] contrast-[1.2] transition-all duration-500 group-hover:brightness-100 group-hover:scale-110",
                    size === "lg" ? "p-8" : size === "md" ? "p-6" : "p-4"
                )}
            />
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-primary/50 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-primary/50 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-primary/50 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-primary/50 transition-colors" />
        </motion.div>
    );
}

export function SponsorTier({ title, sponsors, tier }: { title: string; sponsors: Sponsor[]; tier: "title" | "platinum" | "gold" | "silver" | "partners" }) {
    const gridClasses = {
        title: "grid-cols-1 max-w-2xl mx-auto",
        platinum: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        gold: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        silver: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        partners: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
    };

    const cardSize = {
        title: "lg" as const,
        platinum: "md" as const,
        gold: "md" as const,
        silver: "sm" as const,
        partners: "sm" as const,
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center gap-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/10" />
                <h3 className="text-xl md:text-2xl font-display font-bold tracking-widest text-white/80 uppercase">
                    {title}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/10" />
            </div>
            <div className={cn("grid gap-8", gridClasses[tier])}>
                {sponsors.map((sponsor, idx) => (
                    <SponsorCard key={idx} sponsor={sponsor} size={cardSize[tier]} />
                ))}
            </div>
        </div>
    );
}


import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const speakers = [
    {
        name: "Michael Kasanov",
        role: "ICT Development",
        image: "https://freepngimg.com/thumb/man/22654-6-man.png",
    },
    {
        name: "Katya Safranova",
        role: "Manager at Forcit",
        image: "https://freepngimg.com/thumb/woman/23304-4-business-woman-transparent-image.png",
    },
    {
        name: "Denis Tsebruk",
        role: "Director at Metsa",
        image: "https://freepngimg.com/thumb/man/22656-9-man-thumb.png",
    },
    {
        name: "Sarah Johnson",
        role: "AI Researcher",
        image: "https://freepngimg.com/thumb/woman/6-2-woman-transparent.png",
    },
    {
        name: "David Chen",
        role: "Blockchain Architect",
        image: "https://freepngimg.com/thumb/man/22658-4-man.png",
    },
    {
        name: "Emily Davis",
        role: "UX Strategy",
        image: "https://freepngimg.com/thumb/woman/4-2-woman-transparent.png",
    },
];

const SpeakerCard = ({ speaker, index }: { speaker: typeof speakers[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex flex-col items-start gap-4"
        >
            {/* Image Container with Border */}
            <div className="relative w-full aspect-square overflow-hidden border border-white/20 bg-zinc-900 transition-colors duration-500 group-hover:border-primary/50 group-hover:bg-zinc-800/50">
                {/* Image */}
                <div className="absolute inset-0 flex items-end justify-center">
                    <img
                        src={speaker.image}
                        alt={speaker.name}
                        className={cn(
                            "w-full h-[90%] object-contain transition-all duration-700 ease-in-out",
                            "filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                        )}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="text-left w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors duration-300">
                    {speaker.name}
                </h3>
                <p className="text-muted-foreground font-mono text-sm mt-1">
                    {speaker.role}
                </p>
            </div>
        </motion.div>
    );
}

export function PastSpeakers() {
    return (
        <section className="py-24 bg-black relative">
            <div className="container mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Past Speakers</h2>
                    <div className="w-full h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {speakers.map((speaker, i) => (
                        <SpeakerCard key={i} speaker={speaker} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

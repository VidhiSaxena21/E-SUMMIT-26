
import { motion } from "framer-motion";

// Using reliable placeholder logos or text for now
const sponsors = [
    { name: "TechCorp", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" }, // Placeholder: Google
    { name: "InnovateX", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" }, // Placeholder: IBM
    { name: "FutureLabs", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" }, // Placeholder: Microsoft
    { name: "DataFlow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" }, // Placeholder: Netflix
    { name: "CloudNine", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" }, // Placeholder: Amazon
    { name: "CyberSys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/2048px-Tesla_logo.png" }, // Placeholder: Tesla
];

export function Sponsors() {
    return (
        <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Our Partners</h2>
                <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Powering the Future</p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden py-10 bg-white/5">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex items-center gap-16"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {/* Double the list for seamless loop - repeated 3 times to ensure width */}
                    {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
                        <div key={i} className="shrink-0 transition-all duration-300">
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

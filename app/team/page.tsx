"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TeamCard, GlassSection } from "@/components/AboutComponents";
import { NeonWaveBackground } from "@/components/speakers/NeonWaveBackground";
import { SmoothScroll } from "@/components/events/SmoothScroll";

const TEAM_MEMBERS = [
    { 
        name: "Mudit Marwah", 
        role: "General Secretary", 
        department: "Executive Board",
        image: "/attached_assets/mudit.png", 
        linkedin: 'https://www.linkedin.com/in/mudit-marwah-8aa6b42aa/'
    },
    { 
        name: "Udita Chutani", 
        role: "General Secretary", 
        department: "Executive Board",
        image: "/attached_assets/udita.png", 
        linkedin: 'https://www.linkedin.com/in/udita-chutani-875985298/'
    },
    { 
        name: "Bhavuk Mahajan", 
        role: "General Secretary", 
        department: "Executive Board",
        image: "/attached_assets/bm.png", 
        linkedin: 'https://www.linkedin.com/in/bhavuk-m007/' 
    },
    { 
        name: "Arnav Gupta", 
        role: "Joint Secretary", 
        department: "Executive Board",
        image: "/attached_assets/arnav.png", 
        linkedin: 'https://www.linkedin.com/in/arnavg23/'
    },
    { 
        name: "Arihan Andotra", 
        role: "Joint Secretary", 
        department: "Executive Board",
        image: "/attached_assets/arihan.png", 
        linkedin: 'https://www.linkedin.com/in/arihan-andotra-14a368292/'
    },
    { 
        name: "Akarsh Dhingra", 
        role: "Joint Secretary", 
        department: "Executive Board",
        image: "/attached_assets/akarsh.png", 
        linkedin: 'https://www.linkedin.com/in/akarsh-dhingra-7a9804299/'
    },
    { 
        name: "Mohammad Aaban", 
        role: "Joint Secretary", 
        department: "Executive Board",
        image: "/attached_assets/aaban.png", 
        linkedin: 'https://www.linkedin.com/in/mohammad-aaban-347139293/'
    },
    { 
        name: "Samar Vir Vinayak", 
        role: "Finance Secretary", 
        department: "Finance",
        image: "/attached_assets/sv.png", 
        linkedin: 'https://www.linkedin.com/in/samar-vir-vinayak/'
    },
    { 
        name: "Samyak Jain", 
        role: "Marketing & Externals Secretary", 
        department: "Marketing",
        image: "/attached_assets/samyak.png", 
        linkedin: 'https://www.linkedin.com/in/samyak-jain-01937b291/'
    },
    { 
        name: "Harshit Kamra", 
        role: "Marketing & Externals Secretary", 
        department: "Marketing",
        image: "/attached_assets/Harshit.png", 
        linkedin: 'https://www.linkedin.com/in/harshit-kamra-7a2aab284/'
    },
    { 
        name: "Sarthak Sood", 
        role: "Social Media & Design Secretary", 
        department: "Design & Media",
        image: "/attached_assets/sarthak.png", 
        linkedin: 'https://www.linkedin.com/in/sarthak-sood-753238316/'
    },
    { 
        name: "Gursharen Kaur Suri", 
        role: "Technical Secretary", 
        department: "Tech Department",
        image: "/attached_assets/gursharen.png", 
        linkedin: 'https://www.linkedin.com/in/gursharen-kaur-suri/'  
    },
    { 
        name: "Raunit Mittal", 
        role: "Co-convener", 
        department: "Operations",
        image: "/attached_assets/raunit.png", 
        linkedin: 'https://www.linkedin.com/in/raunit-mittal-b337a9327/'
    },
    { 
        name: "Tanish Ahuja", 
        role: "Co-convener", 
        department: "Operations",
        image: "/attached_assets/tanish.png", 
        linkedin: 'https://www.linkedin.com/in/tanish-ahuja-4935b7281/'
    }
];

export default function TeamPage() {
    return (
        <SmoothScroll>
            <Navigation />

            <main className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
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
                
                {/* Premium Background */}
                <NeonWaveBackground />

                <div className="container relative z-10 px-4 mx-auto">
                    {/* Header Section */}
                    <header className="mb-24 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <div className="inline-block mb-4">
                                <span className="w-12 h-0.5 bg-primary block mx-auto mb-2" />
                                <span className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase">Behind the Scenes</span>
                            </div>
                            <h1 className="text-7xl md:text-9xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">
                                THE TEAM
                            </h1>
                            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase bg-white/5 inline-block px-6 py-2 backdrop-blur-sm border border-white/5 rounded-full">
                                 INNOVATORS • COLLABORATORS
                            </p>
                        </motion.div>
                    </header>

                    {/* Core Team Grid */}
                    <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
                        {TEAM_MEMBERS.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>

                    {/* Join Us CTA */}
                    
                </div>

                {/* Footer Accent */}
                <div className="mt-32 border-t border-white/5 pt-20 text-center opacity-30">
                    <p className="text-slate-600 font-mono text-[10px] tracking-[1em] uppercase">
                        Building the Future, One Pixel at a Time
                    </p>
                </div>
            </main>
        </SmoothScroll>
    );
}

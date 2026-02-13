"use client";

import { motion } from "framer-motion";
import { SpeakerGridCard } from "@/components/speakers/SpeakerGridCard";

const speakers = [
    {
        name: "Iqlipse Nova",
        role: "Indian sensational Singer ~ songwriter",
        image: "https://i.pinimg.com/736x/03/5c/f7/035cf7358a3958cf336e1706ffd3e70f.jpg"
    },
    {
        name: "Gaurav Taneja",
        role: "Pilot, YouTuber, Motivational Speaker & Fitness Enthusiast",
        image: "https://www.startupurban.com/wp-content/uploads/2020/07/gaurav-taneja.jpg"
    },
    {
        name: "Ashneer Grover",
        role: "Former managing director of BharatPe",
        image: "https://images.assettype.com/fortuneindia/2022-03/dcb203f0-d915-498a-b609-6d4351416eb1/Ashneer_020A1875_copy.jpg?rect=0,0,4500,2531&w=1250&q=60"
    },
    {
        name: "Aakash Anand",
        role: "CEO of Bella Vita Organic",
        image: "https://assets.entrepreneur.com/content/3x2/2000/1714473756-Untitleddesign2.png"
    },
    {
        name: "Himeesh Madaan",
        role: "YouTube Entrepreneur",
        image: "https://viestories.com/wp-content/uploads/2022/09/cropped-mentor.png"
    },
    {
        name: "Tanu Jain",
        role: "Doctor-turned-IAS, educator & motivational speaker",
        image: "https://tfipost.com/wp-content/uploads/2022/04/Tanu_jain_IAS_interview_at_dristhi_IAS.jpg"
    },
    {
        name: "Anubhav Singh Bassi",
        role: "Stand-up Comedian",
        image: "https://peopleplaces.in/wp-content/uploads/2022/12/Anubhav-Singh-Bassi.jpg"
    },
    {
        name: "Anuv Jain",
        role: "Indian Singer ~ songwriter ",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Anuv_Jain_at_Ludhiana_concert.jpg"
    }
];

export function PastSpeakers() {
    return (
        <section className="py-24 bg-black relative">
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
            
            <div className="container mx-auto relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Past Speakers</h2>
                    <div className="w-full h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-8">
                    {speakers.map((speaker, i) => (
                        <SpeakerGridCard key={speaker.name} speaker={speaker} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

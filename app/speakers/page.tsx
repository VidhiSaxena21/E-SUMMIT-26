"use client";

import { motion } from "framer-motion";
import { SpeakerGridCard } from "@/components/speakers/SpeakerGridCard";
import { NeonWaveBackground } from "@/components/speakers/NeonWaveBackground";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/events/SmoothScroll";

const SPEAKERS = [
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
        image: "https://tse2.mm.bing.net/th/id/OIP.LWoEObm18R87OH5uCmUscwHaE7?pid=Api&P=0&h=180"
    },
    {
        name: "Himeesh Madaan",
        role: "YouTube Entrepreneur",
        image: "https://tse4.mm.bing.net/th/id/OIP.b-Dg_qDBwFWCJZk9Fn43lQHaEH?pid=Api&P=0&h=180"
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

export default function SpeakersPage() {
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
          <header className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-block mb-4">
                <span className="w-12 h-0.5 bg-fuchsia-500 block mx-auto mb-2" />
                <span className="text-fuchsia-500 font-mono text-[10px] tracking-[0.5em] uppercase">E-SUMMIT</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-display font-black text-fuchsia-500 uppercase tracking-tighter leading-none mb-4 ">
               Past Speakers
              </h1>
              <p className="text-slate-400 font-mono text-sm tracking-widest uppercase bg-white/5 inline-block px-4 py-1 backdrop-blur-sm border border-white/5">
                Leaders • Visionaries • Disruptors
              </p>
            </motion.div>
          </header>

          {/* Grid Layout - 2 per row on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-8">
            {SPEAKERS.map((speaker, index) => (
              <SpeakerGridCard key={speaker.name} speaker={speaker} index={index} />
            ))}
          </div>
        </div>

        {/* Footer Accent */}
        <div className="mt-32 border-t border-white/5 pt-20 text-center">
          <p className="text-slate-600 font-mono text-[10px] tracking-[1em] uppercase">
            Pushing Boundaries
          </p>
        </div>

        <style jsx global>{`
          @font-face {
            font-family: 'Space Grotesk';
            src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          .font-display {
            font-family: 'Space Grotesk', sans-serif;
          }
        `}</style>
      </main>
    </SmoothScroll>
  );
}

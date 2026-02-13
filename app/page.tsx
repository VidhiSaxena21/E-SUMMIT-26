"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Hero3D } from "@/components/Hero3D";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/EventCard";
import { Gallery } from "@/components/Gallery";
import { KeyHighlights } from "@/components/KeyHighlights";
import { PastSpeakers } from "@/components/PastSpeakers";
import { Sponsors } from "@/components/Sponsors";
import { useRegistration } from "@/components/RegistrationContext";

const CARD_WIDTH_PX = 340;
const CARD_GAP = 24;

export default function Home() {
  const { data: events, isLoading } = useEvents();
  const { openModal } = useRegistration();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = CARD_WIDTH_PX + CARD_GAP;
    scrollRef.current.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {/* Team Background */}
      <div 
        className="fixed inset-0 opacity-30 z-0"
        style={{
          backgroundImage: 'url(/attached_assets/teambg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10">
        <Hero3D />

        <div className="container relative z-10 flex flex-col items-start justify-center h-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-8 bg-secondary"></span>
              <span className="text-secondary font-mono uppercase tracking-[0.2em] text-sm">FEBRUARY 18-22, 2026</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none mb-6 flex gap-4">
  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">
    E-
  </span>

  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
  SUMMIT'26
  </span>
</h1>


            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 border-l-2 border-primary/50 pl-6">
            Join us for the 12th edition of E-Summit — a 5-day celebration of innovation, entrepreneurship, and future technologies.  </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => openModal()}
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
              >
                Reserve Your Spot
              </Button>
              <Link href="/events">
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white text-lg h-14 px-8 rounded-full">
                  Explore Events
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    
      {/* EVENTS PREVIEW - horizontal line with arrows */}
      <section className="py-16 md:py-24 bg-black/50 relative z-10">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Events</h2>
              <p className="text-muted-foreground">Don't miss these Events!.</p>
            </div>
            <Link href="/events">
              <button className="hidden md:flex group text-primary hover:text-primary/80 hover:bg-transparent p-0 bg-transparent border-none cursor-pointer items-center">
                View All Schedule <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="relative flex items-center gap-6">
            {/* Left arrow */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous events"
              className="flex-shrink-0 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Scrollable row of cards */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide flex gap-6 pb-2 -mx-4 px-4 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-[340px] h-64 rounded-xl bg-white/5 animate-pulse" />
                ))
              ) : (
                events?.slice(0, 7).map((event: any, index: number) => (
                  <div key={event.id} className="flex-shrink-0 w-[340px]">
                    <EventCard event={event} index={index} />
                  </div>
                ))
              )}
            </div>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next events"
              className="flex-shrink-0 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link href="/events">
              <Button variant="outline" className="w-full">View All Schedule</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEW SECTIONS */}
      <Gallery />
      <KeyHighlights />
      <PastSpeakers />
      {/* <Sponsors /> */}

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Ready to shape the future?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Secure your spot at E-Summit 2026. Limited tickets available.
          </p>
          <Button
            onClick={() => openModal()}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 text-lg px-10 h-16 rounded-full font-bold"
          >
            Register Now
          </Button>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef, useCallback, useMemo } from "react";
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

// Simple skeleton component for loading state
const EventCardSkeleton = () => (
  <div className="w-[280px] sm:w-[320px] lg:w-[340px] h-64 rounded-xl bg-white/5 animate-pulse">
    <div className="p-4 sm:p-6 h-full flex flex-col justify-between">
      <div className="space-y-2 sm:space-y-3">
        <div className="h-3 sm:h-4 bg-white/10 rounded w-16 sm:w-20"></div>
        <div className="h-4 sm:h-6 bg-white/10 rounded w-3/4 sm:w-3/4"></div>
        <div className="space-y-1 sm:space-y-2">
          <div className="h-2 sm:h-3 bg-white/10 rounded"></div>
          <div className="h-2 sm:h-3 bg-white/10 rounded w-4/5 sm:w-4/5"></div>
        </div>
      </div>
      <div className="space-y-1 sm:space-y-2">
        <div className="h-2 sm:h-3 bg-white/10 rounded w-1/2 sm:w-1/2"></div>
        <div className="h-2 sm:h-3 bg-white/10 rounded w-1/3 sm:w-1/3"></div>
      </div>
    </div>
  </div>
);

const CARD_WIDTH_PX = 340;
const CARD_GAP = 24;

export default function Home() {
  const { data: events, isLoading } = useEvents();
  const { openModal } = useRegistration();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Memoize scroll calculation
  const scrollStep = useMemo(() => CARD_WIDTH_PX + CARD_GAP, []);
  
  // Optimize scroll function with useCallback
  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ 
      left: direction === "left" ? -scrollStep : scrollStep, 
      behavior: "smooth" 
    });
  }, [scrollStep]);

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

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-none mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">
    E-
  </span>

  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
  SUMMIT'26
  </span>
</h1>


            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-lg sm:max-w-xl lg:max-w-2xl leading-relaxed mb-6 sm:mb-8 lg:mb-10 border-l-2 border-primary/50 pl-4 sm:pl-6">
            Join us for the 12th edition of E-Summit — a 5-day celebration of innovation, entrepreneurship, and future technologies.  </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={() => openModal()}
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white text-base sm:text-lg h-12 sm:h-14 px-4 sm:px-6 lg:px-8 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
              >
                <span className="text-sm sm:text-base">Reserve Your Spot</span>
              </Button>
              <Link href="/events">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 hover:bg-white/10 text-white text-base sm:text-lg h-12 sm:h-14 px-4 sm:px-6 lg:px-8 rounded-full"
                >
                  <span className="text-sm sm:text-base">Explore Events</span>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">Featured Events</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Don't miss these Events!.</p>
            </div>
            <Link href="/events">
              <button className="hidden md:flex group text-primary hover:text-primary/80 hover:bg-transparent p-0 bg-transparent border-none cursor-pointer items-center text-sm sm:text-base">
                View All Schedule <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="relative flex items-center gap-6">
            {/* Left arrow */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous events"
              className="flex-shrink-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Scrollable row of cards */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide flex gap-4 sm:gap-6 pb-2 -mx-4 px-4 sm:mx-0 md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {isLoading ? (
                Array.from({ length: 7 }, (_, i) => (
                  <EventCardSkeleton key={i} />
                ))
              ) : (
                events?.slice(0, 7).map((event: any, index: number) => (
                  <div key={event.id} className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]">
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
              className="flex-shrink-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="mt-6 sm:mt-8 md:hidden text-center">
            <Link href="/events">
              <Button variant="outline" className="w-full text-sm sm:text-base">View All Schedule</Button>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6 text-white">
            Ready to shape the future?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10">
            Secure your spot at E-Summit 2026. Limited tickets available.
          </p>
          <Button
            onClick={() => openModal()}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 text-base sm:text-lg px-6 sm:px-8 lg:px-10 h-12 sm:h-14 lg:h-16 rounded-full font-semibold"
          >
            <span className="text-sm sm:text-base">Register Now</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

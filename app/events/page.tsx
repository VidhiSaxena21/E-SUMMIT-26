"use client";

import { useEvents } from "@/hooks/use-events";
import { Loader2 } from "lucide-react";
import { HorizontalScroller } from "@/components/events/HorizontalScroller";
import { EventSection } from "@/components/events/EventSection";
import { SmoothScroll } from "@/components/events/SmoothScroll";

export default function Events() {
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
        <p className="text-purple-300 font-mono tracking-widest animate-pulse">
          LOADING CINEMATIC EXPERIENCE...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <h3 className="text-2xl font-bold text-red-500 mb-2">Failed to load events</h3>
        <p className="text-gray-400">Please try again later.</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <p className="text-xl text-gray-400">No events scheduled yet.</p>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <main className="bg-slate-950">
        <HorizontalScroller eventCount={events.length}>
          {(scrollYProgress) =>
            events.map((event, index) => {
              // Hero: 0 - 0.1; Calculate remaining space for all events
              const remainingSpace = 0.9; // Space after hero section
              const eventDuration = remainingSpace / events.length * 1.5; // 50% longer than equal distribution
              const start = 0.1 + index * eventDuration;
              const end = start + eventDuration;

              return (
                <EventSection
                  key={event.id}
                  event={event}
                  index={index}
                  scrollProgress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })
          }
        </HorizontalScroller>
      </main>
    </SmoothScroll>
  );
}


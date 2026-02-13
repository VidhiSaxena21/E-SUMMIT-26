import { motion } from "framer-motion";
import { Calendar, MapPin, User, Clock } from "lucide-react";
import { type Event } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 blur group-hover:opacity-60 transition duration-500"></div>
      <div className="relative h-full bg-card border border-white/5 rounded-xl p-6 flex flex-col hover:border-white/20 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-widest text-xs font-mono">
            Keynote
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm font-mono">
            <Clock className="w-3 h-3 mr-1.5" />
            {event.time}
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
          {event.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center text-sm text-foreground/80">
            <User className="w-4 h-4 mr-2 text-secondary" />
            {event.speaker || "TBA"}
          </div>
          <div className="flex items-center text-sm text-foreground/80">
            <MapPin className="w-4 h-4 mr-2 text-accent" />
            {event.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

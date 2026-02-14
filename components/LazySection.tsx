"use client";

import { useRef, memo } from "react";
import { useInView } from "framer-motion";

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
  once?: boolean;
}

function LazySectionInner({
  children,
  minHeight = "40vh",
  rootMargin = "120px",
  once = true,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });

  return (
    <div ref={ref} style={{ minHeight }}>
      {isInView ? children : null}
    </div>
  );
}

export const LazySection = memo(LazySectionInner);

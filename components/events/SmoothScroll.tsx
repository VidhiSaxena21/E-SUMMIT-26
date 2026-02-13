"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useMemo } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
    // Memoize lenis options to prevent recreation
    const lenisOptions = useMemo(() => ({
        lerp: 0.08, // Reduced for smoother feel
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    }), []);

    return (
        <ReactLenis 
            root 
            options={lenisOptions}
            className="lenis-container"
        >
            {children}
        </ReactLenis>
    );
}

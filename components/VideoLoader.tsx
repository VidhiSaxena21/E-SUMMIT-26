import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoLoaderProps {
    onLoadingComplete: () => void;
}

export function VideoLoader({ onLoadingComplete }: VideoLoaderProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // We can either wait for the video to end or use a fixed timeout
        // the user provided "Untitled design.mp4"
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 1000); // Allow time for fade out animation
        }, 4500); // 4.5 seconds or adjust based on video length

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={() => {
                            setIsVisible(false);
                            setTimeout(onLoadingComplete, 1000);
                        }}
                    >
                        <source src="/loader.mp4" type="video/mp4" />

                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

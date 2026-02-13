import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function VideoLoader() {
    const [isLoading, setIsLoading] = useState(true);

    // Fallback timer in case video fails to load or play
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 8000); // 8 second failsafe

        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnd = () => {
        setIsLoading(false);
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="video-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        style={{
                            minWidth: '100%',
                            minHeight: '100%',
                            width: 'auto',
                            height: 'auto',
                        }}
                    >
                        <source src="/loader.mp4" type="video/mp4" />
                    </video>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import React, { useRef, useEffect } from "react";

export function NeonWaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            time += 0.005;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Deep Black Background
            ctx.fillStyle = "#020617";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw horizontal waves (like the reference)
            const waveCount = 5;
            const spacing = canvas.height / (waveCount + 1);

            const colors = [
                "rgba(168, 85, 247, 0.15)", // Purple-500
                "rgba(217, 70, 239, 0.15)", // Fuchsia-500
                "rgba(147, 51, 234, 0.15)", // Purple-600
                "rgba(192, 38, 211, 0.15)", // Fuchsia-600
                "rgba(168, 85, 247, 0.15)",
            ];

            for (let i = 0; i < waveCount; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = colors[i % colors.length];

                const yBase = spacing * (i + 1);

                ctx.moveTo(0, yBase);
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = yBase + Math.sin(x * 0.002 + time + i) * 50 + Math.cos(x * 0.001 - time * 0.5) * 30;
                    ctx.lineTo(x, y);
                }

                ctx.stroke();
            }

            // Add a vertical "scanning" grid effect (subtle)
            ctx.strokeStyle = "rgba(168, 85, 247, 0.03)";
            ctx.lineWidth = 0.5;
            for (let x = 0; x < canvas.width; x += 100) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-40"
        />
    );
}

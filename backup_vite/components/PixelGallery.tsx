
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const images = [
    // Using reliable picsum IDs
    // Row 1
    { src: "https://picsum.photos/id/20/800/600", title: "Study", year: "2023", className: "col-span-2 md:col-span-2 row-span-1" },
    { src: "https://picsum.photos/id/24/600/600", title: "Book", year: "2024", className: "col-span-1 md:col-span-1 row-span-1" },
    { src: "https://picsum.photos/id/28/600/600", title: "Forest", year: "2025", className: "col-span-1 md:col-span-1 row-span-1" },

    // Row 2
    { src: "https://picsum.photos/id/29/600/1200", title: "Climb", year: "2026", className: "col-span-1 md:col-span-1 row-span-2" },
    { src: "https://picsum.photos/id/42/1200/1200", title: "Coffee", year: "2027", className: "col-span-2 md:col-span-2 row-span-2" },
    { src: "https://picsum.photos/id/48/600/600", title: "Laptop", year: "2028", className: "col-span-1 md:col-span-1 row-span-1" },
    { src: "https://picsum.photos/id/56/600/600", title: "Lamp", year: "2029", className: "col-span-1 md:col-span-1 row-span-1" },

    // Row 4
    { src: "https://picsum.photos/id/60/1200/600", title: "Office", year: "2030", className: "col-span-2 md:col-span-2 row-span-1" },
    { src: "https://picsum.photos/id/65/1200/600", title: "Travel", year: "2031", className: "col-span-2 md:col-span-2 row-span-1" },
];

// --- GLITCH SHADER ---
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uGlitchIntensity;
uniform float uTime;
varying vec2 vUv;

// Simple pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  
  // Calculate Glitch Offsets
  float amount = uGlitchIntensity * 0.05; // Maximum shift amount
  float noise = random(vec2(floor(uv.y * 20.0), uTime)); // Horizontal strip noise
  
  // Apply RGB Shift based on noise and intensity
  vec4 color;
  
  if (uGlitchIntensity > 0.01) {
      if (noise < 0.2) {
         uv.x += amount * (random(vec2(uv.y, uTime)) - 0.5);
      }
      
      float shift = amount * 0.5;
      float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
      
      color = vec4(r, g, b, 1.0);
  } else {
      color = texture2D(uTexture, uv);
  }
  
  gl_FragColor = color;
}
`;

const GlitchImage = ({ src, isHovered }: { src: string, isHovered: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(src);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uGlitchIntensity: { value: 0.5 },
            uTime: { value: 0 }
        }),
        [texture]
    );

    useEffect(() => {
        if (!materialRef.current) return;

        gsap.to(materialRef.current.uniforms.uGlitchIntensity, {
            value: isHovered ? 0 : 0.5, // Stabilize on hover
            duration: 0.3,
            ease: "power2.out"
        });

    }, [isHovered]);

    return (
        <mesh ref={meshRef} scale={[1, 1, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
};


export function PixelGallery() {
    return (
        <section className="relative bg-black py-12 flex flex-col items-center justify-center">
            <div className="container mx-auto mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">System Glitch</h2>
                <p className="text-white/50 text-xs font-mono tracking-widest uppercase">Stabilize Visuals</p>
            </div>

            <div className="w-full px-4 md:px-8 max-w-[1600px] mx-auto">
                {/* Shared Canvas */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <Canvas eventSource={document.body} camera={{ position: [0, 0, 1] }}>
                        <Preload all />
                        <View.Port />
                    </Canvas>
                </div>

                {/* 
                    Tight Mosaic Grid 
                    Using auto-rows to define height unit (e.g. 200px)
                    Items span 1 or 2 rows.
                 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 auto-rows-[200px] w-full">
                    {images.map((img, i) => (
                        <GalleryItem key={i} item={img} />
                    ))}
                </div>
            </div>
            {/* Spacer to give bottom breathing room without being huge */}
            <div className="h-12" />
        </section>
    );
}

const GalleryItem = ({ item }: { item: { src: string, title: string, year: string, className?: string } }) => {
    const transformRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={transformRef}
            className={cn(
                "relative group overflow-hidden bg-transparent transition-all duration-300 w-full h-full",
                item.className
            )}
            style={{
                background: 'transparent' // Force transparent for WebGL
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* R3F View Component */}
            <View track={transformRef as React.MutableRefObject<HTMLElement>} className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <React.Suspense fallback={null}>
                    <GlitchImage src={item.src} isHovered={isHovered} />
                </React.Suspense>
            </View>

            {/* Overlay UI */}
            <div className={`absolute inset-0 z-20 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-lg font-bold text-white tracking-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                <p className="text-white/60 text-xs font-mono">{item.year}</p>
            </div>
        </div>
    )
}

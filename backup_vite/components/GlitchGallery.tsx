import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const images = [
    { src: "https://picsum.photos/id/1018/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1015/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1019/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1020/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1021/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1022/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1023/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1024/1920/1080/", aspect_ratio: 16/9 },
];

const widths = [500, 1000, 1600];
const ratios = [2.2, 4, 6, 8];

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

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123;
}

void main() {
  vec2 uv = vUv;
  
  float amount = uGlitchIntensity * 0.05;
  float noise = random(vec2(floor(uv.y * 20.0), uTime));
  
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
            value: isHovered ? 0 : 0.5,
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

const GlitchGalleryItem = ({ src, index }: { src: string, index: number }) => {
    const transformRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={transformRef}
            className="relative group overflow-hidden bg-transparent transition-all duration-300 w-full h-full"
            style={{
                background: 'transparent'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* R3F View Component */}
            <View track={transformRef as React.MutableRefObject<HTMLElement>} className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <React.Suspense fallback={null}>
                    <GlitchImage src={src} isHovered={isHovered} />
                </React.Suspense>
            </View>

            {/* Overlay UI */}
            <div className={`absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-white tracking-tight mb-1">Image {index + 1}</h3>
                    <p className="text-white/60 text-xs font-mono">GLITCH ACTIVE</p>
                </div>
            </div>
        </div>
    );
};

// Custom Gallery Component to replace next-gallery
const CustomGallery = ({ images, widths, ratios }: { 
    images: Array<{ src: string; aspectRatio: number; customElement?: React.ReactNode }>;
    widths: number[];
    ratios: number[];
}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full max-w-6xl mx-auto">
            {images.map((img, i) => (
                <div 
                    key={i} 
                    className="relative overflow-hidden"
                    style={{
                        aspectRatio: 1 // Force square aspect ratio like reference image
                    }}
                >
                    {img.customElement || (
                        <img 
                            src={img.src} 
                            alt={`Gallery image ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export function GlitchGallery() {
    return (
        <section className="relative bg-black py-8">
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">System Glitch</h2>
                <p className="text-white/50 text-xs font-mono tracking-widest uppercase">Stabilize Visuals</p>
            </div>

            <div className="px-4 max-w-6xl mx-auto">
                {/* Shared Canvas for glitch effects */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <Canvas eventSource={document.body} camera={{ position: [0, 0, 1] }}>
                        <Preload all />
                        <View.Port />
                    </Canvas>
                </div>

                {/* Gallery Container */}
                <div className="relative z-30">
                    <CustomGallery 
                        images={images.map((img, i) => ({
                            src: img.src,
                            aspectRatio: img.aspect_ratio,
                            customElement: <GlitchGalleryItem src={img.src} index={i} />
                        }))}
                        widths={widths}
                        ratios={ratios}
                    />
                </div>
            </div>

            {/* Minimal spacer */}
            <div className="h-8" />
        </section>
    );
}

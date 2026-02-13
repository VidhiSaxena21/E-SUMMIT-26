"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0a0a0a, 0.15);
        containerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const count = 300;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0xa855f7, // purple-500
            size: 0.015,
            transparent: true,
            opacity: 0.15,
            sizeAttenuation: true,
        });
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const handleResize = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const clock = new THREE.Clock();
        const tick = () => {
            const elapsed = clock.getElapsedTime();
            points.rotation.y = elapsed * 0.05;
            points.rotation.x = elapsed * 0.03;
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        return () => {
            window.removeEventListener("resize", handleResize);
            containerRef.current?.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 -z-10"
            aria-hidden="true"
        />
    );
}

"use client";

import { useEffect, useRef } from "react";

export function WaveMesh() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Handle high DPI displays for sharp rendering
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.scale(dpr, dpr);

        let animationFrameId: number;
        let time = 0;

        let isVisible = true;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!isVisible) {
                    isVisible = true;
                    render(); // Resume animation
                }
            } else {
                isVisible = false;
                cancelAnimationFrame(animationFrameId); // Pause animation
            }
        }, { threshold: 0 });

        observer.observe(canvas);

        const render = () => {
            if (!isVisible) return; // Prevent render loop if hidden

            const width = rect.width;
            const height = rect.height;

            // Clear canvas with a transparent background
            ctx.clearRect(0, 0, width, height);

            // Grid settings
            const cols = 28; // Number of vertical lines
            const rows = 20; // Number of horizontal lines
            const spacing = 50; // Spacing between points in 3D space

            const points: { x: number, y: number, scale: number, opacity: number }[][] = [];

            // 1. Calculate 3D points and project to 2D
            for (let z = 0; z < rows; z++) {
                points[z] = [];
                for (let x = 0; x < cols; x++) {

                    // Center the grid around 0
                    const posX = (x - cols / 2) * spacing;
                    const posZ = z * spacing;

                    // Mathematical topographical wave function
                    // Create a "valley" shape curving up on the sides
                    const distanceFromCenter = Math.abs(x - cols / 2);

                    // Combine a parabola (the valley) with a traveling sine wave
                    const structuralCurve = Math.pow(distanceFromCenter, 2) * 5.5; // Increased steepness
                    const animatedWave = Math.sin(posX * 0.02 - time * 1.5) * 25;
                    const secondaryWave = Math.cos(posZ * 0.02 - time) * 15;

                    const posY = structuralCurve + animatedWave + secondaryWave; // Removed static +50

                    // Perspective projection
                    const fov = 350; // Wider field of view
                    const zOffset = 50; // Push the camera back less
                    const scale = fov / (fov + posZ + zOffset);

                    const screenX = posX * scale + width / 2;
                    // Push the entire wave drawing UP by subtracting from height/2
                    const screenY = posY * scale + height / 2 - 20;

                    // Depth fading (far away points are more transparent)
                    const depthFade = Math.max(0, 1 - (z / (rows - 2)));
                    // Edge fading (fade out the sides to blend into the darkness)
                    const edgeFade = Math.max(0, 1 - (distanceFromCenter / (cols / 2)));

                    // Overall opacity combines depth and edges
                    const opacity = depthFade * edgeFade * 0.8;

                    points[z][x] = { x: screenX, y: screenY, scale, opacity };
                }
            }

            // 2. Map visual styles
            const drawLine = (p1: any, p2: any, opacity1: number, opacity2: number) => {
                if (opacity1 <= 0 && opacity2 <= 0) return;

                // Gradient line between the two points to handle depth opacity smoothly
                const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                grad.addColorStop(0, `rgba(13, 242, 108, ${opacity1 * 0.3})`);
                grad.addColorStop(1, `rgba(13, 242, 108, ${opacity2 * 0.3})`);

                ctx.strokeStyle = grad;
                ctx.lineWidth = Math.max(0.5, p1.scale * 1.5);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            };

            // 3. Draw the structural grid
            for (let z = 0; z < rows - 1; z++) {
                for (let x = 0; x < cols; x++) {
                    // Draw horizontal wire (connecting left to right)
                    if (x < cols - 1) {
                        drawLine(points[z][x], points[z][x + 1], points[z][x].opacity, points[z][x + 1].opacity);
                    }
                    // Draw vertical wire (connecting front to back)
                    drawLine(points[z][x], points[z + 1][x], points[z][x].opacity, points[z + 1][x].opacity);

                    // 4. Draw glowing intersection nodes
                    const p = points[z][x];
                    if (p.opacity > 0.05) {
                        ctx.fillStyle = `rgba(13, 242, 108, ${p.opacity * 0.9})`;
                        ctx.beginPath();
                        // Nodes get smaller in the distance
                        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
                        ctx.fill();

                        // Outer glow for the nodes
                        ctx.fillStyle = `rgba(13, 242, 108, ${p.opacity * 0.2})`;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            time += 0.015;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Handle window resize dynamically
        const handleResize = () => {
            const newRect = canvas.getBoundingClientRect();
            canvas.width = newRect.width * dpr;
            canvas.height = newRect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
                // Add a subtle CSS blur at the edges to make the graphic bleed cleanly into the background
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)'
            }}
        />
    );
}

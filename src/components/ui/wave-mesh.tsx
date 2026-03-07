"use client";

import { useEffect, useRef } from "react";

export function WaveMesh() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
        let rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        ctx.scale(dpr, dpr);

        let animationFrameId: number;
        let time = 0;
        let isVisible = true;
        let lastFrameTime = 0;
        const TARGET_FPS = 30; // Cap at 30fps — no visual difference for waves
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        // Reduced grid for performance
        const cols = 20;
        const rows = 14;
        const spacing = 55;

        const observer = new IntersectionObserver(
            (entries) => {
                const wasVisible = isVisible;
                isVisible = entries[0].isIntersecting;
                if (isVisible && !wasVisible) {
                    lastFrameTime = performance.now();
                    animationFrameId = requestAnimationFrame(render);
                }
                if (!isVisible) cancelAnimationFrame(animationFrameId);
            },
            { threshold: 0 }
        );

        observer.observe(canvas);

        // Pre-allocate point arrays to avoid GC pressure
        const points: { x: number; y: number; scale: number; opacity: number }[][] = Array.from(
            { length: rows },
            () => Array.from({ length: cols }, () => ({ x: 0, y: 0, scale: 0, opacity: 0 }))
        );

        const render = (now: number) => {
            if (!isVisible) return;

            // Throttle to target FPS
            const delta = now - lastFrameTime;
            if (delta < FRAME_INTERVAL) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }
            lastFrameTime = now - (delta % FRAME_INTERVAL);

            const width = rect.width;
            const height = rect.height;

            ctx.clearRect(0, 0, width, height);

            // Calculate points
            for (let z = 0; z < rows; z++) {
                for (let x = 0; x < cols; x++) {
                    const posX = (x - cols / 2) * spacing;
                    const posZ = z * spacing;
                    const distanceFromCenter = Math.abs(x - cols / 2);

                    const structuralCurve = distanceFromCenter * distanceFromCenter * 5.5;
                    const animatedWave = Math.sin(posX * 0.02 - time * 1.5) * 25;
                    const secondaryWave = Math.cos(posZ * 0.02 - time) * 15;
                    const posY = structuralCurve + animatedWave + secondaryWave;

                    const fov = 350;
                    const zOffset = 50;
                    const scale = fov / (fov + posZ + zOffset);

                    const p = points[z][x];
                    p.x = posX * scale + width / 2;
                    p.y = posY * scale + height / 2 - 20;

                    const depthFade = Math.max(0, 1 - z / (rows - 2));
                    const edgeFade = Math.max(0, 1 - distanceFromCenter / (cols / 2));
                    p.opacity = depthFade * edgeFade * 0.8;
                    p.scale = scale;
                }
            }

            // Batch draw lines with a single style where possible
            ctx.lineWidth = 1;
            for (let z = 0; z < rows - 1; z++) {
                for (let x = 0; x < cols; x++) {
                    const p = points[z][x];

                    // Horizontal line
                    if (x < cols - 1) {
                        const p2 = points[z][x + 1];
                        const avgOp = (p.opacity + p2.opacity) * 0.15;
                        if (avgOp > 0.01) {
                            ctx.strokeStyle = `rgba(13,242,108,${avgOp})`;
                            ctx.lineWidth = Math.max(0.5, p.scale * 1.2);
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }

                    // Vertical line
                    const pBelow = points[z + 1][x];
                    const avgOpV = (p.opacity + pBelow.opacity) * 0.15;
                    if (avgOpV > 0.01) {
                        ctx.strokeStyle = `rgba(13,242,108,${avgOpV})`;
                        ctx.lineWidth = Math.max(0.5, p.scale * 1.2);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(pBelow.x, pBelow.y);
                        ctx.stroke();
                    }

                    // Nodes — only draw visible ones, skip glow for perf
                    if (p.opacity > 0.08) {
                        ctx.fillStyle = `rgba(13,242,108,${p.opacity * 0.7})`;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 1.8 * p.scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            time += 0.015;
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.scale(dpr, dpr);
            }, 150); // Debounce resize
        };

        window.addEventListener("resize", handleResize);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
                maskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
                contain: "strict",
            }}
        />
    );
}

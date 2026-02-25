"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, PhoneOff, X } from "lucide-react";
import Vapi from "@vapi-ai/web";

type CallStatus = "idle" | "connecting" | "active" | "ending";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

export const VapiButton = () => {
    const [status, setStatus] = useState<CallStatus>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [micError, setMicError] = useState<string | null>(null);
    const vapiRef = useRef<Vapi | null>(null);

    useEffect(() => {
        const vapi = new Vapi(PUBLIC_KEY);
        vapiRef.current = vapi;

        vapi.on("call-start", () => setStatus("active"));
        vapi.on("call-end", () => {
            setStatus("idle");
            setIsMuted(false);
            setVolumeLevel(0);
        });
        vapi.on("volume-level", (level: number) => setVolumeLevel(level));
        vapi.on("error", (err: unknown) => {
            // Only log meaningful errors — the SDK emits empty {} errors
            // from the Daily.co WebRTC layer that are non-actionable
            const hasDetails =
                err &&
                typeof err === "object" &&
                Object.keys(err).length > 0;
            if (hasDetails) {
                console.warn("[Vapi]", err);
            }
            // Only reset to idle if we're not already in an active call
            // (some errors are transient mic-processing issues)
            setStatus((prev) => (prev === "active" ? prev : "idle"));
        });

        return () => {
            vapi.stop();
        };
    }, []);

    const startCall = useCallback(async () => {
        if (!vapiRef.current || status !== "idle") return;
        setMicError(null);

        // Request mic permission BEFORE starting the Vapi call
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Got permission — stop the test stream immediately
            stream.getTracks().forEach((t) => t.stop());
        } catch (err) {
            console.warn("[Vapi] Microphone access denied:", err);
            setMicError("Microphone access is required. Please allow it and try again.");
            setTimeout(() => setMicError(null), 5000);
            return;
        }

        setStatus("connecting");
        try {
            await vapiRef.current.start(ASSISTANT_ID);
        } catch (err) {
            console.error("[Vapi] Failed to start call:", err);
            setStatus("idle");
        }
    }, [status]);

    const endCall = useCallback(() => {
        if (!vapiRef.current) return;
        setStatus("ending");
        vapiRef.current.stop();
    }, []);

    const toggleMute = useCallback(() => {
        if (!vapiRef.current || status !== "active") return;
        const newMuted = !isMuted;
        vapiRef.current.setMuted(newMuted);
        setIsMuted(newMuted);
    }, [isMuted, status]);

    const isCallActive = status === "active" || status === "connecting";

    return (
        <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-3">
            {/* Mic permission error toast */}
            <AnimatePresence>
                {micError && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="rounded-lg bg-red-500/90 backdrop-blur-md px-4 py-2 text-sm text-white shadow-xl max-w-[260px]"
                    >
                        {micError}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls bar — shown when call is active */}
            <AnimatePresence>
                {status === "active" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="flex items-center gap-2 rounded-full bg-surface-400/90 backdrop-blur-md border border-white/10 px-3 py-2 shadow-2xl"
                    >
                        {/* Mute toggle */}
                        <button
                            onClick={toggleMute}
                            className={`p-2 rounded-full transition-colors ${isMuted
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                        </button>

                        {/* End call */}
                        <button
                            onClick={endCall}
                            className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                            aria-label="End call"
                        >
                            <PhoneOff size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={isCallActive ? endCall : startCall}
                disabled={status === "ending"}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isCallActive ? "End voice call" : "Start voice call"}
            >
                {/* Pulse rings when active */}
                {status === "active" && (
                    <>
                        <motion.span
                            className="absolute inset-0 rounded-full bg-cobalt/40"
                            animate={{
                                scale: [1, 1.4 + volumeLevel * 0.6],
                                opacity: [0.4, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />
                        <motion.span
                            className="absolute inset-0 rounded-full bg-cobalt/20"
                            animate={{
                                scale: [1, 1.8 + volumeLevel * 0.4],
                                opacity: [0.3, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                        />
                    </>
                )}

                {/* Connecting spinner */}
                {status === "connecting" && (
                    <motion.span
                        className="absolute inset-[-3px] rounded-full border-2 border-transparent border-t-cobalt"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                )}

                {/* Button surface */}
                <span
                    className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-cobalt/25 transition-colors duration-300 ${status === "active"
                        ? "bg-red-500 hover:bg-red-600"
                        : status === "connecting"
                            ? "bg-cobalt/80"
                            : "bg-cobalt hover:bg-cobalt-vivid"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {status === "idle" && (
                            <motion.span
                                key="phone"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Phone size={22} className="text-white" />
                            </motion.span>
                        )}
                        {status === "connecting" && (
                            <motion.span
                                key="connecting"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Phone size={22} className="text-white animate-pulse" />
                            </motion.span>
                        )}
                        {status === "active" && (
                            <motion.span
                                key="active"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <PhoneOff size={22} className="text-white" />
                            </motion.span>
                        )}
                        {status === "ending" && (
                            <motion.span
                                key="ending"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={22} className="text-white animate-spin" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>

                {/* Tooltip */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-surface-400/90 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {status === "idle" && "Talk to our AI assistant"}
                    {status === "connecting" && "Connecting…"}
                    {status === "active" && "End call"}
                    {status === "ending" && "Ending…"}
                </span>
            </motion.button>
        </div>
    );
};

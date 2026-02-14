"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalInput } from "@/components/ui/terminal-input";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ServiceAreaMap } from "@/components/ui/service-area-map";

const schema = z.object({
    name: z.string().min(2, "Name_Required"),
    email: z.string().email("Invalid_Email_Format"),
    timeline: z.enum(["1-3 Months", "3-6 Months", "ASAP"]),
    attachment: z.any().optional(), // FileList comes from input type="file"
    details: z.string().min(10, "Project_Details_Required"),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setStatus("submitting");
        try {
            let attachmentData = null;
            if (data.attachment && data.attachment.length > 0) {
                const file = data.attachment[0];
                const reader = new FileReader();
                attachmentData = await new Promise((resolve) => {
                    reader.onload = (e) => resolve({
                        name: file.name,
                        type: file.type,
                        content: (e.target?.result as string).split(',')[1] // Get base64 content
                    });
                    reader.readAsDataURL(file);
                });
            }

            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({ ...data, attachment: attachmentData }),
            });

            if (res.ok) {
                setStatus("success");
                reset();
            } else {
                setStatus("error");
            }
        } catch (e) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-surface-100 border border-white/10 p-8 md:p-12 rounded-lg relative overflow-hidden">
                    {/* Terminal Header */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-surface-200 border-b border-white/5 flex items-center px-4 gap-2 z-10">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="ml-4 font-mono text-xs text-white/30">user@digitalx-solutions:~</span>
                    </div>

                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            {/* Terminal Content (Form) */}
                            <h2 className="font-display text-4xl text-white mb-2">Initialize_Project</h2>
                            <p className="font-mono text-cobalt text-sm mb-12">
                                System ready. Awaiting input parameters...
                            </p>

                            {/* Distinct Email Display for user clarity */}
                            <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                                <p className="text-white/40 text-xs uppercase tracking-widest font-mono mb-2">Direct Communications Line</p>
                                <a href="mailto:digitalxsolutions8@gmail.com" className="text-cobalt hover:text-white transition-colors font-mono text-lg break-all">
                                    digitalxsolutions8@gmail.com
                                </a>
                            </div>

                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-20"
                                    >
                                        <div className="text-acid-green font-mono text-xl mb-4">
                                            ✓ Transmission_Complete
                                        </div>
                                        <p className="text-white/60">We will decode your request and respond shortly.</p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-8 text-sm text-cobalt hover:underline"
                                        >
                                            Reset Terminal
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1">
                                                <TerminalInput
                                                    label="IDENTIFIER (NAME)"
                                                    {...register("name")}
                                                    placeholder="John Doe"
                                                />
                                                {errors.name && <span className="text-red-500 text-xs font-mono">Build_Error: {errors.name.message}</span>}
                                            </div>

                                            <div className="space-y-1">
                                                <TerminalInput
                                                    label="COMM_CHANNEL (EMAIL)"
                                                    {...register("email")}
                                                    placeholder="john@company.com"
                                                />
                                                {errors.email && <span className="text-red-500 text-xs font-mono">Build_Error: {errors.email.message}</span>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex flex-col gap-2 font-mono">
                                                <label className="text-xs uppercase text-white/40 tracking-widest pl-1">{'>'} TIMELINE</label>
                                                <select
                                                    {...register("timeline")}
                                                    className="bg-surface-200 border-l-2 border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-cobalt focus:bg-surface-300 transition-all appearance-none rounded-none"
                                                >
                                                    <option value="ASAP">Now (Priority)</option>
                                                    <option value="1-3 Months">1-3 Months</option>
                                                    <option value="3-6 Months">3-6 Months</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-2 font-mono">
                                                <label className="text-xs uppercase text-white/40 tracking-widest pl-1">{'>'} ATTACH_FILE</label>
                                                <input
                                                    type="file"
                                                    {...register("attachment")}
                                                    className="bg-surface-200 border-l-2 border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt focus:bg-surface-300 transition-all rounded-none file:mr-4 file:py-1 file:px-2 file:rounded-none file:border-0 file:text-xs file:font-mono file:bg-cobalt/20 file:text-cobalt hover:file:bg-cobalt/30"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <TerminalInput
                                                label="EXECUTION_PLAN (DETAILS)"
                                                {...register("details")}
                                                placeholder="Describe your revenue goals..."
                                            />
                                            {errors.details && <span className="text-red-500 text-xs font-mono">Build_Error: {errors.details.message}</span>}
                                        </div>

                                        <div className="pt-4">
                                            <MagneticButton className="w-full md:w-auto">
                                                {status === "submitting" ? "Compiling..." : "Execute_Sequence"}
                                            </MagneticButton>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* End Terminal Content */}

                        <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-8 flex flex-col justify-end">
                            <div className="mb-4">
                                <h3 className="text-white text-sm font-mono uppercase tracking-widest mb-4">Service_Node_Active</h3>
                                <ServiceAreaMap />
                            </div>
                            <div className="space-y-4 font-mono text-xs text-white/40">
                                <p>Response Time: &lt;24h</p>
                                <p>Secure Transmission: TLS 1.3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

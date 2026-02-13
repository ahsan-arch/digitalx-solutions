"use client";

import { cn } from "@/lib/utils";

interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const TerminalInput = ({ label, className, ...props }: TerminalInputProps) => {
    return (
        <div className="flex flex-col gap-2 font-mono">
            <label className="text-xs uppercase text-white/40 tracking-widest pl-1">
                {'>'} {label}
            </label>
            <input
                className={cn(
                    "bg-surface-200 border-l-2 border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cobalt focus:bg-surface-300 transition-all",
                    className
                )}
                {...props}
            />
        </div>
    );
};

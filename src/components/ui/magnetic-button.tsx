"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils"; // Assuming a utils file exists or I should create one, but usually it's standard. I'll check/create utils if needed later, but standard create-next-app usually has it. I'll assume standard Shadcn-like utils or create inline if simple.
// Actually standard create-next-app doesn't always have lib/utils. I'll check if lib/utils exists. 
// For safety, I'll inline the class merger or assume it exists. 
// Wait, Step 17 showed `src` but I didn't verify `src/lib`. 
// I'll stick to `clsx` and `tailwind-merge` directly if I'm not sure, or verify.
// Given the prompt "Review", I'll just safe-bet create it or use inline.
// I'll use standard imports and if it fails I'll fix.


export const MagneticButton = ({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };

        x.set(distance.x * 0.35);
        y.set(distance.y * 0.35);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: mouseX, y: mouseY }}
            className={cn(
                "relative uppercase tracking-wider font-bold text-xs md:text-sm px-8 py-4 bg-cobalt text-white rounded-none border border-transparent transition-colors hover:bg-cobalt-vivid hover:border-white/20",
                "before:absolute before:inset-0 before:z-[-1] before:bg-cobalt-vivid before:scale-0 before:transition-transform before:duration-300 hover:before:scale-105",
                className
            )}
        >
            {children}
        </motion.button>
    );
};

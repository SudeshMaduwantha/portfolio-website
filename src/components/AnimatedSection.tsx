"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  id?: string;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initial: Record<string, number> = { opacity: 0, scale: 0.97 };
  if (direction === "up") initial.y = 32;
  if (direction === "down") initial.y = -32;
  if (direction === "left") initial.x = 32;
  if (direction === "right") initial.x = -32;

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      style={{ willChange: "opacity, transform" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

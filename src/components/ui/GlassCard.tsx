"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "green" | "gold" | "none";
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  padding = "md",
}: GlassCardProps) {
  const glowStyles = {
    green: "hover:shadow-glow",
    gold: "hover:shadow-glow-gold",
    none: "",
  };

  return (
    <motion.div
      variants={hover ? cardHover : undefined}
      initial={hover ? "rest" : undefined}
      whileHover={hover ? "hover" : undefined}
      className={cn(
        "glass rounded-2xl transition-all duration-300 border border-transparent",
        paddingStyles[padding],
        glowStyles[glow],
        hover && "hover:border-brand-green/8",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

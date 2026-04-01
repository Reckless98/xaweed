"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "gold" | "red" | "neutral";
  className?: string;
}

const variantStyles = {
  green: "bg-brand-green/15 text-brand-green border-brand-green/20",
  gold: "bg-brand-gold/15 text-brand-gold border-brand-gold/20",
  red: "bg-brand-red/15 text-brand-red border-brand-red/20",
  neutral: "bg-brand-smoke text-brand-cream border-brand-ash/30",
};

export function Badge({ children, variant = "green", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gold" | "line";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
}

const variantStyles = {
  primary:
    "bg-brand-green text-brand-black font-semibold hover:bg-brand-green-light shadow-glow hover:shadow-glow-lg",
  secondary:
    "bg-brand-smoke text-brand-ivory border border-brand-ash/50 hover:border-brand-green/50 hover:bg-brand-charcoal",
  ghost:
    "bg-transparent text-brand-ivory hover:bg-brand-smoke/50 hover:text-brand-green",
  gold: "bg-brand-gold text-brand-black font-semibold hover:bg-brand-gold-light shadow-glow-gold",
  line: "bg-[#06C755] text-white font-semibold hover:bg-[#05b34d] shadow-[0_0_20px_rgba(6,199,85,0.3)]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  external,
  icon,
}: ButtonProps) {
  const Tag: ElementType = href ? "a" : "button";
  const linkProps = href
    ? {
        href,
        ...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
      }
    : {};

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Tag
        {...linkProps}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Tag>
    </motion.div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  gradient?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  gradient = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {align === "center" && (
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-brand-green/40" />
            <div className="w-2 h-2 rounded-full bg-brand-green/60" />
            <div className="h-px w-8 bg-brand-green/40" />
          </div>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight",
          gradient ? "text-gradient-green" : "text-brand-ivory"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-brand-cream/60 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

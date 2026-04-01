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
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight",
          gradient ? "text-gradient-green" : "text-brand-ivory"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-brand-cream/60 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

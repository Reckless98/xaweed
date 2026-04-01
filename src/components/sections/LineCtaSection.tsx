"use client";

import { LineCTA } from "@/components/ui/LineCTA";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

export function LineCtaSection() {
  return (
    <AnimatedSection className="py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,199,85,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <AnimatedItem>
          <LineCTA variant="banner" />
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}

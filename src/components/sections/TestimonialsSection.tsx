"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { testimonials } from "@/data/content";
import { useI18n } from "@/lib/i18n";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t, locale } = useI18n();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-brand-obsidian/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeading
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard padding="lg" className="text-center">
                {/* Source badge */}
                {testimonials[active].source && (
                  <div className="flex justify-center mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-smoke/80 text-brand-cream/40">
                      {testimonials[active].source} Review
                    </span>
                  </div>
                )}
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: testimonials[active].rating }, (_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-brand-rasta-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xl text-brand-cream/70 leading-relaxed italic mb-6">
                  &ldquo;{locale === "th" && testimonials[active].textTh ? testimonials[active].textTh : testimonials[active].text}&rdquo;
                </p>
                <p className="text-brand-green font-semibold font-display">
                  {testimonials[active].name}
                </p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Dots + Google badge */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-brand-green w-8"
                      : "bg-brand-ash hover:bg-brand-cream/30 w-2.5"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="h-4 w-px bg-brand-ash/30" />
            <a
              href="https://weed.th/shop/8ad27a23-8b7b-408e-92c8-a5eeea6e48cb/nonthaburi/xaweed-shop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-brand-cream/40 hover:text-brand-green transition-colors"
            >
              <span className="text-brand-rasta-gold">★</span> 5.0 · 52 reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

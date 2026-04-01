"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { featuredProducts } from "@/data/products";

export function FeaturedProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 320;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  return (
    <section id="products" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.04)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Current Strains"
          subtitle="Hand-selected premium flowers & edibles, updated daily. Swipe to explore."
        />

        {/* Slider container */}
        <div className="relative group">
          {/* Navigation arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-brand-ivory hover:text-brand-green hover:glow-green transition-all opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-brand-ivory hover:text-brand-green hover:glow-green transition-all opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* Edge fades */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-brand-black to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-brand-black to-transparent z-10 pointer-events-none" />
          )}

          {/* Scrollable track */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-2 px-2"
          >
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="shrink-0 w-70 sm:w-80 snap-start"
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint for mobile */}
        <div className="flex justify-center mt-4 sm:hidden">
          <span className="text-xs text-brand-cream/30 flex items-center gap-1">
            <svg className="w-4 h-4 animate-bob" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            Swipe to see more
          </span>
        </div>
      </div>
    </section>
  );
}

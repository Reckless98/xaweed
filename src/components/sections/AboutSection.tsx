"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useI18n } from "@/lib/i18n";

const iconMap: Record<string, React.ReactNode> = {
  leaf: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

const highlightKeys = [
  { icon: "leaf", titleKey: "about.highlight.freshStrains" as const, descKey: "about.highlight.freshStrains.desc" as const },
  { icon: "star", titleKey: "about.highlight.premiumQuality" as const, descKey: "about.highlight.premiumQuality.desc" as const },
  { icon: "users", titleKey: "about.highlight.friendlyService" as const, descKey: "about.highlight.friendlyService.desc" as const },
  { icon: "shield", titleKey: "about.highlight.safeLegal" as const, descKey: "about.highlight.safeLegal.desc" as const },
];

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.04)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[t("about.p1"), t("about.p2"), t("about.p3")].map((paragraph, i) => (
              <p
                key={i}
                className="text-brand-cream/60 leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Shop image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden glow-rasta"
          >
            <Image
              src="/images/shop/shop-interior-counter.jpeg"
              alt="Inside Xaweed Shop — our counter and display"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-black/40 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Highlights grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {highlightKeys.map((h) => (
            <motion.div key={h.titleKey} variants={fadeInUp}>
              <GlassCard glow="green" className="h-full">
                <div className="text-brand-green mb-3">
                  {iconMap[h.icon] ?? iconMap.star}
                </div>
                <h3 className="text-lg font-bold text-brand-ivory font-display">
                  {t(h.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-brand-cream/50">
                  {t(h.descKey)}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

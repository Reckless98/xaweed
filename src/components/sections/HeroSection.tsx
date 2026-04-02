"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroText, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { lineConfig } from "@/lib/line";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-brand-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(205,0,0,0.03)_0%,transparent_50%)]" />

      {/* Animated organic orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-green/5 blur-[120px] animate-[orb-organic-1_15s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-brand-gold/5 blur-[100px] animate-[orb-organic-2_18s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-brand-rasta-red/3 blur-[80px] animate-[orb-organic-1_20s_ease-in-out_infinite_reverse]"
        aria-hidden="true"
      />

      {/* Smoke drift overlay */}
      <div
        className="absolute inset-0 opacity-30 animate-smoke-drift pointer-events-none hero-smoke-overlay"
        aria-hidden="true"
      />

      {/* Noise texture */}
      <div className="absolute inset-0 noise pointer-events-none" aria-hidden="true" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] hero-grid pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Logo */}
        <motion.div variants={heroText} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden animate-float glow-green">
              <Image
                src="/images/LOGO.jpg"
                alt="Xaweed Shop Logo"
                fill
                sizes="160px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Tag */}
        <motion.div variants={heroText} className="mb-6">
          <span className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full text-sm text-brand-green font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-glow" />
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={heroText}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-hero tracking-tight hero-heading-glow"
        >
          <span className="text-gradient-rasta">XAWEED</span>
          <br />
          <span className="text-brand-ivory text-3xl sm:text-4xl md:text-5xl font-display font-normal">
            {t("hero.subtitle")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroText}
          className="mt-6 text-lg sm:text-xl text-brand-cream/50 max-w-2xl mx-auto leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroText}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="line"
            size="lg"
            href={lineConfig.profileUrl}
            external
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            }
          >
            {t("hero.chatLine")}
          </Button>
          <Button variant="secondary" size="lg" href="/products">
            {t("hero.viewMenu")}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-brand-ash/30 flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2.5 rounded-full bg-brand-green/70"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rasta stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rasta-stripe-bg animate-rasta-stripe opacity-40" />
    </section>
  );
}

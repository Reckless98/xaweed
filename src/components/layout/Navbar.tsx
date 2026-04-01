"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { lineConfig } from "@/lib/line";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

const navKeys = [
  { key: "nav.home" as const, href: "/" },
  { key: "nav.menu" as const, href: "/products" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.contact" as const, href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass py-3 shadow-glass"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-green/20 group-hover:ring-brand-green/40 transition-all">
              <Image src="/images/LOGO.jpg" alt="Xaweed" fill sizes="40px" className="object-cover" />
            </div>
            <span className="text-xl font-bold font-display text-brand-ivory group-hover:text-brand-green transition-colors">
              XAWEED
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navKeys.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-brand-cream/60 hover:text-brand-green rounded-lg hover:bg-brand-smoke/50 transition-all duration-200"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Language toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-smoke/60 border border-brand-ash/20 hover:border-brand-green/30 transition-all text-sm"
              aria-label="Toggle language"
            >
              <span className={cn("transition-colors", locale === "th" ? "text-brand-green font-semibold" : "text-brand-cream/40")}>
                TH
              </span>
              <span className="text-brand-ash/40">/</span>
              <span className={cn("transition-colors", locale === "en" ? "text-brand-green font-semibold" : "text-brand-cream/40")}>
                EN
              </span>
            </button>
            <Button
              variant="line"
              size="sm"
              href={lineConfig.profileUrl}
              external
            >
              {t("hero.chatLine")}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile language toggle */}
            <button
              onClick={() => setLocale(locale === "th" ? "en" : "th")}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-brand-smoke/60 border border-brand-ash/20 text-xs"
              aria-label="Toggle language"
            >
              <span className={cn(locale === "th" ? "text-brand-green font-bold" : "text-brand-cream/40")}>TH</span>
              <span className="text-brand-ash/40">/</span>
              <span className={cn(locale === "en" ? "text-brand-green font-bold" : "text-brand-cream/40")}>EN</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-brand-ivory"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 bg-brand-ivory"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-brand-ivory"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-brand-black/80"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 glass-light p-8 flex flex-col gap-2"
            >
              <div className="h-16" />
              {navKeys.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-lg text-brand-cream/60 hover:text-brand-green rounded-xl hover:bg-brand-smoke/50 transition-all"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="mt-auto">
                <Button
                  variant="line"
                  size="lg"
                  href={lineConfig.profileUrl}
                  external
                  className="w-full"
                >
                  {t("hero.chatLine")}
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

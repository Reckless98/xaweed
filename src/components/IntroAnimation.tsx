"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Phase = "ember" | "smoke" | "logo" | "reveal" | "done";

function getInitialPhase(): Phase {
  if (typeof window !== "undefined" && sessionStorage.getItem("xaweed-intro-seen") === "true") {
    return "done";
  }
  return "ember";
}

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>(getInitialPhase);
  const showOverlay = phase !== "done";

  const startSequence = useCallback(() => {
    const timers = [
      setTimeout(() => setPhase("smoke"), 600),
      setTimeout(() => setPhase("logo"), 1600),
      setTimeout(() => setPhase("reveal"), 2800),
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem("xaweed-intro-seen", "true");
      }, 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!showOverlay) return;
    return startSequence();
  }, [showOverlay, startSequence]);

  if (!showOverlay) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-100 bg-brand-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Ember phase */}
            <AnimatePresence>
              {phase === "ember" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255,140,0,0.4)",
                        "0 0 50px rgba(255,140,0,0.8), 0 0 80px rgba(34,197,94,0.2)",
                        "0 0 20px rgba(255,140,0,0.4)",
                      ],
                    }}
                    transition={{ duration: 0.6, repeat: 1, ease: "easeInOut" }}
                    className="w-4 h-4 rounded-full bg-linear-to-br from-orange-400 to-red-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smoke phase */}
            <AnimatePresence>
              {phase === "smoke" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{
                        opacity: [0, 0.08, 0.04, 0],
                        scale: [0.2, 1.2 + i * 0.4],
                        y: [-10 - i * 25],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.12,
                        ease: "easeOut",
                      }}
                      style={{
                        width: 100 + i * 40,
                        height: 100 + i * 40,
                        background: `radial-gradient(circle, rgba(255,255,255,0.15), transparent)`,
                        filter: `blur(${25 + i * 12}px)`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo phase */}
            <AnimatePresence>
              {(phase === "logo" || phase === "reveal") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(34,197,94,0.3)",
                        "0 0 60px rgba(34,197,94,0.5), 0 0 100px rgba(255,215,0,0.15)",
                        "0 0 30px rgba(34,197,94,0.3)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src="/images/LOGO.jpg"
                      alt="Xaweed Shop"
                      fill
                      sizes="144px"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-5 text-xl sm:text-2xl font-hero text-gradient-rasta tracking-wide"
                  >
                    XAWEED SHOP
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showOverlay ? "opacity-0 pointer-events-none" : undefined}>
        {children}
      </div>
    </>
  );
}

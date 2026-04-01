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

// Generate smoke particle configs
const smokeParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 200,
  y: -(40 + Math.random() * 120),
  size: 60 + Math.random() * 100,
  blur: 20 + Math.random() * 30,
  delay: i * 0.06,
  duration: 1.8 + Math.random() * 0.6,
  opacity: 0.04 + Math.random() * 0.06,
}));

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>(getInitialPhase);
  const showOverlay = phase !== "done";

  const startSequence = useCallback(() => {
    const timers = [
      setTimeout(() => setPhase("smoke"), 500),
      setTimeout(() => setPhase("logo"), 1400),
      setTimeout(() => setPhase("reveal"), 2800),
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem("xaweed-intro-seen", "true");
      }, 3500),
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
            className="fixed inset-0 z-100 bg-brand-black flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Ember phase — small glowing dot */}
            <AnimatePresence>
              {phase === "ember" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(255,140,0,0.5)",
                        "0 0 40px rgba(255,140,0,0.8), 0 0 60px rgba(34,197,94,0.3)",
                        "0 0 15px rgba(255,140,0,0.5)",
                      ],
                    }}
                    transition={{ duration: 0.5, repeat: 1, ease: "easeInOut" }}
                    className="w-3 h-3 rounded-full bg-linear-to-br from-orange-400 to-red-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smoke phase — realistic rising smoke particles */}
            <AnimatePresence>
              {(phase === "smoke" || phase === "logo" || phase === "reveal") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {smokeParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute left-1/2 top-1/2 rounded-full"
                      initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, p.opacity, p.opacity * 0.6, 0],
                        scale: [0.2, 1, 1.4],
                        x: [0, p.x * 0.5, p.x],
                        y: [0, p.y * 0.5, p.y],
                      }}
                      transition={{
                        duration: p.duration,
                        delay: p.delay,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 0.3,
                      }}
                      style={{
                        width: p.size,
                        height: p.size,
                        marginLeft: -p.size / 2,
                        marginTop: -p.size / 2,
                        background: `radial-gradient(circle, rgba(200,200,200,0.12), rgba(100,100,100,0.04), transparent)`,
                        filter: `blur(${p.blur}px)`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo phase — clean fade in, no pulsing glow */}
            <AnimatePresence>
              {(phase === "logo" || phase === "reveal") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative flex flex-col items-center z-10"
                >
                  <motion.div
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      boxShadow: "0 0 40px rgba(34,197,94,0.25), 0 0 80px rgba(34,197,94,0.1)",
                    }}
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
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

      <motion.div
        initial={showOverlay ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: showOverlay ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className={showOverlay ? "pointer-events-none" : undefined}
      >
        {children}
      </motion.div>
    </>
  );
}

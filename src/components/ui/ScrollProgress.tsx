"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const scaleX = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const pct = total > 0 ? current / total : 0;
      setProgress(pct);
      scaleX.set(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scaleX]);

  if (progress < 0.01) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-60 h-0.75 scroll-progress origin-left"
      style={{ scaleX }}
    />
  );
}

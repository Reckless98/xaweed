"use client";

/**
 * WeedRain — sleek falling cannabis leaves with gentle parallax.
 * Uses pure CSS animations for maximum performance (no JS per-frame updates).
 * Each leaf is an SVG cannabis silhouette that drifts down with randomised
 * delay, speed, horizontal position, size, and subtle rotation.
 */

const NUM_LEAVES = 14;

interface LeafConfig {
  id: number;
  left: number;       // % horizontal position
  delay: number;      // s animation delay
  duration: number;   // s animation duration
  size: number;       // px
  opacity: number;
  drift: number;      // px horizontal sway
  rotation: number;   // deg end rotation
}

// Deterministic but varied leaf configs (no Math.random — SSR-safe)
const leaves: LeafConfig[] = Array.from({ length: NUM_LEAVES }, (_, i) => ({
  id: i,
  left: ((i * 17 + 5) % 95) + 2,                          // spread 2-97%
  delay: (i * 3.7) % 28,                                    // stagger 0-28s
  duration: 18 + ((i * 7) % 16),                            // 18-34s
  size: 14 + ((i * 5) % 12),                                // 14-26px
  opacity: 0.025 + ((i % 5) * 0.008),                       // 0.025-0.057
  drift: (i % 2 === 0 ? 1 : -1) * (20 + ((i * 3) % 30)),   // ±20-50px
  rotation: 180 + ((i * 47) % 540),                          // varied spins
}));

function CannabisLeafSVG({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M32 2c0 0-4 10-4 18s2 12 4 16c2-4 4-8 4-16S32 2 32 2z" opacity="0.9" />
      <path d="M32 14c-6-4-16-6-22 0 4 4 12 6 18 4-2 4-10 10-18 12 6 4 16 2 22-4 0 6-4 14-8 20 6-2 12-10 12-18 0 8 6 16 12 18-4-6-8-14-8-20 6 6 16 8 22 4-8-2-16-8-18-12 6 2 14 0 18-4-6-6-16-4-22 0 2 4 4 8 4 16C36 12 32 2 32 2z" />
      <path d="M32 40c-1 0-2 8-2 14l2 8 2-8c0-6-1-14-2-14z" opacity="0.7" />
    </svg>
  );
}

export function WeedRain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute weed-rain-leaf text-brand-green"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            opacity: leaf.opacity,
            ["--drift" as string]: `${leaf.drift}px`,
            ["--rotation" as string]: `${leaf.rotation}deg`,
          }}
        >
          <CannabisLeafSVG size={leaf.size} />
        </div>
      ))}
    </div>
  );
}

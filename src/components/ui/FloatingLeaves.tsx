"use client";

const leaves = [
  { id: 0, left: 5, delay: 0, size: 16, opacity: 0.04 },
  { id: 1, left: 15, delay: 7, size: 20, opacity: 0.03 },
  { id: 2, left: 30, delay: 14, size: 14, opacity: 0.05 },
  { id: 3, left: 45, delay: 4, size: 18, opacity: 0.03 },
  { id: 4, left: 60, delay: 20, size: 15, opacity: 0.04 },
  { id: 5, left: 75, delay: 10, size: 22, opacity: 0.03 },
  { id: 6, left: 88, delay: 17, size: 16, opacity: 0.05 },
];

export function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-leaf-drift"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            fontSize: `${leaf.size}px`,
            opacity: leaf.opacity,
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
}

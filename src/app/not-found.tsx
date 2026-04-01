import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold font-display text-gradient-green mb-4">
          404
        </h1>
        <p className="text-xl text-brand-cream/50 mb-8">
          This page went up in smoke.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-black font-semibold rounded-xl hover:bg-brand-green-light transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold font-display text-gradient-green mb-4">
          404
        </h1>
        <p className="text-xl text-brand-cream/50 mb-8">
          {t("notFound.description")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-black font-semibold rounded-xl hover:bg-brand-green-light transition-colors"
        >
          ← {t("notFound.goHome")}
        </Link>
      </div>
    </div>
  );
}

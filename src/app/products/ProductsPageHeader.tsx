"use client";

import { useI18n } from "@/lib/i18n";

export function ProductsPageHeader() {
  const { t } = useI18n();

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold font-hero text-gradient-rasta mb-2">
        {t("products.title")}
      </h1>
      <p className="text-brand-cream/50 text-lg mb-10">
        {t("products.subtitle")}
      </p>
    </>
  );
}

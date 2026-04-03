"use client";

import { useI18n } from "@/lib/i18n";
import { logout } from "../actions";

interface AdminHeaderProps {
  productCount: number;
  categoryCount: number;
  userEmail: string;
}

export function AdminHeader({ productCount, categoryCount, userEmail }: AdminHeaderProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
        <p className="text-brand-cream/50 text-sm mt-1">
          {productCount} {t("admin.products")} · {categoryCount} {t("admin.categories")} ·{" "}
          {t("admin.loggedInAs")} {userEmail}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={() => setLocale(locale === "th" ? "en" : "th")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-smoke/60 border border-brand-ash/20 hover:border-brand-green/30 transition-all text-sm"
          aria-label="Toggle language"
        >
          <span className={locale === "th" ? "text-brand-green font-semibold" : "text-brand-cream/40"}>
            TH
          </span>
          <span className="text-brand-ash/40">/</span>
          <span className={locale === "en" ? "text-brand-green font-semibold" : "text-brand-cream/40"}>
            EN
          </span>
        </button>
        <a
          href="/admin/products/new"
          className="px-4 py-2 rounded-lg bg-brand-green text-brand-black font-medium text-sm hover:bg-brand-green/90 transition-colors"
        >
          {t("admin.addProduct")}
        </a>
        <form>
          <button
            formAction={async () => {
              await logout();
            }}
            className="px-4 py-2 rounded-lg bg-brand-smoke text-brand-cream/70 text-sm hover:bg-brand-ash/50 transition-colors"
          >
            {t("admin.signOut")}
          </button>
        </form>
      </div>
    </div>
  );
}

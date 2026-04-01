"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useI18n } from "@/lib/i18n";
import type { ProductCategory } from "@/types";

export function ProductsPageContent() {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const { t, locale } = useI18n();

  const filterTabs: { label: string; value: ProductCategory | "all" }[] = [
    { label: t("products.all"), value: "all" },
    ...categories.map((c) => {
      const key = `category.${c.id}` as import("@/lib/i18n").TranslationKey;
      return { label: t(key) || c.name, value: c.id as ProductCategory };
    }),
  ];

  const filtered = useMemo(() => {
    let list = products;
    if (active !== "all") {
      list = list.filter((p) => p.category === active);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [active, search]);

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("products.search")}
          className="w-full max-w-md px-4 py-3 rounded-xl bg-brand-charcoal border border-brand-ash/20 text-brand-ivory placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-green/40 transition-colors"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === tab.value
                ? "bg-brand-green text-brand-black"
                : "bg-brand-smoke text-brand-cream/50 hover:bg-brand-ash/50 hover:text-brand-cream/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <p className="text-brand-cream/40 text-lg">
              {t("products.noResults")}{search ? ` "${search}"` : ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

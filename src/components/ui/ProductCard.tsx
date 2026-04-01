"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProductInquiryUrl } from "@/lib/line";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const strainColors: Record<string, "green" | "gold" | "red"> = {
  sativa: "green",
  indica: "gold",
  hybrid: "red",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t } = useI18n();
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-glow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-charcoal">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.strain && (
              <Badge variant={strainColors[product.strain] ?? "neutral"}>
                {product.strain}
              </Badge>
            )}
            {product.featured && <Badge variant="gold">{t("products.featured")}</Badge>}
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-3 right-3">
            <span className="glass-light px-3 py-1.5 rounded-lg text-sm font-bold text-brand-green">
              {product.priceDisplay}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-brand-ivory font-display group-hover:text-brand-green transition-colors duration-300">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm text-brand-cream/50 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Effects */}
          {product.effects && product.effects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.effects.slice(0, 3).map((effect) => (
                <span
                  key={effect}
                  className="text-xs px-2 py-0.5 rounded-md bg-brand-smoke/80 text-brand-cream/40"
                >
                  {effect}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-4">
            <Button
              variant="line"
              size="sm"
              href={getProductInquiryUrl(product.name)}
              external
              className={cn("w-full")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              }
            >
              {t("products.inquire")}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

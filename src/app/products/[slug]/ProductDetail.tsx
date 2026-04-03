"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProductInquiryUrl } from "@/lib/line";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/types";

const strainColors: Record<string, "green" | "gold" | "red"> = {
  sativa: "green",
  indica: "gold",
  hybrid: "red",
};

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const allImages = [product.image, ...(product.images ?? [])].filter(Boolean);
  const uniqueImages = [...new Set(allImages)];
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useI18n();

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-brand-cream/40" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand-cream/70 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-brand-cream/70 transition-colors"
            >
              {t("nav.menu")}
            </Link>
          </li>
          <li>/</li>
          <li className="text-brand-ivory">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-charcoal">
            <Image
              src={uniqueImages[selectedImage] || "/images/products/placeholder.jpeg"}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.strain && (
                <Badge variant={strainColors[product.strain] ?? "neutral"}>
                  {product.strain}
                </Badge>
              )}
              {product.featured && (
                <Badge variant="gold">{t("products.featured")}</Badge>
              )}
              {!product.inStock && (
                <Badge variant="red">Out of Stock</Badge>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {uniqueImages.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto hide-scrollbar">
              {uniqueImages.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    i === selectedImage
                      ? "border-brand-green"
                      : "border-transparent hover:border-brand-ash/40"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          {/* Category */}
          <span className="text-brand-green text-sm font-medium uppercase tracking-wider mb-2">
            {product.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-brand-ivory">
            {product.name}
          </h1>

          {product.brand && (
            <p className="mt-1 text-brand-cream/40 text-sm">
              by {product.brand}
            </p>
          )}

          {/* Price */}
          <div className="mt-6">
            <span className="text-2xl font-bold text-brand-green">
              {product.priceDisplay}
            </span>
          </div>

          {/* Price options if any */}
          {product.priceOptions && product.priceOptions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.priceOptions.map((opt) => (
                <span
                  key={opt.label}
                  className="px-3 py-1.5 rounded-lg bg-brand-smoke text-brand-cream/70 text-sm"
                >
                  {opt.label}: ฿{opt.price}
                </span>
              ))}
            </div>
          )}

          {/* Short description */}
          <p className="mt-6 text-brand-cream/60 text-lg leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Details grid */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {product.strain && (
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-brand-cream/40 uppercase tracking-wider">
                  Strain
                </p>
                <p className="mt-1 text-brand-ivory font-medium capitalize">
                  {product.strain}
                </p>
              </div>
            )}
            {product.thcContent && (
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-brand-cream/40 uppercase tracking-wider">
                  THC
                </p>
                <p className="mt-1 text-brand-ivory font-medium">
                  {product.thcContent}
                </p>
              </div>
            )}
            {product.weight && (
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-brand-cream/40 uppercase tracking-wider">
                  Weight
                </p>
                <p className="mt-1 text-brand-ivory font-medium">
                  {product.weight}
                </p>
              </div>
            )}
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-brand-cream/40 uppercase tracking-wider">
                Status
              </p>
              <p
                className={`mt-1 font-medium ${
                  product.inStock ? "text-brand-green" : "text-red-400"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>

          {/* Effects */}
          {product.effects && product.effects.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm text-brand-cream/40 uppercase tracking-wider mb-3">
                Effects
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.effects.map((effect) => (
                  <span
                    key={effect}
                    className="px-3 py-1.5 rounded-lg bg-brand-green/10 text-brand-green text-sm font-medium"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-brand-smoke text-brand-cream/40 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8">
            <Button
              variant="line"
              size="lg"
              href={getProductInquiryUrl(product.name)}
              external
              className="w-full sm:w-auto"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              }
            >
              {t("products.inquire")}
            </Button>
          </div>

          {/* Long description */}
          {product.longDescription && (
            <div className="mt-10 pt-8 border-t border-brand-ash/20">
              <h2 className="text-lg font-bold text-brand-ivory mb-4">
                About this product
              </h2>
              <p className="text-brand-cream/50 leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useI18n } from "@/lib/i18n";

const galleryImages = [
  { src: "/images/shop/shop-interior-counter.jpeg", alt: "Xaweed Shop counter" },
  { src: "/images/shop/shop-interior-shelves.jpeg", alt: "Xaweed Shop shelves" },
  { src: "/images/shop/shop-interior-shelves-wide.jpeg", alt: "Xaweed Shop wide view" },
  { src: "/images/shop/shop-ps5-gaming.jpeg", alt: "Gaming area with PS5" },
  { src: "/images/products/edibles/kanha-catalog-cover.jpeg", alt: "KANHA gummies catalog" },
  { src: "/images/products/strains/purple-gas-mask.jpeg", alt: "Purple Gas Mask strain" },
  { src: "/images/products/strains/supreme-oreoz.jpeg", alt: "Supreme Oreoz strain" },
  { src: "/images/products/vapes/bar9k-vapes.jpeg", alt: "M BAR 9K vapes" },
];

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { t } = useI18n();

  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,128,0,0.04)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          title={t("gallery.title")}
          subtitle={t("gallery.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              variants={fadeInUp}
              className={`relative cursor-pointer group overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-5 h-5 text-brand-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-square sm:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                fill
                sizes="90vw"
                className="object-contain rounded-xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-brand-ivory hover:text-brand-green transition-colors"
                aria-label="Close lightbox"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-brand-ivory hover:text-brand-green transition-colors"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox + 1) % galleryImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-brand-ivory hover:text-brand-green transition-colors"
                aria-label="Next image"
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-brand-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <h3 className="text-xl font-bold text-brand-ivory font-display group-hover:text-brand-green transition-colors">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-brand-cream/50 group-hover:text-brand-cream/70 transition-colors">
            {category.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-brand-green font-medium">
              {category.productCount} products
            </span>
            <motion.span
              className="text-brand-green text-sm"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-brand-green/30" />
      </div>
    </motion.div>
  );
}

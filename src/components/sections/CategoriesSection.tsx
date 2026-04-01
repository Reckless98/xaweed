"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { categories } from "@/data/products";

export function CategoriesSection() {
  return (
    <section id="categories" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-brand-obsidian/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Browse Categories"
          subtitle="From premium flower to accessories — everything you need for the perfect session."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

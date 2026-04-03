import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductsPageContent } from "@/components/sections/ProductsPageContent";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";
import { ProductsPageHeader } from "./ProductsPageHeader";
import { getProducts, getCategories } from "@/lib/supabase/queries";

import { siteMetadata } from "@/data/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "เมนูสินค้า | Products — Xaweed Shop",
  description: "เลือกดูสินค้าทั้งหมด — ดอกกัญชาพรีเมียม, ขนม KANHA, มวนสำเร็จ, บ้อง และอุปกรณ์เสริม อัพเดททุกวัน | Browse all products — premium flower, edibles, pre-rolls & accessories",
  openGraph: {
    title: "เมนูสินค้า | Products — Xaweed Shop",
    description: "ดอกกัญชาพรีเมียม, ขนม KANHA, มวนสำเร็จ, บ้อง และอุปกรณ์เสริม | Premium flower, edibles, pre-rolls & accessories",
    url: `${siteMetadata.url}/products`,
    siteName: "Xaweed Shop",
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630 }],
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <ProductsPageHeader />
          <ProductsPageContent products={products} categories={categories} />
        </div>
      </main>
      <Footer />
      <LineFloatingButton />
    </>
  );
}

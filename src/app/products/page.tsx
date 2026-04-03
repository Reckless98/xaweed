import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductsPageContent } from "@/components/sections/ProductsPageContent";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";
import { ProductsPageHeader } from "./ProductsPageHeader";
import { getProducts, getCategories } from "@/lib/supabase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "เมนูสินค้า | Xaweed Shop",
  description: "เลือกดูสินค้าทั้งหมด — ดอกกัญชาพรีเมียม, ขนม KANHA, มวนสำเร็จ, บ้อง และอุปกรณ์เสริม อัพเดททุกวัน",
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

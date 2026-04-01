import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductsPageContent } from "@/components/sections/ProductsPageContent";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse our full selection of premium cannabis strains, KANHA edibles, vapes, pre-rolls, and accessories.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-hero text-gradient-rasta mb-2">
            Full Menu
          </h1>
          <p className="text-brand-cream/50 text-lg mb-10">
            Browse our complete selection — flower, edibles, vapes &amp; more. Updated daily.
          </p>
          <ProductsPageContent />
        </div>
      </main>
      <Footer />
      <LineFloatingButton />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RastaDivider } from "@/components/ui/RastaDivider";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Xaweed Shop — premium cannabis, chill vibes, and friendly service in Nonthaburi.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-brand-black">
        <AboutSection />
        <RastaDivider className="my-0" />
        <GallerySection />
        <RastaDivider className="my-0" />
        <TestimonialsSection />
      </main>
      <Footer />
      <LineFloatingButton />
    </>
  );
}

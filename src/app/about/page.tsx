import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RastaDivider } from "@/components/ui/RastaDivider";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

import { siteMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | About Us — Xaweed Shop",
  description: "เรียนรู้เกี่ยวกับ Xaweed Shop — กัญชาพรีเมียม บรรยากาศชิลๆ บริการเป็นกันเอง จ.นนทบุรี | Learn about Xaweed Shop — premium cannabis, chill vibes, Nonthaburi",
  openGraph: {
    title: "เกี่ยวกับเรา | About Us — Xaweed Shop",
    description: "กัญชาพรีเมียม บรรยากาศชิลๆ บริการเป็นกันเอง จ.นนทบุรี | Premium cannabis, chill vibes in Nonthaburi",
    url: `${siteMetadata.url}/about`,
    siteName: "Xaweed Shop",
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630 }],
  },
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

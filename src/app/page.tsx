import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";
import { RastaDivider } from "@/components/ui/RastaDivider";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LineCtaSection } from "@/components/sections/LineCtaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

export default function Home() {
  return (
    <IntroAnimation>
      <Navbar />
      <FloatingLeaves />
      <main>
        <HeroSection />
        <RastaDivider className="my-0" />
        <FeaturedProductsSection />
        <RastaDivider className="my-0" />
        <CategoriesSection />
        <RastaDivider className="my-0" />
        <AboutSection />
        <GallerySection />
        <RastaDivider className="my-0" />
        <TestimonialsSection />
        <LineCtaSection />
        <RastaDivider className="my-0" />
        <ContactSection />
      </main>
      <Footer />
      <LineFloatingButton />
    </IntroAnimation>
  );
}

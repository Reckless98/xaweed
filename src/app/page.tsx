import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";
import { WeedRain } from "@/components/ui/WeedRain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
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
import { getFeaturedProducts, getCategories } from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <IntroAnimation>
      <Navbar />
      <ScrollProgress />
      <WeedRain />
      <main>
        <HeroSection />
        <RastaDivider className="my-0" />
        <FeaturedProductsSection products={featuredProducts} />
        <RastaDivider className="my-0" />
        <CategoriesSection categories={categories} />
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

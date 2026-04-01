import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit Xaweed Shop in Nonthaburi or reach us on LINE. Open daily 12:00-22:00.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-brand-black">
        <ContactSection />
      </main>
      <Footer />
      <LineFloatingButton />
    </>
  );
}

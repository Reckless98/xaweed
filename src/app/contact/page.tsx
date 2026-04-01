import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Xaweed Shop",
  description: "เยี่ยมชม Xaweed Shop จ.นนทบุรี หรือติดต่อเราผ่าน LINE เปิดทุกวัน 12:00-22:00",
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

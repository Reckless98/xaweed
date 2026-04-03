import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";

import { siteMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Contact — Xaweed Shop",
  description: "เยี่ยมชม Xaweed Shop จ.นนทบุรี หรือติดต่อเราผ่าน LINE เปิดทุกวัน 12:00-22:00 | Visit us or contact via LINE, open daily 12-10pm",
  openGraph: {
    title: "ติดต่อเรา | Contact — Xaweed Shop",
    description: "เยี่ยมชม Xaweed Shop จ.นนทบุรี หรือติดต่อเราผ่าน LINE เปิดทุกวัน 12:00-22:00",
    url: `${siteMetadata.url}/contact`,
    siteName: "Xaweed Shop",
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630 }],
  },
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

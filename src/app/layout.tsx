import type { Metadata } from "next";
import { Inter, Space_Grotesk, Permanent_Marker, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/data/site";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: "Xaweed Shop — ร้านกัญชาพรีเมียม นนทบุรี | Premium Cannabis Nonthaburi",
    template: `%s | Xaweed Shop`,
  },
  description:
    "ร้านกัญชาพรีเมียม นนทบุรี ปากเกร็ด สายพันธุ์คุณภาพ ขนม KANHA บุหรี่ไฟฟ้า บ้อง อุปกรณ์เสริม สั่งผ่าน LINE ส่งเร็ว | Premium cannabis shop Nonthaburi",
  keywords: [
    "ร้านกัญชา",
    "กัญชานนทบุรี",
    "ร้านกัญชาปากเกร็ด",
    "Xaweed",
    "cannabis shop Nonthaburi",
    "weed shop Thailand",
    "KANHA gummies",
    "premium cannabis",
    "บุหรี่ไฟฟ้า",
    "บ้อง",
    "กัญชาพรีเมียม",
    "สายพันธุ์กัญชา",
    "cannabis strains Thailand",
    "ร้านขายกัญชา",
    "กัญชาใกล้ฉัน",
    "weed delivery Nonthaburi",
  ],
  openGraph: {
    title: "Xaweed Shop — ร้านกัญชาพรีเมียม นนทบุรี",
    description:
      "สายพันธุ์คุณภาพเปลี่ยนทุกวัน ขนม KANHA บุหรี่ไฟฟ้า บ้อง บรรยากาศชิลๆ | Premium cannabis, fresh daily in Nonthaburi",
    url: siteMetadata.url,
    siteName: "Xaweed Shop",
    locale: "th_TH",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Xaweed Shop — ร้านกัญชาพรีเมียม นนทบุรี",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xaweed Shop — ร้านกัญชาพรีเมียม นนทบุรี",
    description:
      "สายพันธุ์คุณภาพเปลี่ยนทุกวัน ขนม KANHA บุหรี่ไฟฟ้า บ้อง บรรยากาศชิลๆ | Premium cannabis Nonthaburi",
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/LOGO.jpg",
    apple: "/images/LOGO.jpg",
  },
  alternates: {
    canonical: siteMetadata.url,
  },
  verification: {},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Xaweed Shop",
  alternateName: "ร้าน Xaweed",
  description:
    "ร้านกัญชาพรีเมียม นนทบุรี ปากเกร็ด สายพันธุ์คุณภาพ ขนม KANHA บุหรี่ไฟฟ้า บ้อง อุปกรณ์เสริม | Premium cannabis shop Nonthaburi",
  url: siteMetadata.url,
  telephone: "+66659156189",
  address: {
    "@type": "PostalAddress",
    streetAddress: "25/460 Soi Si Chai Thong 23, Bang Talat",
    addressLocality: "Pak Kret",
    addressRegion: "Nonthaburi",
    postalCode: "11120",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.9134,
    longitude: 100.5249,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "12:00",
    closes: "22:00",
  },
  image: `${siteMetadata.url}/images/LOGO.jpg`,
  priceRange: "฿฿",
  currenciesAccepted: "THB",
  paymentAccepted: "Cash, LINE Pay",
  areaServed: {
    "@type": "City",
    name: "Nonthaburi",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cannabis Products",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Premium Cannabis Flower" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "KANHA Edibles" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Vapes & Accessories" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Acrylic Bongs" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "เวลาเปิด-ปิดร้าน Xaweed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "เปิดทุกวัน 12:00 - 22:00 (เวลาอาจเปลี่ยนแปลงในวันหยุดนักขัตฤกษ์)",
      },
    },
    {
      "@type": "Question",
      name: "Xaweed มีบริการจัดส่งไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "มีบริการจัดส่ง! แอดไลน์ @688ndwgr เพื่อสั่งซื้อและจัดส่ง",
      },
    },
    {
      "@type": "Question",
      name: "สั่งซื้อผ่าน LINE ได้ไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ได้เลย! แอดเพื่อน LINE @688ndwgr เพื่อดูเมนู สอบถาม และสั่งซื้อได้ตลอดเวลา",
      },
    },
    {
      "@type": "Question",
      name: "ร้าน Xaweed มีห้องส่วนตัวไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "มีห้องสูบส่วนตัวให้บริการ เพื่อความสบายและเป็นส่วนตัวมากขึ้น",
      },
    },
    {
      "@type": "Question",
      name: "ร้าน Xaweed อยู่ที่ไหน?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "25/460 ซ สี่ไชยทอง 23 บางตลาด อำเภอปากเกร็ด นนทบุรี 11120 มีที่จอดรถ",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${permanentMarker.variable} ${notoSansThai.variable} antialiased bg-brand-black text-brand-ivory`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

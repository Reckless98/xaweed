import type { Metadata } from "next";
import { Inter, Space_Grotesk, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    default: siteMetadata.title,
    template: `%s | Xaweed`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: "Xaweed Shop",
    locale: siteMetadata.locale,
    type: "website",
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Xaweed Shop — Premium Cannabis & Lifestyle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/LOGO.jpg",
    apple: "/images/LOGO.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Xaweed Shop",
  description: siteMetadata.description,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${permanentMarker.variable} antialiased bg-brand-black text-brand-ivory`}
      >
        {children}
      </body>
    </html>
  );
}

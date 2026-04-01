import type { SiteMetadata, NavItem } from "@/types";

export const siteMetadata: SiteMetadata = {
  title: "Xaweed Shop — Premium Cannabis & Lifestyle",
  description:
    "Premium cannabis, fresh strains daily, pre-rolls, accessories & chill vibes. Visit us in Nonthaburi or order via LINE.",
  ogImage: "/brand/og-image.jpg",
  url: "https://xaweed.com",
  locale: "en_US",
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

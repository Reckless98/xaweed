export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  longDescription: string;
  priceDisplay: string;
  priceValue: number;
  image: string;
  images?: string[];
  tags: string[];
  featured: boolean;
  inStock: boolean;
  lineInquiryText: string;
  strain?: StrainType;
  thcContent?: string;
  weight?: string;
  effects?: string[];
  code?: string;
  brand?: string;
  priceOptions?: { label: string; price: number }[];
}

export type StrainType = "sativa" | "indica" | "hybrid";

export type ProductCategory =
  | "flower"
  | "pre-roll"
  | "edible"
  | "accessory"
  | "concentrate"
  // | "vape" // removed — no longer legal
  | "bong";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface BrandStory {
  title: string;
  subtitle: string;
  paragraphs: string[];
  image?: string;
  highlights: BrandHighlight[];
}

export interface BrandHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  phone: string;
  lineId: string;
  address: string;
  addressThai: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: BusinessHours[];
  amenities: string[];
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
  active: boolean;
  bgGradient?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteMetadata {
  title: string;
  description: string;
  ogImage: string;
  url: string;
  locale: string;
}

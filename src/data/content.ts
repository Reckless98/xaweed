import type { BrandStory, ContactInfo, FAQ, PromoBanner } from "@/types";

export interface Testimonial {
  name: string;
  text: string;
  textTh?: string;
  rating: number;
  source?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Kiaam K.",
    text: "My favorite dispensary in Thailand by far, very good prices and high quality weed. If you are coming from USA you will love the prices. The owners are very cool and fully know their product.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Pornpisek S.",
    text: "Good prices, friendly vibes. Will definitely come back next time I'm in the area.",
    textTh: "ราคาดี อัทยาศัยดี วันหลังผ่านมาจะมาซํ้าอีก",
    rating: 5,
    source: "Google",
  },
  {
    name: "Karma H.",
    text: "Amazing quality! You get a lot and the budget is very affordable. Worth it every time.",
    textTh: "ของดีมากครับ ได้เยอะงบเเตะต้องได้ คุ้มๆ",
    rating: 5,
    source: "Google",
  },
  {
    name: "Apirak A.",
    text: "This shop is ridiculously cheap for the quality. They have tons of choices, great value beyond the price. The owner gives amazing recommendations. Easy parking too — right on the street.",
    textTh: "ร้านนี้ราคาถูกมากราคาจับต้องได้ครับของให้เลือกเยอะแล้วก็คุณภาพดีเกินราคามากครับ",
    rating: 5,
    source: "Google",
  },
  {
    name: "Pch M.",
    text: "Good quality, always fragrant. Chill shop, quality stuff.",
    textTh: "ของดีครับ หอมตลอด ร้านชิวมากคับ ของมีคุณภาพ",
    rating: 5,
    source: "Google",
  },
  {
    name: "Siga",
    text: "Good weed with reasonable price. The owner is very kind and friendly.",
    rating: 5,
    source: "Google",
  },
];

export const brandStory: BrandStory = {
  title: "The Xaweed Experience",
  subtitle: "Premium Cannabis & Chill Vibes Since Day One",
  paragraphs: [
    "Xaweed Shop was born from a simple belief: everyone deserves access to premium-quality cannabis in a welcoming, no-pressure environment.",
    "We hand-select every strain for quality, flavour, and effect. From frosty indoor sativas to smooth indica blends, our menu is curated for those who know what they want — and those still discovering it.",
    "Walk in, chill out, and let our friendly team guide you to your perfect match. Whether you're a connoisseur or a curious first-timer, you'll feel right at home.",
  ],
  highlights: [
    {
      icon: "leaf",
      title: "Fresh Strains Daily",
      description: "Constantly rotating menu with the best from local and international growers.",
    },
    {
      icon: "star",
      title: "Premium Quality",
      description: "Every product is tested and curated for maximum quality and experience.",
    },
    {
      icon: "users",
      title: "Friendly Service",
      description: "Chill vibes and knowledgeable staff ready to help you find your strain.",
    },
    {
      icon: "shield",
      title: "Safe & Legal",
      description: "Fully compliant with Thai cannabis regulations. Your trust is our priority.",
    },
  ],
};

export const contactInfo: ContactInfo = {
  phone: "0659156189",
  lineId: "@688ndwgr",
  address:
    "Nonthaburi Pakkred 25/460, Soi Si Chai Thong 23, Bang Talat, Pak Kret, Nonthaburi 11120",
  addressThai:
    "25/460 ซ สี่ไชยทอง 23 บางตลาด อำเภอปากเกร็ด นนทบุรี 11120",
  googleMapsUrl:
    "https://maps.google.com/?q=Xaweed+Shop+Nonthaburi+Pakkred",
  coordinates: {
    lat: 13.9134,
    lng: 100.5249,
  },
  hours: [
    { day: "Monday", open: "12:00", close: "22:00" },
    { day: "Tuesday", open: "12:00", close: "22:00" },
    { day: "Wednesday", open: "12:00", close: "22:00" },
    { day: "Thursday", open: "12:00", close: "22:00" },
    { day: "Friday", open: "12:00", close: "22:00" },
    { day: "Saturday", open: "12:00", close: "22:00" },
    { day: "Sunday", open: "12:00", close: "22:00" },
  ],
  amenities: [
    "Private rooms available",
    "Free Wi-Fi",
    "Parking available",
    "Smoking OK",
    "Power outlets available",
  ],
};

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What are your opening hours?",
    answer:
      "We're open daily from 12:00 to 22:00. Hours may vary on holidays.",
    category: "general",
  },
  {
    id: "2",
    question: "Do you offer delivery?",
    answer:
      "Yes! We offer delivery through our store. Contact us on LINE to place a delivery order.",
    category: "orders",
  },
  {
    id: "3",
    question: "Can I order via LINE?",
    answer:
      "Absolutely! Add us on LINE at @688ndwgr to browse our menu, ask questions, and place orders anytime.",
    category: "orders",
  },
  {
    id: "4",
    question: "Do you have private rooms?",
    answer:
      "Yes, we have private smoking rooms available for a more comfortable experience.",
    category: "amenities",
  },
  {
    id: "5",
    question: "Is parking available?",
    answer:
      "Yes, parking is available near our shop for customer convenience.",
    category: "amenities",
  },
];

export const promoBanners: PromoBanner[] = [
  {
    id: "welcome",
    title: "New Strains Drop Weekly",
    subtitle: "Follow us on LINE to get notified of fresh drops and exclusive deals.",
    ctaText: "Join on LINE",
    ctaLink: "#",
    active: true,
    bgGradient: "from-brand-green-muted/20 to-brand-charcoal",
  },
];

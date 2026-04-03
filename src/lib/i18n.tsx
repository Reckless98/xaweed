"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "th" | "en";

const translations = {
  // ─── Navigation ─────────────────────────────────────
  "nav.home": { th: "หน้าแรก", en: "Home" },
  "nav.menu": { th: "เมนูสินค้า", en: "Menu" },
  "nav.about": { th: "เกี่ยวกับเรา", en: "About" },
  "nav.contact": { th: "ติดต่อเรา", en: "Contact" },

  // ─── Hero Section ───────────────────────────────────
  "hero.badge": { th: "สินค้าพรีเมียม & ไลฟ์สไตล์", en: "Premium Cannabis & Lifestyle" },
  "hero.subtitle": { th: "Premium Cannabis Shop", en: "Premium Cannabis Shop" },
  "hero.description": {
    th: "สายพันธุ์คุณภาพเปลี่ยนทุกวัน ขนม KANHA บ้อง อุปกรณ์เสริม บรรยากาศชิลๆ บริการเป็นกันเอง ร้านกัญชาของคุณในนนทบุรี",
    en: "Fresh strains daily. KANHA edibles. Bongs & accessories. Chill vibes & friendly service. Your cannabis destination in Nonthaburi.",
  },
  "hero.chatLine": { th: "แชทผ่าน LINE", en: "Chat on LINE" },
  "hero.viewMenu": { th: "ดูเมนูทั้งหมด", en: "View Full Menu" },

  // ─── Featured Products ──────────────────────────────
  "featured.title": { th: "สายพันธุ์ยอดนิยม", en: "Current Strains" },
  "featured.subtitle": {
    th: "ดอกไม้พรีเมียมคัดมือ อัพเดททุกวัน เลื่อนเพื่อดูเพิ่มเติม",
    en: "Hand-selected premium flowers & edibles, updated daily. Swipe to explore.",
  },
  "featured.swipeHint": { th: "เลื่อนเพื่อดูเพิ่มเติม", en: "Swipe to see more" },

  // ─── Categories ─────────────────────────────────────
  "categories.title": { th: "หมวดหมู่สินค้า", en: "Browse Categories" },
  "categories.subtitle": {
    th: "ตั้งแต่ดอกพรีเมียมไปจนถึงอุปกรณ์เสริม — ครบทุกอย่างสำหรับเซสชั่นที่สมบูรณ์แบบ",
    en: "From premium flower to accessories — everything you need for the perfect session.",
  },

  // ─── About ──────────────────────────────────────────
  "about.title": { th: "ประสบการณ์ Xaweed", en: "The Xaweed Experience" },
  "about.subtitle": { th: "กัญชาพรีเมียม & ไวบ์ชิลๆ ตั้งแต่วันแรก", en: "Premium Cannabis & Chill Vibes Since Day One" },
  "about.p1": {
    th: "ร้าน Xaweed เกิดจากความเชื่อง่ายๆ: ทุกคนสมควรได้เข้าถึงกัญชาคุณภาพพรีเมียมในบรรยากาศที่อบอุ่นและไม่กดดัน",
    en: "Xaweed Shop was born from a simple belief: everyone deserves access to premium-quality cannabis in a welcoming, no-pressure environment.",
  },
  "about.p2": {
    th: "เราคัดเลือกทุกสายพันธุ์ด้วยมือเพื่อคุณภาพ รสชาติ และเอฟเฟกต์ ตั้งแต่ซาทิว่าอินดอร์ที่ฟรอสตี้ไปจนถึงอินดิก้าที่นุ่มลื่น เมนูของเราคัดสรรมาเพื่อคนที่รู้ว่าตัวเองต้องการอะไร และคนที่กำลังค้นหา",
    en: "We hand-select every strain for quality, flavour, and effect. From frosty indoor sativas to smooth indica blends, our menu is curated for those who know what they want — and those still discovering it.",
  },
  "about.p3": {
    th: "เดินเข้ามา ชิลๆ แล้วให้ทีมงานที่เป็นกันเองของเราแนะนำให้คุณเจอสิ่งที่ใช่ ไม่ว่าคุณจะเป็นคอกัญชาหรือมือใหม่ที่อยากลอง คุณจะรู้สึกเหมือนอยู่บ้าน",
    en: "Walk in, chill out, and let our friendly team guide you to your perfect match. Whether you're a connoisseur or a curious first-timer, you'll feel right at home.",
  },
  "about.highlight.freshStrains": { th: "สายพันธุ์ใหม่ทุกวัน", en: "Fresh Strains Daily" },
  "about.highlight.freshStrains.desc": {
    th: "เมนูหมุนเวียนอยู่เสมอ ดีที่สุดจากผู้ปลูกทั้งในและต่างประเทศ",
    en: "Constantly rotating menu with the best from local and international growers.",
  },
  "about.highlight.premiumQuality": { th: "คุณภาพพรีเมียม", en: "Premium Quality" },
  "about.highlight.premiumQuality.desc": {
    th: "ทุกผลิตภัณฑ์ผ่านการทดสอบและคัดสรรเพื่อคุณภาพและประสบการณ์สูงสุด",
    en: "Every product is tested and curated for maximum quality and experience.",
  },
  "about.highlight.friendlyService": { th: "บริการเป็นกันเอง", en: "Friendly Service" },
  "about.highlight.friendlyService.desc": {
    th: "บรรยากาศชิลๆ พนักงานมีความรู้ พร้อมช่วยคุณหาสายพันธุ์ที่ใช่",
    en: "Chill vibes and knowledgeable staff ready to help you find your strain.",
  },
  "about.highlight.safeLegal": { th: "ปลอดภัย & ถูกกฎหมาย", en: "Safe & Legal" },
  "about.highlight.safeLegal.desc": {
    th: "ปฏิบัติตามกฎระเบียบกัญชาของไทยอย่างเต็มที่ ความไว้วางใจของคุณคือสิ่งสำคัญ",
    en: "Fully compliant with Thai cannabis regulations. Your trust is our priority.",
  },

  // ─── Gallery ────────────────────────────────────────
  "gallery.title": { th: "ภายใน Xaweed", en: "Inside Xaweed" },
  "gallery.subtitle": { th: "ชมร้านของเรา สินค้า และบรรยากาศ", en: "Take a look at our shop, our products, and the vibe." },

  // ─── Testimonials ───────────────────────────────────
  "testimonials.title": { th: "รีวิวจากลูกค้า", en: "What Our Customers Say" },
  "testimonials.subtitle": { th: "ลูกค้าประจำของเราพูดอะไรบ้าง", en: "Real reviews from our regulars." },

  // ─── LINE CTA ───────────────────────────────────────
  "lineCta.title": { th: "สั่งง่ายผ่าน LINE", en: "Order Easily via LINE" },
  "lineCta.subtitle": {
    th: "แอดเพื่อน LINE เพื่อดูเมนู สอบถาม และสั่งซื้อได้ตลอดเวลา",
    en: "Add us on LINE to browse, ask questions, and order anytime.",
  },
  "lineCta.addFriend": { th: "แอดเพื่อน LINE", en: "Add Friend on LINE" },

  // ─── Contact ────────────────────────────────────────
  "contact.title": { th: "เยี่ยมชมร้าน", en: "Visit Us" },
  "contact.subtitle": { th: "แวะมาชิล ดูสายพันธุ์ และสัมผัสบรรยากาศ", en: "Come chill, browse strains, and enjoy the vibe." },
  "contact.shopName": { th: "Xaweed Shop", en: "Xaweed Shop" },
  "contact.address": { th: "ที่อยู่", en: "Address" },
  "contact.hours": { th: "เวลาเปิด", en: "Hours" },
  "contact.hoursValue": { th: "เปิดทุกวัน 12:00 – 22:00", en: "Daily 12:00 – 22:00" },
  "contact.phone": { th: "โทรศัพท์", en: "Phone" },
  "contact.amenities": { th: "สิ่งอำนวยความสะดวก", en: "Amenities" },
  "contact.getDirections": { th: "นำทาง", en: "Get Directions" },

  // ─── Products Page ──────────────────────────────────
  "products.title": { th: "เมนูทั้งหมด", en: "Full Menu" },
  "products.subtitle": {
    th: "เลือกดูสินค้าทั้งหมด — ดอก, ขนม, บ้อง & อื่นๆ อัพเดททุกวัน",
    en: "Browse our complete selection — flower, edibles, bongs & more. Updated daily.",
  },
  "products.search": { th: "ค้นหาสายพันธุ์ ขนม อุปกรณ์...", en: "Search strains, edibles, accessories..." },
  "products.noResults": { th: "ไม่พบสินค้า", en: "No products found" },
  "products.all": { th: "ทั้งหมด", en: "All" },
  "products.inquire": { th: "สอบถามผ่าน LINE", en: "Inquire on LINE" },
  "products.featured": { th: "ยอดนิยม", en: "Featured" },

  // ─── Category names ─────────────────────────────────
  "category.flower": { th: "ดอก", en: "Flower" },
  "category.flower.desc": { th: "สายพันธุ์พรีเมียมอินดอร์ & เอาท์ดอร์ ใหม่ทุกวัน", en: "Premium indoor & outdoor strains, fresh daily" },
  "category.edible": { th: "ขนม", en: "Edibles" },
  "category.edible.desc": { th: "KANHA กัมมี่ & ขนมที่มีสารสกัด", en: "KANHA infused gummies & treats" },
  // "category.vape" and "category.vape.desc" removed — vapes no longer legal
  "category.pre-roll": { th: "มวนสำเร็จ", en: "Pre-Rolls" },
  "category.pre-roll.desc": { th: "จอยท์มวนมือ พร้อมสูบ", en: "Hand-rolled joints, ready to smoke" },
  "category.accessory": { th: "อุปกรณ์เสริม", en: "Accessories" },
  "category.accessory.desc": { th: "เครื่องบด กระดาษ ไปป์ & อื่นๆ", en: "Grinders, papers, pipes & more" },
  "category.bong": { th: "บ้อง", en: "Bongs" },
  "category.bong.desc": { th: "บ้องอะคริลิก & แก้ว คุณภาพสูง", en: "Premium acrylic & glass bongs" },

  // ─── Footer ─────────────────────────────────────────
  "footer.description": {
    th: "กัญชาพรีเมียม สายพันธุ์ใหม่ทุกวัน มวนสำเร็จ & อุปกรณ์เสริม บรรยากาศชิลๆ บริการเป็นกันเองในนนทบุรี",
    en: "Premium cannabis, fresh strains daily, pre-rolls & accessories. Chill vibes and friendly service in Nonthaburi.",
  },
  "footer.navigation": { th: "นำทาง", en: "Navigation" },
  "footer.contact": { th: "ติดต่อ", en: "Contact" },
  "footer.rights": { th: "สงวนลิขสิทธิ์ทั้งหมด", en: "All rights reserved" },

  // ─── Amenities ──────────────────────────────────────
  "amenity.privateRooms": { th: "มีห้องส่วนตัว", en: "Private rooms available" },
  "amenity.wifi": { th: "Wi-Fi ฟรี", en: "Free Wi-Fi" },
  "amenity.parking": { th: "มีที่จอดรถ", en: "Parking available" },
  "amenity.smoking": { th: "สูบได้", en: "Smoking OK" },
  "amenity.power": { th: "มีปลั๊กไฟ", en: "Power outlets available" },

  // ─── 404 ────────────────────────────────────────────
  "notFound.title": { th: "ไม่พบหน้านี้", en: "Page Not Found" },
  "notFound.description": { th: "หน้าที่คุณกำลังมองหาไม่มีอยู่", en: "The page you're looking for doesn't exist." },
  "notFound.goHome": { th: "กลับหน้าแรก", en: "Go Home" },

  // ─── Admin ──────────────────────────────────────────
  "admin.title": { th: "🌿 จัดการสินค้า", en: "🌿 Product Manager" },
  "admin.products": { th: "สินค้า", en: "products" },
  "admin.categories": { th: "หมวดหมู่", en: "categories" },
  "admin.loggedInAs": { th: "เข้าสู่ระบบเป็น", en: "Logged in as" },
  "admin.addProduct": { th: "+ เพิ่มสินค้า", en: "+ Add Product" },
  "admin.signOut": { th: "ออกจากระบบ", en: "Sign Out" },
  "admin.searchProducts": { th: "ค้นหาสินค้า...", en: "Search products..." },
  "admin.all": { th: "ทั้งหมด", en: "All" },
  "admin.product": { th: "สินค้า", en: "Product" },
  "admin.category": { th: "หมวดหมู่", en: "Category" },
  "admin.price": { th: "ราคา", en: "Price" },
  "admin.stock": { th: "สต็อก", en: "Stock" },
  "admin.featuredLabel": { th: "แนะนำ", en: "Featured" },
  "admin.active": { th: "แอคทีฟ", en: "Active" },
  "admin.actions": { th: "การกระทำ", en: "Actions" },
  "admin.inStock": { th: "มีสินค้า", en: "In Stock" },
  "admin.outOfStock": { th: "หมด", en: "Out" },
  "admin.featured": { th: "★ แนะนำ", en: "★ Featured" },
  "admin.activeStatus": { th: "แอคทีฟ", en: "Active" },
  "admin.hidden": { th: "ซ่อน", en: "Hidden" },
  "admin.edit": { th: "แก้ไข", en: "Edit" },
  "admin.delete": { th: "ลบ", en: "Delete" },
  "admin.noProducts": { th: "ไม่พบสินค้า", en: "No products found" },
  "admin.confirmDelete": { th: "ลบ \"{name}\"? สิ่งนี้ไม่สามารถย้อนกลับได้", en: "Delete \"{name}\"? This cannot be undone." },

  // ─── Admin Login ────────────────────────────────────
  "admin.login.title": { th: "🌿 Xaweed แอดมิน", en: "🌿 Xaweed Admin" },
  "admin.login.subtitle": { th: "เข้าสู่ระบบด้วยอีเมลเพื่อจัดการสินค้า", en: "Sign in with your email to manage products" },
  "admin.login.checkEmail": { th: "เช็คอีเมลของคุณ!", en: "Check your email!" },
  "admin.login.magicLinkSent": { th: "เราส่งลิงก์เข้าสู่ระบบไปที่", en: "We sent a magic link to" },
  "admin.login.clickToSign": { th: "คลิกลิงก์เพื่อเข้าสู่ระบบ", en: "Click the link to sign in." },
  "admin.login.email": { th: "ที่อยู่อีเมล", en: "Email address" },
  "admin.login.sending": { th: "กำลังส่ง...", en: "Sending..." },
  "admin.login.sendLink": { th: "ส่งลิงก์เข้าสู่ระบบ", en: "Send Magic Link" },
  "admin.login.password": { th: "รหัสผ่าน", en: "Password" },
  "admin.login.signIn": { th: "เข้าสู่ระบบ", en: "Sign In" },
  "admin.login.signingIn": { th: "กำลังเข้าสู่ระบบ...", en: "Signing in..." },
  "admin.login.usePassword": { th: "ใช้รหัสผ่านแทน", en: "Use password instead" },
  "admin.login.useMagicLink": { th: "ใช้ลิงก์อีเมลแทน", en: "Use magic link instead" },
  "admin.login.backToSite": { th: "← กลับหน้าเว็บ", en: "← Back to site" },
  "admin.login.authFailed": { th: "การยืนยันตัวตนล้มเหลว กรุณาลองใหม่", en: "Authentication failed. Please try again." },
  "admin.login.unauthorized": { th: "อีเมลนี้ไม่ได้รับอนุญาตให้เข้าถึงแอดมิน", en: "This email is not authorized for admin access." },

  // ─── Admin Form ─────────────────────────────────────
  "admin.form.basicInfo": { th: "ข้อมูลพื้นฐาน", en: "Basic Info" },
  "admin.form.name": { th: "ชื่อ *", en: "Name *" },
  "admin.form.slug": { th: "Slug *", en: "Slug *" },
  "admin.form.category": { th: "หมวดหมู่ *", en: "Category *" },
  "admin.form.brand": { th: "แบรนด์", en: "Brand" },
  "admin.form.shortDesc": { th: "คำอธิบายสั้น *", en: "Short Description *" },
  "admin.form.longDesc": { th: "คำอธิบายยาว", en: "Long Description" },
  "admin.form.pricing": { th: "ราคา", en: "Pricing" },
  "admin.form.displayPrice": { th: "ราคาแสดง *", en: "Display Price *" },
  "admin.form.priceValue": { th: "มูลค่าราคา (บาท) *", en: "Price Value (THB) *" },
  "admin.form.priceOptions": { th: "ตัวเลือกราคา (ชื่อ:ราคา, คั่นด้วยเครื่องหมายจุลภาค)", en: "Price Options (label:price, comma-separated)" },
  "admin.form.images": { th: "รูปภาพ", en: "Images" },
  "admin.form.mainImage": { th: "URL รูปภาพหลัก *", en: "Main Image URL *" },
  "admin.form.uploadImage": { th: "อัพโหลดรูปภาพ", en: "Upload Image" },
  "admin.form.uploading": { th: "กำลังอัพโหลด...", en: "Uploading..." },
  "admin.form.additionalImages": { th: "รูปภาพเพิ่มเติม (หนึ่ง URL ต่อบรรทัด)", en: "Additional Images (one URL per line)" },
  "admin.form.cannabisDetails": { th: "รายละเอียดกัญชา (ไม่บังคับ)", en: "Cannabis Details (optional)" },
  "admin.form.strainType": { th: "ประเภทสายพันธุ์", en: "Strain Type" },
  "admin.form.thcContent": { th: "ปริมาณ THC", en: "THC Content" },
  "admin.form.weight": { th: "น้ำหนัก", en: "Weight" },
  "admin.form.effects": { th: "เอฟเฟกต์ (คั่นด้วยเครื่องหมายจุลภาค)", en: "Effects (comma-separated)" },
  "admin.form.settings": { th: "การตั้งค่า", en: "Settings" },
  "admin.form.tags": { th: "แท็ก (คั่นด้วยเครื่องหมายจุลภาค)", en: "Tags (comma-separated)" },
  "admin.form.lineInquiry": { th: "ข้อความสอบถาม LINE", en: "LINE Inquiry Text" },
  "admin.form.activeVisible": { th: "แอคทีฟ (แสดงบนเว็บ)", en: "Active (visible on site)" },
  "admin.form.inStock": { th: "มีสินค้า", en: "In Stock" },
  "admin.form.featuredLabel": { th: "แนะนำ", en: "Featured" },
  "admin.form.seo": { th: "SEO (ไม่บังคับ)", en: "SEO (optional)" },
  "admin.form.seoTitle": { th: "หัวข้อ SEO", en: "SEO Title" },
  "admin.form.seoTitleHint": { th: "เว้นว่างเพื่อใช้ชื่อสินค้า", en: "Leave blank to use product name" },
  "admin.form.seoDesc": { th: "คำอธิบาย SEO", en: "SEO Description" },
  "admin.form.seoDescHint": { th: "เว้นว่างเพื่อใช้คำอธิบายสั้น", en: "Leave blank to use short description" },
  "admin.form.saving": { th: "กำลังบันทึก...", en: "Saving..." },
  "admin.form.create": { th: "สร้างสินค้า", en: "Create Product" },
  "admin.form.saveChanges": { th: "บันทึกการเปลี่ยนแปลง", en: "Save Changes" },
  "admin.form.cancel": { th: "ยกเลิก", en: "Cancel" },
  "admin.form.strainNone": { th: "ไม่มี", en: "None" },
  "admin.form.strainSativa": { th: "ซาทิว่า", en: "Sativa" },
  "admin.form.strainIndica": { th: "อินดิก้า", en: "Indica" },
  "admin.form.strainHybrid": { th: "ไฮบริด", en: "Hybrid" },
} as const;

export type TranslationKey = keyof typeof translations;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "th",
  setLocale: () => {},
  t: (key) => key,
});

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("xaweed-lang");
    if (saved === "th" || saved === "en") return saved;
  }
  return "th";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("xaweed-lang", newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[locale] ?? entry.en ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

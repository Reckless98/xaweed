"use client";

import Image from "next/image";
import { lineConfig } from "@/lib/line";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  const navKeys = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.menu") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative border-t border-brand-ash/10">
      <div className="absolute inset-0 bg-brand-obsidian" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-green/20">
                <Image src="/images/LOGO.jpg" alt="Xaweed" fill sizes="40px" className="object-cover" />
              </div>
              <span className="text-xl font-bold font-display text-brand-ivory">
                XAWEED
              </span>
            </div>
            <p className="text-brand-cream/40 text-sm max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={lineConfig.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-smoke hover:bg-[#06C755]/20 flex items-center justify-center transition-colors group"
                aria-label="LINE"
              >
                <svg
                  className="w-4.5 h-4.5 text-brand-cream/40 group-hover:text-[#06C755] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
              <a
                href={`https://www.instagram.com/${contactInfo.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-smoke hover:bg-[#E4405F]/20 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <svg
                  className="w-4.5 h-4.5 text-brand-cream/40 group-hover:text-[#E4405F] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="w-9 h-9 rounded-lg bg-brand-smoke hover:bg-brand-green/10 flex items-center justify-center transition-colors group"
                aria-label="Phone"
              >
                <svg
                  className="w-4 h-4 text-brand-cream/40 group-hover:text-brand-green transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-brand-ivory mb-4 uppercase tracking-wider">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2">
              {navKeys.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-brand-cream/40 hover:text-brand-green transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-brand-ivory mb-4 uppercase tracking-wider">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-sm text-brand-cream/40">
              <li>{contactInfo.phone}</li>
              <li>LINE: {contactInfo.lineId}</li>
              <li>Daily 12:00 – 22:00</li>
              <li className="pt-2 text-xs leading-relaxed">
                {contactInfo.address}
              </li>
            </ul>
            {/* Rating badge */}
            <a
              href="https://weed.th/shop/8ad27a23-8b7b-408e-92c8-a5eeea6e48cb/nonthaburi/xaweed-shop"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-brand-gold/60 hover:text-brand-gold transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              5.0 · 52 reviews on weed.th
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-brand-ash/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/20">
            &copy; {currentYear} Xaweed Shop. {t("footer.rights")}
          </p>
          <p className="text-xs text-brand-cream/15">
            Nonthaburi, Thailand
          </p>
        </div>
      </div>
    </footer>
  );
}

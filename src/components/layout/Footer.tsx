import Image from "next/image";
import { navigation } from "@/data/site";
import { lineConfig } from "@/lib/line";
import { contactInfo } from "@/data/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
              Premium cannabis, fresh strains daily, pre-rolls &amp; accessories.
              Chill vibes and friendly service in Nonthaburi.
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
              Navigation
            </h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
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
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-brand-cream/40">
              <li>{contactInfo.phone}</li>
              <li>LINE: {contactInfo.lineId}</li>
              <li>Daily 12:00 – 22:00</li>
              <li className="pt-2 text-xs leading-relaxed">
                {contactInfo.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-brand-ash/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/20">
            &copy; {currentYear} Xaweed Shop. All rights reserved.
          </p>
          <p className="text-xs text-brand-cream/15">
            Nonthaburi, Thailand
          </p>
        </div>
      </div>
    </footer>
  );
}

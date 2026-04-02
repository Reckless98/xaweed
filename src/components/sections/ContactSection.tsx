"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data/content";
import { lineConfig } from "@/lib/line";
import { useI18n } from "@/lib/i18n";

export function ContactSection() {
  const { t, locale } = useI18n();

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-brand-obsidian/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard padding="lg" className="h-full">
              <h3 className="text-2xl font-bold text-brand-ivory font-display mb-6">
                {t("contact.shopName")}
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-ivory text-sm font-medium">{t("contact.address")}</p>
                    <p className="text-brand-cream/50 text-sm mt-0.5">
                      {locale === "th" ? contactInfo.addressThai : contactInfo.address}
                    </p>
                    <p className="text-brand-cream/30 text-xs mt-0.5">
                      {locale === "th" ? contactInfo.address : contactInfo.addressThai}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-ivory text-sm font-medium">{t("contact.hours")}</p>
                    <p className="text-brand-cream/50 text-sm mt-0.5">
                      {t("contact.hoursValue")}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-ivory text-sm font-medium">{t("contact.phone")}</p>
                    <p className="text-brand-cream/50 text-sm mt-0.5">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                {/* LINE */}
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#06C755]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-ivory text-sm font-medium">LINE</p>
                    <p className="text-brand-green text-sm mt-0.5 font-medium">
                      {contactInfo.lineId}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="pt-4 border-t border-brand-ash/20">
                  <p className="text-brand-ivory text-sm font-medium mb-3">{t("contact.amenities")}</p>
                  <div className="flex flex-wrap gap-2">
                    {contactInfo.amenities.map((amenity) => {
                      const amenityKeyMap: Record<string, string> = {
                        "Private rooms available": "amenity.privateRooms",
                        "Free Wi-Fi": "amenity.wifi",
                        "Parking available": "amenity.parking",
                        "Smoking OK": "amenity.smoking",
                        "Power outlets available": "amenity.power",
                      };
                      const key = amenityKeyMap[amenity];
                      return (
                        <span
                          key={amenity}
                          className="text-xs px-3 py-1 rounded-full bg-brand-smoke text-brand-cream/50"
                        >
                          {key ? t(key as import("@/lib/i18n").TranslationKey) : amenity}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="line"
                  href={lineConfig.profileUrl}
                  external
                  className="flex-1"
                >
                  {t("hero.chatLine")}
                </Button>
                <Button
                  variant="secondary"
                  href={contactInfo.googleMapsUrl}
                  external
                  className="flex-1"
                >
                  {t("contact.getDirections")}
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard padding="sm" className="h-full min-h-100">
              <div className="w-full h-full rounded-xl overflow-hidden min-h-100">
                <iframe
                  title="Xaweed Shop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1936.5!2d100.5233443!3d13.9001716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29de00cff30c9%3A0x8cf91ae6ef576562!2sXAWEED%20SHOP!5e0!3m2!1sen!2sth!4v1"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl border-0 min-h-[400px]"
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

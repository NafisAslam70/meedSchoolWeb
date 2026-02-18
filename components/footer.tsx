"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { pickLocalizedText } from "@/lib/cms-i18n"

export default function Footer() {
  const { t, language } = useLanguage()
  const [footerData, setFooterData] = useState<{
    footerBlurb?: string
    footerBlurbI18n?: { en?: string; hi?: string; ur?: string; bn?: string }
    quickLinks?: { label: string; labelI18n?: { en?: string; hi?: string; ur?: string; bn?: string }; href: string }[]
    programLinks?: { label: string; labelI18n?: { en?: string; hi?: string; ur?: string; bn?: string }; href: string }[]
    contactAddress?: string
    contactAddressI18n?: { en?: string; hi?: string; ur?: string; bn?: string }
    contactPhone?: string
    contactEmail?: string
    socials?: { platform?: string; url?: string }[]
    copyrightText?: string
    copyrightTextI18n?: { en?: string; hi?: string; ur?: string; bn?: string }
  } | null>(null)

  useEffect(() => {
    fetch("/api/cms/layout")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setFooterData(res.data)
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* School Info */}
          <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm md:text-base">M</span>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm md:text-base">{t("Meed International School")}</div>
                <div className="text-xs md:text-sm text-emerald-400">{t("Holistic Education for Dual Success")}</div>
              </div>
            </div>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              {pickLocalizedText(language, footerData?.footerBlurbI18n, footerData?.footerBlurb ||
                t(
                  "\"A deserved reward earned through virtue, effort, and excellence.\" Nurturing future leaders of excellence -- masters in both Dunya and Akhirah.",
                  "\"\u0938\u0926\u094D\u0917\u0941\u0923, \u092A\u094D\u0930\u092F\u093E\u0938 \u0914\u0930 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F\u0924\u093E \u0938\u0947 \u0905\u0930\u094D\u091C\u093F\u0924 \u0909\u091A\u093F\u0924 \u092A\u0941\u0930\u0938\u094D\u0915\u093E\u0930\u0964\" \u0926\u0941\u0928\u094D\u092F\u093E \u0914\u0930 \u0906\u0916\u093F\u0930\u0924 \u0926\u094B\u0928\u094B\u0902 \u092E\u0947\u0902 \u092E\u093E\u0939\u093F\u0930 \u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0947 \u0928\u0947\u0924\u093E\u0913\u0902 \u0915\u093E \u092A\u094B\u0937\u0923\u0964",
                  "\"\u0646\u06CC\u06A9\u06CC\u060C \u0645\u062D\u0646\u062A \u0627\u0648\u0631 \u0639\u0645\u062F\u06AF\u06CC \u0633\u06D2 \u062D\u0627\u0635\u0644 \u06A9\u0631\u062F\u06C1 \u0627\u0646\u0639\u0627\u0645\u06D4\" \u062F\u0646\u06CC\u0627 \u0627\u0648\u0631 \u0622\u062E\u0631\u062A \u062F\u0648\u0646\u0648\u06BA \u0645\u06CC\u06BA \u0645\u0627\u06C1\u0631 \u0631\u06C1\u0646\u0645\u0627\u0624\u06BA \u06A9\u06CC \u067E\u0631\u0648\u0631\u0634\u06D4",
                  "\"\u09B8\u09A6\u09CD\u0997\u09C1\u09A3, \u09AA\u09CD\u09B0\u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0993 \u0989\u09CE\u0995\u09B0\u09CD\u09B7\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u0985\u09B0\u09CD\u099C\u09BF\u09A4 \u09AA\u09C1\u09B0\u09B8\u09CD\u0995\u09BE\u09B0\u0964\" \u09A6\u09C1\u09A8\u09BF\u09AF\u09BC\u09BE \u0993 \u0986\u0996\u09BF\u09B0\u09BE\u09A4 \u0989\u09AD\u09AF\u09BC\u09C7 \u09A6\u0995\u09CD\u09B7 \u09A8\u09C7\u09A4\u09BE\u09A6\u09C7\u09B0 \u09B2\u09BE\u09B2\u09A8-\u09AA\u09BE\u09B2\u09A8\u0964"
                ))}
            </p>
            <div className="flex gap-4">
              {(footerData?.socials || []).map((s, idx) => {
                const iconMap: Record<string, JSX.Element> = {
                  facebook: <Facebook className="h-5 w-5" />,
                  twitter: <Twitter className="h-5 w-5" />,
                  instagram: <Instagram className="h-5 w-5" />,
                }
                const key = s.platform?.toLowerCase() || ""
                const icon = iconMap[key] || <Facebook className="h-5 w-5" />
                return (
                  <Link
                    key={idx}
                    href={s.url || "#"}
                    className="text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                  </Link>
                )
              })}
              {(!footerData?.socials || footerData.socials.length === 0) && (
                <>
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4">{t("Quick Links")}</h3>
            <div className="space-y-1.5 md:space-y-2">
              {(footerData?.quickLinks?.length
                ? footerData.quickLinks
                : [
                    { href: "/about", label: t("About Us") },
                    { href: "/programs", label: t("Programs") },
                    { href: "/admissions", label: t("Admissions") },
                    { href: "/faculty", label: t("Faculty") },
                    { href: "/contact", label: t("Contact") },
                  ]
              ).map((link, idx) => (
                <Link key={link.href} href={link.href} className="block text-gray-300 hover:text-emerald-400 transition-colors text-xs md:text-sm">
                  {pickLocalizedText(language, link.labelI18n, link.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4">{t("Programs")}</h3>
            <div className="space-y-1.5 md:space-y-2">
              {(footerData?.programLinks?.length
                ? footerData.programLinks
                : [
                    { label: t("Pre-Primary (Nursery, LKG, UKG)"), href: "/programs" },
                    { label: t("Elementary (Classes I-VIII)"), href: "/programs" },
                    { label: t("MSP & MHCP Programs"), href: "/programs" },
                    { label: t("Baseline & Banding (T1-T4)"), href: "/programs" },
                  ]
              ).map((p, i) => (
                <Link key={i} href={p.href} className="block text-gray-300 hover:text-emerald-400 transition-colors text-xs md:text-sm">
                  {pickLocalizedText(language, p.labelI18n, p.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4">{t("Contact Us")}</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs md:text-sm">{pickLocalizedText(language, footerData?.contactAddressI18n, footerData?.contactAddress || "Addis Ababa, Ethiopia")}</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs md:text-sm">{footerData?.contactPhone || "+251 123 456 78"}</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs md:text-sm break-all">{footerData?.contactEmail || "info@meedinternational.edu"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            {pickLocalizedText(language, footerData?.copyrightTextI18n, footerData?.copyrightText || `\u00a9 2025 Meed International School. ${t("All rights reserved.")}`)}
          </p>
        </div>
      </div>
    </footer>
  )
}

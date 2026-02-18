"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, ChevronDown, PhoneCall, MessageCircle, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { type Language, languageLabels, languageShort } from "@/lib/translations"
import { urlFor } from "@/sanity/lib/image"
import { pickLocalizedText } from "@/lib/cms-i18n"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [navData, setNavData] = useState<{
    logoText?: string
    logoTextI18n?: { en?: string; hi?: string; ur?: string; bn?: string }
    logoImage?: { image?: any; alt?: string }
    logoSubtext?: string
    logoSubtextI18n?: { en?: string; hi?: string; ur?: string; bn?: string }
    navLinks?: { label: string; labelI18n?: { en?: string; hi?: string; ur?: string; bn?: string }; href: string }[]
    navCta?: { label?: string; labelI18n?: { en?: string; hi?: string; ur?: string; bn?: string }; href?: string }
    contactPhone?: string
  } | null>(null)
  const langRefDesktop = useRef<HTMLDivElement>(null)
  const langRefMobile = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useLanguage()

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      const clickedInsideDesktop = langRefDesktop.current?.contains(target)
      const clickedInsideMobile = langRefMobile.current?.contains(target)
      if (!clickedInsideDesktop && !clickedInsideMobile) setLangOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Fetch editable nav content from Sanity
  useEffect(() => {
    fetch("/api/cms/layout")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setNavData(res.data)
      })
      .catch(() => {})
  }, [])

  const navigation =
    navData?.navLinks?.length
      ? navData.navLinks.map((l) => ({ name: pickLocalizedText(language, l.labelI18n, l.label), href: l.href }))
      : [
          { name: t("Home"), href: "/" },
          { name: t("About"), href: "/about" },
          { name: t("Programs"), href: "/programs" },
          { name: t("Admissions"), href: "/admissions" },
          { name: t("Fees"), href: "/pricing" },
          { name: t("Events"), href: "/events" },
          { name: t("Faculty"), href: "/faculty" },
          { name: t("Contact"), href: "/contact" },
        ]

  const languages: Language[] = ["en", "hi", "ur", "bn"]
  const contactPhone = navData?.contactPhone || "+251 123 456 78"
  const telHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`
  const whatsappDigits = contactPhone.replace(/\D/g, "")
  const waHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : "#"

  return (
    <nav className="sticky top-0 z-50">
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(16,185,129,0.2),transparent_32%),radial-gradient(circle_at_85%_50%,rgba(45,212,191,0.16),transparent_30%)]" />
        <div className="container mx-auto px-4">
          <div className="relative z-10 h-8 md:h-9 flex items-center justify-between text-[11px] md:text-xs">
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2 py-0.5 text-[10px] md:text-[11px] tracking-wide font-semibold">
                {t("2026 Admissions")}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <p className="text-white/80">{t("Applications open now")}</p>
            </div>
            <div className="flex items-center gap-2 md:gap-2.5 ml-auto">
              <a
                href={telHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="font-medium">{t("Call now")}</span>
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/50 bg-emerald-500/25 px-2.5 py-1 hover:bg-emerald-500/35 hover:border-emerald-300/70 transition-all duration-200"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="font-medium">{t("WhatsApp now")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/78 backdrop-blur-2xl border-b border-white/60 shadow-[0_24px_60px_-44px_rgba(2,6,23,0.55)]">
        <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-14 md:h-16 px-2 md:px-3 rounded-2xl border border-slate-200/80 bg-white/85 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.4)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            {navData?.logoImage?.image ? (
              <img
                src={urlFor(navData.logoImage.image).width(200).height(200).fit("max").url()}
                alt={navData.logoImage.alt || navData.logoText || "Logo"}
                className="w-11 h-11 md:w-12 md:h-12 rounded-xl object-contain bg-white shadow-md shadow-emerald-200/40 p-1 flex-shrink-0 ring-1 ring-emerald-100"
              />
            ) : (
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200/40 ring-1 ring-white/60">
                <span className="text-white font-bold text-lg md:text-xl">M</span>
              </div>
            )}
            <div className="min-w-0">
                <div className="text-sm md:text-base font-semibold text-slate-900 truncate tracking-tight">
                {pickLocalizedText(language, navData?.logoTextI18n, navData?.logoText || "Meed International School")}
                </div>
              <div className="text-[10px] md:text-[11px] text-emerald-700 truncate">
                {pickLocalizedText(language, navData?.logoSubtextI18n, navData?.logoSubtext || "Holistic Education for Dual Success")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-slate-700 hover:text-emerald-800 font-semibold transition-all text-sm whitespace-nowrap group px-3 py-2 rounded-full hover:bg-emerald-50/70"
              >
                {item.name}
                <span className="absolute left-3 right-3 -bottom-1 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}

            {/* Language Dropdown - Desktop */}
            <div ref={langRefDesktop} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-sm font-medium text-gray-700"
                aria-label="Select language"
              >
                <Globe className="h-4 w-4 text-emerald-600" />
                <span>{languageShort[language]}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false) }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        lang === language ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/register">
              <Button className="bg-amber-300 text-slate-900 border border-amber-400 hover:bg-amber-200 px-3 py-1.5 rounded-full font-semibold text-sm shadow-sm transition-all">
                {pickLocalizedText(language, navData?.navCta?.labelI18n, navData?.navCta?.label || "Apply Now")}
                <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Language Dropdown - Mobile */}
            <div ref={langRefMobile} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700"
                aria-label="Select language"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-600" />
                <span>{languageShort[language]}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        lang === language ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/register" aria-label="Apply now">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-300 border border-amber-400 text-slate-900">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Hamburger */}
            <button className="p-2 -mr-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t border-gray-100 bg-white/95 backdrop-blur animate-in slide-in-from-top-2 duration-200 shadow-inner rounded-b-2xl">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 px-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium text-sm transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  )
}

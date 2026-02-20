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
  const [openSub, setOpenSub] = useState<string | null>(null)
  const topStripLangContent = [
    { code: "en", admissions: "2026 Admissions", open: "Applications open now", call: "Call now", whatsapp: "WhatsApp now" },
    { code: "hi", admissions: "2026 प्रवेश", open: "आवेदन खुले हैं", call: "अभी कॉल करें", whatsapp: "व्हाट्सऐप करें" },
    { code: "ur", admissions: "داخلے جاری ہیں 2026", open: "درخواستیں کھلی ہیں", call: "ابھی کال کریں", whatsapp: "واٹس ایپ کریں" },
    { code: "bn", admissions: "২০২৬ ভর্তি চলছে", open: "আবেদন এখন খোলা", call: "কল করুন", whatsapp: "হোয়াটসঅ্যাপ করুন" },
  ]
  const [rotatingLangIndex, setRotatingLangIndex] = useState(0)

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

  // Rotate language labels in the top strip
  useEffect(() => {
    const id = window.setInterval(() => {
      setRotatingLangIndex((prev) => (prev + 1) % topStripLangContent.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  const strip = topStripLangContent[rotatingLangIndex]

  const navigationBase =
    navData?.navLinks?.length
      ? navData.navLinks.map((l) => ({ name: pickLocalizedText(language, l.labelI18n, l.label), href: l.href }))
      : [
          { name: t("Home"), href: "/" },
          { name: t("About"), href: "/about" },
          { name: t("Programs"), href: "/programs" },
          { name: t("Admissions"), href: "/admissions" },
          { name: t("Meed Hostel"), href: "/hostel" },
          { name: t("Events"), href: "/events" },
          { name: t("Faculty"), href: "/faculty" },
          { name: t("Contact"), href: "/contact" },
        ]

  // ensure hostel is always present, remove pricing from top-level
  const mappedNavigation = (() => {
    const withoutPricing = navigationBase.filter((item) => item.href !== "/pricing")
    const hasHostel = withoutPricing.some((item) => item.href === "/hostel")
    if (!hasHostel) {
      // insert hostel after admissions if present, else append
      const idx = withoutPricing.findIndex((i) => i.href === "/admissions")
      const insertAt = idx >= 0 ? idx + 1 : withoutPricing.length
      withoutPricing.splice(insertAt, 0, { name: t("Meed Hostel"), href: "/hostel" })
    }
    return withoutPricing
  })()

  const sectionLinks: Record<string, { label: string; href: string }[]> = {
    "/about": [
      { label: t("Meaning of MEED"), href: "/about#meaning" },
      { label: t("Blueprint"), href: "/about#blueprint" },
      { label: t("Movements"), href: "/about#movements" },
      { label: t("Principles"), href: "/about#principles" },
    ],
    "/programs": [
      { label: t("Academic Engine"), href: "/programs#engine" },
      { label: t("Programs detail"), href: "/programs#programs" },
      { label: t("Mother-Guide"), href: "/programs#mother-guide" },
      { label: t("Baseline & Banding"), href: "/programs#baseline" },
      { label: t("Beyond Academics"), href: "/programs#beyond" },
    ],
    "/admissions": [
      { label: t("Why Meed"), href: "/admissions#difference" },
      { label: t("Four Pillars"), href: "/admissions#pillars" },
      { label: t("Testimonials"), href: "/admissions#testimonials" },
      { label: t("Application Process"), href: "/admissions#process" },
      { label: t("Fees & Scholarships"), href: "/pricing" },
    ],
  }

  const languages: Language[] = ["en", "hi", "ur", "bn"]
  const contactPhone = navData?.contactPhone || "+251 123 456 78"
  const telHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`
  const whatsappDigits = contactPhone.replace(/\D/g, "")
  const waHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : "#"

  return (
    <nav className="sticky top-0 z-50">
      {/* Top strip always visible, including mobile */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-white/10 overflow-hidden shadow-[0_12px_40px_-28px_rgba(15,23,42,0.8)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(16,185,129,0.22),transparent_32%),radial-gradient(circle_at_85%_50%,rgba(45,212,191,0.18),transparent_30%)]" />
        <div className="container mx-auto px-3 sm:px-4">
          <div className="relative z-10 min-h-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 text-[11px] md:text-xs py-2">
          <div className="flex items-center gap-2.5 text-center sm:text-left justify-center sm:justify-start">
              <span className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2.5 py-1 text-[10px] md:text-[11px] tracking-wide font-semibold shadow-[0_10px_30px_-20px_rgba(16,185,129,0.8)]">
                {strip.admissions}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <p className="text-white/80 whitespace-nowrap">{strip.open}</p>
            </div>
            <div className="flex sm:ml-auto items-center gap-2 w-full sm:w-auto">
              <a
                href={telHref}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 hover:bg-white/20 hover:border-white/40 transition-all duration-200 text-[11px]"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="font-medium">{strip.call}</span>
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-300/50 bg-emerald-500/25 px-3 py-1.5 hover:bg-emerald-500/35 hover:border-emerald-300/70 transition-all duration-200 text-[11px]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="font-medium">{strip.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav, full-width (no pill box) */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.4)]">
        <div className="w-full px-3 sm:px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-14 md:h-16 px-0 md:px-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink">
            {navData?.logoImage?.image ? (
              <img
                src={urlFor(navData.logoImage.image).width(220).height(220).fit("max").url()}
                alt={navData.logoImage.alt || navData.logoText || "Logo"}
                className="w-12 h-12 md:w-[54px] md:h-[54px] rounded-2xl object-contain bg-white shadow-lg shadow-emerald-200/50 p-1.5 flex-shrink-0 ring-2 ring-emerald-100/80"
              />
            ) : (
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200/40 ring-1 ring-white/60">
                <span className="text-white font-bold text-lg md:text-xl">M</span>
              </div>
            )}
            <div className="min-w-0">
                <div className="text-sm md:text-base font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap truncate max-w-[220px]">
                {pickLocalizedText(language, navData?.logoTextI18n, navData?.logoText || "Meed International School")}
                </div>
              <div className="text-[10px] md:text-[11px] text-emerald-700 whitespace-nowrap truncate max-w-[220px] leading-snug">
                {pickLocalizedText(language, navData?.logoSubtextI18n, navData?.logoSubtext || "Holistic Education for Dual Success")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 w-full">
            <div className="flex items-center gap-2 flex-1 flex-nowrap overflow-visible justify-end">
              {mappedNavigation.map((item) => {
                const subs = sectionLinks[item.href] || []
                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className="relative text-slate-700 hover:text-emerald-900 font-semibold transition-all text-sm whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-emerald-50/90 border border-transparent hover:border-emerald-100"
                    >
                      {item.name}
                      {subs.length > 0 && <ChevronDown className="h-3.5 w-3.5 text-emerald-600 transition-transform group-hover:rotate-180" />}
                      <span className="absolute left-3 right-3 -bottom-1 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    </Link>
                    {subs.length > 0 && (
                      <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 absolute left-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-lg shadow-emerald-100/40 z-50">
                        <div className="py-1">
                          {subs.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Language Dropdown - Desktop */}
              <div ref={langRefDesktop} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/90 transition-colors text-sm font-medium text-gray-700 shadow-[0_10px_30px_-24px_rgba(16,185,129,0.9)]"
                  aria-label="Select language"
                >
                  <Globe className="h-4 w-4 text-emerald-600" />
                  <span>{languageShort[language]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
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
            </div>

            <Link href="/register" className="flex-shrink-0">
              <Button className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 text-slate-900 border border-amber-300/80 hover:from-amber-200 hover:to-amber-300 px-4 py-2 rounded-full font-semibold text-sm shadow-[0_15px_35px_-24px_rgba(251,191,36,0.9)] transition-all">
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
            <button className="p-2 -mr-2" onClick={() => { setIsOpen(!isOpen); setOpenSub(null) }} aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t border-gray-100 bg-white/95 backdrop-blur animate-in slide-in-from-top-2 duration-200 shadow-inner">
            <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {mappedNavigation.map((item) => {
                const subs = sectionLinks[item.href] || []
                const isSubOpen = openSub === item.href
                if (!subs.length) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-3 px-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium text-sm transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                }
                return (
                  <div key={item.href} className="border border-gray-100 rounded-lg overflow-hidden bg-white">
                    <button
                      className="w-full flex items-center justify-between py-3 px-3 text-gray-800 font-semibold text-sm"
                      onClick={() => setOpenSub(isSubOpen ? null : item.href)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isSubOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isSubOpen && (
                      <div className="flex flex-col border-t border-gray-100 bg-gray-50">
                        {subs.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="py-2.5 pl-4 pr-3 text-sm text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => { setIsOpen(false); setOpenSub(null) }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="pt-2 pb-3 px-1">
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3">
                    {pickLocalizedText(language, navData?.navCta?.labelI18n, navData?.navCta?.label || "Apply Now")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  )
}

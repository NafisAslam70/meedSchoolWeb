"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, ChevronDown, LockKeyhole } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { type Language, languageLabels, languageShort } from "@/lib/translations"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [navData, setNavData] = useState<{
    logoText?: string
    logoSubtext?: string
    navLinks?: { label: string; href: string }[]
    navCta?: { label?: string; href?: string }
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
      ? navData.navLinks.map((l) => ({ name: l.label, href: l.href }))
      : [
          { name: t("Home"), href: "/" },
          { name: t("About"), href: "/about" },
          { name: t("Programs"), href: "/programs" },
          { name: t("Admissions"), href: "/admissions" },
          { name: t("Pricing"), href: "/pricing" },
          { name: t("Events"), href: "/events" },
          { name: t("Faculty"), href: "/faculty" },
          { name: t("Contact"), href: "/contact" },
        ]

  const languages: Language[] = ["en", "hi", "ur", "bn"]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-auto md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm md:text-lg">M</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs md:text-lg font-bold text-gray-900 truncate">
                {navData?.logoText || t("Meed International School")}
              </div>
              <div className="text-[9px] md:text-xs text-emerald-600 truncate">
                {navData?.logoSubtext || t("Holistic Education for Dual Success")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm whitespace-nowrap"
              >
                {item.name}
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

            {/* Admin icon - Desktop */}
            <Link
              href="/admin"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-gray-700"
              aria-label="Admin"
            >
              <LockKeyhole className="h-4 w-4" />
            </Link>

            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium text-sm">
                {navData?.navCta?.label || t("Apply Now")}
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

            {/* Admin icon - Mobile */}
            <Link
              href="/admin"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              aria-label="Admin"
            >
              <LockKeyhole className="h-4 w-4" />
            </Link>

            {/* Hamburger */}
            <button className="p-2 -mr-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 px-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium text-sm transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/register" onClick={() => setIsOpen(false)} className="mt-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium text-sm">
                  {navData?.navCta?.label || t("Apply Now")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

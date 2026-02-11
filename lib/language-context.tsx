"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type Language, getTranslation } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, hi?: string, ur?: string, bn?: string) => string
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (en) => en,
  mounted: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  // t() works in two modes:
  // 1. t("English key") -- looks up from translations dictionary
  // 2. t("English", "Hindi", "Urdu", "Bengali") -- inline translations (backward compatible)
  const t = useCallback(
    (en: string, hi?: string, ur?: string, bn?: string) => {
      if (!mounted) return en
      if (language === "en") return en
      // If inline translations are provided, use them
      if (hi || ur || bn) {
        if (language === "hi" && hi) return hi
        if (language === "ur" && ur) return ur
        if (language === "bn" && bn) return bn
        return en
      }
      // Otherwise look up from dictionary
      return getTranslation(en, language)
    },
    [language, mounted],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

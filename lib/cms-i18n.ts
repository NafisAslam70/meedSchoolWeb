import { Language } from "@/lib/translations"

type LocalizedValue = {
  en?: string
  hi?: string
  ur?: string
  bn?: string
}

export function pickLocalizedText(
  language: Language,
  localized?: LocalizedValue | null,
  fallback?: string | null
): string {
  const fallbackValue = fallback || ""
  if (!localized) return fallbackValue
  return localized[language] || localized.en || fallbackValue
}

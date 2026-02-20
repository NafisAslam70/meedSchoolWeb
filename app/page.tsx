"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen, Phone, Users, Award, Globe, Shield, Lightbulb, Zap, Heart,
  Eye, Repeat, Search, Clock,
} from "lucide-react"
import { GallerySlider } from "@/components/gallery-slider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import TestimonialsSection from "@/components/testimonials"
import HeroSlider from "@/components/hero-slider"
import { useLanguage } from "@/lib/language-context"
import { urlFor } from "@/sanity/lib/image"
import { pickLocalizedText } from "@/lib/cms-i18n"

type CMSHome = {
  videoUrl?: string
  slides?: any[]
  visionHeadline?: string
  visionQuote?: string
  visionCards?: any[]
  principles?: any[]
  ecosystemHeadline?: string
  ecosystemImage?: { image?: any; alt?: string }
  ecosystemGallery?: any[]
  ecosystemBullets?: any[]
  assessmentCards?: any[]
  assessmentImage?: { image?: any; alt?: string }
  assessmentGallery?: any[]
  stats?: any[]
}

const WaveTop = ({ color = "white" }: { color?: string }) => (
  <div className="absolute -top-px left-0 right-0 text-[0] leading-[0]">
    <svg viewBox="0 0 1440 80" className="w-full h-16 md:h-20" preserveAspectRatio="none">
      <path d="M0,64 C320,0 640,0 960,64 C1280,128 1440,32 1440,32 L1440,0 L0,0 Z" fill={color} />
    </svg>
  </div>
)

const WaveBottom = ({ color = "white" }: { color?: string }) => (
  <div className="absolute -bottom-px left-0 right-0 text-[0] leading-[0] rotate-180">
    <svg viewBox="0 0 1440 80" className="w-full h-16 md:h-20" preserveAspectRatio="none">
      <path d="M0,64 C320,0 640,0 960,64 C1280,128 1440,32 1440,32 L1440,0 L0,0 Z" fill={color} />
    </svg>
  </div>
)

export default function HomePage() {
  const { t, language } = useLanguage()
  const [cms, setCms] = useState<CMSHome | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("Hero")

  useEffect(() => {
    fetch("/api/cms/home")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setCms(res.data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = max > 0 ? (window.scrollY / max) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, next)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-label]"))
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.getAttribute("data-section-label") || "Home")
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-15% 0px -45% 0px" }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (!elements.length) return

    elements.forEach((el) => {
      const delay = el.dataset.revealDelay
      if (delay) el.style.transitionDelay = `${delay}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -12% 0px" }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const heroSlides = useMemo(() => {
    if (!cms?.slides?.length) return undefined
    return cms.slides.map((s) => ({
      subtitle: pickLocalizedText(language, s.subtitleI18n, s.subtitle || ""),
      description: pickLocalizedText(language, s.descriptionI18n, s.description || ""),
      title: pickLocalizedText(language, s.titleI18n, s.title || ""),
      image: s.image?.image ? urlFor(s.image.image).width(1600).height(900).url() : undefined,
      primaryCta: s.primaryCta
        ? { label: pickLocalizedText(language, s.primaryCta.labelI18n, s.primaryCta.label || ""), href: s.primaryCta.href || "#" }
        : undefined,
      secondaryCta: s.secondaryCta
        ? { label: pickLocalizedText(language, s.secondaryCta.labelI18n, s.secondaryCta.label || ""), href: s.secondaryCta.href || "#" }
        : undefined,
    }))
  }, [cms, language])

  const ecosystemGallery = useMemo(() => {
    if (cms?.ecosystemGallery?.length) {
      return cms.ecosystemGallery.map((img: any) => ({
        src: urlFor(img.image).width(1400).height(900).url(),
        alt: img.alt || "Ecosystem image",
      }))
    }
    if (cms?.ecosystemImage?.image) {
      return [
        {
          src: urlFor(cms.ecosystemImage.image).width(1400).height(900).url(),
          alt: cms.ecosystemImage.alt || "Ecosystem image",
        },
      ]
    }
    return [{ src: "/images/hero-1.jpg", alt: "Placeholder" }]
  }, [cms])

  const assessmentGallery = useMemo(() => {
    if (cms?.assessmentGallery?.length) {
      return cms.assessmentGallery.map((img: any) => ({
        src: urlFor(img.image).width(1400).height(900).url(),
        alt: img.alt || "Assessment image",
      }))
    }
    if (cms?.assessmentImage?.image) {
      return [
        {
          src: urlFor(cms.assessmentImage.image).width(1400).height(900).url(),
          alt: cms.assessmentImage.alt || "Assessment image",
        },
      ]
    }
    return [{ src: "/images/hero-2.jpg", alt: "Placeholder" }]
  }, [cms])

  const visionCards =
    cms?.visionCards?.length > 0
      ? cms.visionCards.map((v: any) => ({
          title: pickLocalizedText(language, v.titleI18n, v.title),
          description: pickLocalizedText(language, v.descriptionI18n, v.description),
        }))
      : [
          { icon: Lightbulb, en: "Enlighten", hi: "ज्ञान", ur: "روشنی", bn: "জ্ঞান", color: "text-emerald-400", dEn: "Students gain both revealed (Islamic) and acquired (worldly) knowledge.", dHi: "छात्र इस्लामी और सांसारिक दोनों ज्ञान प्राप्त करते हैं।", dUr: "طلباء اسلامی اور دنیاوی دونوں علوم حاصل کرتے ہیں۔", dBn: "শিক্ষার্থীরা ইসলামীক ও পার্থিব জ্ঞান অর্জন করে।" },
          { icon: Zap, en: "Empower", hi: "सशक्तिकरण", ur: "بااختیار", bn: "ক্ষমতায়ন", color: "text-teal-400", dEn: "Equip learners with 21st-century skills and rituals of mastery.", dHi: "शिक्षार्थियों को 21वीं सदी के कौशल और अभ्यास दें।", dUr: "طلباء کو 21ویں صدی کے مہارتیں دیں۔", dBn: "২১ শতকের দক্ষতায় সজ্জিত করুন।" },
          { icon: Shield, en: "Dedicate", hi: "समर्पण", ur: "عزم", bn: "নিষ্ঠা", color: "text-cyan-400", dEn: "Ground hearts in discipline, Ibadah, and sustained focus.", dHi: "अनुशासन और इबादत में दिल मजबूत करें।", dUr: "نظم و ضبط اور عبادت میں دل مضبوط کریں۔", dBn: "শৃঙ্খলা ও ইবাদতে মন স্থির করুন।" },
          { icon: Award, en: "Master", hi: "मास्टरी", ur: "مہارت", bn: "দক্ষতা", color: "text-yellow-400", dEn: "Achieve excellence in spiritual and worldly domains.", dHi: "आध्यात्मिक और सांसारिक क्षेत्रों में उत्कृष्टता।", dUr: "روحانی و دنیاوی میدان میں عمدگی۔", dBn: "আধ্যাত্মিক ও পার্থিব উৎকর্ষ।" },
        ]

  const principles =
    cms?.principles?.length > 0
      ? cms.principles.map((p: any) => ({
          title: pickLocalizedText(language, p.titleI18n, p.title),
          description: pickLocalizedText(language, p.descriptionI18n, p.description),
        }))
      : [
          { icon: Eye, en: "Vision", hi: "दृष्टि", ur: "وژن", bn: "দৃষ্টি", dEn: "Clarity of purpose guides every decision.", bg: "bg-emerald-100", color: "text-emerald-600" },
          { icon: Heart, en: "Sincerity", hi: "ईमानदारी", ur: "اخلاص", bn: "আন্তরিকতা", dEn: "Ikhlas and objectivity form our ethical backbone.", bg: "bg-teal-100", color: "text-teal-600" },
          { icon: Search, en: "Depth", hi: "गहराई", ur: "گہرائی", bn: "গভীরতা", dEn: "Profound understanding over superficial coverage.", bg: "bg-cyan-100", color: "text-cyan-600" },
          { icon: Repeat, en: "Ritual", hi: "अनुष्ठान", ur: "رسومات", bn: "অনুষ্ঠান", dEn: "Consistent practices build sustainable excellence.", bg: "bg-emerald-100", color: "text-emerald-600" },
          { icon: Shield, en: "Perseverance", hi: "दृढ़ता", ur: "استقامت", bn: "দৃঢ়তা", dEn: "Resilience transforms potential into achievement.", bg: "bg-teal-100", color: "text-teal-600" },
        ]

  const ecosystemBullets =
    cms?.ecosystemBullets?.length > 0
      ? cms.ecosystemBullets.map((b: any) => ({
          title: pickLocalizedText(language, b.titleI18n, b.title),
          description: pickLocalizedText(language, b.descriptionI18n, b.description),
        }))
      : [
          { icon: BookOpen, bg: "bg-emerald-100", color: "text-emerald-600", en: "Academic MRIs (AMRI)", dEn: "MSP, MHCP, Assembly, and Day Open/Shutdown rituals." },
          { icon: Users, bg: "bg-teal-100", color: "text-teal-600", en: "Non-Academic MRIs (NMRI)", dEn: "Blitz windows, recreation, PowerNap, spiritual anchors." },
          { icon: Clock, bg: "bg-cyan-100", color: "text-cyan-600", en: "17 Micro-Rituals, 7 Daily Blocks", dEn: "From pre-Fajr to lights-out, every block has purpose." },
        ]

  const assessmentCards =
    cms?.assessmentCards?.length > 0
      ? cms.assessmentCards.map((a: any) => ({
          title: pickLocalizedText(language, a.titleI18n, a.title),
          description: pickLocalizedText(language, a.descriptionI18n, a.description),
        }))
      : [
          { en: "Scholastic", dEn: "Subject mastery, TCS Cycle, Mid-Term and Term-End Exams", bg: "bg-emerald-50" },
          { en: "Co-Scholastic", dEn: "Character, habits, spiritual formation", bg: "bg-teal-50" },
          { en: "TCS Cycle", dEn: "Test, Correction, Submission -- every chapter", bg: "bg-cyan-50" },
          { en: "T1-T4 Bands", dEn: "Mastery to Foundation -- targeted guidance", bg: "bg-gray-50" },
        ]

  const stats =
    cms?.stats?.length > 0
      ? cms.stats.map((s: any) => ({ value: s.value, label: pickLocalizedText(language, s.labelI18n, s.label) }))
      : [
          { vEn: "Nursery-8", lEn: "Grade Levels" },
          { vEn: "17", lEn: "Daily Micro-Rituals" },
          { vEn: "5", lEn: "Guiding Principles" },
          { vEn: "Dual", lEn: "Success Model" },
        ]

  const storyImages = useMemo(() => {
    const hero = (heroSlides || [])
      .map((s: any) => s.image)
      .filter(Boolean)
      .map((src: string, i: number) => ({ src, alt: `Hero visual ${i + 1}` }))
    const merged = [...hero, ...ecosystemGallery, ...assessmentGallery]
    return merged.filter((img, i, arr) => arr.findIndex((x) => x.src === img.src) === i).slice(0, 8)
  }, [heroSlides, ecosystemGallery, assessmentGallery])

  const fallbackIcons = [Lightbulb, Shield, Zap, Heart, Eye, Repeat, Search, Clock]

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden rounded-full border border-white/60 bg-white/85 backdrop-blur-xl px-4 py-2 shadow-lg">
        <div className="text-[11px] font-semibold text-slate-700 text-center">{activeSection}</div>
        <div className="mt-1 h-1 w-28 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${scrollProgress}%` }} />
        </div>
      </div>
      <Navigation />
      <div data-section-label="Hero">
        <HeroSlider slides={heroSlides} />
      </div>


      {/* Vision & Mission */}
      <section className="relative py-14 md:py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white overflow-hidden reveal-on-scroll" data-reveal data-section-label="Vision">
        <WaveBottom color="#f8fafc" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.16),transparent_35%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">
              {t("Our Vision")}
            </h2>
            <p className="text-base md:text-xl text-emerald-200 leading-relaxed italic px-2">
              {t("\"To nurture future leaders of excellence -- masters in both Dunya and Akhirah -- through Enlightenment, Empowerment and Dedication.\"")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {visionCards.map((item: any, i: number) => {
              const Icon = item.icon || fallbackIcons[i % fallbackIcons.length]
              return (
                <div
                  key={i}
                  data-reveal
                  data-reveal-delay={i * 80}
                  className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 interactive-lift reveal-on-scroll"
                >
                  <Icon className={`h-6 w-6 md:h-8 md:w-8 ${item.color || "text-emerald-400"} mb-2 md:mb-4`} />
                  <h3 className={`text-sm md:text-lg font-bold ${item.color || "text-emerald-400"} mb-1 md:mb-2`}>
                    {t(item.title || item.en || "")}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {t(item.description || item.dEn || "")}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Five Guiding Principles */}
      <section className="relative py-14 md:py-20 bg-gray-50 overflow-hidden reveal-on-scroll" data-reveal data-section-label="Principles">
        <WaveTop color="#f8fafc" />
        <WaveBottom color="#ecfeff" />
        <div className="container mx-auto px-4 relative z-10">
          {storyImages.length > 4 && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 max-w-6xl mx-auto mb-8 md:mb-10">
              {storyImages.slice(2, 8).map((img) => (
                <div key={img.src} className="rounded-xl overflow-hidden">
                  <img src={img.src} alt={img.alt} className="h-20 md:h-24 w-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-balance">
              {t("Five Guiding Principles")}
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">{t("Simple principles. Daily practice.")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 max-w-6xl mx-auto">
            {principles.map((p: any, i: number) => {
              const Icon = p.icon || Eye
              return (
                <div
                  key={i}
                  data-reveal
                  data-reveal-delay={i * 70}
                  className="text-center bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 interactive-lift reveal-on-scroll"
                >
                  <div className={`w-10 h-10 md:w-14 md:h-14 ${p.bg || "bg-emerald-50"} rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-4`}>
                    <Icon className={`h-5 w-5 md:h-7 md:w-7 ${p.color || "text-emerald-700"}`} />
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{p.title || t(p.en || "")}</h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed hidden md:block line-clamp-2">{p.description || t(p.dEn || "")}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Full-Day Ecosystem */}
      <section className="relative py-14 md:py-22 bg-gradient-to-b from-emerald-50 via-white to-white reveal-on-scroll" data-reveal data-section-label="Ecosystem">
        <WaveTop color="#ecfeff" />
        <WaveBottom color="#f8fafc" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-14 items-center max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-5">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-balance">
                {pickLocalizedText(language, cms?.ecosystemHeadlineI18n, cms?.ecosystemHeadline || "A Full-Day Ecosystem of Growth")}
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3">
                {t("A full-day learning ecosystem with clear rhythm, rituals, and outcomes.")}
              </p>
              <div className="space-y-3 md:space-y-4">
                {ecosystemBullets.map((item: any, i: number) => {
                  const Icon = item.icon || BookOpen
                  return (
                    <div key={i} className="flex items-start gap-3 md:gap-4">
                      <div className={`w-10 h-10 md:w-11 md:h-11 ${item.bg || "bg-emerald-100"} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                        <Icon className={`h-4 w-4 md:h-5 md:w-5 ${item.color || "text-emerald-700"}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">{t(item.title || item.en || "")}</h4>
                        <p className="text-gray-600 text-xs md:text-sm hidden md:block line-clamp-2">{t(item.description || item.dEn || "")}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100 via-white to-teal-50 rounded-3xl blur-xl opacity-70" />
                <div className="relative rounded-3xl shadow-2xl overflow-hidden border border-emerald-50">
                  <GallerySlider items={ecosystemGallery} aspectRatio="4/3" rounded="2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Holistic Evaluation */}
      <section className="relative py-14 md:py-22 bg-gradient-to-b from-white via-slate-50 to-emerald-50 overflow-hidden reveal-on-scroll" data-reveal data-section-label="Assessment">
        <WaveTop color="#f8fafc" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row gap-10 md:gap-14 items-center max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100 via-white to-teal-50 rounded-3xl blur-xl opacity-70" />
                <div className="relative rounded-3xl shadow-2xl overflow-hidden border border-emerald-50">
                  <GallerySlider items={assessmentGallery} aspectRatio="4/3" rounded="2xl" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-balance">
                {t("What Gets Assessed Gets Attention")}
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-5 md:mb-6 leading-relaxed">
                {t("Track growth continuously across academics, habits, and character.")}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {assessmentCards.map((item: any, i: number) => (
                  <div
                    key={i}
                    data-reveal
                    data-reveal-delay={i * 70}
                    className={`${item.bg || "bg-emerald-50"} rounded-lg md:rounded-xl p-3 md:p-5 shadow-sm border border-gray-100 interactive-lift reveal-on-scroll`}
                  >
                    <h4 className="font-bold text-gray-900 mb-1 text-xs md:text-sm">{t(item.title || item.en || "")}</h4>
                    <p className="text-gray-600 text-[10px] md:text-xs leading-relaxed hidden md:block line-clamp-2">{t(item.description || item.dEn || "")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-12 md:py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden reveal-on-scroll" data-reveal data-section-label="Stats">
        <WaveTop color="#ecfeff" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((s: any, i: number) => (
              <div
                key={i}
                data-reveal
                data-reveal-delay={i * 80}
                className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-lg transition-transform duration-300 hover:-translate-y-1 interactive-lift reveal-on-scroll"
              >
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{s.value || t(s.vEn || "")}</div>
                <div className="text-gray-300 text-xs md:text-base">{t(s.label || s.lEn || "")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gray-50 reveal-on-scroll" data-reveal data-section-label="Why Meed">
        <div className="container mx-auto px-4">
          {storyImages.length > 2 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto mb-8 md:mb-12">
              {storyImages.slice(0, 3).map((img, i) => (
                <div key={`${img.src}-${i}`} className="rounded-2xl overflow-hidden shadow-md">
                  <img src={img.src} alt={img.alt} className="w-full h-40 md:h-56 object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-balance">
              {t("Why Choose Meed International?", "\u092E\u0940\u0921 \u0907\u0902\u091F\u0930\u0928\u0947\u0936\u0928\u0932 \u0915\u094D\u092F\u094B\u0902 \u091A\u0941\u0928\u0947\u0902?", "\u0645\u06CC\u0688 \u0627\u0646\u0679\u0631\u0646\u06CC\u0634\u0646\u0644 \u06A9\u06CC\u0648\u06BA?", "\u09AE\u09C0\u09A1 \u0987\u09A8\u09CD\u099F\u09BE\u09B0\u09A8\u09CD\u09AF\u09BE\u09B6\u09A8\u09BE\u09B2 \u0995\u09C7\u09A8?")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: BookOpen, bg: "bg-emerald-600", en: "Residential Full-Day Ecosystem", hi: "\u0906\u0935\u093E\u0938\u0940\u092F \u092A\u0942\u0930\u094D\u0923-\u0926\u093F\u0935\u0938\u0940\u092F \u0924\u0902\u0924\u094D\u0930", ur: "\u0631\u06C1\u0627\u0626\u0634\u06CC \u0645\u06A9\u0645\u0644 \u0631\u0648\u0632\u0627\u0646\u06C1 \u0646\u0638\u0627\u0645", bn: "\u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u09AA\u09C2\u09B0\u09CD\u09A3-\u09A6\u09BF\u09AC\u09B8 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09A4\u09A8\u09CD\u09A4\u09CD\u09B0", dEn: "Not a half-day school. AMRIs and NMRIs create a coherent ecology from Fajr to lights-out.", dHi: "\u092F\u0939 \u0906\u0927\u0947 \u0926\u093F\u0928 \u0915\u093E \u0938\u094D\u0915\u0942\u0932 \u0928\u0939\u0940\u0902\u0964 AMRIs \u0914\u0930 NMRIs \u092B\u091C\u094D\u0930 \u0938\u0947 \u0930\u094B\u0936\u0928\u0940 \u092C\u0941\u091D\u093E\u0928\u0947 \u0924\u0915 \u0938\u0941\u0938\u0902\u0917\u0924 \u092A\u093E\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u0915\u0940\u0964", dUr: "\u0622\u062F\u06BE\u06D2 \u062F\u0646 \u06A9\u0627 \u0627\u0633\u06A9\u0648\u0644 \u0646\u06C1\u06CC\u06BA\u06D4 AMRIs \u0627\u0648\u0631 NMRIs \u0641\u062C\u0631 \u0633\u06D2 \u0633\u0648\u0646\u06D2 \u062A\u06A9 \u0645\u0631\u0628\u0648\u0637 \u0645\u0627\u062D\u0648\u0644\u06CC\u0627\u062A\u06CC \u0646\u0638\u0627\u0645\u06D4", dBn: "\u098F\u099F\u09BF \u0985\u09B0\u09CD\u09A7\u09C7\u0995 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09B8\u09CD\u0995\u09C1\u09B2 \u09A8\u09AF\u09BC\u0964 AMRIs \u0993 NMRIs \u09AB\u099C\u09B0 \u09A5\u09C7\u0995\u09C7 \u09B0\u09BE\u09A4 \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09B8\u09C1\u09B8\u0982\u0997\u09A4 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09A4\u09A8\u09CD\u09A4\u09CD\u09B0\u0964" },
              { icon: Globe, bg: "bg-teal-600", en: "Global Best Practices", hi: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0936\u094D\u0930\u0947\u0937\u094D\u0920 \u092A\u094D\u0930\u0925\u093E\u090F\u0901", ur: "\u0639\u0627\u0644\u0645\u06CC \u0628\u06C1\u062A\u0631\u06CC\u0646 \u0637\u0631\u06CC\u0642\u06D2", bn: "\u09AC\u09C8\u09B6\u09CD\u09AC\u09BF\u0995 \u09B8\u09C7\u09B0\u09BE \u0985\u09AD\u09CD\u09AF\u09BE\u09B8", dEn: "Drawing from CCE, IB PYP, Finnish education, and Islamic pedagogy.", dHi: "CCE, IB PYP, \u092B\u093F\u0928\u094D\u0928\u093F\u0936 \u0936\u093F\u0915\u094D\u0937\u093E \u0914\u0930 \u0907\u0938\u094D\u0932\u093E\u092E\u0940 \u0936\u093F\u0915\u094D\u0937\u093E\u0936\u093E\u0938\u094D\u0924\u094D\u0930\u0964", dUr: "CCE\u060C IB PYP\u060C \u0641\u0646\u0634 \u062A\u0639\u0644\u06CC\u0645 \u0627\u0648\u0631 \u0627\u0633\u0644\u0627\u0645\u06CC \u0637\u0631\u06CC\u0642\u06C2 \u062A\u0639\u0644\u06CC\u0645\u06D4", dBn: "CCE, IB PYP, \u09AB\u09BF\u09A8\u09BF\u09B6 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE \u098F\u09AC\u0982 \u0987\u09B8\u09B2\u09BE\u09AE\u09BF\u0995 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09A8\u09C0\u09A4\u09BF\u0964" },
              { icon: Award, bg: "bg-cyan-600", en: "Discipline Over Outcome", hi: "\u092A\u0930\u093F\u0923\u093E\u092E \u0938\u0947 \u090A\u092A\u0930 \u0905\u0928\u0941\u0936\u093E\u0938\u0928", ur: "\u0646\u062A\u06CC\u062C\u06D2 \u0633\u06D2 \u0628\u0691\u06BE \u06A9\u0631 \u0646\u0638\u0645", bn: "\u09AB\u09B2\u09BE\u09AB\u09B2\u09C7\u09B0 \u0989\u09AA\u09B0\u09C7 \u09B6\u09C3\u0999\u09CD\u0996\u09B2\u09BE", dEn: "We chase disciplines, not results. Sustainable excellence flows from consistent rituals.", dHi: "\u0939\u092E \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902, \u0905\u0928\u0941\u0936\u093E\u0938\u0928 \u0915\u093E \u092A\u0940\u091B\u093E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964 \u0938\u094D\u0925\u093E\u092F\u0940 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F\u0924\u093E \u0928\u093F\u0930\u0902\u0924\u0930 \u0905\u0928\u0941\u0937\u094D\u0920\u093E\u0928\u094B\u0902 \u0938\u0947 \u0906\u0924\u0940 \u0939\u0948\u0964", dUr: "\u06C1\u0645 \u0646\u062A\u0627\u0626\u062C \u0646\u06C1\u06CC\u06BA\u060C \u0646\u0638\u0645 \u0648 \u0636\u0628\u0637 \u06A9\u0627 \u067E\u06CC\u0686\u06BE \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4 \u067E\u0627\u0626\u06CC\u062F\u0627\u0631 \u0639\u0645\u062F\u06AF\u06CC \u0645\u0633\u0644\u0633\u0644 \u0631\u0633\u0648\u0645\u0627\u062A \u0633\u06D2 \u0622\u062A\u06CC \u06C1\u06D2\u06D4", dBn: "\u0986\u09AE\u09B0\u09BE \u09AB\u09B2\u09BE\u09AB\u09B2 \u09A8\u09AF\u09BC, \u09B6\u09C3\u0999\u09CD\u0996\u09B2\u09BE\u09B0 \u09AA\u09C7\u099B\u09A8\u09C7 \u099B\u09C1\u099F\u09BF\u0964 \u099F\u09C7\u0995\u09B8\u0987 \u0989\u09CE\u0995\u09B0\u09CD\u09B7 \u09A8\u09BF\u09B0\u09A8\u09CD\u09A4\u09B0 \u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BE\u09A8 \u09A5\u09C7\u0995\u09C7 \u0986\u09B8\u09C7\u0964" },
            ].map((item, i) => (
              <div
                key={i}
                data-reveal
                data-reveal-delay={i * 80}
                className="text-center p-5 md:p-8 bg-white rounded-xl shadow-md md:shadow-lg interactive-lift reveal-on-scroll"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6`}>
                  <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{t(item.en, item.hi, item.ur, item.bn)}</h3>
                <p className="text-gray-600 text-xs md:text-sm line-clamp-2">{t(item.dEn, item.dHi, item.dUr, item.dBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600 reveal-on-scroll" data-reveal data-section-label="Apply">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-balance">
            {t("A Deserved Reward Earned Through Virtue, Effort, and Excellence")}
          </h2>
          <p className="text-sm md:text-xl text-emerald-100 mb-6 md:mb-8 px-2">
            {t("A school experience designed for real growth in both worlds.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 md:px-8 py-3 text-sm md:text-lg rounded-lg font-semibold w-full sm:w-auto">
                {t("Apply Now")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent px-6 md:px-8 py-3 text-sm md:text-lg rounded-lg w-full sm:w-auto"
              >
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                {t("Contact Us")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

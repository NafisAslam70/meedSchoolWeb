"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen, Phone, Users, Award, Globe, Shield, Lightbulb, Zap, Heart,
  Eye, Target, Repeat, Play, Search, Clock,
} from "lucide-react"
import { GallerySlider } from "@/components/gallery-slider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import TestimonialsSection from "@/components/testimonials"
import HeroSlider from "@/components/hero-slider"
import { useLanguage } from "@/lib/language-context"
import { urlFor } from "@/sanity/lib/image"

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
  executionSteps?: any[]
  assessmentCards?: any[]
  assessmentImage?: { image?: any; alt?: string }
  assessmentGallery?: any[]
  stats?: any[]
}

export default function HomePage() {
  const { t } = useLanguage()
  const [cms, setCms] = useState<CMSHome | null>(null)

  useEffect(() => {
    fetch("/api/cms/home")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setCms(res.data)
      })
      .catch(() => {})
  }, [])

  const heroSlides = useMemo(() => {
    if (!cms?.slides?.length) return undefined
    return cms.slides.map((s) => ({
      title: s.title || "",
      subtitle: s.subtitle || "",
      description: s.description || "",
      image: s.image?.image ? urlFor(s.image.image).width(1600).height(900).url() : undefined,
      primaryCta: s.primaryCta ? { label: s.primaryCta.label, href: s.primaryCta.href || "#" } : undefined,
      secondaryCta: s.secondaryCta ? { label: s.secondaryCta.label, href: s.secondaryCta.href || "#" } : undefined,
    }))
  }, [cms])

  const brandVideoEmbed = useMemo(() => {
    if (!cms?.videoUrl) return null
    try {
      const u = new URL(cms.videoUrl)
      const host = u.hostname
      let id = ""
      if (host.includes("youtu.be")) {
        id = u.pathname.slice(1)
      } else if (host.includes("youtube.com")) {
        id = u.searchParams.get("v") || u.pathname.split("/").pop() || ""
      }
      if (!id) return null
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
    } catch {
      return null
    }
  }, [cms?.videoUrl])

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
          title: v.title,
          description: v.description,
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
          title: p.title,
          description: p.description,
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
      ? cms.ecosystemBullets.map((b: any) => ({ title: b.title, description: b.description }))
      : [
          { icon: BookOpen, bg: "bg-emerald-100", color: "text-emerald-600", en: "Academic MRIs (AMRI)", dEn: "MSP, MHCP, Assembly, and Day Open/Shutdown rituals." },
          { icon: Users, bg: "bg-teal-100", color: "text-teal-600", en: "Non-Academic MRIs (NMRI)", dEn: "Blitz windows, recreation, PowerNap, spiritual anchors." },
          { icon: Clock, bg: "bg-cyan-100", color: "text-cyan-600", en: "17 Micro-Rituals, 7 Daily Blocks", dEn: "From pre-Fajr to lights-out, every block has purpose." },
        ]

  const executionSteps =
    cms?.executionSteps?.length > 0
      ? cms.executionSteps.map((s: any) => ({ title: s.title, description: s.description }))
      : [
          { icon: Target, en: "Rooting", dEn: "Research-based methodologies" },
          { icon: Play, en: "Initiating", dEn: "Prepare and deliver materials" },
          { icon: Zap, en: "Acting x 3", dEn: "Consistent action over talk" },
          { icon: Search, en: "Tracking", dEn: "Log evidence via AUP/APD" },
          { icon: Repeat, en: "Repeating", dEn: "Daily, weekly, monthly iteration" },
        ]

  const assessmentCards =
    cms?.assessmentCards?.length > 0
      ? cms.assessmentCards.map((a: any) => ({ title: a.title, description: a.description }))
      : [
          { en: "Scholastic", dEn: "Subject mastery, TCS Cycle, Mid-Term and Term-End Exams", bg: "bg-emerald-50" },
          { en: "Co-Scholastic", dEn: "Character, habits, spiritual formation", bg: "bg-teal-50" },
          { en: "TCS Cycle", dEn: "Test, Correction, Submission -- every chapter", bg: "bg-cyan-50" },
          { en: "T1-T4 Bands", dEn: "Mastery to Foundation -- targeted guidance", bg: "bg-gray-50" },
        ]

  const stats =
    cms?.stats?.length > 0
      ? cms.stats.map((s: any) => ({ value: s.value, label: s.label }))
      : [
          { vEn: "Nursery-8", lEn: "Grade Levels" },
          { vEn: "17", lEn: "Daily Micro-Rituals" },
          { vEn: "5", lEn: "Guiding Principles" },
          { vEn: "Dual", lEn: "Success Model" },
        ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSlider slides={heroSlides} />

      {brandVideoEmbed && (
        <section className="bg-black">
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={brandVideoEmbed}
              title="MEED brand film"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="mt-3 md:mt-4 flex items-center justify-between text-sm text-gray-200 px-4 md:px-6">
            <span className="font-semibold uppercase tracking-wide text-emerald-300">{t("Watch our story")}</span>
            <span className="text-gray-400">{t("2 min highlight film")}</span>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">
              {t("Our Vision")}
            </h2>
            <p className="text-base md:text-xl text-emerald-200 leading-relaxed italic px-2">
              {t("\"To nurture future leaders of excellence -- masters in both Dunya and Akhirah -- through Enlightenment, Empowerment and Dedication.\"")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Lightbulb, en: "Enlighten", hi: "\u091C\u094D\u091E\u093E\u0928", ur: "\u0631\u0648\u0634\u0646\u06CC", bn: "\u099C\u09CD\u099E\u09BE\u09A8", color: "text-emerald-400", dEn: "Students gain both revealed (Islamic) and acquired (worldly) knowledge.", dHi: "\u091B\u093E\u0924\u094D\u0930 \u0907\u0938\u094D\u0932\u093E\u092E\u0940 \u0914\u0930 \u0938\u093E\u0902\u0938\u093E\u0930\u093F\u0915 \u0926\u094B\u0928\u094B\u0902 \u091C\u094D\u091E\u093E\u0928 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964", dUr: "\u0637\u0644\u0628\u0627\u0621 \u0627\u0633\u0644\u0627\u0645\u06CC \u0627\u0648\u0631 \u062F\u0646\u06CC\u0627\u0648\u06CC \u062F\u0648\u0646\u0648\u06BA \u0639\u0644\u0648\u0645 \u062D\u0627\u0635\u0644 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4", dBn: "\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0\u09B0\u09BE \u0987\u09B8\u09B2\u09BE\u09AE\u09BF\u0995 \u0993 \u09AA\u09BE\u09B0\u09CD\u09A5\u09BF\u09AC \u0989\u09AD\u09AF\u09BC \u099C\u09CD\u099E\u09BE\u09A8 \u0985\u09B0\u09CD\u099C\u09A8 \u0995\u09B0\u09C7\u0964" },
              { icon: Zap, en: "Empower", hi: "\u0938\u0936\u0915\u094D\u0924\u093F\u0915\u0930\u0923", ur: "\u0628\u0627\u0627\u062E\u062A\u06CC\u0627\u0631", bn: "\u0995\u09CD\u09B7\u09AE\u09A4\u09BE\u09AF\u09BC\u09A8", color: "text-teal-400", dEn: "Equip learners with 21st-century skills and rituals of mastery.", dHi: "\u0936\u093F\u0915\u094D\u0937\u093E\u0930\u094D\u0925\u093F\u092F\u094B\u0902 \u0915\u094B 21\u0935\u0940\u0902 \u0938\u0926\u0940 \u0915\u0947 \u0915\u094C\u0936\u0932 \u0914\u0930 \u092E\u093E\u0938\u094D\u091F\u0930\u0940 \u0915\u0940 \u0930\u093F\u0935\u093E\u091C\u0947\u0902\u0964", dUr: "\u0637\u0644\u0628\u0627\u0621 \u06A9\u0648 21\u0648\u06CC\u06BA \u0635\u062F\u06CC \u06A9\u06CC \u0645\u06C1\u0627\u0631\u062A\u0648\u06BA \u0633\u06D2 \u0644\u06CC\u0633 \u06A9\u0631\u0646\u0627\u06D4", dBn: "\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0\u09A6\u09C7\u09B0 21 \u09B6\u09A4\u0995\u09C7\u09B0 \u09A6\u0995\u09CD\u09B7\u09A4\u09BE\u09AF\u09BC \u09B8\u099C\u09CD\u099C\u09BF\u09A4 \u0995\u09B0\u09BE\u0964" },
              { icon: Shield, en: "Dedicate", hi: "\u0938\u092E\u0930\u094D\u092A\u0923", ur: "\u0639\u0632\u0645", bn: "\u09A8\u09BF\u09B7\u09CD\u09A0\u09BE", color: "text-cyan-400", dEn: "Ground hearts in discipline, Ibadah, and sustained focus.", dHi: "\u0905\u0928\u0941\u0936\u093E\u0938\u0928, \u0907\u092C\u093E\u0926\u0924 \u0914\u0930 \u0928\u093F\u0930\u0902\u0924\u0930 \u0927\u094D\u092F\u093E\u0928 \u092E\u0947\u0902 \u0939\u0943\u0926\u092F \u0938\u094D\u0925\u093F\u0930 \u0915\u0930\u0928\u093E\u0964", dUr: "\u0646\u0638\u0645 \u0648 \u0636\u0628\u0637\u060C \u0639\u0628\u0627\u062F\u062A \u0627\u0648\u0631 \u0645\u0633\u0644\u0633\u0644 \u062A\u0648\u062C\u06C1 \u0645\u06CC\u06BA \u062F\u0644\u0648\u06BA \u06A9\u0648 \u0645\u0636\u0628\u0648\u0637 \u06A9\u0631\u0646\u0627\u06D4", dBn: "\u09B6\u09C3\u0999\u09CD\u0996\u09B2\u09BE, \u0987\u09AC\u09BE\u09A6\u09A4 \u098F\u09AC\u0982 \u09A8\u09BF\u09B0\u09A8\u09CD\u09A4\u09B0 \u09AE\u09A8\u09CB\u09AF\u09CB\u0997\u09C7 \u09B9\u09C3\u09A6\u09AF\u09BC \u09B8\u09CD\u09A5\u09BF\u09B0 \u0995\u09B0\u09BE\u0964" },
              { icon: Award, en: "Master", hi: "\u092E\u093E\u0938\u094D\u091F\u0930\u0940", ur: "\u0645\u06C1\u0627\u0631\u062A", bn: "\u09A6\u0995\u09CD\u09B7\u09A4\u09BE", color: "text-yellow-400", dEn: "Achieve excellence in spiritual and worldly domains.", dHi: "\u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0914\u0930 \u0938\u093E\u0902\u0938\u093E\u0930\u093F\u0915 \u0926\u094B\u0928\u094B\u0902 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u094B\u0902 \u092E\u0947\u0902 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F\u0924\u093E\u0964", dUr: "\u0631\u0648\u062D\u0627\u0646\u06CC \u0627\u0648\u0631 \u062F\u0646\u06CC\u0627\u0648\u06CC \u062F\u0648\u0646\u0648\u06BA \u0645\u06CC\u0627\u062F\u06CC\u0646 \u0645\u06CC\u06BA \u0639\u0645\u062F\u06AF\u06CC \u062D\u0627\u0635\u0644 \u06A9\u0631\u0646\u0627\u06D4", dBn: "\u0986\u09A7\u09CD\u09AF\u09BE\u09A4\u09CD\u09AE\u09BF\u0995 \u0993 \u09AA\u09BE\u09B0\u09CD\u09A5\u09BF\u09AC \u0989\u09AD\u09AF\u09BC \u0995\u09CD\u09B7\u09C7\u09A4\u09CD\u09B0\u09C7 \u0989\u09CE\u0995\u09B0\u09CD\u09B7\u0964" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
                <item.icon className={`h-6 w-6 md:h-8 md:w-8 ${item.color} mb-2 md:mb-4`} />
                <h3 className={`text-sm md:text-lg font-bold ${item.color} mb-1 md:mb-2`}>
                  {t(item.en, item.hi, item.ur, item.bn)}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed hidden sm:block">
                  {t(item.dEn, item.dHi, item.dUr, item.dBn)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Guiding Principles */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-balance">
              {t("Five Guiding Principles")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Eye, en: "Vision", hi: "\u0926\u0943\u0937\u094D\u091F\u093F", ur: "\u0648\u0698\u0646", bn: "\u09A6\u09C3\u09B7\u09CD\u099F\u09BF", dEn: "Clarity of purpose guides every decision.", dHi: "\u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F \u0915\u0940 \u0938\u094D\u092A\u0937\u094D\u091F\u0924\u093E \u0939\u0930 \u0928\u093F\u0930\u094D\u0923\u092F \u0915\u093E \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928\u0964", dUr: "\u0645\u0642\u0635\u062F \u06A9\u06CC \u0648\u0636\u0627\u062D\u062A \u06C1\u0631 \u0641\u06CC\u0635\u0644\u06D2 \u06A9\u06CC \u0631\u06C1\u0646\u0645\u0627\u0626\u06CC\u06D4", dBn: "\u0989\u09A6\u09CD\u09A6\u09C7\u09B6\u09CD\u09AF\u09C7\u09B0 \u09B8\u09CD\u09AA\u09B7\u09CD\u099F\u09A4\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09B8\u09BF\u09A6\u09CD\u09A7\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE \u0995\u09B0\u09C7\u0964", bg: "bg-emerald-100", color: "text-emerald-600" },
              { icon: Heart, en: "Sincerity", hi: "\u0908\u092E\u093E\u0928\u0926\u093E\u0930\u0940", ur: "\u0627\u062E\u0644\u0627\u0635", bn: "\u0986\u09A8\u09CD\u09A4\u09B0\u09BF\u0995\u09A4\u09BE", dEn: "Ikhlas and objectivity form our ethical backbone.", dHi: "\u0907\u0916\u0932\u093E\u0938 \u0914\u0930 \u0935\u0938\u094D\u0924\u0941\u0928\u093F\u0937\u094D\u0920\u0924\u093E \u0939\u092E\u093E\u0930\u0940 \u0928\u0948\u0924\u093F\u0915 \u0930\u0940\u0922\u093C\u0964", dUr: "\u0627\u062E\u0644\u0627\u0635 \u0627\u0648\u0631 \u062D\u0642\u06CC\u0642\u062A \u067E\u0633\u0646\u062F\u06CC \u06C1\u0645\u0627\u0631\u06CC \u0627\u062E\u0644\u0627\u0642\u06CC \u0628\u0646\u06CC\u0627\u062F\u06D4", dBn: "\u0987\u0996\u09B2\u09BE\u09B8 \u0993 \u09AC\u09B8\u09CD\u09A4\u09C1\u09A8\u09BF\u09B7\u09CD\u09A0\u09A4\u09BE \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09A8\u09C8\u09A4\u09BF\u0995 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0964", bg: "bg-teal-100", color: "text-teal-600" },
              { icon: Search, en: "Depth", hi: "\u0917\u0939\u0930\u093E\u0908", ur: "\u06AF\u06C1\u0631\u0627\u0626\u06CC", bn: "\u0997\u09AD\u09C0\u09B0\u09A4\u09BE", dEn: "Profound understanding over superficial coverage.", dHi: "\u0938\u0924\u0939\u0940 \u0915\u0935\u0930\u0947\u091C \u0915\u0940 \u092C\u091C\u093E\u092F \u0917\u0939\u0928 \u0938\u092E\u091D\u0964", dUr: "\u0633\u0637\u062D\u06CC \u06A9\u06CC \u0628\u062C\u0627\u0626\u06D2 \u06AF\u06C1\u0631\u06CC \u0633\u0645\u062C\u06BE\u06D4", dBn: "\u09B8\u09A4\u09B9\u09C0 \u0995\u09AD\u09BE\u09B0\u09C7\u099C\u09C7\u09B0 \u09AC\u09A6\u09B2\u09C7 \u0997\u09AD\u09C0\u09B0 \u09AC\u09CB\u09A7\u0964", bg: "bg-cyan-100", color: "text-cyan-600" },
              { icon: Repeat, en: "Ritual", hi: "\u0905\u0928\u0941\u0937\u094D\u0920\u093E\u0928", ur: "\u0631\u0633\u0648\u0645\u0627\u062A", bn: "\u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BE\u09A8", dEn: "Consistent practices build sustainable excellence.", dHi: "\u0928\u093F\u0930\u0902\u0924\u0930 \u0905\u092D\u094D\u092F\u093E\u0938 \u0938\u094D\u0925\u093E\u092F\u0940 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F\u0924\u093E\u0964", dUr: "\u0645\u0633\u0644\u0633\u0644 \u0639\u0645\u0644 \u067E\u0627\u0626\u06CC\u062F\u0627\u0631 \u0639\u0645\u062F\u06AF\u06CC \u0628\u0646\u0627\u062A\u0627 \u06C1\u06D2\u06D4", dBn: "\u09A8\u09BF\u09B0\u09A8\u09CD\u09A4\u09B0 \u0985\u09AD\u09CD\u09AF\u09BE\u09B8 \u099F\u09C7\u0995\u09B8\u0987 \u0989\u09CE\u0995\u09B0\u09CD\u09B7 \u0997\u09A1\u09BC\u09C7\u0964", bg: "bg-emerald-100", color: "text-emerald-600" },
              { icon: Shield, en: "Perseverance", hi: "\u0926\u0943\u0922\u093C\u0924\u093E", ur: "\u0627\u0633\u062A\u0642\u0627\u0645\u062A", bn: "\u09A6\u09C3\u09A2\u09BC\u09A4\u09BE", dEn: "Resilience transforms potential into achievement.", dHi: "\u0932\u091A\u0940\u0932\u0947\u092A\u0928 \u0938\u0902\u092D\u093E\u0935\u0928\u093E \u0915\u094B \u0909\u092A\u0932\u092C\u094D\u0927\u093F \u092E\u0947\u0902 \u092C\u0926\u0932\u0924\u093E \u0939\u0948\u0964", dUr: "\u0644\u0686\u06A9 \u0635\u0644\u0627\u062D\u06CC\u062A \u06A9\u0648 \u06A9\u0627\u0645\u06CC\u0627\u0628\u06CC \u0645\u06CC\u06BA \u0628\u062F\u0644\u062A\u06CC \u06C1\u06D2\u06D4", dBn: "\u09B8\u09B9\u09A8\u09B6\u09C0\u09B2\u09A4\u09BE \u09B8\u09AE\u09CD\u09AD\u09BE\u09AC\u09A8\u09BE\u0995\u09C7 \u09B8\u09BE\u09AB\u09B2\u09CD\u09AF\u09C7 \u09B0\u09C2\u09AA\u09BE\u09A8\u09CD\u09A4\u09B0 \u0995\u09B0\u09C7\u0964", bg: "bg-teal-100", color: "text-teal-600" },
            ].map((p, i) => (
              <div key={i} className="text-center bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-10 h-10 md:w-14 md:h-14 ${p.bg} rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-4`}>
                  <p.icon className={`h-5 w-5 md:h-7 md:w-7 ${p.color}`} />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{t(p.en, p.hi, p.ur, p.bn)}</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{t(p.dEn, p.dHi, p.dUr, p.dBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Day Ecosystem */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-balance">
                {t("A Full-Day Ecosystem of Growth")}
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-5 md:mb-6 leading-relaxed">
                {t(
                  "MEED is not a morning-only or half-day programme. We provide a complete educational ecosystem structured by MEED Rituals Imaging (MRI).",
                  "MEED \u0915\u0947\u0935\u0932 \u0938\u0941\u092C\u0939 \u092F\u093E \u0906\u0927\u0947 \u0926\u093F\u0928 \u0915\u093E \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0939\u092E MRI \u0926\u094D\u0935\u093E\u0930\u093E \u0938\u0902\u0930\u091A\u093F\u0924 \u090F\u0915 \u0938\u0902\u092A\u0942\u0930\u094D\u0923 \u0936\u0948\u0915\u094D\u0937\u093F\u0915 \u092A\u093E\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u0915\u0940 \u0924\u0902\u0924\u094D\u0930 \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964",
                  "MEED \u0635\u0631\u0641 \u0635\u0628\u062D \u06CC\u0627 \u0622\u062F\u06BE\u06D2 \u062F\u0646 \u06A9\u0627 \u067E\u0631\u0648\u06AF\u0631\u0627\u0645 \u0646\u06C1\u06CC\u06BA\u06D4 \u06C1\u0645 MRI \u06A9\u06D2 \u0630\u0631\u06CC\u0639\u06D2 \u0645\u06A9\u0645\u0644 \u062A\u0639\u0644\u06CC\u0645\u06CC \u0645\u0627\u062D\u0648\u0644\u06CC\u0627\u062A\u06CC \u0646\u0638\u0627\u0645 \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4",
                  "MEED \u09B6\u09C1\u09A7\u09C1 \u09B8\u0995\u09BE\u09B2 \u09AC\u09BE \u0985\u09B0\u09CD\u09A7\u09C7\u0995 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AA\u09CD\u09B0\u09CB\u0997\u09CD\u09B0\u09BE\u09AE \u09A8\u09AF\u09BC\u0964 \u0986\u09AE\u09B0\u09BE MRI \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09A4\u09A8\u09CD\u09A4\u09CD\u09B0 \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09BF\u0964"
                )}
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  { icon: BookOpen, bg: "bg-emerald-100", color: "text-emerald-600", en: "Academic MRIs (AMRI)", hi: "\u0936\u0948\u0915\u094D\u0937\u093F\u0915 MRIs (AMRI)", ur: "\u0627\u06A9\u06CC\u0688\u0645\u06A9 MRIs (AMRI)", bn: "\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4 MRIs (AMRI)", dEn: "MSP, MHCP, Assembly, and Day Open/Shutdown rituals.", dHi: "MSP, MHCP, \u0938\u092D\u093E, Day Open/Shutdown \u0905\u0928\u0941\u0937\u094D\u0920\u093E\u0928\u0964", dUr: "MSP\u060C MHCP\u060C \u0627\u0633\u0645\u0628\u0644\u06CC\u060C Day Open/Shutdown \u0631\u0633\u0648\u0645\u0627\u062A\u06D4", dBn: "MSP, MHCP, \u0985\u09CD\u09AF\u09BE\u09B8\u09C7\u09AE\u09CD\u09AC\u09B2\u09BF, Day Open/Shutdown \u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BE\u09A8\u0964" },
                  { icon: Users, bg: "bg-teal-100", color: "text-teal-600", en: "Non-Academic MRIs (NMRI)", hi: "\u0917\u0948\u0930-\u0936\u0948\u0915\u094D\u0937\u093F\u0915 MRIs (NMRI)", ur: "\u063A\u06CC\u0631 \u0627\u06A9\u06CC\u0688\u0645\u06A9 MRIs (NMRI)", bn: "\u0985-\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4 MRIs (NMRI)", dEn: "Blitz windows, recreation, PowerNap, spiritual anchors.", dHi: "Blitz \u0935\u093F\u0902\u0921\u094B, \u092E\u0928\u094B\u0930\u0902\u091C\u0928, PowerNap, \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0906\u0927\u093E\u0930\u0964", dUr: "Blitz \u0648\u0646\u0688\u0648\u0632\u060C \u062A\u0641\u0631\u06CC\u062D\u060C PowerNap\u060C \u0631\u0648\u062D\u0627\u0646\u06CC \u0628\u0646\u06CC\u0627\u062F\u06D4", dBn: "Blitz \u0989\u0987\u09A8\u09CD\u09A1\u09CB, \u09AC\u09BF\u09A8\u09CB\u09A6\u09A8, PowerNap, \u0986\u09A7\u09CD\u09AF\u09BE\u09A4\u09CD\u09AE\u09BF\u0995 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0964" },
                  { icon: Clock, bg: "bg-cyan-100", color: "text-cyan-600", en: "17 Micro-Rituals, 7 Daily Blocks", hi: "17 \u0938\u0942\u0915\u094D\u0937\u094D\u092E-\u0905\u0928\u0941\u0937\u094D\u0920\u093E\u0928, 7 \u0926\u0948\u0928\u093F\u0915 \u0916\u0902\u0921", ur: "17 \u0645\u0627\u0626\u06CC\u06A9\u0631\u0648-\u0631\u0633\u0648\u0645\u0627\u062A\u060C 7 \u0631\u0648\u0632\u0627\u0646\u06C1 \u0628\u0644\u0627\u06A9\u0633", bn: "17\u099F\u09BF \u0995\u09CD\u09B7\u09C1\u09A6\u09CD\u09B0-\u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BE\u09A8, 7\u099F\u09BF \u09A6\u09C8\u09A8\u09BF\u0995 \u09AC\u09CD\u09B2\u0995", dEn: "From pre-Fajr to lights-out, every block has purpose.", dHi: "\u092B\u091C\u094D\u0930 \u092A\u0942\u0930\u094D\u0935 \u0938\u0947 \u0930\u094B\u0936\u0928\u0940 \u092C\u0941\u091D\u093E\u0928\u0947 \u0924\u0915, \u0939\u0930 \u0916\u0902\u0921 \u0915\u093E \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F\u0964", dUr: "\u0641\u062C\u0631 \u0633\u06D2 \u067E\u06C1\u0644\u06D2 \u0633\u06D2 \u0633\u0648\u0646\u06D2 \u062A\u06A9\u060C \u06C1\u0631 \u062D\u0635\u06D2 \u06A9\u0627 \u0645\u0642\u0635\u062F\u06D4", dBn: "\u09AB\u099C\u09B0 \u09AA\u09C2\u09B0\u09CD\u09AC \u09A5\u09C7\u0995\u09C7 \u09B0\u09BE\u09A4 \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4, \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AC\u09CD\u09B2\u0995\u09C7\u09B0 \u0989\u09A6\u09CD\u09A6\u09C7\u09B6\u09CD\u09AF \u0986\u099B\u09C7\u0964" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4">
                    <div className={`w-9 h-9 md:w-10 md:h-10 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <item.icon className={`h-4 w-4 md:h-5 md:w-5 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">{t(item.en, item.hi, item.ur, item.bn)}</h4>
                      <p className="text-gray-600 text-xs md:text-sm">{t(item.dEn, item.dHi, item.dUr, item.dBn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <GallerySlider items={ecosystemGallery} aspectRatio="4/3" rounded="2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Execution Formula */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-balance">
              {t("Execution First: Our Operating Formula")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { icon: Target, en: "Rooting", hi: "\u091C\u0921\u093C", ur: "\u0628\u0646\u06CC\u0627\u062F", bn: "\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF", dEn: "Research-based methodologies", dHi: "\u0936\u094B\u0927-\u0906\u0927\u093E\u0930\u093F\u0924 \u0915\u093E\u0930\u094D\u092F\u092A\u094D\u0930\u0923\u093E\u0932\u0940", dUr: "\u062A\u062D\u0642\u06CC\u0642 \u067E\u0631 \u0645\u0628\u0646\u06CC \u0637\u0631\u06CC\u0642\u06D2", dBn: "\u0997\u09AC\u09C7\u09B7\u09A3\u09BE-\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u09AA\u09A6\u09CD\u09A7\u09A4\u09BF" },
              { icon: Play, en: "Initiating", hi: "\u0906\u0930\u0902\u092D", ur: "\u0622\u063A\u0627\u0632", bn: "\u09B6\u09C1\u09B0\u09C1", dEn: "Prepare and deliver materials", dHi: "\u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0924\u0948\u092F\u093E\u0930 \u0914\u0930 \u0935\u093F\u0924\u0930\u0923", dUr: "\u0645\u0648\u0627\u062F \u062A\u06CC\u0627\u0631 \u0627\u0648\u0631 \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u0646\u0627", dBn: "\u09B8\u09BE\u09AE\u0997\u09CD\u09B0\u09C0 \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4 \u0993 \u09AC\u09BF\u09A4\u09B0\u09A3" },
              { icon: Zap, en: "Acting x 3", hi: "\u0915\u0930\u094D\u092E x 3", ur: "\u0639\u0645\u0644 x 3", bn: "\u0995\u09B0\u09CD\u09AE x 3", dEn: "Consistent action over talk", dHi: "\u092C\u093E\u0924 \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u093F\u0930\u0902\u0924\u0930 \u0915\u093E\u0930\u094D\u092F", dUr: "\u0628\u0627\u062A \u0633\u06D2 \u0632\u06CC\u0627\u062F\u06C1 \u0645\u0633\u0644\u0633\u0644 \u0639\u0645\u0644", dBn: "\u0995\u09A5\u09BE\u09B0 \u099A\u09C7\u09AF\u09BC\u09C7 \u09A8\u09BF\u09B0\u09A8\u09CD\u09A4\u09B0 \u0995\u09B0\u09CD\u09AE" },
              { icon: Search, en: "Tracking", hi: "\u091F\u094D\u0930\u0948\u0915\u093F\u0902\u0917", ur: "\u0679\u0631\u06CC\u06A9\u0646\u06AF", bn: "\u099F\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u09BF\u0982", dEn: "Log evidence via AUP/APD", dHi: "AUP/APD \u0926\u094D\u0935\u093E\u0930\u093E \u0938\u093E\u0915\u094D\u0937\u094D\u092F \u0930\u093F\u0915\u0949\u0930\u094D\u0921", dUr: "AUP/APD \u06A9\u06D2 \u0630\u0631\u06CC\u0639\u06D2 \u0634\u0648\u0627\u06C1\u062F \u0631\u06CC\u06A9\u0627\u0631\u0688", dBn: "AUP/APD \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09AA\u09CD\u09B0\u09AE\u09BE\u09A3 \u09B0\u09C7\u0995\u09B0\u09CD\u09A1" },
              { icon: Repeat, en: "Repeating", hi: "\u092A\u0941\u0928\u0930\u093E\u0935\u0943\u0924\u094D\u0924\u093F", ur: "\u062A\u06A9\u0631\u0627\u0631", bn: "\u09AA\u09C1\u09A8\u09B0\u09BE\u09AC\u09C3\u09A4\u09CD\u09A4\u09BF", dEn: "Daily, weekly, monthly iteration", dHi: "\u0926\u0948\u0928\u093F\u0915, \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u092A\u0941\u0928\u0930\u093E\u0935\u0943\u0924\u094D\u0924\u093F", dUr: "\u0631\u0648\u0632\u0627\u0646\u06C1\u060C \u06C1\u0641\u062A\u0627\u0648\u0627\u0631\u060C \u0645\u0627\u06C1\u0627\u0646\u06C1 \u062A\u06A9\u0631\u0627\u0631", dBn: "\u09A6\u09C8\u09A8\u09BF\u0995, \u09B8\u09BE\u09AA\u09CD\u09A4\u09BE\u09B9\u09BF\u0995, \u09AE\u09BE\u09B8\u09BF\u0995 \u09AA\u09C1\u09A8\u09B0\u09BE\u09AC\u09C3\u09A4\u09CD\u09A4\u09BF" },
            ].map((item, i) => (
              <div key={i} className={`bg-white/10 border border-white/20 rounded-xl p-4 md:p-5 text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
                <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white mx-auto mb-2 md:mb-3" />
                <h3 className="text-white font-bold mb-1 text-xs md:text-sm">{t(item.en, item.hi, item.ur, item.bn)}</h3>
                <p className="text-emerald-100 text-[10px] md:text-xs leading-relaxed">{t(item.dEn, item.dHi, item.dUr, item.dBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holistic Evaluation */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
              <GallerySlider items={assessmentGallery} aspectRatio="4/3" rounded="2xl" />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-balance">
                {t("What Gets Assessed Gets Attention")}
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-5 md:mb-6 leading-relaxed">
                {t(
                  "MEED blends continuous and periodic evaluation across both scholastic and co-scholastic growth.",
                  "MEED \u0936\u0948\u0915\u094D\u0937\u093F\u0915 \u0914\u0930 \u0938\u0939-\u0936\u0948\u0915\u094D\u0937\u093F\u0915 \u0926\u094B\u0928\u094B\u0902 \u0935\u093F\u0915\u093E\u0938 \u092E\u0947\u0902 \u0928\u093F\u0930\u0902\u0924\u0930 \u0914\u0930 \u0906\u0935\u0927\u093F\u0915 \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928 \u0915\u093E \u092E\u093F\u0936\u094D\u0930\u0923 \u0915\u0930\u0924\u093E \u0939\u0948\u0964",
                  "MEED \u062A\u0639\u0644\u06CC\u0645\u06CC \u0627\u0648\u0631 \u0634\u0631\u06CC\u06A9 \u062A\u0639\u0644\u06CC\u0645\u06CC \u062F\u0648\u0646\u0648\u06BA \u062A\u0631\u0642\u06CC \u0645\u06CC\u06BA \u0645\u0633\u0644\u0633\u0644 \u0627\u0648\u0631 \u0648\u0642\u0641\u06C1 \u0648\u0627\u0631 \u062C\u0627\u0626\u0632\u06D2 \u06A9\u0627 \u0627\u0645\u062A\u0632\u0627\u062C \u06A9\u0631\u062A\u0627 \u06C1\u06D2\u06D4",
                  "MEED \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4 \u0993 \u09B8\u09B9-\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4 \u0989\u09AD\u09AF\u09BC \u09AC\u09BF\u0995\u09BE\u09B6\u09C7 \u09A8\u09BF\u09B0\u09A8\u09CD\u09A4\u09B0 \u0993 \u09AA\u09B0\u09CD\u09AF\u09BE\u09AF\u09BC\u0995\u09CD\u09B0\u09AE\u09BF\u0995 \u09AE\u09C2\u09B2\u09CD\u09AF\u09BE\u09AF\u09BC\u09A8 \u09AE\u09BF\u09B6\u09CD\u09B0\u09BF\u09A4 \u0995\u09B0\u09C7\u0964"
                )}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { en: "Scholastic", hi: "\u0936\u0948\u0915\u094D\u0937\u093F\u0915", ur: "\u062A\u0639\u0644\u06CC\u0645\u06CC", bn: "\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4", dEn: "Subject mastery, TCS Cycle, Mid-Term and Term-End Exams", dHi: "\u0935\u093F\u0937\u092F \u092E\u093E\u0938\u094D\u091F\u0930\u0940, TCS \u091A\u0915\u094D\u0930, \u092A\u0930\u0940\u0915\u094D\u0937\u093E", dUr: "\u0645\u0636\u0645\u0648\u0646 \u0645\u06C1\u0627\u0631\u062A\u060C TCS \u0633\u0627\u0626\u06CC\u06A9\u0644\u060C \u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A", dBn: "\u09AC\u09BF\u09B7\u09AF\u09BC \u09A6\u0995\u09CD\u09B7\u09A4\u09BE, TCS \u099A\u0995\u09CD\u09B0, \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE", bg: "bg-emerald-50" },
                  { en: "Co-Scholastic", hi: "\u0938\u0939-\u0936\u0948\u0915\u094D\u0937\u093F\u0915", ur: "\u0634\u0631\u06CC\u06A9 \u062A\u0639\u0644\u06CC\u0645\u06CC", bn: "\u09B8\u09B9-\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4", dEn: "Character, habits, spiritual formation", dHi: "\u091A\u0930\u093F\u0924\u094D\u0930, \u0906\u0926\u0924\u0947\u0902, \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0928\u093F\u0930\u094D\u092E\u093E\u0923", dUr: "\u06A9\u0631\u062F\u0627\u0631\u060C \u0639\u0627\u062F\u0627\u062A\u060C \u0631\u0648\u062D\u0627\u0646\u06CC \u062A\u0631\u0628\u06CC\u062A", dBn: "\u099A\u09B0\u09BF\u09A4\u09CD\u09B0, \u0985\u09AD\u09CD\u09AF\u09BE\u09B8, \u0986\u09A7\u09CD\u09AF\u09BE\u09A4\u09CD\u09AE\u09BF\u0995 \u0997\u09A0\u09A8", bg: "bg-teal-50" },
                  { en: "TCS Cycle", hi: "TCS \u091A\u0915\u094D\u0930", ur: "TCS \u0633\u0627\u0626\u06CC\u06A9\u0644", bn: "TCS \u099A\u0995\u09CD\u09B0", dEn: "Test, Correction, Submission -- every chapter", dHi: "\u092A\u0930\u0940\u0915\u094D\u0937\u093E, \u0938\u0941\u0927\u093E\u0930, \u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924\u093F -- \u0939\u0930 \u0905\u0927\u094D\u092F\u093E\u092F", dUr: "\u0679\u06CC\u0633\u0679\u060C \u0627\u0635\u0644\u0627\u062D\u060C \u062C\u0645\u0639 -- \u06C1\u0631 \u0628\u0627\u0628", dBn: "\u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE, \u09B8\u0982\u09B6\u09CB\u09A7\u09A8, \u099C\u09AE\u09BE -- \u09AA\u09CD\u09B0\u09A4\u09BF \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC", bg: "bg-cyan-50" },
                  { en: "T1-T4 Bands", hi: "T1-T4 \u092C\u0948\u0902\u0921", ur: "T1-T4 \u0628\u06CC\u0646\u0688\u0632", bn: "T1-T4 \u09AC\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1", dEn: "Mastery to Foundation -- targeted guidance", dHi: "\u092E\u093E\u0938\u094D\u091F\u0930\u0940 \u0938\u0947 \u092B\u093E\u0909\u0902\u0921\u0947\u0936\u0928 -- \u0932\u0915\u094D\u0937\u093F\u0924 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928", dUr: "\u0645\u06C1\u0627\u0631\u062A \u0633\u06D2 \u0628\u0646\u06CC\u0627\u062F -- \u06C1\u062F\u0641 \u0631\u06C1\u0646\u0645\u0627\u0626\u06CC", dBn: "\u09A6\u0995\u09CD\u09B7\u09A4\u09BE \u09A5\u09C7\u0995\u09C7 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF -- \u09B2\u0995\u09CD\u09B7\u09CD\u09AF\u09AE\u09BE\u09A4\u09CD\u09B0\u09BE \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09A8\u09BE", bg: "bg-gray-50" },
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} rounded-lg md:rounded-xl p-3 md:p-5`}>
                    <h4 className="font-bold text-gray-900 mb-1 text-xs md:text-sm">{t(item.en, item.hi, item.ur, item.bn)}</h4>
                    <p className="text-gray-600 text-[10px] md:text-xs leading-relaxed">{t(item.dEn, item.dHi, item.dUr, item.dBn)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { vEn: "Nursery-8", vHi: "\u0928\u0930\u094D\u0938\u0930\u0940-8", vUr: "\u0646\u0631\u0633\u0631\u06CC-8", vBn: "\u09A8\u09BE\u09B0\u09CD\u09B8\u09BE\u09B0\u09BF-8", lEn: "Grade Levels", lHi: "\u0915\u0915\u094D\u0937\u093E \u0938\u094D\u0924\u0930", lUr: "\u06A9\u0644\u0627\u0633 \u0633\u0637\u062D", lBn: "\u09B6\u09CD\u09B0\u09C7\u09A3\u09BF \u09B8\u09CD\u09A4\u09B0" },
              { vEn: "17", vHi: "17", vUr: "17", vBn: "17", lEn: "Daily Micro-Rituals", lHi: "\u0926\u0948\u0928\u093F\u0915 \u0938\u0942\u0915\u094D\u0937\u094D\u092E-\u0905\u0928\u0941\u0937\u094D\u0920\u093E\u0928", lUr: "\u0631\u0648\u0632\u0627\u0646\u06C1 \u0645\u0627\u0626\u06CC\u06A9\u0631\u0648-\u0631\u0633\u0648\u0645\u0627\u062A", lBn: "\u09A6\u09C8\u09A8\u09BF\u0995 \u0995\u09CD\u09B7\u09C1\u09A6\u09CD\u09B0-\u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BE\u09A8" },
              { vEn: "5", vHi: "5", vUr: "5", vBn: "5", lEn: "Guiding Principles", lHi: "\u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0915 \u0938\u093F\u0926\u094D\u0927\u093E\u0902\u0924", lUr: "\u0631\u06C1\u0646\u0645\u0627 \u0627\u0635\u0648\u0644", lBn: "\u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09A8\u09BE \u09A8\u09C0\u09A4\u09BF" },
              { vEn: "Dual", vHi: "\u0926\u094B\u0939\u0930\u093E", vUr: "\u062F\u0648\u06C1\u0631\u06CC", vBn: "\u09A6\u09CD\u09AC\u09BF\u09AE\u09C1\u0996\u09C0", lEn: "Success Model", lHi: "\u0938\u092B\u0932\u0924\u093E \u092E\u0949\u0921\u0932", lUr: "\u06A9\u0627\u0645\u06CC\u0627\u0628\u06CC \u06A9\u0627 \u0645\u0627\u0688\u0644", lBn: "\u09B8\u09BE\u09AB\u09B2\u09CD\u09AF\u09C7\u09B0 \u09AE\u09A1\u09C7\u09B2" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{t(s.vEn, s.vHi, s.vUr, s.vBn)}</div>
                <div className="text-gray-300 text-xs md:text-base">{t(s.lEn, s.lHi, s.lUr, s.lBn)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
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
              <div key={i} className="text-center p-5 md:p-8 bg-white rounded-xl shadow-md md:shadow-lg">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6`}>
                  <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{t(item.en, item.hi, item.ur, item.bn)}</h3>
                <p className="text-gray-600 text-xs md:text-base">{t(item.dEn, item.dHi, item.dUr, item.dBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-balance">
            {t("A Deserved Reward Earned Through Virtue, Effort, and Excellence")}
          </h2>
          <p className="text-sm md:text-xl text-emerald-100 mb-6 md:mb-8 px-2">
            {t(
              "Join an educational movement that refuses to choose between worldly success and spiritual depth.",
              "\u090F\u0915 \u0910\u0938\u0947 \u0936\u0948\u0915\u094D\u0937\u093F\u0915 \u0906\u0902\u0926\u094B\u0932\u0928 \u0938\u0947 \u091C\u0941\u0921\u093C\u0947\u0902 \u091C\u094B \u0938\u093E\u0902\u0938\u093E\u0930\u093F\u0915 \u0938\u092B\u0932\u0924\u093E \u0914\u0930 \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0917\u0939\u0930\u093E\u0908 \u0926\u094B\u0928\u094B\u0902 \u0915\u094B \u091A\u0941\u0928\u0924\u093E \u0939\u0948\u0964",
              "\u0627\u06CC\u06A9 \u0627\u06CC\u0633\u06CC \u062A\u0639\u0644\u06CC\u0645\u06CC \u062A\u062D\u0631\u06CC\u06A9 \u0645\u06CC\u06BA \u0634\u0627\u0645\u0644 \u06C1\u0648\u06BA \u062C\u0648 \u062F\u0646\u06CC\u0627\u0648\u06CC \u06A9\u0627\u0645\u06CC\u0627\u0628\u06CC \u0627\u0648\u0631 \u0631\u0648\u062D\u0627\u0646\u06CC \u06AF\u06C1\u0631\u0627\u0626\u06CC \u062F\u0648\u0646\u0648\u06BA \u06A9\u0648 \u0686\u0646\u062A\u06CC \u06C1\u06D2\u06D4",
              "\u098F\u09AE\u09A8 \u098F\u0995\u099F\u09BF \u09B6\u09BF\u0995\u09CD\u09B7\u09BE \u0986\u09A8\u09CD\u09A6\u09CB\u09B2\u09A8\u09C7 \u09AF\u09CB\u0997 \u09A6\u09BF\u09A8 \u09AF\u09BE \u09AA\u09BE\u09B0\u09CD\u09A5\u09BF\u09AC \u09B8\u09BE\u09AB\u09B2\u09CD\u09AF \u0993 \u0986\u09A7\u09CD\u09AF\u09BE\u09A4\u09CD\u09AE\u09BF\u0995 \u0997\u09AD\u09C0\u09B0\u09A4\u09BE \u0989\u09AD\u09AF\u09BC\u0987 \u09AC\u09C7\u099B\u09C7 \u09A8\u09C7\u09AF\u09BC\u0964"
            )}
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

"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Target, Award, Users, BookOpen, Shield, Lightbulb, Zap, Star, CheckCircle, Eye, Search, Repeat, Flame } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { pickLocalizedText } from "@/lib/cms-i18n"

export default function AboutPage() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)
  const [cms, setCms] = useState<any | null>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    fetch("/api/cms/about")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setCms(res.data)
      })
      .catch(() => {})
  }, [])

  const pillars = [
    {
      icon: Award,
      title: "Mastery",
      color: "emerald",
      description:
        "Excellence in both spiritual and worldly domains through intentional education, personalised growth, and character formation. We track subject proficiency, enrichment milestones, and deep competency from Pre-Primary through Class 8.",
    },
    {
      icon: Lightbulb,
      title: "Enlightenment",
      color: "teal",
      description:
        "Students gain both revealed (Islamic) and acquired (worldly) knowledge that builds clarity, identity, and purpose. Enlightenment grants vision and identity -- the foundation upon which all other pillars rest.",
    },
    {
      icon: Zap,
      title: "Empowerment",
      color: "cyan",
      description:
        "Equipping learners with 21st-century skills, rituals of mastery, and cognitive tools to excel in an age of noise, speed, and distraction. From communication to leadership to research, we build students who can lead and serve.",
    },
    {
      icon: Shield,
      title: "Dedication",
      color: "emerald",
      description:
        "Grounding hearts in discipline, Ibadah, and sustained focus -- anchored in sincerity (Ikhlas), objectivity, and resilience. Dedication forms the habit architecture: showing up, following structure, embracing quiet repetition of meaningful work.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900" />
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-32 md:w-64 h-32 md:h-64 bg-emerald-500 rounded-full opacity-10" />
        <div className="absolute bottom-10 right-10 md:right-20 w-40 md:w-80 h-40 md:h-80 bg-teal-500 rounded-full opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Holistic Education for Dual Success
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">
              {pickLocalizedText(language, cms?.heroTitleI18n, cms?.heroTitle || "About Meed International School")}
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
              {pickLocalizedText(language, cms?.heroSubtitleI18n, cms?.heroSubtitle || "Where intellectual excellence meets moral and spiritual growth -- cultivating experts with integrity")}
            </p>
          </div>
        </div>
      </section>

      {/* The Meaning of MEED */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{t("The Meaning Behind the Name", "\u0928\u093E\u092E \u0915\u0947 \u092A\u0940\u091B\u0947 \u0915\u093E \u0905\u0930\u094D\u0925")}</h2>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-10 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{"What is \"Meed\"?"}</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                An Old English term meaning <strong>{"\"a deserved reward or just recompense\""}</strong> -- especially one earned through virtue, effort, or excellence. This ancient word captures the essence of our educational philosophy: success achieved through disciplined striving and wholehearted dedication.
              </p>
              <div className="bg-white rounded-xl p-6 border-l-4 border-emerald-600">
                <p className="text-gray-800 italic text-lg">
                  {"\"The rightful reward of a life well lived in learning, discipline, and service -- both in Dunya and Akhirah.\""}
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                In essence, MEED signifies both a name and a mission -- anchored in tradition, effort, and spirituality. It is the reward of those who strive with sincerity, effort, and faith towards excellence in both worlds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The MEED Blueprint */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The MEED Blueprint</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                The intellectual and spiritual cornerstone of Meed International School
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                  Foundational Paper
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Rooted in the seminal work <em>{"\"Holistic Education for Dual Success: Cultivating Greatness to Meet Worldly Needs and Spiritual Growth\""}</em> by Nafis Aslam (Shaikh Zifaan), the Blueprint is more than an educational plan -- it offers a philosophy of life, discipline, and excellence.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Education bears a dual responsibility: prepare a student for the immediate realities of the world while anchoring the soul to the eternal horizon. To separate one from the other diminishes the human being.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-teal-600" />
                  Cultivated Greatness
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Drawing from Islamic tradition, contemporary pedagogy, and cognitive science, the argument is simple and profound: excellence does not spring from talent alone, nor from bursts of effort; it grows from a life shaped by ritual, clarity, and patience.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  MEED translates this into the ethic of <strong>discipline over outcome</strong> -- students do not chase quick results; they commit to deep, consistent effort, trusting that excellence is the rightful reward of sustained practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Four Movements</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {"The learner's journey unfolds across four movements, woven directly into MEED's operational life: its routines, rituals, and learning programs"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`relative p-6 md:p-8 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden bg-gray-50 ${
                  hoveredPillar === index ? "shadow-2xl scale-[1.02]" : "shadow-md"
                }`}
                onMouseEnter={() => setHoveredPillar(index)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      backgroundColor:
                        hoveredPillar === index ? getColorHex(pillar.color) : `${getColorHex(pillar.color)}20`,
                    }}
                  >
                    <pillar.icon
                      className="h-7 w-7 transition-all duration-300"
                      style={{
                        color: hoveredPillar === index ? "white" : getColorHex(pillar.color),
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundational Principles */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Five Foundational Principles</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Not just institutional guidelines -- they are spiritual philosophies bridging timeless Islamic virtues and contemporary pursuit of excellence
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { icon: Eye, title: "Vision with Depth", arabic: "Baseerah", desc: "Think beyond the surface. We do not merely prepare for exams; we prepare for life in both Dunya and Akhirah." },
              { icon: Heart, title: "Sincerity & Justice", arabic: "Ikhlas & Adl", desc: "Sincere intention paired with just, balanced thinking. Observe, reflect, and respond with integrity." },
              { icon: Search, title: "Depth in Knowledge", arabic: "Itqan", desc: "Precision and excellence in learning. Tadabbur (contemplation) and Tahqiq (investigation) -- going deep." },
              { icon: Repeat, title: "Discipline over Outcome", arabic: "Tawakkul & Amal", desc: "Sustainable success flows from consistent actions, not chasing short-term outcomes. Rhythm builds resilience." },
              { icon: Shield, title: "Perseverance", arabic: "Istiqamah & Sabr", desc: "Through ease or difficulty, remain committed, reflective, and enduring -- transformation takes time." },
            ].map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p.icon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                <p className="text-emerald-300 text-xs italic mb-2">{p.arabic}</p>
                <p className="text-gray-300 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Target className="h-6 md:h-8 w-6 md:w-8 text-emerald-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">
                {"\"To nurture future leaders of excellence -- masters in both Dunya and Akhirah -- through Enlightenment, Empowerment and Dedication.\""}
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Heart className="h-6 md:h-8 w-6 md:w-8 text-teal-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Enlighten students with both revealed (Islamic) and acquired (worldly) knowledge that builds clarity, identity, and purpose.",
                  "Empower them with 21st-century skills, rituals of mastery, and cognitive tools to excel.",
                  "Dedicate their hearts to discipline, Ibadah, and sustained focus -- grounded in Ikhlas and resilience.",
                  "Master both spiritual and worldly domains through intentional education and character formation.",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Significance */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The MEED Crest</h2>
            <p className="text-gray-700 md:text-lg leading-relaxed">
              The MEED crest encodes our Blueprint: the torch of Ilm for Enlightenment; an open book joining revealed and worldly knowledge; hands of Amanah and Tarbiyah; a laurel for mastery earned through ritual; two five-pointed stars for our core principles; green and gold for growth and excellence; a circle for holistic formation; the motto ribbon declaring dual success; and the ascending arc for the learner's journey from intention to mastery. The logo is our philosophy made visible -- a seal of discipline, depth, and dua.
            </p>
          </div>
        </div>
      </section>

      {/* Evaluation Framework */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Evaluation Framework</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                What Gets Assessed Gets Attention -- character formation receives the same rigorous attention as academic achievement
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Scholastic Assessment</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Subject mastery across all disciplines",
                    "Regular chapter tests via TCS Cycle (Test, Correction, Submission)",
                    "Mid-Term and Term-End Examinations",
                    "Portfolio documentation (CCD and CDD)",
                    "40% formative + 60% summative weighting",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Co-Scholastic Assessment</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Character development and habit formation",
                    "Social-emotional growth and peer relationships",
                    "Spiritual formation and daily rituals",
                    "Attitudes and values -- respect, responsibility, integrity",
                    "Assessed through CDD, EDD, Student Diary, and MRI Card",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* T1-T4 Bands */}
            <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 md:p-10 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Performance Bands (T1-T4)</h3>
              <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                Holistic classification ensuring every child receives targeted support and recognition
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-5">
                  <div className="text-emerald-400 font-bold text-lg mb-2">T1 - Mastery</div>
                  <p className="text-gray-300 text-sm">Above level. Extension tasks and leadership roles. Excels in both academics and character.</p>
                </div>
                <div className="bg-teal-600/20 border border-teal-500/30 rounded-xl p-5">
                  <div className="text-teal-400 font-bold text-lg mb-2">T2 - Proficient</div>
                  <p className="text-gray-300 text-sm">At grade level on the regular track. Sound in both dimensions.</p>
                </div>
                <div className="bg-cyan-600/20 border border-cyan-500/30 rounded-xl p-5">
                  <div className="text-cyan-400 font-bold text-lg mb-2">T3 - Developing</div>
                  <p className="text-gray-300 text-sm">Below level. Support group with individualized goal-setting and encouragement.</p>
                </div>
                <div className="bg-amber-600/20 border border-amber-500/30 rounded-xl p-5">
                  <div className="text-amber-400 font-bold text-lg mb-2">T4 - Foundation</div>
                  <p className="text-gray-300 text-sm">Well below; remedial attention. Intensive intervention with parent involvement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Inspirations */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Inspired by Global Best Practices</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {"MEED studies strong institutions and reads them against contemporary challenges"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">CCE (India)</h3>
              <p className="text-gray-600 text-sm">Continuous and Comprehensive Evaluation integrating formative and summative assessments with co-scholastic grading</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">IB PYP</h3>
              <p className="text-gray-600 text-sm">Holistic ongoing assessment with student self-assessment, teacher feedback loops, and learner profiles</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Finnish Model</h3>
              <p className="text-gray-600 text-sm">Teacher-led continuous assessment, descriptive evaluations over numerical grades, and transversal competences</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Join Our Community of Holistic Excellence</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of an educational movement that refuses to choose between worldly success and spiritual depth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 md:px-8 py-3 text-base md:text-lg rounded-lg w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent px-6 md:px-8 py-3 text-base md:text-lg rounded-lg w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function getColorHex(color: string): string {
  const colorMap: { [key: string]: string } = {
    emerald: "#059669",
    teal: "#0d9488",
    cyan: "#0891b2",
  }
  return colorMap[color] || "#000000"
}

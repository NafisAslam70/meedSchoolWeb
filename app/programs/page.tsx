"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Award,
  Music,
  Trophy,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  Eye,
  Palette,
  Brain,
  Clock,
  Repeat,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function ProgramsPage() {
  const { t } = useLanguage()
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null)

  const programs = [
    {
      title: "Pre-Primary (Nursery, LKG, UKG)",
      icon: Heart,
      ages: "Ages 3-6",
      shortDesc: "Developmental readiness through the Mother-Guide model",
      fullDesc:
        "Pre-Primary is a developmental stage focused on building readiness for Elementary. The emphasis is on foundational understanding through structured play, routines, and gentle practice. Active teaching is led by the Mother Teacher (M), whilst a shared Guide (G) rotates amongst all three classes supporting passive tasks: copy checking, worksheet collection, portfolio filing, and simple assessments.",
      curriculum: [
        "English I: ABC Express (Capital/Small letters)",
        "English II: Rhymes & Picture Album",
        "Math: Number / Maths Power & Artist",
        "Hindi: Akshar Adhar & Akshar Lekhan",
        "Urdu: Shagufta Urdu & BalGeet",
      ],
      assessment: [
        "Mid-Term and Term-End Assessment + Core Developmental Goals Evaluation (5 domains)",
        "Continuous in-class observation: quick oral checks, simple worksheets/artifacts (EDD)",
        "Learner portfolio (notes) to evidence growth across all five domains",
        "No AUP -- assessment is embedded in daily routines",
        "EDD(s) + Term Assessments generalized into Core Developmental Goals report",
      ],
      devGoals: [
        "Motor Skills: fine (pencil grip, colouring, cutting) and gross (running, balance, coordination)",
        "Language & Communication: listening, rhymes, vocabulary, simple words, show-and-tell",
        "Cognitive Skills: shapes, colours, numbers, sorting, matching, early patterns",
        "Social-Emotional: sharing, turn-taking, following instructions, classroom norms",
        "Habits & Spiritual Anchors: greetings, basic duas/salaam, lining-up, care for materials",
      ],
      teachingMethod: "Teach close-up: eye-level, hand-over-hand support; micro-lessons (5-10 min); multi-sensory, not worksheet-heavy; assess in play -- observe, note, praise.",
      image: "/placeholder.svg?height=300&width=500&text=Pre-Primary+Program",
    },
    {
      title: "Elementary (Classes I-VII/VIII)",
      icon: BookOpen,
      ages: "Ages 6-14",
      shortDesc: "MSP-driven academic mastery with TCS cycle and STEPH lesson flow",
      fullDesc:
        "Our Elementary programme focuses on a critical shift from foundational readiness to robust grade-level mastery. The MSP (Meed School Program) runs in two blocks: MSP-D1 (07:25-09:30) and MSP-D2 (10:00-12:30). Every lesson follows the STEPH flow and every chapter follows the TCS cycle, ensuring continuous academic growth with targeted support through the Baseline Program.",
      curriculum: [
        "English: 4-5 periods (ENG-I: Language 2, ENG-II: Literature 2) + 1 TEST",
        "Hindi: 4 periods (Grammar/Language 2, Literature 2)",
        "Mathematics: 5 periods (includes 1 test period per week)",
        "Science: 3-4 periods (age-appropriate); SST: 3-4 periods",
        "Urdu/Arabic: 3 | QT: 1 | GK: 1 | Computer: 1 Theory + 1 Practical",
        "BL-PE (Baseline): I-II: 4 sessions/week; III-V: 2 sessions/week",
        "SUPW: 1 | FRE (Friday Regular Event): as per plan",
      ],
      assessment: [
        "TCS Cycle: Test (after every chapter) &gt; Correction & feedback (same/following week) &gt; Submission to PT file",
        "Mid-Term (FA) and End-Term (SA) examinations as per calendar",
        "Co-Scholastic: CDD, EDD, Student Diary, MRI Card (term-wise)",
        "Baseline PE Exams: early-term banding &gt; mid-term recheck &gt; end-term review",
        "T1-T4 Banding via 4 diagnostics: handwriting, grammar & vocab, reading/comprehension, speaking",
      ],
      devGoals: [
        "Reading fluency, writing mechanics, grammar usage, comprehension, composition",
        "Number sense & operations fluency, problem solving, measurement/geometry basics",
        "Observe &gt; Inquire &gt; Explain: concept understanding with records, maps/timelines",
        "Script fluency, vocabulary, accurate reading &amp; clear written/oral communication",
        "Community service programs and character development milestones",
      ],
      teachingMethod: "STEPH Lesson Flow (40min): Start (1min, settle + objective) &gt; Trigger Recall (2-3min, quick questions) &gt; Explain/Teach (pedagogy with board discipline) &gt; Practice (classwork/quiz, guided then independent) &gt; Homework (5-10min, concise and purposeful).",
      image: "/placeholder.svg?height=300&width=500&text=Elementary+Program",
    },
  ]

  const toggleProgram = (index: number) => {
    setExpandedProgram(expandedProgram === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-32 md:w-64 h-32 md:h-64 bg-emerald-500 rounded-full opacity-20 animate-pulse" />
        <div
          className="absolute bottom-10 right-10 md:right-20 w-40 md:w-80 h-40 md:h-80 bg-teal-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Pre-Primary through Class VIII
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("Our Programs", "\u0939\u092E\u093E\u0930\u0947 \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E")}</h1>
            <p className="text-base md:text-xl text-emerald-100 px-2">
              {t(
                "Holistic education structured by MEED Rituals Imaging (MRI) with age-appropriate assessment at every stage",
                "MEED Rituals Imaging (MRI) \u0926\u094D\u0935\u093E\u0930\u093E \u0938\u0902\u0930\u091A\u093F\u0924 \u0938\u092E\u0917\u094D\u0930 \u0936\u093F\u0915\u094D\u0937\u093E, \u0939\u0930 \u091A\u0930\u0923 \u092E\u0947\u0902 \u0906\u092F\u0941-\u0909\u092A\u092F\u0941\u0915\u094D\u0924 \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* MSP + STEPH + TCS Overview */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">The MEED Academic Engine</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">MSP (Morning School Program)</h3>
                <p className="text-gray-600 text-sm">Two structured academic immersion blocks: MSP-D1 (07:25-09:30) and MSP-D2 (10:00-12:30), governed by Program Design sheets.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">S.T.E.P.H Lesson Flow</h3>
                <p className="text-gray-600 text-sm">Start &gt; Trigger Recall &gt; Explain/Teach &gt; Practice &gt; Homework. Every 40-minute period follows this structured flow for maximum learning.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <Repeat className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">TCS Cycle</h3>
                <p className="text-gray-600 text-sm">Test &gt; Correction &gt; Submission. After every chapter, students are tested, receive feedback, and work is submitted to the PT file for continuous tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  expandedProgram === index ? "shadow-xl border-emerald-200" : "shadow-md border-gray-100 hover:shadow-lg"
                }`}
              >
                <div
                  className="p-6 md:p-8 cursor-pointer"
                  onClick={() => toggleProgram(index)}
                  onKeyDown={(e) => e.key === "Enter" && toggleProgram(index)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <program.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{program.title}</h2>
                        <p className="text-sm text-emerald-600 font-medium">{program.ages}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:block text-sm text-gray-500">{program.shortDesc}</span>
                      {expandedProgram === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedProgram === index && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-gray-100">
                    <div className="grid lg:grid-cols-2 gap-8 pt-6">
                      <div>
                        <p className="text-gray-700 mb-6 leading-relaxed">{program.fullDesc}</p>

                        {/* Teaching Method */}
                        <div className="bg-emerald-50 rounded-xl p-4 mb-6 border-l-4 border-emerald-500">
                          <h4 className="font-bold text-gray-900 mb-2 text-sm">Teaching Method</h4>
                          <p className="text-gray-700 text-sm">{program.teachingMethod}</p>
                        </div>

                        {/* Curriculum */}
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-emerald-600" />
                          Weekly Period Allocation
                        </h3>
                        <ul className="space-y-2 mb-6">
                          {program.curriculum.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Eye className="h-5 w-5 text-emerald-600" />
                          Assessment Approach
                        </h3>
                        <ul className="space-y-2 mb-6">
                          {program.assessment.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={`${program.title} Program`}
                          className="rounded-xl shadow-md w-full mb-6"
                        />

                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-teal-600" />
                          {index === 0 ? "Core Developmental Goals" : "Core Learning Goals"}
                        </h3>
                        <ul className="space-y-2">
                          {program.devGoals.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Star className="h-4 w-4 text-teal-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mother-Guide Model */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">The Mother-Guide Model (Pre-Primary)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Mother Teacher (M)</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Active teaching is led by the Mother Teacher. She delivers micro-lessons (5-10 min), teaches close-up at eye-level with hand-over-hand support, and ensures every child is touched each lesson with a quick 1-2 item individual check.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Shared Guide (G)</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  One Guide is available every period for all three Pre-Primary classes. The Guide supports passive tasks: copy checking, worksheet collection, portfolio filing, and simple oral checklist tallies. She rotates across classes based on need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Baseline Banding */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Baseline Program & Banding Framework (PE)</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Elementary runs on the main curriculum plus a Baseline Program to bridge weaker learners, especially in PE (Preliminary English), extendable to Math/Science as needed.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                <div className="text-emerald-700 font-bold text-lg mb-1">T1 - Mastery</div>
                <p className="text-gray-600 text-sm">Above level (extension tasks)</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-center">
                <div className="text-teal-700 font-bold text-lg mb-1">T2 - Proficient</div>
                <p className="text-gray-600 text-sm">At grade level (regular track)</p>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 text-center">
                <div className="text-cyan-700 font-bold text-lg mb-1">T3 - Developing</div>
                <p className="text-gray-600 text-sm">Below level (support group)</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
                <div className="text-amber-700 font-bold text-lg mb-1">T4 - Foundation</div>
                <p className="text-gray-600 text-sm">Well below; remedial attention</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center mt-4">
              Diagnostic Areas: Handwriting/Writing Mechanics, Grammar & Vocabulary, Reading/Comprehension Fluency, Speaking/Oral Expression (rated 5 to 1)
            </p>
          </div>
        </div>
      </section>

      {/* Beyond Academics */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beyond Academics</h2>
            <p className="text-gray-600 md:text-lg">Co-scholastic activities that build the whole child</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Music, title: "Music and Arts", desc: "Creativity and self-expression", bg: "bg-red-600" },
              { icon: Trophy, title: "Sports and Fitness", desc: "Physical health and teamwork", bg: "bg-emerald-600" },
              { icon: Palette, title: "FRE (Friday Events)", desc: "Weekly enrichment programs", bg: "bg-teal-600" },
              { icon: Heart, title: "SUPW & Service", desc: "Community and character", bg: "bg-cyan-600" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 md:w-16 h-12 md:h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{"Find Your Child's Perfect Program"}</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            From Pre-Primary observation-based learning to Elementary TCS cycles and STEPH lesson flows, every stage is designed for holistic growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 md:px-8 py-3 text-base md:text-lg rounded-lg font-semibold w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent px-6 md:px-8 py-3 text-base md:text-lg rounded-lg w-full sm:w-auto"
              >
                Schedule a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

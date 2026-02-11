"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { GraduationCap, Award, Star, CheckCircle, Users, BookOpen, Shield, Clock } from "lucide-react"

export default function FacultyPage() {
  const facultyMembers = [
    {
      name: "Principal",
      position: "School Principal / MEED Framework Custodian",
      image: "/placeholder.svg?height=300&width=300&text=Principal",
      education: "Ph.D. in Educational Leadership",
      experience: "18+ years in education",
      quote: "Every operational detail -- from the morning pledge to the week's close -- flows from the MEED Blueprint. We embody it.",
    },
    {
      name: "Vice Principal",
      position: "Vice Principal / COD (Coordinator of Duty)",
      image: "/placeholder.svg?height=300&width=300&text=Vice+Principal",
      education: "M.Ed. in Educational Administration",
      experience: "14 years in education",
      quote: "What gets assessed gets attention. By measuring character alongside academics, we ensure integrity is never overlooked.",
    },
    {
      name: "Pre-Primary Lead",
      position: "Mother Teacher Lead (Nursery, LKG, UKG)",
      image: "/placeholder.svg?height=300&width=300&text=Pre-Primary+Lead",
      education: "B.A. in Early Childhood Education",
      experience: "10 years teaching kindergarten",
      quote: "We teach close-up -- eye-level, hand-over-hand. Micro-lessons, multi-sensory, assess in play. No exams, just nurturing.",
    },
    {
      name: "Elementary Lead",
      position: "Elementary Programme Coordinator (Classes I-VIII)",
      image: "/placeholder.svg?height=300&width=300&text=Elementary+Lead",
      education: "M.A. in Elementary Education",
      experience: "12 years in primary education",
      quote: "STEPH in every period, TCS after every chapter, and the Baseline Program to bridge every gap. That is our engine.",
    },
  ]

  const meedRoles = [
    { role: "PT (Parent Teacher)", desc: "Accountable for routine execution and student progress across all subjects. Manages CCD/CDD/EDD, daily reports, and parent communication." },
    { role: "TOD/MOD (Teacher/Master of the Day)", desc: "Oversees NMRI slots -- Blitz windows, recreation, spiritual anchors, and day closure. Compiles defaulter lists." },
    { role: "IS (Immediate Supervisor)", desc: "Reviews Inside Study Material, conducts walkthroughs, signs weekly teacher checklists, and leads WRR sessions." },
    { role: "COD (Coordinator of Duty)", desc: "Coordinates across all departments, manages operational rhythm, and ensures AMRI/NMRI compliance." },
  ]

  const iprParams = [
    { param: "Punctuality", marks: "10" },
    { param: "Academics", marks: "10" },
    { param: "Obedience & Discipline", marks: "10" },
    { param: "Language & Personality", marks: "10" },
    { param: "Will-Skill Level", marks: "10" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-32 md:w-64 h-32 md:h-64 bg-emerald-500 rounded-full opacity-20 animate-pulse" />
        <div
          className="absolute bottom-10 right-10 md:right-20 w-40 md:w-80 h-40 md:h-80 bg-teal-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Day-Long Growth Architects, Not Period-Only Instructors
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Faculty</h1>
            <p className="text-lg md:text-2xl text-gray-300">
              Every teacher is a holistic development architect -- teaching, training, and evaluation run in parallel at MEED
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our leaders ensure the MEED Blueprint is embodied in every ritual, routine, and learning program
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {facultyMembers.slice(0, 2).map((member, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <div className="w-32 md:w-48 h-32 md:h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-200">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-base md:text-lg font-medium text-emerald-600 mb-3">{member.position}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center md:justify-start text-gray-600 text-sm md:text-base">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                      <span>{member.education}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-gray-600 text-sm md:text-base">
                      <Award className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm md:text-base">&quot;{member.quote}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Leads */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Department Leads</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {facultyMembers.slice(2).map((member, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-48 md:h-64 overflow-hidden relative">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 md:p-6 text-white">
                      <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                      <p className="text-gray-200 text-sm md:text-base">{member.position}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-white">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-xs md:text-sm">
                      <GraduationCap className="h-3 md:h-4 w-3 md:w-4 mr-2 text-gray-500 flex-shrink-0" />
                      <span>{member.education}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-xs md:text-sm">
                      <Award className="h-3 md:h-4 w-3 md:w-4 mr-2 text-gray-500 flex-shrink-0" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs md:text-sm italic">&quot;{member.quote}&quot;</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MEED Operational Roles */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">MEED Operational Roles</h2>
              <p className="text-gray-600 md:text-lg">Every slot has a Person-in-Charge (PI) and every day has its operational rhythm</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {meedRoles.map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{r.role}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IPR & WRR */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 to-emerald-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">IPR - Teacher Performance Report</h2>
                <p className="text-gray-300 mb-6">5 parameters, 10 marks each = 50/week. Weekly scores aggregate to the term report.</p>
                <div className="space-y-3">
                  {iprParams.map((p, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                      <span className="text-gray-200 text-sm">{p.param}</span>
                      <span className="text-emerald-400 font-bold">{p.marks}/10</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">WRR - Weekly Review & Roadmap</h2>
                <p className="text-gray-300 mb-6">Every Saturday, all teachers attend WRR led by IS/COD/Principal.</p>
                <ul className="space-y-3">
                  {[
                    "Bring: Inside Study Material, PT file/SFR, EDD/CDD/CCD, test/TCS records, duty notes",
                    "IPR score release for the week (50 marks across 5 parameters)",
                    "Deductions recorded (ADs, policy breaches, delays)",
                    "Action items set with owners and due dates",
                    "Highlights shared: good practices and top performers",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Holistic Role */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Whole-School Ethos</h2>
            <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 border-l-4 border-emerald-600 mb-8">
              <p className="text-gray-800 text-base md:text-lg leading-relaxed italic">
                {"\"MEED is a holistic development school: every teacher is a day-long growth architect, not a 'period-only' instructor -- teaching, training, and evaluation run in parallel.\""}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Scholastic</h3>
                <p className="text-gray-600 text-sm">Plan, execute, and evidence academic delivery across all subjects with STEPH and TCS.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Co-Scholastic</h3>
                <p className="text-gray-600 text-sm">Character observation, habit tracking, spiritual development notes via EDD and CDD.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Shield className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Co-Curricular</h3>
                <p className="text-gray-600 text-sm">FRE events, assemblies, community service, sports, and arts participation logged and assessed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300 text-sm md:text-base">MEED Framework Trained</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50/wk</div>
              <div className="text-gray-300 text-sm md:text-base">IPR Teacher Score</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">Weekly</div>
              <div className="text-gray-300 text-sm md:text-base">WRR Review Sessions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">3-Fold</div>
              <div className="text-gray-300 text-sm md:text-base">Holistic Teacher Role</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

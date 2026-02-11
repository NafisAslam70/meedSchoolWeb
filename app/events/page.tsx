"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Bus, Backpack, Star, Clock, BookOpen, Repeat, Shield } from "lucide-react"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("rituals")

  const dailyRituals = [
    {
      title: "Day Open (Slot 0)",
      time: "Pre-Fajr (2-5 min)",
      description: "Intent to Allah, honour parents, name one today's focus. The promise that opens every day with purpose and clarity.",
      icon: Star,
    },
    {
      title: "School Assembly (Slot 3)",
      time: "07:00 - 07:25",
      description: "Qur'an recitation, values capsule, notices. Silent entry/exit. Includes the MEED Pledge -- a daily commitment to vision, sincerity, depth, ritual, and perseverance.",
      icon: Users,
    },
    {
      title: "MSP Blocks (Slots 4 & 6)",
      time: "07:25 - 12:30",
      description: "Two structured academic immersion blocks: MSP-D1 (07:25-09:30) and MSP-D2 (10:00-12:30). Every lesson follows the STEPH flow.",
      icon: BookOpen,
    },
    {
      title: "MHCP Sessions (Slots 10 & 13)",
      time: "15:30 - 20:00",
      description: "MHCP-1: Homework urgencies, priority catch-up, doubt-clearing. MHCP-2: Enrichment -- debate, coding, oratory, memorization.",
      icon: Clock,
    },
    {
      title: "Day Shutdown (Slot 14)",
      time: "20:00 - 20:30",
      description: "Ritual check, one win + one fix, gratitude, Top-3 for tomorrow. Supervised closure that consolidates learning and character.",
      icon: Shield,
    },
    {
      title: "Week Close (Saturday)",
      time: "Within Slot 14",
      description: "Reviews AMRI progress, NMRI adherence (prayer/sleep/recreation), akhlaq note, appreciation circle, collective du'a, optional parent note.",
      icon: Repeat,
    },
  ]

  const pastEvents = [
    {
      title: "FRE - Friday Regular Event",
      date: "Every Friday",
      location: "School Hall / Classrooms",
      description: "Weekly enrichment event with a different curriculum -- house events, inter-class competitions, guest speakers, and community engagement.",
      image: "/placeholder.svg?height=200&width=300&text=Friday+Events",
    },
    {
      title: "Annual Art Exhibition",
      date: "April 2025",
      location: "School Art Gallery",
      description: "Students displayed creative masterpieces in painting, sculpture, and digital art -- a celebration of the Empowerment pillar.",
      image: "/placeholder.svg?height=200&width=300&text=Art+Exhibition",
    },
    {
      title: "International Culture Day",
      date: "March 2025",
      location: "School Hall",
      description: "Students and families celebrated diverse cultures with food, music, and performances -- fostering Enlightenment and global awareness.",
      image: "/placeholder.svg?height=200&width=300&text=Culture+Day",
    },
    {
      title: "Annual Sports Festival",
      date: "November 2024",
      location: "School Sports Complex",
      description: "Inter-house sports competition featuring athletics and team sports -- building teamwork, grit, and healthy competition.",
      image: "/placeholder.svg?height=200&width=300&text=Sports+Festival",
    },
  ]

  const trips = [
    {
      title: "Nature Walk Adventure",
      grades: "Pre-Primary (Nursery, LKG, UKG)",
      date: "Monthly",
      description: "Fun outdoor exploration to develop motor skills, observation abilities, and social interaction in natural settings.",
      image: "/placeholder.svg?height=200&width=300&text=Nature+Walk",
      icon: Backpack,
    },
    {
      title: "Community Helpers Visit",
      grades: "Elementary (Classes I-II)",
      date: "October 2025",
      description: "Educational visit to learn about community roles -- fire station, hospital, or post office -- building awareness and gratitude.",
      image: "/placeholder.svg?height=200&width=300&text=Community+Visit",
      icon: Bus,
    },
    {
      title: "Science and Innovation Center",
      grades: "Elementary (Classes III-V)",
      date: "September 2025",
      description: "Hands-on learning about scientific processes and sustainable practices, supporting Mastery and curiosity.",
      image: "/placeholder.svg?height=200&width=300&text=Science+Center",
      icon: Bus,
    },
    {
      title: "Historical and Cultural Heritage Tour",
      grades: "Elementary (Classes VI-VIII)",
      date: "November 2025",
      description: "Immersive heritage experience exploring history, culture, and identity -- deepening Enlightenment and purpose.",
      image: "/placeholder.svg?height=200&width=300&text=Heritage+Tour",
      icon: Bus,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
        <div className="absolute top-10 left-10 w-32 md:w-64 h-32 md:h-64 bg-emerald-500 rounded-full opacity-20 animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-40 md:w-80 h-40 md:h-80 bg-teal-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              17 Micro-Rituals, 7 Daily Blocks
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{"Events, Rituals & Trips"}</h1>
            <p className="text-lg md:text-2xl text-emerald-100">Routine becomes formation; schedules become character</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 w-full max-w-lg md:w-auto">
              {[
                { key: "rituals", label: "Daily Rituals" },
                { key: "events", label: "Events & FRE" },
                { key: "trips", label: "School Trips" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key ? "bg-emerald-600 text-white" : "text-gray-700 hover:text-emerald-600"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Rituals */}
          {activeTab === "rituals" && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">MEED Daily Rituals (MRI)</h2>
              <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                The day comprises 17 micro-rituals grouped into 7 blocks. Academic MRIs (AMRI) are program slots, while Non-Academic MRIs (NMRI) support character, health, recreation, rest, and spirituality.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {dailyRituals.map((ritual, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ritual.icon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{ritual.title}</h3>
                          <p className="text-emerald-600 text-xs">{ritual.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{ritual.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Blitz Windows */}
              <div className="bg-emerald-50 p-6 md:p-8 rounded-xl border border-emerald-200 max-w-4xl mx-auto mt-12">
                <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">Blitz Windows -- The 4-S Standard</h3>
                <p className="text-emerald-700 text-sm md:text-base mb-4">
                  A Blitz is a short, high-importance, high-discipline window that executes many small tasks: <strong>Fast, Silent, Orderly, Accurate.</strong>
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-emerald-700">
                  <div>Blitz-1 (Morning): Wake, wash, uniform, desk reset, hydrate</div>
                  <div>Blitz-2 (ASD): Change dress, Zuhr, dining line, eat/clear</div>
                  <div>Blitz-3 (BHC): Wake, Asr line, shoes check, attendance</div>
                  <div>Blitz-4 (Maghrib): Stop play, wudu, Maghrib, snack, freshen</div>
                  <div>Blitz-5 (AHC): Isha, dinner, plates clear, line to rooms</div>
                </div>
              </div>
            </div>
          )}

          {/* Events & FRE */}
          {activeTab === "events" && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Events & Friday Regular Events</h2>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {pastEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-2">
                      <div className="h-48 md:h-full">
                        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Trips */}
          {activeTab === "trips" && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Educational Trips</h2>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {trips.map((trip, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 md:h-48 overflow-hidden relative">
                      <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                        <trip.icon className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                      </div>
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{trip.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Users className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
                          <span>{trip.grades}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
                          <span>{trip.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{trip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

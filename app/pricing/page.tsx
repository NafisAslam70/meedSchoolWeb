"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, BookOpen, Heart, Brain } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { pickLocalizedText } from "@/lib/cms-i18n"

export default function HostelPage() {
  const { t, language } = useLanguage()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const [cms, setCms] = useState<any | null>(null)

  useEffect(() => {
    fetch("/api/cms/pricing")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setCms(res.data)
      })
      .catch(() => {})
  }, [])

  const pricingPlans = [
    {
      name: "Single Ensuite",
      description: "Private room, attached bath",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      monthly: 5200,
      annual: 52000,
      popular: false,
      features: [
        "Fully furnished private room with study desk",
        "AC + high-speed Wi‑Fi + weekly deep cleaning",
        "Individual wardrobe & secure storage",
        "24/7 pastoral care and nurse-on-call",
        "Structured study hall (evening, proctored)",
        "Daily laundry service",
        "Prayer & mindfulness room access",
        "Healthy 4-meal plan (breakfast, lunch, snacks, dinner)",
      ],
    },
    {
      name: "Twin Sharing",
      description: "Two students, attached bath",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-500",
      monthly: 4200,
      annual: 42000,
      popular: true,
      features: [
        "Spacious twin room with study zones",
        "AC + Wi‑Fi + housekeeping thrice weekly",
        "Wardrobe per student; lockable drawers",
        "Evening supervised prep + subject mentors",
        "Resident life skills coordinator on floor",
        "Laundry twice a week",
        "Sports access: gym, futsal, table tennis",
        "Nutritious 4-meal plan with fruit & hydration",
      ],
    },
    {
      name: "Junior Dorm Suite",
      description: "4-bed suite, shared bath",
      icon: Brain,
      color: "from-teal-500 to-cyan-500",
      monthly: 3600,
      annual: 36000,
      popular: false,
      features: [
        "Comfort bunk suite with privacy curtains",
        "Dedicated quiet hours and lights-out routines",
        "Evening academic clinics for core subjects",
        "Weekend enrichment: coding, arts, Quran circles",
        "House parents on each wing",
        "Weekly room inspection & mentoring check-ins",
        "Safety-first access control and CCTV in common areas",
        "Balanced 4-meal plan + hydration stations",
      ],
    },
    {
      name: "Day Scholar Meal Plan",
      description: "For day students",
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      monthly: 900,
      annual: 9000,
      popular: false,
      features: [
        "Campus meals: lunch + evening snacks + hydration",
        "Access to evening supervised study hall",
        "Locker storage on campus",
        "After-school clubs and weekend events",
        "Nurse station and wellness support",
        "Transport add-on available",
      ],
    },
  ]

  const additionalFees = [
    { name: "Hostel Admission Fee", amount: 1200, description: "One-time onboarding & room setup" },
    { name: "Security Deposit (refundable)", amount: 2000, description: "Refunded at checkout if no damages" },
    { name: "Laundry Add-on", amount: 200, description: "For extra loads beyond included service" },
    { name: "Airport Pickup", amount: 300, description: "Optional arrival pickup (Addis Ababa)" },
    { name: "Transport (Day Scholars)", amount: 250, description: "Monthly bus service (optional)" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Boarding & Pastoral Care
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meed Hostel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Safe, supervised boarding with structured routines, academic support, and nourishing meals designed around the MEED ethos.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  billingCycle === "annual"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {billingCycle === "annual" && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Save up to 17% with annual payment
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan) => {
            const IconComponent = plan.icon
            const price = billingCycle === "monthly" ? plan.monthly : plan.annual

            return (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular ? "ring-2 ring-emerald-500 shadow-xl" : "shadow-lg"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-emerald-600 hover:bg-emerald-700">Most Popular</Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{price.toLocaleString()}</span>
                    <span className="text-gray-600 ml-2">ETB</span>
                    <div className="text-sm text-gray-500 mt-1">
                      per {billingCycle === "monthly" ? "month" : "year"}
                    </div>
                  </div>

                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-900 hover:bg-gray-800"
                      } text-white font-medium py-3 transition-all duration-300`}
                    >
                      Enroll Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Additional Fees Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Additional Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFees.map((fee, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{fee.name}</h3>
                  <span className="text-xl font-bold text-emerald-600">{fee.amount} ETB</span>
                </div>
                <p className="text-gray-600 text-sm">{fee.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Included with Every Hostel Plan</h2>
            <p className="text-emerald-100 text-lg">
              Care, safety, and growth built into daily life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pastoral Care 24/7</h3>
              <p className="text-emerald-100">House parents, nurse-on-call, and night supervisors for round-the-clock safety.</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Study Hall</h3>
              <p className="text-emerald-100">Evening prep with academic mentors aligned to the MEED timetable.</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wellness & Nutrition</h3>
              <p className="text-emerald-100">Balanced menus, hydration stations, prayer spaces, and weekend recreation.</p>
            </div>
          </div>
        </div>

        {/* Financial Aid Section */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit the Hostel</h2>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Tour the rooms, meet the house parents, and see evening study hall in action. We’ll tailor a plan for your child’s needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
              Book a Hostel Tour
            </Button>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent px-8 py-3"
            >
              Talk to a House Parent
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

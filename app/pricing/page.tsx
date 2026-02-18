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

export default function PricingPage() {
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
      name: "Pre-Primary",
      description: "Nursery, LKG, UKG (Ages 3-6)",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      monthly: 1200,
      annual: 12000,
      popular: false,
      features: [
        "Play-based holistic curriculum",
        "Observation-based assessment (no exams)",
        "Developmental milestone tracking",
        "Qualified early childhood educators",
        "Portfolio of child's creative work",
        "Descriptive narrative reports each term",
        "Parent-teacher conferences",
        "Nurturing, child-centric environment",
      ],
    },
    {
      name: "Lower Primary",
      description: "Classes 1-2 (Ages 6-8)",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-500",
      monthly: 1500,
      annual: 15000,
      popular: false,
      features: [
        "Gentle transition to structured learning",
        "FA/SA hybrid assessment model",
        "Oral and activity-based formative assessments",
        "Life skills grading (A+ to C scale)",
        "Attitudes and values evaluation",
        "Art, music, and physical education",
        "Library access and reading programs",
        "Co-scholastic descriptive feedback",
      ],
    },
    {
      name: "Upper Primary",
      description: "Classes 3-5 (Ages 8-11)",
      icon: Brain,
      color: "from-teal-500 to-cyan-500",
      monthly: 1800,
      annual: 18000,
      popular: true,
      features: [
        "Comprehensive MEED curriculum",
        "9-point grading scale (A1 to E2)",
        "Diverse formative assessments",
        "Subject-wise competency tracking",
        "Academic enrichment and Olympiads",
        "Co-scholastic rubric evaluation",
        "Student self-assessment introduction",
        "40% formative + 60% summative model",
        "Community service programs",
      ],
    },
    {
      name: "Middle School",
      description: "Classes 6-8 (Ages 11-14)",
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      monthly: 2200,
      annual: 22000,
      popular: false,
      features: [
        "Advanced MEED evaluation framework",
        "Full T1-T4 holistic performance bands",
        "Capstone project in Class 8",
        "Reflective journals and self-assessment",
        "External scholastic benchmarks",
        "Leadership development programs",
        "Specialized subject teachers",
        "Career guidance and mentoring",
        "Peer tutoring and mentorship",
        "University preparation mindset",
      ],
    },
  ]

  const additionalFees = [
    { name: "Registration Fee", amount: 500, description: "One-time enrollment fee" },
    { name: "Uniform Package", amount: 300, description: "Complete school uniform set" },
    { name: "Books and Materials", amount: 400, description: "Annual textbooks and supplies" },
    { name: "Transportation", amount: 200, description: "Monthly bus service (optional)" },
    { name: "Lunch Program", amount: 150, description: "Monthly meal plan (optional)" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            {cms?.heroSubtitle || "Pre-Primary through Class 8"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{cms?.heroTitle || "Tuition & Fees"}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {cms?.heroSubtitle ||
              "Invest in your child's holistic development. Our programs include comprehensive academic curriculum plus the MEED evaluation framework that tracks character alongside academics."}
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
            <h2 className="text-3xl font-bold mb-4">Every Plan Includes the MEED Framework</h2>
            <p className="text-emerald-100 text-lg">
              Regardless of grade level, every student benefits from our holistic evaluation system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Holistic Report Cards</h3>
              <p className="text-emerald-100">Scholastic and co-scholastic evaluation with descriptive feedback every term</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Character Tracking</h3>
              <p className="text-emerald-100">Life skills, attitudes, values, and spiritual development formally assessed</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Parent Partnership</h3>
              <p className="text-emerald-100">Regular conferences, detailed feedback, and guidance to reinforce learning at home</p>
            </div>
          </div>
        </div>

        {/* Financial Aid Section */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Assistance Available</h2>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            We believe every child deserves holistic education. Meed International School offers need-based financial aid
            and merit scholarships to qualified families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
              Apply for Financial Aid
            </Button>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent px-8 py-3"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

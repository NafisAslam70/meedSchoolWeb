'use client';

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Star, ArrowRight, Users, Award, Sparkles, Heart, Shield, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function AdmissionsPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900"></div>

        <div className="absolute top-5 md:top-10 left-5 md:left-10 w-32 md:w-64 h-32 md:h-64 bg-emerald-500 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-5 md:bottom-10 right-5 md:right-10 w-40 md:w-80 h-40 md:h-80 bg-teal-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Holistic Education for Dual Success
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">{t("Give Your Child Both Success", "\u0905\u092A\u0928\u0947 \u092C\u091A\u094D\u091A\u0947 \u0915\u094B \u0926\u094B\u0928\u094B\u0902 \u0938\u092B\u0932\u0924\u093E \u0926\u0947\u0902")}</h1>
            <p className="text-lg md:text-2xl text-emerald-100 mb-8 md:mb-10">
              Academic excellence and character development -- the MEED way
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl rounded-xl font-bold w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 bg-transparent px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl rounded-xl w-full sm:w-auto"
                >
                  Schedule a Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The MEED Difference */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Meed Difference</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              What sets us apart is not just what we teach, but how we nurture and measure growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Award className="h-6 md:h-8 w-6 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Holistic Report Cards</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Our report cards are divided into Scholastic Achievement and Co-Scholastic Development -- showing
                  academic grades alongside life skills, attitudes, values, and spiritual growth ratings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Users className="h-6 md:h-8 w-6 md:w-8 text-teal-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Character Equals Academics</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We believe what gets assessed gets attention. By formally evaluating integrity, empathy, grit, and
                  leadership, we ensure your child grows as a person, not just a student.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Sparkles className="h-6 md:h-8 w-6 md:w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Continuous Growth Model</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  No single exam dominates. Our hybrid formative-summative model gives students multiple opportunities
                  to demonstrate learning, reducing pressure and encouraging consistent effort.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MEED Pillars Summary */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built on Four Pillars</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every child at Meed International is guided by our MEED framework
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Award, title: "Mastery", desc: "Academic excellence through subject proficiency", color: "emerald" },
              { icon: Lightbulb, title: "Enlightenment", desc: "Spiritual identity and moral clarity", color: "teal" },
              { icon: Shield, title: "Empowerment", desc: "Leadership confidence and life skills", color: "cyan" },
              { icon: Heart, title: "Dedication", desc: "Discipline, habits, and perseverance", color: "emerald" },
            ].map((pillar, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className={`w-12 h-12 bg-${pillar.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <pillar.icon className={`h-6 w-6 text-${pillar.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Families Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "The holistic report card was a revelation. We could see not just our daughter's math scores, but how her confidence, teamwork, and sense of responsibility were growing each term.",
                author: "Aisha K., Parent of Class 5 Student",
                stars: 5,
              },
              {
                quote:
                  "The MEED framework makes character development visible and measurable. Our son's teacher noted his improvement in 'grit' -- that meant more to us than any exam grade.",
                author: "Daniel T., Parent of Class 7 Student",
                stars: 5,
              },
              {
                quote:
                  "From Nursery's play-based assessment to the structured evaluations in upper primary, every stage feels thoughtfully designed. Our children love coming to school.",
                author: "Sara and Yohannes L., Parents of Three",
                stars: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 md:h-5 w-4 md:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 md:mb-6 text-sm md:text-base">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="font-bold text-gray-900 text-sm md:text-base">{testimonial.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Application Process</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We have streamlined our admissions process to make it easy for busy parents
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { step: 1, title: "Apply Online", desc: "Takes just 30 seconds", icon: CheckCircle, color: "emerald" },
                { step: 2, title: "Campus Visit", desc: "See our facilities", icon: Users, color: "teal" },
                { step: 3, title: "Assessment", desc: "Holistic student evaluation", icon: Award, color: "cyan" },
                { step: 4, title: "Decision", desc: "Within 48 hours", icon: Clock, color: "emerald" },
              ].map((item, index) => (
                <Card
                  key={index}
                  className={`border-l-4 border-${item.color}-500 shadow-md hover:shadow-lg transition-shadow`}
                >
                  <CardContent className="p-4 md:p-6">
                    <div
                      className={`w-8 md:w-10 h-8 md:h-10 bg-${item.color}-100 rounded-full flex items-center justify-center mb-3 md:mb-4`}
                    >
                      <span className={`font-bold text-${item.color}-600 text-sm md:text-base`}>{item.step}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Limited Spaces Available</h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            {"Secure your child's place in a school that values who they become just as much as what they achieve."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-6 md:px-8 py-3 text-base md:text-lg rounded-lg font-semibold w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent px-6 md:px-8 py-3 text-base md:text-lg rounded-lg w-full sm:w-auto"
              >
                Request Information
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

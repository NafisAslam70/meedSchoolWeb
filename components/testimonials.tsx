"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1)
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: t(
        "The holistic report card opened our eyes. We see not just grades, but how our daughter's Ikhlas, discipline, and confidence are growing every term through the T1-T4 system.",
        "\u0938\u092E\u0917\u094D\u0930 \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u0915\u093E\u0930\u094D\u0921 \u0928\u0947 \u0939\u092E\u093E\u0930\u0940 \u0906\u0901\u0916\u0947\u0902 \u0916\u094B\u0932 \u0926\u0940\u0902\u0964 \u0939\u092E \u0915\u0947\u0935\u0932 \u0905\u0902\u0915 \u0928\u0939\u0940\u0902, \u092C\u0932\u094D\u0915\u093F \u0926\u0947\u0916\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F T1-T4 \u092A\u094D\u0930\u0923\u093E\u0932\u0940 \u0938\u0947 \u0939\u092E\u093E\u0930\u0940 \u092C\u0947\u091F\u0940 \u0915\u0940 \u0908\u092E\u093E\u0928\u0926\u093E\u0930\u0940, \u0905\u0928\u0941\u0936\u093E\u0938\u0928 \u0914\u0930 \u0906\u0924\u094D\u092E\u0935\u093F\u0936\u094D\u0935\u093E\u0938 \u0915\u0948\u0938\u0947 \u092C\u0922\u093C \u0930\u0939\u093E \u0939\u0948\u0964"
      ),
      author: t("Parent A", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915 A"),
      role: t("Parent, Pre-Primary", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915, \u092A\u094D\u0930\u0940-\u092A\u094D\u0930\u093E\u0907\u092E\u0930\u0940"),
      stars: 5,
    },
    {
      quote: t(
        "The MEED framework is remarkable. The TCS cycle after every chapter means our son never falls behind. His PT tracks not just scores, but character via EDD and CDD.",
        "MEED \u0922\u093E\u0901\u091A\u093E \u0905\u0926\u094D\u092D\u0941\u0924 \u0939\u0948\u0964 \u0939\u0930 \u0905\u0927\u094D\u092F\u093E\u092F \u0915\u0947 \u092C\u093E\u0926 TCS \u091A\u0915\u094D\u0930 \u0915\u093E \u092E\u0924\u0932\u092C \u0939\u0948 \u0915\u093F \u0939\u092E\u093E\u0930\u093E \u092C\u0947\u091F\u093E \u0915\u092D\u0940 \u092A\u0940\u091B\u0947 \u0928\u0939\u0940\u0902 \u0930\u0939\u0924\u093E\u0964 \u0909\u0938\u0915\u093E PT \u0915\u0947\u0935\u0932 \u0905\u0902\u0915 \u0928\u0939\u0940\u0902, EDD \u0914\u0930 CDD \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 \u091A\u0930\u093F\u0924\u094D\u0930 \u092D\u0940 \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
      ),
      author: t("Parent B", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915 B"),
      role: t("Parent, Class VII", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915, \u0915\u0915\u094D\u0937\u093E VII"),
      stars: 5,
    },
    {
      quote: t(
        "From the Mother-Guide model in Nursery to structured STEPH lessons in Elementary, every stage feels intentional. The five principles are alive in daily practice.",
        "\u0928\u0930\u094D\u0938\u0930\u0940 \u092E\u0947\u0902 Mother-Guide \u092E\u0949\u0921\u0932 \u0938\u0947 Elementary \u092E\u0947\u0902 STEPH \u092A\u093E\u0920\u094B\u0902 \u0924\u0915, \u0939\u0930 \u091A\u0930\u0923 \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F\u092A\u0942\u0930\u094D\u0923 \u0932\u0917\u0924\u093E \u0939\u0948\u0964 \u092A\u093E\u0901\u091A \u0938\u093F\u0926\u094D\u0927\u093E\u0902\u0924 \u0926\u0948\u0928\u093F\u0915 \u0905\u092D\u094D\u092F\u093E\u0938 \u092E\u0947\u0902 \u091C\u0940\u0935\u093F\u0924 \u0939\u0948\u0902\u0964"
      ),
      author: t("Parent C", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915 C"),
      role: t("Parent of Three Students", "\u0924\u0940\u0928 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0905\u092D\u093F\u092D\u093E\u0935\u0915"),
      stars: 5,
    },
    {
      quote: t(
        "Discipline over outcome is not just a slogan. Our daughter's Day Open pledge and Day Shutdown reflection have transformed her approach to learning.",
        "\u092A\u0930\u093F\u0923\u093E\u092E \u0938\u0947 \u090A\u092A\u0930 \u0905\u0928\u0941\u0936\u093E\u0938\u0928 \u0915\u0947\u0935\u0932 \u0928\u093E\u0930\u093E \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0939\u092E\u093E\u0930\u0940 \u092C\u0947\u091F\u0940 \u0915\u0947 Day Open \u0936\u092A\u0925 \u0914\u0930 Day Shutdown \u091A\u093F\u0902\u0924\u0928 \u0928\u0947 \u0909\u0938\u0915\u0940 \u0938\u0940\u0916\u0928\u0947 \u0915\u0940 \u092A\u094D\u0930\u0915\u094D\u0930\u093F\u092F\u093E \u092C\u0926\u0932 \u0926\u0940 \u0939\u0948\u0964"
      ),
      author: t("Parent D", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915 D"),
      role: t("Parent, Class V", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915, \u0915\u0915\u094D\u0937\u093E V"),
      stars: 5,
    },
    {
      quote: t(
        "The full-day ecosystem -- Fajr to GoodNight -- means our children are never idle. AMRIs and NMRIs together create a coherent ecology for growth.",
        "\u092A\u0942\u0930\u094D\u0923-\u0926\u093F\u0935\u0938\u0940\u092F \u092A\u093E\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u0915\u0940 \u0924\u0902\u0924\u094D\u0930 -- \u092B\u091C\u094D\u0930 \u0938\u0947 GoodNight \u0924\u0915 -- \u0915\u093E \u092E\u0924\u0932\u092C \u0939\u0948 \u0915\u093F \u0939\u092E\u093E\u0930\u0947 \u092C\u091A\u094D\u091A\u0947 \u0915\u092D\u0940 \u0928\u093F\u0937\u094D\u0915\u094D\u0930\u093F\u092F \u0928\u0939\u0940\u0902 \u0930\u0939\u0924\u0947\u0964 AMRIs \u0914\u0930 NMRIs \u092E\u093F\u0932\u0915\u0930 \u0935\u093F\u0915\u093E\u0938 \u0915\u0940 \u0938\u0941\u0938\u0902\u0917\u0924 \u092A\u093E\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u0915\u0940 \u092C\u0928\u093E\u0924\u0947 \u0939\u0948\u0902\u0964"
      ),
      author: t("Parent E", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915 E"),
      role: t("Parent, Class III", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915, \u0915\u0915\u094D\u0937\u093E III"),
      stars: 5,
    },
  ]

  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length)

  return (
    <section className="py-12 md:py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            {t("What Parents Say", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915 \u0915\u094D\u092F\u093E \u0915\u0939\u0924\u0947 \u0939\u0948\u0902")}
          </h2>
          <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t(
              "Hear from families who've experienced the MEED holistic education difference",
              "\u0909\u0928 \u092A\u0930\u093F\u0935\u093E\u0930\u094B\u0902 \u0938\u0947 \u0938\u0941\u0928\u0947\u0902 \u091C\u093F\u0928\u094D\u0939\u094B\u0902\u0928\u0947 MEED \u0938\u092E\u0917\u094D\u0930 \u0936\u093F\u0915\u094D\u0937\u093E \u0915\u0947 \u0905\u0902\u0924\u0930 \u0915\u094B \u0905\u0928\u0941\u092D\u0935 \u0915\u093F\u092F\u093E \u0939\u0948"
            )}
          </p>
        </div>

        {/* Mobile: Card carousel */}
        <div className="md:hidden">
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mx-2">
            <div className="flex mb-3">
              {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {`"${testimonials[activeIndex].quote}"`}
            </p>
            <div>
              <div className="font-bold text-white text-sm">{testimonials[activeIndex].author}</div>
              <div className="text-gray-400 text-xs">{testimonials[activeIndex].role}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white" aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === activeIndex ? "w-6 bg-emerald-500" : "w-2 bg-white/30"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white" aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">{`"${testimonial.quote}"`}</p>
              <div>
                <div className="font-bold text-white text-sm">{testimonial.author}</div>
                <div className="text-gray-400 text-xs">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-16">
          <p className="text-xl md:text-3xl font-bold text-emerald-500">
            {t(
              "A Deserved Reward Earned Through Virtue, Effort, and Excellence",
              "\u0938\u0926\u094D\u0917\u0941\u0923, \u092A\u094D\u0930\u092F\u093E\u0938 \u0914\u0930 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F\u0924\u093E \u0938\u0947 \u0905\u0930\u094D\u091C\u093F\u0924 \u0909\u091A\u093F\u0924 \u092A\u0941\u0930\u0938\u094D\u0915\u093E\u0930"
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

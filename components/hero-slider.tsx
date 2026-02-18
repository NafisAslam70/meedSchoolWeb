"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

type Slide = {
  title: string
  subtitle: string
  description: string
  image?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export default function HeroSlider({ slides: slidesProp }: { slides?: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { t } = useLanguage()

  const slides: Slide[] = slidesProp && slidesProp.length > 0 ? slidesProp : [
    {
      image: "/images/hero-1.jpg",
      title: t("Nurturing Leaders of Excellence"),
      subtitle: t("Mastery. Enlightenment. Empowerment. Dedication."),
      description: t("A deserved reward earned through virtue, effort, and excellence -- cultivating masters in both Dunya and Akhirah."),
    },
    {
      image: "/images/hero-2.jpg",
      title: t("Holistic Classroom Learning"),
      subtitle: t("The STEPH Lesson Flow"),
      description: t("Every lesson follows Set, Teach, Engage, Practice, Harvest -- structured for depth over surface-level coverage."),
    },
    {
      image: "/images/hero-3.jpg",
      title: t("Discipline Over Outcome"),
      subtitle: t("17 Daily Micro-Rituals"),
      description: t("From Day Open to GoodNight, every block has purpose -- a coherent ecology for whole-person formation."),
    },
    {
      image: "/images/hero-4.jpg",
      title: t("Depth in Knowledge"),
      subtitle: t("Pre-Primary through Class VIII"),
      description: t("Drawing from CCE, IB PYP, Finnish education, and Islamic pedagogy to deliver world-class holistic learning."),
    },
  ]

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 700)
    },
    [isTransitioning, current],
  )

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length)
  }, [current, goToSlide, slides.length])

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length)
  }, [current, goToSlide, slides.length])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: index === current ? 1 : 0,
            transform: index === current ? "scale(1)" : "scale(1.05)",
            zIndex: index === current ? 1 : 0,
          }}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-black/30" />
        </div>
      ))}

      <div className="relative z-10 flex items-end pb-20 md:items-center md:pb-0 h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-lg md:max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="transition-all duration-700 ease-in-out"
                style={{
                  opacity: index === current ? 1 : 0,
                  transform: index === current ? "translateY(0)" : "translateY(30px)",
                  position: index === current ? "relative" : "absolute",
                  pointerEvents: index === current ? "auto" : "none",
                }}
              >
                <span className="inline-block bg-emerald-600/90 text-white text-[11px] md:text-sm font-medium px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-3 md:mb-6">
                  {slide.subtitle}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 md:mb-6 text-balance">
                  {slide.title}
                </h1>
                <p className="text-xs md:text-lg text-gray-200 leading-relaxed mb-4 md:mb-8 max-w-xl line-clamp-2 md:line-clamp-none">
                  {slide.description}
                </p>
                <div className="flex flex-row gap-2 md:gap-3">
                  <Link href={slide.primaryCta?.href || "/register"}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-8 py-2.5 md:py-4 text-xs md:text-lg font-semibold rounded-xl">
                      {slide.primaryCta?.label || t("Apply Now")}
                      <ChevronRight className="ml-1 h-3.5 w-3.5 md:h-5 md:w-5" />
                    </Button>
                  </Link>
                  <Link href={slide.secondaryCta?.href || "/programs"}>
                    <Button
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 bg-transparent px-4 md:px-8 py-2.5 md:py-4 text-xs md:text-lg font-semibold rounded-xl"
                    >
                      <BookOpen className="mr-1 h-3.5 w-3.5 md:h-5 md:w-5" />
                      {slide.secondaryCta?.label || t("Our Programs")}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow controls - tablets+ */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors hidden sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors hidden sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group p-1"
          >
            <div className={`h-1.5 md:h-2.5 rounded-full transition-all duration-500 ${index === current ? "w-6 md:w-10 bg-emerald-500" : "w-1.5 md:w-2.5 bg-white/50 group-hover:bg-white/80"}`} />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
      </div>
    </section>
  )
}

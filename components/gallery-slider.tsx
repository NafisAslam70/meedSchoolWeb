"use client"

import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type GalleryItem = {
  src: string
  alt?: string
}

export function GallerySlider({ items, aspectRatio = "16/9", rounded = "xl" }: { items: GalleryItem[]; aspectRatio?: string; rounded?: "lg" | "xl" | "2xl" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const roundedClass =
    rounded === "2xl" ? "rounded-2xl" : rounded === "lg" ? "rounded-lg" : "rounded-xl"

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  if (!items || items.length === 0) return null

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, idx) => (
            <div className="min-w-0 flex-[0_0_100%] px-1" key={idx}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
                <img
                  src={item.src}
                  alt={item.alt || "Gallery image"}
                  className={`absolute inset-0 h-full w-full object-cover ${roundedClass} shadow-xl`}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow-md transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow-md transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-3 flex justify-center gap-2">
        {items.map((_, idx) => (
          <div key={idx} className="h-1.5 w-6 rounded-full bg-gray-200 group-hover:bg-gray-300" />
        ))}
      </div>
    </div>
  )
}

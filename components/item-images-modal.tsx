"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useArtworkModal } from "./artwork-modal-context"

export function ItemImagesModal() {
  const { selectedItemForPreview, closeItemPreview } = useArtworkModal()
  const [activeIndex, setActiveIndex] = useState(0)

  const images = selectedItemForPreview?.images?.length
    ? selectedItemForPreview.images
    : selectedItemForPreview
      ? [selectedItemForPreview.image]
      : []

  useEffect(() => {
    setActiveIndex(0)
  }, [selectedItemForPreview?.id])

  const showPrevious = () => {
    if (!images.length) return
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const showNext = () => {
    if (!images.length) return
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <Dialog open={!!selectedItemForPreview} onOpenChange={closeItemPreview}>
      <DialogContent
        className="w-[96vw] sm:w-[94vw] lg:w-[92vw] xl:w-[88vw] max-w-7xl h-[100dvh] lg:h-[94dvh] max-h-[100dvh] lg:max-h-[94dvh] rounded-none lg:rounded-lg border-0 lg:border lg:border-white/20 p-0 gap-0 bg-black/95 text-white overflow-hidden"
        showCloseButton={false}
      >
        <div className="relative flex h-full w-full flex-col">
          <div className="border-b border-white/20 px-3 py-3 sm:px-6 sm:py-4 lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:z-30 lg:border-b lg:border-white/15 lg:bg-black/45 lg:backdrop-blur-sm lg:px-6 lg:py-2">
            <DialogTitle className="font-serif text-lg sm:text-2xl lg:text-xl text-white pr-20 lg:pr-28">
              {selectedItemForPreview?.title} - Item Images
            </DialogTitle>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2 sm:gap-3 overflow-x-auto pb-1 lg:mt-1 lg:gap-2 lg:pb-0">
                {images.map((imageSrc, index) => (
                  <button
                    key={`${imageSrc}-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-14 w-20 sm:h-16 sm:w-24 md:h-20 md:w-32 lg:h-12 lg:w-20 shrink-0 overflow-hidden border transition-all duration-300 ${
                      activeIndex === index
                        ? "border-primary scale-105 shadow-lg shadow-primary/40"
                        : "border-white/30 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${selectedItemForPreview?.title ?? "Artwork"} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={closeItemPreview}
              className="absolute right-3 top-3 sm:right-6 sm:top-4 lg:right-6 lg:top-2 border border-white/40 px-3 py-2 lg:px-2.5 lg:py-1.5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              Close
            </button>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-6 md:px-10 py-4 sm:py-6 lg:px-0 lg:py-0 overflow-hidden">
            {images.length > 1 && (
              <>
                <button
                  onClick={showPrevious}
                  className="absolute left-2 sm:left-5 lg:left-8 z-20 bg-black/50 border border-white/40 p-2 sm:p-3 hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-2 sm:right-5 lg:right-8 z-20 bg-black/50 border border-white/40 p-2 sm:p-3 hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </>
            )}

            {!!images.length && (
              <div
                key={`${images[activeIndex]}-${activeIndex}`}
                className="relative h-full w-full animate-in fade-in zoom-in-95 duration-500"
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${selectedItemForPreview?.title ?? "Artwork"} image ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
          </div>

          <div className="border-t border-white/20 px-4 py-3 text-center text-xs sm:text-sm text-white/80 tracking-[0.18em] uppercase lg:absolute lg:left-0 lg:right-0 lg:bottom-0 lg:border-t lg:bg-black/45 lg:backdrop-blur-sm">
            Image {images.length ? activeIndex + 1 : 0} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

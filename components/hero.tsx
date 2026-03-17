"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, ArrowDown } from "lucide-react"
import { useArtworkModal, artworks } from "./artwork-modal-context"

export function Hero() {
  const { selectHeroArtwork, openModal } = useArtworkModal()
  const lastInteractionAt = useRef<number>(Date.now())
  const lastScrollY = useRef<number>(0)
  const lastSyncedIndexOnScrollDown = useRef<number>(-1)
  const [currentIndex, setCurrentIndex] = useState(0)

  const AUTOPLAY_MS = 2800
  const PAUSE_AFTER_INTERACTION_MS = 7500

  const markInteraction = () => {
    lastInteractionAt.current = Date.now()
  }

  const setSlideByIndex = useCallback((index: number, userInitiated = false) => {
    const normalizedIndex = (index + artworks.length) % artworks.length
    setCurrentIndex(normalizedIndex)
    if (userInitiated) {
      markInteraction()
    }
  }, [])

  const nextSlide = useCallback((userInitiated = false) => {
    const nextIndex = (currentIndex + 1) % artworks.length
    setSlideByIndex(nextIndex, userInitiated)
  }, [currentIndex, setSlideByIndex])

  const prevSlide = useCallback((userInitiated = false) => {
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length
    setSlideByIndex(prevIndex, userInitiated)
  }, [currentIndex, setSlideByIndex])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const idleMs = Date.now() - lastInteractionAt.current
      if (idleMs >= PAUSE_AFTER_INTERACTION_MS) {
        nextSlide(false)
      }
    }, AUTOPLAY_MS)

    return () => window.clearInterval(intervalId)
  }, [nextSlide])

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current + 2

      if (isScrollingDown && lastSyncedIndexOnScrollDown.current !== currentIndex) {
        selectHeroArtwork(artworks[currentIndex], { scrollToGallery: false })
        lastSyncedIndexOnScrollDown.current = currentIndex
      }

      lastScrollY.current = currentScrollY
    }

    lastScrollY.current = window.scrollY
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [currentIndex, selectHeroArtwork])

  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + artworks.length) % artworks.length
    
    if (diff === 0) {
      return {
        transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
      }
    } else if (diff === 1) {
      return {
        transform: "translateX(82px) translateY(14px) scale(0.92) rotateY(-6deg)",
        zIndex: 20,
        opacity: 0.82,
      }
    } else if (diff === 2) {
      return {
        transform: "translateX(156px) translateY(28px) scale(0.84) rotateY(-10deg)",
        zIndex: 10,
        opacity: 0.62,
      }
    } else {
      return {
        transform: "translateX(218px) translateY(40px) scale(0.76) rotateY(-12deg)",
        zIndex: 0,
        opacity: 0,
      }
    }
  }

  const handleCardClick = (index: number) => {
    markInteraction()
    if (index === currentIndex) {
      openModal(artworks[index])
    } else {
      setSlideByIndex(index, true)
    }
  }

  const viewMoreDetails = () => {
    markInteraction()
    selectHeroArtwork(artworks[currentIndex], { scrollToGallery: true })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-[5]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-background via-background/85 to-transparent z-[5]" />

      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y3ww5qy3ww5qy3ww-0jKeF2DVWdGcQaYx7wgu9BsixF6Ly5.png"
          alt="Abstract art background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30" style={{ background: 'radial-gradient(ellipse at top center, rgba(212,175,85,0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 text-center mb-12 lg:mb-20">
        <p className="text-primary tracking-[0.4em] uppercase text-xs sm:text-sm mb-4 drop-shadow-lg">Exclusive Gallery</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-foreground drop-shadow-2xl">
          <span className="block text-balance">The Atelier Collection</span>
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          <div 
            className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
            style={{ perspective: '1500px' }}
          >
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="absolute left-0 sm:left-4 lg:left-8 top-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group will-change-transform"
                style={{
                  ...getCardStyle(index),
                  transformStyle: "preserve-3d",
                }}
                onClick={() => handleCardClick(index)}
              >
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/30 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.7),0_0_40px_-10px_rgba(212,175,85,0.2)] group-hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(212,175,85,0.4)] transition-shadow duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {index === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/30 transition-colors duration-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-foreground text-sm tracking-widest uppercase bg-card/80 px-4 py-2 rounded backdrop-blur-sm">
                          View Details
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 bg-gradient-to-b from-card to-card/90">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-xl sm:text-2xl text-foreground">{artwork.title}</h3>
                      <span className="text-lg sm:text-xl font-semibold text-primary drop-shadow-[0_0_10px_rgba(212,175,85,0.5)]">{artwork.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:max-w-md xl:max-w-lg text-center lg:text-left px-4 lg:px-0">
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8">
              {"Discover our artist's masterful fusion of texture and emotion. Click on any artwork to request a private viewing."}
            </p>
            
            <button 
              onClick={viewMoreDetails}
              className="inline-block bg-primary text-primary-foreground px-8 sm:px-12 py-4 text-sm tracking-widest uppercase font-medium hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(212,175,85,0.4)] transition-all mb-10 rounded-lg shadow-lg shadow-primary/30"
            >
              See Collection
            </button>

            <div className="flex items-center justify-center lg:justify-start gap-6">
              <button
                onClick={() => prevSlide(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(212,175,85,0.5)] transition-all backdrop-blur-sm bg-card/30"
                aria-label="Previous artwork"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <span className="text-foreground font-serif text-xl sm:text-2xl min-w-[80px] text-center">
                {currentIndex + 1} / {artworks.length}
              </span>
              
              <button
                onClick={() => nextSlide(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(212,175,85,0.5)] transition-all backdrop-blur-sm bg-card/30"
                aria-label="Next artwork"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
              {artworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlideByIndex(index, true)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-primary w-8 shadow-[0_0_10px_rgba(212,175,85,0.6)]" 
                      : "bg-foreground/20 w-2 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to artwork ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  )
}

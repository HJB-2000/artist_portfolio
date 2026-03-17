"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, ArrowDown } from "lucide-react"
import { useArtworkModal, artworks } from "./artwork-modal-context"

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { openModal } = useArtworkModal()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length)
  }, [])

  // Auto-swap every 4 seconds
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + artworks.length) % artworks.length
    
    if (diff === 0) {
      // Front card - prominent with dramatic presence
      return {
        transform: "translateX(0) translateY(0) scale(1) rotateY(0deg) rotateX(0deg)",
        zIndex: 30,
        opacity: 1,
      }
    } else if (diff === 1) {
      // Second card - cascading depth effect
      return {
        transform: "translateX(120px) translateY(25px) scale(0.9) rotateY(-12deg) rotateX(2deg)",
        zIndex: 20,
        opacity: 0.8,
      }
    } else if (diff === 2) {
      // Third card - deeper cascade
      return {
        transform: "translateX(230px) translateY(50px) scale(0.8) rotateY(-18deg) rotateX(4deg)",
        zIndex: 10,
        opacity: 0.55,
      }
    } else {
      // Hidden cards
      return {
        transform: "translateX(330px) translateY(75px) scale(0.7) rotateY(-22deg) rotateX(6deg)",
        zIndex: 0,
        opacity: 0,
      }
    }
  }

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      // If clicking the front card, open the modal
      openModal(artworks[index])
    } else {
      // Otherwise, bring that card to front
      setCurrentIndex(index)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden">
      {/* Dramatic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y3ww5qy3ww5qy3ww-0jKeF2DVWdGcQaYx7wgu9BsixF6Ly5.png"
          alt="Abstract art background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        {/* Dramatic lighting effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />
        {/* Vignette effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
        }} />
        {/* Spotlight effect from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30" style={{
          background: 'radial-gradient(ellipse at top center, rgba(212,175,85,0.3) 0%, transparent 70%)'
        }} />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-12 lg:mb-20">
        <p className="text-primary tracking-[0.4em] uppercase text-xs sm:text-sm mb-4 drop-shadow-lg">Exclusive Gallery</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-foreground drop-shadow-2xl">
          <span className="block text-balance">The Atelier Collection</span>
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Card Stack */}
          <div 
            className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl h-[520px] sm:h-[580px] md:h-[650px] lg:h-[720px]"
            style={{ perspective: '2000px' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="absolute left-0 sm:left-4 lg:left-8 top-0 w-[320px] sm:w-[380px] md:w-[420px] lg:w-[480px] transition-all duration-700 ease-out cursor-pointer group"
                style={{
                  ...getCardStyle(index),
                  transformStyle: "preserve-3d",
                }}
                onClick={() => handleCardClick(index)}
              >
                <div className="bg-card/95 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-primary/40 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8),0_0_60px_-15px_rgba(212,175,85,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.85),0_0_80px_-15px_rgba(212,175,85,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] group-hover:border-primary/60 transition-all duration-500">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {/* Dramatic top highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent" />
                    {/* Click hint overlay for front card */}
                    {index === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/30 transition-colors duration-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-foreground text-sm tracking-widest uppercase bg-card/90 px-6 py-3 rounded-lg backdrop-blur-md shadow-lg border border-primary/30">
                          View Details
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 bg-gradient-to-b from-card to-card/95">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-2xl sm:text-3xl text-foreground">{artwork.title}</h3>
                      <span className="text-xl sm:text-2xl font-semibold text-primary drop-shadow-[0_0_15px_rgba(212,175,85,0.6)]">{artwork.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Panel */}
          <div className="lg:max-w-md xl:max-w-lg text-center lg:text-left px-4 lg:px-0">
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8">
              {"Discover our artist's masterful fusion of texture and emotion. Click on any artwork to request a private viewing."}
            </p>
            
            <button 
              onClick={() => openModal(artworks[currentIndex])}
              className="inline-block bg-primary text-primary-foreground px-8 sm:px-12 py-4 text-sm tracking-widest uppercase font-medium hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(212,175,85,0.4)] transition-all mb-10 rounded-lg shadow-lg shadow-primary/30"
            >
              Request Private View
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <button
                onClick={prevSlide}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(212,175,85,0.5)] transition-all backdrop-blur-sm bg-card/30"
                aria-label="Previous artwork"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <span className="text-foreground font-serif text-xl sm:text-2xl min-w-[80px] text-center">
                {currentIndex + 1} / {artworks.length}
              </span>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/40 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(212,175,85,0.5)] transition-all backdrop-blur-sm bg-card/30"
                aria-label="Next artwork"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
              {artworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  )
}

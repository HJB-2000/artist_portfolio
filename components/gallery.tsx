"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import { useArtworkModal, artworks } from "./artwork-modal-context"

export function Gallery() {
  const { heroArtwork, selectHeroArtwork, openModal, openItemPreview } = useArtworkModal()

  const featuredArtwork = heroArtwork
  const thumbnails = artworks.filter(a => a.id !== featuredArtwork.id).slice(0, 4)
  const sparkParticles = Array.from({ length: 180 }, (_, index) => {
    const seed = index + 1
    const fract = (value: number) => value - Math.floor(value)
    const rand = (scale: number) => fract(Math.sin(seed * scale) * 43758.5453123)

    return {
      x: Math.round(rand(12.9898) * 1000) / 10,
      y: -18 + rand(78.233) * 108,
      size: 0.7 + rand(39.425) * 2.1,
      dur: 10 + rand(45.164) * 20,
      delay: -rand(94.673) * 22,
      dx: -18 + rand(31.692) * 36,
      dy: 180 + rand(27.157) * 340,
      pulse: 2.5 + rand(66.731) * 6.8,
      pulseDelay: -rand(18.257) * 5,
      hue: 198 + rand(71.933) * 38,
      alpha: 0.35 + rand(52.621) * 0.52,
      blur: rand(15.371) * 1.05,
    }
  })
  const shootingStars = [
    { x: 6, y: 10, len: 180, dur: 17.5, delay: -9.2, angle: -24 },
    { x: 21, y: 7, len: 150, dur: 20.2, delay: -2.8, angle: -21 },
    { x: 49, y: 14, len: 210, dur: 22.8, delay: -11.4, angle: -26 },
    { x: 67, y: 9, len: 165, dur: 19.6, delay: -5.2, angle: -22 },
    { x: 83, y: 13, len: 140, dur: 24.4, delay: -15.6, angle: -19 },
    { x: 38, y: 5, len: 175, dur: 21.2, delay: -6.7, angle: -23 },
  ]

  return (
    <section id="collection" className="relative py-24 lg:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-background via-background/90 to-transparent z-[6]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-background via-background/90 to-transparent z-[6]" />

      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y3ww5qy3ww5qy3ww-0jKeF2DVWdGcQaYx7wgu9BsixF6Ly5.png"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background" />
        <div aria-hidden className="collection-cosmos">
          <div className="collection-nebula" />
          <div className="collection-starfield">
            {sparkParticles.map((spark, index) => (
              <span
                key={`spark-${index}`}
                className="collection-spark"
                style={{
                  "--x": `${spark.x}%`,
                  "--y": `${spark.y}%`,
                  "--size": `${spark.size}px`,
                  "--dur": `${spark.dur}s`,
                  "--delay": `${spark.delay}s`,
                  "--dx": `${spark.dx}px`,
                  "--dy": `${spark.dy}px`,
                  "--pulse": `${spark.pulse}s`,
                  "--pulse-delay": `${spark.pulseDelay}s`,
                  "--hue": `${spark.hue}`,
                  "--alpha": `${spark.alpha}`,
                  "--blur": `${spark.blur}px`,
                } as CSSProperties}
              />
            ))}
          </div>
          <div className="collection-shooting-layer">
            {shootingStars.map((star, index) => (
              <span
                key={`shooting-star-${index}`}
                className="collection-shooting-star"
                style={{
                  "--sx": `${star.x}%`,
                  "--sy": `${star.y}%`,
                  "--slen": `${star.len}px`,
                  "--shoot-dur": `${star.dur}s`,
                  "--shoot-delay": `${star.delay}s`,
                  "--shoot-angle": `${star.angle}deg`,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            THE ATELIER COLLECTION
          </h2>
        </div>

        {/* MODIFICATION: Added ID for scroll targeting */}
        <div id="gallery-featured-section" className="relative mb-8 scroll-mt-20">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden border border-primary/20 shadow-2xl shadow-black/50">
            <Image
              src={featuredArtwork.image}
              alt={featuredArtwork.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/40 to-transparent" />
            
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-right max-w-xs">
              <p className="text-primary text-sm md:text-base tracking-[0.2em] uppercase mb-2">
                TITLE: <span className="text-foreground">{featuredArtwork.title}</span>
              </p>
              <p className="text-muted-foreground text-sm md:text-base tracking-wide mb-6">
                SIZE: {featuredArtwork.dimensions}
              </p>
              <div className="flex flex-col gap-3 items-end">
                <button
                  onClick={() => openModal(featuredArtwork)}
                  className="border border-primary/50 text-primary px-6 py-3 text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  REQUEST PRIVATE VIEW.
                </button>
                <button
                  onClick={() => openItemPreview(featuredArtwork)}
                  className="border border-primary/30 text-foreground px-6 py-3 text-sm tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  SHOW ITEM
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground tracking-wide">
            THE ARTIST | THE HARMONY OF CHAOS | ONE-OF-A-KIND REEL TABLAUX.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {thumbnails.map((artwork, index) => {
            const heights = ["h-48 md:h-64", "h-56 md:h-72", "h-52 md:h-80", "h-44 md:h-56"]
            const marginTops = ["mt-0", "mt-8 md:mt-12", "mt-4 md:mt-6", "mt-12 md:mt-16"]
            
            return (
              <div 
                key={artwork.id}
                className={`group cursor-pointer ${marginTops[index]}`}
                onClick={() => selectHeroArtwork(artwork)}
              >
                <div className={`relative ${heights[index]} overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-500`}>
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
                  
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-background/80 backdrop-blur-sm px-3 py-2">
                      <p className="text-xs tracking-wider text-foreground">{artwork.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => openModal(artworks[0])}
            className="border border-primary text-primary px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium"
          >
            VIEW FULL COLLECTION
          </button>
        </div>
      </div>
    </section>
  )
}

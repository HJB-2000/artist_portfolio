"use client"

import { useState } from "react"
import Image from "next/image"
import { useArtworkModal, artworks } from "./artwork-modal-context"

export function Gallery() {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const { openModal } = useArtworkModal()

  const featuredArtwork = artworks[featuredIndex]
  const thumbnails = artworks.filter((_, i) => i !== featuredIndex).slice(0, 4)

  return (
    <section id="collection" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with dramatic overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y3ww5qy3ww5qy3ww-0jKeF2DVWdGcQaYx7wgu9BsixF6Ly5.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            THE ATELIER COLLECTION
          </h2>
        </div>

        {/* Featured Artwork */}
        <div className="relative mb-8">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden border border-primary/20 shadow-2xl shadow-black/50">
            <Image
              src={featuredArtwork.image}
              alt={featuredArtwork.title}
              fill
              className="object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/40 to-transparent" />
            
            {/* Artwork Info Panel */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-right max-w-xs">
              <p className="text-primary text-sm md:text-base tracking-[0.2em] uppercase mb-2">
                TITLE: <span className="text-foreground">{featuredArtwork.title}</span>
              </p>
              <p className="text-muted-foreground text-sm md:text-base tracking-wide mb-6">
                SIZE: {featuredArtwork.dimensions}
              </p>
              <button 
                onClick={() => openModal(featuredArtwork)}
                className="border border-primary/50 text-primary px-6 py-3 text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                REQUEST PRIVATE VIEW.
              </button>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-12">
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground tracking-wide">
            THE ARTIST | THE HARMONY OF CHAOS | ONE-OF-A-KIND REEL TABLAUX.
          </p>
        </div>

        {/* Thumbnail Row with Staggered Heights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {thumbnails.map((artwork, index) => {
            // Create staggered heights
            const heights = ["h-48 md:h-64", "h-56 md:h-72", "h-52 md:h-80", "h-44 md:h-56"]
            const marginTops = ["mt-0", "mt-8 md:mt-12", "mt-4 md:mt-6", "mt-12 md:mt-16"]
            
            return (
              <div 
                key={artwork.id}
                className={`group cursor-pointer ${marginTops[index]}`}
                onClick={() => {
                  const originalIndex = artworks.findIndex(a => a.id === artwork.id)
                  setFeaturedIndex(originalIndex)
                }}
              >
                <div className={`relative ${heights[index]} overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-500`}>
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
                  
                  {/* Hover overlay with title */}
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

        {/* View All Button */}
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

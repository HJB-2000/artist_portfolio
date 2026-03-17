"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useArtworkModal } from "./artwork-modal-context"

export function ArtworkModal() {
  const { selectedArtwork, closeModal } = useArtworkModal()

  return (
    <Dialog open={!!selectedArtwork} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-7xl w-[96vw] max-h-[92vh] overflow-hidden p-0 border border-primary/40 rounded-2xl shadow-[0_0_120px_-30px_rgba(212,175,85,0.35),0_30px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        <DialogTitle className="sr-only">
          Request Private View - {selectedArtwork?.title ?? "Artwork"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Request a private viewing for this artwork
        </DialogDescription>
        {selectedArtwork && (
          <div className="grid md:grid-cols-5 lg:grid-cols-12 h-full">
            {/* Left Column - Visual (40% on desktop) */}
            <div className="relative h-[280px] md:h-auto md:col-span-2 lg:col-span-5 overflow-hidden">
              <Image
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {/* Subtle edge blend for desktop */}
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950/50 to-transparent hidden md:block" />
              {/* Mobile gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
              
              {/* Mobile title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:hidden">
                <p className="text-primary text-[10px] tracking-[0.25em] uppercase mb-1">{selectedArtwork.medium}</p>
                <h3 className="font-serif text-xl text-foreground">{selectedArtwork.title}</h3>
              </div>
            </div>

            {/* Right Column - Content (60% on desktop) */}
            <div className="relative bg-zinc-950/95 backdrop-blur-md md:col-span-3 lg:col-span-7 flex flex-col overflow-y-auto max-h-[calc(92vh-280px)] md:max-h-[92vh]">
              {/* Close Button - Top Right */}
              <button
                onClick={() => closeModal()}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900/80 border border-zinc-700 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full">
                {/* Header - Centered */}
                <div className="text-center mb-8">
                  <p className="text-primary text-[11px] tracking-[0.3em] uppercase mb-3">Request Private View</p>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-4 hidden md:block text-balance">
                    {selectedArtwork.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-lg mx-auto">
                    {selectedArtwork.description}
                  </p>
                </div>

                {/* Artwork Details - 3-Column Grid with proper spacing */}
                <div className="grid grid-cols-3 gap-6 lg:gap-8 mb-8 py-5 px-4 lg:px-6 bg-zinc-900/40 rounded-xl border border-primary/15">
                  <div className="text-center">
                    <p className="text-primary/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2">Year</p>
                    <p className="text-foreground font-medium text-base md:text-lg">{selectedArtwork.year}</p>
                  </div>
                  <div className="text-center border-x border-zinc-800">
                    <p className="text-primary/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2">Size</p>
                    <p className="text-foreground font-medium text-base md:text-lg">{selectedArtwork.dimensions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-primary/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2">Price</p>
                    <p className="text-foreground font-medium text-base md:text-lg">{selectedArtwork.price}</p>
                  </div>
                </div>

                {/* Contact Form - Vertical Stack for breathing room */}
                <form className="flex-1 flex flex-col">
                  <div className="flex flex-col gap-5 mb-6">
                    <div>
                      <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all rounded-lg"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all rounded-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                          Phone
                        </label>
                        <input 
                          type="tel" 
                          className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all rounded-lg"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                          Preferred Date
                        </label>
                        <input 
                          type="date" 
                          className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea 
                        rows={3}
                        className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none rounded-lg"
                        placeholder="Tell us about your interest in this piece..."
                      />
                    </div>
                  </div>

                  {/* Buttons - Centered Row */}
                  <div className="flex justify-center gap-4 mt-auto pt-4">
                    <button 
                      type="submit"
                      className="bg-primary text-primary-foreground px-8 md:px-10 py-3.5 text-xs md:text-sm tracking-[0.2em] uppercase font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 rounded-lg"
                    >
                      Request Private View
                    </button>
                    <button 
                      type="button"
                      onClick={() => closeModal()}
                      className="px-8 md:px-10 py-3.5 text-xs md:text-sm tracking-[0.15em] uppercase border border-zinc-700 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Footer Note */}
                <p className="text-xs text-muted-foreground/70 mt-6 text-center">
                  We typically respond within 24 hours. Private viewings available by appointment.
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

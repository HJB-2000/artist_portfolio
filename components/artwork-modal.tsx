"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useArtworkModal } from "./artwork-modal-context"

export function ArtworkModal() {
  const { selectedArtwork, closeModal } = useArtworkModal()

  return (
    <Dialog open={!!selectedArtwork} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-hidden p-0 border-2 border-primary/50 rounded-2xl shadow-[0_0_100px_-20px_rgba(212,175,85,0.4),0_25px_80px_-20px_rgba(0,0,0,0.8)]">
        <DialogTitle className="sr-only">
          Request Private View - {selectedArtwork?.title ?? "Artwork"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Request a private viewing for this artwork
        </DialogDescription>
        {selectedArtwork && (
          <div className="grid md:grid-cols-[40%_60%] min-h-[600px] md:min-h-[700px]">
            {/* Left Column - Visual (40%) */}
            <div className="relative h-[300px] md:h-auto">
              <Image
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/30 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden" />
              
              {/* Mobile title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                <p className="text-primary text-xs tracking-[0.2em] uppercase mb-1">{selectedArtwork.medium}</p>
                <h3 className="font-serif text-xl text-foreground">{selectedArtwork.title}</h3>
              </div>
            </div>

            {/* Right Column - Content (60%) */}
            <div className="bg-zinc-950/90 backdrop-blur-md p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto max-h-[calc(95vh-300px)] md:max-h-none">
              {/* Header */}
              <div className="mb-6">
                <p className="text-primary text-xs tracking-[0.25em] uppercase mb-2">Request Private View</p>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 hidden md:block">
                  {selectedArtwork.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-3">
                  {selectedArtwork.description}
                </p>
              </div>

              {/* Artwork Details - Clean Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-zinc-900/50 rounded-xl border border-primary/20">
                <div className="text-center md:text-left">
                  <p className="text-primary/80 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-1">Year</p>
                  <p className="text-foreground font-medium text-sm md:text-base">{selectedArtwork.year}</p>
                </div>
                <div className="text-center md:text-left border-x border-primary/20 px-2">
                  <p className="text-primary/80 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-1">Size</p>
                  <p className="text-foreground font-medium text-sm md:text-base">{selectedArtwork.dimensions}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-primary/80 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-1">Price</p>
                  <p className="text-foreground font-medium text-sm md:text-base">{selectedArtwork.price}</p>
                </div>
              </div>

              {/* Contact Form - Optimized Layout */}
              <form className="flex-1 flex flex-col gap-4">
                {/* Name & Email - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] md:text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-zinc-900/60 border border-zinc-700 px-3 py-2.5 md:py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all rounded-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-zinc-900/60 border border-zinc-700 px-3 py-2.5 md:py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all rounded-lg"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone & Date - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] md:text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5">
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      className="w-full bg-zinc-900/60 border border-zinc-700 px-3 py-2.5 md:py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all rounded-lg"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5">
                      Preferred Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-zinc-900/60 border border-zinc-700 px-3 py-2.5 md:py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all rounded-lg"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] md:text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full bg-zinc-900/60 border border-zinc-700 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none rounded-lg"
                    placeholder="Tell us about your interest in this piece..."
                  />
                </div>

                {/* Buttons - Same Row */}
                <div className="flex gap-3 mt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 text-xs md:text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 rounded-lg"
                  >
                    Request View
                  </button>
                  <button 
                    type="button"
                    onClick={() => closeModal()}
                    className="px-6 py-3 text-xs md:text-sm tracking-[0.1em] uppercase border border-zinc-700 text-muted-foreground hover:border-primary hover:text-foreground transition-all rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Footer Note */}
              <p className="text-xs text-muted-foreground mt-4 text-center">
                We typically respond within 24 hours. Private viewings available by appointment.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useArtworkModal } from "./artwork-modal-context"

export function ArtworkModal() {
  const { selectedArtwork, closeModal } = useArtworkModal()

  return (
    <Dialog open={!!selectedArtwork} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-[98vw] w-[1800px] max-h-[95vh] overflow-y-auto p-0 bg-card border-primary/30 shadow-[0_0_80px_-20px_rgba(212,175,85,0.3)]">
        <DialogTitle className="sr-only">
          Request Private View - {selectedArtwork?.title ?? "Artwork"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Request a private viewing for this artwork
        </DialogDescription>
        {selectedArtwork && (
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            {/* Artwork Preview - Left Side (Larger) */}
            <div className="relative">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[800px]">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-cover"
                />
                {/* Subtle edge gradient for separation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20 hidden lg:block" />
              </div>
              
              {/* Artwork Info Overlay - Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden bg-gradient-to-t from-background/90 to-transparent">
                <p className="text-primary text-xs tracking-[0.2em] uppercase mb-1">{selectedArtwork.medium}</p>
                <h3 className="font-serif text-2xl text-foreground">{selectedArtwork.title}</h3>
              </div>
            </div>

            {/* Form Section - Right Side */}
            <div className="p-8 lg:p-12 flex flex-col bg-card">
              {/* Header */}
              <div className="mb-8">
                <p className="text-primary text-xs tracking-[0.25em] uppercase mb-3">Request Private View</p>
                <h3 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-foreground mb-4 hidden lg:block">
                  {selectedArtwork.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  {selectedArtwork.description}
                </p>
              </div>

              {/* Artwork Details */}
              <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b border-border">
                <div>
                  <p className="text-primary text-xs tracking-[0.15em] uppercase mb-2">Year</p>
                  <p className="text-foreground font-medium text-lg">{selectedArtwork.year}</p>
                </div>
                <div>
                  <p className="text-primary text-xs tracking-[0.15em] uppercase mb-2">Size</p>
                  <p className="text-foreground font-medium text-lg">{selectedArtwork.dimensions}</p>
                </div>
                <div>
                  <p className="text-primary text-xs tracking-[0.15em] uppercase mb-2">Price</p>
                  <p className="text-foreground font-medium text-lg">{selectedArtwork.price}</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="flex-1 flex flex-col">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-secondary/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-secondary/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="w-full bg-secondary/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Preferred Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-secondary/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full bg-secondary/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none rounded"
                    placeholder="Tell us about your interest in this piece..."
                  />
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground px-10 py-5 text-sm tracking-[0.2em] uppercase font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 rounded"
                  >
                    Request Private View
                  </button>
                  <button 
                    type="button"
                    onClick={() => closeModal()}
                    className="px-10 py-5 text-sm tracking-[0.15em] uppercase border border-border text-muted-foreground hover:border-primary hover:text-foreground transition-all rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Footer Note */}
              <p className="text-sm text-muted-foreground mt-8 text-center sm:text-left">
                We typically respond within 24 hours. Private viewings are available by appointment.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

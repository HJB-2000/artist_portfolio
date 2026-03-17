"use client"

import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useArtworkModal } from "./artwork-modal-context"

export function ArtworkModal() {
  const { selectedArtwork, closeModal } = useArtworkModal()

  return (
    <Dialog open={!!selectedArtwork} onOpenChange={closeModal}>
      {/* Redesigned Modal: Vertical Split (Phone-like) Layout */}
      <DialogContent className="max-w-4xl w-full flex flex-col gap-0 p-0 bg-card rounded-lg border-primary/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        {selectedArtwork && (
          <>
            {/* Part 1: Top - Image */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] flex-shrink-0">
              <Image
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                fill
                className="object-cover" // Use object-cover to fill the area
              />
              {/* Scroll Indicator - inspired by hero.tsx */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span className="text-xs tracking-widest uppercase text-white/80 bg-black/30 px-2 py-1 rounded-sm">Scroll for details</span>
                <ArrowDown className="w-4 h-4 text-white/80 animate-bounce" />
              </div>
               {/* Gradient overlay for better text visibility */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Part 2: Bottom - Content & Form */}
            <div className="p-6 sm:p-8 lg:p-10">
              
              {/* Section 1: Header */}
              <div className="mb-6">
                <p className="text-primary text-xs tracking-widest uppercase mb-2">Request Private View</p>
                <DialogTitle className="font-serif text-3xl sm:text-4xl text-foreground mb-3">{selectedArtwork.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">{selectedArtwork.description}</DialogDescription>
              </div>

              {/* Section 2: Artwork Details */}
              <div className="border-y border-border my-6 py-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Year</span>
                    <span className="text-foreground font-medium text-sm sm:text-base">{selectedArtwork.year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Dimensions</span>
                    <span className="text-foreground font-medium text-sm sm:text-base">{selectedArtwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Price</span>
                    <span className="text-foreground font-medium text-sm sm-text-base">{selectedArtwork.price}</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Form */}
              <form>
                <h3 className="text-lg font-medium text-foreground mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Full Name *</label>
                    <input type="text" required className="w-full bg-transparent border-b border-border px-1 py-2 focus:outline-none focus:border-primary transition text-sm"/>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Email *</label>
                    <input type="email" required className="w-full bg-transparent border-b border-border px-1 py-2 focus:outline-none focus:border-primary transition text-sm"/>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Message</label>
                    <textarea rows={3} className="w-full bg-transparent border-b border-border px-1 py-2 resize-none focus:outline-none focus:border-primary transition text-sm"></textarea>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
                  <button type="submit" className="sm:flex-1 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-primary/90 rounded-sm transition-colors">Request Viewing</button>
                  <button type="button" onClick={closeModal} className="px-6 py-3 text-xs tracking-widest uppercase border border-border hover:bg-muted/50 rounded-sm transition-colors">Cancel</button>
                </div>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

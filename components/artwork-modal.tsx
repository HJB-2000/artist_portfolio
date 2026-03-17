"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useArtworkModal } from "./artwork-modal-context"

export function ArtworkModal() {
  const { selectedArtwork, closeModal } = useArtworkModal()

  return (
    <Dialog open={!!selectedArtwork} onOpenChange={closeModal}>
      <DialogContent className="max-w-5xl w-full p-0 bg-card rounded-lg border-primary/20 shadow-2xl">
        {selectedArtwork && (
          <div className="flex flex-col md:flex-row max-h-[90vh]">
            {/* Image Section */}
            <div className="md:w-1/2 flex-shrink-0 bg-black/5 flex items-center justify-center p-6">
              <div className="relative w-full aspect-square">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Form & Content Section */}
            <div className="md:w-1/2 flex flex-col p-8 md:p-10 lg:p-12 overflow-y-auto">
              <div className="flex-shrink-0">
                {/* Header */}
                <div className="mb-6">
                  <p className="text-primary text-xs tracking-widest uppercase mb-2">Request Private View</p>
                  <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">
                    {selectedArtwork.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {selectedArtwork.description}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
                  <div>
                    <p className="text-primary text-xs tracking-widest uppercase mb-1.5">Year</p>
                    <p className="text-foreground font-medium text-base">{selectedArtwork.year}</p>
                  </div>
                  <div>
                    <p className="text-primary text-xs tracking-widest uppercase mb-1.5">Size</p>
                    <p className="text-foreground font-medium text-base">{selectedArtwork.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-primary text-xs tracking-widest uppercase mb-1.5">Price</p>
                    <p className="text-foreground font-medium text-base">{selectedArtwork.price}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="flex-grow flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border px-2 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-border px-2 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      className="w-full bg-transparent border-b border-border px-2 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your interest..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 rounded-sm"
                  >
                    Request Viewing
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-8 py-4 text-xs tracking-widest uppercase border border-border text-muted-foreground hover:border-primary hover:text-foreground transition-all rounded-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

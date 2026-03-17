"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export const artworks = [
  {
    id: 1,
    title: "Celestial Whispers",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "120x180cm",
    price: "$12,500",
    image: "/images/artwork-1.jpg",
    description: "A striking exploration of cosmic energy and earthly connection, this piece captures the eternal dance between light and shadow."
  },
  {
    id: 2,
    title: "Terra Nova",
    year: "2024",
    medium: "Mixed Media",
    dimensions: "90x120cm",
    price: "$8,900",
    image: "/images/artwork-2.jpg",
    description: "Organic forms emerge from a symphony of earth tones, celebrating the raw beauty found in nature's simplest elements."
  },
  {
    id: 3,
    title: "Eternal Form",
    year: "2023",
    medium: "Bronze Sculpture",
    dimensions: "60x45x30cm",
    price: "$15,000",
    image: "/images/artwork-3.jpg",
    description: "A sculptural meditation on permanence and change, this bronze piece speaks to the human desire for transcendence."
  },
  {
    id: 4,
    title: "Crimson Dreams",
    year: "2024",
    medium: "Acrylic & Gold Leaf",
    dimensions: "150x180cm",
    price: "$18,500",
    image: "/images/artwork-4.jpg",
    description: "Bold strokes of passion meet refined elegance in this commanding statement piece, designed for spaces that demand attention."
  },
  {
    id: 5,
    title: "Silent Mountains",
    year: "2023",
    medium: "Oil on Linen",
    dimensions: "100x125cm",
    price: "$9,800",
    image: "/images/artwork-5.jpg",
    description: "A contemplative landscape that invites viewers to find stillness, capturing the ethereal quality of dawn mist in the highlands."
  },
  {
    id: 6,
    title: "Geometric Soul",
    year: "2024",
    medium: "Copper & Canvas",
    dimensions: "75x100cm",
    price: "$7,200",
    image: "/images/artwork-6.jpg",
    description: "The intersection of mathematics and emotion, this architectural piece explores the beauty found in precise angles and warm metallics."
  }
]

export type Artwork = typeof artworks[0]

interface ArtworkModalContextType {
  selectedArtwork: Artwork | null
  openModal: (artwork: Artwork) => void
  closeModal: () => void
}

const ArtworkModalContext = createContext<ArtworkModalContextType | undefined>(undefined)

export function ArtworkModalProvider({ children }: { children: ReactNode }) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  const openModal = (artwork: Artwork) => setSelectedArtwork(artwork)
  const closeModal = () => setSelectedArtwork(null)

  return (
    <ArtworkModalContext.Provider value={{ selectedArtwork, openModal, closeModal }}>
      {children}
    </ArtworkModalContext.Provider>
  )
}

export function useArtworkModal() {
  const context = useContext(ArtworkModalContext)
  if (context === undefined) {
    throw new Error('useArtworkModal must be used within an ArtworkModalProvider')
  }
  return context
}

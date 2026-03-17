"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "The piece we acquired has become the emotional centerpiece of our home. Every day it reveals something new, something we hadn't noticed before. It's truly extraordinary.",
    author: "Victoria Chen",
    role: "Private Collector, New York"
  },
  {
    quote: "Working with this artist was a revelation. The commissioned piece exceeded every expectation, perfectly capturing the essence of what we envisioned for our gallery.",
    author: "Marcus Rothwell",
    role: "Gallery Director, London"
  },
  {
    quote: "There's a rare authenticity in this work that speaks directly to the soul. The investment in this collection has been one of my most rewarding decisions.",
    author: "Sofia Andersson",
    role: "Art Consultant, Stockholm"
  }
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Recognition
        </p>
        
        <Quote className="w-12 h-12 text-accent mx-auto mb-8" />
        
        <div className="relative min-h-[200px]">
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed">
            {`"${testimonials[current].quote}"`}
          </blockquote>
        </div>

        <div className="mt-10">
          <p className="font-serif text-lg text-foreground">{testimonials[current].author}</p>
          <p className="text-sm text-muted-foreground mt-1">{testimonials[current].role}</p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="p-2 border border-border hover:border-foreground transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-foreground" : "bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 border border-border hover:border-foreground transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}

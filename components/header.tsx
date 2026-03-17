"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide text-foreground">
            Atelier
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="#collection" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              Collection
            </Link>
            <Link href="#about" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link 
              href="#inquire" 
              className="ml-4 border border-foreground px-6 py-2 text-sm tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-all"
            >
              Inquire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-8 pt-4 border-t border-border">
            <div className="flex flex-col gap-6">
              <Link 
                href="#collection" 
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Collection
              </Link>
              <Link 
                href="#about" 
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="#inquire" 
                onClick={() => setIsOpen(false)}
                className="inline-block w-fit border border-foreground px-6 py-2 text-sm tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Inquire
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

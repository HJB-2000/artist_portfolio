import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="font-serif text-6xl lg:text-8xl tracking-tight text-foreground/10">
            Atelier
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
            <Link href="#collection" className="text-muted-foreground hover:text-foreground transition-colors">
              Collection
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

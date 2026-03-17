import Image from "next/image"

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 px-6 bg-card overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-background to-transparent z-[6]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-background to-transparent z-[6]" />

      <div aria-hidden className="about-cosmic-halo" />
      <div aria-hidden className="about-stardust" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative about-portrait-wrap">
            <div className="relative aspect-[4/5] overflow-hidden about-portrait-shell">
              <Image
                src="/images/artist-portrait.jpg"
                alt="Artist in studio"
                fill
                className="object-cover about-portrait-image"
              />
              <div aria-hidden className="about-portrait-sheen" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-accent hidden lg:block about-orbit-frame" />
          </div>

          {/* Content */}
          <div className="lg:pl-8 about-copy-wrap">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Artist
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 about-heading-glow">
              Crafting Stories Through Color & Form
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                For over two decades, I have devoted myself to exploring the boundaries between 
                abstraction and emotion. Each piece in this collection represents a chapter 
                of a larger narrative—one that speaks to the human experience of beauty, 
                loss, hope, and transformation.
              </p>
              <p>
                Working primarily with oils, acrylics, and mixed media, I seek to create works 
                that transcend their physical form. My process is both meditative and explosive, 
                allowing intuition to guide each brushstroke while remaining grounded in 
                classical technique.
              </p>
              <p>
                These pieces are not merely decorations—they are invitations to pause, reflect, 
                and connect with something greater than ourselves.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-border/70 about-stats-grid">
              <div className="grid grid-cols-3 gap-8">
                <div className="about-stat-card">
                  <p className="font-serif text-3xl text-foreground">20+</p>
                  <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
                </div>
                <div className="about-stat-card">
                  <p className="font-serif text-3xl text-foreground">150+</p>
                  <p className="text-sm text-muted-foreground mt-1">Works Created</p>
                </div>
                <div className="about-stat-card">
                  <p className="font-serif text-3xl text-foreground">40+</p>
                  <p className="text-sm text-muted-foreground mt-1">Exhibitions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ArtworkModalProvider } from "@/components/artwork-modal-context"
import { ArtworkModal } from "@/components/artwork-modal"

export default function Home() {
  return (
    <ArtworkModalProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
        <ArtworkModal />
      </main>
    </ArtworkModalProvider>
  )
}

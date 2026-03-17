"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" })
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 px-6 bg-card overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-background to-transparent z-[2]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-background to-transparent z-[2]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Contact
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6">
              Ask us anything.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
              Whether you&apos;re a collector seeking a statement piece, an interior designer 
              curating a space, or simply curious about the work—I&apos;d love to connect.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm tracking-widest uppercase text-muted-foreground mb-2">Email</p>
                <a href="mailto:hello@atelier.art" className="text-foreground hover:text-accent transition-colors">
                  hello@atelier.art
                </a>
              </div>
              <div>
                <p className="text-sm tracking-widest uppercase text-muted-foreground mb-2">Studio</p>
                <p className="text-foreground">
                  123 Gallery District<br />
                  New York, NY 10012
                </p>
              </div>
              <div>
                <p className="text-sm tracking-widest uppercase text-muted-foreground mb-2">Follow</p>
                <div className="flex gap-4">
                  <a href="#" className="text-foreground hover:text-accent transition-colors">Instagram</a>
                  <a href="#" className="text-foreground hover:text-accent transition-colors">Pinterest</a>
                  <a href="#" className="text-foreground hover:text-accent transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="inquire">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Ready to start a conversation? Let&apos;s begin.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="purchase">Artwork Inquiry</option>
                  <option value="commission">Commission Request</option>
                  <option value="exhibition">Exhibition Opportunity</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-3 border border-foreground bg-foreground text-background px-8 py-4 text-sm tracking-widest uppercase hover:bg-transparent hover:text-foreground transition-all"
              >
                {submitted ? "Message Sent" : "Submit"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

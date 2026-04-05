"use client"

import { FadeIn, TextReveal, Magnetic, LineReveal } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
  
]

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div>
            <FadeIn>
              <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
                Contact
              </p>
            </FadeIn>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
              <TextReveal delay={0.1}>
                {`Let's work`}
              </TextReveal>
              <br />
              <span className="text-accent">
                <TextReveal delay={0.3}>
                  together
                </TextReveal>
              </span>
            </h2>

            <FadeIn delay={0.5}>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-12">
                {`Have a project in mind or just want to chat? I'm always open to discussing new opportunities, interesting projects, or partnerships.`}
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Magnetic>
                <a
                  href="mailto:hello@helenmoncayo.com"
                  className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-serif hover:text-accent transition-colors"
                  data-cursor-hover
                >
                  <span className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                    <Mail className="w-5 h-5" />
                  </span>
                  helenmoncayo@gmail.com
                </a>
              </Magnetic>
            </FadeIn>
          </div>

          {/* Right column */}
          <div className="lg:pt-20">
            <FadeIn delay={0.4}>
              <p className="text-sm text-muted-foreground mb-6">Find me on</p>
            </FadeIn>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <FadeIn key={link.name} delay={0.5 + index * 0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 hover:pl-4 transition-all"
                    data-cursor-hover
                  >
                    <div className="flex items-center gap-4">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-lg group-hover:text-accent transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                  <LineReveal delay={0.6 + index * 0.1} />
                </FadeIn>
              ))}
            </div>

            {/* Availability */}
            <FadeIn delay={0.9} className="mt-12">
              <div className="p-6 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and opportunities. Response time is typically within 24 hours.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

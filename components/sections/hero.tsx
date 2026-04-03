"use client"

import { motion } from "framer-motion"
import { FadeIn, MagneticText, Magnetic } from "@/components/animations"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Small intro text */}
        <FadeIn delay={0.2}>
          <p className="text-muted-foreground text-sm md:text-base tracking-[0.2em] uppercase mb-8 md:mb-12">
            Software Engineer & Creative Developer
          </p>
        </FadeIn>

        {/* Giant Name - Jasmine style */}
        <div className="mb-12 md:mb-16">
          <FadeIn delay={0.3}>
            <h1 className="text-display font-serif font-normal leading-[0.85] tracking-tight">
              <MagneticText className="block" strength={0.15}>
                Helen
              </MagneticText>
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h1 className="text-display font-serif font-normal leading-[0.85] tracking-tight text-accent">
              <MagneticText className="block" strength={0.15}>
                Moncayo
              </MagneticText>
            </h1>
          </FadeIn>
        </div>

        {/* Tagline */}
        <FadeIn delay={0.8} className="max-w-2xl mb-16">
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
            Building digital experiences that merge creativity, technology, and human-centered design.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={1} className="flex flex-wrap items-center gap-6">
          <Magnetic strength={6}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium transition-all hover:bg-accent"
              data-cursor-hover
            >
              View Work
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </a>
          </Magnetic>
          
          <Magnetic strength={6}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              data-cursor-hover
            >
              Get in touch
            </a>
          </Magnetic>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}

"use client"

import { FadeIn, Magnetic } from "@/components/animations"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <span className="text-lg font-serif">
                Helen Moncayo<span className="text-accent">.</span>
              </span>
              <span className="text-sm text-muted-foreground">
                Designed & Built with care
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-8">
              <span className="text-sm text-muted-foreground">
                {new Date().getFullYear()} All rights reserved
              </span>
              
              <Magnetic>
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-cursor-hover
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

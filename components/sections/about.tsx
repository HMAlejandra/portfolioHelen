"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  FadeIn, 
  StoryTextReveal, 
  MagneticText, 
  AnimatedKeyword,
  LineReveal 
} from "@/components/animations"

const specialWords = {
  "dancing": "bounce" as const,
  "coffee": "glow" as const,
  "code": "typewriter" as const,
}

export function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative">
      {/* Section label */}
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="text-sm text-muted-foreground tracking-[0.3em] uppercase">About</span>
            <LineReveal className="flex-1 max-w-32" />
          </div>
        </FadeIn>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column - Large title */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1] mb-8">
                <MagneticText strength={0.15}>Hello,</MagneticText>
                <br />
                <span className="text-accent">
                  <MagneticText strength={0.15}>{`I'm Helen`}</MagneticText>
                </span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="text-muted-foreground text-sm tracking-widest uppercase">
                Based in Colombia
              </p>
            </FadeIn>
          </div>

          {/* Right column - Story content */}
          <div className="lg:col-span-7 space-y-10">
            {/* Main intro paragraph with storytelling animation */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-normal leading-[1.3] text-foreground">
                  <StoryTextReveal delay={0.5}>
                    I design and build digital experiences that merge design, technology, and intelligent systems.
                  </StoryTextReveal>
                </p>
              </motion.div>
            </div>

            {/* Second paragraph */}
            <FadeIn delay={0.8}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <StoryTextReveal delay={1}>
                  {`I'm a software engineer passionate about web design and AI-driven solutions, focused on creating interactive and visually refined experiences that combine creativity with technical precision.`}
                </StoryTextReveal>
              </p>
            </FadeIn>

            {/* Third paragraph with special word animations */}
            <FadeIn delay={1.2}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <StoryTextReveal delay={1.4} specialWords={specialWords}>
                  {`Beyond code, I enjoy dancing, exploring new coffee spots, and sometimes turning coffee into code. I like to bring that same energy and creativity into everything I build.`}
                </StoryTextReveal>
              </p>
            </FadeIn>

            {/* Focus areas */}
            <div className="pt-8">
              <FadeIn delay={1.6}>
                <p className="text-sm text-muted-foreground tracking-widest uppercase mb-6">Focus Areas</p>
              </FadeIn>
              
              <div className="flex flex-wrap gap-3">
                {[
                  "Intelligent Systems",
                  "Creative Development", 
                  "Purposeful Design",
                  "Interactive Experiences",
                  "AI-Driven Solutions"
                ].map((keyword, i) => (
                  <AnimatedKeyword
                    key={keyword}
                    delay={1.8 + i * 0.1}
                    className="px-5 py-2.5 border border-border rounded-full text-sm tracking-wide text-muted-foreground hover:text-foreground hover:border-accent hover:bg-accent/5 transition-all"
                  >
                    {keyword}
                  </AnimatedKeyword>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <FadeIn delay={2.2} className="mt-24 md:mt-32">
          <LineReveal delay={0.2} />
        </FadeIn>
      </div>
    </section>
  )
}

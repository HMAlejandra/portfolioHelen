"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
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
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: '#f5f3ef' }} 
    >
      {/* --- LÍNEAS DE CIRCUITO (PCB) --- */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none">
        <path d="M0 100h200v300h100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="300" cy="400" r="3" fill="#ff4d00" />
        <path d="M1000 800h-200v-200h-100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="700" cy="600" r="3" fill="#ff4d00" />
      </svg>

      {/* --- ACENTOS DE CÓDIGO --- */}
      <div className="absolute top-20 left-[10%] font-mono text-[#ff4d00] opacity-10 text-xs select-none">{"<html>"}</div>
      <div className="absolute bottom-40 right-[5%] font-mono text-[#ff4d00] opacity-10 text-xl select-none">{"{ }"}</div>
      <div className="absolute top-1/2 right-[15%] font-mono text-[#ff4d00] opacity-[0.05] text-4xl select-none">0101</div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d00]"></span>
            </span>
            <span className="text-sm tracking-[0.3em] uppercase font-black text-[#111111]/40">System.About_Profile</span>
            <div className="h-[1px] flex-1 max-w-32 bg-[#ff4d00]/20" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.2}>
              <div className="relative group">
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#ff4d00] z-20" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#ff4d00] z-20" />
                
                <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl bg-black">
                  <div className="w-full h-full transition-all duration-700 hover:scale-105" 
                       style={{ filter: 'sepia(0.5) saturate(1.4) hue-rotate(-10deg) contrast(1.1)' }}>
                    <Image
                      src="/retrato.png" // RUTA CORREGIDA A .PNG
                      alt="Helen Moncayo Portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff4d00]/20 to-transparent opacity-40 pointer-events-none" />
                </div>
              </div>
            </FadeIn>
            
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-pulse" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60">Location: Pasto, Colombia</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60">Status: Engineering Student @ UCC</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.3}>
              <h2 className="text-5xl md:text-7xl font-serif font-normal leading-[0.9] mb-12 text-[#111111]">
                Hello, <br />
                <span className="text-[#ff4d00]">I&apos;m Helen</span>
              </h2>
            </FadeIn>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="border-l-4 border-[#ff4d00] pl-6 md:pl-10 py-4 bg-[#ff4d00]/[0.03]"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.2] text-[#111111]">
                  <StoryTextReveal delay={0.6}>
                    I design and build digital experiences that merge design, technology, and intelligent systems.
                  </StoryTextReveal>
                </p>
              </motion.div>

              <FadeIn delay={0.9} className="border-l-2 border-[#ff4d00]/20 pl-6 md:pl-10">
                <p className="text-lg md:text-xl text-[#111111]/70 leading-relaxed italic">
                  {`I'm a software engineer passionate about web design and AI-driven solutions, focused on creating interactive and visually refined experiences.`}
                </p>
              </FadeIn>

              <div className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[#ff4d00] text-xs">{"01."}</span>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#ff4d00]">Technical_Stack</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"
                  ].map((keyword, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-[#111111] text-white text-[10px] font-mono tracking-tighter rounded-sm hover:bg-[#ff4d00] transition-colors cursor-default"
                    >
                      {`const ${keyword.replace('CSS', '')} = true;`}
                    </span>
                  ))}
                </div>
              </div>

              <FadeIn delay={1.2} className="pt-10">
                <motion.a
                  href="/CV_Helen_Moncayo.pdf"
                  target="_blank"
                  className="group flex items-center gap-6"
                  whileHover={{ x: 10 }}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-[#ff4d00] flex items-center justify-center group-hover:bg-[#ff4d00] transition-all duration-500">
                      <span className="text-[#ff4d00] group-hover:text-white text-xl transition-all">↓</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-[#ff4d00]/30 scale-125 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#ff4d00] mb-1">Execute: download_cv.exe</span>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-[#111111] border-b-2 border-[#ff4d00]/0 group-hover:border-[#ff4d00] transition-all">
                      Download-Resume
                    </span>
                  </div>
                </motion.a>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
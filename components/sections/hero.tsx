"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// Letter animation component for staggered
function AnimatedLetter({ 
  letter, 
  index, 
  totalLetters 
}: { 
  letter: string
  index: number
  totalLetters: number 
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: 120, opacity: 0, rotateX: -80 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5 + index * 0.05,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{ 
        transformOrigin: "bottom",
        display: letter === " " ? "inline" : "inline-block",
        minWidth: letter === " " ? "0.3em" : undefined
      }}
    >
      {letter}
    </motion.span>
  )
}

export function Hero() {
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 200 }
  const videoX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const videoY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isClient, mouseX, mouseY])

  const name = "HELEN MONCAYO"
  const letters = name.split("")

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#ff4d00]"
    >
      {/* Video with grayscale and multiply blend - creates red/black tint effect */}
      {isClient && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{
            x: videoX,
            y: videoY,
          }}
        >
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale mix-blend-multiply"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <source src="/perfil-cyborg.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      )}

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[95vw] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Small intro text */}
          <motion.p 
            className="text-white/80 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 md:mb-10 font-sans font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Software Engineer & Creative Developer
          </motion.p>

          {/* Giant Name - Single Line with Letter Animation */}
          <div className="overflow-hidden mb-6 md:mb-10">
            <h1 
              className="font-serif font-extrabold leading-none tracking-tighter text-white whitespace-nowrap"
              style={{ 
                fontSize: "clamp(2.5rem, 12vw, 11rem)",
                perspective: "1000px"
              }}
            >
              {letters.map((letter, index) => (
                <AnimatedLetter
                  key={index}
                  letter={letter}
                  index={index}
                  totalLetters={letters.length}
                />
              ))}
            </h1>
          </div>

          {/* Tagline */}
          <motion.p 
            className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed font-sans font-light max-w-xl mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Building digital experiences that merge creativity, technology, and human-centered design.
          </motion.p>

          {/* CTA Button - Pill shaped */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <motion.a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#ff4d00] rounded-full text-sm font-semibold transition-all hover:bg-black hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              View My Work
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </motion.a>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors font-medium border-b border-white/40 hover:border-white pb-1"
              whileHover={{ scale: 1.02 }}
              data-cursor-hover
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/50 tracking-widest uppercase font-sans">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}

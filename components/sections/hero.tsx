"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: 120, opacity: 0, rotateX: -100 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5 + index * 0.05,
        ease: [0.215, 0.61, 0.355, 2],
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#ff4d00]" // LIENZO NARANJA RECUPERADO
    >
      {/* VIDEO CON MEZCLA NARANJA (Multiply) */}
      {isClient && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ x: videoX, y: videoY }}
        >
          <motion.video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.2 }}
          >
            <source src="/perfil-cyborg.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      )}

      {/* OVERLAY PARA LEGIBILIDAD */}
      <div className="absolute inset-0 bg-black/10 z-[1] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[95vw] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          
          <motion.p 
            className="text-white/90 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8 font-sans font-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Software Engineer & Creative Developer
          </motion.p>

          {/* NOMBRE EN UNA SOLA LÍNEA SIN CORTES */}
          <div className="mb-8 md:mb-12 overflow-visible"> 
            <h1 
              className="font-serif font-extrabold leading-none tracking-tighter text-white whitespace-nowrap"
              style={{ 
                fontSize: "clamp(2rem, 11vw, 11rem)", 
                perspective: "1000px"
              }}
            >
              {letters.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} index={index} />
              ))}
            </h1>
          </div>

          {/* TAGLINE CON SOMBRA PARA QUE SE LEA SOBRE EL CABELLO */}
          <motion.p 
            className="text-white text-sm md:text-lg leading-relaxed font-sans font-medium max-w-2xl mb-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Building digital experiences that merge creativity, technology, and human-centered design.
          </motion.p>

          {/* BOTONES RESTAURADOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <motion.a
              href="#projects"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#ff4d00] rounded-full text-sm font-bold transition-all hover:bg-black hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            {/* GET IN TOUCH RECUPERADO */}
            <motion.a
              href="#contact"
              className="text-sm text-white font-bold border-b-2 border-white/30 hover:border-white transition-all pb-1 uppercase tracking-widest"
              whileHover={{ y: -2 }}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
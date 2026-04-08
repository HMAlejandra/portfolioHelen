"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// Componente de letra animada
function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: 120, opacity: 0, rotateX: -80 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.5 + index * 0.5,
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

  const name = ""
  const letters = name.split("")

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#111]" // Fondo base oscuro
    >
      {/* Video de fondo */}
      {isClient && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ x: videoX, y: videoY }}
        >
          <motion.video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover grayscale opacity-60" // Ajustada opacidad para legibilidad
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <source src="/perfil-cyborg.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      )}

      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none z-[1]" />

      {/* Contenido Principal */}
      <div className="relative z-10 w-full max-w-[95vw] mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          
          <motion.p 
            className="text-white/90 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 font-sans font-bold drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Software Engineer & Creative Developer
          </motion.p>

          {/* Nombre con corrección de Overflow */}
          <div className="mb-6 md:mb-10 px-4"> 
            <h1 
              className="font-serif font-extrabold leading-[0.8] tracking-tighter text-white uppercase"
              style={{ 
                fontSize: "clamp(2.5rem, 15vw, 12rem)", // Aumentado el responsive
                perspective: "1000px"
              }}
            >
              {/* Contenedor flexible para evitar corte lateral */}
              <div className="flex flex-wrap justify-center gap-x-[0.1em]">
                {letters.map((letter, index) => (
                  <AnimatedLetter key={index} letter={letter} index={index} />
                ))}
              </div>
            </h1>
          </div>

          {/* Tagline con Drop Shadow (Solución a invisibilidad) */}
          <motion.p 
            className="text-white text-sm md:text-lg leading-relaxed font-sans font-medium max-w-2xl mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Building digital experiences that merge creativity, technology, and human-centered design.
          </motion.p>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <motion.a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#ff4d00] text-white rounded-full text-sm font-bold transition-all hover:bg-white hover:text-[#ff4d00] shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
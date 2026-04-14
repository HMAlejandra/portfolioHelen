"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useLang } from "@/components/providers"

function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
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
        minWidth: letter === " " ? "0.3em" : undefined,
      }}
    >
      {letter}
    </motion.span>
  )
}

export function Hero() {
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 200 }
  const videoX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const videoY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => { setIsClient(true) }, [])

  useEffect(() => {
    if (!isClient) return
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
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
      {isClient && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ x: videoX, y: videoY }}
        >
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <source src="/perfil-cyborg.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-black/5 pointer-events-none z-[1]" />

      <div className="relative z-10 w-full max-w-[95vw] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">

          <motion.p
            className="text-white/90 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8 font-sans font-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("hero.role")}
          </motion.p>

          <div className="overflow-visible mb-8 md:mb-12">
            <h1
              className="font-serif font-extrabold leading-none tracking-tighter text-white whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 11vw, 11rem)", perspective: "1000px" }}
            >
              {letters.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} index={index} />
              ))}
            </h1>
          </div>

          <motion.p
            className="text-white text-sm md:text-lg leading-relaxed font-sans font-medium max-w-2xl mb-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10"
          >
            <motion.a
              href="#projects"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#ff4d00] text-white rounded-full text-sm font-bold transition-all hover:bg-black hover:text-white border-2 border-white/20 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("hero.cta.work")}
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </motion.a>

            <motion.a
              href="#contact"
              className="text-sm text-white font-bold border-b-2 border-white/30 hover:border-white transition-all pb-1 uppercase tracking-widest"
              whileHover={{ y: -2 }}
            >
              {t("hero.cta.contact")}
            </motion.a>
          </motion.div>
        </div>
      </div>

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
          <span className="text-[10px] text-white/50 tracking-widest uppercase font-sans">
            {t("hero.scroll")}
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
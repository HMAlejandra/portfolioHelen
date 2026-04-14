"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { FadeIn, StoryTextReveal } from "@/components/animations"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"

// Contador animado
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="font-serif font-black text-[#ff4d00]">
      {count}{suffix}
    </span>
  )
}

// Stat card animada
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="flex flex-col items-center justify-center p-5 rounded-sm border border-[#ff4d00]/20 bg-[#ff4d00]/[0.03] hover:bg-[#ff4d00]/[0.07] hover:border-[#ff4d00]/40 transition-all duration-500 group"
    >
      <div className="text-3xl md:text-4xl font-black mb-1 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#111111]/50 dark:text-white/50 text-center leading-tight">
        {label}
      </p>
    </motion.div>
  )
}

// Skill bar animada
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono font-bold text-[#111111]/70 dark:text-white/70 uppercase tracking-wider">{name}</span>
        <span className="text-[10px] font-mono text-[#ff4d00]">{level}%</span>
      </div>
      <div className="h-[3px] bg-[#111111]/10 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ff4d00] to-[#ff7a40] rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  )
}

export function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { t } = useLang()

  // Parallax en la foto
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { damping: 30, stiffness: 200 })
  const imgY = useSpring(useTransform(mouseY, [-300, 300], [-8, 8]), { damping: 30, stiffness: 200 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  const skills = [
    { name: "Next.js / React", level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Node.js / APIs", level: 78 },
    { name: "Python / AI", level: 70 },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-[#f5f3ef] dark:bg-[#111111]"
    >
      {/* Fondo animado con partículas */}
      <AnimatedBackground />

      {/* PCB lines decorativas */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-[1]">
        <path d="M0 100h200v300h100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="300" cy="400" r="3" fill="#ff4d00" />
        <path d="M1000 800h-200v-200h-100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="700" cy="600" r="3" fill="#ff4d00" />
      </svg>

      <div className="absolute top-20 left-[10%] font-mono text-[#ff4d00] opacity-10 text-xs select-none z-[1]">{"<html>"}</div>
      <div className="absolute bottom-40 right-[5%] font-mono text-[#ff4d00] opacity-10 text-xl select-none z-[1]">{"{ }"}</div>
      <div className="absolute top-1/2 right-[15%] font-mono text-[#ff4d00] opacity-[0.04] text-4xl select-none z-[1]">0101</div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header label */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d00]"></span>
            </span>
            <span className="text-sm tracking-[0.3em] uppercase font-black text-[#111111]/40 dark:text-white/40">{t("about.label")}</span>
            <div className="h-[1px] flex-1 max-w-32 bg-[#ff4d00]/20" />
          </div>
        </FadeIn>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Columna izquierda — Foto + Stats */}
          <div className="lg:col-span-5 relative space-y-8">
            <FadeIn delay={0.2}>
              <div className="relative group">
                {/* Esquinas decorativas */}
                <motion.div
                  className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#ff4d00] z-20"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#ff4d00] z-20"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glow animado detrás de la foto */}
                <motion.div
                  className="absolute inset-0 rounded-sm z-[1]"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(255,77,0,0)",
                      "0 0 40px rgba(255,77,0,0.15)",
                      "0 0 0px rgba(255,77,0,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="relative z-10 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl bg-black"
                  style={{ x: imgX, y: imgY }}
                >
                  <div
                    className="w-full h-full transition-all duration-700 group-hover:scale-105"
                    style={{ filter: "sepia(0.5) saturate(1.4) hue-rotate(-10deg) contrast(1.1)" }}
                  >
                    <Image src="/retrato.png" alt="Helen Moncayo Portrait" fill className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff4d00]/20 to-transparent opacity-40 pointer-events-none" />

                  {/* Badge flotante animado */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-sm px-4 py-3 border border-[#ff4d00]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] font-mono text-white/80 tracking-widest uppercase">Available for hire</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </FadeIn>

            {/* Info de ubicación */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-pulse" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 dark:text-white/60">{t("about.location")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 dark:text-white/60">{t("about.status")}</p>
              </div>
            </div>

            {/* Stats animados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3"
            >
              <StatCard value={3} suffix="+" label="Years coding" delay={0.5} />
              <StatCard value={10} suffix="+" label="Projects built" delay={0.6} />
              <StatCard value={5} suffix="+" label="Technologies" delay={0.7} />
            </motion.div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3 pt-2"
            >
              <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-4">Skill_Level</p>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.6 + i * 0.1} />
              ))}
            </motion.div>
          </div>

          {/* Columna derecha — Texto */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.3}>
              <h2 className="text-5xl md:text-7xl font-serif font-normal leading-[0.9] mb-12 text-[#111111] dark:text-white">
                {t("about.hello")} <br />
                <motion.span
                  className="text-[#ff4d00] inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {t("about.name")}
                </motion.span>
              </h2>
            </FadeIn>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="border-l-4 border-[#ff4d00] pl-6 md:pl-10 py-4 bg-[#ff4d00]/[0.03] hover:bg-[#ff4d00]/[0.06] transition-colors duration-500"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.2] text-[#111111] dark:text-white">
                  <StoryTextReveal delay={0.6}>
                    {t("about.headline")}
                  </StoryTextReveal>
                </p>
              </motion.div>

              <FadeIn delay={0.9} className="border-l-2 border-[#ff4d00]/20 pl-6 md:pl-10">
                <p className="text-lg md:text-xl text-[#111111]/70 dark:text-white/70 leading-relaxed italic">
                  {t("about.bio")}
                </p>
              </FadeIn>

              {/* Stack con animación stagger */}
              <div className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[#ff4d00] text-xs">{"01."}</span>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#ff4d00]">{t("about.stack")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"].map((keyword, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.05, backgroundColor: "#ff4d00", color: "#fff" }}
                      className="px-4 py-2 bg-[#111111] dark:bg-white/10 text-white text-[10px] font-mono tracking-tighter rounded-sm cursor-default transition-colors duration-300"
                    >
                      {`const ${keyword.replace("CSS", "")} = true;`}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Passions — íconos animados */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4 grid grid-cols-3 gap-4"
              >
                {[
                  { emoji: "🎮", label_en: "Game Dev", label_es: "Juegos" },
                  { emoji: "🤖", label_en: "AI / ML", label_es: "IA / ML" },
                  { emoji: "🎨", label_en: "UI Design", label_es: "Diseño UI" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-sm border border-[#ff4d00]/10 hover:border-[#ff4d00]/40 bg-[#ff4d00]/[0.02] hover:bg-[#ff4d00]/[0.06] transition-all duration-400 cursor-default"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[9px] font-mono font-black uppercase tracking-wider text-[#111111]/60 dark:text-white/60">{item.label_en}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CV download */}
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
                    <span className="text-[10px] font-mono text-[#ff4d00] mb-1">{t("about.cv.cmd")}</span>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-[#111111] dark:text-white border-b-2 border-[#ff4d00]/0 group-hover:border-[#ff4d00] transition-all">
                      {t("about.cv.btn")}
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
"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { FadeIn, TextReveal } from "@/components/animations"
import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"
import { TechIcon, techIcons } from "@/components/tech-icon"

// ─── Datos ────────────────────────────────────────────────────────────────────
const experiences = [
  {
    slug: "full-stack-developer",
    num: "01",
    period_en: "2024 — Present",
    period_es: "2024 — Presente",
    role_en: "Full Stack Developer",
    role_es: "Desarrolladora Full Stack",
    company: "Freelance & Personal Projects",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "AWS", "Node.js"],
  },
  {
    slug: "game-developer",
    num: "02",
    period_en: "2023 — 2024",
    period_es: "2023 — 2024",
    role_en: "Game Developer (Academic)",
    role_es: "Desarrolladora de Juegos",
    company: "UCC — Universidad Cooperativa",
    technologies: ["Unity", "C#", "Game Design", "AI Logic", "UX Research"],
  },
  {
    slug: "backend-engineer",
    num: "03",
    period_en: "2023",
    period_es: "2023",
    role_en: "Backend & Database Engineer",
    role_es: "Ingeniería Backend & BD",
    company: "Academic — E-commerce",
    technologies: ["Python", "Flask", "PostgreSQL", "MySQL", "Docker", "GitHub Actions"],
  },
  {
    slug: "engineering-student",
    num: "04",
    period_en: "2022 — 2023",
    period_es: "2022 — 2023",
    role_en: "Software Engineering Student",
    role_es: "Estudiante de Ing. de Software",
    company: "Universidad Cooperativa de Colombia",
    technologies: ["Java", "C++", "Python", "SQL", "UML", "Scrum"],
  },
]

// ─── Icono con bounce constante + tooltip ─────────────────────────────────────
function BouncingTechIcon({ name, index }: { name: string; index: number }) {
  const [showTip, setShowTip] = useState(false)
  const hasIcon = !!techIcons[name]

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {/* Bounce constante — cada icono con delay distinto para efecto cascada */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,  // cascada entre iconos
        }}
        whileHover={{ scale: 1.25 }}
        className="w-12 h-12 rounded-lg border-2 border-[#ff4d00]/40 dark:border-[#ff4d00]/60 bg-white dark:bg-[#1a1a1a] shadow-lg shadow-[#ff4d00]/10 flex items-center justify-center cursor-default transition-all duration-200 hover:border-[#ff4d00] hover:shadow-[#ff4d00]/30"
      >
        {hasIcon
          ? <TechIcon name={name} size={26} />
          : (
            <span className="text-[9px] font-mono font-black text-[#ff4d00] text-center leading-tight px-1">
              {name.slice(0, 4).toUpperCase()}
            </span>
          )
        }
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{   opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#111] dark:bg-[#ff4d00] text-white text-[8px] font-mono font-black tracking-widest uppercase px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-xl">
              {name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#111] dark:border-t-[#ff4d00]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Fila de experiencia ──────────────────────────────────────────────────────
function ExperienceRow({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null!)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const role   = lang === "en" ? exp.role_en   : exp.role_es
  const period = lang === "en" ? exp.period_en  : exp.period_es

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Línea superior */}
      <motion.div
        className="h-px w-full"
        animate={{ backgroundColor: hovered ? "rgba(255,77,0,0.45)" : "rgba(17,17,17,0.1)" }}
        transition={{ duration: 0.25 }}
      />

      {/* Punto naranja en línea */}
      <motion.div
        className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[#ff4d00] -translate-y-1/2 z-20"
        animate={{ scale: hovered ? 2.5 : 1, opacity: hovered ? 1 : 0.25 }}
        transition={{ duration: 0.22 }}
      />

      <Link href={`/experience/${exp.slug}`} className="block">
        <div className="relative z-10 py-6 md:py-8 cursor-pointer select-none">

          {/* Fila principal: num + título + período + flecha */}
          <div className="flex items-center gap-3 md:gap-6 mb-0">

            {/* Número */}
            <motion.span
              animate={{ opacity: hovered ? 1 : 0.3, color: hovered ? "#ff4d00" : "inherit" }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-mono tracking-widest w-5 flex-shrink-0 hidden md:block text-[#111] dark:text-white"
            >
              {exp.num}
            </motion.span>

            {/* Título — más pequeño para que quepa en una línea */}
            <motion.h3
              animate={{ color: hovered ? "#ff4d00" : "inherit", x: hovered ? 4 : 0 }}
              transition={{ duration: 0.22 }}
              className="flex-1 min-w-0 font-serif text-[#111] dark:text-white leading-tight overflow-visible"
              style={{ fontSize: "clamp(1rem, 4vw, 2.4rem)", paddingBottom: "0.05em" }}
            >
              {role}
            </motion.h3>

            {/* Período — más grande y visible */}
            <div className="hidden lg:flex flex-col items-end gap-0.5 flex-shrink-0 min-w-[140px] text-right">
              <motion.span
                animate={{ color: hovered ? "#ff4d00" : "rgba(17,17,17,0.65)" }}
                transition={{ duration: 0.2 }}
                className="text-sm font-mono font-black tracking-wider dark:text-white/70"
              >
                {period}
              </motion.span>
              <span className="text-[10px] font-mono text-[#111]/45 dark:text-white/40 truncate max-w-[140px]">
                {exp.company}
              </span>
            </div>

            {/* Flecha */}
            <motion.div
              animate={{
                backgroundColor: hovered ? "#ff4d00" : "transparent",
                borderColor:     hovered ? "#ff4d00" : "rgba(17,17,17,0.15)",
              }}
              transition={{ duration: 0.22 }}
              className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 dark:border-white/20"
            >
              <ArrowUpRight
                className="w-4 h-4 transition-colors duration-200"
                style={{ color: hovered ? "#fff" : "rgba(17,17,17,0.4)" }}
              />
            </motion.div>
          </div>

          {/* Iconos bouncing — aparecen al hover con animación de entrada */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{   opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="flex items-end gap-3 pt-5 pb-2 pl-0 md:pl-11 flex-wrap">
                  {exp.technologies.map((tech, i) => (
                    <BouncingTechIcon key={tech} name={tech} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Línea inferior en el último */}
      {index === experiences.length - 1 && (
        <motion.div
          className="h-px w-full"
          animate={{ backgroundColor: hovered ? "rgba(255,77,0,0.45)" : "rgba(17,17,17,0.1)" }}
          transition={{ duration: 0.25 }}
        />
      )}
    </motion.div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function Experience() {
  const sectionRef = useRef(null)
  const { lang, t } = useLang()

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-background"
    >
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d00] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d00]" />
            </span>
            <span className="text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase font-black text-[#111111]/40 dark:text-white/40 truncate max-w-[180px] md:max-w-none">
              {lang === "en" ? "System.Experience_Log" : "Sistema.Registro_Experiencia"}
            </span>
            <div className="h-[1px] flex-1 max-w-32 bg-[#ff4d00]/20" />
          </div>
        </FadeIn>

        {/* Título grande */}
        <div className="mb-20 overflow-visible" style={{ paddingBottom: "0.25em" }}>
          <h2
            className="font-serif font-normal overflow-visible text-[#111111] dark:text-white"
            style={{ fontSize: "clamp(2rem, 7vw, 7rem)", lineHeight: "1.05", paddingBottom: "0.15em" }}
          >
            <TextReveal delay={0.1}>{t("exp.title")}</TextReveal>
          </h2>
          <h2
            className="font-serif font-normal overflow-visible text-[#ff4d00] italic"
            style={{ fontSize: "clamp(2rem, 7vw, 7rem)", lineHeight: "1.05", paddingBottom: "0.15em" }}
          >
            <TextReveal delay={0.2}>{t("exp.title2")}</TextReveal>
          </h2>
        </div>

        {/* Lista */}
        <div>
          {experiences.map((exp, index) => (
            <ExperienceRow key={exp.slug} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
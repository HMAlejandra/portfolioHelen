"use client"

import {
  motion, useScroll, useTransform, AnimatePresence,
  useInView, useMotionValue, useSpring
} from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn, Magnetic } from "@/components/animations"
import { ArrowUpRight, Github } from "lucide-react"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"
import { projects as projectsData } from "@/lib/projects-data"

// ─── Animación letra a letra ──────────────────────────────────────────────────
function AnimatedTitle({ text, hovered }: { text: string; hovered: boolean }) {
  return (
    <span className="inline-block leading-none" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y:     hovered ? [-8, 0] : 0,
            color: hovered ? "#ff4d00" : "inherit",
          }}
          transition={{
            y:     { duration: 0.4, delay: i * 0.02, ease: [0.215, 0.61, 0.355, 1] },
            color: { duration: 0.2 },
          }}
          style={{
            display:  char === " " ? "inline" : "inline-block",
            minWidth: char === " " ? "0.28em" : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Imagen que corre horizontalmente con el cursor ───────────────────────────
function TrackingImage({
  src,
  visible,
  containerRef,
}: {
  src: string
  visible: boolean
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const rawX  = useMotionValue(-999)
  const x     = useSpring(rawX, { stiffness: 350, damping: 30 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      // Centrar la imagen (ancho imagen = 256px → mitad = 128)
      rawX.set(e.clientX - rect.left - 128)
    }

    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [containerRef, rawX])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          /* z-0 = DETRÁS del texto que tiene z-10 */
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 w-56 h-36 md:w-64 md:h-40 overflow-hidden rounded-sm shadow-2xl border border-[#ff4d00]/30 z-0"
          style={{ x }}
          initial={{ opacity: 0, scaleY: 0.6, rotate: -2 }}
          animate={{ opacity: 1, scaleY: 1,   rotate: 1.5 }}
          exit={{   opacity: 0, scaleY: 0.6, rotate: -2 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image src={src} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#ff4d00]/8" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff4d00]/60" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Fila de proyecto ─────────────────────────────────────────────────────────
function ProjectRow({
  project,
  index,
}: {
  project: typeof projectsData[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLang()
  const rowRef = useRef<HTMLDivElement>(null!)
  const isInView = useInView(rowRef, { once: true, margin: "-60px" })

  const title = lang === "en" ? project.title_en : project.title_es
  const type  = lang === "en" ? project.type_en  : project.type_es

  return (
    <motion.div
      ref={rowRef}
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
        animate={{ backgroundColor: hovered ? "rgba(255,77,0,0.35)" : "rgba(17,17,17,0.1)" }}
        transition={{ duration: 0.25 }}
      />

      {/* Imagen corriendo — z-0, detrás del texto */}
      <TrackingImage src={project.image} visible={hovered} containerRef={rowRef} />

      {/* Punto naranja en línea */}
      <motion.div
        className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[#ff4d00] -translate-y-1/2 z-20"
        animate={{ scale: hovered ? 2.5 : 1, opacity: hovered ? 1 : 0.2 }}
        transition={{ duration: 0.22 }}
      />

      {/* Contenido — z-10, siempre encima */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative z-10 flex items-center gap-4 md:gap-8 py-7 md:py-9 cursor-pointer select-none">

          {/* Número */}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.35, color: hovered ? "#ff4d00" : "inherit" }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-mono tracking-widest w-6 flex-shrink-0 hidden md:block dark:text-white"
          >
            {project.num}
          </motion.span>

          {/* Título animado letra a letra */}
          <div className="text-3xl md:text-5xl lg:text-6xl font-serif flex-1 min-w-0 text-[#111] dark:text-white">
            <AnimatedTitle text={title} hovered={hovered} />
          </div>

          {/* Tags — solo desktop */}
          <div className="hidden lg:flex flex-wrap gap-1.5 flex-shrink-0 max-w-[200px]">
            {project.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                animate={{
                  borderColor: hovered ? "rgba(255,77,0,0.5)" : "rgba(17,17,17,0.1)",
                  color:       hovered ? "#ff4d00" : "rgba(17,17,17,0.45)",
                }}
                transition={{ duration: 0.2 }}
                className="px-2 py-0.5 text-[9px] font-mono rounded-full border dark:border-white/10 dark:text-white/45"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Tipo + año */}
          <div className="hidden md:flex flex-col items-end gap-0.5 flex-shrink-0 min-w-[110px] text-right">
            <motion.span
              animate={{ color: hovered ? "#ff4d00" : "rgba(17,17,17,0.4)" }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-mono font-black tracking-widest uppercase dark:text-white/40"
            >
              {type}
            </motion.span>
            <span className="text-[9px] font-mono text-[#111]/25 dark:text-white/25">{project.year}</span>
          </div>

          {/* Flecha */}
          <motion.div
            animate={{
              backgroundColor: hovered ? "#ff4d00" : "transparent",
              borderColor:     hovered ? "#ff4d00" : "rgba(17,17,17,0.12)",
            }}
            transition={{ duration: 0.22 }}
            className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 dark:border-white/12"
          >
            <ArrowUpRight
              className="w-4 h-4 transition-colors duration-200"
              style={{ color: hovered ? "#fff" : "rgba(17,17,17,0.35)" }}
            />
          </motion.div>
        </div>
      </Link>

      {/* Línea inferior en el último */}
      {index === projectsData.length - 1 && (
        <motion.div
          className="h-px w-full"
          animate={{ backgroundColor: hovered ? "rgba(255,77,0,0.35)" : "rgba(17,17,17,0.1)" }}
          transition={{ duration: 0.25 }}
        />
      )}
    </motion.div>
  )
}

// ─── Curtain reveal ───────────────────────────────────────────────────────────
function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[#ff7a40] origin-bottom z-[9] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.0 }}
      />
      <motion.div
        className="absolute inset-0 bg-[#ff4d00] origin-bottom z-10 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
      />
      {children}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function Projects() {
  const { t } = useLang()
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start end", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], [-20, 20])

  return (
    <section
      id="projects"
      className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-[#fcfaf7] dark:bg-[#0d0d0d]"
    >
      <AnimatedBackground />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-[1]">
        <path d="M0 400h200v200h300v400" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="500" cy="1000" r="4" fill="#ff4d00" />
      </svg>
      <div className="absolute top-40 right-10 font-mono text-[#ff4d00] opacity-[0.04] text-8xl select-none z-[1]">
        0101
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header con curtain */}
        <SectionReveal>
          <div ref={headerRef} className="mb-20 md:mb-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-10 h-[1px] bg-[#ff4d00]" />
                  <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">
                    {t("projects.label")}
                  </p>
                </motion.div>

                <motion.div style={{ y: titleY }}>
                  <div className="overflow-hidden">
                    <motion.h2
                      initial={{ y: 80, opacity: 0 }}
                      animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] text-[#111111] dark:text-white"
                    >
                      {t("projects.title1")}
                    </motion.h2>
                  </div>
                  <div className="overflow-hidden">
                    <motion.h2
                      initial={{ y: 80, opacity: 0 }}
                      animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.78, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] text-[#ff4d00] italic"
                    >
                      {t("projects.title2")}
                    </motion.h2>
                  </div>
                </motion.div>
              </div>

              <FadeIn delay={0.95}>
                <Magnetic>
                  <a
                    href="https://github.com/HMAlejandra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 text-xs font-black tracking-widest uppercase"
                  >
                    <div className="w-14 h-14 rounded-full border border-[#111111]/10 dark:border-white/10 flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-all duration-500">
                      <Github className="w-6 h-6 group-hover:text-white transition-colors dark:text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#111111]/40 dark:text-white/40 font-mono text-[9px]">
                        {t("projects.root")}
                      </span>
                      <span className="text-[#111111] dark:text-white">{t("projects.github")}</span>
                    </div>
                  </a>
                </Magnetic>
              </FadeIn>
            </div>
          </div>
        </SectionReveal>

        {/* Lista */}
        <div>
          {projectsData.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Magnetic>
            <a
              href="https://github.com/HMAlejandra"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-[#ff4d00]/30 hover:bg-[#ff4d00] hover:border-[#ff4d00] rounded-full text-[11px] font-black tracking-widest uppercase text-[#111111] dark:text-white hover:text-white transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>{t("projects.github")}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
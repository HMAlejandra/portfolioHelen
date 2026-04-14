"use client"

import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn, Magnetic } from "@/components/animations"
import { ArrowUpRight, Github } from "lucide-react"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"
import { projects as projectsData } from "@/lib/projects-data"

// ─── Letras animadas al hover ─────────────────────────────────────────────────
function AnimatedTitle({ text, hovered }: { text: string; hovered: boolean }) {
  return (
    <span className="inline-block overflow-hidden leading-none" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: hovered ? [-2, 0] : 0,
            color: hovered ? "#ff4d00" : "inherit",
          }}
          transition={{
            y:     { duration: 0.3, delay: i * 0.02, ease: "easeOut" },
            color: { duration: 0.25 },
          }}
          style={{
            display: char === " " ? "inline" : "inline-block",
            minWidth: char === " " ? "0.25em" : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Imagen flotante — DEBAJO del texto via z-index ───────────────────────────
function FloatingImage({ src, visible }: { src: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
          exit={{   opacity: 0, scale: 0.88, rotate: -2 }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          /* z-0 = detrás del contenido de la fila que tiene z-10 */
          className="pointer-events-none absolute left-[30%] top-1/2 -translate-y-1/2 w-52 h-32 md:w-64 md:h-40 overflow-hidden rounded-sm shadow-2xl border border-[#ff4d00]/25 z-0"
        >
          <Image src={src} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#ff4d00]/10" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Fila de proyecto ─────────────────────────────────────────────────────────
function ProjectRow({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const title = lang === "en" ? project.title_en : project.title_es
  const type  = lang === "en" ? project.type_en  : project.type_es

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
        animate={{ backgroundColor: hovered ? "rgba(255,77,0,0.4)" : "rgba(17,17,17,0.1)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Imagen flotante — z-0, DETRÁS del contenido */}
      <FloatingImage src={project.image} visible={hovered} />

      {/* Contenido — z-10, ENCIMA de la imagen */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative z-10 flex items-center gap-4 md:gap-8 py-7 md:py-9 group cursor-pointer">

          {/* Número */}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.4, color: hovered ? "#ff4d00" : "#111111" }}
            transition={{ duration: 0.25 }}
            className="text-[10px] font-mono tracking-widest w-6 flex-shrink-0 hidden md:block dark:text-white"
          >
            {project.num}
          </motion.span>

          {/* Título con letras animadas */}
          <div className="text-3xl md:text-5xl lg:text-6xl font-serif flex-1 min-w-0 text-[#111] dark:text-white">
            <AnimatedTitle text={title} hovered={hovered} />
          </div>

          {/* Tags — solo desktop */}
          <div className="hidden lg:flex flex-wrap gap-1.5 flex-shrink-0 max-w-[220px]">
            {project.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                animate={{
                  borderColor: hovered ? "rgba(255,77,0,0.5)" : "rgba(17,17,17,0.12)",
                  color: hovered ? "#ff4d00" : "rgba(17,17,17,0.5)",
                }}
                transition={{ duration: 0.25 }}
                className="px-2 py-0.5 text-[9px] font-mono rounded-full border dark:border-white/10 dark:text-white/50"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Tipo + año — desktop */}
          <div className="hidden md:flex flex-col items-end gap-0.5 flex-shrink-0 text-right min-w-[100px]">
            <motion.span
              animate={{ color: hovered ? "#ff4d00" : "rgba(17,17,17,0.45)" }}
              transition={{ duration: 0.25 }}
              className="text-[10px] font-mono font-black tracking-widest uppercase dark:text-white/45"
            >
              {type}
            </motion.span>
            <span className="text-[9px] font-mono text-[#111]/25 dark:text-white/25">{project.year}</span>
          </div>

          {/* Flecha */}
          <motion.div
            animate={{
              backgroundColor: hovered ? "#ff4d00" : "transparent",
              borderColor: hovered ? "#ff4d00" : "rgba(17,17,17,0.15)",
              x: hovered ? 0 : 0,
              rotate: hovered ? 45 : 0,
            }}
            transition={{ duration: 0.28 }}
            className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 dark:border-white/15"
          >
            <ArrowUpRight
              className="w-4 h-4 transition-colors duration-200"
              style={{ color: hovered ? "#ffffff" : "rgba(17,17,17,0.4)" }}
            />
          </motion.div>
        </div>
      </Link>

      {/* Punto naranja en la línea */}
      <motion.div
        className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[#ff4d00] -translate-y-1/2 z-20"
        animate={{ scale: hovered ? 2.5 : 1, opacity: hovered ? 1 : 0.25 }}
        transition={{ duration: 0.25 }}
      />

      {/* Línea inferior en el último */}
      {index === projectsData.length - 1 && (
        <motion.div
          className="h-px w-full"
          animate={{ backgroundColor: hovered ? "rgba(255,77,0,0.4)" : "rgba(17,17,17,0.1)" }}
          transition={{ duration: 0.3 }}
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
      <div className="absolute top-40 right-10 font-mono text-[#ff4d00] opacity-[0.04] text-8xl select-none z-[1]">0101</div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header con curtain reveal */}
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
                  <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">{t("projects.label")}</p>
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
                    href="https://github.com/helenmoncayo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 text-xs font-black tracking-widest uppercase"
                  >
                    <div className="w-14 h-14 rounded-full border border-[#111111]/10 dark:border-white/10 flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-all duration-500">
                      <Github className="w-6 h-6 group-hover:text-white transition-colors dark:text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#111111]/40 dark:text-white/40 font-mono text-[9px]">{t("projects.root")}</span>
                      <span className="text-[#111111] dark:text-white">{t("projects.github")}</span>
                    </div>
                  </a>
                </Magnetic>
              </FadeIn>
            </div>
          </div>
        </SectionReveal>

        {/* Lista de proyectos */}
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
              href="https://github.com/helenmoncayo"
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
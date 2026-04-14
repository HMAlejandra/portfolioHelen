"use client"

import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { FadeIn, Magnetic } from "@/components/animations"
import { ArrowUpRight, Github } from "lucide-react"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"

// ─── Datos de proyectos ───────────────────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    titleKey: "projects.1.title",
    descKey:  "projects.1.desc",
    tags:     ["Unity", "C#", "Game Design", "Logic"],
    type_en:  "Game Dev",
    type_es:  "Juego",
    image:    "/retrato.png",
    link:     "https://demo.example.com",
    github:   "https://github.com/helenmoncayo",
    year:     "2024",
    num:      "01",
  },
  {
    id: 2,
    titleKey: "projects.2.title",
    descKey:  "projects.2.desc",
    tags:     ["React", "Node.js", "Stripe", "Redis"],
    type_en:  "Web App",
    type_es:  "App Web",
    image:    "/retrato.png",
    link:     "#",
    github:   "#",
    year:     "2023",
    num:      "02",
  },
  {
    id: 3,
    titleKey: "projects.3.title",
    descKey:  "projects.3.desc",
    tags:     ["Next.js", "PostgreSQL", "D3.js"],
    type_en:  "Open Source",
    type_es:  "Open Source",
    image:    "/retrato.png",
    link:     "#",
    github:   "#",
    year:     "2023",
    num:      "03",
  },
  {
    id: 4,
    titleKey: "projects.4.title",
    descKey:  "projects.4.desc",
    tags:     ["Tailwind", "Framer Motion", "TypeScript"],
    type_en:  "Portfolio",
    type_es:  "Portafolio",
    image:    "/retrato.png",
    link:     "#",
    github:   "#",
    year:     "2024",
    num:      "04",
  },
]

// ─── Imagen flotante que sigue el mouse ──────────────────────────────────────
function FloatingImage({ src, visible }: { src: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1,    rotate:  2 }}
          exit={{   opacity: 0, scale: 0.85, rotate: -3 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-56 h-36 md:w-72 md:h-44 overflow-hidden rounded-sm shadow-2xl border border-[#ff4d00]/30 z-30"
          style={{ transformOrigin: "center" }}
        >
          <Image src={src} alt="" fill className="object-cover grayscale-[0.3]" />
          <div className="absolute inset-0 bg-[#ff4d00]/10" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Fila de proyecto (estilo designisfunny) ─────────────────────────────────
function ProjectRow({
  project,
  index,
}: {
  project: typeof projectsData[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const { t, lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

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
      <div className="h-px bg-[#111111]/10 dark:bg-white/10 w-full" />

      <div className="relative flex items-center gap-4 md:gap-8 py-6 md:py-8 group cursor-pointer overflow-visible">

        {/* Número */}
        <motion.span
          className="text-[10px] font-mono text-[#ff4d00]/60 tracking-widest w-6 flex-shrink-0 hidden md:block"
          animate={{ opacity: hovered ? 1 : 0.5 }}
        >
          {project.num}
        </motion.span>

        {/* Título grande */}
        <motion.h3
          className="text-3xl md:text-5xl lg:text-6xl font-serif leading-none flex-1 min-w-0"
          animate={{
            color: hovered ? "#ff4d00" : "var(--title-color)",
            x: hovered ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ "--title-color": "inherit" } as React.CSSProperties}
        >
          {t(project.titleKey)}
        </motion.h3>

        {/* Tags — centro — solo desktop */}
        <div className="hidden lg:flex flex-wrap gap-2 flex-shrink-0 max-w-xs">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              animate={{
                borderColor: hovered ? "rgba(255,77,0,0.5)" : "rgba(17,17,17,0.12)",
                color:       hovered ? "#ff4d00" : "inherit",
              }}
              transition={{ duration: 0.3 }}
              className="px-2 py-0.5 text-[9px] font-mono rounded-full border opacity-70"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Tipo + Año — derecha */}
        <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0 text-right">
          <motion.span
            animate={{ color: hovered ? "#ff4d00" : "rgba(17,17,17,0.5)" }}
            className="text-xs font-mono font-black tracking-widest uppercase dark:text-white/50"
          >
            {lang === "en" ? project.type_en : project.type_es}
          </motion.span>
          <span className="text-[10px] font-mono text-[#111111]/30 dark:text-white/30">{project.year}</span>
        </div>

        {/* Links — flechas */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              backgroundColor: hovered ? "#ff4d00" : "transparent",
              borderColor:     hovered ? "#ff4d00" : "rgba(17,17,17,0.15)",
              color:           hovered ? "#ffffff" : "rgba(17,17,17,0.4)",
            }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-full border flex items-center justify-center dark:border-white/15 dark:text-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              backgroundColor: hovered ? "#111111" : "transparent",
              borderColor:     hovered ? "#111111" : "rgba(17,17,17,0.15)",
              color:           hovered ? "#ffffff" : "rgba(17,17,17,0.4)",
            }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-full border flex items-center justify-center dark:border-white/15 dark:text-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Imagen flotante — aparece al hover */}
        <FloatingImage src={project.image} visible={hovered} />
      </div>

      {/* Línea inferior en el último item */}
      {index === projectsData.length - 1 && (
        <div className="h-px bg-[#111111]/10 dark:bg-white/10 w-full" />
      )}

      {/* Punto naranja en la línea al hover */}
      <motion.div
        className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-[#ff4d00] -translate-y-1/2"
        animate={{ scale: hovered ? 2 : 1, opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// ─── Transición de entrada tipo "curtain" ────────────────────────────────────
function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Curtain que se levanta */}
      <motion.div
        className="absolute inset-0 bg-[#ff4d00] origin-bottom z-10 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      {/* Segundo layer más claro */}
      <motion.div
        className="absolute inset-0 bg-[#ff7a40] origin-bottom z-[9] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.0 }}
      />
      {children}
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────
export function Projects() {
  const { t } = useLang()
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" })

  // Parallax sutil en el título
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start end", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], [-30, 30])

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

        {/* ── Header con curtain reveal ── */}
        <SectionReveal>
          <div ref={headerRef} className="mb-20 md:mb-28 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-10 h-[1px] bg-[#ff4d00]" />
                  <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">
                    {t("projects.label")}
                  </p>
                </motion.div>

                <motion.div style={{ y: titleY }}>
                  <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] text-[#111111] dark:text-white"
                  >
                    {t("projects.title1")}
                  </motion.h2>
                  <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] text-[#ff4d00] italic"
                  >
                    {t("projects.title2")}
                  </motion.h2>
                </motion.div>
              </div>

              <FadeIn delay={0.9}>
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

        {/* ── Lista de proyectos estilo designisfunny ── */}
        <div>
          {projectsData.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ── CTA final ── */}
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
              className="group flex items-center gap-3 px-8 py-4 border border-[#ff4d00]/30 hover:bg-[#ff4d00] hover:border-[#ff4d00] rounded-full text-[11px] font-black tracking-widest uppercase text-[#111111] dark:text-white hover:text-white transition-all duration-400"
            >
              <Github className="w-4 h-4" />
              <span>{t("projects.github")}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
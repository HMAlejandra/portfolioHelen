"use client"

import { useParams, useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { projects } from "@/lib/projects-data"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { lang } = useLang()
  const containerRef = useRef<HTMLDivElement>(null)

  const project = projects.find((p) => p.slug === params.slug)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] dark:bg-[#111]">
        <div className="text-center">
          <p className="text-[#ff4d00] font-mono text-sm mb-4">404 — Project not found</p>
          <Link href="/#projects" className="text-sm underline">← Back to projects</Link>
        </div>
      </div>
    )
  }

  const title = lang === "en" ? project.title_en : project.title_es
  const desc  = lang === "en" ? project.longDesc_en : project.longDesc_es
  const role  = lang === "en" ? project.role_en : project.role_es
  const dur   = lang === "en" ? project.duration_en : project.duration_es
  const type  = lang === "en" ? project.type_en : project.type_es

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f3ef] dark:bg-[#111] text-[#111] dark:text-white">
      <Navigation />

      {/* ── Hero ── */}
      <motion.section
        className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 pt-40 overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <AnimatedBackground />

        {/* PCB decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-[1]">
          <path d="M0 200h300v200h200" fill="none" stroke="#ff4d00" strokeWidth="1" />
          <circle cx="500" cy="400" r="3" fill="#ff4d00" />
        </svg>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-28 left-6 md:left-12 lg:left-24 z-10"
        >
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[10px] font-mono font-black tracking-widest uppercase text-[#111]/50 dark:text-white/50 hover:text-[#ff4d00] transition-colors"
          >
            <motion.span whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            {lang === "en" ? "Back" : "Volver"}
          </button>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6 mb-8"
          >
            <span className="text-[#ff4d00] font-mono text-xs tracking-widest">{project.num}</span>
            <span className="w-8 h-px bg-[#ff4d00]/40" />
            <span className="text-xs font-mono text-[#111]/50 dark:text-white/50 uppercase tracking-widest">{type}</span>
            <span className="text-xs font-mono text-[#111]/30 dark:text-white/30">{project.year}</span>
          </motion.div>

          {/* Título con animación letra a letra */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="font-serif leading-[0.85] text-[#111] dark:text-white"
              style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
            >
              {title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.03,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{ display: char === " " ? "inline" : "inline-block", minWidth: char === " " ? "0.25em" : undefined }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.06 }}
                className="px-3 py-1 text-[10px] font-mono rounded-full border border-[#ff4d00]/40 text-[#ff4d00] bg-[#ff4d00]/[0.07] tracking-wider"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Imagen principal ── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="px-6 md:px-12 lg:px-24 mb-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-2xl bg-[#111]">
            {/* Esquinas decorativas */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#ff4d00]/60 z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#ff4d00]/60 z-10" />
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover"
              style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(-10deg) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </motion.section>

      {/* ── Info + Descripción ── */}
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">

          {/* Sidebar con datos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Rol */}
            <div className="border-l-2 border-[#ff4d00] pl-4">
              <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-1">
                {lang === "en" ? "Role" : "Rol"}
              </p>
              <p className="text-sm font-serif">{role}</p>
            </div>

            {/* Duración */}
            <div className="border-l-2 border-[#ff4d00]/30 pl-4">
              <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-1">
                {lang === "en" ? "Duration" : "Duración"}
              </p>
              <p className="text-sm font-serif">{dur}</p>
            </div>

            {/* Año */}
            <div className="border-l-2 border-[#ff4d00]/30 pl-4">
              <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-1">
                {lang === "en" ? "Year" : "Año"}
              </p>
              <p className="text-sm font-serif">{project.year}</p>
            </div>

            {/* Tipo */}
            <div className="border-l-2 border-[#ff4d00]/30 pl-4">
              <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-1">
                {lang === "en" ? "Type" : "Tipo"}
              </p>
              <p className="text-sm font-serif">{type}</p>
            </div>

            {/* Links */}
            <div className="space-y-3 pt-4">
              {project.link !== "#" && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-mono font-black tracking-widest uppercase group hover:text-[#ff4d00] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {lang === "en" ? "Live Demo" : "Demo en Vivo"}
                </motion.a>
              )}
              {project.github !== "#" && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-mono font-black tracking-widest uppercase group hover:text-[#ff4d00] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Descripción larga */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-9"
          >
            <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff4d00]" />
              {lang === "en" ? "Overview" : "Descripción"}
            </p>
            <p className="text-xl md:text-2xl font-serif leading-[1.6] text-[#111]/80 dark:text-white/80">
              {desc}
            </p>

            {/* Grid de imágenes adicionales */}
            <div className="grid grid-cols-2 gap-4 mt-16">
              {project.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111] shadow-lg"
                >
                  <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#ff4d00]/50 z-10" />
                  <Image src={img} alt="" fill className="object-cover opacity-80" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Navegación entre proyectos ── */}
      <section className="border-t border-[#111]/10 dark:border-white/10 px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Proyecto anterior */}
          {(() => {
            const idx  = projects.findIndex((p) => p.slug === project.slug)
            const prev = projects[idx - 1]
            return prev ? (
              <Link href={`/projects/${prev.slug}`}>
                <motion.div whileHover={{ x: -6 }} className="group flex items-center gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-[#111]/15 dark:border-white/15 flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-all">
                    <ArrowLeft className="w-4 h-4 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-0.5">
                      {lang === "en" ? "Previous" : "Anterior"}
                    </p>
                    <p className="text-sm font-serif group-hover:text-[#ff4d00] transition-colors">
                      {lang === "en" ? prev.title_en : prev.title_es}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ) : <div />
          })()}

          <Link href="/#projects">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] hover:underline cursor-pointer"
            >
              {lang === "en" ? "All Projects" : "Todos los Proyectos"}
            </motion.span>
          </Link>

          {/* Proyecto siguiente */}
          {(() => {
            const idx  = projects.findIndex((p) => p.slug === project.slug)
            const next = projects[idx + 1]
            return next ? (
              <Link href={`/projects/${next.slug}`}>
                <motion.div whileHover={{ x: 6 }} className="group flex items-center gap-4 cursor-pointer text-right">
                  <div>
                    <p className="text-[9px] font-mono text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-0.5">
                      {lang === "en" ? "Next" : "Siguiente"}
                    </p>
                    <p className="text-sm font-serif group-hover:text-[#ff4d00] transition-colors">
                      {lang === "en" ? next.title_en : next.title_es}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#111]/15 dark:border-white/15 flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-all">
                    <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              </Link>
            ) : <div />
          })()}
        </div>
      </section>
    </div>
  )
}
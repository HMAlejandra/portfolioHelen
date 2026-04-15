"use client"

import { useParams, useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { TechIcon } from "@/components/tech-icon"

const experiences = [
  {
    slug: "full-stack-developer",
    num: "01",
    period_en: "2024 — Present",
    period_es: "2024 — Presente",
    role_en: "Full Stack Developer",
    role_es: "Desarrolladora Full Stack",
    company: "Freelance & Personal Projects",
    companyUrl: "https://github.com/HMAlejandra",
    shortDesc_en: "Building end-to-end web applications for clients and academic projects.",
    shortDesc_es: "Construyendo aplicaciones web de extremo a extremo para clientes y proyectos académicos.",
    longDesc_en: "Designing and developing complete web solutions from database architecture to pixel-perfect UIs. Working with Next.js and TailwindCSS for responsive interfaces, integrating REST APIs and third-party services, and deploying scalable applications on AWS (EC2, S3, Amplify). Each project prioritizes clean code, performance, and exceptional user experience.",
    longDesc_es: "Diseñando y desarrollando soluciones web completas desde la arquitectura de base de datos hasta interfaces pixel-perfect. Trabajando con Next.js y TailwindCSS para interfaces responsive, integrando APIs REST y servicios de terceros, y desplegando aplicaciones escalables en AWS (EC2, S3, Amplify). Cada proyecto prioriza código limpio, rendimiento y experiencia de usuario excepcional.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "AWS", "Node.js"],
    highlights_en: ["Built 4+ client projects from concept to deployment", "Integrated Stripe payments and REST APIs", "Deployed on AWS EC2 and Amplify", "Maintained 95+ Lighthouse performance scores"],
    highlights_es: ["Construí 4+ proyectos para clientes desde concepto hasta despliegue", "Integré pagos con Stripe y APIs REST", "Desplegué en AWS EC2 y Amplify", "Mantuve puntajes Lighthouse 95+"],
  },
  {
    slug: "game-developer",
    num: "02",
    period_en: "2023 — 2024",
    period_es: "2023 — 2024",
    role_en: "Game Developer (Academic)",
    role_es: "Desarrolladora de Juegos (Académico)",
    company: "UCC — Universidad Cooperativa",
    companyUrl: "#",
    shortDesc_en: "Created 'Code Runner: Invisible Master', a 2D educational puzzle game.",
    shortDesc_es: "Creé 'Code Runner: Maestro Invisible', un juego educativo de puzzles 2D.",
    longDesc_en: "Designed and developed a complete 2D educational video game in Unity to teach block-based programming to younger audiences. Implemented custom game mechanics, AI-driven adaptive difficulty levels, and an intuitive visual interface that makes learning programming concepts engaging and fun. The game was presented as an academic research project at UCC.",
    longDesc_es: "Diseñé y desarrollé un videojuego educativo 2D completo en Unity para enseñar programación por bloques a audiencias más jóvenes. Implementé mecánicas de juego personalizadas, niveles de dificultad adaptativa con IA e interfaz visual intuitiva que hace el aprendizaje de programación entretenido. El juego fue presentado como proyecto de investigación académica en la UCC.",
    technologies: ["Unity", "C#", "Game Design", "AI Logic", "UX Research"],
    highlights_en: ["Designed 15+ unique puzzle levels", "Implemented adaptive AI difficulty", "Presented at UCC academic symposium", "Taught programming to 30+ students"],
    highlights_es: ["Diseñé 15+ niveles de puzzles únicos", "Implementé dificultad adaptativa con IA", "Presenté en simposio académico UCC", "Enseñé programación a 30+ estudiantes"],
  },
  {
    slug: "backend-engineer",
    num: "03",
    period_en: "2023",
    period_es: "2023",
    role_en: "Backend & Database Engineer",
    role_es: "Ingeniería Backend & Bases de Datos",
    company: "Academic Project — E-commerce Platform",
    companyUrl: "#",
    shortDesc_en: "Full e-commerce backend with auth, catalog and CI/CD pipelines.",
    shortDesc_es: "Backend de e-commerce completo con autenticación, catálogo y pipelines CI/CD.",
    longDesc_en: "Architected and implemented a production-grade e-commerce backend system. Built secure user authentication with JWT, a comprehensive product catalog with search and filtering, and a complete order management system. Set up automated CI/CD pipelines with GitHub Actions, containerized the application with Docker, and managed both PostgreSQL and MySQL databases.",
    longDesc_es: "Arquitecté e implementé un sistema backend de e-commerce de nivel producción. Construí autenticación segura con JWT, catálogo de productos con búsqueda y filtrado, y sistema completo de gestión de pedidos. Configuré pipelines CI/CD automatizados con GitHub Actions, contenericé la aplicación con Docker y gestioné bases de datos PostgreSQL y MySQL.",
    technologies: ["Python", "Flask", "PostgreSQL", "MySQL", "Docker", "GitHub Actions"],
    highlights_en: ["Built secure JWT authentication", "Managed dual PostgreSQL + MySQL databases", "Automated CI/CD with GitHub Actions", "Containerized with Docker"],
    highlights_es: ["Construí autenticación JWT segura", "Gestioné bases de datos PostgreSQL + MySQL", "Automaticé CI/CD con GitHub Actions", "Contenericé con Docker"],
  },
  {
    slug: "engineering-student",
    num: "04",
    period_en: "2022 — 2023",
    period_es: "2022 — 2023",
    role_en: "Software Engineering Student",
    role_es: "Estudiante de Ingeniería de Software",
    company: "Universidad Cooperativa de Colombia",
    companyUrl: "#",
    shortDesc_en: "Deep dive into algorithms, data structures, OOP and software architecture.",
    shortDesc_es: "Profundizando en algoritmos, estructuras de datos, POO y arquitectura de software.",
    longDesc_en: "Foundation year focused on mastering core computer science concepts. Studied algorithms and data structures in depth, applied object-oriented programming principles in Java and C++, and explored software architecture patterns. Participated actively in academic projects covering web development, mobile application design, and systems architecture planning.",
    longDesc_es: "Año de fundamentos enfocado en dominar conceptos core de ciencias de la computación. Estudié algoritmos y estructuras de datos en profundidad, apliqué principios de POO en Java y C++, y exploré patrones de arquitectura de software. Participé activamente en proyectos académicos de desarrollo web, diseño de apps móviles y planificación de sistemas.",
    technologies: ["Java", "C++", "Python", "SQL", "UML", "Scrum"],
    highlights_en: ["Dean's list academic excellence", "Led 3 collaborative team projects", "Mastered data structures & algorithms", "Completed Scrum methodology certification"],
    highlights_es: ["Excelencia académica lista del decano", "Lideré 3 proyectos colaborativos", "Dominé estructuras de datos y algoritmos", "Completé certificación metodología Scrum"],
  },
]

export default function ExperiencePage() {
  const params = useParams()
  const router = useRouter()
  const { lang } = useLang()
  const containerRef = useRef<HTMLDivElement>(null)

  const exp = experiences.find((e) => e.slug === params.slug)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!exp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] dark:bg-[#111]">
        <div className="text-center">
          <p className="text-[#ff4d00] font-mono text-sm mb-4">404 — Experience not found</p>
          <Link href="/#experience" className="text-sm underline">← Back</Link>
        </div>
      </div>
    )
  }

  const role   = lang === "en" ? exp.role_en   : exp.role_es
  const period = lang === "en" ? exp.period_en  : exp.period_es
  const long   = lang === "en" ? exp.longDesc_en: exp.longDesc_es
  const highlights = lang === "en" ? exp.highlights_en : exp.highlights_es

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f3ef] dark:bg-[#111] text-[#111] dark:text-white">
      <Navigation />

      {/* Hero */}
      <motion.section
        className="relative min-h-[85vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 pt-40 overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <AnimatedBackground />
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none z-[1]">
          <path d="M0 200h300v200h200" fill="none" stroke="#ff4d00" strokeWidth="1" />
          <circle cx="500" cy="400" r="3" fill="#ff4d00" />
        </svg>

        {/* Back */}
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
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6 mb-8"
          >
            <span className="text-[#ff4d00] font-mono text-xs tracking-widest">{exp.num}</span>
            <span className="w-8 h-px bg-[#ff4d00]/40" />
            <span className="text-xs font-mono text-[#111]/50 dark:text-white/50 uppercase tracking-widest">{period}</span>
          </motion.div>

          {/* Título */}
          <div className="overflow-visible mb-6" style={{ paddingBottom: "0.2em" }}>
            <motion.h1
              className="font-serif text-[#111] dark:text-white overflow-visible whitespace-nowrap"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 5rem)", lineHeight: "1.05", paddingBottom: "0.1em" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {role}
            </motion.h1>
          </div>

          {/* Company */}
          <motion.a
            href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#ff4d00] hover:underline"
          >
            @ {exp.company} <ArrowUpRight className="w-3 h-3" />
          </motion.a>

          {/* Tech icons en hero — baloncitos redondos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-5 mt-10"
          >
            {exp.technologies.map((tech, i) => (
              <div key={tech} className="flex flex-col items-center gap-2 group cursor-default">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  title={tech}
                  className="w-14 h-14 rounded-full border-2 border-[#ff4d00]/40 dark:border-[#ff4d00]/70 bg-white dark:bg-[#222] shadow-lg shadow-[#ff4d00]/15 flex items-center justify-center hover:border-[#ff4d00] hover:shadow-[#ff4d00]/35 transition-all duration-200"
                >
                  <TechIcon name={tech} size={28} />
                </motion.div>
                <span className="text-[9px] font-mono font-black uppercase tracking-wider text-[#111]/50 dark:text-white/60 group-hover:text-[#ff4d00] transition-colors">{tech}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contenido */}
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-6"
          >
            <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff4d00]" />
              {lang === "en" ? "Highlights" : "Logros"}
            </p>
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                <p className="text-sm leading-relaxed text-[#111]/70 dark:text-white/70">{h}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Descripción larga */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff4d00]" />
              {lang === "en" ? "Overview" : "Descripción"}
            </p>
            <p className="text-xl md:text-2xl font-serif leading-[1.6] text-[#111]/80 dark:text-white/80">
              {long}
            </p>

            {/* Tech grid con iconos grandes */}
            <div className="mt-16">
              <p className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-[#ff4d00]" />
                {lang === "en" ? "Technologies Used" : "Tecnologías Usadas"}
              </p>
              {/* Fila completa de baloncitos rebotando */}
              <div className="flex flex-wrap justify-start gap-6">
                {exp.technologies.map((tech, i) => (
                  <div key={tech} className="flex flex-col items-center gap-2 group cursor-default">
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.18 }}
                      className="w-16 h-16 rounded-full border-2 border-[#ff4d00]/40 dark:border-[#ff4d00]/70 bg-white dark:bg-[#222] shadow-xl shadow-[#ff4d00]/15 flex items-center justify-center hover:border-[#ff4d00] hover:shadow-[#ff4d00]/40 transition-all duration-200"
                    >
                      <TechIcon name={tech} size={32} />
                    </motion.div>
                    <span className="text-[9px] font-mono font-black uppercase tracking-wider text-[#111]/55 dark:text-white/65 group-hover:text-[#ff4d00] transition-colors text-center">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nav entre experiencias */}
      <section className="border-t border-[#111]/10 dark:border-white/10 px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {(() => {
            const idx  = experiences.findIndex((e) => e.slug === exp.slug)
            const prev = experiences[idx - 1]
            return prev ? (
              <Link href={`/experience/${prev.slug}`}>
                <motion.div whileHover={{ x: -6 }} className="group flex items-center gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-[#111]/15 dark:border-white/15 flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-all">
                    <ArrowLeft className="w-4 h-4 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-0.5">{lang === "en" ? "Previous" : "Anterior"}</p>
                    <p className="text-sm font-serif group-hover:text-[#ff4d00] transition-colors">{lang === "en" ? prev.role_en : prev.role_es}</p>
                  </div>
                </motion.div>
              </Link>
            ) : <div />
          })()}

          <Link href="/#experience">
            <motion.span whileHover={{ scale: 1.05 }} className="text-[9px] font-mono font-black tracking-[0.3em] uppercase text-[#ff4d00] hover:underline cursor-pointer">
              {lang === "en" ? "All Experience" : "Toda la Experiencia"}
            </motion.span>
          </Link>

          {(() => {
            const idx  = experiences.findIndex((e) => e.slug === exp.slug)
            const next = experiences[idx + 1]
            return next ? (
              <Link href={`/experience/${next.slug}`}>
                <motion.div whileHover={{ x: 6 }} className="group flex items-center gap-4 cursor-pointer text-right">
                  <div>
                    <p className="text-[9px] font-mono text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-0.5">{lang === "en" ? "Next" : "Siguiente"}</p>
                    <p className="text-sm font-serif group-hover:text-[#ff4d00] transition-colors">{lang === "en" ? next.role_en : next.role_es}</p>
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
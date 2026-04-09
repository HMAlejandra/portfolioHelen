"use client"

import { FadeIn, TextReveal, StaggerChildren, staggerItem, LineReveal } from "@/components/animations"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Code2, Layers, Cpu, Globe, BookOpen } from "lucide-react"
import { useRef } from "react"
import { useLang } from "@/components/providers"

const experiences = [
  {
    period_en: "2024 — Present",
    period_es: "2024 — Presente",
    role_en: "Full Stack Developer",
    role_es: "Desarrolladora Full Stack",
    company: "Freelance & Personal Projects",
    companyUrl: "https://github.com/helenmoncayo",
    description_en: "Building end-to-end web applications for clients and academic projects. Designing responsive UIs with Next.js and TailwindCSS, integrating REST APIs and deploying on AWS (EC2, S3, Amplify). Focus on clean code and user experience.",
    description_es: "Construyendo aplicaciones web de extremo a extremo para clientes y proyectos académicos. Diseñando interfaces con Next.js y TailwindCSS, integrando APIs REST y desplegando en AWS (EC2, S3, Amplify). Enfoque en código limpio y experiencia de usuario.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "AWS", "Node.js"],
    icon: <Globe className="w-4 h-4" />,
  },
  {
    period_en: "2023 — 2024",
    period_es: "2023 — 2024",
    role_en: "Game Developer (Academic)",
    role_es: "Desarrolladora de Juegos (Académico)",
    company: "UCC — Universidad Cooperativa",
    companyUrl: "#",
    description_en: "Created 'Code Runner: Invisible Master', a 2D puzzle game to teach block-based programming. Developed in Unity with C#, implementing game mechanics, AI-driven levels and an intuitive learning interface.",
    description_es: "Creé 'Code Runner: Invisible Master', un juego de puzzles 2D para enseñar programación por bloques. Desarrollado en Unity con C#, implementando mecánicas de juego, niveles con IA e interfaz de aprendizaje intuitiva.",
    technologies: ["Unity", "C#", "Game Design", "AI Logic", "UX Research"],
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    period_en: "2023",
    period_es: "2023",
    role_en: "Backend & Database Engineer",
    role_es: "Ingeniería Backend & Bases de Datos",
    company: "Academic Project — E-commerce Platform",
    companyUrl: "#",
    description_en: "Designed and implemented a full e-commerce backend with user auth, product catalog and order management. Built with Python (Flask), PostgreSQL and MySQL. Integrated CI/CD pipelines with GitHub Actions.",
    description_es: "Diseñé un backend de e-commerce completo con autenticación, catálogo y gestión de pedidos. Construido con Python (Flask), PostgreSQL y MySQL. CI/CD con GitHub Actions.",
    technologies: ["Python", "Flask", "PostgreSQL", "MySQL", "Docker", "GitHub Actions"],
    icon: <Layers className="w-4 h-4" />,
  },
  {
    period_en: "2022 — 2023",
    period_es: "2022 — 2023",
    role_en: "Software Engineering Student",
    role_es: "Estudiante de Ingeniería de Software",
    company: "Universidad Cooperativa de Colombia",
    companyUrl: "#",
    description_en: "Deepening knowledge in algorithms, data structures, OOP and software architecture. Active in academic projects covering web development, mobile apps and systems design.",
    description_es: "Profundizando en algoritmos, estructuras de datos, POO y arquitectura de software. Activa en proyectos de desarrollo web, apps móviles y diseño de sistemas.",
    technologies: ["Java", "C++", "Python", "SQL", "UML", "Scrum"],
    icon: <BookOpen className="w-4 h-4" />,
  },
]

const toolsAndTech = [
  { cat_en: "Frontend",      cat_es: "Frontend",       items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"] },
  { cat_en: "Backend",       cat_es: "Backend",        items: ["Node.js", "Python", "Flask", "Java", "C++"] },
  { cat_en: "Cloud & DevOps",cat_es: "Nube & DevOps",  items: ["AWS EC2", "AWS S3", "AWS Amplify", "Docker", "GitHub Actions"] },
  { cat_en: "Databases",     cat_es: "Bases de datos", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { cat_en: "Tools",         cat_es: "Herramientas",   items: ["Git", "Unity", "Figma", "VS Code", "Postman"] },
]

export function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { lang, t } = useLang()

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-background"
    >
      {/* PCB decorations */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" aria-hidden>
        <path d="M100 0v200h300v100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="400" cy="300" r="3" fill="#ff4d00" />
        <path d="M800 600h-200v-200h-100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="500" cy="400" r="3" fill="#ff4d00" />
        <path d="M0 400h150v100h200" fill="none" stroke="#ff4d00" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>
      <div className="absolute top-20 right-[8%] font-mono text-[#ff4d00] opacity-[0.07] text-xs select-none pointer-events-none">{"<experience />"}</div>
      <div className="absolute bottom-32 left-[5%] font-mono text-[#ff4d00] opacity-[0.07] text-xl select-none pointer-events-none">{"{ }"}</div>
      <div className="absolute top-1/3 left-[3%] font-mono text-[#ff4d00] opacity-[0.04] text-5xl select-none pointer-events-none">01</div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d00] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d00]" />
            </span>
            <span className="text-sm tracking-[0.3em] uppercase font-black text-muted-foreground/60">
              {lang === "en" ? "System.Career_Log" : "Sistema.Registro_Carrera"}
            </span>
            <div className="h-[1px] flex-1 max-w-32 bg-[#ff4d00]/20" />
          </div>
        </FadeIn>

        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] mb-4">
            <TextReveal delay={0.1}>{t("exp.title")}</TextReveal>
          </h2>
          <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] text-[#ff4d00]">
            <TextReveal delay={0.2}>{t("exp.title2")}</TextReveal>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#ff4d00] via-[#ff4d00]/30 to-transparent hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            style={{ height: "100%" }}
          />

          <StaggerChildren className="space-y-0 md:pl-12" staggerDelay={0.12}>
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={staggerItem}>
                <div className="group relative py-10 md:py-14">
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute -left-[49px] top-12 w-3 h-3 rounded-full bg-[#ff4d00] hidden md:flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 400 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </motion.div>

                  <div className="absolute inset-0 rounded-lg bg-[#ff4d00]/0 group-hover:bg-[#ff4d00]/[0.03] transition-colors duration-500 -mx-4 px-4" />

                  <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono tracking-wider mb-2">
                        {lang === "en" ? exp.period_en : exp.period_es}
                      </p>
                      <div className="flex items-center gap-1.5 text-[#ff4d00]">
                        {exp.icon}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                        <h3 className="text-xl md:text-2xl font-serif group-hover:text-[#ff4d00] transition-colors duration-300">
                          {lang === "en" ? exp.role_en : exp.role_es}
                        </h3>
                        
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          data-cursor-hover
                        >
                          @ {exp.company}
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl text-base">
                        {lang === "en" ? exp.description_en : exp.description_es}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 text-[10px] font-mono bg-secondary rounded-full border border-border/50 hover:border-[#ff4d00]/50 hover:text-[#ff4d00] transition-colors cursor-default"
                            whileHover={{ scale: 1.05, y: -1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < experiences.length - 1 && <LineReveal delay={index * 0.1} />}
              </motion.div>
            ))}
          </StaggerChildren>
        </div>

        {/* Tech Arsenal */}
        <FadeIn delay={0.4} className="mt-24">
          <div className="border-t border-border/50 pt-16">
            <div className="flex items-center gap-3 mb-10">
              <Cpu className="w-4 h-4 text-[#ff4d00]" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#ff4d00]">
                {lang === "en" ? "Tech_Arsenal" : "Arsenal_Técnico"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {toolsAndTech.map((cat, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + ci * 0.1 }}
                >
                  <p className="text-[9px] font-black tracking-[0.25em] uppercase text-muted-foreground/50 mb-3">
                    {lang === "en" ? cat.cat_en : cat.cat_es}
                  </p>
                  <div className="space-y-1.5">
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={ii}
                        className="flex items-center gap-2"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="w-1 h-1 rounded-full bg-[#ff4d00]/40" />
                        <span className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
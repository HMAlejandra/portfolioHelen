"use client"

import { FadeIn, TextReveal, StaggerChildren, staggerItem, LineReveal } from "@/components/animations"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Code2, Layers, Cpu, Globe, BookOpen } from "lucide-react"
import { useRef } from "react"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"

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
  { cat_en: "Frontend", cat_es: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"] },
  { cat_en: "Backend", cat_es: "Backend", items: ["Node.js", "Python", "Flask", "Java", "C++"] },
  { cat_en: "Cloud & DevOps", cat_es: "Nube & DevOps", items: ["AWS EC2", "AWS S3", "AWS Amplify", "Docker", "GitHub Actions"] },
  { cat_en: "Databases", cat_es: "Bases de datos", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { cat_en: "Tools", cat_es: "Herramientas", items: ["Git", "Unity", "Figma", "VS Code", "Postman"] },
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
      {/* Fondo animado */}
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Timeline */}
        <div className="relative">

          <StaggerChildren className="space-y-0 md:pl-12" staggerDelay={0.12}>
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={staggerItem}>

                <div className="group relative py-10 md:py-14">

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

                        <a
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
      </div>
    </section>
  )
}
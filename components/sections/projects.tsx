"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { FadeIn, TextReveal, HoverScale, Magnetic } from "@/components/animations"
import { ArrowUpRight, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Code Runner: Invisible Master",
    description: "A narrative 2D puzzle game built to teach block-based programming concepts. Merging narrative with computational thinking.",
    tags: ["Unity", "C#", "Game Design", "Logic"],
    image: "/retrato.png", // change for imagen real del proyecto
    link: "https://demo.example.com",
    github: "https://github.com/helenmoncayo",
  },
  {
    id: 2,
    title: "E-commerce System",
    description: "Mobile-first platform with advanced filtering, search, and payment integration. Built for scale.",
    tags: ["React", "Node.js", "Stripe", "Redis"],
    image: "/project-2.png",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Research Analytics",
    description: "Open source data tool for automating academic research workflows. Focused on UI/UX for scientists.",
    tags: ["Next.js", "PostgreSQL", "D3.js"],
    image: "/project-3.png",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Portfolio Core",
    description: "Real-time analytics dashboard with beautiful visualizations and customizable widgets for system monitoring.",
    tags: ["Tailwind", "Framer Motion", "TypeScript"],
    image: "/project-4.png",
    link: "#",
    github: "#",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center py-20 md:py-32">
        {/* LADO IMAGEN: Con efectos de visor técnico */}
        <motion.div 
          style={{ y }}
          className={`relative aspect-[16/10] overflow-hidden rounded-sm bg-[#111111] ${
            index % 2 === 1 ? "md:order-2" : ""
          }`}
        >
          {/* Esquinas de enfoque estilo cámara */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#ff4d00]/40 z-20" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#ff4d00]/40 z-20" />
          
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-1000 ${isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale-[0.4]'}`}
          />
          
          {/* Overlay Naranja con Botones (target="_blank" configurado) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center gap-8 z-30"
              >
                <Magnetic>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-[#ff4d00] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </Magnetic>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* LADO TEXTO: Estilo Editor de Código */}
        <div className={index % 2 === 1 ? "md:order-1 md:text-right" : ""}>
          <div className={`flex items-center gap-3 mb-6 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
            <span className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse" />
            <span className="text-[#ff4d00] font-mono text-[10px] tracking-[0.3em] font-black uppercase">
              Module.0{project.id}
            </span>
          </div>

          <h3 className={`text-4xl md:text-5xl font-serif mb-6 transition-colors duration-500 ${isHovered ? 'text-[#ff4d00]' : 'text-[#111111]'}`}>
            {project.title}
          </h3>
          
          <p className={`text-lg leading-relaxed mb-8 border-l-2 pl-8 py-2 transition-all duration-500 ${isHovered ? 'border-[#ff4d00] bg-[#ff4d00]/5 text-[#111111]' : 'border-[#111111]/10 text-muted-foreground'}`}>
            {project.description}
          </p>
          
          {/* Tags con sintaxis de código */}
          <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className={`px-4 py-1.5 text-[10px] font-mono rounded-sm border transition-all duration-500 ${
                  isHovered 
                  ? "bg-[#111111] border-[#ff4d00] text-white" 
                  : "bg-transparent border-[#111111]/10 text-[#111111]/60"
                }`}
              >
                {isHovered ? `const ${tag.replace(/\s+/g, '')} = true;` : tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Divisor estilo "Pista de Circuito" */}
      <div className="relative h-[1px] bg-[#111111]/10 w-full">
          <div className={`absolute top-[-2px] left-1/2 w-1.5 h-1.5 rounded-full bg-[#ff4d00] transition-all duration-700 ${isHovered ? 'scale-[2.5] opacity-100' : 'scale-100 opacity-40'}`} />
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section 
      id="projects" 
      className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: '#fcfaf7' }} // Mismo beige del About
    >
      {/* DECORACIÓN DE FONDO: Circuitos y Acentos sutiles */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
        <path d="M0 400h200v200h300v400" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="500" cy="1000" r="4" fill="#ff4d00" />
      </svg>
      <div className="absolute top-40 right-10 font-mono text-[#ff4d00] opacity-[0.05] text-8xl select-none">0101</div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-[#ff4d00]" />
                <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">
                  Development_Log
                </p>
              </div>
            </FadeIn>
            
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] text-[#111111]">
              <TextReveal>Selected</TextReveal> <br />
              <span className="text-[#ff4d00] italic"><TextReveal delay={0.2}>Projects</TextReveal></span>
            </h2>
          </div>

          <FadeIn delay={0.4} className="mt-12 md:mt-0">
            <Magnetic>
              <a 
                href="https://github.com/helenmoncayo" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-xs font-black tracking-widest uppercase"
              >
                <div className="w-14 h-14 rounded-full border border-[#111111]/10 flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-all duration-500">
                   <Github className="w-6 h-6 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#111111]/40 font-mono text-[9px]">Root_Repo</span>
                  <span className="text-[#111111]">View GitHub</span>
                </div>
              </a>
            </Magnetic>
          </FadeIn>
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FadeIn, TextReveal, HoverScale, Magnetic } from "@/components/animations"
import { ArrowUpRight, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A full-stack application built with Next.js and PostgreSQL. Features real-time updates and collaborative editing.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    image: "/placeholder-project-1.jpg",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Mobile-first e-commerce platform with advanced filtering, search, and payment integration.",
    tags: ["React", "Node.js", "Stripe", "Redis"],
    image: "/placeholder-project-2.jpg",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Open source CLI tool for automating development workflows. Used by thousands of developers.",
    tags: ["Go", "CLI", "Open Source"],
    image: "/placeholder-project-3.jpg",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Project Four",
    description: "Real-time analytics dashboard with beautiful visualizations and customizable widgets.",
    tags: ["Vue.js", "D3.js", "GraphQL", "AWS"],
    image: "/placeholder-project-4.jpg",
    link: "#",
    github: "#",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="group relative"
    >
      <HoverScale scale={1.01}>
        <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-16">
          {/* Image */}
          <motion.div 
            style={{ y }}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary ${
              index % 2 === 1 ? "md:order-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-serif text-muted-foreground/20">
                0{project.id}
              </span>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
              <Magnetic>
                <a
                  href={project.link}
                  className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform"
                  data-cursor-hover
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={project.github}
                  className="w-14 h-14 rounded-full bg-secondary text-foreground flex items-center justify-center hover:scale-110 transition-transform"
                  data-cursor-hover
                >
                  <Github className="w-5 h-5" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Content */}
          <div className={index % 2 === 1 ? "md:order-1 md:text-right" : ""}>
            <span className="text-accent text-sm font-mono mb-4 block">
              0{project.id}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>
            <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-xs bg-secondary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </HoverScale>
      
      {/* Divider */}
      <div className="h-px bg-border" />
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <FadeIn>
              <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
                Selected Work
              </p>
            </FadeIn>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              <TextReveal delay={0.1}>
                Featured Projects
              </TextReveal>
            </h2>
          </div>

          <FadeIn delay={0.3} className="mt-6 md:mt-0">
            <Magnetic>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2"
                data-cursor-hover
              >
                View all projects
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Magnetic>
          </FadeIn>
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} index={index} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

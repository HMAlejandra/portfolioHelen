"use client"

import { FadeIn, TextReveal, StaggerChildren, staggerItem, LineReveal } from "@/components/animations"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const experiences = [
  {
    period: "2023 — Present",
    role: "Senior Software Engineer",
    company: "Tech Company",
    companyUrl: "#",
    description: "Leading development of core platform features, mentoring junior developers, and establishing engineering best practices.",
    technologies: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    period: "2021 — 2023",
    role: "Software Engineer",
    company: "Startup Inc",
    companyUrl: "#",
    description: "Built and scaled backend services handling millions of requests. Implemented CI/CD pipelines and monitoring solutions.",
    technologies: ["Go", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    period: "2019 — 2021",
    role: "Frontend Developer",
    company: "Digital Agency",
    companyUrl: "#",
    description: "Developed responsive web applications for various clients. Focused on performance optimization and accessibility.",
    technologies: ["Vue.js", "Nuxt", "SCSS", "GraphQL"],
  },
  {
    period: "2018 — 2019",
    role: "Junior Developer",
    company: "Web Studio",
    companyUrl: "#",
    description: "Started my professional journey building websites and learning modern development practices.",
    technologies: ["JavaScript", "React", "CSS", "PHP"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeIn>
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
              Experience
            </p>
          </FadeIn>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            <TextReveal delay={0.1}>
              Where I have worked
            </TextReveal>
          </h2>
        </div>

        <StaggerChildren className="space-y-0" staggerDelay={0.1}>
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={staggerItem}>
              <div className="group py-8 md:py-12">
                <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
                  {/* Period */}
                  <div className="text-sm text-muted-foreground font-mono">
                    {exp.period}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                      <h3 className="text-xl md:text-2xl font-serif group-hover:text-accent transition-colors">
                        {exp.role}
                      </h3>
                      <a 
                        href={exp.companyUrl}
                        className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        data-cursor-hover
                      >
                        {exp.company}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs bg-secondary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <LineReveal delay={index * 0.1} />
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, TextReveal, Magnetic } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, MessageSquare, Twitter } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { 
    name: "GitHub", 
    url: "https://github.com/helenmoncayo", 
    icon: Github, 
    label: "source_code" 
  },
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/in/helenmoncayo", 
    icon: Linkedin, 
    label: "professional_net" 
  },
]

// --- COMPONENTE DE LA TARJETA "ESCAPISTA" CORREGIDO ---
function EscapeCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    const maxMove = 80;
    const newX = (Math.random() - 0.5) * maxMove * 2;
    const newY = (Math.random() - 0.5) * maxMove * 2;
    setPosition({ x: newX, y: newY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div 
      ref={cardRef}
      // Corregimos la animación aquí para que TypeScript no de error
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="p-8 rounded-sm border border-[#111111]/10 backdrop-blur-sm relative overflow-hidden group shadow-2xl"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} 
    >
      <div className="absolute top-0 right-0 p-4 font-mono text-[40px] text-[#111111] opacity-[0.03] select-none">
        UCC
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
        <span className="text-[#111111] font-mono text-[10px] tracking-[0.2em] uppercase">
          System_Status: Online
        </span>
      </div>
      
      <h4 className="text-[#111111] text-xl font-serif mb-2 text-left">Available for new challenges</h4>
      <p className="text-[#111111]/70 text-xs leading-relaxed font-mono text-left">
        {`> Location: Pasto, Colombia`} <br />
        {`> Latency: Low`} <br />
        {`> Focus: Web & AI Solutions`}
      </p>

      <div className="mt-6 h-[2px] bg-[#111111]/5 w-full">
        <motion.div 
          className="h-full bg-[#ff4d00]" 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}

export function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section 
      id="contact" 
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: '#fcfaf7' }}
    >
      {/* Decoración de fondo */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <path d="M0 600h300v-200h400v-400" fill="none" stroke="#ff4d00" strokeWidth="1" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-40">
          
          {/* Lado Izquierdo */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[#ff4d00]" />
                <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">
                  Network_Protocol
                </p>
              </div>
            </FadeIn>
            
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] text-[#111111] mb-12">
              <TextReveal>{`Let's work`}</TextReveal> <br />
              <span className="text-[#ff4d00] italic"><TextReveal delay={0.2}>together</TextReveal></span>
            </h2>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff4d00]/20 pl-8 mb-16">
                <p className="text-xl text-[#111111]/70 leading-relaxed italic max-w-md">
                  Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Magnetic>
                <a
                  href="mailto:helenmoncayo@gmail.com"
                  className="group inline-flex items-center gap-6"
                >
                  <span className="w-20 h-20 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#ff4d00] transition-all duration-500 shadow-2xl">
                    <Mail className="w-8 h-8" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[#ff4d00] font-mono text-[10px] mb-1">Direct_Access:</span>
                    <span className="text-2xl md:text-3xl font-serif text-[#111111]">
                      helenmoncayo@gmail.com
                    </span>
                  </div>
                </a>
              </Magnetic>
            </FadeIn>
          </div>

          {/* Lado Derecho */}
          <div className="lg:pt-24 space-y-20">
            <div className="space-y-2">
              {socialLinks.map((link, index) => (
                <FadeIn key={link.name} delay={0.4 + index * 0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-6 hover:translate-x-2 transition-all duration-500"
                  >
                    <div className="flex items-center gap-6">
                      <link.icon className="w-6 h-6 text-[#111111]/30 group-hover:text-[#ff4d00] transition-colors" />
                      <span className="text-2xl font-serif text-[#111111]">{link.name}</span>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[#111111]/20 group-hover:text-[#ff4d00]" />
                  </a>
                  <div className="h-[1px] bg-[#111111]/5 w-full" />
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.8}>
               <EscapeCard />
            </FadeIn>
          </div>
        </div>

        {/* --- FOOTER INSPIRADO EN ALESSANDRO --- */}
        <div className="border-t border-[#111111]/10 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[#111111]">
          <div className="flex flex-col gap-6">
            <div className="font-serif text-4xl font-black italic">HM.</div>
            <p className="text-sm leading-relaxed text-[#111111]/60 max-w-xs">
              I&apos;m Helen — a Software Engineer passionate about web design and AI-driven solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-mono text-[10px] font-bold tracking-widest text-[#111111]/40 uppercase">General</h5>
            <Link href="/" className="block text-sm hover:text-[#ff4d00] transition-colors">Home</Link>
            <Link href="#about" className="block text-sm hover:text-[#ff4d00] transition-colors">About</Link>
            <Link href="#projects" className="block text-sm hover:text-[#ff4d00] transition-colors">Projects</Link>
          </div>

          <div className="space-y-4">
            <h5 className="font-mono text-[10px] font-bold tracking-widest text-[#111111]/40 uppercase">Resources</h5>
            <Link href="#" className="block text-sm hover:text-[#ff4d00] transition-colors">Bucket List</Link>
            <Link href="#" className="block text-sm hover:text-[#ff4d00] transition-colors">My Setup</Link>
          </div>

          <div className="space-y-4">
            <h5 className="font-mono text-[10px] font-bold tracking-widest text-[#111111]/40 uppercase">More</h5>
            <Link href="#" className="block text-sm hover:text-[#ff4d00] transition-colors">Links</Link>
            <Link href="#" className="block text-sm hover:text-[#ff4d00] transition-colors">Attribution</Link>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#111111]/5 flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-mono text-[#111111]/40 tracking-widest uppercase">
            <p>© {currentYear} Alessandro Argenziano. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[#111111]">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#111111]">Terms & Conditions</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-[#111111]/40">
             <Link href="https://linkedin.com/in/helenmoncayo" target="_blank"><Linkedin className="w-4 h-4 hover:text-[#ff4d00]" /></Link>
             <Link href="https://github.com/helenmoncayo" target="_blank"><Github className="w-4 h-4 hover:text-[#ff4d00]" /></Link>
             <div className="w-[1px] h-4 bg-[#111111]/10" />
             <Twitter className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
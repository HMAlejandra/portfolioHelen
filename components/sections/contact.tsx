"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, TextReveal, Magnetic, LineReveal } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link" // Importamos Link para Next.js

const socialLinks = [
  { 
    name: "GitHub", 
    url: "https://github.com/helenmoncayo", // Tu link real
    icon: Github 
  },
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/in/helenmoncayo", // Tu link real
    icon: Linkedin 
  },
]

// --- COMPONENTE DE LA TARJETA "ESCAPISTA" ---
// Usamos lógica avanzada de Framer Motion para la animación
function EscapeCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Función para calcular el movimiento al hacer hover
  const handleMouseEnter = () => {
    const card = cardRef.current
    if (!card) return

    // Obtenemos las dimensiones de la tarjeta
    const rect = card.getBoundingClientRect()
    const cardWidth = rect.width
    const cardHeight = rect.height

    // El cuadro intentará "escapar" 100px en una dirección aleatoria
    // pero asegurándonos de que no desaparezca del todo
    const maxMoveX = 100
    const maxMoveY = 100

    // Calculamos nuevas coordenadas aleatorias pero controladas
    const newX = (Math.random() - 0.5) * maxMoveX * 2
    const newY = (Math.random() - 0.5) * maxMoveY * 2

    // Actualizamos la posición con animación spring suave
    setPosition({ x: newX, y: newY })
  }

  // Función para resetear la posición cuando el cursor se va
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div 
      ref={cardRef}
      delay={0.8}
      className="p-8 rounded-sm bg-white/50 border border-[#111111]/10 backdrop-blur-sm relative overflow-hidden group shadow-2xl"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }} // Beige claro translúcido
      
      // CONFIGURACIÓN DE ANIMACIÓN JUGUETONA
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 15 }} // Animación 'Spring' muy responsive
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decoración técnica interna */}
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
      
      <h4 className="text-[#111111] text-xl font-serif mb-2">Available for logical challenges</h4>
      <p className="text-[#111111]/70 text-xs leading-relaxed font-mono">
        {`> Location: Pasto, Colombia`} <br />
        {`> Response_Latency: Low`} <br />
        {`> Current_Focus: Web_Architecture & AI`}
      </p>

      {/* Barra de energía naranja animada */}
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
// --- FIN DEL COMPONENTE ESCAPISTA ---


export function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section 
      id="contact" 
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: '#fcfaf7' }} // Fondo beige sofisticado
    >
      {/* --- DECORACIÓN TÉCNICA (PCB) --- */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <path d="M0 600h300v-200h400v-400" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="700" cy="0" r="4" fill="#ff4d00" />
      </svg>
      <div className="absolute top-20 right-[5%] font-mono text-[#ff4d00] opacity-[0.04] text-[18vw] select-none uppercase">
        CONTACT
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col h-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start flex-grow">
          
          {/* COLUMNA IZQUIERDA: Mensaje Principal */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[#ff4d00]" />
                <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">
                  Network_Protocol
                </p>
              </div>
            </FadeIn>
            
            {/* HEMOS MANTENIDO EL "Let's work together" */}
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] text-[#111111] mb-12">
              <TextReveal>{`Let's work`}</TextReveal> <br />
              <span className="text-[#ff4d00] italic"><TextReveal delay={0.2}>together</TextReveal></span>
            </h2>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff4d00]/20 pl-8 mb-16">
                <p className="text-xl text-[#111111]/70 leading-relaxed italic max-w-md">
                  {`Whether it's a logical software architecture challenge, an innovative research partnership, or just a техническое interview, my inbox is open.`}
                </p>
              </div>
            </FadeIn>

            {/* Email Magnético */}
            <FadeIn delay={0.6}>
              <Magnetic>
                <a
                  href="mailto:helenmoncayo@gmail.com" // Tu email real
                  target="_blank"
                  className="group inline-flex items-center gap-6"
                  data-cursor-hover
                >
                  <span className="w-20 h-20 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Mail className="w-8 h-8" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[#ff4d00] font-mono text-[10px] mb-1">Direct_Access:</span>
                    <span className="text-2xl md:text-3xl font-serif text-[#111111] border-b-2 border-transparent group-hover:border-[#ff4d00] transition-all">
                      helenmoncayo@gmail.com
                    </span>
                  </div>
                </a>
              </Magnetic>
            </FadeIn>
          </div>

          {/* COLUMNA DERECHA: Social & Status (con animación escapista) */}
          <div className="lg:pt-24 space-y-20">
            {/* Social Links con efecto hover pro */}
            <div className="space-y-2">
              <FadeIn delay={0.3}>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#111111]/40 mb-8 flex items-center gap-2">
                   External_Nodes
                </p>
              </FadeIn>

              {socialLinks.map((link, index) => (
                <FadeIn key={link.name} delay={0.4 + index * 0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-6 hover:translate-x-2 transition-all duration-500"
                    data-cursor-hover
                  >
                    <div className="flex items-center gap-6">
                      <link.icon className="w-6 h-6 text-[#111111]/30 group-hover:text-[#ff4d00] transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-[#ff4d00] opacity-0 group-hover:opacity-100 transition-opacity">
                          {`./connect --helen`}
                        </span>
                        <span className="text-2xl font-serif text-[#111111]">
                          {link.name}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-[#111111]/5 flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all">
                      <ArrowUpRight className="w-5 h-5 text-[#111111] group-hover:text-white transition-colors" />
                    </div>
                  </a>
                  <div className="h-[1px] bg-[#111111]/5 w-full relative">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute inset-0 bg-[#ff4d00]/20 origin-left" 
                    />
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* --- COMPONENTE DE TARJETA CON ANIMACIÓN ESCAPISTA (Beige Claro, Pro) --- */}
            <FadeIn>
              <EscapeCard />
            </FadeIn>
          </div>
        </div>

        {/* --- EL FOOTER COMPLETO (Estructura de la imagen con tus datos) --- */}
        <div className="mt-40 border-t border-[#111111]/10 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[#111111]">
          
          {/* Columna 1: Logo y Bio (Adaptado para ti) */}
          <div className="flex flex-col gap-6 max-w-xs">
            {/* Logo de ingeniería simple (como en la imagen, minimalista) */}
            <div className="font-serif text-3xl font-black text-[#111111]">HM.</div>
            
            <p className="text-sm leading-relaxed text-[#111111]/70">
              I&apos;m Helen Moncayo — a logical Software Engineer and creative developer. Thanks for checking out my logic!
            </p>
          </div>

          {/* Columna 2: Navegación General */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs tracking-widest text-[#111111]/40 uppercase mb-6">General</h5>
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Projects", href: "/projects" }
            ].map(link => (
              <Link key={link.name} href={link.href} className="block text-base hover:text-[#ff4d00] transition-colors">{link.name}</Link>
            ))}
          </div>

          {/* Columna 3: Recursos y Setup */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs tracking-widest text-[#111111]/40 uppercase mb-6">Resources</h5>
            {[
              { name: "Engineering Setup", href: "/setup" },
              { name: "Logical Bucket List", href: "/bucket-list" }
            ].map(link => (
              <Link key={link.name} href={link.href} className="block text-base hover:text-[#ff4d00] transition-colors">{link.name}</Link>
            ))}
          </div>

          {/* Columna 4: Más y Atribución */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs tracking-widest text-[#111111]/40 uppercase mb-6">More</h5>
            {[
              { name: "Important Links", href: "/links" },
              { name: "Attribution", href: "/attribution" },
              { name: "Code Runner Live Demo", href: "/code-runner" }
            ].map(link => (
              <Link key={link.name} href={link.href} className="block text-base hover:text-[#ff4d00] transition-colors">{link.name}</Link>
            ))}
          </div>
        </div>

        {/* --- LA LÍNEA FINAL DEL FOOTER (Copyright y Social Icons) --- */}
        <div className="mt-16 pt-8 border-t border-[#111111]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright y Políticas */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-[11px] font-mono text-[#111111]/60 uppercase tracking-widest">
            <p>© {currentYear} Helen Moncayo — Logic Engineer Portfolio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#ff4d00]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#ff4d00]">Terms & Conditions</Link>
            </div>
          </div>

          {/* Iconos Sociales Finales (Minimalistas como en la imagen) */}
          <div className="flex gap-5 text-[#111111]/50">
             <a href="https://linkedin.com/in/helenmoncayo" target="_blank" className="hover:text-[#ff4d00]"><Linkedin className="w-4 h-4" /></a>
             <a href="https://github.com/helenmoncayo" target="_blank" className="hover:text-[#ff4d00]"><Github className="w-4 h-4" /></a>
             {/* Icono de modo oscuro (como en la imagen, decorativo) */}
             <div className="w-[1px] h-4 bg-[#111111]/10 mx-1" />
             <Twitter className="w-4 h-4 opacity-30" />
          </div>
        </div>

      </div>
    </section>
  )
}
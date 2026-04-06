"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { FadeIn, TextReveal, Magnetic } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, ArrowUp, Sun, Moon } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { name: "GitHub", url: "https://github.com/helenmoncayo", icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/helenmoncayo", icon: Linkedin },
]

function EscapeCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleMouseEnter = () => {
    const move = 90
    setPosition({ x: (Math.random() - 0.5) * move * 2, y: (Math.random() - 0.5) * move * 2 })
  }
  return (
    <motion.div 
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      className="p-8 rounded-sm border border-current/10 backdrop-blur-md relative overflow-hidden shadow-2xl bg-white/40 dark:bg-black/20"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">System_Status: Online</span>
      </div>
      <h4 className="text-xl font-serif mb-2">Available for new challenges</h4>
      <p className="text-xs font-mono opacity-60 leading-relaxed italic text-left">
        {`> Location: Pasto, Colombia`} <br /> {`> Focus: Software & AI`}
      </p>
    </motion.div>
  )
}

export function Contact() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const currentYear = new Date().getFullYear()

  return (
    <section id="contact" className={`py-32 md:py-48 px-6 md:px-12 lg:px-24 relative transition-colors duration-700 ${theme === 'dark' ? 'bg-[#111] text-white' : 'bg-[#fcfaf7] text-[#111]'}`}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 mb-40">
          <div>
            {/* SOLUCIÓN AL CORTE: Añadimos pr-10 para que la cursiva no se corte */}
            <h2 className="text-6xl md:text-8xl font-serif leading-[1.2] mb-12 pr-10">
  {/* Primera línea normal */}
  <div className="overflow-visible">
    <TextReveal>{`Let's work`}</TextReveal>
  </div>
  
  {/* Segunda línea corregida para que NO se corte */}
  <span className="text-[#ff4d00] italic block mt-4 overflow-visible px-6 -ml-6">
    <motion.div 
      className="overflow-visible" 
      style={{ display: 'inline-block' }}
    >
      <TextReveal delay={0.2}>together</TextReveal>
    </motion.div>
  </span>
</h2>
            
            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff4d00] pl-8 mb-12 opacity-70 italic text-xl max-w-md">
                My inbox is always open for logical challenges and architectural discussions.
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Magnetic>
                <a href="mailto:helenmoncayo@gmail.com" className="group flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-current flex items-center justify-center text-background group-hover:bg-[#ff4d00] transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xl md:text-2xl font-serif border-b border-transparent group-hover:border-[#ff4d00] break-all">
                    helenmoncayo@gmail.com
                  </span>
                </a>
              </Magnetic>
            </FadeIn>
          </div>

          <div className="lg:pt-20 space-y-12">
            <div className="space-y-2">
              {socialLinks.map((link, i) => (
                <FadeIn key={link.name} delay={0.4 + i * 0.1}>
                  <a href={link.url} target="_blank" className="flex items-center justify-between py-6 border-b border-current/5 hover:text-[#ff4d00] transition-colors">
                    <div className="flex items-center gap-4">
                      <link.icon className="w-5 h-5 opacity-40" />
                      <span className="text-2xl font-serif">{link.name}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-20" />
                  </a>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.8}><EscapeCard /></FadeIn>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="border-t border-current/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-6">
            <div className="font-serif text-4xl font-black italic">HM.</div>
            <p className="text-sm opacity-60 max-w-xs">
              I&apos;m Helen — a Software Engineer focused on web design and intelligent systems.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="font-mono text-[10px] font-bold tracking-widest opacity-40 uppercase">General</h5>
            <Link href="/" className="block text-sm hover:text-[#ff4d00]">Home</Link>
            <Link href="#about" className="block text-sm hover:text-[#ff4d00]">About</Link>
            <Link href="#projects" className="block text-sm hover:text-[#ff4d00]">Projects</Link>
          </div>
          <div className="space-y-2 text-right md:text-left">
            <h5 className="font-mono text-[10px] font-bold tracking-widest opacity-40 uppercase mb-4">Connect</h5>
            <p className="text-sm opacity-60">Pasto, Nariño — Colombia</p>
            <p className="text-sm text-[#ff4d00] font-mono tracking-tighter">Local Time: UTC-5</p>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-current/5 flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
          <div className="flex items-center gap-8 text-[10px] font-mono opacity-40 uppercase tracking-widest">
            <p>© {currentYear} Helen Moncayo. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-current/5 p-1 rounded-full border border-current/10">
              <button onClick={() => setTheme('light')} className={`p-2 rounded-full ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'opacity-40'}`}>
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setTheme('dark')} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#ff4d00] text-white shadow-sm' : 'opacity-40'}`}>
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <Magnetic>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center hover:bg-[#ff4d00] hover:text-white transition-all group">
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Magnetic>

            <div className="flex items-center gap-4 opacity-40">
              <Link href="https://linkedin.com/in/helenmoncayo"><Linkedin className="w-4 h-4 hover:text-[#ff4d00]" /></Link>
              <Link href="https://github.com/helenmoncayo"><Github className="w-4 h-4 hover:text-[#ff4d00]" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
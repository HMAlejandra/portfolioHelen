"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FadeIn, TextReveal, Magnetic } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, ArrowUp, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useLang, useTheme } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"

const socialLinks = [
  { name: "GitHub",   url: "https://github.com/helenmoncayo",    icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/helenmoncayo", icon: Linkedin },
]

function EscapeCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { t } = useLang()
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
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">{t("contact.status")}</span>
      </div>
      <h4 className="text-xl font-serif mb-2">{t("contact.available")}</h4>
      <p className="text-xs font-mono opacity-60 leading-relaxed italic text-left">
        {t("contact.loc")} <br /> {t("contact.focus")}
      </p>
    </motion.div>
  )
}

export function Contact() {
  const { t } = useLang()
  const { theme, setTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative transition-colors duration-700 bg-[#fcfaf7] dark:bg-[#111] text-[#111] dark:text-white">
      {/* Fondo animado */}
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 mb-40">
          <div>
            <h2 className="text-6xl md:text-8xl font-serif leading-[1.2] mb-12 pr-10">
              <div className="overflow-visible">
                <TextReveal>{t("contact.title1")}</TextReveal>
              </div>
              <span className="text-[#ff4d00] italic block mt-4 overflow-visible px-6 -ml-6">
                <motion.div className="overflow-visible" style={{ display: "inline-block" }}>
                  <TextReveal delay={0.2}>{t("contact.title2")}</TextReveal>
                </motion.div>
              </span>
            </h2>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff4d00] pl-8 mb-12 opacity-70 italic text-xl max-w-md">
                {t("contact.subtitle")}
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

        {/* FOOTER dentro del Contact */}
        <div className="border-t border-current/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-6">
            <div className="font-serif text-4xl font-black italic">HM.</div>
            <p className="text-sm opacity-60 max-w-xs">{t("footer.bio")}</p>
            <p className="text-xs opacity-40 font-mono">{t("footer.built")}</p>
          </div>

          <div className="space-y-4">
            <h5 className="font-mono text-[10px] font-bold tracking-widest opacity-40 uppercase">{t("footer.general")}</h5>
            <Link href="/" className="block text-sm hover:text-[#ff4d00] transition-colors">{t("footer.home")}</Link>
            <Link href="#about" className="block text-sm hover:text-[#ff4d00] transition-colors">{t("footer.about")}</Link>
            <Link href="#projects" className="block text-sm hover:text-[#ff4d00] transition-colors">{t("footer.projects")}</Link>
            <Link href="#experience" className="block text-sm hover:text-[#ff4d00] transition-colors">{t("nav.experience")}</Link>
            <Link href="#contact" className="block text-sm hover:text-[#ff4d00] transition-colors">{t("nav.contact")}</Link>
          </div>

          <div className="space-y-2">
            <h5 className="font-mono text-[10px] font-bold tracking-widest opacity-40 uppercase mb-4">{t("footer.connect")}</h5>
            <p className="text-sm opacity-60">Pasto, Nariño — Colombia</p>
            <p className="text-sm text-[#ff4d00] font-mono tracking-tighter">{t("footer.timezone")}</p>
            <div className="pt-4 flex gap-4">
              <a href="https://linkedin.com/in/helenmoncayo" target="_blank" className="opacity-60 hover:text-[#ff4d00] hover:opacity-100 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/helenmoncayo" target="_blank" className="opacity-60 hover:text-[#ff4d00] hover:opacity-100 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:helenmoncayo@gmail.com" className="opacity-60 hover:text-[#ff4d00] hover:opacity-100 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-current/5 flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
          <div className="flex items-center gap-8 text-[10px] font-mono opacity-40 uppercase tracking-widest">
            <p>© {currentYear} Helen Moncayo. {t("footer.rights")}</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme toggle conectado al sistema global */}
            <div className="flex items-center bg-current/5 p-1 rounded-full border border-current/10">
              <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-full transition-all ${theme === "light" ? "bg-white text-black shadow-sm" : "opacity-40"}`}
                title="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-full transition-all ${theme === "dark" ? "bg-[#ff4d00] text-white shadow-sm" : "opacity-40"}`}
                title="Dark mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <Magnetic>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] transition-all group"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FadeIn, Magnetic } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, ArrowUp, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useLang, useTheme } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"

const socialLinks = [
  { name: "GitHub",   url: "https://github.com/HMAlejandra",         icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/helenmoncayo",   icon: Linkedin },
]

function EscapeCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { t } = useLang()

  const handleMouseEnter = () => {
    // En móvil no se mueve para evitar overflow
    if (window.innerWidth < 768) return
    const move = 60
    setPosition({ x: (Math.random() - 0.5) * move * 2, y: (Math.random() - 0.5) * move * 2 })
  }

  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      className="p-6 md:p-8 rounded-sm border border-current/10 backdrop-blur-md relative shadow-2xl bg-white/40 dark:bg-black/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="relative flex h-3 w-3 flex-shrink-0">
          <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative h-3 w-3 rounded-full bg-green-500" />
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-70 truncate">
          {t("contact.status")}
        </span>
      </div>
      <h4 className="text-lg md:text-xl font-serif mb-2">{t("contact.available")}</h4>
      <p className="text-xs font-mono opacity-60 leading-relaxed italic">
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
    <section
      id="contact"
      className="py-20 md:py-32 lg:py-48 px-4 sm:px-6 md:px-12 lg:px-24 relative transition-colors duration-700 bg-[#fcfaf7] dark:bg-[#111] text-[#111] dark:text-white overflow-hidden"
    >
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Sección Contact ── */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-20 md:mb-32 lg:mb-40">

          {/* Columna izquierda */}
          <div className="min-w-0">

            {/* Título — clamp para que no haga overflow en móvil */}
            <h2
              className="font-serif leading-[1.1] mb-8 md:mb-12 overflow-visible"
              style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)", paddingBottom: "0.1em" }}
            >
              <div className="overflow-visible">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  {t("contact.title1")}
                </motion.span>
              </div>
              <motion.span
                className="text-[#ff4d00] italic block mt-1 overflow-visible"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                {t("contact.title2")}
              </motion.span>
            </h2>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff4d00] pl-5 md:pl-8 mb-10 md:mb-12 opacity-70 italic text-base md:text-xl max-w-md">
                {t("contact.subtitle")}
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <a
                href="mailto:helenmoncayo@gmail.com"
                className="group flex items-center gap-4 md:gap-6 min-w-0"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-current flex items-center justify-center text-background group-hover:bg-[#ff4d00] transition-all duration-500 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                {/* Email — break-all evita overflow */}
                <span className="text-base md:text-xl lg:text-2xl font-serif border-b border-transparent group-hover:border-[#ff4d00] break-all min-w-0">
                  helenmoncayo@gmail.com
                </span>
              </a>
            </FadeIn>
          </div>

          {/* Columna derecha */}
          <div className="lg:pt-20 space-y-8 md:space-y-12 min-w-0">
            <div className="space-y-0">
              {socialLinks.map((link, i) => (
                <FadeIn key={link.name} delay={0.4 + i * 0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-5 md:py-6 border-b border-current/5 hover:text-[#ff4d00] transition-colors"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <link.icon className="w-5 h-5 opacity-40 flex-shrink-0" />
                      <span className="text-xl md:text-2xl font-serif">{link.name}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-20 flex-shrink-0" />
                  </a>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.8}>
              <EscapeCard />
            </FadeIn>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-current/10 pt-12 md:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">

          {/* Bio */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="font-serif text-3xl md:text-4xl font-black italic">HM.</div>
            <p className="text-sm opacity-60 max-w-xs leading-relaxed">{t("footer.bio")}</p>
            <p className="text-xs opacity-40 font-mono">{t("footer.built")}</p>
          </div>

          {/* Links generales */}
          <div className="space-y-3 md:space-y-4">
            <h5 className="font-mono text-[10px] font-bold tracking-widest opacity-40 uppercase">
              {t("footer.general")}
            </h5>
            {[
              { href: "/",           label: t("footer.home") },
              { href: "#about",      label: t("footer.about") },
              { href: "#projects",   label: t("footer.projects") },
              { href: "#experience", label: t("nav.experience") },
              { href: "#contact",    label: t("nav.contact") },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-sm hover:text-[#ff4d00] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div className="space-y-2 sm:col-span-2 md:col-span-1">
            <h5 className="font-mono text-[10px] font-bold tracking-widest opacity-40 uppercase mb-3 md:mb-4">
              {t("footer.connect")}
            </h5>
            <p className="text-sm opacity-60">Pasto, Nariño — Colombia</p>
            <p className="text-sm text-[#ff4d00] font-mono">{t("footer.timezone")}</p>
            <div className="pt-3 md:pt-4 flex gap-4">
              <a href="https://linkedin.com/in/helenmoncayo" target="_blank" rel="noopener noreferrer"
                className="opacity-60 hover:text-[#ff4d00] hover:opacity-100 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/HMAlejandra" target="_blank" rel="noopener noreferrer"
                className="opacity-60 hover:text-[#ff4d00] hover:opacity-100 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:helenmoncayo@gmail.com"
                className="opacity-60 hover:text-[#ff4d00] hover:opacity-100 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-current/5 flex flex-col sm:flex-row justify-between items-center gap-6 pb-8 md:pb-12">

          {/* Copyright — en móvil texto más compacto */}
          <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-center sm:text-left">
            © {currentYear} Helen Moncayo. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Theme toggle */}
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

            {/* Scroll to top */}
            <Magnetic>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-current/20 flex items-center justify-center hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] transition-all group"
              >
                <ArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
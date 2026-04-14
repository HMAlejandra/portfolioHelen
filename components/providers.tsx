"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Lang = "en" | "es"

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // NAV
  "nav.about":        { en: "About",        es: "Sobre mí" },
  "nav.projects":     { en: "Projects",     es: "Proyectos" },
  "nav.experience":   { en: "Experience",   es: "Experiencia" },
  "nav.testimonials": { en: "Testimonials", es: "Testimonios" },
  "nav.contact":      { en: "Contact",      es: "Contacto" },

  // HERO
  "hero.role":        { en: "Software Engineer & Creative Developer", es: "Ingeniería de Software & Desarrolladora Creativa" },
  "hero.tagline":     { en: "Building digital experiences that merge creativity, technology, and human-centered design.", es: "Creando experiencias digitales que fusionan creatividad, tecnología y diseño centrado en las personas." },
  "hero.cta.work":    { en: "View My Work", es: "Ver mi trabajo" },
  "hero.cta.contact": { en: "Get in touch", es: "Contáctame" },
  "hero.scroll":      { en: "Scroll", es: "Bajar" },

  // ABOUT
  "about.label":      { en: "System.About_Profile", es: "Sistema.Perfil_Sobre_Mí" },
  "about.hello":      { en: "Hello,", es: "Hola," },
  "about.name":       { en: "I'm Helen", es: "Soy Helen" },
  "about.headline":   { en: "I design and build digital experiences that merge design, technology, and intelligent systems.", es: "Diseño y construyo experiencias digitales que fusionan diseño, tecnología y sistemas inteligentes." },
  "about.bio":        { en: "I'm a software engineer passionate about web design and AI-driven solutions, focused on creating interactive and visually refined experiences.", es: "Soy una ingeniería de software apasionada por el diseño web y las soluciones impulsadas por IA, enfocada en crear experiencias interactivas y visualmente refinadas." },
  "about.stack":      { en: "Technical_Stack", es: "Stack_Técnico" },
  "about.cv.cmd":     { en: "Execute: download_cv.exe", es: "Ejecutar: descargar_cv.exe" },
  "about.cv.btn":     { en: "Download Resume", es: "Descargar CV" },
  "about.location":   { en: "Location: Pasto, Colombia", es: "Ubicación: Pasto, Colombia" },
  "about.status":     { en: "Status: Engineering Student @ UCC", es: "Estado: Estudiante de Ing. @ UCC" },

  // PROJECTS
  "projects.label":   { en: "Development_Log", es: "Registro_Desarrollo" },
  "projects.title1":  { en: "Selected", es: "Proyectos" },
  "projects.title2":  { en: "Projects", es: "Seleccionados" },
  "projects.github":  { en: "View GitHub", es: "Ver GitHub" },
  "projects.root":    { en: "Root_Repo", es: "Repo_Raíz" },
  "projects.1.title": { en: "Code Runner: Invisible Master", es: "Code Runner: Maestro Invisible" },
  "projects.1.desc":  { en: "A narrative 2D puzzle game built to teach block-based programming concepts. Merging narrative with computational thinking.", es: "Un juego narrativo de puzzles 2D para enseñar programación por bloques. Fusiona narrativa con pensamiento computacional." },
  "projects.2.title": { en: "E-commerce System", es: "Sistema E-commerce" },
  "projects.2.desc":  { en: "Mobile-first platform with advanced filtering, search, and payment integration. Built for scale.", es: "Plataforma mobile-first con filtros avanzados, búsqueda e integración de pagos. Diseñada para escalar." },
  "projects.3.title": { en: "Research Analytics", es: "Analítica de Investigación" },
  "projects.3.desc":  { en: "Open source data tool for automating academic research workflows. Focused on UI/UX for scientists.", es: "Herramienta de datos open source para automatizar flujos de investigación académica. Enfocada en UI/UX para científicos." },
  "projects.4.title": { en: "Portfolio Core", es: "Núcleo del Portafolio" },
  "projects.4.desc":  { en: "Real-time analytics dashboard with beautiful visualizations and customizable widgets for system monitoring.", es: "Dashboard de analítica en tiempo real con visualizaciones hermosas y widgets personalizables para monitoreo de sistemas." },

  // EXPERIENCE
  "exp.title":        { en: "Where I've built", es: "Dónde he construido" },
  "exp.title2":       { en: "& learned",        es: "& aprendido" },

  // TESTIMONIALS
  "test.title":       { en: "What people",  es: "Lo que dicen" },
  "test.title2":      { en: "say about me", es: "de mí" },
  "test.system":      { en: "System.Social_Proof", es: "Sistema.Prueba_Social" },

  // CONTACT
  "contact.title1":    { en: "Let's work",   es: "Trabajemos" },
  "contact.title2":    { en: "together",     es: "juntas" },
  "contact.subtitle":  { en: "My inbox is always open for logical challenges and architectural discussions.", es: "Mi bandeja siempre está abierta para retos lógicos y discusiones de arquitectura." },
  "contact.status":    { en: "System_Status: Online", es: "Estado_Sistema: En línea" },
  "contact.available": { en: "Available for new challenges", es: "Disponible para nuevos retos" },
  "contact.loc":       { en: "> Location: Pasto, Colombia", es: "> Ubicación: Pasto, Colombia" },
  "contact.focus":     { en: "> Focus: Software & AI", es: "> Enfoque: Software & IA" },

  // FOOTER
  "footer.general":   { en: "General", es: "General" },
  "footer.connect":   { en: "Connect", es: "Conectar" },
  "footer.home":      { en: "Home", es: "Inicio" },
  "footer.about":     { en: "About", es: "Sobre mí" },
  "footer.projects":  { en: "Projects", es: "Proyectos" },
  "footer.bio":       { en: "I'm Helen — a Software Engineer focused on web design and intelligent systems.", es: "Soy Helen — Ingeniería de Software enfocada en diseño web y sistemas inteligentes." },
  "footer.rights":    { en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.built":     { en: "Designed & built with care", es: "Diseñado y construido con cariño" },
  "footer.timezone":  { en: "Local Time: UTC-5", es: "Hora local: UTC-5" },
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
})

export function useLang() {
  return useContext(LangContext)
}

interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (t: "light" | "dark") => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const [theme, setThemeState] = useState<"light" | "dark">("light")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) {
      setThemeState(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    }
    const savedLang = localStorage.getItem("lang") as Lang | null
    if (savedLang) setLang(savedLang)
  }, [])

  const setTheme = (next: "light" | "dark") => {
    setThemeState(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    localStorage.setItem("theme", next)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  )
}
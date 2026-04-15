"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { FadeIn, StoryTextReveal } from "@/components/animations"
import { useLang } from "@/components/providers"
import { AnimatedBackground } from "@/components/animated-background"
import {
  Palette, Code2, Layers, GitBranch, Database,
  GraduationCap, Target, ChevronDown, CheckCircle2
} from "lucide-react"

// ─── Contador animado ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (1800 / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])
  return <span ref={ref} className="font-serif font-black text-[#ff4d00]">{count}{suffix}</span>
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="flex flex-col items-center justify-center p-5 rounded-sm border border-[#ff4d00]/20 bg-[#ff4d00]/[0.03] hover:bg-[#ff4d00]/[0.07] hover:border-[#ff4d00]/40 transition-all duration-500 group"
    >
      <div className="text-3xl md:text-4xl font-black mb-1 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#111111]/50 dark:text-white/50 text-center leading-tight">{label}</p>
    </motion.div>
  )
}

// ─── Acordeón item ───────────────────────────────────────────────────────────
function AccordionItem({
  icon, title, tags, isOpen, onClick, delay
}: {
  icon: React.ReactNode
  title: string
  tags: string[]
  isOpen: boolean
  onClick: () => void
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-sm border transition-all duration-400 overflow-hidden ${
        isOpen
          ? "border-[#ff4d00]/50 bg-[#ff4d00]/[0.05]"
          : "border-[#111111]/10 dark:border-white/10 bg-transparent hover:border-[#ff4d00]/20"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-[#ff4d00] text-white" : "bg-[#ff4d00]/10 text-[#ff4d00] group-hover:bg-[#ff4d00]/20"
          }`}>
            {icon}
          </div>
          <span className={`text-sm font-black uppercase tracking-widest transition-colors duration-300 ${
            isOpen ? "text-[#ff4d00]" : "text-[#111111] dark:text-white group-hover:text-[#ff4d00]"
          }`}>
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? "text-[#ff4d00]" : "text-[#111111]/40 dark:text-white/40"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="px-5 pb-5 pt-1">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="px-3 py-1 text-[10px] font-mono font-bold rounded-full border border-[#ff4d00]/40 text-[#ff4d00] bg-[#ff4d00]/[0.07] tracking-wider"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Panel de Metas ──────────────────────────────────────────────────────────
function MetaItem({ text, done, delay }: { text: string; done: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`flex items-start gap-3 p-4 rounded-sm border transition-all duration-300 ${
        done
          ? "border-[#ff4d00]/40 bg-[#ff4d00]/[0.05]"
          : "border-[#111111]/10 dark:border-white/10"
      }`}
    >
      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${done ? "text-[#ff4d00]" : "text-[#111111]/20 dark:text-white/20"}`} />
      <span className={`text-sm font-mono leading-snug ${done ? "text-[#111111] dark:text-white" : "text-[#111111]/50 dark:text-white/50"}`}>
        {text}
      </span>
    </motion.div>
  )
}

// ─── Datos ───────────────────────────────────────────────────────────────────
const softwareSkills = [
  { icon: <Palette className="w-4 h-4" />, title: "Diseño UI/UX",              tags: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Tailwind CSS"] },
  { icon: <Code2 className="w-4 h-4" />,  title: "Lenguajes de Programación",  tags: ["TypeScript", "JavaScript", "Python", "Java", "C++"] },
  { icon: <Layers className="w-4 h-4" />, title: "Estructuras de Datos",       tags: ["Arrays", "Listas", "Árboles", "Grafos", "Hash Maps"] },
  { icon: <span className="text-xs font-mono font-black">{"{}"}</span>, title: "Algoritmos", tags: ["Búsqueda", "Ordenamiento", "Recursión", "DP", "Greedy"] },
  { icon: <GitBranch className="w-4 h-4" />, title: "Control de Versiones (Git)", tags: ["Git", "GitHub", "GitFlow", "CI/CD", "GitHub Actions"] },
  { icon: <Database className="w-4 h-4" />, title: "Bases de Datos",           tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"] },
]

const studies = [
  { icon: <GraduationCap className="w-4 h-4" />, title: "Ingeniería de Software", tags: ["UCC — Universidad Cooperativa", "2022 — Presente", "Pasto, Colombia"] },
  { icon: <Code2 className="w-4 h-4" />,         title: "Desarrollo Web Full Stack", tags: ["Next.js", "React", "Node.js", "TailwindCSS", "AWS"] },
  { icon: <Palette className="w-4 h-4" />,       title: "Diseño & Experiencia de Usuario", tags: ["Figma", "UI/UX", "Prototipado", "Design Systems"] },
]

const metas = [
  { text: "Graduarme como Ingeniería de Software", done: false },
  { text: "Construir mi primer producto SaaS propio", done: false },
  { text: "Trabajar en una startup de tecnología internacional", done: false },
  { text: "Dominar el desarrollo de juegos con Unity y Godot", done: true },
  { text: "Contribuir a proyectos open source de impacto", done: false },
  { text: "Aprender inteligencia artificial aplicada a productos", done: true },
]

// ─── Tabs Panel ──────────────────────────────────────────────────────────────
const TABS = [
  { id: "skills",   label_en: "Software Skills",  label_es: "Habilidades de Software", icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "studies",  label_en: "Studies",           label_es: "Estudios",                icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: "goals",    label_en: "Goals",             label_es: "Metas",                   icon: <Target className="w-3.5 h-3.5" /> },
]

function SkillsPanel() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-2">
      {softwareSkills.map((s, i) => (
        <AccordionItem
          key={s.title}
          icon={s.icon}
          title={s.title}
          tags={s.tags}
          isOpen={open === i}
          onClick={() => setOpen(open === i ? null : i)}
          delay={i * 0.07}
        />
      ))}
    </div>
  )
}

function StudiesPanel() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-2">
      {studies.map((s, i) => (
        <AccordionItem
          key={s.title}
          icon={s.icon}
          title={s.title}
          tags={s.tags}
          isOpen={open === i}
          onClick={() => setOpen(open === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  )
}

function GoalsPanel() {
  return (
    <div className="space-y-2">
      {metas.map((m, i) => (
        <MetaItem key={i} text={m.text} done={m.done} delay={i * 0.07} />
      ))}
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────
export function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { t, lang } = useLang()
  const [activeTab, setActiveTab] = useState("skills")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { damping: 30, stiffness: 200 })
  const imgY = useSpring(useTransform(mouseY, [-300, 300], [-8, 8]), { damping: 30, stiffness: 200 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-[#f5f3ef] dark:bg-[#111111]"
    >
      <AnimatedBackground />

      {/* PCB lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-[1]">
        <path d="M0 100h200v300h100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="300" cy="400" r="3" fill="#ff4d00" />
        <path d="M1000 800h-200v-200h-100" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="700" cy="600" r="3" fill="#ff4d00" />
      </svg>
      <div className="absolute top-20 left-[10%] font-mono text-[#ff4d00] opacity-10 text-xs select-none z-[1]">{"<html>"}</div>
      <div className="absolute bottom-40 right-[5%] font-mono text-[#ff4d00] opacity-10 text-xl select-none z-[1]">{"{ }"}</div>
      <div className="absolute top-1/2 right-[15%] font-mono text-[#ff4d00] opacity-[0.04] text-4xl select-none z-[1]">0101</div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header label */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d00] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d00]" />
            </span>
            <span className="text-sm tracking-[0.3em] uppercase font-black text-[#111111]/40 dark:text-white/40">{t("about.label")}</span>
            <div className="h-[1px] flex-1 max-w-32 bg-[#ff4d00]/20" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* ── Col izquierda: foto + stats ── */}
          <div className="lg:col-span-5 relative space-y-8">
            <FadeIn delay={0.2}>
              <div className="relative group">
                <motion.div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#ff4d00] z-20" whileHover={{ scale: 1.2 }} />
                <motion.div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#ff4d00] z-20" whileHover={{ scale: 1.2 }} />

                <motion.div
                  className="absolute inset-0 rounded-sm z-[1]"
                  animate={{ boxShadow: ["0 0 0px rgba(255,77,0,0)", "0 0 40px rgba(255,77,0,0.15)", "0 0 0px rgba(255,77,0,0)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="relative z-10 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl bg-black"
                  style={{ x: imgX, y: imgY }}
                >
                  <div className="w-full h-full transition-all duration-700 group-hover:scale-105"
                    style={{ filter: "sepia(0.5) saturate(1.4) hue-rotate(-10deg) contrast(1.1)" }}>
                    <Image src="/retrato.png" alt="Helen Moncayo Portrait" fill className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff4d00]/20 to-transparent opacity-40 pointer-events-none" />

                  <motion.div
                    className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-sm px-4 py-3 border border-[#ff4d00]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] font-mono text-white/80 tracking-widest uppercase">{lang === "en" ? "Available for hire" : "Disponible para contratar"}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </FadeIn>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-pulse" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 dark:text-white/60">{t("about.location")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 dark:text-white/60">{t("about.status")}</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3"
            >
              <StatCard value={3}  suffix="+" label={lang === "en" ? "Years coding"   : "Años de código"}   delay={0.5} />
              <StatCard value={10} suffix="+" label={lang === "en" ? "Projects built" : "Proyectos"}          delay={0.6} />
              <StatCard value={5}  suffix="+" label={lang === "en" ? "Technologies"   : "Tecnologías"}        delay={0.7} />
            </motion.div>

            {/* CV download — columna izquierda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href="/CV_Helen_Moncayo.pdf"
                target="_blank"
                className="group flex items-center gap-5"
                whileHover={{ x: 6 }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-[#ff4d00] flex items-center justify-center group-hover:bg-[#ff4d00] transition-all duration-500">
                    <span className="text-[#ff4d00] group-hover:text-white text-lg transition-all">↓</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border border-[#ff4d00]/30 scale-125 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-[#ff4d00] mb-1">{t("about.cv.cmd")}</span>
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-[#111111] dark:text-white border-b-2 border-[#ff4d00]/0 group-hover:border-[#ff4d00] transition-all">
                    {t("about.cv.btn")}
                  </span>
                </div>
              </motion.a>
            </motion.div>
          </div>

          {/* ── Col derecha: texto + tabs acordeón ── */}
          <div className="lg:col-span-7 space-y-10">
            <FadeIn delay={0.3}>
              <h2 className="text-5xl md:text-7xl font-serif font-normal leading-[0.9] mb-12 text-[#111111] dark:text-white overflow-visible pb-2">
                {t("about.hello")} <br />
                <motion.span
                  className="text-[#ff4d00] inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {t("about.name")}
                </motion.span>
              </h2>
            </FadeIn>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border-l-4 border-[#ff4d00] pl-6 md:pl-10 py-4 bg-[#ff4d00]/[0.03] hover:bg-[#ff4d00]/[0.06] transition-colors duration-500"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.2] text-[#111111] dark:text-white">
                <StoryTextReveal delay={0.6}>{t("about.headline")}</StoryTextReveal>
              </p>
            </motion.div>

            <FadeIn delay={0.9} className="border-l-2 border-[#ff4d00]/20 pl-6 md:pl-10">
              <p className="text-lg md:text-xl text-[#111111]/70 dark:text-white/70 leading-relaxed italic">
                {t("about.bio")}
              </p>
            </FadeIn>

            {/* ── Tabs ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Tab bar */}
              <div className="flex items-center gap-1 mb-6 p-1 rounded-sm bg-[#111111]/5 dark:bg-white/5 border border-[#111111]/10 dark:border-white/10 w-fit">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-[#111111]/50 dark:text-white/50 hover:text-[#ff4d00]"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#ff4d00] rounded-sm"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{tab.icon}</span>
                    <span className="relative z-10 hidden sm:inline">{lang === "en" ? tab.label_en : tab.label_es}</span>
                  </button>
                ))}
              </div>

              {/* Panel con animación de entrada */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {activeTab === "skills"  && <SkillsPanel />}
                  {activeTab === "studies" && <StudiesPanel />}
                  {activeTab === "goals"   && <GoalsPanel />}
                </motion.div>
              </AnimatePresence>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  )
}
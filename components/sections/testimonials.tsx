"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { FadeIn, TextReveal } from "@/components/animations"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useLang } from "@/components/providers"

const testimonials = [
  {
    id: 1,
    name: "Carlos Jiménez",
    role_en: "Professor of Software Engineering",
    role_es: "Profesor de Ingeniería de Software",
    company: "Universidad Cooperativa de Colombia",
    image: "/placeholder-user.jpg",
    quote_en: "Helen stands out for her remarkable ability to merge technical precision with creative vision. Her projects consistently exceed academic expectations — she doesn't just write code, she crafts experiences. One of the most promising engineers I've had the pleasure of mentoring.",
    quote_es: "Helen se destaca por su capacidad para fusionar la precisión técnica con la visión creativa. Sus proyectos superan las expectativas académicas — no solo escribe código, crea experiencias. Una de las ingenieras más prometedoras que he tenido el placer de orientar.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sofía Ramírez",
    role_en: "Co-founder & Lead Designer",
    role_es: "Co-fundadora & Diseñadora Principal",
    company: "Estudio Creativo Nariño",
    image: "/placeholder-user.jpg",
    quote_en: "Working with Helen on our studio's website was a fantastic experience. She took our rough ideas and transformed them into a polished, animated digital product that exceeded what we imagined. Her attention to detail and passion for clean UI is truly exceptional.",
    quote_es: "Trabajar con Helen en el sitio de nuestro estudio fue una experiencia fantástica. Tomó nuestras ideas y las transformó en un producto digital pulido y animado que superó lo que imaginábamos. Su atención al detalle y pasión por las interfaces limpias es excepcional.",
    stars: 5,
  },
  {
    id: 3,
    name: "Miguel Torres",
    role_en: "Team Lead — Academic Project",
    role_es: "Líder de Equipo — Proyecto Académico",
    company: "UCC Game Dev Team",
    image: "/placeholder-user.jpg",
    quote_en: "Helen was the backbone of our game development project. She solved complex logic problems, designed the UI flows, and kept the team motivated under tight deadlines. Her versatility across front-end, back-end and game design is something rare at any level.",
    quote_es: "Helen fue la columna vertebral de nuestro proyecto de juegos. Resolvió problemas lógicos complejos, diseñó los flujos de UI y mantuvo al equipo motivado bajo plazos ajustados. Su versatilidad en front-end, back-end y diseño de juegos es algo raro a cualquier nivel.",
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 400 }}
        >
          <Star className="w-3 h-3 fill-[#ff4d00] text-[#ff4d00]" />
        </motion.div>
      ))}
    </div>
  )
}

export function Testimonials() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const { lang, t } = useLang()

  const paginate = (dir: 1 | -1) => {
    setDirection(dir)
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[active]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.95 }),
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-background"
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" aria-hidden>
        <path d="M200 0v150h400v80" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="600" cy="230" r="3" fill="#ff4d00" />
        <path d="M900 500h-200v-150" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="700" cy="350" r="3" fill="#ff4d00" />
      </svg>
      <div className="absolute top-24 right-[10%] font-mono text-[#ff4d00] opacity-[0.06] text-xs select-none pointer-events-none">
        {"<testimonials />"}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d00] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d00]" />
            </span>
            <span className="text-sm tracking-[0.3em] uppercase font-black text-muted-foreground/60">
              {t("test.system")}
            </span>
            <div className="h-[1px] flex-1 max-w-32 bg-[#ff4d00]/20" />
          </div>
        </FadeIn>

        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] mb-4">
            <TextReveal delay={0.1}>{t("test.title")}</TextReveal>
          </h2>
          <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] text-[#ff4d00]">
            <TextReveal delay={0.2}>{t("test.title2")}</TextReveal>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative bg-secondary/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 overflow-hidden group hover:border-[#ff4d00]/30 transition-colors duration-500">
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#ff4d00]/30 group-hover:border-[#ff4d00]/60 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#ff4d00]/30 group-hover:border-[#ff4d00]/60 transition-colors duration-500" />

                  <motion.div
                    className="absolute top-6 right-8 text-[#ff4d00]/10"
                    animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Quote className="w-16 h-16 md:w-24 md:h-24 fill-current" />
                  </motion.div>

                  <div className="mb-6">
                    <StarRating count={current.stars} />
                  </div>

                  <blockquote className="text-lg md:text-xl lg:text-2xl font-serif leading-relaxed text-foreground/90 mb-8 relative z-10">
                    &ldquo;{lang === "en" ? current.quote_en : current.quote_es}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -top-1 -left-1 w-14 h-14 rounded-full border border-[#ff4d00]/40" />
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary border-2 border-[#ff4d00]/20">
                        <Image
                          src={current.image}
                          alt={current.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-wide">{current.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {lang === "en" ? current.role_en : current.role_es}
                      </p>
                      <p className="text-xs text-[#ff4d00]/70 font-mono">{current.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3 mt-8">
              <motion.button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                    className="relative h-1.5 rounded-full overflow-hidden bg-border"
                    animate={{ width: i === active ? 32 : 12 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#ff4d00]"
                      animate={{ scaleX: i === active ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            {testimonials.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  i === active
                    ? "border-[#ff4d00]/50 bg-[#ff4d00]/5"
                    : "border-border/50 bg-secondary/20 hover:border-[#ff4d00]/20"
                }`}
                whileHover={{ x: -4 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary flex-shrink-0 border border-border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-black">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{item.company}</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2 italic">
                  &ldquo;{(lang === "en" ? item.quote_en : item.quote_es).slice(0, 80)}&hellip;&rdquo;
                </p>
                {i === active && (
                  <motion.div className="mt-2 h-0.5 bg-[#ff4d00] rounded-full" layoutId="activeBar" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
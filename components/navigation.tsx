"use client"

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Magnetic } from "@/components/animations"
import { useLang, useTheme } from "@/components/providers"
import { Moon, Sun } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const { lang, setLang, t } = useLang()
 

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navItems = [
    { key: "nav.about",        href: "#about" },
    { key: "nav.projects",     href: "#projects" },
    { key: "nav.experience",   href: "#experience" },
    { key: "nav.testimonials", href: "#testimonials" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-border/50"
            : "bg-black/20 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between">

          {/* Logo */}
          <Magnetic strength={6}>
            
              href="#"
              className="text-lg font-serif tracking-tight text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
              data-cursor-hover
            >
              Helen<span className="text-[#ff4d00]">.</span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Magnetic strength={6}>
                  
                    href={item.href}
                    className={`text-sm font-bold transition-colors relative group drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] ${
                      isScrolled
                        ? "text-foreground hover:text-[#ff4d00]"
                        : "text-white hover:text-[#ff4d00]"
                    }`}
                    data-cursor-hover
                  >
                    {t(item.key)}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff4d00] group-hover:w-full transition-all duration-300" />
                  </a>
                </Magnetic>
              </motion.li>
            ))}
          </ul>

          {/* Desktop Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden md:flex items-center gap-2"
          >
            {/* Language toggle */}
            <Magnetic strength={4}>
              <div
                className="relative flex items-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-full p-1 cursor-pointer"
                data-cursor-hover
              >
                <motion.div
                  className="absolute inset-y-1 rounded-full bg-[#ff4d00]"
                  style={{ width: "calc(50% - 4px)" }}
                  animate={{ x: lang === "en" ? 4 : "calc(100% + 4px)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`relative z-10 px-3 py-1 text-[10px] font-black tracking-widest rounded-full transition-colors duration-200 ${
                      lang === l ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </Magnetic>

            {/* Theme toggle */}
            <Magnetic strength={4}>
              <motion.button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-[#ff4d00] text-white transition-colors overflow-hidden"
                data-cursor-hover
                whileTap={{ scale: 0.85, rotate: 15 }}
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.span
                      key="moon"
                      initial={{ y: 20, opacity: 0, rotate: -30 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -20, opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ y: 20, opacity: 0, rotate: 30 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -20, opacity: 0, rotate: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Magnetic>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span className="w-6 h-px bg-white origin-center" animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
            <motion.span className="w-6 h-px bg-white" animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="w-6 h-px bg-white origin-center" animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-12">
          <ul className="space-y-8 text-center">
            {navItems.map((item, index) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif hover:text-[#ff4d00] transition-colors"
                >
                  {t(item.key)}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isMobileMenuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="relative flex items-center bg-secondary rounded-full p-1">
              <motion.div
                className="absolute inset-y-1 rounded-full bg-[#ff4d00]"
                style={{ width: "calc(50% - 4px)" }}
                animate={{ x: lang === "en" ? 4 : "calc(100% + 4px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative z-10 px-4 py-1.5 text-xs font-black tracking-widest rounded-full transition-colors ${
                    lang === l ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-[#ff4d00] hover:text-white transition-colors"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </motion.div>
        </nav>
      </motion.div>
    </>
  )
}
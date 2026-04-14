"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Lang = "en" | "es"

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  "hello": {
    en: "Hello",
    es: "Hola",
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
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    }
    const savedLang = localStorage.getItem("lang") as Lang | null
    if (savedLang) setLang(savedLang)
  }, [])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    localStorage.setItem("theme", next)
  }

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  )
}
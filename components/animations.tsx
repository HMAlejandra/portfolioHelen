"use client"

import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  once?: boolean
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "",
  once = true
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: directions[direction].y,
        x: directions[direction].x
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0 
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const text = typeof children === 'string' ? children : String(children)
  const words = text.split(" ")

  return (
    <motion.span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// Advanced word-by-word reveal with special effects for certain words
interface StoryTextRevealProps {
  children: string
  className?: string
  delay?: number
  specialWords?: { [key: string]: "bounce" | "glow" | "typewriter" }
}

export function StoryTextReveal({ 
  children, 
  className = "", 
  delay = 0,
  specialWords = {}
}: StoryTextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const text = typeof children === 'string' ? children : String(children)
  const words = text.split(" ")

  const getWordAnimation = (word: string, index: number) => {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '')
    const effect = Object.entries(specialWords).find(([key]) => 
      cleanWord.includes(key.toLowerCase())
    )?.[1]

    const baseTransition = {
      duration: 0.6,
      delay: delay + index * 0.08,
      ease: [0.25, 0.1, 0.25, 1] as const
    }

    switch (effect) {
      case "bounce":
        return {
          initial: { y: "100%", rotate: -5 },
          animate: isInView ? { y: 0, rotate: 0 } : {},
          transition: { ...baseTransition, type: "spring", stiffness: 300, damping: 15 },
          className: "text-accent"
        }
      case "glow":
        return {
          initial: { y: "100%", opacity: 0 },
          animate: isInView ? { y: 0, opacity: 1 } : {},
          transition: baseTransition,
          className: "text-accent drop-shadow-[0_0_10px_rgba(255,200,100,0.5)]"
        }
      case "typewriter":
        return {
          initial: { y: "100%", opacity: 0 },
          animate: isInView ? { y: 0, opacity: 1 } : {},
          transition: { ...baseTransition, delay: delay + index * 0.12 },
          className: "text-accent font-mono"
        }
      default:
        return {
          initial: { y: "100%" },
          animate: isInView ? { y: 0 } : {},
          transition: baseTransition,
          className: ""
        }
    }
  }

  return (
    <motion.span ref={ref} className={className}>
      {words.map((word, i) => {
        const animation = getWordAnimation(word, i)
        return (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className={`inline-block ${animation.className}`}
              initial={animation.initial}
              animate={animation.animate}
              transition={animation.transition}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        )
      })}
    </motion.span>
  )
}

// Magnetic text that reacts to cursor
interface MagneticTextProps {
  children: string
  className?: string
  strength?: number
}

export function MagneticText({ children, className = "", strength = 0.3 }: MagneticTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [letters, setLetters] = useState<{ char: string; x: number; y: number }[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setLetters(children.split('').map(char => ({ char, x: 0, y: 0 })))
  }, [children])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }, [mouseX, mouseY])

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-magnetic
    >
      {letters.map((letter, i) => (
        <MagneticLetter 
          key={i} 
          char={letter.char} 
          index={i} 
          mouseX={mouseX} 
          mouseY={mouseY}
          strength={strength}
        />
      ))}
    </motion.span>
  )
}

function MagneticLetter({ 
  char, 
  index, 
  mouseX, 
  mouseY, 
  strength 
}: { 
  char: string
  index: number
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  strength: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 20, stiffness: 300 })
  const springY = useSpring(y, { damping: 20, stiffness: 300 })

  useEffect(() => {
    const unsubscribeX = mouseX.on("change", (mx) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const parentRect = ref.current.parentElement?.getBoundingClientRect()
      if (!parentRect) return
      
      const letterCenterX = rect.left - parentRect.left + rect.width / 2
      const letterCenterY = rect.top - parentRect.top + rect.height / 2
      const my = mouseY.get()
      
      const distance = Math.sqrt(
        Math.pow(mx - letterCenterX, 2) + Math.pow(my - letterCenterY, 2)
      )
      
      if (distance < 80) {
        const force = (1 - distance / 80) * strength * 20
        x.set((mx - letterCenterX) * force * 0.1)
        y.set((my - letterCenterY) * force * 0.1)
      } else {
        x.set(0)
        y.set(0)
      }
    })

    return () => unsubscribeX()
  }, [mouseX, mouseY, x, y, strength])

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x: springX, y: springY }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

// Animated keyword with stagger and magnetic effect
interface AnimatedKeywordProps {
  children: string
  className?: string
  delay?: number
}

export function AnimatedKeyword({ children, className = "", delay = 0 }: AnimatedKeywordProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 150 })
  const springY = useSpring(y, { damping: 15, stiffness: 150 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block cursor-default ${className}`}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {children}
    </motion.span>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = "", strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 20, stiffness: 300 })
  const springY = useSpring(y, { damping: 20, stiffness: 300 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    x.set((clientX - left - width / 2) / strength)
    y.set((clientY - top - height / 2) / strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-cursor-magnetic
    >
      {children}
    </motion.div>
  )
}

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerChildren({ children, className = "", staggerDelay = 0.1 }: StaggerChildrenProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

interface HoverScaleProps {
  children: React.ReactNode
  className?: string
  scale?: number
}

export function HoverScale({ children, className = "", scale = 1.02 }: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface LineRevealProps {
  className?: string
  delay?: number
}

export function LineReveal({ className = "", delay = 0 }: LineRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`h-px bg-border ${className}`}
      initial={{ scaleX: 0, originX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    />
  )
}

// Line by line text reveal for storytelling
interface LineByLineRevealProps {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  staggerDelay?: number
}

export function LineByLineReveal({ 
  lines, 
  className = "", 
  lineClassName = "",
  delay = 0,
  staggerDelay = 0.15
}: LineByLineRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.p
            className={lineClassName}
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </motion.div>
  )
}

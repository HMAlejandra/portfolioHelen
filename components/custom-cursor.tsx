"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const dotXSpring = useSpring(dotX, { damping: 50, stiffness: 800 })
  const dotYSpring = useSpring(dotY, { damping: 50, stiffness: 800 })

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const mediaQuery = window.matchMedia('(hover: hover)')
    if (!mediaQuery.matches) return
    
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor-hover]') || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      }
      if (target.closest('[data-cursor-magnetic]')) {
        setIsMagnetic(true)
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor-hover]') || target.closest('a') || target.closest('button')) {
        setIsHovering(false)
      }
      if (target.closest('[data-cursor-magnetic]')) {
        setIsMagnetic(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [cursorX, cursorY, dotX, dotY])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-foreground/40"
          animate={{
            width: isHovering ? 64 : isMagnetic ? 48 : 40,
            height: isHovering ? 64 : isMagnetic ? 48 : 40,
            scale: isClicking ? 0.8 : 1,
            borderColor: isHovering ? "oklch(0.55 0.12 25 / 0.6)" : "oklch(0.15 0.01 45 / 0.3)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
          animate={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}

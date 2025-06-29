"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface MotionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function MotionWrapper({ children, className, delay = 0 }: MotionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

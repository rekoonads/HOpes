"use client"

import type React from "react"
import { motion } from "framer-motion"

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex-1"
    >
      {children}
    </motion.main>
  )
}

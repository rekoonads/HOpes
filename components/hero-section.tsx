"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[450px] w-full flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src="/placeholder.svg?width=1920&height=1080"
        alt="Industrial machinery"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Hopes Industrial Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-neutral-200 sm:text-xl"
        >
          Committed to manufacturing superior quality industrial equipment for our valued customers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/products">Explore Products</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black bg-transparent w-full sm:w-auto"
            >
              <Link href="/contact">Get Free Estimate</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

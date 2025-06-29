"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const featuredProducts = [
  {
    name: "Tensile Testers",
    description: "For measuring the tensile strength of materials.",
    image: "/placeholder.svg?width=400&height=300",
    href: "/products/tensile-testers",
  },
  {
    name: "CNC Machines",
    description: "Automated control for precise manufacturing.",
    image: "/placeholder.svg?width=400&height=300",
    href: "/products/cnc-machines",
  },
  {
    name: "Laser Cutters",
    description: "High-precision cutting for various materials.",
    image: "/placeholder.svg?width=400&height=300",
    href: "/products/laser-cutters",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function FeaturedProductsSection() {
  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our range of high-quality industrial equipment designed for precision and durability.
            </p>
          </div>
        </div>
        <motion.div
          className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.name} variants={itemVariants}>
              <Link href={product.href}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                      <p className="mt-2 text-muted-foreground">{product.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

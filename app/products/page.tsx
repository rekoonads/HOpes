import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const productCategories = [
  {
    name: "Testing Equipment",
    description: "Precision instruments for material analysis and quality control.",
    image: "/placeholder.svg?width=500&height=400",
    href: "/products/testing-equipment",
  },
  {
    name: "Manufacturing Machinery",
    description: "Robust and efficient machinery for modern production lines.",
    image: "/placeholder.svg?width=500&height=400",
    href: "/products/manufacturing-machinery",
  },
  {
    name: "Safety Gear",
    description: "Comprehensive safety solutions to protect your workforce.",
    image: "/placeholder.svg?width=500&height=400",
    href: "/products/safety-gear",
  },
  {
    name: "Automation Solutions",
    description: "Advanced robotics and automation to streamline your operations.",
    image: "/placeholder.svg?width=500&height=400",
    href: "/products/automation-solutions",
  },
]

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Products</h1>
          <p className="mt-4 text-lg text-gray-600">Browse our extensive catalog of industrial solutions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {productCategories.map((category) => (
            <Link href={category.href} key={category.name}>
              <Card className="group overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                <div className="relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={500}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <CardContent className="p-6 bg-white relative">
                  <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                  <p className="mt-2 text-gray-600">{category.description}</p>
                  <span className="mt-4 inline-block font-semibold text-primary group-hover:underline">
                    View Category &rarr;
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

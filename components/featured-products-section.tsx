import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link href={product.href} key={product.name}>
              <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src="/placeholder.svg?width=1920&height=1080"
        alt="Industrial machinery"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="container relative z-20 mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">Hopes Industrial Solutions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg lg:text-xl text-neutral-200">
          Committed to manufacturing superior quality industrial equipment for our valued customers.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black bg-transparent"
          >
            <Link href="/contact">Get Free Estimate</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

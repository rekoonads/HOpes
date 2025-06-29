import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Company</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hopes Industrial Solutions was established with a vision to lead the manufacturing industry. We have
              emerged as one of the leading manufacturers and suppliers of a wide range of Laboratory Equipments and
              Industrial Machinery. For over a decade, we have been providing the best & super efficient services in
              this high era of competition without compromising the quality of our products.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              To ensure a smooth flow of all the functions, we have properly planned a structure which is divided into
              several wings like – Production Unit, Quality Checking Lab, Warehouse, R&D Department, Packaging Unit and
              Administrative department.
            </p>
            <Button asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?width=550&height=550"
              width="550"
              height="550"
              alt="About Us Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

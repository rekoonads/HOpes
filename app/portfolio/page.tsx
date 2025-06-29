import Image from "next/image"

const portfolioItems = [
  {
    title: "Automated Assembly Line",
    category: "Manufacturing",
    image: "/placeholder.svg?width=500&height=400",
  },
  {
    title: "Material Stress Testing Lab",
    category: "Testing Equipment",
    image: "/placeholder.svg?width=500&height=400",
  },
  {
    title: "Robotic Welding System",
    category: "Automation",
    image: "/placeholder.svg?width=500&height=400",
  },
  {
    title: "Precision Laser Cutting Setup",
    category: "Manufacturing",
    image: "/placeholder.svg?width=500&height=400",
  },
  {
    title: "Quality Control Center",
    category: "Testing Equipment",
    image: "/placeholder.svg?width=500&height=400",
  },
  {
    title: "Industrial 3D Printing Farm",
    category: "Automation",
    image: "/placeholder.svg?width=500&height=400",
  },
]

export default function PortfolioPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Portfolio</h1>
          <p className="mt-4 text-lg text-gray-600">A showcase of our successful projects and implementations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.title} className="group relative block">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={500}
                height={400}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

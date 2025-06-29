import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Hopes Industrial Solutions</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Hopes Industrial Solutions was established with a vision to lead the manufacturing industry. We have
              emerged as one of the leading manufacturers and suppliers of a wide range of Laboratory Equipments and
              Industrial Machinery. For over a decade, we have been providing the best & super efficient services in
              this high era of competition without compromise the quality of our products being manufactured.
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-2 text-gray-600">
                Our mission is to deliver innovative and reliable industrial solutions that empower our clients to
                achieve new heights of productivity and quality. We are dedicated to continuous improvement and customer
                satisfaction.
              </p>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <Image
              src="/placeholder.svg?width=600&height=500"
              alt="Team working"
              width={600}
              height={500}
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

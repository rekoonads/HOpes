import Link from "next/link"
import { Factory } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Hopes Industrial Solutions</span>
            </Link>
            <p className="text-sm">Your trusted partner for industrial excellence and innovation.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Contact Us</h4>
            <p className="text-sm">
              123 Industrial Park, <br /> Manufacturing City, 12345
            </p>
            <p className="text-sm">Email: contact@hopesindustrial.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="hover:text-white">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-white">
                Facebook
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Hopes Industrial Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

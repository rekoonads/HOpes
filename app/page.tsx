import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedProductsSection } from "@/components/featured-products-section"
import { ContactSection } from "@/components/contact-section"
import { CtaSection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <FeaturedProductsSection />
      <CtaSection />
      <ContactSection />
    </main>
  )
}

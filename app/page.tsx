import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedProductsSection } from "@/components/featured-products-section"
import { ContactSection } from "@/components/contact-section"
import { CtaSection } from "@/components/cta-section"
import { MotionWrapper } from "@/components/motion-wrapper"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MotionWrapper>
        <AboutSection />
      </MotionWrapper>
      <MotionWrapper>
        <FeaturedProductsSection />
      </MotionWrapper>
      <MotionWrapper>
        <CtaSection />
      </MotionWrapper>
      <MotionWrapper>
        <ContactSection />
      </MotionWrapper>
    </>
  )
}

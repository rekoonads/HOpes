import { ContactForm } from "./contact-form"

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Contact Us</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or need a quote? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="mx-auto w-full max-w-lg">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

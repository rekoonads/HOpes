import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hopes Industrial Solutions",
  description: "Providing top-tier industrial machinery and testing equipment.",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950">
          <Header />
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}

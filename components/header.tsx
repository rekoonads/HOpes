"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Factory } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

const productCategories = [
  {
    title: "Testing Equipment",
    products: [
      {
        title: "Tensile Testers",
        description: "For measuring the tensile strength of materials.",
        href: "/products/tensile-testers",
      },
      {
        title: "Hardness Testers",
        description: "Determine the hardness of various materials.",
        href: "/products/hardness-testers",
      },
      {
        title: "Impact Testers",
        description: "Assess material toughness and fracture resistance.",
        href: "/products/impact-testers",
      },
    ],
  },
  {
    title: "Manufacturing Machinery",
    products: [
      {
        title: "CNC Machines",
        description: "Automated control for precise manufacturing.",
        href: "/products/cnc-machines",
      },
      {
        title: "Laser Cutters",
        description: "High-precision cutting for various materials.",
        href: "/products/laser-cutters",
      },
      {
        title: "3D Printers",
        description: "Additive manufacturing for rapid prototyping.",
        href: "/products/3d-printers",
      },
    ],
  },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Factory className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Hopes Industrial Solutions</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {productCategories.map((category) => (
                        <li key={category.title}>
                          <p className="p-2 text-sm font-semibold text-foreground">{category.title}</p>
                          <ul>
                            {category.products.map((product) => (
                              <ListItem key={product.title} title={product.title} href={product.href}>
                                {product.description}
                              </ListItem>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/portfolio" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Portfolio</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Factory className="h-6 w-6" />
                  <span className="font-bold">Hopes Industrial</span>
                </Link>
                <div className="grid gap-2 py-6">
                  <Link href="/" className="flex w-full items-center py-2 text-lg font-semibold">
                    Home
                  </Link>
                  <Link href="/about" className="flex w-full items-center py-2 text-lg font-semibold">
                    About
                  </Link>
                  <Link href="/products" className="flex w-full items-center py-2 text-lg font-semibold">
                    Products
                  </Link>
                  <Link href="/portfolio" className="flex w-full items-center py-2 text-lg font-semibold">
                    Portfolio
                  </Link>
                  <Link href="/contact" className="flex w-full items-center py-2 text-lg font-semibold">
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/contact" className="hidden md:inline-flex">
            <Button>Get a Quote</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

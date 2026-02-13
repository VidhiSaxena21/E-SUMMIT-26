"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegistration } from "@/components/RegistrationContext";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useRegistration();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/speakers", label: "Speakers" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    // { href: "#", label: "IF Portal", external: true },
  ];

  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 text-2xl font-bold cursor-pointer font-display tracking-widest text-foreground hover:text-primary transition-colors">
            <img 
              src="https://res.cloudinary.com/dgwll3dwe/image/upload/v1770976629/TVC_logo_white_exuyan.png" 
              alt="TVC Logo"
              className="h-8 w-auto"
            />
           
            <img 
              src="https://res.cloudinary.com/dgwll3dwe/image/upload/v1770976565/4779339d-9687-4395-b69f-9da35d04ffd7.png" 
              alt="E-Summit"
              className="h-8 w-auto ml-2"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "cursor-pointer text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </div>
            </Link>
          ))}
          <Button
            onClick={() => openModal()}
            className="bg-primary hover:bg-primary/80 text-white font-semibold tracking-wide"
          >
            RESERVE SPOT
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className="text-lg font-medium p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                onClick={handleLinkClick}
              >
                {link.label}
              </div>
            </Link>
          ))}
          <Button
            onClick={() => { openModal(); handleLinkClick(); }}
            className="w-full mt-2"
          >
            RESERVE SPOT
          </Button>
        </div>
      )}
    </nav>
  );
}

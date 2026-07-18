"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { services, portfolioItems } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services", hasDropdown: false },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="absolute top-0 left-0 right-0 z-[1000] transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={`px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "glass-dark border-b border-white/5"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 border border-gold/60 rounded-sm flex items-center justify-center"
              whileHover={{ rotate: 90, borderColor: "rgba(199,164,76,1)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-3 h-3 bg-gold rounded-sm" />
            </motion.div>
            <div>
              <span
                className="text-2xl md:text-3xl tracking-[0.05em] text-white block"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic" }}
              >
                Shodiq Visual
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.45em] text-gold uppercase block mt-1"
                style={{ fontFamily: "var(--font-dm-sans)", fontStyle: "normal" }}>
                Premium Studio
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.href} 
                className="relative group py-6"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={link.href}
                  className={`relative text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-gold"
                      : "text-soft-gray hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ${
                      pathname === link.href || pathname.startsWith(link.href + "/") ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[100%] left-1/2 -translate-x-1/2 w-64 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden py-2"
                      >
                        {link.label === "Services" && services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="block px-6 py-3 text-xs tracking-wider uppercase text-soft-gray hover:text-gold hover:bg-white/5 transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact">
              <motion.button
                className="px-5 py-2 text-xs tracking-[0.15em] uppercase font-medium border border-gold/40 text-gold rounded-sm hover:bg-gold hover:text-obsidian transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Talk
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-1 z-[1001] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu via Portal */}
      {mounted && menuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          <button 
             className="absolute top-6 right-6 text-white p-2"
             onClick={() => setMenuOpen(false)}
          >
             <X size={32} />
          </button>
          
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="text-4xl font-bold"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, color: '#ffffff' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div 
            className="absolute bottom-12 text-xs tracking-[0.3em] uppercase"
            style={{ color: '#a0a0a0' }}
          >
            Every Frame Tells a Story
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

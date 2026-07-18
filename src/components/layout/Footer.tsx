"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Videography", href: "/services" },
      { label: "Photography", href: "/services" },
      { label: "Drone", href: "/services" },
      { label: "Post Production", href: "/services" },
      { label: "Social Media Content", href: "/services" },
    ],
  },
];

// SVG Social Icons
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
    </svg>
  );
}

const socials = [
  { Icon: InstagramIcon, href: "https://instagram.com/shdiieq", label: "Instagram" },
  { Icon: YoutubeIcon, href: "https://youtube.com/@shodiqvisual", label: "YouTube" },
  { Icon: Mail, href: "mailto:hello@shodiqvisual.com", label: "Email" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });

  return (
    <footer ref={footerRef} className="bg-obsidian border-t border-white/5 pt-24 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-64 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        className="container-px relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand - Span 5 cols on large screens */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <motion.div
                className="w-10 h-10 border border-gold/60 rounded-sm flex items-center justify-center"
                whileHover={{ rotate: 90, borderColor: "rgba(199,164,76,1)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-3 h-3 bg-gold rounded-sm" />
              </motion.div>
              <div>
                <span
                  className="text-2xl tracking-[0.05em] text-white block"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic" }}
                >
                  Shodiq Visual
                </span>
                <span className="text-[9px] tracking-[0.45em] text-gold uppercase block mt-1"
                  style={{ fontFamily: "var(--font-dm-sans)", fontStyle: "normal" }}>
                  Premium Studio
                </span>
              </div>
            </Link>

            <p className="text-soft-gray text-sm leading-relaxed max-w-sm mb-10" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Studio videografi dan fotografi premium yang mengabadikan setiap
              cerita dalam frame-frame yang penuh makna. Berbasis di Jakarta,
              melayani seluruh Indonesia.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-soft-gray hover:border-gold hover:text-gold transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Icon size={16} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Section - Span 6 cols */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {footerLinks.map((section) => (
              <motion.div variants={itemVariants} key={section.title}>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-6 font-semibold" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-soft-gray hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-3" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Information in columns */}
            <motion.div variants={itemVariants}>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-6 font-semibold" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Get In Touch
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 text-sm text-soft-gray">
                  <MapPin size={16} className="text-gold/70 mt-0.5 shrink-0" />
                  <span style={{ fontFamily: "var(--font-dm-sans)" }}>Jakarta Selatan, Indonesia</span>
                </li>
                <li>
                  <a href="https://wa.me/6282111780124" className="flex items-start gap-3 text-sm text-soft-gray hover:text-white transition-colors group">
                    <Phone size={16} className="text-gold/70 mt-0.5 shrink-0 group-hover:text-gold transition-colors" />
                    <span style={{ fontFamily: "var(--font-dm-sans)" }}>+62 821-1178-0124</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@shodiqvisual.com" className="flex items-start gap-3 text-sm text-soft-gray hover:text-white transition-colors group">
                    <Mail size={16} className="text-gold/70 mt-0.5 shrink-0 group-hover:text-gold transition-colors" />
                    <span style={{ fontFamily: "var(--font-dm-sans)" }}>hello@shodiqvisual.com</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-dm-sans)" }}>
            © {new Date().getFullYear()} Shodiq Visual. All rights reserved.
          </p>
          <p 
            className="text-lg md:text-xl text-white/30 tracking-wide italic" 
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Every Frame Tells a Story
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

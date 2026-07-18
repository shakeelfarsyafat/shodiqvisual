"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

// SVG social icons (lucide doesn't have branded icons)
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const socialLinks = [
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+62 821-1178-0124",
    href: "https://wa.me/6282111780124",
    color: "#25D366",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    value: "@shdiieq",
    href: "https://instagram.com/shdiieq",
    color: "#E4405F",
  },
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    value: "Shodiq Visual",
    href: "https://youtube.com/@shodiqvisual",
    color: "#FF0000",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "hello@shodiqvisual.com",
    href: "mailto:hello@shodiqvisual.com",
    color: "#C7A44C",
  },
];

export default function ContactClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero with Image */}
      <div className="relative pb-24 flex flex-col justify-center overflow-hidden" style={{ paddingTop: '180px' }}>
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920"
            alt="Contact Shodiq Visual"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/80 to-obsidian" />
        </div>

        <div className="container-px relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="gold-line mx-auto mb-6" />
            <h1
              className="text-6xl md:text-8xl text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Let&apos;s Create
              <br />
              <em className="gradient-text not-italic" style={{ fontWeight: 400 }}>Together</em>
            </h1>
            <p className="text-white/60 max-w-lg mx-auto text-base leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Siap memulai project Anda? Hubungi kami melalui channel favorit Anda
              atau isi form di bawah ini.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-px pb-32 pt-20 relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Contact Info */}
        <div ref={ref} className="w-full mb-10">
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : {}}
             className="text-center text-gold tracking-[0.3em] text-sm uppercase mb-16 font-semibold" style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Direct Contact
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-5 p-8 border border-white/5 hover:border-gold/30 rounded-sm group transition-all duration-500 hover:bg-white/[0.02] text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}30` }}
                >
                  <link.Icon size={24} style={{ color: link.color }} />
                </div>
                <div>
                  <p className="text-xs text-white/40 tracking-wider mb-2 uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {link.label}
                  </p>
                  <p className="text-sm font-medium text-white group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <div style={{ height: "150px", width: "100%" }} aria-hidden="true" />

          <motion.div
            className="w-full flex flex-col md:flex-row gap-8 p-6 md:p-8 border border-white/5 rounded-sm items-center bg-white/[0.01]"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
          >
            <div className="flex-1 flex flex-col md:flex-row gap-5 items-center text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={24} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-white/40 tracking-wider mb-2 uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>Office Location</p>
                <p className="text-base text-white font-medium mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>Jakarta Selatan, Indonesia</p>
                <p className="text-sm text-soft-gray" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Melayani seluruh wilayah Indonesia & Asia Tenggara
                </p>
              </div>
            </div>
            <div className="w-full md:w-[60%] h-[300px] md:h-[400px] rounded-sm overflow-hidden border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.16954695604!2d106.72284505000001!3d-6.229498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shodiq Visual Location"
              />
            </div>
          </motion.div>

          <div style={{ height: "150px", width: "100%" }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

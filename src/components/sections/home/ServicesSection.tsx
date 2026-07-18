"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Video, Camera, Compass, Scissors, Lightbulb, Smartphone } from "lucide-react";

const getIcon = (id: number) => {
  switch (id) {
    case 1:
      return <Video strokeWidth={1} size={36} />;
    case 2:
      return <Camera strokeWidth={1} size={36} />;
    case 3:
      return <Compass strokeWidth={1} size={36} />;
    case 4:
      return <Scissors strokeWidth={1} size={36} />;
    case 5:
      return <Lightbulb strokeWidth={1} size={36} />;
    case 6:
      return <Smartphone strokeWidth={1} size={36} />;
    default:
      return <Camera strokeWidth={1} size={36} />;
  }
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-obsidian relative">
      <div className="container-px">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="gold-line mb-6" />
            <p className="label-text text-gold mb-4">
              Expertise
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl text-white leading-tight"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Layanan Visual
              <br />
              <em className="text-gold not-italic">Komprehensif</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/services">
              <button className="flex items-center gap-3 text-sm text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors group" style={{ fontFamily: "var(--font-dm-sans)" }}>
                View All Services
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Elegant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 5).map((service, i) => (
            <motion.div
              key={service.id}
              className="relative overflow-hidden p-8 md:p-12 border border-white/5 bg-navy/10 hover:bg-navy/20 transition-all duration-700 group rounded-sm flex flex-col justify-between min-h-[340px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-start mb-12">
                <motion.div 
                  className="text-gold/80 group-hover:text-gold transition-colors duration-500"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getIcon(service.id)}
                </motion.div>
                <span 
                  className="text-5xl font-light text-white/5 group-hover:text-gold/10 transition-colors duration-500 select-none"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  0{service.id}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3
                  className="text-3xl text-white mb-3 group-hover:text-gold transition-colors duration-500"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  {service.title}
                </h3>
                <p className="text-xs text-gold/70 tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {service.subtitle}
                </p>
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 overflow-hidden">
                   <p className="text-soft-gray/80 text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                     {service.description}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Special CTA Card */}
          <motion.div
            className="p-8 md:p-12 bg-gold text-obsidian rounded-sm flex flex-col justify-center items-center text-center hover:bg-white transition-colors duration-500 group min-h-[340px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              className="text-4xl mb-4"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              Custom
              <br />
              <em className="font-light italic">Package</em>
            </h3>
            <p className="text-obsidian/70 text-sm mb-8 px-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Kebutuhan spesifik untuk brand Anda? Mari diskusikan bersama.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-obsidian text-gold text-xs tracking-wider uppercase rounded-sm hover:bg-navy transition-colors duration-300 flex items-center gap-2 group-hover:bg-obsidian">
                Konsultasi Gratis
                <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

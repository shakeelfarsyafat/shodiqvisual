"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, CheckCircle2 } from "lucide-react";
import type { services, portfolioItems } from "@/lib/data";

type ServiceType = typeof services[number];
type PortfolioType = typeof portfolioItems[number];

interface Props {
  service: ServiceType;
  relatedWorks: PortfolioType[];
}

export default function ServiceDetailClient({ service, relatedWorks }: Props) {
  // Construct WA Link
  const waNumber = "6282111780124";
  const waMessage = encodeURIComponent(`Halo Shodiq Visual, saya tertarik untuk konsultasi mengenai layanan ${service.title}. Boleh minta informasi lebih lanjut?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="container-px relative z-10 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-xs tracking-wider uppercase group"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{service.icon}</span>
              <p className="text-xs md:text-sm tracking-[0.2em] text-gold uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {service.subtitle}
              </p>
            </div>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-soft-gray max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {service.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-px py-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Details & Features */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-16"
            >
              <h2 className="text-3xl text-white mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.features.map((feature, idx) => (
                  <motion.div 
                    key={feature}
                    initial={{ opacity: 0, x: -30, rotateY: -15, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                    whileHover={{ scale: 1.05, rotateZ: 1, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(199,164,76,0.5)" }}
                    transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-sm cursor-default transition-colors"
                    style={{ transformPerspective: 800 }}
                  >
                    <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-soft-gray leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Related Portfolio */}
            {relatedWorks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="text-3xl text-white mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Recent Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedWorks.map((work) => (
                    <Link href={`/portfolio/${work.slug}`} key={work.id} className="group block">
                      <div className="relative aspect-video rounded-sm overflow-hidden mb-4 border border-white/10">
                        <Image 
                          src={work.thumbnail} 
                          alt={work.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </div>
                      <h3 className="text-lg text-white group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>{work.title}</h3>
                      <p className="text-xs text-soft-gray mt-1 uppercase tracking-wider">{work.client}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Sidebar - Pricing & CTA */}
          <motion.div 
            className="lg:col-span-4 relative"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ transformPerspective: 1000 }}
          >
            <motion.div 
              className="sticky top-32 p-8 border border-gold/20 bg-gold/5 rounded-sm backdrop-blur-md"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xs tracking-[0.2em] text-gold uppercase mb-6 text-center" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Investment
              </h3>
              <div className="text-center mb-8">
                <p className="text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>
                  {service.price.replace("Starting from ", "")}
                </p>
                <p className="text-xs text-soft-gray uppercase tracking-wider" style={{ fontFamily: "var(--font-dm-sans)" }}>Starting Price</p>
              </div>

              <div className="w-full h-px bg-white/10 mb-8" />

              <p className="text-sm text-soft-gray text-center mb-8 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Tertarik menggunakan layanan {service.title} kami? Konsultasikan kebutuhan spesifik Anda bersama tim kami.
              </p>

              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 bg-gold text-obsidian font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 group"
              >
                <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                Konsultasi via WA
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

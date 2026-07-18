"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Video, Camera, Compass, Scissors, Lightbulb, Smartphone } from "lucide-react";

const getIcon = (id: number) => {
  switch (id) {
    case 1: return <Video strokeWidth={1} size={40} />;
    case 2: return <Camera strokeWidth={1} size={40} />;
    case 3: return <Compass strokeWidth={1} size={40} />;
    case 4: return <Scissors strokeWidth={1} size={40} />;
    case 5: return <Lightbulb strokeWidth={1} size={40} />;
    case 6: return <Smartphone strokeWidth={1} size={40} />;
    default: return <Camera strokeWidth={1} size={40} />;
  }
};

export default function ServicesClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero */}
      <div className="relative pb-32 flex flex-col justify-center overflow-hidden border-b border-white/5" style={{ paddingTop: '280px' }}>
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1920&q=90"
            alt="Our Services Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
        </div>
        
        <div className="container-px relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <p className="text-xs tracking-[0.2em] text-gold uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                What We Offer
              </p>
            </div>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Our <em className="gradient-text not-italic" style={{ fontWeight: 400 }}>Services</em>
            </h1>
            <p className="text-soft-gray text-lg md:text-xl leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Dari konsep hingga deliveri final — layanan lengkap untuk kebutuhan visual premium Anda.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services detail */}
      <div ref={ref} className="container-px pb-24">
        <div className="space-y-1">
          {services.map((service, i) => (
            <Link key={service.id} href={`/services/${service.slug}`} className="block outline-none">
              <motion.div
                className="group border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden cursor-pointer bg-obsidian"
                initial={{ opacity: 0, y: 60, rotateX: 15, rotateY: i % 2 === 0 ? 8 : -8, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 } : {}}
                whileHover={{ 
                  rotateY: i % 2 === 0 ? -4 : 4, 
                  rotateX: 2, 
                  scale: 1.02, 
                  boxShadow: "0 30px 60px rgba(0,0,0,0.6)" 
                }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{ transformPerspective: 1200 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
                  {/* Image Side */}
                  <div className={`relative w-full h-[300px] md:h-full overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image 
                      src={(service as any).image || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Floating Icon */}
                    <div className={`absolute top-6 ${i % 2 === 1 ? 'left-6' : 'right-6'} p-4 bg-obsidian/60 backdrop-blur-md rounded-full border border-white/10 group-hover:border-gold/50 transition-colors`}>
                      <motion.span
                        className="text-gold block"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        {getIcon(service.id)}
                      </motion.span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-10 md:p-16 lg:p-24 flex flex-col justify-center bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-sm font-bold text-gold" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        0{service.id}
                      </span>
                      <span className="w-10 h-[1px] bg-white/20" />
                      <p className="text-[10px] md:text-xs text-white/60 tracking-[0.2em] uppercase font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {service.subtitle}
                      </p>
                    </div>
                    
                    <h2
                      className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-tight font-medium"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {service.title}
                    </h2>
                    
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-12 max-w-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-16">
                      {service.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-start gap-3 text-sm text-white/80"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          <Check size={16} strokeWidth={2.5} className="text-gold shrink-0 mt-0.5" />
                          <span className="font-medium">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-white/10 flex flex-wrap gap-6 items-center justify-between">
                      <div>
                        <p className="text-[10px] text-white/40 mb-2 tracking-[0.25em] uppercase font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          Starting from
                        </p>
                        <p
                          className="text-2xl text-white font-medium"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {service.price.replace("Starting from ", "")}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian transition-all duration-300 text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                        Explore
                        <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-white/5 section-padding container-px text-center">
        <h2
          className="text-4xl md:text-5xl text-white mb-6"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
        >
          Need a Custom Package?
        </h2>
        <p className="text-soft-gray mb-10 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Setiap project berbeda. Hubungi kami untuk mendiskusikan kebutuhan
          spesifik Anda.
        </p>
        <Link href="/contact">
          <motion.button
            className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-obsidian font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Get Custom Quote
            <ArrowRight size={14} />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

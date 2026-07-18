"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const ctaRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 70%",
        },
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="py-32 relative overflow-hidden bg-navy flex items-center justify-center text-center"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Rotating circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-white/5 rounded-full animate-slow-rotate translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] border border-white/5 rounded-full animate-slow-rotate -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container-px relative z-10" ref={textRef}>
        <motion.div
          className="w-16 h-16 mx-auto border border-gold/40 rounded-full flex items-center justify-center mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-2 h-2 bg-gold rounded-full" />
        </motion.div>

        <h2
          className="text-5xl md:text-7xl lg:text-8xl text-white mb-6"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1 }}
        >
          Let&apos;s Create
          <br />
          <em className="text-gold not-italic">Something Beautiful</em>
        </h2>

        <p className="text-white/70 max-w-lg mx-auto text-sm md:text-base mb-12 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Siap untuk menceritakan kisah Anda? Hubungi kami untuk mendiskusikan
          visi Anda dan bagaimana kami bisa mewujudkannya dalam visual yang
          memukau.
        </p>

        <Link href="/contact">
          <motion.button
            className="group relative px-10 py-5 bg-white text-navy font-bold text-sm tracking-[0.2em] uppercase rounded-sm overflow-hidden"
            style={{ fontFamily: "var(--font-dm-sans)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Start Project
            </span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BehindTheLens() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".stack-card");

      // Stack cards animation
      gsap.to(cards, {
        yPercent: -100,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top center",
          end: "+=100%",
          scrub: true,
        },
      });

      // Text animation
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian overflow-hidden">
      <div className="container-px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Stack Cards */}
          <div ref={stackRef} className="relative h-[600px] lg:h-[700px] w-full">
            <div className="absolute inset-0 bg-navy/20 rounded-sm" />
            <div className="absolute inset-4 bg-navy/40 rounded-sm transform -rotate-2" />
            <div className="absolute inset-4 bg-navy/60 rounded-sm transform rotate-2" />
            
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              <div className="stack-card absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=800"
                  alt="Behind the scenes 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="stack-card absolute inset-0 translate-y-full">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800"
                  alt="Behind the scenes 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="stack-card absolute inset-0 translate-y-full">
                <Image
                  src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800"
                  alt="Behind the scenes 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-8 -right-8 glass p-6 rounded-sm border border-gold/20 z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-3xl text-gold" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>100+</p>
              <p className="text-xs text-white/60 tracking-wider" style={{ fontFamily: "var(--font-dm-sans)" }}>Projects Completed</p>
            </motion.div>
          </div>

          {/* Text content */}
          <div ref={textRef}>
            <div className="gold-line mb-6" />
            <p className="label-text text-gold mb-4">
              Behind The Lens
            </p>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-8"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1 }}
            >
              Passion
              <br />
              Meets
              <br />
              <em className="gradient-text not-italic" style={{ fontWeight: 400 }}>Precision</em>
            </h2>

            <p className="text-soft-gray text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Setiap project dimulai dengan percakapan mendalam — memahami visi,
              nilai, dan cerita yang ingin Anda sampaikan. Baru kemudian kamera
              kami mulai merekam.
            </p>
            <p className="text-soft-gray text-sm leading-relaxed mb-10" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Kami memadukan teknik sinematik standar industri dengan storytelling
              autentik untuk menciptakan visual yang tidak hanya terlihat indah,
              tetapi juga terasa hidup.
            </p>

            <button className="group flex items-center gap-3 px-8 py-4 bg-gold text-obsidian text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 hover:bg-gold-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
              <span className="relative overflow-hidden flex flex-col h-[20px]">
                <span className="transition-transform duration-300 group-hover:-translate-y-full">Meet The Team</span>
                <span className="transition-transform duration-300 translate-y-full absolute top-0 group-hover:translate-y-0">Meet The Team</span>
              </span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Infinite marquee client logos */}
      <div className="mt-32 border-y border-white/5 py-10 relative overflow-hidden flex bg-navy/5">
        <div className="flex animate-marquee whitespace-nowrap opacity-40">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <span key={i} className="text-3xl mx-16 text-white" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
              Client Brand {i}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap opacity-40 absolute top-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <span key={`clone-${i}`} className="text-3xl mx-16 text-white" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
              Client Brand {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

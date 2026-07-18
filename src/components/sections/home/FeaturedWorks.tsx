"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { portfolioItems } from "@/lib/data";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featured = portfolioItems.filter((p) => p.featured);

export default function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalWidth + 400}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.from(".featured-card", {
          opacity: 0,
          y: 40,
          rotate: 4,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      });
      
      // For mobile, just animate opacity/y slightly when scrolling down
      mm.add("(max-width: 767px)", () => {
         gsap.from(".featured-card", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 80%",
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-obsidian">
      <div ref={trackRef} className="flex flex-nowrap md:items-end gap-6 md:gap-8 px-[clamp(24px,5vw,120px)] py-16 md:py-24 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar">
        {/* Section header card */}
        <div className="flex-shrink-0 w-[min(320px,85vw)] md:w-[min(400px,80vw)] flex flex-col justify-end pb-8 pr-8 md:pr-16 snap-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="gold-line mb-6" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Featured Works
            </p>
            <h2
              className="text-5xl md:text-6xl leading-tight mb-6 text-white"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Selected
              <br />
              <em className="gradient-text not-italic">Projects</em>
            </h2>
            <p className="text-soft-gray text-sm leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Setiap karya adalah cerita yang unik — dikerjakan dengan passion,
              presisi, dan perhatian penuh pada detail.
            </p>
            <Link href="/portfolio">
              <motion.button
                className="flex items-center gap-3 text-sm text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors group"
                whileHover={{ x: 4 }}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                View All Works
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Featured cards */}
        {featured.map((item, i) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.slug}`}
            className="featured-card flex-shrink-0 group block snap-center"
            data-cursor="view"
          >
            <motion.div
              className="relative overflow-hidden rounded-sm"
              style={{
                width:
                  item.aspectRatio === "portrait"
                    ? "min(320px,75vw)"
                    : "min(480px,85vw)",
                height:
                  item.aspectRatio === "portrait"
                    ? "480px"
                    : "360px",
              }}
              initial={{ rotate: i % 2 === 0 ? 3 : -2 }}
              whileHover={{ rotate: 0, scale: 1.01 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                priority={i < 2}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 85vw, 480px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xs tracking-[0.2em] text-gold uppercase mb-1"
                  style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {item.category}
                </p>
                <h3
                  className="text-xl text-white"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {item.title}
                </h3>
                <p className="text-soft-gray text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>{item.subtitle}</p>
              </div>
            </motion.div>

            <div className="mt-4 px-1">
              <p className="text-xs text-soft-gray tracking-wider" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {item.year} · {item.category}
              </p>
              <h3
                className="text-base text-white group-hover:text-gold transition-colors"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
              >
                {item.title}
              </h3>
            </div>
          </Link>
        ))}

        <div className="flex-shrink-0 w-[clamp(24px,5vw,120px)]" />
      </div>
    </section>
  );
}

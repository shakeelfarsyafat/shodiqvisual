"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HERO_TITLE = "Every Frame\nTells a Story.";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Split title into chars for GSAP animation
  const splitTitle = useCallback(() => {
    if (!titleRef.current) return;
    const lines = HERO_TITLE.split("\n");
    titleRef.current.innerHTML = lines
      .map(
        (line) =>
          `<div class="overflow-hidden"><div class="line-inner">${line
            .split("")
            .map(
              (char) =>
                `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`
            )
            .join("")}</div></div>`
      )
      .join("");
  }, []);

  useEffect(() => {
    splitTitle();

    const ctx = gsap.context(() => {
      // Chars stagger animation
      gsap.from(".char", {
        y: "110%",
        opacity: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        delay: 2.8,
      });

      // Subtitle + buttons fade in
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 3.6,
      });

      // Video slow zoom
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.08,
          duration: 20,
          ease: "none",
        });
      }

      // Scroll-based overlay fade
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.85,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [splitTitle]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-100"
          poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlays */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.35) 50%, rgba(11,11,12,0.85) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-navy/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-px w-full">
        <div className="max-w-5xl">
          {/* Pre-title label */}
          <motion.div
            className="hero-sub flex items-center gap-3 mb-8 opacity-0"
            initial={false}
          >
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs tracking-[0.3em] text-gold uppercase font-medium">
              Premium Studio · Jakarta
            </span>
          </motion.div>

          {/* Main title */}
          <div
            ref={titleRef}
            className="text-[clamp(52px,9vw,130px)] leading-[0.95] tracking-[-0.02em] text-white mb-8"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            aria-label={HERO_TITLE}
          />

          {/* Subheadline */}
          <p className="hero-sub text-soft-gray text-lg max-w-lg leading-relaxed mb-12 opacity-0">
            Kami mengabadikan setiap cerita dalam frame-frame yang penuh makna.
            Videografi & fotografi sinematik untuk brand, pernikahan, dan produksi premium.
          </p>

          {/* CTA Buttons */}
          <div className="hero-sub flex flex-wrap gap-4 opacity-0">
            <Link href="/portfolio">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 bg-gold text-obsidian text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 hover:bg-gold-light"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={14} className="fill-current" />
                View Portfolio
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm font-medium tracking-wider uppercase rounded-sm hover:border-gold hover:text-gold transition-all duration-400"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Work Together
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.2, duration: 0.8 }}
      >
        <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>

      {/* Stats overlay bottom right */}
      <motion.div
        className="absolute bottom-10 right-[clamp(24px,5vw,120px)] hidden md:flex gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
      >
        {[
          { value: "200+", label: "Projects" },
          { value: "6", label: "Years" },
          { value: "98%", label: "Satisfaction" },
        ].map((stat) => (
          <div key={stat.label} className="text-right">
            <p
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-soft-gray tracking-wider">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

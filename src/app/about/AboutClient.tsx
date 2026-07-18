"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for narrative paragraphs
      const paragraphs = gsap.utils.toArray<HTMLElement>('.narrative-text');
      
      paragraphs.forEach((p) => {
        gsap.fromTo(p, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              start: "top 80%",
            }
          }
        );
      });
      
      // Image reveal animation
      gsap.fromTo('.reveal-img',
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: '.reveal-img-container',
            start: "top 70%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-obsidian min-h-screen" ref={containerRef}>
      {/* Cinematic Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, filter: "brightness(0.2) blur(20px)" }}
          animate={{ scale: 1.05, filter: "brightness(1) blur(0px)" }}
          transition={{ duration: 3, ease: "easeOut" }}
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=90"
            alt="Shodiq Visual Studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/60 to-obsidian" />
        </motion.div>

        <div className="container-px relative z-10 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            <motion.p 
              className="text-xs md:text-sm text-gold uppercase mb-8 font-semibold" 
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ letterSpacing: "0em" }}
              animate={{ letterSpacing: "0.4em" }}
              transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
            >
              Selayang Pandang
            </motion.p>
          </motion.div>
          <h1
            className="text-5xl md:text-7xl lg:text-[150px] text-white leading-none mb-6 flex justify-center overflow-hidden drop-shadow-2xl"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, perspective: "1000px" }}
          >
            {"Shodiq Visual".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "120%", opacity: 0, rotateX: -90, rotateZ: 10, scale: 0.5, filter: "blur(15px)" }}
                animate={{ y: "0%", opacity: 1, rotateX: 0, rotateZ: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + i * 0.08,
                }}
                className={`inline-block origin-bottom ${char === " " ? "w-[20px] md:w-[40px]" : ""}`}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="container-px py-24 md:py-40" ref={narrativeRef}>
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
          
          <div className="narrative-text w-full flex justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.3] text-center max-w-5xl mx-auto" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
              "Setiap <em className="text-gold italic pr-2">frame</em> yang kami abadikan bukan sekadar gambar, melainkan kepingan waktu yang bercerita."
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 narrative-text">
              <div className="w-12 h-[1px] bg-gold mb-8" />
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Berawal dari ketertarikan mendalam pada interaksi cahaya dan emosi di tahun 2018, Shodiq Visual lahir dari sebuah visi sederhana: <strong className="text-white font-medium">merayakan kehidupan melalui lensa.</strong>
              </p>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Kami percaya bahwa di balik setiap acara, brand, atau individu, terdapat narasi unik yang menunggu untuk diceritakan dengan pendekatan yang autentik dan sinematik.
              </p>
            </div>
            
            <div className="lg:col-span-7 reveal-img-container relative w-full aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden group">
              <div className="reveal-img absolute inset-0">
                <Image 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80"
                  alt="Behind the scenes"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-obsidian/20" />
              </div>
            </div>
          </div>

          <div className="narrative-text w-full flex flex-col items-center justify-center text-center mt-20 pt-32 md:pt-48 border-t border-white/10">
            <p className="text-lg md:text-xl text-white/50 max-w-4xl mx-auto leading-relaxed uppercase tracking-widest font-semibold" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Lebih dari enam tahun perjalanan, dari pernikahan intim hingga kampanye komersial, dedikasi kami tetap sama:
            </p>
            <span className="text-white text-4xl md:text-6xl lg:text-7xl block mt-12 leading-tight" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
              Karya visual premium <br /> yang melampaui ekspektasi.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

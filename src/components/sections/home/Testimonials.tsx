"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(8px)",
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  return (
    <section className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-navy/5" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />

      <div className="container-px relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Header */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="gold-line mb-6" />
              <p className="label-text text-gold mb-4">
                Testimonials
              </p>
              <h2
                className="text-4xl md:text-5xl text-white mb-6"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1.1 }}
              >
                Kata Mereka
                <br />
                <em className="text-gold not-italic">Tentang Kami</em>
              </h2>
              <p className="text-soft-gray text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Kepercayaan klien adalah aset terbesar kami. Dengar apa kata
                mereka yang telah bekerjasama mewujudkan cerita visualnya
                bersama Shodiq Visual.
              </p>

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => paginate(-1)}
                  className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-obsidian transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-obsidian transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Slider */}
          <div className="lg:col-span-7 relative h-[350px] md:h-[300px]">
            <Quote className="absolute -top-6 -left-6 w-24 h-24 text-white/5 -z-10" />
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  filter: { duration: 0.4 },
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p
                  className="text-2xl md:text-3xl text-white leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300 }}
                >
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h4 
                    className="text-lg text-white font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-soft-gray" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-0 left-0 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-gold" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

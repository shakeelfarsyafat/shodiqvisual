"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/lib/data";

const categories = ["All", "Wedding", "Commercial", "Fashion", "Product", "Travel", "Event", "Branding"];

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = portfolioItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="bg-obsidian min-h-screen pb-24" style={{ paddingTop: '200px' }}>
      <div className="container-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1 }}
          >
            The <em className="gradient-text not-italic" style={{ fontWeight: 400 }}>Portfolio</em>
          </h1>
        </motion.div>

        {/* Filter categories */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs md:text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCategory === category
                  ? "text-gold border-b border-gold pb-1"
                  : "text-white/50 hover:text-white border-b border-transparent pb-1"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? 3 : -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`${
                  item.aspectRatio === "landscape" && index % 4 === 0
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="group block relative overflow-hidden rounded-sm"
                  data-cursor="view"
                >
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: item.aspectRatio === "portrait" ? "3/4" : "16/9",
                    }}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                      <p className="text-xs tracking-[0.2em] text-gold uppercase mb-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {item.category}
                      </p>
                      <h3
                        className="text-2xl md:text-3xl text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-soft-gray transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-24 text-soft-gray" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Belum ada portfolio untuk kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}

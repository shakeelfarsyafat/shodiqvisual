"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, User, Camera } from "lucide-react";
import type { portfolioItems } from "@/lib/data";

type PortfolioItem = (typeof portfolioItems)[number];

interface Props {
  item: PortfolioItem;
  related: PortfolioItem[];
}

export default function PortfolioDetailClient({ item, related }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={containerRef} className="bg-obsidian min-h-screen">
      {/* Hero */}
      <div className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ y, opacity }}
          initial={{ scale: 1.15, filter: "brightness(0.8)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={item.heroImage}
            alt={item.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,11,12,0.3) 0%, rgba(11,11,12,0.1) 40%, rgba(11,11,12,0.9) 100%)",
          }}
        />

        {/* Back button */}
        <motion.div
          className="absolute top-24 left-[clamp(24px,5vw,120px)] z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-xs tracking-wider uppercase group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          className="absolute bottom-16 left-[clamp(24px,5vw,120px)] right-[clamp(24px,5vw,120px)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-3">
              {item.category}
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {item.title}
            </h1>
            <p className="text-xl md:text-2xl text-soft-gray mt-4 max-w-2xl">{item.subtitle}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container-px py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="gold-line mb-6" />
              <h2
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                About This Project
              </h2>
              <p className="text-soft-gray leading-relaxed text-base">
                {item.description}
              </p>
            </motion.div>

            {/* Gallery */}
            {item.gallery.length > 0 && (
              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Gallery
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {item.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      className="relative aspect-video overflow-hidden rounded-sm group"
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <Image
                        src={img}
                        alt={`${item.title} gallery ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Project info */}
            <div className="glass border border-white/5 rounded-sm p-6 mb-8">
              <h3 className="text-xs tracking-[0.2em] text-gold uppercase mb-6">
                Project Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User size={14} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/30 mb-1">Client</p>
                    <p className="text-sm text-white">{item.client}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/30 mb-1">Location</p>
                    <p className="text-sm text-white">{item.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={14} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/30 mb-1">Year</p>
                    <p className="text-sm text-white">{item.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div className="glass border border-white/5 rounded-sm p-6">
              <h3 className="text-xs tracking-[0.2em] text-gold uppercase mb-6 flex items-center gap-2">
                <Camera size={12} />
                Equipment Used
              </h3>
              <ul className="space-y-2">
                {item.equipment.map((eq) => (
                  <li key={eq} className="flex items-center gap-2 text-sm text-soft-gray">
                    <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                    {eq}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-white/5 pt-16">
            <h2
              className="text-3xl font-black text-white mb-12"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/portfolio/${rel.slug}`}
                    className="block group img-zoom"
                    data-cursor="view"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-sm mb-4">
                      <Image
                        src={rel.thumbnail}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-gold tracking-wider">{rel.category}</p>
                    <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors">
                      {rel.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

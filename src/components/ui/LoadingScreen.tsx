"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-obsidian"
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-3 mb-2">
              {/* Logo mark */}
              <motion.div
                className="w-10 h-10 border-2 border-gold rounded-sm flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-3 h-3 bg-gold rounded-sm" />
              </motion.div>

              <div>
                <h1
                  className="text-3xl tracking-[0.08em] text-white"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic" }}
                >
                  Shodiq Visual
                </h1>
                <p className="text-[9px] tracking-[0.5em] text-gold uppercase mt-0.5"
                  style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Premium Studio
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress number */}
          <motion.p
            className="mt-4 text-xs text-soft-gray tracking-[0.2em] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.min(Math.floor(progress), 100)}%
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="absolute bottom-12 text-xs text-white/20 tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every Frame Tells a Story
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

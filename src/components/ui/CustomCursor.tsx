"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50 });

  const ringX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const [isHovering, setIsHovering] = useState(false);
  const [isViewProject, setIsViewProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [data-cursor='pointer']");
      const isImage = target.closest("[data-cursor='view']");

      setIsHovering(!!isLink);
      setIsViewProject(!!isImage);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main dot cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isViewProject ? 90 : isHovering ? 48 : 10,
          height: isViewProject ? 90 : isHovering ? 48 : 10,
          backgroundColor: isHovering
            ? "rgba(199,164,76,0.15)"
            : "rgba(199,164,76,1)",
          backdropFilter: isHovering ? "blur(4px)" : "none",
          border: isHovering
            ? "1px solid rgba(199,164,76,0.5)"
            : "none",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {isViewProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[10px] font-semibold text-gold tracking-wider uppercase text-center leading-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View
            <br />
            Project
          </motion.span>
        )}
      </motion.div>

      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isViewProject ? 110 : isHovering ? 64 : 38,
          height: isViewProject ? 110 : isHovering ? 64 : 38,
          borderColor: isHovering
            ? "rgba(199,164,76,0.6)"
            : "rgba(199,164,76,0.25)",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </>
  );
}

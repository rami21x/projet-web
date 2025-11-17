"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  paintingEffect?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  paintingEffect = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="relative h-full w-full"
      >
        {paintingEffect ? (
          <motion.div
            initial={{ filter: "grayscale(100%)", opacity: 0.5 }}
            animate={
              isVisible
                ? { filter: "grayscale(0%)", opacity: 1 }
                : { filter: "grayscale(100%)", opacity: 0.5 }
            }
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            {/* Painting texture overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30">
              <div
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
                className="w-full h-full"
              />
            </div>

            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
            />

            {/* Brush stroke reveal effect */}
            {isVisible && (
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-dark origin-left z-20"
              />
            )}
          </motion.div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        )}
      </motion.div>
    </div>
  );
}

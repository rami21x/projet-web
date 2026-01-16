"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GlitchImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  glitchIntensity?: "subtle" | "medium" | "intense";
  onError?: () => void;
}

export default function GlitchImage({
  src,
  alt,
  priority = false,
  className = "",
  glitchIntensity = "medium",
  onError,
}: GlitchImageProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Random glitch trigger
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
    };

    // Initial glitch on load
    const initialTimeout = setTimeout(triggerGlitch, 500);

    // Periodic subtle glitches
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, 3000 + Math.random() * 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const intensityConfig = {
    subtle: {
      rgbOffset: 2,
      scanlineOpacity: 0.03,
      noiseOpacity: 0.02,
    },
    medium: {
      rgbOffset: 4,
      scanlineOpacity: 0.05,
      noiseOpacity: 0.03,
    },
    intense: {
      rgbOffset: 8,
      scanlineOpacity: 0.08,
      noiseOpacity: 0.05,
    },
  };

  const config = intensityConfig[glitchIntensity];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base Image Layer */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain md:object-cover object-center"
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
          onError={onError}
        />
      </div>

      {/* RGB Split Layers - Red Channel */}
      <motion.div
        className="absolute inset-0 mix-blend-screen opacity-70"
        animate={{
          x: isGlitching ? [-config.rgbOffset, config.rgbOffset, 0] : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-contain md:object-cover object-center"
          sizes="100vw"
          style={{ filter: "url(#redChannel)" }}
          onError={onError}
        />
      </motion.div>

      {/* RGB Split Layers - Blue Channel */}
      <motion.div
        className="absolute inset-0 mix-blend-screen opacity-70"
        animate={{
          x: isGlitching ? [config.rgbOffset, -config.rgbOffset, 0] : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-contain md:object-cover object-center"
          sizes="100vw"
          style={{ filter: "url(#blueChannel)" }}
          onError={onError}
        />
      </motion.div>

      {/* Glitch Slice Effect */}
      <AnimatePresence>
        {isGlitching && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 20, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  top: `${Math.random() * 100}%`,
                  height: `${2 + Math.random() * 8}%`,
                  clipPath: "inset(0)",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain md:object-cover object-center"
                  sizes="100vw"
                  style={{
                    transform: `translateX(${(Math.random() - 0.5) * 30}px)`,
                    filter: `hue-rotate(${Math.random() * 360}deg) saturate(2)`,
                  }}
                  onError={onError}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Scanlines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${config.scanlineOpacity}) 2px,
            rgba(0, 0, 0, ${config.scanlineOpacity}) 4px
          )`,
        }}
      />

      {/* Horizontal Scanline Animation */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-white/10 pointer-events-none"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: config.noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Color Grading Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color"
        style={{
          background: "linear-gradient(135deg, rgba(139,0,0,0.1) 0%, transparent 50%, rgba(160,82,45,0.1) 100%)",
        }}
      />

      {/* Random Glitch Bars */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 bg-accent/30"
                style={{
                  top: `${20 + i * 30 + Math.random() * 10}%`,
                  height: "1px",
                  boxShadow: "0 0 10px rgba(160, 82, 45, 0.5)",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Filters for RGB Channels */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="redChannel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="blueChannel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="greenChannel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

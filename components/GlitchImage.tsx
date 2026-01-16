"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random glitch trigger
  useEffect(() => {
    if (!imageLoaded || hasError) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200);
    };

    // Initial glitch on load
    const initialTimeout = setTimeout(triggerGlitch, 800);

    // Periodic subtle glitches
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerGlitch();
      }
    }, 4000 + Math.random() * 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [imageLoaded, hasError]);

  const intensityConfig = {
    subtle: {
      rgbOffset: "2px",
      scanlineOpacity: 0.02,
      glitchScale: 0.5,
    },
    medium: {
      rgbOffset: "4px",
      scanlineOpacity: 0.04,
      glitchScale: 1,
    },
    intense: {
      rgbOffset: "8px",
      scanlineOpacity: 0.06,
      glitchScale: 1.5,
    },
  };

  const config = intensityConfig[glitchIntensity];

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (hasError) {
    return null;
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Main Image with Glitch CSS Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: isGlitching ? [0, -3, 5, -2, 0] : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-center"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            filter: isGlitching
              ? `hue-rotate(${Math.random() * 10 - 5}deg) saturate(1.2)`
              : "none",
          }}
        />
      </motion.div>

      {/* RGB Split Effect - CSS Only (no extra image loads) */}
      {imageLoaded && (
        <>
          {/* Red channel offset */}
          <motion.div
            className="absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none"
            animate={{
              x: isGlitching ? config.rgbOffset : "0px",
            }}
            transition={{ duration: 0.1 }}
            style={{
              background: "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(255,0,0,0.05) 100%)",
            }}
          />

          {/* Cyan channel offset */}
          <motion.div
            className="absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none"
            animate={{
              x: isGlitching ? `-${config.rgbOffset}` : "0px",
            }}
            transition={{ duration: 0.1 }}
            style={{
              background: "linear-gradient(90deg, rgba(0,255,255,0.05) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)",
            }}
          />
        </>
      )}

      {/* Glitch Bars Animation */}
      <AnimatePresence>
        {isGlitching && imageLoaded && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
          >
            {/* Random horizontal glitch bars */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: [0, 1, 0],
                  x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30, 0],
                }}
                transition={{ duration: 0.15, delay: i * 0.02 }}
                style={{
                  top: `${15 + i * 20 + Math.random() * 10}%`,
                  height: `${1 + Math.random() * 3}%`,
                  background: `linear-gradient(90deg,
                    transparent,
                    rgba(139, 0, 0, ${0.3 + Math.random() * 0.3}),
                    rgba(160, 82, 45, ${0.2 + Math.random() * 0.2}),
                    transparent
                  )`,
                  mixBlendMode: "screen",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanlines Overlay */}
      {imageLoaded && (
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
      )}

      {/* Moving Horizontal Scanline */}
      {imageLoaded && (
        <motion.div
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          animate={{
            top: ["0%", "100%"],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            boxShadow: "0 0 10px rgba(160, 82, 45, 0.3)",
          }}
        />
      )}

      {/* Noise Texture */}
      {imageLoaded && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Vignette */}
      {imageLoaded && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      )}

      {/* Color Accent Overlay */}
      {imageLoaded && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(139,0,0,0.2) 0%, transparent 40%, transparent 60%, rgba(160,82,45,0.2) 100%)",
          }}
        />
      )}

      {/* Corner Accents */}
      {imageLoaded && (
        <>
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/30 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/30 pointer-events-none" />
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if splash was already shown this session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("arteral-splash-seen");
    if (hasSeenSplash) {
      setIsVisible(false);
    }
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Small delay before hiding for smooth transition
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("arteral-splash-seen", "true");
    }, 500);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setVideoEnded(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("arteral-splash-seen", "true");
    }, 300);
  };

  // Fallback: auto-hide after 15 seconds if video doesn't load
  useEffect(() => {
    if (isVisible) {
      const fallbackTimer = setTimeout(() => {
        handleSkip();
      }, 15000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-dark flex items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/splash-intro.mp4" type="video/mp4" />
            <source src="/videos/splash-intro.webm" type="video/webm" />
          </video>

          {/* Overlay gradient for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark/50" />

          {/* Logo centered (appears during video) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <Image
              src="/images/logo.png"
              alt="Arteral Logo"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
              priority
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-display text-4xl md:text-6xl font-bold text-white mt-6"
            >
              ARTERAL
            </motion.h1>
          </motion.div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 z-20 font-body text-sm text-white/70 hover:text-white transition-colors px-4 py-2 border border-white/30 hover:border-white/60 rounded-full backdrop-blur-sm"
          >
            Passer &rarr;
          </motion.button>

          {/* Loading indicator / Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: videoEnded ? 0 : 1 }}
            className="absolute bottom-8 left-8 z-20"
          >
            <div className="flex items-center gap-2 text-white/50 text-xs font-body">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full"
              />
              Chargement...
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

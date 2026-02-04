"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeSplash = useCallback(() => {
    setShowContent(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("arteral-splash-seen", "true");
    }, 600);
  }, []);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("arteral-splash-seen");
    if (hasSeenSplash) {
      setIsVisible(false);
    } else {
      setTimeout(() => setShowContent(true), 300);
    }
  }, []);

  // Try to play video manually after mount
  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;

    const handlePlaying = () => {
      setVideoReady(true);
    };

    video.addEventListener("playing", handlePlaying);

    // Force play attempt
    video.play().catch(() => {
      // Autoplay blocked or video error — fallback will show
    });

    return () => {
      video.removeEventListener("playing", handlePlaying);
    };
  }, [isVisible]);

  const handleSkip = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    closeSplash();
  }, [closeSplash]);

  // Auto-hide after 15 seconds
  useEffect(() => {
    if (isVisible) {
      const fallbackTimer = setTimeout(() => {
        closeSplash();
      }, 15000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [isVisible, closeSplash]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
        >
          {/* Fallback animated background — always behind video */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-primary/20">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            />
          </div>

          {/* Video Background — on top of fallback */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onEnded={() => closeSplash()}
            className="absolute inset-0 z-[1] w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: videoReady ? 1 : 0 }}
          >
            <source src="/videos/splash-intro.mp4" type="video/mp4" />
          </video>

          {/* Overlay gradient */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/40" />

          {/* Centered Logo & Brand */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-[3] flex flex-col items-center text-center px-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150" />
                  <Image
                    src="/images/logo.gif"
                    alt="Arteral Logo"
                    unoptimized
                    width={180}
                    height={180}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.2em" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 md:mt-8 tracking-widest"
                >
                  ARTERAL
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="font-body text-sm sm:text-base text-white/60 mt-3 md:mt-4 tracking-wide"
                >
                  L&apos;art de porter sa philosophie
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mt-6"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-[4] group"
          >
            <span className="font-body text-xs sm:text-sm text-white/40 group-hover:text-white/80 transition-all duration-300 flex items-center gap-2">
              <span className="hidden sm:inline">Passer</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

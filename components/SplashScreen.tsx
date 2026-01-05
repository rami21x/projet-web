"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeSplash = useCallback(() => {
    setShowContent(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("arteral-splash-seen", "true");
    }, 600);
  }, []);

  // Check if splash was already shown this session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("arteral-splash-seen");
    if (hasSeenSplash) {
      setIsVisible(false);
    } else {
      // Show content after a small delay
      setTimeout(() => setShowContent(true), 300);
    }
  }, []);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setVideoLoaded(false);
    // Show fallback content immediately
    setShowContent(true);
  }, []);

  const handleVideoEnd = useCallback(() => {
    closeSplash();
  }, [closeSplash]);

  const handleSkip = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    closeSplash();
  }, [closeSplash]);

  // Fallback: auto-hide after 12 seconds if video doesn't end
  useEffect(() => {
    if (isVisible) {
      const fallbackTimer = setTimeout(() => {
        closeSplash();
      }, 12000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [isVisible, closeSplash]);

  // Lazy load video only when visible
  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;

    // Intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.load();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [isVisible]);

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
          {/* Video Background - Full cover with lazy loading */}
          {!videoError && (
            <motion.video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onLoadedData={handleVideoLoad}
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              initial={{ opacity: 0 }}
              animate={{ opacity: videoLoaded ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
              poster="/images/splash-poster.jpg"
            >
              {/* WebM first for better compression */}
              <source src="/videos/splash-intro.webm" type="video/webm" />
              <source src="/videos/splash-intro.mp4" type="video/mp4" />
            </motion.video>
          )}

          {/* Fallback animated background when video fails or not available */}
          {(videoError || !videoLoaded) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-primary/20"
            >
              {/* Animated shapes */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
              />
            </motion.div>
          )}

          {/* Elegant overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]/30" />

          {/* Centered Logo & Brand */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center px-4"
              >
                {/* Logo with glow effect */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150" />
                  <Image
                    src="/images/logo.png"
                    alt="Arteral Logo"
                    width={180}
                    height={180}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.2em" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 md:mt-8 tracking-widest"
                >
                  ARTERAL
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="font-body text-sm sm:text-base text-white/60 mt-3 md:mt-4 tracking-wide"
                >
                  L&apos;art de porter sa philosophie
                </motion.p>

                {/* Animated line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mt-6"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip Button - More elegant */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 group"
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

          {/* Loading state - Only shows if video is loading */}
          {!videoLoaded && !videoError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border border-white/20 border-t-primary/80 rounded-full"
                />
                <span className="text-white/30 text-xs font-body tracking-wider">
                  Chargement...
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if user has seen notification before
    const hasSeenNotification = localStorage.getItem(
      "arteral-audio-notification-seen"
    );
    const audioPreference = localStorage.getItem("arteral-audio-enabled");

    if (!hasSeenNotification && !userInteracted) {
      // Show notification after 2 seconds on first visit
      setTimeout(() => {
        setShowNotification(true);
      }, 2000);
    }

    // Auto-enable if user previously enabled
    if (audioPreference === "true") {
      setIsPlaying(true);
    }
  }, [userInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play was prevented, user needs to interact first
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    setUserInteracted(true);
    localStorage.setItem("arteral-audio-enabled", newState.toString());

    if (showNotification) {
      dismissNotification();
    }
  };

  const dismissNotification = () => {
    setShowNotification(false);
    localStorage.setItem("arteral-audio-notification-seen", "true");
  };

  const enableMusic = () => {
    setIsPlaying(true);
    setUserInteracted(true);
    localStorage.setItem("arteral-audio-enabled", "true");
    dismissNotification();
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/ambient-music.mp3" type="audio/mpeg" />
        <source src="/ambient-music.ogg" type="audio/ogg" />
        Votre navigateur ne supporte pas l'audio.
      </audio>

      {/* Notification Modal */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark/95 rounded-lg shadow-2xl max-w-md w-full p-8 relative border-2 border-primary/20"
            >
              <button
                onClick={dismissNotification}
                className="absolute top-4 right-4 text-dark/40 dark:text-white/40 hover:text-dark dark:hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-dark dark:text-white mb-4">
                  Immersive Experience
                </h3>

                <p className="font-body text-base text-dark/70 dark:text-white/80 mb-8 leading-relaxed">
                  Enable ambient music for a complete museum visit and enrich your
                  artistic experience.
                </p>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={dismissNotification}
                    className="flex-1 font-body font-semibold px-6 py-3 bg-dark/10 dark:bg-white/10 text-dark dark:text-white rounded-lg hover:bg-dark/20 dark:hover:bg-white/20 transition-all"
                  >
                    Later
                  </button>
                  <button
                    onClick={enableMusic}
                    className="flex-1 font-body font-semibold px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
                  >
                    Enable sound
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Toggle Button - Minimal Design */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white dark:bg-dark/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center group transition-all duration-300 hover:scale-105 border border-dark/10 dark:border-white/20"
        aria-label={isPlaying ? "Mute" : "Unmute"}
        title={isPlaying ? "Mute" : "Unmute"}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-primary dark:text-primary transition-colors" />
          ) : (
            <VolumeX className="w-5 h-5 text-dark/40 dark:text-white/40 transition-colors" />
          )}
        </div>

        {/* Subtle glow when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
        )}
      </motion.button>

      {/* Tooltip */}
      <div className="fixed bottom-24 right-6 z-40 pointer-events-none">
        <AnimatePresence>
          {!userInteracted && !showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 3 }}
              className="bg-dark dark:bg-white text-white dark:text-dark px-4 py-2 rounded-lg shadow-lg font-body text-sm whitespace-nowrap"
            >
              Ambient music
              <div className="absolute -bottom-1 right-8 w-2 h-2 bg-dark dark:bg-white transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

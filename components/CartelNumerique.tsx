"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";

interface CartelNumeriqueProps {
  title: string;
  year?: string;
  materials: string;
  philosophy: string;
  price?: string;
  artisan?: string;
}

export default function CartelNumerique({
  title,
  year = "2024",
  materials,
  philosophy,
  price,
  artisan = "Atelier Arteral",
}: CartelNumeriqueProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Info Icon Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 right-4 z-10"
      >
        <div className="w-10 h-10 bg-white/90 dark:bg-dark/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
          <Info className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Museum Label Card - Appears on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-end p-6 pointer-events-none"
          >
            <div className="w-full bg-white/95 dark:bg-dark/95 backdrop-blur-md p-6 rounded-lg shadow-2xl border-2 border-primary/30">
              {/* Museum Label Header */}
              <div className="border-b-2 border-dark/10 dark:border-white/10 pb-3 mb-3">
                <h3 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">
                  {title}
                </h3>
                <p className="font-mono text-sm text-dark/60 dark:text-white/90">
                  {artisan}, {year}
                </p>
              </div>

              {/* Materials */}
              <div className="mb-3">
                <p className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Matériaux
                </p>
                <p className="font-body text-sm text-dark/80 dark:text-white/95 italic">
                  {materials}
                </p>
              </div>

              {/* Philosophy */}
              <div className="mb-3">
                <p className="font-body text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                  Inspiration Philosophique
                </p>
                <p className="font-body text-sm text-dark/70 dark:text-white/90 leading-relaxed">
                  {philosophy}
                </p>
              </div>

              {/* Price (if provided) */}
              {price && (
                <div className="pt-2 border-t border-dark/10 dark:border-white/10">
                  <p className="font-mono text-lg font-bold text-primary">
                    {price}
                  </p>
                </div>
              )}

              {/* Museum Authenticity Mark */}
              <div className="mt-4 pt-3 border-t border-dark/10 dark:border-white/10">
                <p className="font-mono text-xs text-dark/40 dark:text-white/40 text-center">
                  Collection Permanente Arteral
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

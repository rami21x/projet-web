"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Minimize2 } from "lucide-react";

export default function DualitySlider() {
  const [value, setValue] = useState(50);

  const chaosPercentage = 100 - value;
  const orderPercentage = value;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-dark via-dark/95 to-primary/20 py-16 md:py-24">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(139, 0, 0, 0.3), transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(160, 82, 45, 0.3), transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(139, 0, 0, 0.3), transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Explorez la Dualité
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-base md:text-lg text-white/95"
          >
            Déplacez le curseur pour naviguer entre chaos et ordre
          </motion.p>
        </div>

        {/* Duality Visualization */}
        <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg p-8 md:p-12">
          {/* Labels */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <Zap className={`w-8 h-8 mx-auto mb-2 transition-all duration-300 ${chaosPercentage > 50 ? 'text-primary scale-125' : 'text-white/40'}`} />
              <p className={`font-display text-xl md:text-2xl font-bold transition-all duration-300 ${chaosPercentage > 50 ? 'text-primary scale-110' : 'text-white/90'}`}>
                CHAOS
              </p>
              <p className="font-mono text-3xl md:text-4xl font-bold text-white mt-2">
                {chaosPercentage}%
              </p>
            </div>

            <div className="mx-8">
              <p className="font-display text-2xl md:text-3xl text-white/40">↔</p>
            </div>

            <div className="text-center flex-1">
              <Minimize2 className={`w-8 h-8 mx-auto mb-2 transition-all duration-300 ${orderPercentage > 50 ? 'text-accent scale-125' : 'text-white/40'}`} />
              <p className={`font-display text-xl md:text-2xl font-bold transition-all duration-300 ${orderPercentage > 50 ? 'text-accent scale-110' : 'text-white/90'}`}>
                ORDRE
              </p>
              <p className="font-mono text-3xl md:text-4xl font-bold text-white mt-2">
                {orderPercentage}%
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-primary via-white/20 to-accent rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8B0000 0%, #8B0000 ${100 - value}%, #A0522D ${100 - value}%, #A0522D 100%)`,
              }}
            />
          </div>

          {/* Philosophy Text */}
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-dark/40 rounded-lg border border-white/10"
          >
            <p className="font-body text-sm md:text-base text-white/90 italic text-center leading-relaxed">
              {chaosPercentage > 70
                ? "« Du chaos naît l'innovation pure. L'imprévu, le spontané, le sauvage. C'est dans le désordre que l'artiste trouve sa voix. »"
                : chaosPercentage > 30
                ? "« L'équilibre parfait. Le chaos apporte la créativité, l'ordre apporte la forme. Ensemble, ils créent l'art. »"
                : "« L'ordre révèle la beauté. La structure, la précision, l'harmonie géométrique. C'est dans la discipline que naît la perfection. »"}
            </p>
          </motion.div>

          {/* Visual Representation */}
          <div className="mt-8 grid grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className={`h-16 rounded transition-all duration-300 ${
                  i < Math.floor(chaosPercentage / 10)
                    ? 'bg-primary'
                    : 'bg-accent'
                }`}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: i < Math.floor(chaosPercentage / 10) ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Arteral incarne cette dualité dans chaque création. Le chaos de l'inspiration
            créative rencontre la précision de l'artisanat. Le résultat : des pièces uniques
            qui portent en elles cette tension créative.
          </p>
        </motion.div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
          border: 3px solid #8B0000;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
          border: 3px solid #8B0000;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(139, 0, 0, 0.8);
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(139, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}

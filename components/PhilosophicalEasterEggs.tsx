"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const secretMessages = [
  {
    trigger: "ArteralPhilosophie",
    message: "« L'art ne transforme pas seulement le vêtement, il transforme celui qui le porte. » — Arteral",
    color: "from-primary to-accent",
  },
  {
    trigger: "ChaosOrdre",
    message: "« Dans le chaos créatif naît l'ordre artistique. Dans l'ordre rigide meurt la créativité. » — Arteral",
    color: "from-accent to-primary",
  },
  {
    trigger: "ModeConsciente",
    message: "« Chaque choix vestimentaire est un acte philosophique. Que dit votre garde-robe sur qui vous êtes ? » — Arteral",
    color: "from-primary via-accent to-primary",
  },
];

export default function PhilosophicalEasterEggs() {
  const [keySequence, setKeySequence] = useState("");
  const [revealedMessage, setRevealedMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState("from-primary to-accent");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Add hidden messages to console
    console.log(
      "%c✨ ARTERAL — Mode Philosophique ✨",
      "font-size: 24px; font-weight: bold; background: linear-gradient(to right, #8B0000, #A0522D); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
    );
    console.log(
      "%c« Ce que vous portez influence qui vous êtes. »",
      "font-size: 14px; font-style: italic; color: #8B0000;"
    );
    console.log(
      "%cVous avez trouvé l'easter egg développeur ! 🎨",
      "font-size: 12px; color: #A0522D;"
    );
    console.log(
      "%cTapez 'ArteralPhilosophie' ou 'ChaosOrdre' ou 'ModeConsciente' pour révéler des pensées cachées...",
      "font-size: 11px; color: #666;"
    );

    // Keyboard listener
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = (keySequence + e.key).slice(-20);
      setKeySequence(newSequence);

      // Check for secret triggers
      secretMessages.forEach((secret) => {
        if (newSequence.includes(secret.trigger)) {
          setRevealedMessage(secret.message);
          setMessageColor(secret.color);
          setKeySequence("");

          setTimeout(() => {
            setRevealedMessage(null);
          }, 8000);
        }
      });
    };

    // Triple-click easter egg
    const handleClick = () => {
      setClickCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 7) {
          setRevealedMessage(
            "« Vous avez cliqué 7 fois. Le 7 symbolise la perfection. Comme une création Arteral, vous cherchez la perfection dans les détails. » — Arteral"
          );
          setMessageColor("from-primary via-white to-accent");
          setTimeout(() => setRevealedMessage(null), 8000);
          return 0;
        }
        return newCount;
      });

      setTimeout(() => setClickCount(0), 2000);
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("click", handleClick);
    };
  }, [keySequence]);

  return (
    <>
      {/* Hidden messages in HTML comments (visible in source code) */}
      <div style={{ display: "none" }}>
        {/*
          ╔═══════════════════════════════════════════════════════════╗
          ║                                                           ║
          ║   ARTERAL — Mode Philosophique, Art Incarné              ║
          ║                                                           ║
          ║   « Chaque pièce raconte un paradoxe.                    ║
          ║     Chaque paradoxe change celui qui la porte. »         ║
          ║                                                           ║
          ║   Vous explorez le code source ? Vous êtes déjà un       ║
          ║   penseur. Un artiste. Un chercheur de vérité.           ║
          ║                                                           ║
          ║   Easter eggs cachés :                                   ║
          ║   - Tapez "ArteralPhilosophie" n'importe où              ║
          ║   - Tapez "ChaosOrdre" pour la dualité                   ║
          ║   - Tapez "ModeConsciente" pour la révélation            ║
          ║   - Cliquez 7 fois rapidement pour la perfection         ║
          ║   - Ouvrez la console pour plus de messages...           ║
          ║                                                           ║
          ║   « L'art n'est pas ce que vous voyez,                   ║
          ║     mais ce que vous faites voir aux autres. »           ║
          ║                                     — Edgar Degas        ║
          ║                                                           ║
          ╚═══════════════════════════════════════════════════════════╝
        */}
      </div>

      {/* Revealed Message Modal */}
      <AnimatePresence>
        {revealedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[10000] px-4"
            onClick={() => setRevealedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -90 }}
              transition={{ type: "spring", duration: 0.8 }}
              className={`max-w-2xl w-full bg-gradient-to-br ${messageColor} p-8 md:p-12 rounded-lg shadow-2xl border-4 border-white/20 relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative sparkles */}
              <div className="absolute -top-6 -left-6">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-6 -right-6">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>

              <div className="text-center">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                  🎨 Pensée Cachée Révélée
                </h3>
                <blockquote className="font-body text-lg md:text-xl text-white/95 leading-relaxed italic mb-8">
                  {revealedMessage}
                </blockquote>
                <p className="font-mono text-sm text-white/90">
                  Cliquez n'importe où pour continuer votre visite
                </p>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-lg">
                <motion.div
                  className="absolute inset-0 rounded-lg border-4 border-white/40"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

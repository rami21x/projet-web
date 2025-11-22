"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/hooks/useContent";

export default function DualitySlider() {
  const { dualitySliderContent } = useContent();
  const [value, setValue] = useState(50);

  const chaosPercentage = 100 - value;
  const orderPercentage = value;

  // Citation selection based on position
  const currentCitation = useMemo(() => {
    const citations = dualitySliderContent.citations;
    if (chaosPercentage > 66) {
      const index = Math.floor((chaosPercentage - 66) / 12) % citations.chaos.length;
      return citations.chaos[index];
    } else if (chaosPercentage > 33) {
      const index = Math.floor((chaosPercentage - 33) / 12) % citations.equilibre.length;
      return citations.equilibre[index];
    } else {
      const index = Math.floor(chaosPercentage / 12) % citations.ordre.length;
      return citations.ordre[index];
    }
  }, [chaosPercentage, dualitySliderContent.citations]);

  // Current state
  const currentState = chaosPercentage > 66 ? "chaos" : chaosPercentage > 33 ? "equilibre" : "ordre";

  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-32">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.08), transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(160, 82, 45, 0.08), transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.08), transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-10 w-64 h-64 border border-white/5 rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 border border-white/5 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.5em] text-primary/60 mb-4"
          >
            {dualitySliderContent.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {dualitySliderContent.title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm md:text-base text-white/50"
          >
            {dualitySliderContent.subtitle}
          </motion.p>
        </div>

        {/* Main Duality Container */}
        <div className="relative">
          {/* Labels - Artistic style */}
          <div className="flex justify-between items-end mb-10">
            {/* Chaos side */}
            <div className="text-left">
              <motion.div
                animate={{
                  scale: currentState === "chaos" ? 1.05 : 1,
                  opacity: chaosPercentage > 50 ? 1 : 0.4
                }}
                className="transition-all duration-500"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 block mb-2">
                  {String(Math.round(chaosPercentage)).padStart(3, '0')}
                </span>
                <h3 className={`font-display text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-500 ${
                  chaosPercentage > 50 ? 'text-primary' : 'text-white/40'
                }`}>
                  {dualitySliderContent.chaos.label}
                </h3>
                <p className="font-body text-xs text-white/30 mt-1 max-w-[120px]">
                  {dualitySliderContent.chaos.description}
                </p>
              </motion.div>
            </div>

            {/* Center - Current state */}
            <div className="text-center flex-1 px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentState}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="inline-block"
                >
                  <span className={`font-display text-lg md:text-xl font-bold tracking-widest ${
                    currentState === "equilibre" ? "text-white" : "text-white/50"
                  }`}>
                    {dualitySliderContent.states[currentState]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Order side */}
            <div className="text-right">
              <motion.div
                animate={{
                  scale: currentState === "ordre" ? 1.05 : 1,
                  opacity: orderPercentage > 50 ? 1 : 0.4
                }}
                className="transition-all duration-500"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 block mb-2">
                  {String(Math.round(orderPercentage)).padStart(3, '0')}
                </span>
                <h3 className={`font-display text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-500 ${
                  orderPercentage > 50 ? 'text-accent' : 'text-white/40'
                }`}>
                  {dualitySliderContent.order.label}
                </h3>
                <p className="font-body text-xs text-white/30 mt-1 max-w-[120px] ml-auto">
                  {dualitySliderContent.order.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Slider Track */}
          <div className="relative h-1 bg-white/10 rounded-full mb-12">
            {/* Progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${chaosPercentage}%`,
                background: "linear-gradient(to right, #8B0000, #A0522D)",
              }}
              animate={{ width: `${chaosPercentage}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Slider input */}
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Custom thumb */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none"
              style={{ left: `calc(${100 - value}% - 12px)` }}
            >
              <div className="w-full h-full bg-white rounded-full shadow-[0_0_20px_rgba(139,0,0,0.5)] border-2 border-primary" />
              <div className="absolute inset-1 bg-primary/20 rounded-full" />
            </motion.div>
          </div>

          {/* Visual bars - Artistic representation */}
          <div className="flex gap-1 h-20 mb-12">
            {Array.from({ length: 20 }).map((_, i) => {
              const isChaos = i < Math.floor(chaosPercentage / 5);
              const isActive = i === Math.floor(chaosPercentage / 5) - 1 || i === Math.floor(chaosPercentage / 5);

              return (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-300 ${
                    isChaos ? 'bg-primary' : 'bg-accent'
                  }`}
                  animate={{
                    scaleY: isActive ? 1.2 : 0.6 + Math.random() * 0.4,
                    opacity: isActive ? 1 : isChaos ? 0.8 : 0.6,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.02,
                  }}
                  style={{ transformOrigin: "bottom" }}
                />
              );
            })}
          </div>

          {/* Citation Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCitation.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-[2px] h-full bg-gradient-to-b from-primary via-white/20 to-accent" />
              <blockquote className="pl-8 py-4">
                <p className="font-display text-lg md:text-xl lg:text-2xl text-white/90 italic leading-relaxed mb-3">
                  &ldquo;{currentCitation.text}&rdquo;
                </p>
                <footer className="font-body text-sm text-white/50">
                  — {currentCitation.author}
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6" />
          <p className="font-body text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
            {dualitySliderContent.bottomText}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useContent } from "@/hooks/useContent";
import {
  BookOpen,
  Feather,
  Upload,
  Eye,
  Send,
  ArrowRight,
  ArrowLeft,
  Quote,
  Flame,
  Moon,
  Sparkles,
  Check,
  Shirt,
  Image as ImageIcon,
  X,
  ChevronDown,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

// Types
type Step = "comprendre" | "interpreter" | "creer" | "visualiser";
type GarmentType = "tshirt" | "pull";
type GarmentFit = "oversize" | "regular" | "slim";

// Symbol icons mapping
const SYMBOL_ICONS = {
  0: Flame,
  1: Moon,
  2: Sparkles,
  3: Eye,
};

export default function StudioPage() {
  const { studioPageContent: content } = useContent();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("comprendre");
  const [hasUnderstood, setHasUnderstood] = useState(false);

  // Interpretation form state
  const [interpretation, setInterpretation] = useState({
    duality: "",
    harmony: "",
    feeling: "",
    message: "",
  });

  // Upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Garment selection state
  const [garmentType, setGarmentType] = useState<GarmentType>("tshirt");
  const [garmentFit, setGarmentFit] = useState<GarmentFit>("oversize");
  const [garmentColor, setGarmentColor] = useState(content.colors[0]);

  // Submission state
  const [artistInfo, setArtistInfo] = useState({
    name: "",
    email: "",
    instagram: "",
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: "comprendre", label: content.steps.comprendre, icon: BookOpen },
    { id: "interpreter", label: content.steps.interpreter, icon: Feather },
    { id: "creer", label: content.steps.creer, icon: Upload },
    { id: "visualiser", label: content.steps.visualiser, icon: Eye },
  ];

  const canProceedToInterpret = hasUnderstood;
  const canProceedToCreate = Object.values(interpretation).every(v => v.length >= 20);
  const canProceedToVisualize = uploadedImage !== null;
  const canSubmit = artistInfo.name && artistInfo.email && artistInfo.title;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Le fichier est trop volumineux. Maximum 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistName: artistInfo.name,
          email: artistInfo.email,
          instagram: artistInfo.instagram,
          title: artistInfo.title,
          philosophy: `DUALITÉ: ${interpretation.duality}\n\nHARMONIE DU CHAOS: ${interpretation.harmony}\n\nSENTIMENT: ${interpretation.feeling}\n\nMESSAGE: ${interpretation.message}`,
          garmentType,
          garmentFit,
          garmentColor: garmentColor.hex,
          canvasData: uploadedImage,
        }),
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextStep = () => {
    const stepOrder: Step[] = ["comprendre", "interpreter", "creer", "visualiser"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const stepOrder: Step[] = ["comprendre", "interpreter", "creer", "visualiser"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case "comprendre": return canProceedToInterpret;
      case "interpreter": return canProceedToCreate;
      case "creer": return canProceedToVisualize;
      default: return false;
    }
  };

  // Background and text colors based on theme
  const bgMain = isDark ? "bg-[#0A0A0A]" : "bg-[#FAFAFA]";
  const bgCard = isDark ? "bg-[#111111]" : "bg-white";
  const bgCardHover = isDark ? "hover:bg-[#1A1A1A]" : "hover:bg-gray-50";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textPrimary = isDark ? "text-white" : "text-[#1A1A1A]";
  const textSecondary = isDark ? "text-white/60" : "text-gray-600";
  const textMuted = isDark ? "text-white/40" : "text-gray-400";

  return (
    <div className={`min-h-screen ${bgMain} transition-colors duration-500`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${bgMain}/95 backdrop-blur-md border-b ${borderColor}`}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`font-display text-xl md:text-2xl font-semibold tracking-tight ${textPrimary}`}>
                {content.header.title}
              </h1>
              <p className={`text-[10px] tracking-[0.3em] uppercase ${textMuted} font-mono mt-0.5`}>
                {content.header.subtitle}
              </p>
            </div>

            {/* Step indicators - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isPast = steps.findIndex(s => s.id === currentStep) > index;

                return (
                  <button
                    key={step.id}
                    onClick={() => isPast && setCurrentStep(step.id)}
                    disabled={!isPast && !isActive}
                    className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : isPast
                        ? `${bgCard} ${textSecondary} ${bgCardHover} border ${borderColor}`
                        : `${textMuted} cursor-not-allowed`
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "" : "opacity-70"}`} />
                    <span className="text-sm font-medium">{step.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile step indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-5">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isPast = steps.findIndex(s => s.id === currentStep) > index;

              return (
                <div
                  key={step.id}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isActive ? "w-8 bg-primary" : isPast ? "w-2 bg-primary/40" : `w-2 ${isDark ? "bg-white/20" : "bg-black/10"}`
                  }`}
                />
              );
            })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentStep === "comprendre" && (
            <ComprendreStep
              content={content}
              isDark={isDark}
              hasUnderstood={hasUnderstood}
              setHasUnderstood={setHasUnderstood}
            />
          )}
          {currentStep === "interpreter" && (
            <InterpreterStep
              content={content}
              isDark={isDark}
              interpretation={interpretation}
              setInterpretation={setInterpretation}
            />
          )}
          {currentStep === "creer" && (
            <CreerStep
              content={content}
              isDark={isDark}
              uploadedImage={uploadedImage}
              uploadedFileName={uploadedFileName}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
              setUploadedImage={setUploadedImage}
            />
          )}
          {currentStep === "visualiser" && (
            <VisualiserStep
              content={content}
              isDark={isDark}
              uploadedImage={uploadedImage}
              garmentType={garmentType}
              setGarmentType={setGarmentType}
              garmentFit={garmentFit}
              setGarmentFit={setGarmentFit}
              garmentColor={garmentColor}
              setGarmentColor={setGarmentColor}
              artistInfo={artistInfo}
              setArtistInfo={setArtistInfo}
              interpretation={interpretation}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              canSubmit={canSubmit}
              handleSubmit={handleSubmit}
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Navigation buttons */}
      {currentStep !== "visualiser" && (
        <div className={`fixed bottom-0 left-0 right-0 ${isDark ? "bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent" : "bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent"} pt-16 pb-8`}>
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <button
              onClick={goToPrevStep}
              disabled={currentStep === "comprendre"}
              className={`flex items-center gap-2 px-5 py-3 transition-all duration-300 ${
                currentStep === "comprendre"
                  ? "opacity-0 pointer-events-none"
                  : `${bgCard} ${textSecondary} border ${borderColor} hover:border-primary/30`
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">{content.navigation.back}</span>
            </button>

            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className={`group flex items-center gap-2 px-7 py-3 font-semibold transition-all duration-300 ${
                canGoNext()
                  ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                  : `${bgCard} ${textMuted} border ${borderColor} cursor-not-allowed`
              }`}
            >
              <span>{content.navigation.continue}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STEP 1: COMPRENDRE
// ============================================
function ComprendreStep({
  content,
  isDark,
  hasUnderstood,
  setHasUnderstood,
}: {
  content: ReturnType<typeof useContent>["studioPageContent"];
  isDark: boolean;
  hasUnderstood: boolean;
  setHasUnderstood: (v: boolean) => void;
}) {
  const bgCard = isDark ? "bg-[#111111]" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textPrimary = isDark ? "text-white" : "text-[#1A1A1A]";
  const textSecondary = isDark ? "text-white/70" : "text-gray-600";
  const textMuted = isDark ? "text-white/40" : "text-gray-400";

  return (
    <div className="pb-40">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] ${isDark ? "bg-primary/10" : "bg-primary/5"}`} />
          <div className={`absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[100px] ${isDark ? "bg-accent/10" : "bg-accent/5"}`} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={`font-mono text-xs tracking-[0.4em] text-accent mb-8`}>
              {content.comprendre.series}
            </p>
            <h2 className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold ${textPrimary} mb-10 leading-[0.9]`}>
              {content.comprendre.title1}<br />
              <span className="text-primary">{content.comprendre.title2}</span>
            </h2>
            <div className={`text-lg md:text-xl ${textSecondary} max-w-2xl mx-auto leading-relaxed space-y-1`}>
              <p>{content.comprendre.intro}</p>
              <p>{content.comprendre.intro2}</p>
              <p className="text-accent font-medium">{content.comprendre.intro3}</p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className={`w-6 h-6 ${textMuted}`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What we seek / avoid */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <div className={`${bgCard} p-8 border ${borderColor} h-full`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className={`font-display text-xl font-semibold ${textPrimary}`}>
                    {content.comprendre.whatWeSeek.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {content.comprendre.whatWeSeek.items.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${textSecondary}`}>
                      <ArrowRight className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className={`${bgCard} p-8 border ${borderColor} h-full`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-500/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className={`font-display text-xl font-semibold ${textPrimary}`}>
                    {content.comprendre.whatWeAvoid.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {content.comprendre.whatWeAvoid.items.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${textMuted}`}>
                      <X className="w-4 h-4 text-red-500/50 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Philosophers */}
      <section className={`py-24 px-6 ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className={`font-mono text-xs tracking-[0.3em] text-accent text-center mb-3`}>
              {content.comprendre.philosophersLabel}
            </p>
            <h3 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} text-center mb-16`}>
              {content.comprendre.philosophersTitle}
            </h3>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {content.comprendre.philosophers.map((philosopher, index) => (
              <FadeIn key={philosopher.name} delay={index * 0.1}>
                <div className={`group ${bgCard} overflow-hidden border ${borderColor} hover:border-accent/30 transition-all duration-500`}>
                  {/* Image placeholder - sharp corners */}
                  <div className={`aspect-[3/4] ${isDark ? "bg-gradient-to-br from-primary/10 to-accent/10" : "bg-gradient-to-br from-primary/5 to-accent/5"} flex items-center justify-center relative`}>
                    <span className={`font-display text-6xl font-bold ${textMuted}`}>
                      {philosopher.name.charAt(0)}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className={`font-display text-xl font-semibold ${textPrimary} mb-2`}>
                      {philosopher.name}
                    </h4>
                    <p className="text-sm text-accent mb-4">{philosopher.concept}</p>
                    <blockquote className={`${textSecondary} text-sm italic border-l-2 border-primary/30 pl-4`}>
                      "{philosopher.quote}"
                    </blockquote>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Symbols */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className={`font-mono text-xs tracking-[0.3em] text-accent text-center mb-3`}>
              {content.comprendre.symbolsLabel}
            </p>
            <h3 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} text-center mb-16`}>
              {content.comprendre.symbolsTitle}
            </h3>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.comprendre.symbols.map((symbol, index) => {
              const Icon = SYMBOL_ICONS[index as keyof typeof SYMBOL_ICONS];
              return (
                <FadeIn key={symbol.name} delay={index * 0.08}>
                  <div className={`group ${bgCard} p-8 border ${borderColor} hover:border-primary/30 transition-all text-center`}>
                    <div className={`w-16 h-16 mx-auto mb-5 ${isDark ? "bg-primary/10" : "bg-primary/5"} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className={`font-display text-lg font-semibold ${textPrimary} mb-2`}>
                      {symbol.name}
                    </h4>
                    <p className={`text-sm ${textMuted} leading-relaxed`}>{symbol.meaning}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className={`py-24 px-6 ${isDark ? "bg-primary/5" : "bg-primary/[0.02]"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className={`font-mono text-xs tracking-[0.3em] text-accent text-center mb-3`}>
              {content.comprendre.artistsLabel}
            </p>
            <h3 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} text-center mb-4`}>
              {content.comprendre.artistsTitle}
            </h3>
            <p className={`${textMuted} text-center max-w-2xl mx-auto mb-16`}>
              {content.comprendre.artistsSubtitle}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {content.comprendre.artists.map((artist, index) => (
              <FadeIn key={artist.name} delay={index * 0.1}>
                <div className={`group relative ${bgCard} overflow-hidden border ${borderColor}`}>
                  {/* Image - sharp corners, larger */}
                  <div className={`aspect-[4/5] ${isDark ? "bg-gradient-to-br from-accent/10 to-primary/10" : "bg-gradient-to-br from-accent/5 to-primary/5"} flex items-center justify-center`}>
                    <ImageIcon className={`w-20 h-20 ${textMuted}`} />
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-black via-black/60" : "from-black/80 via-black/40"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-accent font-mono mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {artist.style}
                    </p>
                    <h4 className="font-display text-xl font-semibold text-white mb-1">
                      {artist.name}
                    </h4>
                    <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      {artist.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className={`${bgCard} p-8 md:p-12 border ${borderColor} relative overflow-hidden`}>
              <div className="relative">
                <Quote className={`w-10 h-10 ${textMuted} mb-6`} />
                <h3 className={`font-display text-2xl md:text-3xl font-bold ${textPrimary} mb-8`}>
                  {content.comprendre.questionsTitle}
                </h3>
                <ul className="space-y-5">
                  {content.comprendre.questions.map((question, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className={`w-8 h-8 ${isDark ? "bg-primary/20" : "bg-primary/10"} flex items-center justify-center text-primary font-mono text-sm flex-shrink-0`}>
                        {i + 1}
                      </span>
                      <span className={`text-lg ${textSecondary} font-light italic`}>
                        {question}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Confirmation */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <button
              onClick={() => setHasUnderstood(!hasUnderstood)}
              className={`inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 transition-all duration-300 ${
                hasUnderstood
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : `border-current ${textMuted} hover:border-primary/50 hover:text-primary`
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                hasUnderstood ? "border-white bg-white" : "border-current"
              }`}>
                {hasUnderstood && <Check className="w-4 h-4 text-primary" />}
              </div>
              <span className="font-medium">
                {content.comprendre.confirmButton}
              </span>
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// ============================================
// STEP 2: INTERPRETER
// ============================================
function InterpreterStep({
  content,
  isDark,
  interpretation,
  setInterpretation,
}: {
  content: ReturnType<typeof useContent>["studioPageContent"];
  isDark: boolean;
  interpretation: Record<string, string>;
  setInterpretation: (v: Record<string, string>) => void;
}) {
  const bgCard = isDark ? "bg-[#111111]" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textPrimary = isDark ? "text-white" : "text-[#1A1A1A]";
  const textSecondary = isDark ? "text-white/60" : "text-gray-600";
  const textMuted = isDark ? "text-white/40" : "text-gray-400";
  const inputBg = isDark ? "bg-black/30" : "bg-gray-50";

  return (
    <div className="py-16 pb-40 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <div className={`w-16 h-16 mx-auto mb-6 ${isDark ? "bg-accent/10" : "bg-accent/5"} flex items-center justify-center`}>
              <Feather className="w-7 h-7 text-accent" />
            </div>
            <h2 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} mb-4`}>
              {content.interpreter.title}
            </h2>
            <p className={`${textSecondary} max-w-xl mx-auto`}>
              {content.interpreter.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {content.interpreter.questions.map((q, index) => (
            <FadeIn key={q.id} delay={index * 0.08}>
              <div className={`${bgCard} p-6 md:p-8 border ${borderColor}`}>
                <label className="block mb-5">
                  <span className="text-xs text-accent font-mono tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`font-display text-lg md:text-xl ${textPrimary} mt-2`}>
                    {q.question}
                  </h3>
                  <p className={`text-sm ${textMuted} mt-1`}>{q.hint}</p>
                </label>
                <textarea
                  value={interpretation[q.id] || ""}
                  onChange={(e) =>
                    setInterpretation({ ...interpretation, [q.id]: e.target.value })
                  }
                  placeholder={q.placeholder}
                  rows={4}
                  className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 resize-none transition-all`}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs ${
                    (interpretation[q.id]?.length || 0) >= 20
                      ? "text-green-500"
                      : textMuted
                  }`}>
                    {interpretation[q.id]?.length || 0} / 20 {content.interpreter.minChars}
                  </span>
                  {(interpretation[q.id]?.length || 0) >= 20 && (
                    <div className="w-5 h-5 bg-green-500/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// STEP 3: CREER
// ============================================
function CreerStep({
  content,
  isDark,
  uploadedImage,
  uploadedFileName,
  fileInputRef,
  handleFileUpload,
  setUploadedImage,
}: {
  content: ReturnType<typeof useContent>["studioPageContent"];
  isDark: boolean;
  uploadedImage: string | null;
  uploadedFileName: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUploadedImage: (v: string | null) => void;
}) {
  const bgCard = isDark ? "bg-[#111111]" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textPrimary = isDark ? "text-white" : "text-[#1A1A1A]";
  const textSecondary = isDark ? "text-white/60" : "text-gray-600";
  const textMuted = isDark ? "text-white/40" : "text-gray-400";

  return (
    <div className="py-16 pb-40 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <div className={`w-16 h-16 mx-auto mb-6 ${isDark ? "bg-accent/10" : "bg-accent/5"} flex items-center justify-center`}>
              <Upload className="w-7 h-7 text-accent" />
            </div>
            <h2 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} mb-4`}>
              {content.creer.title}
            </h2>
            <p className={`${textSecondary} max-w-xl mx-auto`}>
              {content.creer.subtitle}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={`${bgCard} border ${borderColor} p-6 md:p-8`}>
            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed ${borderColor} p-12 md:p-16 text-center cursor-pointer hover:border-primary/50 ${isDark ? "hover:bg-primary/5" : "hover:bg-primary/[0.02]"} transition-all group`}
              >
                <div className={`w-20 h-20 mx-auto mb-6 ${isDark ? "bg-white/5" : "bg-black/5"} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <ImageIcon className={`w-10 h-10 ${textMuted}`} />
                </div>
                <p className={`${textSecondary} mb-2 font-medium`}>
                  {content.creer.dropzone}
                </p>
                <p className={`${textMuted} text-sm`}>
                  {content.creer.formats}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`relative aspect-square max-w-md mx-auto ${isDark ? "bg-black/50" : "bg-gray-100"} overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Design uploade"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${textPrimary} font-medium`}>{uploadedFileName}</p>
                    <p className={`${textMuted} text-sm`}>{content.creer.uploaded}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className={`px-4 py-2 ${isDark ? "bg-white/10" : "bg-gray-100"} ${textSecondary} hover:bg-red-500/10 hover:text-red-500 transition-all`}
                  >
                    {content.creer.delete}
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={`mt-8 p-6 border ${borderColor} ${isDark ? "bg-accent/5" : "bg-accent/[0.02]"}`}>
            <h4 className={`font-display text-base font-semibold ${textPrimary} mb-4`}>
              {content.creer.tips.title}
            </h4>
            <ul className={`space-y-2 ${textSecondary} text-sm`}>
              {content.creer.tips.items.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">-</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// ============================================
// STEP 4: VISUALISER
// ============================================
function VisualiserStep({
  content,
  isDark,
  uploadedImage,
  garmentType,
  setGarmentType,
  garmentFit,
  setGarmentFit,
  garmentColor,
  setGarmentColor,
  artistInfo,
  setArtistInfo,
  interpretation,
  isSubmitting,
  isSubmitted,
  canSubmit,
  handleSubmit,
}: {
  content: ReturnType<typeof useContent>["studioPageContent"];
  isDark: boolean;
  uploadedImage: string | null;
  garmentType: GarmentType;
  setGarmentType: (v: GarmentType) => void;
  garmentFit: GarmentFit;
  setGarmentFit: (v: GarmentFit) => void;
  garmentColor: typeof content.colors[0];
  setGarmentColor: (v: typeof content.colors[0]) => void;
  artistInfo: { name: string; email: string; instagram: string; title: string };
  setArtistInfo: (v: { name: string; email: string; instagram: string; title: string }) => void;
  interpretation: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  canSubmit: boolean;
  handleSubmit: () => void;
}) {
  const bgCard = isDark ? "bg-[#111111]" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textPrimary = isDark ? "text-white" : "text-[#1A1A1A]";
  const textSecondary = isDark ? "text-white/60" : "text-gray-600";
  const textMuted = isDark ? "text-white/40" : "text-gray-400";
  const inputBg = isDark ? "bg-black/30" : "bg-gray-50";

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-500/10 flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          <h2 className={`font-display text-3xl font-bold ${textPrimary} mb-4`}>
            {content.visualiser.success.title}
          </h2>
          <p className={`${textSecondary} mb-8`}>
            {content.visualiser.success.message}
          </p>
          <div className={`p-5 ${bgCard} border ${borderColor} text-left`}>
            <p className={`text-sm ${textMuted} mb-2`}>{content.visualiser.yourMessage}</p>
            <p className={`${textPrimary} italic`}>"{interpretation.message}"</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <div className={`w-16 h-16 mx-auto mb-6 ${isDark ? "bg-accent/10" : "bg-accent/5"} flex items-center justify-center`}>
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h2 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} mb-4`}>
              {content.visualiser.title}
            </h2>
            <p className={`${textSecondary} max-w-xl mx-auto`}>
              {content.visualiser.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <FadeIn delay={0.1}>
            <div className={`${bgCard} border ${borderColor} p-6 md:p-8`}>
              <h3 className={`font-display text-lg font-semibold ${textPrimary} mb-6`}>
                {content.visualiser.preview}
              </h3>

              <div
                className="aspect-square flex items-center justify-center relative overflow-hidden mb-8"
                style={{ backgroundColor: garmentColor.hex }}
              >
                {/* Garment silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Shirt className={`w-64 h-64 ${garmentColor.dark ? "text-white" : "text-black"}`} />
                </div>

                {/* Design preview */}
                {uploadedImage && (
                  <div className="relative w-1/2 h-1/2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImage}
                      alt="Design preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <p className={`absolute bottom-4 left-4 text-xs font-mono ${garmentColor.dark ? "text-white/30" : "text-black/30"}`}>
                  {content.visualiser.types[garmentType]} • {content.visualiser.fits[garmentFit]}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-5">
                {/* Type */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.garmentType}</label>
                  <div className="flex gap-2">
                    {(["tshirt", "pull"] as GarmentType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setGarmentType(type)}
                        className={`flex-1 py-3 border transition-all ${
                          garmentType === type
                            ? "bg-primary border-primary text-white"
                            : `${inputBg} ${borderColor} ${textSecondary} hover:border-primary/30`
                        }`}
                      >
                        {content.visualiser.types[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fit */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.garmentFit}</label>
                  <div className="flex gap-2">
                    {(["slim", "regular", "oversize"] as GarmentFit[]).map((fit) => (
                      <button
                        key={fit}
                        onClick={() => setGarmentFit(fit)}
                        className={`flex-1 py-3 border transition-all capitalize ${
                          garmentFit === fit
                            ? "bg-primary border-primary text-white"
                            : `${inputBg} ${borderColor} ${textSecondary} hover:border-primary/30`
                        }`}
                      >
                        {content.visualiser.fits[fit]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.garmentColor}</label>
                  <div className="flex flex-wrap gap-3">
                    {content.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setGarmentColor(color)}
                        title={color.name}
                        className={`w-10 h-10 border-2 transition-all ${
                          garmentColor.hex === color.hex
                            ? "border-primary scale-110"
                            : `border-transparent hover:scale-105 ${isDark ? "ring-1 ring-white/10" : "ring-1 ring-black/10"}`
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {garmentColor.hex === color.hex && (
                          <Check className={`w-5 h-5 mx-auto ${color.dark ? "text-white" : "text-black"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            <div className={`${bgCard} border ${borderColor} p-6 md:p-8`}>
              <h3 className={`font-display text-lg font-semibold ${textPrimary} mb-6`}>
                {content.visualiser.artistInfo}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.fields.title}</label>
                  <input
                    type="text"
                    value={artistInfo.title}
                    onChange={(e) => setArtistInfo({ ...artistInfo, title: e.target.value })}
                    placeholder={content.visualiser.fields.titlePlaceholder}
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all`}
                  />
                </div>

                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.fields.name}</label>
                  <input
                    type="text"
                    value={artistInfo.name}
                    onChange={(e) => setArtistInfo({ ...artistInfo, name: e.target.value })}
                    placeholder={content.visualiser.fields.namePlaceholder}
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all`}
                  />
                </div>

                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.fields.email}</label>
                  <input
                    type="email"
                    value={artistInfo.email}
                    onChange={(e) => setArtistInfo({ ...artistInfo, email: e.target.value })}
                    placeholder={content.visualiser.fields.emailPlaceholder}
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all`}
                  />
                </div>

                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>{content.visualiser.fields.instagram}</label>
                  <input
                    type="text"
                    value={artistInfo.instagram}
                    onChange={(e) => setArtistInfo({ ...artistInfo, instagram: e.target.value })}
                    placeholder={content.visualiser.fields.instagramPlaceholder}
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all`}
                  />
                </div>

                {/* Message summary */}
                <div className={`mt-6 p-5 border ${borderColor} ${isDark ? "bg-accent/5" : "bg-accent/[0.02]"}`}>
                  <h4 className="text-sm text-accent mb-2">{content.visualiser.yourMessage}</h4>
                  <p className={`${textPrimary} italic`}>"{interpretation.message}"</p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`w-full mt-6 py-4 font-semibold flex items-center justify-center gap-3 transition-all ${
                    canSubmit && !isSubmitting
                      ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                      : `${inputBg} ${textMuted} cursor-not-allowed border ${borderColor}`
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{content.visualiser.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{content.visualiser.submit}</span>
                    </>
                  )}
                </button>

                <p className={`text-xs ${textMuted} text-center mt-4`}>
                  {content.visualiser.terms}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

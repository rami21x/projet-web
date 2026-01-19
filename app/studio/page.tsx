"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sun,
  Sparkles,
  Heart,
  User,
  Check,
  Shirt,
  Image as ImageIcon,
  Palette,
  X,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

// Types
type Step = "comprendre" | "interpreter" | "creer" | "visualiser";
type GarmentType = "tshirt" | "pull";
type GarmentFit = "oversize" | "regular" | "slim";

// Couleurs disponibles
const GARMENT_COLORS = [
  { name: "Blanc", hex: "#FFFFFF", dark: false },
  { name: "Beige", hex: "#D4C5B9", dark: false },
  { name: "Gris", hex: "#B8B8B8", dark: false },
  { name: "Noir", hex: "#1A1A1A", dark: true },
  { name: "Rouge Arteral", hex: "#8B0000", dark: true },
  { name: "Camel", hex: "#A0522D", dark: true },
];

// Philosophes et leurs citations
const PHILOSOPHERS = [
  {
    name: "Friedrich Nietzsche",
    quote: "Il faut porter en soi un chaos pour enfanter une étoile dansante.",
    concept: "Le chaos comme matrice de la création",
    image: "/images/studio/nietzsche.jpg",
  },
  {
    name: "Carl Jung",
    quote: "L'ombre est cette partie de nous-mêmes que nous refusons de voir.",
    concept: "L'union de l'ombre et de la lumière",
    image: "/images/studio/jung.jpg",
  },
  {
    name: "Lao-Tseu",
    quote: "La douceur surpasse la dureté, et la faiblesse surpasse la force.",
    concept: "L'équilibre du Yin et du Yang",
    image: "/images/studio/laotzu.jpg",
  },
];

// Artistes de référence
const ARTISTS = [
  {
    name: "Francis Bacon",
    style: "Expressionnisme figuratif",
    description: "La distorsion émotionnelle du corps humain",
    image: "/images/studio/bacon.jpg",
  },
  {
    name: "Jean Dubuffet",
    style: "Art Brut",
    description: "Le chaos ordonné, la matière brute",
    image: "/images/studio/dubuffet.jpg",
  },
  {
    name: "Willem de Kooning",
    style: "Expressionnisme abstrait",
    description: "La tension entre forme et chaos",
    image: "/images/studio/dekooning.jpg",
  },
];

// Symboles ARTERAL
const SYMBOLS = [
  {
    name: "Le Feu",
    meaning: "Yang extrême - passion, transformation, conscience",
    icon: Flame,
  },
  {
    name: "L'Éclipse",
    meaning: "L'union des opposés - lumière et ombre en harmonie",
    icon: Moon,
  },
  {
    name: "La Danse",
    meaning: "Transformation de la souffrance en beauté",
    icon: Sparkles,
  },
  {
    name: "Le Miroir",
    meaning: "Narcisse - se chercher soi-même dans l'autre",
    icon: Eye,
  },
];

// Questions pour l'interprétation
const INTERPRETATION_QUESTIONS = [
  {
    id: "duality",
    question: "Quelle dualité explorez-vous dans votre œuvre ?",
    placeholder: "Ex: La frontière entre l'amour qui donne et celui qui consume...",
    hint: "Amour ↔ Égoïsme, Lumière ↔ Ombre, Ordre ↔ Chaos...",
  },
  {
    id: "harmony",
    question: "Comment votre création transmet-elle l'harmonie du chaos ?",
    placeholder: "Décrivez comment les éléments opposés coexistent dans votre design...",
    hint: "Le chaos n'est pas le vide, c'est le trop-plein de forces avant la forme.",
  },
  {
    id: "feeling",
    question: "Quel sentiment voulez-vous provoquer chez celui qui portera ce vêtement ?",
    placeholder: "Ex: Une prise de conscience, un questionnement sur ses propres contradictions...",
    hint: "Le vêtement devient miroir de l'âme.",
  },
  {
    id: "message",
    question: "En une phrase : quel est le message de votre œuvre ?",
    placeholder: "Ex: Aimer, c'est parfois se perdre pour mieux se retrouver.",
    hint: "La clarté naît de la contemplation du chaos.",
  },
];

export default function StudioPage() {
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
  const [garmentColor, setGarmentColor] = useState(GARMENT_COLORS[0]);

  // Submission state
  const [artistInfo, setArtistInfo] = useState({
    name: "",
    email: "",
    instagram: "",
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: "comprendre", label: "Comprendre", icon: BookOpen },
    { id: "interpreter", label: "Interpréter", icon: Feather },
    { id: "creer", label: "Créer", icon: Upload },
    { id: "visualiser", label: "Visualiser", icon: Eye },
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

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "comprendre":
        return <ComprendreStep hasUnderstood={hasUnderstood} setHasUnderstood={setHasUnderstood} />;
      case "interpreter":
        return (
          <InterpreterStep
            interpretation={interpretation}
            setInterpretation={setInterpretation}
          />
        );
      case "creer":
        return (
          <CreerStep
            uploadedImage={uploadedImage}
            uploadedFileName={uploadedFileName}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            setUploadedImage={setUploadedImage}
          />
        );
      case "visualiser":
        return (
          <VisualiserStep
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
        );
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

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-white">ARTERAL STUDIO</h1>
              <p className="text-xs text-white/50 font-mono tracking-wider">PORTAIL D'INTERPRÉTATION</p>
            </div>

            {/* Step indicators */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isPast = steps.findIndex(s => s.id === currentStep) > index;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      // Only allow going back, not forward
                      if (isPast) setCurrentStep(step.id);
                    }}
                    disabled={!isPast && !isActive}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : isPast
                        ? "bg-white/10 text-white/80 hover:bg-white/20"
                        : "bg-white/5 text-white/30"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile step indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isPast = steps.findIndex(s => s.id === currentStep) > index;

              return (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? "w-8 bg-primary" : isPast ? "bg-white/60" : "bg-white/20"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {currentStep !== "visualiser" && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent pt-12 pb-6">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <button
              onClick={goToPrevStep}
              disabled={currentStep === "comprendre"}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentStep === "comprendre"
                  ? "opacity-0 pointer-events-none"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>

            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                canGoNext()
                  ? "bg-primary text-white hover:bg-primary/90 hover:scale-105"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <span>Continuer</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STEP 1: COMPRENDRE (Museum Section)
// ============================================
function ComprendreStep({
  hasUnderstood,
  setHasUnderstood
}: {
  hasUnderstood: boolean;
  setHasUnderstood: (v: boolean) => void;
}) {
  return (
    <div className="pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.4em] text-accent mb-6">
              SÉRIE NARCISSE AMOUREUX
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
              L'Harmonie<br />
              <span className="text-primary">du Chaos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Dans chaque acte d'amour réside une part d'égoïsme.<br />
              Dans chaque égoïsme, une quête d'amour.<br />
              <span className="text-accent">C'est le chaos qui crée l'harmonie.</span>
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* What we're looking for */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-500" />
                  Ce que nous cherchons
                </h3>
                <ul className="space-y-4">
                  {[
                    "Une œuvre qui QUESTIONNE, pas qui répond",
                    "Une tension entre deux forces opposées",
                    "Un miroir tendu au spectateur",
                    "Votre vérité, pas la nôtre",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <ArrowRight className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <X className="w-6 h-6 text-red-500" />
                  Ce que nous ne cherchons pas
                </h3>
                <ul className="space-y-4">
                  {[
                    "Un style imposé ou des couleurs obligatoires",
                    "Une copie de notre univers visuel",
                    "Une illustration littérale du concept",
                    "Une œuvre sans profondeur philosophique",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/50">
                      <X className="w-5 h-5 text-red-500/50 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophers Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.3em] text-accent text-center mb-4">
              NOS INSPIRATIONS
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-16">
              Les Penseurs du Chaos
            </h3>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {PHILOSOPHERS.map((philosopher, index) => (
              <FadeIn key={philosopher.name} delay={index * 0.15}>
                <div className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500">
                  {/* Image placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-10 h-10 text-white/30" />
                    </div>
                    <p className="absolute bottom-4 left-4 text-xs text-white/30 font-mono">
                      {philosopher.image}
                    </p>
                  </div>

                  <div className="p-6">
                    <h4 className="font-display text-xl font-bold text-white mb-2">
                      {philosopher.name}
                    </h4>
                    <p className="text-sm text-accent mb-4">{philosopher.concept}</p>
                    <blockquote className="text-white/60 italic border-l-2 border-primary pl-4">
                      "{philosopher.quote}"
                    </blockquote>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Symbols Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.3em] text-accent text-center mb-4">
              LANGAGE VISUEL
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-16">
              Les Symboles de la Dualité
            </h3>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SYMBOLS.map((symbol, index) => {
              const Icon = symbol.icon;
              return (
                <FadeIn key={symbol.name} delay={index * 0.1}>
                  <div className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      {symbol.name}
                    </h4>
                    <p className="text-sm text-white/50">{symbol.meaning}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.3em] text-accent text-center mb-4">
              RÉFÉRENCES ARTISTIQUES
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-4">
              L'Art du Chaos Ordonné
            </h3>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Ces artistes ne sont pas des modèles à copier, mais des portes d'entrée
              vers une compréhension de l'expression émotionnelle brute.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTISTS.map((artist, index) => (
              <FadeIn key={artist.name} delay={index * 0.15}>
                <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 group">
                  {/* Image placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-white/20" />
                    <p className="absolute bottom-4 left-4 text-xs text-white/30 font-mono">
                      {artist.image}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-accent font-mono mb-1">{artist.style}</p>
                    <h4 className="font-display text-xl font-bold text-white mb-2">
                      {artist.name}
                    </h4>
                    <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {artist.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Questions to guide */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl p-8 md:p-12 border border-white/10">
              <Quote className="w-12 h-12 text-accent/50 mb-6" />
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
                Questions pour Guider Votre Création
              </h3>
              <ul className="space-y-6">
                {[
                  "Qu'est-ce que l'amour vous a pris ?",
                  "Qu'est-ce que l'égoïsme vous a donné ?",
                  "Où commence l'un, où finit l'autre ?",
                  "Peut-on aimer sans se perdre ?",
                ].map((question, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xl text-white/80 font-light italic">
                      {question}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Understanding confirmation */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <button
              onClick={() => setHasUnderstood(!hasUnderstood)}
              className={`inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 transition-all duration-300 ${
                hasUnderstood
                  ? "bg-primary border-primary text-white"
                  : "border-white/30 text-white/70 hover:border-white/50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                hasUnderstood ? "border-white bg-white" : "border-current"
              }`}>
                {hasUnderstood && <Check className="w-4 h-4 text-primary" />}
              </div>
              <span className="font-medium">
                J'ai compris le concept et je suis prêt(e) à créer
              </span>
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// ============================================
// STEP 2: INTERPRETER (Philosophy Form)
// ============================================
function InterpreterStep({
  interpretation,
  setInterpretation,
}: {
  interpretation: Record<string, string>;
  setInterpretation: (v: Record<string, string>) => void;
}) {
  return (
    <div className="py-12 pb-32 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <Feather className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Votre Interprétation
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Avant de créer, exprimez votre vision. Ces réponses nous aideront
              à comprendre la profondeur de votre œuvre.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {INTERPRETATION_QUESTIONS.map((q, index) => (
            <FadeIn key={q.id} delay={index * 0.1}>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <label className="block mb-4">
                  <span className="text-sm text-accent font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-white mt-1">
                    {q.question}
                  </h3>
                  <p className="text-sm text-white/40 mt-1">{q.hint}</p>
                </label>
                <textarea
                  value={interpretation[q.id] || ""}
                  onChange={(e) =>
                    setInterpretation({ ...interpretation, [q.id]: e.target.value })
                  }
                  placeholder={q.placeholder}
                  rows={4}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 resize-none"
                />
                <div className="flex justify-between mt-2">
                  <span className={`text-xs ${
                    (interpretation[q.id]?.length || 0) >= 20
                      ? "text-green-500"
                      : "text-white/30"
                  }`}>
                    {interpretation[q.id]?.length || 0} / 20 min
                  </span>
                  {(interpretation[q.id]?.length || 0) >= 20 && (
                    <Check className="w-4 h-4 text-green-500" />
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
// STEP 3: CREER (Upload)
// ============================================
function CreerStep({
  uploadedImage,
  uploadedFileName,
  fileInputRef,
  handleFileUpload,
  setUploadedImage,
}: {
  uploadedImage: string | null;
  uploadedFileName: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUploadedImage: (v: string | null) => void;
}) {
  return (
    <div className="py-12 pb-32 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Uploadez Votre Œuvre
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Créez votre design avec vos outils préférés (Photoshop, Procreate, dessin scanné...)
              puis uploadez-le ici.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-2">
                  Cliquez ou glissez votre fichier ici
                </p>
                <p className="text-white/40 text-sm">
                  PNG, JPG, WEBP • Max 10MB • Haute résolution recommandée
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative aspect-square max-w-md mx-auto bg-black/50 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Design uploadé"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{uploadedFileName}</p>
                    <p className="text-white/40 text-sm">Image uploadée</p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all"
                  >
                    Supprimer
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
          <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
            <h4 className="font-display text-lg text-white mb-3">Conseils pour votre design</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>• Utilisez un fond transparent (PNG) pour une meilleure intégration</li>
              <li>• Haute résolution : minimum 2000x2000px recommandé</li>
              <li>• Le design sera centré sur le vêtement</li>
              <li>• Les couleurs vives ressortent mieux sur les vêtements clairs</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// ============================================
// STEP 4: VISUALISER (Mockup + Submit)
// ============================================
function VisualiserStep({
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
  uploadedImage: string | null;
  garmentType: GarmentType;
  setGarmentType: (v: GarmentType) => void;
  garmentFit: GarmentFit;
  setGarmentFit: (v: GarmentFit) => void;
  garmentColor: typeof GARMENT_COLORS[0];
  setGarmentColor: (v: typeof GARMENT_COLORS[0]) => void;
  artistInfo: { name: string; email: string; instagram: string; title: string };
  setArtistInfo: (v: { name: string; email: string; instagram: string; title: string }) => void;
  interpretation: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  canSubmit: boolean;
  handleSubmit: () => void;
}) {
  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Œuvre Soumise !
          </h2>
          <p className="text-white/60 mb-8">
            Votre interprétation de l'Harmonie du Chaos a été reçue.
            Nous vous contacterons par email après la délibération du jury.
          </p>
          <div className="p-4 bg-white/5 rounded-xl text-left">
            <p className="text-sm text-white/40 mb-2">Votre message :</p>
            <p className="text-white italic">"{interpretation.message}"</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <Eye className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Visualisez & Soumettez
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Choisissez le support de votre œuvre et finalisez votre soumission.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <FadeIn delay={0.1}>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-xl text-white mb-6">Aperçu</h3>

              <div
                className="aspect-square rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: garmentColor.hex }}
              >
                {/* Garment silhouette placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
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

                <p className="absolute bottom-4 left-4 text-xs opacity-50 font-mono">
                  {garmentType === "tshirt" ? "T-SHIRT" : "SWEATSHIRT"} • {garmentFit.toUpperCase()}
                </p>
              </div>

              {/* Garment options */}
              <div className="mt-6 space-y-4">
                {/* Type */}
                <div>
                  <label className="text-sm text-white/50 mb-2 block">Type</label>
                  <div className="flex gap-2">
                    {(["tshirt", "pull"] as GarmentType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setGarmentType(type)}
                        className={`flex-1 py-3 rounded-lg border transition-all ${
                          garmentType === type
                            ? "bg-primary border-primary text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                        }`}
                      >
                        {type === "tshirt" ? "T-Shirt" : "Sweatshirt"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fit */}
                <div>
                  <label className="text-sm text-white/50 mb-2 block">Coupe</label>
                  <div className="flex gap-2">
                    {(["slim", "regular", "oversize"] as GarmentFit[]).map((fit) => (
                      <button
                        key={fit}
                        onClick={() => setGarmentFit(fit)}
                        className={`flex-1 py-3 rounded-lg border transition-all capitalize ${
                          garmentFit === fit
                            ? "bg-primary border-primary text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                        }`}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="text-sm text-white/50 mb-2 block">Couleur</label>
                  <div className="flex flex-wrap gap-2">
                    {GARMENT_COLORS.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setGarmentColor(color)}
                        title={color.name}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          garmentColor.hex === color.hex
                            ? "border-primary scale-110"
                            : "border-transparent hover:scale-105"
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

          {/* Submission form */}
          <FadeIn delay={0.2}>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-xl text-white mb-6">Informations Artiste</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/50 mb-2 block">Titre de l'œuvre *</label>
                  <input
                    type="text"
                    value={artistInfo.title}
                    onChange={(e) => setArtistInfo({ ...artistInfo, title: e.target.value })}
                    placeholder="Ex: Le Reflet Brisé"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/50 mb-2 block">Votre nom *</label>
                  <input
                    type="text"
                    value={artistInfo.name}
                    onChange={(e) => setArtistInfo({ ...artistInfo, name: e.target.value })}
                    placeholder="Nom ou pseudonyme"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/50 mb-2 block">Email *</label>
                  <input
                    type="email"
                    value={artistInfo.email}
                    onChange={(e) => setArtistInfo({ ...artistInfo, email: e.target.value })}
                    placeholder="pour vous contacter"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/50 mb-2 block">Instagram (optionnel)</label>
                  <input
                    type="text"
                    value={artistInfo.instagram}
                    onChange={(e) => setArtistInfo({ ...artistInfo, instagram: e.target.value })}
                    placeholder="@votre_compte"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                  />
                </div>

                {/* Interpretation summary */}
                <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <h4 className="text-sm text-accent mb-2">Votre message</h4>
                  <p className="text-white italic">"{interpretation.message}"</p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
                    canSubmit && !isSubmitting
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Soumettre mon œuvre</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-white/30 text-center mt-4">
                  En soumettant, vous acceptez que votre œuvre soit utilisée
                  dans le cadre du concours ARTERAL.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

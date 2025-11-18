"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Send,
  Palette,
  Check,
  Shirt,
  Wind,
  Layers,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

// Types de vêtements
type GarmentType = "tshirt" | "pull";
type GarmentFit = "oversize" | "regular" | "slim";
type GarmentSide = "front" | "back";

// Palette de couleurs Arteral étendue
const ARTERAL_COLORS = [
  { name: "Blanc Pur", hex: "#FFFFFF", dark: false, fileName: "white" },
  { name: "Blanc Cassé", hex: "#E8E8E8", dark: false, fileName: "offwhite" },
  { name: "Beige Sable", hex: "#D4C5B9", dark: false, fileName: "beige" },
  { name: "Gris Clair", hex: "#B8B8B8", dark: false, fileName: "lightgray" },
  { name: "Gris Anthracite", hex: "#3E4149", dark: true, fileName: "anthracite" },
  { name: "Noir Profond", hex: "#1A1A1A", dark: true, fileName: "black" },
  { name: "Navy", hex: "#1B2845", dark: true, fileName: "navy" },
  { name: "Kaki", hex: "#8B8D7A", dark: true, fileName: "khaki" },
  { name: "Rouge Arteral", hex: "#8B0000", dark: true, fileName: "red" },
  { name: "Bordeaux", hex: "#7D0633", dark: true, fileName: "bordeaux" },
  { name: "Camel", hex: "#A0522D", dark: true, fileName: "camel" },
  { name: "Olive", hex: "#6B7353", dark: true, fileName: "olive" },
];

interface Design {
  id: string;
  artistName: string;
  email: string;
  title: string;
  philosophy: string;
  imageData: string;
  designData: string;
  timestamp: number;
  likes: number;
  comments: number;
  social?: string;
  garmentType: GarmentType;
  garmentFit: GarmentFit;
  garmentColor: string;
  garmentSide: GarmentSide;
}

export default function StudioPage() {
  // Configuration étape
  const [step, setStep] = useState<"config" | "design">("config");

  // Configuration du vêtement
  const [garmentType, setGarmentType] = useState<GarmentType>("tshirt");
  const [garmentFit, setGarmentFit] = useState<GarmentFit>("regular");
  const [garmentColor, setGarmentColor] = useState("#FFFFFF");
  const [garmentSide, setGarmentSide] = useState<GarmentSide>("front");

  // Design
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [designScale, setDesignScale] = useState(1);
  const [designX, setDesignX] = useState(50);
  const [designY, setDesignY] = useState(45);
  const [rotation, setRotation] = useState(0);

  // Form states
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [social, setSocial] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obtenir les dimensions selon le type et la coupe
  const getGarmentDimensions = () => {
    const baseWidth = 400;
    const baseHeight = 500;

    let widthMultiplier = 1;
    let shoulderWidth = 1;

    switch (garmentFit) {
      case "oversize":
        widthMultiplier = 1.3;
        shoulderWidth = 1.4;
        break;
      case "regular":
        widthMultiplier = 1;
        shoulderWidth = 1.1;
        break;
      case "slim":
        widthMultiplier = 0.85;
        shoulderWidth = 0.95;
        break;
    }

    return {
      bodyWidth: baseWidth * widthMultiplier,
      bodyHeight: baseHeight,
      shoulderWidth: baseWidth * shoulderWidth,
      sleeveLength: garmentType === "tshirt" ? 80 : 200,
    };
  };

  // Render garment photo with design overlay
  useEffect(() => {
    if (!canvasRef.current || step === "config") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 900;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get the color file name
    const selectedColor = ARTERAL_COLORS.find((c) => c.hex === garmentColor);
    const colorFileName = selectedColor?.fileName || "white";
    const isDark = selectedColor?.dark || false;

    // Build the garment photo path using flat naming convention
    const garmentPhotoPath = `/images/garments/public-images-garments-${garmentType}-${garmentFit}-${garmentSide}-${colorFileName}.png`;

    // Load the garment photo
    const garmentImg = new Image();

    garmentImg.onload = () => {
      // Draw the garment photo centered on canvas
      const aspectRatio = garmentImg.width / garmentImg.height;
      let drawWidth = canvas.width * 0.8;
      let drawHeight = drawWidth / aspectRatio;

      if (drawHeight > canvas.height * 0.9) {
        drawHeight = canvas.height * 0.9;
        drawWidth = drawHeight * aspectRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(garmentImg, x, y, drawWidth, drawHeight);

      // Draw uploaded design on top of garment
      if (uploadedImage) {
        const designImg = new Image();
        designImg.onload = () => {
          ctx.save();

          const designCenterX = canvas.width * (designX / 100);
          const designCenterY = canvas.height * (designY / 100);

          ctx.translate(designCenterX, designCenterY);
          ctx.rotate((rotation * Math.PI) / 180);

          const maxWidth = 250 * designScale;
          const maxHeight = 250 * designScale;

          let designDrawWidth = maxWidth;
          let designDrawHeight = (designImg.height / designImg.width) * maxWidth;

          if (designDrawHeight > maxHeight) {
            designDrawHeight = maxHeight;
            designDrawWidth = (designImg.width / designImg.height) * maxHeight;
          }

          ctx.drawImage(
            designImg,
            -designDrawWidth / 2,
            -designDrawHeight / 2,
            designDrawWidth,
            designDrawHeight
          );

          ctx.restore();
        };
        designImg.src = uploadedImage;
      }

      // Add watermark
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
      ctx.font = "12px monospace";
      ctx.fillText("ARTERAL STUDIO", 10, canvas.height - 10);
    };

    garmentImg.onerror = () => {
      // Fallback: show placeholder if photo doesn't exist
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#999";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Photo manquante", canvas.width / 2, canvas.height / 2 - 40);
      ctx.font = "14px sans-serif";
      ctx.fillText(garmentPhotoPath, canvas.width / 2, canvas.height / 2);
      ctx.fillText("Ajoutez cette photo pour voir le rendu", canvas.width / 2, canvas.height / 2 + 30);

      // Still draw the uploaded design if present
      if (uploadedImage) {
        const designImg = new Image();
        designImg.onload = () => {
          ctx.save();

          const designCenterX = canvas.width * (designX / 100);
          const designCenterY = canvas.height * (designY / 100);

          ctx.translate(designCenterX, designCenterY);
          ctx.rotate((rotation * Math.PI) / 180);

          const maxWidth = 250 * designScale;
          const maxHeight = 250 * designScale;

          let designDrawWidth = maxWidth;
          let designDrawHeight = (designImg.height / designImg.width) * maxWidth;

          if (designDrawHeight > maxHeight) {
            designDrawHeight = maxHeight;
            designDrawWidth = (designImg.width / designImg.height) * maxHeight;
          }

          ctx.drawImage(
            designImg,
            -designDrawWidth / 2,
            -designDrawHeight / 2,
            designDrawWidth,
            designDrawHeight
          );

          ctx.restore();
        };
        designImg.src = uploadedImage;
      }
    };

    garmentImg.src = garmentPhotoPath;
  }, [uploadedImage, garmentType, garmentFit, garmentColor, garmentSide, designScale, designX, designY, rotation, step]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez uploader une image (PNG, JPG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image est trop grande. Maximum 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const downloadDesign = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `arteral-${garmentType}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedImage || !canvasRef.current) {
      alert("Veuillez uploader et créer un design d'abord");
      return;
    }

    const design: Design = {
      id: `design-${Date.now()}`,
      artistName,
      email,
      title,
      philosophy,
      social,
      imageData: uploadedImage,
      designData: canvasRef.current.toDataURL("image/png"),
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      garmentType,
      garmentFit,
      garmentColor,
      garmentSide,
    };

    const existingDesigns = JSON.parse(
      localStorage.getItem("arteral-designs") || "[]"
    );

    existingDesigns.push(design);
    localStorage.setItem("arteral-designs", JSON.stringify(existingDesigns));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setStep("config");
      setUploadedImage(null);
      setArtistName("");
      setEmail("");
      setTitle("");
      setPhilosophy("");
      setSocial("");
      setDesignScale(1);
      setDesignX(50);
      setDesignY(45);
      setRotation(0);
      setGarmentType("tshirt");
      setGarmentFit("regular");
      setGarmentColor("#FFFFFF");
      setGarmentSide("front");
    }, 3000);
  };

  const startDesigning = () => {
    setStep("design");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark via-primary/20 to-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 0, 0, 0.1) 35px, rgba(139, 0, 0, 0.1) 70px)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Palette className="w-10 h-10 text-primary" />
              </div>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Studio Arteral
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto">
              Configurez votre vêtement. Visualisez votre œuvre. Créez l'art porté.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Configuration or Design */}
      <AnimatePresence mode="wait">
        {step === "config" ? (
          <motion.section
            key="config"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="py-16 md:py-24 bg-light dark:bg-dark/50"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="bg-white dark:bg-dark/80 p-8 md:p-12 rounded-lg shadow-2xl border-2 border-primary/20">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-dark dark:text-white mb-8 text-center">
                    Configurez votre vêtement
                  </h2>

                  {/* Type de vêtement */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-dark dark:text-white mb-4">
                      1. Type de vêtement
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setGarmentType("tshirt")}
                        className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                          garmentType === "tshirt"
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-dark/20 dark:border-white/20 hover:border-primary/50"
                        }`}
                      >
                        <Shirt
                          className={`w-12 h-12 mx-auto mb-3 ${
                            garmentType === "tshirt"
                              ? "text-primary"
                              : "text-dark/40 dark:text-white/40"
                          }`}
                        />
                        <p
                          className={`font-body text-lg font-semibold ${
                            garmentType === "tshirt"
                              ? "text-primary"
                              : "text-dark dark:text-white"
                          }`}
                        >
                          T-Shirt
                        </p>
                        <p className="font-body text-sm text-dark/60 dark:text-white/60 mt-1">
                          Manches courtes, léger
                        </p>
                      </button>

                      <button
                        onClick={() => setGarmentType("pull")}
                        className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                          garmentType === "pull"
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-dark/20 dark:border-white/20 hover:border-primary/50"
                        }`}
                      >
                        <Wind
                          className={`w-12 h-12 mx-auto mb-3 ${
                            garmentType === "pull"
                              ? "text-primary"
                              : "text-dark/40 dark:text-white/40"
                          }`}
                        />
                        <p
                          className={`font-body text-lg font-semibold ${
                            garmentType === "pull"
                              ? "text-primary"
                              : "text-dark dark:text-white"
                          }`}
                        >
                          Pull
                        </p>
                        <p className="font-body text-sm text-dark/60 dark:text-white/60 mt-1">
                          Manches longues, confort
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Coupe */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-dark dark:text-white mb-4">
                      2. Coupe
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["oversize", "regular", "slim"].map((fit) => (
                        <button
                          key={fit}
                          onClick={() => setGarmentFit(fit as GarmentFit)}
                          className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                            garmentFit === fit
                              ? "border-primary bg-primary/10 shadow-lg"
                              : "border-dark/20 dark:border-white/20 hover:border-primary/50"
                          }`}
                        >
                          <Layers
                            className={`w-8 h-8 mx-auto mb-2 ${
                              garmentFit === fit
                                ? "text-primary"
                                : "text-dark/40 dark:text-white/40"
                            }`}
                          />
                          <p
                            className={`font-body font-semibold capitalize ${
                              garmentFit === fit
                                ? "text-primary"
                                : "text-dark dark:text-white"
                            }`}
                          >
                            {fit === "oversize" && "Oversize"}
                            {fit === "regular" && "Regular"}
                            {fit === "slim" && "Slim Fit"}
                          </p>
                          <p className="font-body text-xs text-dark/60 dark:text-white/60 mt-1">
                            {fit === "oversize" && "Ample, décontracté"}
                            {fit === "regular" && "Coupe classique"}
                            {fit === "slim" && "Ajusté, moderne"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Couleur */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-dark dark:text-white mb-4">
                      3. Couleur
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {ARTERAL_COLORS.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => setGarmentColor(color.hex)}
                          className={`group relative aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                            garmentColor === color.hex
                              ? "border-primary shadow-lg ring-2 ring-primary ring-offset-2"
                              : "border-dark/20 dark:border-white/20"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {garmentColor === color.hex && (
                            <Check
                              className={`w-6 h-6 absolute inset-0 m-auto ${
                                color.dark ? "text-white" : "text-dark"
                              }`}
                            />
                          )}
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            <p className="font-body text-xs text-dark dark:text-white bg-white dark:bg-dark px-2 py-1 rounded shadow-lg">
                              {color.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aperçu de la configuration */}
                  <div className="bg-light dark:bg-dark/50 p-6 rounded-lg mb-8">
                    <p className="font-body text-sm font-semibold text-dark dark:text-white mb-3">
                      Votre configuration :
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-sm font-semibold">
                        {garmentType === "tshirt" ? "T-Shirt" : "Pull"}
                      </span>
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-body text-sm font-semibold capitalize">
                        {garmentFit === "oversize" && "Oversize"}
                        {garmentFit === "regular" && "Regular"}
                        {garmentFit === "slim" && "Slim Fit"}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full font-body text-sm font-semibold flex items-center gap-2"
                        style={{
                          backgroundColor: `${garmentColor}20`,
                          color: ARTERAL_COLORS.find((c) => c.hex === garmentColor)
                            ?.dark
                            ? "#FFFFFF"
                            : "#1A1A1A",
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: garmentColor }}
                        />
                        {ARTERAL_COLORS.find((c) => c.hex === garmentColor)?.name}
                      </span>
                    </div>
                  </div>

                  {/* Bouton commencer */}
                  <button
                    onClick={startDesigning}
                    className="w-full flex items-center justify-center gap-3 font-body font-semibold text-lg px-8 py-5 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                  >
                    <Palette className="w-6 h-6" />
                    Commencer le design
                  </button>
                </div>
              </FadeIn>
            </div>
          </motion.section>
        ) : (
          // Design Section (existing code adapted)
          <motion.section
            key="design"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="py-16 md:py-24 bg-light dark:bg-dark/50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back button */}
              <button
                onClick={() => setStep("config")}
                className="mb-8 flex items-center gap-2 font-body text-primary hover:text-accent transition-colors"
              >
                ← Modifier la configuration
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Left: Preview - Takes 3 columns for larger display */}
                <div className="lg:col-span-3">
                  <FadeIn>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-white via-light/50 to-white dark:from-dark/90 dark:via-dark/70 dark:to-dark/90 p-8 rounded-2xl shadow-2xl border-2 border-primary/30 dark:border-primary/20 sticky top-8 overflow-hidden relative"
                    >
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />

                      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark dark:text-white mb-8 flex items-center gap-3 relative z-10">
                        <motion.div
                          animate={{ rotate: uploadedImage ? 360 : 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Move className="w-8 h-8 text-primary" />
                        </motion.div>
                        Live Preview
                      </h2>

                      {/* Canvas - Larger and more prominent */}
                      <motion.div
                        className="relative bg-gradient-to-br from-dark/5 via-white to-dark/5 dark:from-white/5 dark:via-dark/50 dark:to-white/5 rounded-xl p-6 mb-6 shadow-inner"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 opacity-5 dark:opacity-10"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, #8B0000 0px, #8B0000 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #8B0000 0px, #8B0000 1px, transparent 1px, transparent 40px)',
                          }}
                        />

                        <canvas
                          ref={canvasRef}
                          className="w-full h-auto rounded-lg relative z-10 shadow-lg"
                          style={{ maxHeight: "900px" }}
                        />

                        {!uploadedImage && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center z-20"
                          >
                            <div className="text-center">
                              <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Upload className="w-20 h-20 text-primary/30 dark:text-primary/40 mx-auto mb-4" />
                              </motion.div>
                              <p className="font-body text-lg text-dark/50 dark:text-white/50 font-semibold">
                                Upload your artwork to begin
                              </p>
                              <p className="font-body text-sm text-dark/30 dark:text-white/30 mt-2">
                                PNG, JPG - Max 5 MB
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Configuration display */}
                      <div className="flex items-center justify-between mb-6 p-4 bg-light dark:bg-dark/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {garmentType === "tshirt" ? (
                            <Shirt className="w-5 h-5 text-primary" />
                          ) : (
                            <Wind className="w-5 h-5 text-primary" />
                          )}
                          <span className="font-body text-sm font-semibold text-dark dark:text-white capitalize">
                            {garmentType === "tshirt" ? "T-Shirt" : "Pull"} {garmentFit}
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                          style={{ backgroundColor: garmentColor }}
                        />
                      </div>

                      {/* Front/Back Toggle */}
                      <div className="mb-6 p-4 bg-light dark:bg-dark/50 rounded-lg">
                        <label className="block font-body text-sm font-semibold text-dark dark:text-white mb-3">
                          Côté du vêtement
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setGarmentSide("front")}
                            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                              garmentSide === "front"
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-dark/20 dark:border-white/20 hover:border-primary/50"
                            }`}
                          >
                            <Layers
                              className={`w-6 h-6 mx-auto mb-1 ${
                                garmentSide === "front"
                                  ? "text-primary"
                                  : "text-dark/40 dark:text-white/40"
                              }`}
                            />
                            <p
                              className={`font-body text-sm font-semibold ${
                                garmentSide === "front"
                                  ? "text-primary"
                                  : "text-dark dark:text-white"
                              }`}
                            >
                              Face avant
                            </p>
                          </button>

                          <button
                            onClick={() => setGarmentSide("back")}
                            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                              garmentSide === "back"
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-dark/20 dark:border-white/20 hover:border-primary/50"
                            }`}
                          >
                            <Layers
                              className={`w-6 h-6 mx-auto mb-1 ${
                                garmentSide === "back"
                                  ? "text-primary"
                                  : "text-dark/40 dark:text-white/40"
                              }`}
                            />
                            <p
                              className={`font-body text-sm font-semibold ${
                                garmentSide === "back"
                                  ? "text-primary"
                                  : "text-dark dark:text-white"
                              }`}
                            >
                              Face arrière
                            </p>
                          </button>
                        </div>
                      </div>

                      {/* Download Button */}
                      {uploadedImage && (
                        <button
                          onClick={downloadDesign}
                          className="w-full flex items-center justify-center gap-3 font-body font-semibold px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-all hover:scale-105"
                        >
                          <Download className="w-5 h-5" />
                          Télécharger le Design
                        </button>
                      )}
                    </div>
                  </FadeIn>
                </div>

                {/* Right: Controls & Form - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Upload */}
                  <FadeIn delay={0.1}>
                    <div className="bg-white dark:bg-dark/80 p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                      <h3 className="font-display text-xl font-bold text-dark dark:text-white mb-4">
                        1. Uploadez votre œuvre
                      </h3>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-3 font-body font-semibold px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all hover:scale-105"
                      >
                        <Upload className="w-5 h-5" />
                        Choisir une image
                      </button>

                      <p className="font-body text-xs text-dark/60 dark:text-white/60 mt-3 text-center">
                        PNG, JPG - Max 5 MB
                      </p>
                    </div>
                  </FadeIn>

                  {/* Controls */}
                  {uploadedImage && (
                    <FadeIn delay={0.2}>
                      <div className="bg-white dark:bg-dark/80 p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                        <h3 className="font-display text-xl font-bold text-dark dark:text-white mb-6">
                          2. Ajustez le design
                        </h3>

                        <div className="space-y-6">
                          {/* Scale */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-dark dark:text-white mb-2">
                              <span className="flex items-center gap-2">
                                <ZoomIn className="w-4 h-4" />
                                Taille
                              </span>
                              <span className="font-mono text-primary">
                                {Math.round(designScale * 100)}%
                              </span>
                            </label>
                            <input
                              type="range"
                              min="0.3"
                              max="2.5"
                              step="0.1"
                              value={designScale}
                              onChange={(e) => setDesignScale(parseFloat(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          {/* Position X */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-dark dark:text-white mb-2">
                              <span>Position Horizontale</span>
                              <span className="font-mono text-primary">{designX}%</span>
                            </label>
                            <input
                              type="range"
                              min="25"
                              max="75"
                              value={designX}
                              onChange={(e) => setDesignX(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          {/* Position Y */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-dark dark:text-white mb-2">
                              <span>Position Verticale</span>
                              <span className="font-mono text-primary">{designY}%</span>
                            </label>
                            <input
                              type="range"
                              min="20"
                              max="70"
                              value={designY}
                              onChange={(e) => setDesignY(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          {/* Rotation */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-dark dark:text-white mb-2">
                              <span className="flex items-center gap-2">
                                <RotateCw className="w-4 h-4" />
                                Rotation
                              </span>
                              <span className="font-mono text-primary">{rotation}°</span>
                            </label>
                            <input
                              type="range"
                              min="-45"
                              max="45"
                              value={rotation}
                              onChange={(e) => setRotation(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {/* Submission Form */}
                  {uploadedImage && (
                    <FadeIn delay={0.3}>
                      <div className="bg-white dark:bg-dark/80 p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                        <h3 className="font-display text-xl font-bold text-dark dark:text-white mb-6">
                          3. Soumettez à la galerie
                        </h3>

                        {submitted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center py-12"
                          >
                            <Check className="w-16 h-16 text-primary mx-auto mb-4" />
                            <p className="font-display text-2xl font-bold text-primary mb-2">
                              Design soumis avec succès !
                            </p>
                            <p className="font-body text-dark/70 dark:text-white/70">
                              Découvrez-le dans la galerie
                            </p>
                            <a
                              href="/galerie"
                              className="inline-block mt-6 font-body font-semibold px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
                            >
                              Voir la galerie
                            </a>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <label className="block font-body text-sm font-semibold text-dark dark:text-white mb-2">
                                Nom de l'artiste *
                              </label>
                              <input
                                type="text"
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                required
                                className="w-full px-4 py-3 font-body text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="Votre nom"
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-dark dark:text-white mb-2">
                                Email *
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 font-body text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="artiste@example.com"
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-dark dark:text-white mb-2">
                                Titre de l'œuvre *
                              </label>
                              <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 font-body text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="Ex: Chaos Intérieur"
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-dark dark:text-white mb-2">
                                Philosophie / Inspiration *
                              </label>
                              <textarea
                                value={philosophy}
                                onChange={(e) => setPhilosophy(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-3 font-body text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary resize-none"
                                placeholder="Quelle est la philosophie derrière votre création ?"
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-dark dark:text-white mb-2">
                                Instagram (optionnel)
                              </label>
                              <input
                                type="text"
                                value={social}
                                onChange={(e) => setSocial(e.target.value)}
                                className="w-full px-4 py-3 font-body text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="@votre_instagram"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full flex items-center justify-center gap-3 font-body font-semibold px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                            >
                              <Send className="w-5 h-5" />
                              Soumettre à la galerie
                            </button>
                          </form>
                        )}
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-accent/20 to-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Rejoignez la communauté Arteral
            </h2>
            <p className="font-body text-lg text-light/80 mb-8">
              Découvrez les créations des autres artistes dans la galerie
            </p>
            <a
              href="/galerie"
              className="inline-block font-body font-semibold px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all hover:scale-105"
            >
              Voir la galerie
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

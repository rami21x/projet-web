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
  X,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useContent } from "@/hooks/useContent";

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

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

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
  comments: Comment[];
  social?: string;
  garmentType: GarmentType;
  garmentFit: GarmentFit;
  garmentColor: string;
  garmentSide: GarmentSide;
}

export default function StudioPage() {
  const { studioContent } = useContent();

  // Configuration étape
  const [step, setStep] = useState<"config" | "design">("config");

  // Configuration du vêtement
  const [garmentType, setGarmentType] = useState<GarmentType>("tshirt");
  const [garmentFit, setGarmentFit] = useState<GarmentFit>("regular");
  const [garmentColor, setGarmentColor] = useState("#FFFFFF");
  const [garmentSide, setGarmentSide] = useState<GarmentSide>("front");

  // Design layers - separate for front and back
  interface ImageLayer {
    id: string;
    imageData: string;
    scale: number;
    x: number;
    y: number;
    rotation: number;
  }

  const [frontLayers, setFrontLayers] = useState<ImageLayer[]>([]);
  const [backLayers, setBackLayers] = useState<ImageLayer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Legacy single image support (for backward compatibility with sliders)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [designScale, setDesignScale] = useState(1);
  const [designX, setDesignX] = useState(50);
  const [designY, setDesignY] = useState(45);
  const [rotation, setRotation] = useState(0);

  // Drag & drop states
  const [isDragging, setIsDragging] = useState(false);
  const [dragLayerId, setDragLayerId] = useState<string | null>(null);

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
      ctx.fillText(studioContent.canvas.watermark, 10, canvas.height - 10);
    };

    garmentImg.onerror = () => {
      // Fallback: show placeholder if photo doesn't exist
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#999";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(studioContent.canvas.missingPhoto, canvas.width / 2, canvas.height / 2 - 40);
      ctx.font = "14px sans-serif";
      ctx.fillText(garmentPhotoPath, canvas.width / 2, canvas.height / 2);
      ctx.fillText(studioContent.canvas.addPhotoHint, canvas.width / 2, canvas.height / 2 + 30);

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

  // Get current active layers based on garment side
  const getActiveLayers = () => {
    return garmentSide === "front" ? frontLayers : backLayers;
  };

  const setActiveLayers = (layers: ImageLayer[]) => {
    if (garmentSide === "front") {
      setFrontLayers(layers);
    } else {
      setBackLayers(layers);
    }
  };

  // Handle canvas mouse events for drag & drop
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !uploadedImage) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Start dragging
    setIsDragging(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Update design position based on mouse
    const newX = (mouseX / canvas.width) * 100;
    const newY = (mouseY / canvas.height) * 100;

    // Clamp values to reasonable bounds
    setDesignX(Math.max(25, Math.min(75, newX)));
    setDesignY(Math.max(20, Math.min(70, newY)));
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    // Sync current values back to the selected layer
    syncToLayer();
  };

  // Sync current control values to the selected layer
  const syncToLayer = () => {
    if (!selectedLayerId) return;

    const layers = getActiveLayers();
    const updatedLayers = layers.map(layer => {
      if (layer.id === selectedLayerId) {
        return {
          ...layer,
          scale: designScale,
          x: designX,
          y: designY,
          rotation: rotation,
        };
      }
      return layer;
    });

    setActiveLayers(updatedLayers);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(studioContent.design.upload.errors.notImage);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(studioContent.design.upload.errors.tooLarge);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setUploadedImage(imageData);

      // Also add to layers system
      const newLayer: ImageLayer = {
        id: `layer-${Date.now()}`,
        imageData,
        scale: 1,
        x: 50,
        y: 45,
        rotation: 0,
      };

      const currentLayers = getActiveLayers();
      setActiveLayers([...currentLayers, newLayer]);
      setSelectedLayerId(newLayer.id);
    };
    reader.readAsDataURL(file);
  };

  const downloadDesign = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `arteral-${garmentType}-${garmentSide}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const downloadBothSides = async () => {
    if (!canvasRef.current) return;

    // Helper function to render a specific side
    const renderSide = (side: GarmentSide): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get the color file name
        const selectedColor = ARTERAL_COLORS.find((c) => c.hex === garmentColor);
        const colorFileName = selectedColor?.fileName || "white";
        const isDark = selectedColor?.dark || false;

        // Build the garment photo path
        const garmentPhotoPath = `/images/garments/public-images-garments-${garmentType}-${garmentFit}-${side}-${colorFileName}.png`;

        // Load the garment photo
        const garmentImg = new Image();

        garmentImg.onload = () => {
          // Draw the garment photo
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

          // Draw uploaded design on top (for backward compatibility)
          if (uploadedImage && side === garmentSide) {
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

              // Add watermark
              ctx.fillStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
              ctx.font = "12px monospace";
              ctx.fillText(studioContent.canvas.watermark, 10, canvas.height - 10);

              // Return the data URL
              resolve(canvas.toDataURL("image/png"));
            };
            designImg.src = uploadedImage;
          } else {
            // No design on this side, just return garment
            ctx.fillStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
            ctx.font = "12px monospace";
            ctx.fillText(studioContent.canvas.watermark, 10, canvas.height - 10);
            resolve(canvas.toDataURL("image/png"));
          }
        };

        garmentImg.onerror = () => {
          // Fallback for missing photo
          ctx.fillStyle = "#f0f0f0";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/png"));
        };

        garmentImg.src = garmentPhotoPath;
      });
    };

    try {
      // Render front side
      const frontDataUrl = await renderSide("front");
      const frontLink = document.createElement("a");
      frontLink.download = `arteral-${garmentType}-front-${Date.now()}.png`;
      frontLink.href = frontDataUrl;
      frontLink.click();

      // Wait a bit before second download
      await new Promise(resolve => setTimeout(resolve, 300));

      // Render back side
      const backDataUrl = await renderSide("back");
      const backLink = document.createElement("a");
      backLink.download = `arteral-${garmentType}-back-${Date.now()}.png`;
      backLink.href = backDataUrl;
      backLink.click();

      // Restore current view
      setTimeout(() => {
        // The useEffect will automatically re-render the current side
      }, 100);
    } catch (error) {
      console.error("Error downloading both sides:", error);
      alert(studioContent.design.download.error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedImage || !canvasRef.current) {
      alert(studioContent.design.submit.error);
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
      comments: [],
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
              {studioContent.hero.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto">
              {studioContent.hero.subtitle}
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
            className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-lg shadow-2xl border-2 border-primary/20">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-8 text-center">
                    {studioContent.config.title}
                  </h2>

                  {/* Type de vêtement */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-[#2B2B2B] dark:text-white mb-4">
                      {studioContent.config.garmentType.label}
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
                              : "text-[#7A7A7A] dark:text-gray-500"
                          }`}
                        />
                        <p
                          className={`font-body text-lg font-semibold ${
                            garmentType === "tshirt"
                              ? "text-primary"
                              : "text-[#2B2B2B] dark:text-white"
                          }`}
                        >
                          {studioContent.config.garmentType.tshirt.title}
                        </p>
                        <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mt-1">
                          {studioContent.config.garmentType.tshirt.description}
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
                              : "text-[#7A7A7A] dark:text-gray-500"
                          }`}
                        />
                        <p
                          className={`font-body text-lg font-semibold ${
                            garmentType === "pull"
                              ? "text-primary"
                              : "text-[#2B2B2B] dark:text-white"
                          }`}
                        >
                          {studioContent.config.garmentType.pull.title}
                        </p>
                        <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mt-1">
                          {studioContent.config.garmentType.pull.description}
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Coupe */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-[#2B2B2B] dark:text-white mb-4">
                      {studioContent.config.fit.label}
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
                                : "text-[#7A7A7A] dark:text-gray-500"
                            }`}
                          />
                          <p
                            className={`font-body font-semibold capitalize ${
                              garmentFit === fit
                                ? "text-primary"
                                : "text-[#2B2B2B] dark:text-white"
                            }`}
                          >
                            {fit === "oversize" && studioContent.config.fit.oversize.title}
                            {fit === "regular" && studioContent.config.fit.regular.title}
                            {fit === "slim" && studioContent.config.fit.slim.title}
                          </p>
                          <p className="font-body text-xs text-[#5A5A5A] dark:text-gray-400 mt-1">
                            {fit === "oversize" && studioContent.config.fit.oversize.description}
                            {fit === "regular" && studioContent.config.fit.regular.description}
                            {fit === "slim" && studioContent.config.fit.slim.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Couleur */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-[#2B2B2B] dark:text-white mb-4">
                      {studioContent.config.color.label}
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
                            <p className="font-body text-xs text-[#2B2B2B] dark:text-white bg-white dark:bg-dark px-2 py-1 rounded shadow-lg">
                              {color.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aperçu de la configuration */}
                  <div className="bg-[#F0F0F0] dark:bg-[#0A0A0A] p-6 rounded-lg mb-8">
                    <p className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3">
                      {studioContent.config.summary}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-sm font-semibold">
                        {garmentType === "tshirt" ? studioContent.config.garmentType.tshirt.title : studioContent.config.garmentType.pull.title}
                      </span>
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-body text-sm font-semibold capitalize">
                        {garmentFit === "oversize" && studioContent.config.fit.oversize.title}
                        {garmentFit === "regular" && studioContent.config.fit.regular.title}
                        {garmentFit === "slim" && studioContent.config.fit.slim.title}
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
                    {studioContent.config.startButton}
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
            className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back button */}
              <button
                onClick={() => setStep("config")}
                className="mb-8 flex items-center gap-2 font-body text-primary hover:text-accent transition-colors"
              >
                {studioContent.design.backButton}
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

                      <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-8 flex items-center gap-3 relative z-10">
                        <motion.div
                          animate={{ rotate: uploadedImage ? 360 : 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Move className="w-8 h-8 text-primary" />
                        </motion.div>
                        {studioContent.design.preview.title}
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
                          style={{
                            maxHeight: "900px",
                            cursor: isDragging ? 'grabbing' : (uploadedImage ? 'grab' : 'default')
                          }}
                          onMouseDown={handleCanvasMouseDown}
                          onMouseMove={handleCanvasMouseMove}
                          onMouseUp={handleCanvasMouseUp}
                          onMouseLeave={handleCanvasMouseUp}
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
                              <p className="font-body text-lg text-[#6A6A6A] dark:text-gray-500 font-semibold">
                                {studioContent.design.preview.uploadPrompt}
                              </p>
                              <p className="font-body text-sm text-dark/30 dark:text-white/30 mt-2">
                                {studioContent.design.preview.uploadHint}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Configuration display */}
                      <div className="flex items-center justify-between mb-6 p-4 bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg">
                        <div className="flex items-center gap-2">
                          {garmentType === "tshirt" ? (
                            <Shirt className="w-5 h-5 text-primary" />
                          ) : (
                            <Wind className="w-5 h-5 text-primary" />
                          )}
                          <span className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white capitalize">
                            {garmentType === "tshirt" ? studioContent.config.garmentType.tshirt.title : studioContent.config.garmentType.pull.title} {garmentFit}
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                          style={{ backgroundColor: garmentColor }}
                        />
                      </div>

                      {/* Front/Back Toggle */}
                      <div className="mb-6 p-4 bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg">
                        <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3">
                          {studioContent.design.sides.label}
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
                                  : "text-[#7A7A7A] dark:text-gray-500"
                              }`}
                            />
                            <p
                              className={`font-body text-sm font-semibold ${
                                garmentSide === "front"
                                  ? "text-primary"
                                  : "text-[#2B2B2B] dark:text-white"
                              }`}
                            >
                              {studioContent.design.sides.front}
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
                                  : "text-[#7A7A7A] dark:text-gray-500"
                              }`}
                            />
                            <p
                              className={`font-body text-sm font-semibold ${
                                garmentSide === "back"
                                  ? "text-primary"
                                  : "text-[#2B2B2B] dark:text-white"
                              }`}
                            >
                              {studioContent.design.sides.back}
                            </p>
                          </button>
                        </div>
                      </div>

                      {/* Download Buttons */}
                      {uploadedImage && (
                        <div className="space-y-3">
                          <button
                            onClick={downloadDesign}
                            className="w-full flex items-center justify-center gap-3 font-body font-semibold px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-all hover:scale-105"
                          >
                            <Download className="w-5 h-5" />
                            {studioContent.design.download.single} {garmentSide === "front" ? studioContent.design.sides.front : studioContent.design.sides.back}
                          </button>
                          <button
                            onClick={downloadBothSides}
                            className="w-full flex items-center justify-center gap-3 font-body font-semibold px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                          >
                            <Download className="w-5 h-5" />
                            <Layers className="w-5 h-5" />
                            {studioContent.design.download.both}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </FadeIn>
                </div>

                {/* Right: Controls & Form - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Upload */}
                  <FadeIn delay={0.1}>
                    <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                      <h3 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                        {studioContent.design.upload.title}
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
                        {getActiveLayers().length > 0 ? studioContent.design.upload.buttonMultiple : studioContent.design.upload.button}
                      </button>

                      <p className="font-body text-xs text-[#5A5A5A] dark:text-gray-400 mt-3 text-center">
                        {studioContent.design.upload.hint}
                      </p>

                      {/* Layers List */}
                      {getActiveLayers().length > 0 && (
                        <div className="mt-6 pt-6 border-t-2 border-dark/10 dark:border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white flex items-center gap-2">
                              <Layers className="w-4 h-4" />
                              {studioContent.design.layers.title} {garmentSide === "front" ? studioContent.design.layers.frontSide : studioContent.design.layers.backSide}
                            </h4>
                            <span className="font-mono text-xs text-primary">
                              {getActiveLayers().length} {getActiveLayers().length === 1 ? studioContent.design.layers.count : studioContent.design.layers.countPlural}
                            </span>
                          </div>

                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {getActiveLayers().map((layer, index) => (
                              <motion.div
                                key={layer.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`group relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                                  selectedLayerId === layer.id
                                    ? "border-primary bg-primary/10 shadow-lg"
                                    : "border-dark/20 dark:border-white/20 hover:border-primary/50"
                                }`}
                                onClick={() => {
                                  setSelectedLayerId(layer.id);
                                  setDesignScale(layer.scale);
                                  setDesignX(layer.x);
                                  setDesignY(layer.y);
                                  setRotation(layer.rotation);
                                  setUploadedImage(layer.imageData);
                                }}
                              >
                                {/* Thumbnail */}
                                <div className="w-12 h-12 rounded overflow-hidden bg-dark/5 dark:bg-white/5 flex-shrink-0">
                                  <img
                                    src={layer.imageData}
                                    alt={`Layer ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Layer info */}
                                <div className="flex-1 min-w-0">
                                  <p className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white truncate">
                                    Image {index + 1}
                                  </p>
                                  <p className="font-mono text-xs text-[#5A5A5A] dark:text-gray-400">
                                    {Math.round(layer.scale * 100)}% · {layer.rotation}°
                                  </p>
                                </div>

                                {/* Delete button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newLayers = getActiveLayers().filter(l => l.id !== layer.id);
                                    setActiveLayers(newLayers);

                                    if (selectedLayerId === layer.id) {
                                      if (newLayers.length > 0) {
                                        const nextLayer = newLayers[0];
                                        setSelectedLayerId(nextLayer.id);
                                        setDesignScale(nextLayer.scale);
                                        setDesignX(nextLayer.x);
                                        setDesignY(nextLayer.y);
                                        setRotation(nextLayer.rotation);
                                        setUploadedImage(nextLayer.imageData);
                                      } else {
                                        setSelectedLayerId(null);
                                        setUploadedImage(null);
                                      }
                                    }
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded"
                                  title={studioContent.design.layers.deleteTitle}
                                >
                                  <X className="w-4 h-4 text-red-500" />
                                </button>
                              </motion.div>
                            ))}
                          </div>

                          <p className="font-body text-xs text-[#6A6A6A] dark:text-gray-500 mt-3 text-center italic">
                            {studioContent.design.layers.helpText}
                          </p>
                        </div>
                      )}
                    </div>
                  </FadeIn>

                  {/* Controls */}
                  {uploadedImage && (
                    <FadeIn delay={0.2}>
                      <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                        <h3 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                          {studioContent.design.controls.title}
                        </h3>

                        <div className="space-y-6">
                          {/* Scale */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                              <span className="flex items-center gap-2">
                                <ZoomIn className="w-4 h-4" />
                                {studioContent.design.controls.scale}
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
                              onChange={(e) => {
                                setDesignScale(parseFloat(e.target.value));
                              }}
                              onMouseUp={syncToLayer}
                              onTouchEnd={syncToLayer}
                              className="w-full"
                            />
                          </div>

                          {/* Position X */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                              <span>{studioContent.design.controls.positionX}</span>
                              <span className="font-mono text-primary">{designX}%</span>
                            </label>
                            <input
                              type="range"
                              min="25"
                              max="75"
                              value={designX}
                              onChange={(e) => {
                                setDesignX(parseInt(e.target.value));
                              }}
                              onMouseUp={syncToLayer}
                              onTouchEnd={syncToLayer}
                              className="w-full"
                            />
                          </div>

                          {/* Position Y */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                              <span>{studioContent.design.controls.positionY}</span>
                              <span className="font-mono text-primary">{designY}%</span>
                            </label>
                            <input
                              type="range"
                              min="20"
                              max="70"
                              value={designY}
                              onChange={(e) => {
                                setDesignY(parseInt(e.target.value));
                              }}
                              onMouseUp={syncToLayer}
                              onTouchEnd={syncToLayer}
                              className="w-full"
                            />
                          </div>

                          {/* Rotation */}
                          <div>
                            <label className="flex items-center justify-between font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                              <span className="flex items-center gap-2">
                                <RotateCw className="w-4 h-4" />
                                {studioContent.design.controls.rotation}
                              </span>
                              <span className="font-mono text-primary">{rotation}°</span>
                            </label>
                            <input
                              type="range"
                              min="-45"
                              max="45"
                              value={rotation}
                              onChange={(e) => {
                                setRotation(parseInt(e.target.value));
                              }}
                              onMouseUp={syncToLayer}
                              onTouchEnd={syncToLayer}
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
                      <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                        <h3 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                          {studioContent.design.submit.title}
                        </h3>

                        {submitted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center py-12"
                          >
                            <Check className="w-16 h-16 text-primary mx-auto mb-4" />
                            <p className="font-display text-2xl font-bold text-primary mb-2">
                              {studioContent.design.submit.success.title}
                            </p>
                            <p className="font-body text-[#4A4A4A] dark:text-gray-300">
                              {studioContent.design.submit.success.message}
                            </p>
                            <a
                              href="/galerie"
                              className="inline-block mt-6 font-body font-semibold px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
                            >
                              {studioContent.design.submit.success.viewGallery}
                            </a>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                                {studioContent.design.submit.fields.artistName.label}
                              </label>
                              <input
                                type="text"
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                required
                                className="w-full px-4 py-3 font-body text-[#2B2B2B] dark:text-white bg-white dark:bg-[#1A1A1A] border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder={studioContent.design.submit.fields.artistName.placeholder}
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                                {studioContent.design.submit.fields.email.label}
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 font-body text-[#2B2B2B] dark:text-white bg-white dark:bg-[#1A1A1A] border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder={studioContent.design.submit.fields.email.placeholder}
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                                {studioContent.design.submit.fields.title.label}
                              </label>
                              <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 font-body text-[#2B2B2B] dark:text-white bg-white dark:bg-[#1A1A1A] border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder={studioContent.design.submit.fields.title.placeholder}
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                                {studioContent.design.submit.fields.philosophy.label}
                              </label>
                              <textarea
                                value={philosophy}
                                onChange={(e) => setPhilosophy(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-3 font-body text-[#2B2B2B] dark:text-white bg-white dark:bg-[#1A1A1A] border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary resize-none"
                                placeholder={studioContent.design.submit.fields.philosophy.placeholder}
                              />
                            </div>

                            <div>
                              <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">
                                {studioContent.design.submit.fields.instagram.label}
                              </label>
                              <input
                                type="text"
                                value={social}
                                onChange={(e) => setSocial(e.target.value)}
                                className="w-full px-4 py-3 font-body text-[#2B2B2B] dark:text-white bg-white dark:bg-[#1A1A1A] border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                                placeholder={studioContent.design.submit.fields.instagram.placeholder}
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full flex items-center justify-center gap-3 font-body font-semibold px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                            >
                              <Send className="w-5 h-5" />
                              {studioContent.design.submit.button}
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
              {studioContent.cta.title}
            </h2>
            <p className="font-body text-lg text-light/80 mb-8">
              {studioContent.cta.subtitle}
            </p>
            <a
              href="/galerie"
              className="inline-block font-body font-semibold px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all hover:scale-105"
            >
              {studioContent.cta.button}
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

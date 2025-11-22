"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Type,
  Sliders,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Save,
  FolderOpen,
  Share2,
  QrCode,
  Calculator,
  User,
  Sparkles,
  Trash2,
  Copy,
  Instagram,
  Twitter,
  Grid,
  Wand2,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useContent } from "@/hooks/useContent";

// Types
type GarmentType = "tshirt" | "pull";
type GarmentFit = "oversize" | "regular" | "slim";
type GarmentSide = "front" | "back";
type ToolMode = "select" | "text" | "filter";
type FilterType = "none" | "grayscale" | "sepia" | "contrast" | "brightness" | "vintage" | "cool" | "warm";

// Extended color palette
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

// Available fonts
const FONTS = [
  { name: "Display", value: "var(--font-display)", label: "Elegante" },
  { name: "Body", value: "var(--font-body)", label: "Moderne" },
  { name: "Mono", value: "var(--font-mono)", label: "Technique" },
  { name: "Serif", value: "Georgia, serif", label: "Classique" },
  { name: "Sans", value: "Arial, sans-serif", label: "Minimaliste" },
];

// Design filters
const FILTERS: { type: FilterType; name: string; css: string }[] = [
  { type: "none", name: "Original", css: "" },
  { type: "grayscale", name: "Noir & Blanc", css: "grayscale(100%)" },
  { type: "sepia", name: "Sépia", css: "sepia(80%)" },
  { type: "contrast", name: "Contraste", css: "contrast(150%)" },
  { type: "brightness", name: "Lumineux", css: "brightness(120%)" },
  { type: "vintage", name: "Vintage", css: "sepia(30%) contrast(110%) brightness(90%)" },
  { type: "cool", name: "Froid", css: "hue-rotate(180deg) saturate(80%)" },
  { type: "warm", name: "Chaud", css: "sepia(20%) saturate(140%)" },
];

// Design templates
const TEMPLATES = [
  {
    id: "duality",
    name: "Dualité",
    description: "Inspiré de Love ↔ Boredom",
    preview: "linear-gradient(135deg, #8B0000 50%, #1A1A1A 50%)",
    textContent: "DUALITY",
    textColor: "#FFFFFF",
  },
  {
    id: "chaos",
    name: "Chaos Créatif",
    description: "L'art du désordre",
    preview: "linear-gradient(45deg, #3E4149, #8B0000, #A0522D)",
    textContent: "CHAOS",
    textColor: "#FFFFFF",
  },
  {
    id: "minimal",
    name: "Minimaliste",
    description: "Simplicité élégante",
    preview: "linear-gradient(180deg, #FFFFFF 0%, #E8E8E8 100%)",
    textContent: "ARTERAL",
    textColor: "#1A1A1A",
  },
  {
    id: "narcisse",
    name: "Narcisse",
    description: "Réflexion intérieure",
    preview: "radial-gradient(circle, #7D0633, #1A1A1A)",
    textContent: "NARCISSUS",
    textColor: "#D4C5B9",
  },
];

// Price calculation
const PRICES = {
  base: {
    tshirt: 45,
    pull: 75,
  },
  fit: {
    slim: 0,
    regular: 0,
    oversize: 10,
  },
  design: {
    simple: 0,
    complex: 15,
    premium: 30,
  },
  printing: {
    front: 0,
    back: 10,
    both: 15,
  },
};

// Interfaces
interface ImageLayer {
  id: string;
  type: "image";
  imageData: string;
  scale: number;
  x: number;
  y: number;
  rotation: number;
  filter: FilterType;
}

interface TextLayer {
  id: string;
  type: "text";
  content: string;
  font: string;
  fontSize: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

type Layer = ImageLayer | TextLayer;

interface HistoryState {
  frontLayers: Layer[];
  backLayers: Layer[];
  garmentColor: string;
}

interface Draft {
  id: string;
  name: string;
  timestamp: number;
  garmentType: GarmentType;
  garmentFit: GarmentFit;
  garmentColor: string;
  frontLayers: Layer[];
  backLayers: Layer[];
}

export default function StudioPage() {
  const { studioContent } = useContent();

  // Configuration step
  const [step, setStep] = useState<"config" | "design">("config");

  // Garment configuration
  const [garmentType, setGarmentType] = useState<GarmentType>("tshirt");
  const [garmentFit, setGarmentFit] = useState<GarmentFit>("regular");
  const [garmentColor, setGarmentColor] = useState("#FFFFFF");
  const [garmentSide, setGarmentSide] = useState<GarmentSide>("front");

  // Tool mode
  const [toolMode, setToolMode] = useState<ToolMode>("select");

  // Layers
  const [frontLayers, setFrontLayers] = useState<Layer[]>([]);
  const [backLayers, setBackLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Current layer editing values
  const [designScale, setDesignScale] = useState(1);
  const [designX, setDesignX] = useState(50);
  const [designY, setDesignY] = useState(45);
  const [rotation, setRotation] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("none");

  // Text tool
  const [textContent, setTextContent] = useState("ARTERAL");
  const [textFont, setTextFont] = useState(FONTS[0].value);
  const [textFontSize, setTextFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#FFFFFF");

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Drafts
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [draftName, setDraftName] = useState("");

  // Share modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Price calculator
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);

  // Templates modal
  const [showTemplates, setShowTemplates] = useState(false);

  // Drag states
  const [isDragging, setIsDragging] = useState(false);

  // Form states
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [social, setSocial] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = localStorage.getItem("arteral-studio-drafts");
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // Save history state
  const saveToHistory = useCallback(() => {
    const newState: HistoryState = {
      frontLayers: JSON.parse(JSON.stringify(frontLayers)),
      backLayers: JSON.parse(JSON.stringify(backLayers)),
      garmentColor,
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [frontLayers, backLayers, garmentColor, history, historyIndex]);

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setFrontLayers(prevState.frontLayers);
      setBackLayers(prevState.backLayers);
      setGarmentColor(prevState.garmentColor);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setFrontLayers(nextState.frontLayers);
      setBackLayers(nextState.backLayers);
      setGarmentColor(nextState.garmentColor);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Get active layers based on side
  const getActiveLayers = () => {
    return garmentSide === "front" ? frontLayers : backLayers;
  };

  const setActiveLayers = (layers: Layer[]) => {
    if (garmentSide === "front") {
      setFrontLayers(layers);
    } else {
      setBackLayers(layers);
    }
    saveToHistory();
  };

  // Get selected layer
  const getSelectedLayer = (): Layer | undefined => {
    return getActiveLayers().find((l) => l.id === selectedLayerId);
  };

  // Render canvas
  useEffect(() => {
    if (!canvasRef.current || step === "config") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 900;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const selectedColor = ARTERAL_COLORS.find((c) => c.hex === garmentColor);
    const colorFileName = selectedColor?.fileName || "white";
    const isDark = selectedColor?.dark || false;

    const garmentPhotoPath = `/images/garments/public-images-garments-${garmentType}-${garmentFit}-${garmentSide}-${colorFileName}.png`;

    const garmentImg = new Image();

    garmentImg.onload = () => {
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

      // Draw all layers
      const layers = getActiveLayers();
      layers.forEach((layer) => {
        if (layer.type === "image") {
          const imgLayer = layer as ImageLayer;
          const designImg = new Image();
          designImg.onload = () => {
            ctx.save();

            const designCenterX = canvas.width * (imgLayer.x / 100);
            const designCenterY = canvas.height * (imgLayer.y / 100);

            ctx.translate(designCenterX, designCenterY);
            ctx.rotate((imgLayer.rotation * Math.PI) / 180);

            // Apply filter
            const filterDef = FILTERS.find((f) => f.type === imgLayer.filter);
            if (filterDef && filterDef.css) {
              ctx.filter = filterDef.css;
            }

            const maxWidth = 250 * imgLayer.scale;
            const maxHeight = 250 * imgLayer.scale;

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
          designImg.src = imgLayer.imageData;
        } else if (layer.type === "text") {
          const textLayer = layer as TextLayer;
          ctx.save();

          const textCenterX = canvas.width * (textLayer.x / 100);
          const textCenterY = canvas.height * (textLayer.y / 100);

          ctx.translate(textCenterX, textCenterY);
          ctx.rotate((textLayer.rotation * Math.PI) / 180);

          ctx.font = `bold ${textLayer.fontSize}px ${textLayer.font}`;
          ctx.fillStyle = textLayer.color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Add text shadow for visibility
          ctx.shadowColor = "rgba(0,0,0,0.5)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          ctx.fillText(textLayer.content, 0, 0);

          ctx.restore();
        }
      });

      // Watermark
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
      ctx.font = "12px monospace";
      ctx.fillText("ARTERAL STUDIO", 10, canvas.height - 10);
    };

    garmentImg.onerror = () => {
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#999";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Photo non disponible", canvas.width / 2, canvas.height / 2);
    };

    garmentImg.src = garmentPhotoPath;
  }, [frontLayers, backLayers, garmentType, garmentFit, garmentColor, garmentSide, step, designScale, designX, designY, rotation]);

  // Handle canvas drag
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !selectedLayerId) return;
    setIsDragging(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current || !selectedLayerId) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const newX = (mouseX / canvas.width) * 100;
    const newY = (mouseY / canvas.height) * 100;

    setDesignX(Math.max(15, Math.min(85, newX)));
    setDesignY(Math.max(15, Math.min(85, newY)));

    // Update layer position
    const layers = getActiveLayers();
    const updatedLayers = layers.map((layer) => {
      if (layer.id === selectedLayerId) {
        return { ...layer, x: newX, y: newY };
      }
      return layer;
    });
    if (garmentSide === "front") {
      setFrontLayers(updatedLayers);
    } else {
      setBackLayers(updatedLayers);
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory();
    }
  };

  // Upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;

      const newLayer: ImageLayer = {
        id: `img-${Date.now()}`,
        type: "image",
        imageData,
        scale: 1,
        x: 50,
        y: 45,
        rotation: 0,
        filter: "none",
      };

      const currentLayers = getActiveLayers();
      setActiveLayers([...currentLayers, newLayer]);
      setSelectedLayerId(newLayer.id);
      setDesignScale(1);
      setDesignX(50);
      setDesignY(45);
      setRotation(0);
      setCurrentFilter("none");
    };
    reader.readAsDataURL(file);
  };

  // Add text layer
  const addTextLayer = () => {
    const newLayer: TextLayer = {
      id: `text-${Date.now()}`,
      type: "text",
      content: textContent,
      font: textFont,
      fontSize: textFontSize,
      color: textColor,
      x: 50,
      y: 45,
      rotation: 0,
    };

    const currentLayers = getActiveLayers();
    setActiveLayers([...currentLayers, newLayer]);
    setSelectedLayerId(newLayer.id);
    setDesignX(50);
    setDesignY(45);
    setRotation(0);
  };

  // Update selected layer
  const updateSelectedLayer = (updates: Partial<Layer>) => {
    const layers = getActiveLayers();
    const updatedLayers = layers.map((layer) => {
      if (layer.id === selectedLayerId) {
        return { ...layer, ...updates };
      }
      return layer;
    });
    setActiveLayers(updatedLayers);
  };

  // Delete selected layer
  const deleteSelectedLayer = () => {
    if (!selectedLayerId) return;
    const layers = getActiveLayers().filter((l) => l.id !== selectedLayerId);
    setActiveLayers(layers);
    setSelectedLayerId(layers.length > 0 ? layers[layers.length - 1].id : null);
  };

  // Duplicate selected layer
  const duplicateSelectedLayer = () => {
    const layer = getSelectedLayer();
    if (!layer) return;

    const newLayer = {
      ...layer,
      id: `${layer.type}-${Date.now()}`,
      x: layer.x + 5,
      y: layer.y + 5,
    };

    const currentLayers = getActiveLayers();
    setActiveLayers([...currentLayers, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Apply template
  const applyTemplate = (template: typeof TEMPLATES[0]) => {
    const newLayer: TextLayer = {
      id: `text-${Date.now()}`,
      type: "text",
      content: template.textContent,
      font: FONTS[0].value,
      fontSize: 64,
      color: template.textColor,
      x: 50,
      y: 45,
      rotation: 0,
    };

    setActiveLayers([newLayer]);
    setSelectedLayerId(newLayer.id);
    setShowTemplates(false);
  };

  // Save draft
  const saveDraft = () => {
    const draft: Draft = {
      id: `draft-${Date.now()}`,
      name: draftName || `Brouillon ${drafts.length + 1}`,
      timestamp: Date.now(),
      garmentType,
      garmentFit,
      garmentColor,
      frontLayers,
      backLayers,
    };

    const newDrafts = [...drafts, draft];
    setDrafts(newDrafts);
    localStorage.setItem("arteral-studio-drafts", JSON.stringify(newDrafts));
    setDraftName("");
    alert("Brouillon sauvegardé !");
  };

  // Load draft
  const loadDraft = (draft: Draft) => {
    setGarmentType(draft.garmentType);
    setGarmentFit(draft.garmentFit);
    setGarmentColor(draft.garmentColor);
    setFrontLayers(draft.frontLayers);
    setBackLayers(draft.backLayers);
    setShowDrafts(false);
    if (step === "config") {
      setStep("design");
    }
  };

  // Delete draft
  const deleteDraft = (draftId: string) => {
    const newDrafts = drafts.filter((d) => d.id !== draftId);
    setDrafts(newDrafts);
    localStorage.setItem("arteral-studio-drafts", JSON.stringify(newDrafts));
  };

  // Calculate price
  const calculatePrice = () => {
    let price = PRICES.base[garmentType];
    price += PRICES.fit[garmentFit];

    const totalLayers = frontLayers.length + backLayers.length;
    if (totalLayers > 3) {
      price += PRICES.design.premium;
    } else if (totalLayers > 1) {
      price += PRICES.design.complex;
    }

    if (frontLayers.length > 0 && backLayers.length > 0) {
      price += PRICES.printing.both;
    } else if (backLayers.length > 0) {
      price += PRICES.printing.back;
    }

    return price;
  };

  // Download design
  const downloadDesign = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `arteral-${garmentType}-${garmentSide}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  // Share design
  const shareDesign = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setShareUrl(dataUrl);
    setShowShareModal(true);
  };

  // Share on social
  const shareOnSocial = (platform: string) => {
    const text = encodeURIComponent("Mon design ARTERAL personnalisé ! #ARTERAL #Fashion #Art");
    const url = encodeURIComponent(window.location.href);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      instagram: "https://instagram.com",
    };

    window.open(urls[platform], "_blank");
  };

  // Submit design
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (frontLayers.length === 0 && backLayers.length === 0) {
      alert("Veuillez ajouter au moins un élément de design");
      return;
    }

    const design = {
      id: `design-${Date.now()}`,
      artistName,
      email,
      title,
      philosophy,
      social,
      designData: canvasRef.current?.toDataURL("image/png"),
      timestamp: Date.now(),
      garmentType,
      garmentFit,
      garmentColor,
      frontLayers,
      backLayers,
    };

    const existingDesigns = JSON.parse(localStorage.getItem("arteral-designs") || "[]");
    existingDesigns.push(design);
    localStorage.setItem("arteral-designs", JSON.stringify(existingDesigns));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setStep("config");
      setFrontLayers([]);
      setBackLayers([]);
      setArtistName("");
      setEmail("");
      setTitle("");
      setPhilosophy("");
      setSocial("");
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#1A1A1A] via-primary/20 to-[#1A1A1A] text-white relative overflow-hidden">
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
              {studioContent?.hero?.title || "Studio Créatif"}
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
              {studioContent?.hero?.subtitle || "Créez votre pièce unique avec nos outils professionnels"}
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-body flex items-center gap-2">
                <Type className="w-4 h-4" /> Outil Texte
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-body flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Filtres
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-body flex items-center gap-2">
                <Grid className="w-4 h-4" /> Templates
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-body flex items-center gap-2">
                <Undo2 className="w-4 h-4" /> Undo/Redo
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
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
                  {/* Drafts button */}
                  {drafts.length > 0 && (
                    <div className="mb-8 flex justify-end">
                      <button
                        onClick={() => setShowDrafts(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                      >
                        <FolderOpen className="w-5 h-5" />
                        Mes brouillons ({drafts.length})
                      </button>
                    </div>
                  )}

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-8 text-center">
                    {studioContent?.config?.title || "Configurez votre vêtement"}
                  </h2>

                  {/* Garment Type */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-[#2B2B2B] dark:text-white mb-4">
                      Type de vêtement
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setGarmentType("tshirt")}
                        className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                          garmentType === "tshirt"
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-[#2B2B2B]/20 dark:border-white/20 hover:border-primary/50"
                        }`}
                      >
                        <Shirt className={`w-12 h-12 mx-auto mb-3 ${garmentType === "tshirt" ? "text-primary" : "text-[#7A7A7A]"}`} />
                        <p className={`font-body text-lg font-semibold ${garmentType === "tshirt" ? "text-primary" : "text-[#2B2B2B] dark:text-white"}`}>
                          T-Shirt
                        </p>
                        <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mt-1">Coton premium 180g</p>
                      </button>

                      <button
                        onClick={() => setGarmentType("pull")}
                        className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                          garmentType === "pull"
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-[#2B2B2B]/20 dark:border-white/20 hover:border-primary/50"
                        }`}
                      >
                        <Wind className={`w-12 h-12 mx-auto mb-3 ${garmentType === "pull" ? "text-primary" : "text-[#7A7A7A]"}`} />
                        <p className={`font-body text-lg font-semibold ${garmentType === "pull" ? "text-primary" : "text-[#2B2B2B] dark:text-white"}`}>
                          Sweatshirt
                        </p>
                        <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mt-1">Molleton bio 350g</p>
                      </button>
                    </div>
                  </div>

                  {/* Fit */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-[#2B2B2B] dark:text-white mb-4">
                      Coupe
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(["slim", "regular", "oversize"] as const).map((fit) => (
                        <button
                          key={fit}
                          onClick={() => setGarmentFit(fit)}
                          className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                            garmentFit === fit
                              ? "border-primary bg-primary/10 shadow-lg"
                              : "border-[#2B2B2B]/20 dark:border-white/20 hover:border-primary/50"
                          }`}
                        >
                          <Layers className={`w-8 h-8 mx-auto mb-2 ${garmentFit === fit ? "text-primary" : "text-[#7A7A7A]"}`} />
                          <p className={`font-body font-semibold capitalize ${garmentFit === fit ? "text-primary" : "text-[#2B2B2B] dark:text-white"}`}>
                            {fit === "slim" ? "Ajusté" : fit === "regular" ? "Regular" : "Oversize"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="mb-10">
                    <label className="block font-body text-lg font-semibold text-[#2B2B2B] dark:text-white mb-4">
                      Couleur
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {ARTERAL_COLORS.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => setGarmentColor(color.hex)}
                          className={`group relative aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                            garmentColor === color.hex
                              ? "border-primary shadow-lg ring-2 ring-primary ring-offset-2"
                              : "border-[#2B2B2B]/20 dark:border-white/20"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {garmentColor === color.hex && (
                            <Check className={`w-6 h-6 absolute inset-0 m-auto ${color.dark ? "text-white" : "text-[#1A1A1A]"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-[#F0F0F0] dark:bg-[#0A0A0A] p-6 rounded-lg mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2">Configuration</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-sm">
                            {garmentType === "tshirt" ? "T-Shirt" : "Sweatshirt"}
                          </span>
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-body text-sm capitalize">
                            {garmentFit === "slim" ? "Ajusté" : garmentFit}
                          </span>
                          <span
                            className="px-3 py-1 rounded-full font-body text-sm flex items-center gap-2"
                            style={{ backgroundColor: `${garmentColor}30` }}
                          >
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: garmentColor }} />
                            {ARTERAL_COLORS.find((c) => c.hex === garmentColor)?.name}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-[#7A7A7A]">À partir de</p>
                        <p className="font-display text-2xl font-bold text-primary">{PRICES.base[garmentType]}€</p>
                      </div>
                    </div>
                  </div>

                  {/* Start button */}
                  <button
                    onClick={() => setStep("design")}
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
          <motion.section
            key="design"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="py-8 md:py-16 bg-[#E8E8E8] dark:bg-[#0A0A0A]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Top toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => setStep("config")}
                  className="flex items-center gap-2 font-body text-primary hover:text-accent transition-colors"
                >
                  ← Retour à la configuration
                </button>

                <div className="flex items-center gap-2">
                  {/* Undo/Redo */}
                  <button
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="p-2 rounded-lg bg-white dark:bg-[#1A1A1A] border border-[#2B2B2B]/20 dark:border-white/20 disabled:opacity-30 hover:border-primary transition-colors"
                    title="Annuler"
                  >
                    <Undo2 className="w-5 h-5 text-[#2B2B2B] dark:text-white" />
                  </button>
                  <button
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="p-2 rounded-lg bg-white dark:bg-[#1A1A1A] border border-[#2B2B2B]/20 dark:border-white/20 disabled:opacity-30 hover:border-primary transition-colors"
                    title="Rétablir"
                  >
                    <Redo2 className="w-5 h-5 text-[#2B2B2B] dark:text-white" />
                  </button>

                  <div className="w-px h-6 bg-[#2B2B2B]/20 dark:bg-white/20 mx-2" />

                  {/* Templates */}
                  <button
                    onClick={() => setShowTemplates(true)}
                    className="p-2 rounded-lg bg-white dark:bg-[#1A1A1A] border border-[#2B2B2B]/20 dark:border-white/20 hover:border-primary transition-colors"
                    title="Templates"
                  >
                    <Grid className="w-5 h-5 text-[#2B2B2B] dark:text-white" />
                  </button>

                  {/* Save draft */}
                  <button
                    onClick={saveDraft}
                    className="p-2 rounded-lg bg-white dark:bg-[#1A1A1A] border border-[#2B2B2B]/20 dark:border-white/20 hover:border-primary transition-colors"
                    title="Sauvegarder"
                  >
                    <Save className="w-5 h-5 text-[#2B2B2B] dark:text-white" />
                  </button>

                  {/* Price calculator */}
                  <button
                    onClick={() => setShowPriceCalculator(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                    <span className="font-body font-semibold">{calculatePrice()}€</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left sidebar - Tools */}
                <div className="lg:col-span-2 space-y-4">
                  <FadeIn>
                    <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                      <h3 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3">Outils</h3>

                      <div className="space-y-2">
                        <button
                          onClick={() => setToolMode("select")}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                            toolMode === "select" ? "bg-primary text-white" : "bg-[#F0F0F0] dark:bg-[#0A0A0A] hover:bg-primary/10"
                          }`}
                        >
                          <Move className="w-5 h-5" />
                          <span className="font-body text-sm">Sélection</span>
                        </button>

                        <button
                          onClick={() => setToolMode("text")}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                            toolMode === "text" ? "bg-primary text-white" : "bg-[#F0F0F0] dark:bg-[#0A0A0A] hover:bg-primary/10"
                          }`}
                        >
                          <Type className="w-5 h-5" />
                          <span className="font-body text-sm">Texte</span>
                        </button>

                        <button
                          onClick={() => setToolMode("filter")}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                            toolMode === "filter" ? "bg-primary text-white" : "bg-[#F0F0F0] dark:bg-[#0A0A0A] hover:bg-primary/10"
                          }`}
                        >
                          <Wand2 className="w-5 h-5" />
                          <span className="font-body text-sm">Filtres</span>
                        </button>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#2B2B2B]/10 dark:border-white/10">
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 p-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                          <span className="font-body text-sm">Importer</span>
                        </button>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Text tool options */}
                  {toolMode === "text" && (
                    <FadeIn delay={0.1}>
                      <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                        <h3 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3">Options texte</h3>

                        <div className="space-y-3">
                          <input
                            type="text"
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            placeholder="Votre texte"
                            className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white"
                          />

                          <select
                            value={textFont}
                            onChange={(e) => setTextFont(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white"
                          >
                            {FONTS.map((font) => (
                              <option key={font.value} value={font.value}>
                                {font.label}
                              </option>
                            ))}
                          </select>

                          <div>
                            <label className="font-body text-xs text-[#5A5A5A] dark:text-gray-400">Taille: {textFontSize}px</label>
                            <input
                              type="range"
                              min="16"
                              max="120"
                              value={textFontSize}
                              onChange={(e) => setTextFontSize(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="font-body text-xs text-[#5A5A5A] dark:text-gray-400">Couleur</label>
                            <input
                              type="color"
                              value={textColor}
                              onChange={(e) => setTextColor(e.target.value)}
                              className="w-full h-10 rounded-lg cursor-pointer"
                            />
                          </div>

                          <button
                            onClick={addTextLayer}
                            className="w-full p-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-body text-sm"
                          >
                            Ajouter texte
                          </button>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {/* Filter options */}
                  {toolMode === "filter" && selectedLayerId && getSelectedLayer()?.type === "image" && (
                    <FadeIn delay={0.1}>
                      <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                        <h3 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3">Filtres</h3>

                        <div className="grid grid-cols-2 gap-2">
                          {FILTERS.map((filter) => (
                            <button
                              key={filter.type}
                              onClick={() => {
                                setCurrentFilter(filter.type);
                                updateSelectedLayer({ filter: filter.type });
                              }}
                              className={`p-2 text-xs rounded-lg transition-all ${
                                (getSelectedLayer() as ImageLayer)?.filter === filter.type
                                  ? "bg-primary text-white"
                                  : "bg-[#F0F0F0] dark:bg-[#0A0A0A] hover:bg-primary/10"
                              }`}
                            >
                              {filter.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>

                {/* Center - Canvas */}
                <div className="lg:col-span-6">
                  <FadeIn>
                    <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                      {/* Side toggle */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button
                          onClick={() => setGarmentSide("front")}
                          className={`px-6 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                            garmentSide === "front" ? "bg-primary text-white" : "bg-[#F0F0F0] dark:bg-[#0A0A0A]"
                          }`}
                        >
                          Avant
                        </button>
                        <button
                          onClick={() => setGarmentSide("back")}
                          className={`px-6 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                            garmentSide === "back" ? "bg-primary text-white" : "bg-[#F0F0F0] dark:bg-[#0A0A0A]"
                          }`}
                        >
                          Arrière
                        </button>
                      </div>

                      {/* Canvas */}
                      <div className="relative bg-[#F5F5F5] dark:bg-[#0A0A0A] rounded-lg overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          className="w-full h-auto"
                          style={{ cursor: isDragging ? "grabbing" : selectedLayerId ? "grab" : "default" }}
                          onMouseDown={handleCanvasMouseDown}
                          onMouseMove={handleCanvasMouseMove}
                          onMouseUp={handleCanvasMouseUp}
                          onMouseLeave={handleCanvasMouseUp}
                        />

                        {getActiveLayers().length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8">
                              <Upload className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                              <p className="font-body text-[#5A5A5A] dark:text-gray-400">
                                Importez une image ou ajoutez du texte
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={downloadDesign}
                          disabled={getActiveLayers().length === 0}
                          className="flex-1 flex items-center justify-center gap-2 p-3 bg-accent hover:bg-accent/90 text-white rounded-lg disabled:opacity-50 transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          Télécharger
                        </button>
                        <button
                          onClick={shareDesign}
                          disabled={getActiveLayers().length === 0}
                          className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-lg disabled:opacity-50 transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                          Partager
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Right sidebar - Layers & Controls */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Layers */}
                  <FadeIn delay={0.1}>
                    <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white">
                          Calques ({garmentSide === "front" ? "Avant" : "Arrière"})
                        </h3>
                        <span className="font-mono text-xs text-primary">{getActiveLayers().length}</span>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {getActiveLayers().length === 0 ? (
                          <p className="font-body text-sm text-[#7A7A7A] text-center py-4">Aucun calque</p>
                        ) : (
                          getActiveLayers().map((layer, index) => (
                            <div
                              key={layer.id}
                              onClick={() => {
                                setSelectedLayerId(layer.id);
                                setDesignX(layer.x);
                                setDesignY(layer.y);
                                setRotation(layer.rotation);
                                if (layer.type === "image") {
                                  setDesignScale((layer as ImageLayer).scale);
                                  setCurrentFilter((layer as ImageLayer).filter);
                                }
                              }}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                selectedLayerId === layer.id
                                  ? "bg-primary/10 border-2 border-primary"
                                  : "bg-[#F0F0F0] dark:bg-[#0A0A0A] border-2 border-transparent hover:border-primary/30"
                              }`}
                            >
                              <div className="w-10 h-10 rounded bg-[#2B2B2B]/10 dark:bg-white/10 flex items-center justify-center">
                                {layer.type === "image" ? (
                                  <ImageIcon className="w-5 h-5 text-[#5A5A5A]" />
                                ) : (
                                  <Type className="w-5 h-5 text-[#5A5A5A]" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white truncate">
                                  {layer.type === "text" ? (layer as TextLayer).content : `Image ${index + 1}`}
                                </p>
                                <p className="font-mono text-xs text-[#7A7A7A]">
                                  {layer.type === "image"
                                    ? `${Math.round((layer as ImageLayer).scale * 100)}%`
                                    : `${(layer as TextLayer).fontSize}px`}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Layer actions */}
                      {selectedLayerId && (
                        <div className="flex gap-2 mt-3 pt-3 border-t border-[#2B2B2B]/10 dark:border-white/10">
                          <button
                            onClick={duplicateSelectedLayer}
                            className="flex-1 flex items-center justify-center gap-1 p-2 bg-[#F0F0F0] dark:bg-[#0A0A0A] hover:bg-primary/10 rounded-lg transition-colors"
                            title="Dupliquer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={deleteSelectedLayer}
                            className="flex-1 flex items-center justify-center gap-1 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </FadeIn>

                  {/* Controls */}
                  {selectedLayerId && (
                    <FadeIn delay={0.2}>
                      <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                        <h3 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-4">Transformations</h3>

                        <div className="space-y-4">
                          {getSelectedLayer()?.type === "image" && (
                            <div>
                              <label className="flex items-center justify-between font-body text-xs text-[#5A5A5A] dark:text-gray-400 mb-1">
                                <span>Échelle</span>
                                <span className="font-mono text-primary">{Math.round(designScale * 100)}%</span>
                              </label>
                              <input
                                type="range"
                                min="0.3"
                                max="2.5"
                                step="0.1"
                                value={designScale}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value);
                                  setDesignScale(value);
                                  updateSelectedLayer({ scale: value });
                                }}
                                className="w-full"
                              />
                            </div>
                          )}

                          {getSelectedLayer()?.type === "text" && (
                            <>
                              <input
                                type="text"
                                value={(getSelectedLayer() as TextLayer).content}
                                onChange={(e) => updateSelectedLayer({ content: e.target.value })}
                                className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white"
                              />
                              <div>
                                <label className="font-body text-xs text-[#5A5A5A] dark:text-gray-400">Taille</label>
                                <input
                                  type="range"
                                  min="16"
                                  max="120"
                                  value={(getSelectedLayer() as TextLayer).fontSize}
                                  onChange={(e) => updateSelectedLayer({ fontSize: parseInt(e.target.value) })}
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <label className="font-body text-xs text-[#5A5A5A] dark:text-gray-400">Couleur</label>
                                <input
                                  type="color"
                                  value={(getSelectedLayer() as TextLayer).color}
                                  onChange={(e) => updateSelectedLayer({ color: e.target.value })}
                                  className="w-full h-8 rounded cursor-pointer"
                                />
                              </div>
                            </>
                          )}

                          <div>
                            <label className="flex items-center justify-between font-body text-xs text-[#5A5A5A] dark:text-gray-400 mb-1">
                              <span>Position X</span>
                              <span className="font-mono text-primary">{Math.round(designX)}%</span>
                            </label>
                            <input
                              type="range"
                              min="15"
                              max="85"
                              value={designX}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setDesignX(value);
                                updateSelectedLayer({ x: value });
                              }}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="flex items-center justify-between font-body text-xs text-[#5A5A5A] dark:text-gray-400 mb-1">
                              <span>Position Y</span>
                              <span className="font-mono text-primary">{Math.round(designY)}%</span>
                            </label>
                            <input
                              type="range"
                              min="15"
                              max="85"
                              value={designY}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setDesignY(value);
                                updateSelectedLayer({ y: value });
                              }}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="flex items-center justify-between font-body text-xs text-[#5A5A5A] dark:text-gray-400 mb-1">
                              <span>Rotation</span>
                              <span className="font-mono text-primary">{rotation}°</span>
                            </label>
                            <input
                              type="range"
                              min="-180"
                              max="180"
                              value={rotation}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setRotation(value);
                                updateSelectedLayer({ rotation: value });
                              }}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {/* Submit form */}
                  {(frontLayers.length > 0 || backLayers.length > 0) && (
                    <FadeIn delay={0.3}>
                      <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg shadow-lg">
                        <h3 className="font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-4">
                          Soumettre au concours
                        </h3>

                        {submitted ? (
                          <div className="text-center py-8">
                            <Check className="w-12 h-12 text-primary mx-auto mb-3" />
                            <p className="font-display text-lg font-bold text-primary">Design soumis !</p>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                              type="text"
                              value={artistName}
                              onChange={(e) => setArtistName(e.target.value)}
                              required
                              placeholder="Votre nom d'artiste"
                              className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white"
                            />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="Email"
                              className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white"
                            />
                            <input
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required
                              placeholder="Titre de l'œuvre"
                              className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white"
                            />
                            <textarea
                              value={philosophy}
                              onChange={(e) => setPhilosophy(e.target.value)}
                              required
                              rows={3}
                              placeholder="Philosophie de votre design..."
                              className="w-full px-3 py-2 text-sm bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg border-0 text-[#2B2B2B] dark:text-white resize-none"
                            />
                            <button
                              type="submit"
                              className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-body font-semibold hover:scale-105 transition-transform"
                            >
                              <Send className="w-5 h-5" />
                              Soumettre
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

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white">Templates</h2>
                <button onClick={() => setShowTemplates(false)} className="p-2 hover:bg-[#F0F0F0] dark:hover:bg-[#0A0A0A] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                  >
                    <div className="absolute inset-0" style={{ background: template.preview }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold" style={{ color: template.textColor }}>
                        {template.textContent}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                      <p className="font-body text-sm font-semibold text-white">{template.name}</p>
                      <p className="font-body text-xs text-white/70">{template.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drafts Modal */}
      <AnimatePresence>
        {showDrafts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDrafts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white">Mes brouillons</h2>
                <button onClick={() => setShowDrafts(false)} className="p-2 hover:bg-[#F0F0F0] dark:hover:bg-[#0A0A0A] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="flex items-center justify-between p-4 bg-[#F0F0F0] dark:bg-[#0A0A0A] rounded-lg"
                  >
                    <div>
                      <p className="font-body font-semibold text-[#2B2B2B] dark:text-white">{draft.name}</p>
                      <p className="font-mono text-xs text-[#7A7A7A]">
                        {draft.garmentType === "tshirt" ? "T-Shirt" : "Sweatshirt"} • {draft.garmentFit}
                      </p>
                      <p className="font-mono text-xs text-[#7A7A7A]">
                        {new Date(draft.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadDraft(draft)}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
                      >
                        Charger
                      </button>
                      <button
                        onClick={() => deleteDraft(draft.id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white">Partager</h2>
                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-[#F0F0F0] dark:hover:bg-[#0A0A0A] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {shareUrl && (
                <div className="mb-6">
                  <img src={shareUrl} alt="Design preview" className="w-full rounded-lg" />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </button>
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </button>
              </div>

              <p className="font-body text-xs text-[#7A7A7A] text-center mt-4">
                Téléchargez l'image et partagez-la sur vos réseaux !
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Calculator Modal */}
      <AnimatePresence>
        {showPriceCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPriceCalculator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white">Estimation du prix</h2>
                <button onClick={() => setShowPriceCalculator(false)} className="p-2 hover:bg-[#F0F0F0] dark:hover:bg-[#0A0A0A] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#2B2B2B]/10 dark:border-white/10">
                  <span className="font-body text-[#5A5A5A] dark:text-gray-400">
                    {garmentType === "tshirt" ? "T-Shirt" : "Sweatshirt"} base
                  </span>
                  <span className="font-mono font-semibold text-[#2B2B2B] dark:text-white">{PRICES.base[garmentType]}€</span>
                </div>

                {garmentFit === "oversize" && (
                  <div className="flex justify-between py-2 border-b border-[#2B2B2B]/10 dark:border-white/10">
                    <span className="font-body text-[#5A5A5A] dark:text-gray-400">Coupe oversize</span>
                    <span className="font-mono font-semibold text-[#2B2B2B] dark:text-white">+{PRICES.fit.oversize}€</span>
                  </div>
                )}

                {(frontLayers.length + backLayers.length) > 1 && (
                  <div className="flex justify-between py-2 border-b border-[#2B2B2B]/10 dark:border-white/10">
                    <span className="font-body text-[#5A5A5A] dark:text-gray-400">
                      Design {(frontLayers.length + backLayers.length) > 3 ? "premium" : "complexe"}
                    </span>
                    <span className="font-mono font-semibold text-[#2B2B2B] dark:text-white">
                      +{(frontLayers.length + backLayers.length) > 3 ? PRICES.design.premium : PRICES.design.complex}€
                    </span>
                  </div>
                )}

                {frontLayers.length > 0 && backLayers.length > 0 && (
                  <div className="flex justify-between py-2 border-b border-[#2B2B2B]/10 dark:border-white/10">
                    <span className="font-body text-[#5A5A5A] dark:text-gray-400">Impression recto-verso</span>
                    <span className="font-mono font-semibold text-[#2B2B2B] dark:text-white">+{PRICES.printing.both}€</span>
                  </div>
                )}

                <div className="flex justify-between py-4 mt-4 bg-primary/10 rounded-lg px-4">
                  <span className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white">Total estimé</span>
                  <span className="font-display text-2xl font-bold text-primary">{calculatePrice()}€</span>
                </div>
              </div>

              <p className="font-body text-xs text-[#7A7A7A] text-center mt-4">
                * Prix indicatif. Le prix final peut varier selon les options de personnalisation.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A1A1A] via-accent/20 to-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {studioContent?.cta?.title || "Prêt à créer ?"}
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              {studioContent?.cta?.subtitle || "Explorez la galerie et découvrez les créations de la communauté"}
            </p>
            <a
              href="/galerie"
              className="inline-block font-body font-semibold px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all hover:scale-105"
            >
              {studioContent?.cta?.button || "Voir la galerie"}
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

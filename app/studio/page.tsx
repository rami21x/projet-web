"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Check,
  Shirt,
  Image as ImageIcon,
  X,
  ChevronDown,
  Download,
  Trophy,
  Heart,
  Users,
  Move,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

// Photo mappings for philosophers and artists
const PHILOSOPHER_IMAGES: Record<string, string> = {
  "Friedrich Nietzsche": "/images/studio/nietzsche.jpeg",
  "Carl Jung": "/images/studio/Jung.jpeg",
  "Lao-Tzu": "/images/studio/laotzu.jpeg",
  "Lao-Tseu": "/images/studio/laotzu.jpeg",
};

const ARTIST_IMAGES: Record<string, string> = {
  "Francis Bacon": "/images/studio/bacon.jpeg",
  "Jean Dubuffet": "/images/studio/Dubuffet.jpeg",
  "Willem de Kooning": "/images/studio/kooning.jpeg",
};

// Types
type Step = "comprendre" | "interpreter" | "creer" | "visualiser";
type GarmentType = "tshirt" | "pull";
type GarmentFit = "oversize" | "regular" | "slim";

// Custom SVG symbols - elegant geometric designs
const SymbolFire = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M24 4C24 4 12 16 12 28C12 34.627 17.373 40 24 40C30.627 40 36 34.627 36 28C36 16 24 4 24 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M24 16C24 16 18 22 18 28C18 31.314 20.686 34 24 34C27.314 34 30 31.314 30 28C30 22 24 16 24 16Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

const SymbolEclipse = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path
      d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SymbolDance = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M8 40C8 40 16 32 24 24C32 16 40 8 40 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M8 8C8 8 16 16 24 24C32 32 40 40 40 40"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const SymbolMirror = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
    <path
      d="M12 14L20 24L12 34"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M36 14L28 24L36 34"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const SYMBOL_COMPONENTS = [SymbolFire, SymbolEclipse, SymbolDance, SymbolMirror];

// CSS Blend Mode Mockup Component - Uses PNG with multiply blend for realistic coloring
const MockupWithBlendMode = ({
  imageSrc,
  color,
  children,
  designPosition,
  garmentType
}: {
  imageSrc: string;
  color: string;
  children?: React.ReactNode;
  designPosition: { top: string; left: string; width: string; height: string };
  garmentType: 'tshirt' | 'hoodie';
}) => {
  const [imageExists, setImageExists] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {imageExists ? (
        <>
          {/* Color layer - appears behind the white mockup with multiply blend */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: color }}
          />
          {/* White PNG mockup with multiply blend mode */}
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt="Garment mockup"
              fill
              className="object-contain mix-blend-multiply"
              style={{ filter: 'contrast(1.05)' }}
              onError={() => setImageExists(false)}
            />
          </div>
          {/* Design overlay */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: designPosition.top,
              left: designPosition.left,
              width: designPosition.width,
              height: designPosition.height,
            }}
          >
            {children}
          </div>
        </>
      ) : (
        // Fallback to enhanced SVG mockup
        <FallbackMockup color={color} type={garmentType}>
          {children}
        </FallbackMockup>
      )}
    </div>
  );
};

// Enhanced Fallback SVG Mockup (much more detailed and realistic)
const FallbackMockup = ({ color, type, children }: { color: string; type: 'tshirt' | 'hoodie'; children?: React.ReactNode }) => {
  const isLight = color === "#FFFFFF" || color === "#F5F5DC" || color === "#D2B48C";
  const shadowColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.15)";
  const highlightColor = isLight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)";
  const strokeColor = isLight ? "#D1D5DB" : "transparent";

  if (type === 'hoodie') {
    return (
      <div className="relative w-full h-full">
        <svg viewBox="0 0 400 480" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
          <defs>
            <linearGradient id="hoodieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={highlightColor} />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor={shadowColor} />
            </linearGradient>
            <linearGradient id="hoodieFold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={shadowColor} />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor={shadowColor} />
            </linearGradient>
          </defs>

          {/* Hood - back part */}
          <path
            d="M100 85 Q60 50 100 20 Q200 -15 300 20 Q340 50 300 85"
            fill={color}
            stroke={strokeColor}
            strokeWidth="1.5"
          />

          {/* Main body */}
          <path
            d="M100 85 L55 125 L15 110 L45 220 L75 205 L75 440 L325 440 L325 205 L355 220 L385 110 L345 125 L300 85 L255 85 C245 115 220 135 200 135 C180 135 155 115 145 85 L100 85 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth="1.5"
          />

          {/* Gradient overlay for 3D effect */}
          <path
            d="M100 85 L55 125 L15 110 L45 220 L75 205 L75 440 L325 440 L325 205 L355 220 L385 110 L345 125 L300 85 L255 85 C245 115 220 135 200 135 C180 135 155 115 145 85 L100 85 Z"
            fill="url(#hoodieGradient)"
          />

          {/* Hood opening / neckline */}
          <ellipse cx="200" cy="92" rx="58" ry="22" fill={color} />
          <ellipse cx="200" cy="92" rx="45" ry="15" fill="none" stroke={shadowColor} strokeWidth="3" />

          {/* Hood strings */}
          <path d="M170 100 L165 160" stroke={shadowColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M230 100 L235 160" stroke={shadowColor} strokeWidth="3" strokeLinecap="round" />

          {/* Kangaroo pocket */}
          <path
            d="M120 320 Q120 350 150 350 L250 350 Q280 350 280 320 L280 295 Q200 310 120 295 Z"
            fill="none"
            stroke={shadowColor}
            strokeWidth="2.5"
          />

          {/* Sleeve seams */}
          <path d="M75 205 Q55 145 45 220" fill="none" stroke={shadowColor} strokeWidth="1.5" />
          <path d="M325 205 Q345 145 355 220" fill="none" stroke={shadowColor} strokeWidth="1.5" />

          {/* Cuffs */}
          <rect x="40" y="205" width="40" height="20" rx="4" fill={shadowColor} />
          <rect x="320" y="205" width="40" height="20" rx="4" fill={shadowColor} />

          {/* Bottom hem */}
          <rect x="75" y="425" width="250" height="18" rx="4" fill={shadowColor} />

          {/* Center fold line */}
          <path d="M200 135 L200 320" stroke="url(#hoodieFold)" strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Design overlay area */}
        <div className="absolute top-[32%] left-[30%] w-[40%] h-[28%] flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  // T-shirt
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 400 480" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
        <defs>
          <linearGradient id="tshirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor={shadowColor} />
          </linearGradient>
          <linearGradient id="tshirtFold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={shadowColor} />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor={shadowColor} />
          </linearGradient>
        </defs>

        {/* Main body */}
        <path
          d="M105 70 L65 105 L25 90 L50 165 L85 150 L85 440 L315 440 L315 150 L350 165 L375 90 L335 105 L295 70 L250 70 C242 100 225 120 200 120 C175 120 158 100 150 70 L105 70 Z"
          fill={color}
          stroke={strokeColor}
          strokeWidth="1.5"
        />

        {/* Gradient overlay for 3D effect */}
        <path
          d="M105 70 L65 105 L25 90 L50 165 L85 150 L85 440 L315 440 L315 150 L350 165 L375 90 L335 105 L295 70 L250 70 C242 100 225 120 200 120 C175 120 158 100 150 70 L105 70 Z"
          fill="url(#tshirtGradient)"
        />

        {/* Collar band */}
        <ellipse cx="200" cy="75" rx="52" ry="18" fill={color} stroke={strokeColor} strokeWidth="1" />
        <ellipse cx="200" cy="75" rx="40" ry="12" fill="none" stroke={shadowColor} strokeWidth="3" />

        {/* Sleeve hems */}
        <path d="M50 155 L85 145" stroke={shadowColor} strokeWidth="2" />
        <path d="M350 155 L315 145" stroke={shadowColor} strokeWidth="2" />

        {/* Side seams */}
        <path d="M85 150 L85 440" stroke={shadowColor} strokeWidth="1" opacity="0.3" />
        <path d="M315 150 L315 440" stroke={shadowColor} strokeWidth="1" opacity="0.3" />

        {/* Bottom hem */}
        <rect x="85" y="428" width="230" height="14" rx="3" fill={shadowColor} />

        {/* Center fold hint */}
        <path d="M200 120 L200 420" stroke="url(#tshirtFold)" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Design overlay area */}
      <div className="absolute top-[28%] left-[28%] w-[44%] h-[32%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// T-Shirt Mockup - uses PNG with blend mode for color, falls back to enhanced SVG
const TShirtMockup = ({ color, children }: { color: string; children?: React.ReactNode }) => (
  <MockupWithBlendMode
    imageSrc="/images/mockups/tshirt-white.png"
    color={color}
    designPosition={{ top: '28%', left: '28%', width: '44%', height: '32%' }}
    garmentType="tshirt"
  >
    {children}
  </MockupWithBlendMode>
);

// Sweatshirt/Hoodie Mockup - uses JPG with blend mode for color, falls back to enhanced SVG
const SweatshirtMockup = ({ color, children }: { color: string; children?: React.ReactNode }) => (
  <MockupWithBlendMode
    imageSrc="/images/mockups/hoodie-white.jpg"
    color={color}
    designPosition={{ top: '32%', left: '30%', width: '40%', height: '28%' }}
    garmentType="hoodie"
  >
    {children}
  </MockupWithBlendMode>
);

// Interactive Artwork Editor Component
type ArtworkTransform = {
  x: number;
  y: number;
  scale: number;
};

const InteractiveArtworkEditor = ({
  uploadedImage,
  garmentType,
  garmentColor,
  transform,
  onTransformChange,
  isDark,
}: {
  uploadedImage: string | null;
  garmentType: GarmentType;
  garmentColor: { name: string; hex: string; dark: boolean };
  transform: ArtworkTransform;
  onTransformChange: (transform: ArtworkTransform) => void;
  isDark: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const bgCard = isDark ? "bg-[#111111]" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textMuted = isDark ? "text-white/40" : "text-gray-400";

  // Handle mouse/touch drag start
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - transform.x,
      y: clientY - transform.y,
    });
  }, [transform.x, transform.y]);

  // Handle mouse/touch drag move
  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Calculate movement as percentage of container
    const newX = ((clientX - dragStart.x) / rect.width) * 100;
    const newY = ((clientY - dragStart.y) / rect.height) * 100;

    // Clamp values to reasonable bounds (-50% to 50%)
    const clampedX = Math.max(-50, Math.min(50, newX));
    const clampedY = Math.max(-50, Math.min(50, newY));

    onTransformChange({
      ...transform,
      x: clampedX,
      y: clampedY,
    });
  }, [isDragging, dragStart, transform, onTransformChange]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  }, [handleDragMove]);

  // Add/remove global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleDragEnd]);

  // Scale controls
  const handleScaleChange = (delta: number) => {
    const newScale = Math.max(0.3, Math.min(2, transform.scale + delta));
    onTransformChange({ ...transform, scale: newScale });
  };

  // Reset transform
  const handleReset = () => {
    onTransformChange({ x: 0, y: 0, scale: 1 });
  };

  const safeGarmentColor = garmentColor || { name: "White", hex: "#FFFFFF", dark: false };

  return (
    <div className="space-y-4">
      {/* Mockup Preview with Interactive Artwork */}
      <div
        ref={containerRef}
        className={`aspect-[3/4] relative overflow-hidden rounded-lg ${isDark ? "bg-neutral-900" : "bg-neutral-100"}`}
      >
        {/* Background color layer for blend mode */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: safeGarmentColor.hex }}
        />

        {/* Garment mockup image */}
        <div className="absolute inset-0">
          <Image
            src={garmentType === "tshirt" ? "/images/mockups/tshirt-white.png" : "/images/mockups/hoodie-white.jpg"}
            alt="Garment mockup"
            fill
            className="object-contain mix-blend-multiply"
            style={{ filter: 'contrast(1.05)' }}
            onError={(e) => {
              // Fallback if image doesn't load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Interactive Artwork Overlay */}
        {uploadedImage && (
          <div
            className={`absolute cursor-move transition-shadow ${isDragging ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50'}`}
            style={{
              top: garmentType === "tshirt" ? '25%' : '28%',
              left: '25%',
              width: '50%',
              height: '40%',
              transform: `translate(${transform.x}%, ${transform.y}%) scale(${transform.scale})`,
              transformOrigin: 'center center',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={uploadedImage}
              alt="Your artwork"
              className="w-full h-full object-contain pointer-events-none select-none"
              draggable={false}
            />

            {/* Drag indicator */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded ${isDragging ? 'opacity-100' : ''}`}>
              <Move className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
        )}

        {/* Label */}
        <div className={`absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-mono ${isDark ? "text-white/40" : "text-black/40"}`}>
          <span>{garmentType === "tshirt" ? "T-Shirt" : "Hoodie"}</span>
          <span>{safeGarmentColor.name}</span>
        </div>
      </div>

      {/* Controls */}
      <div className={`flex items-center justify-between gap-2 p-3 ${bgCard} border ${borderColor} rounded-lg`}>
        {/* Scale controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleScaleChange(-0.1)}
            className={`p-2 rounded-lg border ${borderColor} ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"} transition-colors`}
            title="Reduire"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className={`px-3 py-1 text-sm font-mono ${textMuted} min-w-[60px] text-center`}>
            {Math.round(transform.scale * 100)}%
          </span>
          <button
            onClick={() => handleScaleChange(0.1)}
            className={`p-2 rounded-lg border ${borderColor} ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"} transition-colors`}
            title="Agrandir"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Position indicator */}
        <div className={`text-xs ${textMuted} font-mono hidden sm:block`}>
          <Move className="w-3 h-3 inline mr-1" />
          Glissez pour deplacer
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${borderColor} ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"} transition-colors text-sm`}
          title="Reinitialiser"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Helper text */}
      <p className={`text-xs ${textMuted} text-center`}>
        Glissez l'image pour la repositionner. Utilisez les boutons +/- pour ajuster la taille.
      </p>
    </div>
  );
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
  const defaultColor = { name: "White", hex: "#FFFFFF", dark: false };
  const [garmentColor, setGarmentColor] = useState(content.colors?.[0] || defaultColor);

  // Submission state
  const [artistInfo, setArtistInfo] = useState({
    name: "",
    email: "",
    instagram: "",
    title: "",
    comment: "",
    position: "",
  });
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Artwork transform state (position and scale)
  const [artworkTransform, setArtworkTransform] = useState({
    x: 0,      // horizontal offset in %
    y: 0,      // vertical offset in %
    scale: 1,  // scale factor (1 = 100%)
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: "comprendre", label: content.steps.comprendre, icon: BookOpen },
    { id: "interpreter", label: content.steps.interpreter, icon: Feather },
    { id: "creer", label: content.steps.creer, icon: Upload },
    { id: "visualiser", label: "Soumettre", icon: Send },
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
    // Client-side validation
    if (!artistInfo.name || artistInfo.name.length < 2) {
      alert("Veuillez entrer votre nom (min 2 caractères).");
      return;
    }
    if (!artistInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(artistInfo.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    if (!artistInfo.title || artistInfo.title.length < 3) {
      alert("Veuillez entrer un titre pour votre œuvre (min 3 caractères).");
      return;
    }
    if (!uploadedImage) {
      alert("Veuillez uploader une image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const philosophyText = [
        `DUALITÉ: ${interpretation.duality}`,
        `HARMONIE DU CHAOS: ${interpretation.harmony}`,
        `SENTIMENT: ${interpretation.feeling}`,
        `MESSAGE: ${interpretation.message}`,
        artistInfo.comment ? `COMMENTAIRE: ${artistInfo.comment}` : "",
        artistInfo.position ? `POSITION SOUHAITÉE: ${artistInfo.position}` : "",
      ].filter(Boolean).join("\n\n");

      const response = await fetch("/api/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: artistInfo.name,
          artistName: artistInfo.instagram || artistInfo.name,
          email: artistInfo.email,
          title: artistInfo.title,
          philosophy: philosophyText,
          garmentType: "tshirt",
          garmentFit: "oversize",
          garmentColor: "#FFFFFF",
          imageData: uploadedImage,
        }),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error("Erreur API:", errorData);
        alert(errorData.error || "Une erreur est survenue lors de la soumission.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      alert("Erreur de connexion. Veuillez réessayer.");
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
              artistInfo={artistInfo}
              setArtistInfo={setArtistInfo}
              interpretation={interpretation}
              acceptNewsletter={acceptNewsletter}
              setAcceptNewsletter={setAcceptNewsletter}
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
                  {/* Philosopher image */}
                  <div className={`aspect-[3/4] relative overflow-hidden ${isDark ? "bg-gradient-to-br from-primary/10 to-accent/10" : "bg-gradient-to-br from-primary/5 to-accent/5"}`}>
                    {PHILOSOPHER_IMAGES[philosopher.name] ? (
                      <Image
                        src={PHILOSOPHER_IMAGES[philosopher.name]}
                        alt={philosopher.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`font-display text-6xl font-bold ${textMuted}`}>
                          {philosopher.name.charAt(0)}
                        </span>
                      </div>
                    )}
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
            <h3 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} text-center mb-6`}>
              {content.comprendre.symbolsTitle}
            </h3>
            <p className={`${textMuted} text-center max-w-2xl mx-auto mb-16`}>
              Quatre symboles universels qui incarnent la tension entre forces opposées
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {content.comprendre.symbols.map((symbol, index) => {
              const SymbolSvg = SYMBOL_COMPONENTS[index];
              return (
                <FadeIn key={symbol.name} delay={index * 0.1}>
                  <div className="group relative">
                    {/* Subtle gradient border on hover */}
                    <div className={`absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className={`relative ${bgCard} p-8 lg:p-6 border ${borderColor} group-hover:border-transparent transition-all duration-500 h-full`}>
                      {/* Symbol SVG */}
                      <div className="relative w-20 h-20 mx-auto mb-6">
                        {/* Background glow */}
                        <div className={`absolute inset-0 ${isDark ? "bg-primary/5" : "bg-primary/[0.03]"} rounded-full blur-xl group-hover:bg-primary/10 transition-all duration-500`} />
                        {/* SVG */}
                        <SymbolSvg className="relative w-full h-full text-primary group-hover:scale-110 transition-transform duration-500" />
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h4 className={`font-display text-lg font-semibold ${textPrimary} mb-3 group-hover:text-primary transition-colors duration-300`}>
                          {symbol.name}
                        </h4>
                        <p className={`text-sm ${textSecondary} leading-relaxed`}>
                          {symbol.meaning}
                        </p>
                      </div>

                      {/* Decorative line */}
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-3/4 transition-all duration-500`} />
                    </div>
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
                  {/* Artist image */}
                  <div className={`aspect-[4/5] relative overflow-hidden ${isDark ? "bg-gradient-to-br from-accent/10 to-primary/10" : "bg-gradient-to-br from-accent/5 to-primary/5"}`}>
                    {ARTIST_IMAGES[artist.name] ? (
                      <Image
                        src={ARTIST_IMAGES[artist.name]}
                        alt={artist.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className={`w-20 h-20 ${textMuted}`} />
                      </div>
                    )}
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

      {/* Artwork Gallery - Visual Inspirations */}
      {content.artwork && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className={`font-mono text-xs tracking-[0.3em] text-primary text-center mb-3`}>
                NARCISSE AMOUREUX
              </p>
              <h3 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} text-center mb-4`}>
                {content.artwork.sectionTitle}
              </h3>
              <p className={`${textMuted} text-center max-w-2xl mx-auto mb-16`}>
                {content.artwork.sectionSubtitle}
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.artwork.pieces.map((piece, index) => (
                <FadeIn key={piece.id} delay={index * 0.1}>
                  <div className={`group ${bgCard} overflow-hidden border ${borderColor} hover:border-primary/30 transition-all duration-500`}>
                    {/* Artwork image */}
                    <div className={`aspect-[3/4] relative overflow-hidden ${isDark ? "bg-gradient-to-br from-primary/10 to-accent/10" : "bg-gradient-to-br from-primary/5 to-accent/5"}`}>
                      <Image
                        src={`/images/studio/artwork/${piece.file}`}
                        alt={piece.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Theme badge */}
                      <div className={`absolute top-3 right-3 px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${
                        piece.theme === "love"
                          ? "bg-pink-500/80 text-white"
                          : piece.theme === "selfishness"
                          ? "bg-amber-500/80 text-white"
                          : "bg-primary/80 text-white"
                      }`}>
                        {piece.theme === "love" ? "Amour" : piece.theme === "selfishness" ? "Égoïsme" : "Dualité"}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs text-accent font-mono mb-1">
                        {piece.artist}, {piece.year}
                      </p>
                      <h4 className={`font-display text-lg font-semibold ${textPrimary} mb-2`}>
                        {piece.title}
                      </h4>
                      <p className={`text-sm ${textSecondary} leading-relaxed`}>
                        {piece.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brief Download Section */}
      {content.contest && (
        <section className={`py-24 px-6 ${isDark ? "bg-primary/5" : "bg-primary/[0.02]"}`}>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className={`${bgCard} p-8 md:p-12 border ${borderColor} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl" />
                <div className="relative flex flex-col md:flex-row gap-8 items-center">
                  <div className={`w-20 h-20 ${isDark ? "bg-primary/20" : "bg-primary/10"} flex items-center justify-center flex-shrink-0`}>
                    <Download className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs text-accent font-mono tracking-wider mb-2">
                      {content.contest.briefSection.label}
                    </p>
                    <h3 className={`font-display text-2xl md:text-3xl font-bold ${textPrimary} mb-3`}>
                      {content.contest.briefSection.title}
                    </h3>
                    <p className={`${textSecondary} mb-4`}>
                      {content.contest.briefSection.description}
                    </p>
                    <p className={`text-sm ${textMuted} mb-6`}>
                      <span className="text-accent font-mono text-xs">{content.contest.briefSection.themes}:</span> {content.contest.briefSection.themesText}
                    </p>
                    <a
                      href="/downloads/arteral-concours-brief.zip"
                      download
                      className="inline-flex items-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:scale-105 shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      {content.contest.briefSection.downloadButton}
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Prizes Section */}
      {content.contest && (
        <section className="py-24 px-6 bg-[#1A1A1A] text-white">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="font-mono text-xs tracking-[0.3em] text-primary/60 mb-3">
                  {content.contest.prizes.label}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {content.contest.prizes.title}
                </h3>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Prix du Peuple */}
              <FadeIn delay={0.1}>
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/20 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                          {content.contest.prizes.peuple.label}
                        </p>
                        <h4 className="font-display text-xl font-bold text-white">
                          {content.contest.prizes.peuple.title}
                        </h4>
                      </div>
                    </div>
                    <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                      {content.contest.prizes.peuple.amount}
                    </p>
                    <p className="text-white/60 mb-6">
                      {content.contest.prizes.peuple.description} <span className="text-white font-semibold">{content.contest.prizes.peuple.you}</span>. {content.contest.prizes.peuple.details}
                    </p>
                    <ul className="space-y-2">
                      {content.contest.prizes.peuple.rewards.map((reward, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Prix du Cœur */}
              <FadeIn delay={0.2}>
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-accent/20 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                          {content.contest.prizes.coeur.label}
                        </p>
                        <h4 className="font-display text-xl font-bold text-white">
                          {content.contest.prizes.coeur.title}
                        </h4>
                      </div>
                    </div>
                    <p className="font-display text-4xl md:text-5xl font-bold text-accent mb-4">
                      {content.contest.prizes.coeur.amount}
                    </p>
                    <p className="text-white/60 mb-6">
                      {content.contest.prizes.coeur.description}
                    </p>
                    {/* Jury */}
                    <div className="space-y-3 mb-6">
                      {content.contest.prizes.coeur.jury.map((member, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${i === 2 ? "bg-primary/30" : "bg-white/10"} flex items-center justify-center`}>
                            <Users className={`w-5 h-5 ${i === 2 ? "text-white" : "text-white/40"}`} />
                          </div>
                          <div>
                            <p className="text-sm text-white/80">{member.title}</p>
                            <p className={`font-mono text-[10px] ${i === 2 ? "text-primary/60" : "text-white/40"}`}>
                              {member.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ul className="space-y-2">
                      {content.contest.prizes.coeur.rewards.map((reward, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Rules Section */}
      {content.contest && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className={`font-mono text-xs tracking-[0.3em] text-accent mb-3`}>
                  {content.contest.rules.label}
                </p>
                <h3 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} mb-4`}>
                  {content.contest.rules.title}
                </h3>
                <div className={`w-16 h-[1px] bg-gradient-to-r from-transparent ${isDark ? "via-white/20" : "via-black/20"} to-transparent mx-auto`} />
              </div>
            </FadeIn>

            <div className="space-y-6">
              {content.contest.rules.items.map((rule, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className={`flex gap-6 ${bgCard} p-6 border ${borderColor}`}>
                    <div className="flex-shrink-0">
                      <span className="font-display text-3xl font-bold text-primary/30">{rule.num}</span>
                    </div>
                    <div>
                      <h4 className={`font-display text-lg font-bold ${textPrimary} mb-2`}>
                        {rule.title}
                      </h4>
                      <p className={`${textSecondary}`}>
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deadline Banner */}
      {content.contest && (
        <section className="py-12 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="font-mono text-xs tracking-[0.4em] text-white/60 mb-2">
                {content.contest.deadline.label}
              </p>
              <p className="font-display text-2xl md:text-3xl font-bold mb-2">
                {content.contest.deadline.date}
              </p>
              <p className="text-sm text-white/70">
                {content.contest.deadline.results}
              </p>
            </FadeIn>
          </div>
        </section>
      )}

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
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
            </motion.div>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// STEP 4: SOUMETTRE (anciennement VISUALISER)
// ============================================
function VisualiserStep({
  content,
  isDark,
  uploadedImage,
  artistInfo,
  setArtistInfo,
  interpretation,
  acceptNewsletter,
  setAcceptNewsletter,
  isSubmitting,
  isSubmitted,
  canSubmit,
  handleSubmit,
}: {
  content: ReturnType<typeof useContent>["studioPageContent"];
  isDark: boolean;
  uploadedImage: string | null;
  artistInfo: { name: string; email: string; instagram: string; title: string; comment: string; position: string };
  setArtistInfo: (v: { name: string; email: string; instagram: string; title: string; comment: string; position: string }) => void;
  interpretation: Record<string, string>;
  acceptNewsletter: boolean;
  setAcceptNewsletter: (v: boolean) => void;
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

  // Success Screen after submission
  if (isSubmitted) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} mb-4`}>
              Soumission envoyée !
            </h2>
            <p className={`${textSecondary} max-w-lg mx-auto mb-8`}>
              Votre œuvre a été soumise avec succès. Elle sera visible dans le Livret d'Or après validation.
            </p>

            {/* Summary Card */}
            <div className={`${bgCard} border ${borderColor} p-6 md:p-8 text-left`}>
              <div className="flex items-start gap-4 mb-6">
                {uploadedImage && (
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-black/30 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedImage} alt="Votre œuvre" className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <h3 className={`font-display text-xl font-semibold ${textPrimary}`}>{artistInfo.title}</h3>
                  <p className={`${textSecondary} text-sm`}>par {artistInfo.name}</p>
                  {artistInfo.instagram && (
                    <p className="text-primary text-sm">@{artistInfo.instagram.replace('@', '')}</p>
                  )}
                </div>
              </div>

              <div className={`p-4 border ${borderColor} ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}>
                <p className={`text-sm ${textSecondary} italic`}>"{interpretation.message}"</p>
              </div>
            </div>

            <p className={`text-sm ${textMuted} mt-6`}>
              Confirmation envoyée à <span className="text-primary">{artistInfo.email}</span>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 pb-40 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className={`w-16 h-16 mx-auto mb-6 ${isDark ? "bg-accent/10" : "bg-accent/5"} flex items-center justify-center`}>
              <Send className="w-7 h-7 text-accent" />
            </div>
            <h2 className={`font-display text-3xl md:text-4xl font-bold ${textPrimary} mb-4`}>
              Finalisez votre soumission
            </h2>
            <p className={`${textSecondary} max-w-xl mx-auto`}>
              Complétez vos informations pour soumettre votre œuvre au concours ARTERAL.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Uploaded Artwork Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-display text-lg font-semibold ${textPrimary} mb-4`}>
                Votre œuvre
              </h3>
              <div className={`aspect-square relative overflow-hidden ${isDark ? "bg-black/30" : "bg-gray-100"}`}>
                {uploadedImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={uploadedImage}
                    alt="Votre design"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className={`w-16 h-16 ${textMuted}`} />
                  </div>
                )}
              </div>

              {/* Message preview */}
              <div className={`mt-4 p-4 border ${borderColor} ${isDark ? "bg-accent/5" : "bg-accent/[0.02]"}`}>
                <p className="text-xs text-accent mb-2">Votre message</p>
                <p className={`${textSecondary} italic text-sm`}>"{interpretation.message}"</p>
              </div>
            </div>
          </motion.div>

          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-display text-lg font-semibold ${textPrimary} mb-6`}>
                Informations artiste
              </h3>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>Titre de l'œuvre *</label>
                  <input
                    type="text"
                    value={artistInfo.title}
                    onChange={(e) => setArtistInfo({ ...artistInfo, title: e.target.value })}
                    placeholder="Ex: Le Reflet Brisé"
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 transition-all`}
                  />
                </div>

                {/* Name */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>Votre nom *</label>
                  <input
                    type="text"
                    value={artistInfo.name}
                    onChange={(e) => setArtistInfo({ ...artistInfo, name: e.target.value })}
                    placeholder="Nom ou pseudonyme"
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 transition-all`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>Email *</label>
                  <input
                    type="email"
                    value={artistInfo.email}
                    onChange={(e) => setArtistInfo({ ...artistInfo, email: e.target.value })}
                    placeholder="pour vous contacter"
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 transition-all`}
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>Instagram (optionnel)</label>
                  <input
                    type="text"
                    value={artistInfo.instagram}
                    onChange={(e) => setArtistInfo({ ...artistInfo, instagram: e.target.value })}
                    placeholder="@votre_compte"
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 transition-all`}
                  />
                </div>

                {/* Position on garment - Optional */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>Position souhaitée sur le vêtement (optionnel)</label>
                  <select
                    value={artistInfo.position}
                    onChange={(e) => setArtistInfo({ ...artistInfo, position: e.target.value })}
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} focus:outline-none focus:border-primary/50 transition-all`}
                  >
                    <option value="">Laisser au choix de l'équipe</option>
                    <option value="center">Centre (poitrine)</option>
                    <option value="left">Côté gauche</option>
                    <option value="right">Côté droit</option>
                    <option value="back">Dos</option>
                    <option value="full">Impression complète</option>
                  </select>
                </div>

                {/* Comment about artwork */}
                <div>
                  <label className={`text-sm ${textMuted} mb-2 block`}>Commentaire sur l'œuvre (optionnel)</label>
                  <textarea
                    value={artistInfo.comment}
                    onChange={(e) => setArtistInfo({ ...artistInfo, comment: e.target.value })}
                    placeholder="Partagez l'histoire derrière votre création, votre inspiration..."
                    rows={3}
                    className={`w-full ${inputBg} border ${borderColor} px-4 py-3 ${textPrimary} placeholder:${textMuted} focus:outline-none focus:border-primary/50 transition-all resize-none`}
                  />
                </div>

                {/* Newsletter */}
                <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={acceptNewsletter}
                      onChange={(e) => setAcceptNewsletter(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-5 h-5 border-2 ${borderColor} transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50`}>
                      {acceptNewsletter && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <span className={`text-sm ${textSecondary} leading-relaxed`}>
                    J'accepte de recevoir des nouvelles concernant mon œuvre et les résultats du concours.
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`w-full mt-6 py-4 font-semibold flex items-center justify-center gap-3 transition-all ${
                    canSubmit && !isSubmitting
                      ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5"
                      : `${inputBg} ${textMuted} cursor-not-allowed border ${borderColor}`
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

                <p className={`text-xs ${textMuted} text-center mt-4`}>
                  En soumettant, vous acceptez que votre œuvre soit utilisée dans le cadre du concours ARTERAL.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

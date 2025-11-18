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
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface Design {
  id: string;
  artistName: string;
  email: string;
  title: string;
  philosophy: string;
  imageData: string;
  designData: string; // Canvas rendering
  timestamp: number;
  likes: number;
  comments: number;
  social?: string;
}

export default function StudioPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [tshirtColor, setTshirtColor] = useState<"white" | "black">("white");
  const [designScale, setDesignScale] = useState(1);
  const [designX, setDesignX] = useState(50);
  const [designY, setDesignY] = useState(40);
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

  // Render t-shirt with design
  useEffect(() => {
    if (!canvasRef.current || !uploadedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 700;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw t-shirt background
    ctx.fillStyle = tshirtColor === "white" ? "#FFFFFF" : "#1A1A1A";

    // T-shirt shape (simplified)
    ctx.beginPath();
    // Body
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 650);
    ctx.lineTo(450, 650);
    ctx.lineTo(450, 150);
    // Neck
    ctx.lineTo(400, 150);
    ctx.lineTo(380, 100);
    ctx.lineTo(220, 100);
    ctx.lineTo(200, 150);
    ctx.closePath();
    ctx.fill();

    // Outline
    ctx.strokeStyle = tshirtColor === "white" ? "#E0E0E0" : "#404040";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw uploaded image on t-shirt
    const img = new Image();
    img.onload = () => {
      ctx.save();

      const centerX = canvas.width * (designX / 100);
      const centerY = canvas.height * (designY / 100);

      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      const maxWidth = 200 * designScale;
      const maxHeight = 200 * designScale;

      let drawWidth = maxWidth;
      let drawHeight = (img.height / img.width) * maxWidth;

      if (drawHeight > maxHeight) {
        drawHeight = maxHeight;
        drawWidth = (img.width / img.height) * maxHeight;
      }

      ctx.drawImage(
        img,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      ctx.restore();

      // Add watermark
      ctx.fillStyle = tshirtColor === "white" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
      ctx.font = "12px monospace";
      ctx.fillText("ARTERAL STUDIO", 10, canvas.height - 10);
    };
    img.src = uploadedImage;
  }, [uploadedImage, tshirtColor, designScale, designX, designY, rotation]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Veuillez uploader une image (PNG, JPG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
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
    link.download = `arteral-design-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedImage || !canvasRef.current) {
      alert("Veuillez uploader et créer un design d'abord");
      return;
    }

    // Create design object
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
    };

    // Get existing designs from localStorage
    const existingDesigns = JSON.parse(
      localStorage.getItem("arteral-designs") || "[]"
    );

    // Add new design
    existingDesigns.push(design);

    // Save to localStorage
    localStorage.setItem("arteral-designs", JSON.stringify(existingDesigns));

    // Show success
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setUploadedImage(null);
      setArtistName("");
      setEmail("");
      setTitle("");
      setPhilosophy("");
      setSocial("");
      setDesignScale(1);
      setDesignX(50);
      setDesignY(40);
      setRotation(0);
    }, 3000);
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
              Créez votre design philosophique. Visualisez votre œuvre sur un
              t-shirt. Partagez avec la communauté.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Preview */}
            <div>
              <FadeIn>
                <div className="bg-white dark:bg-dark/80 p-8 rounded-lg shadow-2xl border-2 border-primary/20">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                    <Move className="w-6 h-6 text-primary" />
                    Prévisualisation
                  </h2>

                  {/* Canvas */}
                  <div className="relative bg-light dark:bg-dark/50 rounded-lg p-4 mb-6">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: "600px" }}
                    />

                    {!uploadedImage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Upload className="w-16 h-16 text-dark/20 dark:text-white/20 mx-auto mb-4" />
                          <p className="font-body text-dark/40 dark:text-white/40">
                            Uploadez une image pour commencer
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* T-shirt Color Toggle */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      onClick={() => setTshirtColor("white")}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        tshirtColor === "white"
                          ? "border-primary bg-white"
                          : "border-dark/20 bg-white"
                      }`}
                      aria-label="T-shirt blanc"
                    />
                    <span className="font-body text-sm text-dark dark:text-white">
                      Couleur du T-shirt
                    </span>
                    <button
                      onClick={() => setTshirtColor("black")}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        tshirtColor === "black"
                          ? "border-primary bg-dark"
                          : "border-dark/20 bg-dark"
                      }`}
                      aria-label="T-shirt noir"
                    />
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

            {/* Right: Controls & Form */}
            <div className="space-y-8">
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
                          max="2"
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
                          max="60"
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
                            placeholder="Quelle est la philosophie derrière votre création ? Qu'explore-t-elle ?"
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
      </section>

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

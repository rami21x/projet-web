"use client";

import { useEffect, useState } from "react";

export default function MuseumSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activate spotlight after 1 second
    setTimeout(() => setIsActive(true), 1000);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      style={{
        background: `radial-gradient(circle 600px at ${position.x}px ${position.y}px, transparent 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.25) 100%)`,
        transition: "background 0.15s ease-out",
        mixBlendMode: "multiply",
      }}
    />
  );
}

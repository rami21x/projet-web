"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ArtistesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/studio");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60 font-mono text-sm">Redirection vers le Studio...</p>
      </div>
    </div>
  );
}

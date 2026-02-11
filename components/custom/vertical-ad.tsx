"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface VerticalAdProps {
  position?: "left" | "right";
  className?: string;
  imageUrl?: string;
  redirectUrl?: string;
  altText?: string;
}

export default function VerticalAd({
  position = "left",
  className = "",
  imageUrl = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=280&h=600&fit=crop",
  redirectUrl = "https://example.com",
  altText = "Advertisement",
}: VerticalAdProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-all shadow-lg backdrop-blur-sm"
        aria-label="Close ad"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* Sponsored Badge */}
      <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs font-semibold">
        Ad
      </div>

      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="relative w-[280px] h-[600px] bg-gradient-to-br from-orange-100 to-yellow-50">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="280px"
            unoptimized
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </a>
    </div>
  );
}

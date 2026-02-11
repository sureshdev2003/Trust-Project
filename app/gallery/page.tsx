"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/custom/navigation-menu";
import Footer from "../../components/custom/footer-section";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imagePath: string; // comes from DB
}

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const json = await res.json();

        if (json.success) setItems(json.data);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div>
      <Navbar />

      <section className="w-full py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Gallery
            </h1>
            <p className="text-lg text-gray-600">
              Hover over images to reveal descriptions
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-300 ${
                    hoveredId === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center px-6">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

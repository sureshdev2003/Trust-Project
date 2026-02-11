"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Building2 } from "lucide-react";

interface Sponsor {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
  createdAt: string;
}

export function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch sponsors data
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sponsors');
        if (!response.ok) {
          throw new Error('Failed to fetch sponsors');
        }
        const data = await response.json();
        setSponsors(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching sponsors:', err);
        setError('Failed to load sponsors');
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // Animation on mount
  useEffect(() => {
    if (!loading && !error && sponsors.length > 0) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.from(headerRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(gridRef.current?.children || [], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.4");
      });

      return () => ctx.revert();
    }
  }, [loading, error, sponsors.length]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading sponsors...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || sponsors.length === 0) {
    return null; // Don't show section if there's an error or no sponsors
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Our Sponsors
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            Trusted Partners
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're proud to work with these amazing organizations who share our vision for making a meaningful difference in the world.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 items-center"
        >
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-square">
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  fill
                  className="h-36 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  unoptimized={sponsor.imageUrl.startsWith('/uploads/')}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.svg';
                  }}
                />
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {sponsor.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Infinite scroll animation for many sponsors */}
        {sponsors.length > 6 && (
          <div className="mt-12 overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div
                  key={`scroll-${index}`}
                  className="flex-shrink-0 w-32 h-20 bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      unoptimized={sponsor.imageUrl.startsWith('/uploads/')}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.svg';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
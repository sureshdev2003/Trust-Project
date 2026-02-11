"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Handshake } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Sponsor {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
  createdAt: string;
}

const SponsorSection = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRow1Ref = useRef<HTMLDivElement>(null);
  const logoRow2Ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!loading && !error && sponsors.length > 0) {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Logo rows animation
        gsap.from([logoRow1Ref.current, logoRow2Ref.current], {
          scrollTrigger: {
            trigger: logoRow1Ref.current,
            start: "top 90%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.95,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, error, sponsors.length]);

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-linear-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
            <Handshake className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Our Partners
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
            Guided by Trust
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
              United in Purpose
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Working hand in hand with communities, volunteers, and leaders to
            make a meaningful difference in the world.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading sponsors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Sponsors Display */}
        {!loading && !error && sponsors.length > 0 && (
          <div className="space-y-8">
            {/* First Row - Moving Right */}
            <div ref={logoRow1Ref} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
              <div className="flex animate-scroll-right space-x-8 py-4">
                {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                  <a
                    key={`right-${index}`}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                  >
                    <div className="w-24 h-28 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-110">
                      <div className="relative w-full h-full">
                        <Image
                          src={sponsor.imageUrl}
                          alt={sponsor.name}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized={sponsor.imageUrl.startsWith('/uploads/')}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.svg';
                          }}
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Second Row - Moving Left */}
            <div ref={logoRow2Ref} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
              <div className="flex animate-scroll-left space-x-8 py-4">
                {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                  <a
                    key={`left-${index}`}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                  >
                    <div className="w-24 h-28 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-110">
                      <div className="relative w-full h-full">
                        <Image
                          src={sponsor.imageUrl}
                          alt={sponsor.name}
                          fill
                          className=" object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized={sponsor.imageUrl.startsWith('/uploads/')}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.svg';
                          }}
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Sponsors State */}
        {!loading && !error && sponsors.length === 0 && (
          <div className="text-center py-12">
            <Handshake className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No sponsors available at the moment.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default SponsorSection;

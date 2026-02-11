"use client";

import { X, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

interface AdBannerProps {
  variant?: "horizontal" | "card";
  className?: string;
}

export default function AdBanner({ variant = "horizontal", className = "" }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  if (variant === "card") {
    return (
      <div className={`relative max-w-4xl mx-auto ${className}`}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-sm hover:shadow-md"
          aria-label="Close ad"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center space-y-6 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full w-fit">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Featured Partner
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Make an Impact Today
              </h3>
              
              <p className="text-lg text-white/90 leading-relaxed">
                Join thousands of supporters helping us create lasting change in communities worldwide. Your contribution directly funds our programs.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#donate"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Heart className="w-5 h-5" />
                  <span>Donate Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#learn-more"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            {/* Right side - Visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-4 border-white/30 shadow-2xl">
                  <div className="text-center space-y-3">
                    <div className="text-6xl md:text-7xl">🤝</div>
                    <div className="text-white">
                      <p className="text-3xl md:text-4xl font-bold">4M+</p>
                      <p className="text-sm md:text-base font-medium opacity-90">Lives Impacted</p>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center text-2xl shadow-lg animate-bounce">
                  ✨
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl shadow-lg">
                  ❤️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-sm"
        aria-label="Close ad"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-xl shadow-lg hover:shadow-xl transition-all">
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto p-6 md:p-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-lg">
              <span className="text-3xl md:text-4xl">💝</span>
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" />
                <p className="text-xs font-bold uppercase tracking-wider opacity-90">
                  Sponsored
                </p>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                Your Support Changes Lives
              </h3>
              <p className="text-sm md:text-base text-white/90">
                Help us reach our goal of supporting 100,000 families this year
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="text-center sm:text-right text-white">
              <p className="text-2xl md:text-3xl font-bold">₹500</p>
              <p className="text-xs md:text-sm opacity-90">feeds a family</p>
            </div>
            <a
              href="#donate"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Contribute Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

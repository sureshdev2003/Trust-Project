"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import CustomButton from "./custom-button";


interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imageRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsItems(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /* --------------------------------------------
      INITIAL MOUNT ANIMATION (SAFE WITH CONTEXT)
    -------------------------------------------- */
  useEffect(() => {
    // Only run animation if we have news data and elements are rendered
    if (!loading && !error && newsItems.length > 0) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.from(headerRef.current, {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
          .from(
            imageRef.current,
            {
              x: -100,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .from(
            [
              categoryRef.current,
              titleRef.current,
              descriptionRef.current,
            ],
            {
              x: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.7"
          );
      });

      return () => ctx.revert();
    }
  }, [loading, error, newsItems.length]); // Run when data loading state changes

  /* --------------------------------------------
      SAFE TRANSITION ANIMATION USING CONTEXT
    -------------------------------------------- */
  const animateTransition = (newIndex: number) => {
    if (isAnimating || newsItems.length === 0) return;
    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Check if elements exist before animating
      if (imageRef.current && categoryRef.current && titleRef.current && descriptionRef.current) {
        // Animate OUT
        tl.to(imageRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
          .to(
            [
              categoryRef.current,
              titleRef.current,
              descriptionRef.current,
            ],
            {
              x: -30,
              opacity: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.in",
            },
            "-=0.2"
          );

        // Swap content AFTER out animation
        tl.add(() => setCurrentIndex(newIndex));

        // Animate IN
        tl.fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          }
        ).fromTo(
          [
            categoryRef.current,
            titleRef.current,
            descriptionRef.current,
          ],
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      } else {
        // If elements don't exist, just change index without animation
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      }
    });

    return () => ctx.revert();
  };

  const handleNext = () => {
    animateTransition((currentIndex + 1) % newsItems.length);
  };

  const handlePrevious = () => {
    animateTransition((currentIndex - 1 + newsItems.length) % newsItems.length);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) animateTransition(index);
  };

  /* Auto-slide every 6 seconds */
  useEffect(() => {
    // Only start auto-slide if we have news items
    if (newsItems.length > 0) {
      const interval = setInterval(() => {
        if (!isAnimating) handleNext();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isAnimating, newsItems.length]);

  const currentNews = newsItems[currentIndex];

  return (
    <section
      id="latest-news"
      className="relative py-16 overflow-hidden bg-linear-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Latest News
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
            Fresh Updates,
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
              Straight from Us
            </span>
          </h2>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading latest news...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* MAIN CARD */}
        {!loading && !error && newsItems.length > 0 && (
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">

              {/* IMAGE */}
              <div ref={imageRef} className="
    relative overflow-hidden bg-gray-100
    h-[260px] sm:h-[320px] md:h-[400px] lg:h-auto
  ">
                <Image
                  src={currentNews.imageUrl || '/placeholder-image.svg'}
                  alt={currentNews.title}
                  fill
                  className="object-cover"
                  unoptimized={currentNews.imageUrl.startsWith('/uploads/')}
                  onError={(e) => {
                    console.error('Image failed to load:', currentNews.imageUrl);
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.svg';
                  }}
                />
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-orange-600 font-bold text-sm rounded-full shadow-lg">
                    News
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
                <div className="space-y-6">
                  <div
                    ref={categoryRef}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-gray-600 font-medium">
                      {new Date(currentNews.createdAt).toLocaleDateString()}
                    </span>

                    <span className="font-semibold text-orange-600">
                      {currentIndex + 1}/{newsItems.length}
                    </span>
                  </div>

                  <h3
                    ref={titleRef}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
                  >
                    {currentNews.title}
                  </h3>

                  <p
                    ref={descriptionRef}
                    className="text-base text-gray-600 leading-relaxed"
                  >
                    {currentNews.content}
                  </p>

                  <CustomButton>Read More →</CustomButton>
                </div>

                {/* NAVIGATION */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <div className="flex gap-2">
                    {newsItems.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={`h-2 rounded-full transition-all ${i === currentIndex
                          ? "bg-orange-600 w-8"
                          : "bg-gray-300 w-2"
                          }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={handlePrevious} className="p-2 rounded-full bg-gray-100 hover:bg-orange-600 hover:text-white transition">
                      <ChevronLeft />
                    </button>
                    <button onClick={handleNext} className="p-2 rounded-full bg-gray-100 hover:bg-orange-600 hover:text-white transition">
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all"
                style={{
                  width: `${((currentIndex + 1) / newsItems.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* NO NEWS STATE */}
        {!loading && !error && newsItems.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No news articles available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useCallback, useRef, useEffect, memo, useState } from "react";
import type { Slide } from "../../types";

interface HeroSliderProps {
  slides: Slide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideOverlay = memo(
  ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pb-12 pt-24 px-6 md:px-8 hidden md:block">
      <h2 className="text-xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-200 line-clamp-2 max-w-2xl">
        {subtitle}
      </p>
    </div>
  )
);

export const HeroSlider: React.FC<HeroSliderProps> = memo(
  ({ slides, currentSlide, onSlideChange }) => {
    const [slideDirection, setSlideDirection] = useState<"next" | "prev">(
      "next"
    );
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const slideInterval = 5000; // 5 seconds

    const goToSlide = useCallback(
      (index: number, direction: "next" | "prev" = "next") => {
        setSlideDirection(direction);
        onSlideChange(index);
      },
      [onSlideChange]
    );

    useEffect(() => {
      // Set up automatic slide transition
      intervalRef.current = setInterval(() => {
        onSlideChange((currentSlide + 1) % slides.length);
      }, slideInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [currentSlide, slides.length, onSlideChange]);

    useEffect(() => {
      // Preload the next image
      const nextIndex = (currentSlide + 1) % slides.length;
      const img = new Image();
      img.src = slides[nextIndex].image;
    }, [currentSlide, slides]);

    return (
      <div className="relative w-full h-[15vh] md:h-[40vh] bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ${
              index === currentSlide
                ? "opacity-100 z-10 translate-x-0"
                : `opacity-0 z-0 ${
                    slideDirection === "next"
                      ? "translate-x-full"
                      : "-translate-x-full"
                  }`
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <SlideOverlay title={slide.title} subtitle={slide.subtitle} />
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                goToSlide(index, index > currentSlide ? "next" : "prev")
              }
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-3"
                  : "bg-white/40 w-1 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1} of ${slides.length}`}
            />
          ))}
        </div>
      </div>
    );
  }
);

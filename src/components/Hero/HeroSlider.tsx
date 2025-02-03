import React, { useCallback, useRef, useEffect, memo, useState } from "react";
import type { Slide } from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";

interface HeroSliderProps {
  slides: Slide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideOverlay = memo(
  ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="absolute inset-x-0 bottom-0 pb-12 pt-8 px-6 md:px-8 hidden md:block">
      <h2 className="text-xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-200 line-clamp-2 max-w-2xl">
        {subtitle}
      </p>
    </div>
  )
);

const LazySlideImage = memo(
  ({
    src,
    alt,
    priority,
    onLoad,
  }: {
    src: string;
    alt: string;
    priority: boolean;
    onLoad?: () => void;
  }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [shouldLoad, setShouldLoad] = useState(priority);

    useEffect(() => {
      if (priority) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true);
            observerRef.current?.disconnect();
          }
        },
        {
          rootMargin: "50px",
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }

      return () => {
        observerRef.current?.disconnect();
      };
    }, [priority]);

    return (
      <div
        ref={imgRef}
        className="absolute inset-0"
      >
        {shouldLoad && (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-opacity duration-500"
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            onLoad={onLoad}
          />
        )}
      </div>
    );
  }
);

export const HeroSlider: React.FC<HeroSliderProps> = memo(
  ({ slides, currentSlide, onSlideChange }) => {
    const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const slideInterval = 5000;
    const { width } = useWindowSize();

    // Calculate dynamic height based on screen width for mobile
    const mobileHeight = width < 768 ? `${Math.min(Math.max(width * 0.35, 120), 250)}px` : '40vh';

    const goToSlide = useCallback(
      (index: number, direction: "next" | "prev" = "next") => {
        setSlideDirection(direction);
        onSlideChange(index);
      },
      [onSlideChange]
    );

    useEffect(() => {
      intervalRef.current = setInterval(() => {
        onSlideChange((currentSlide + 1) % slides.length);
      }, slideInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [currentSlide, slides.length, onSlideChange]);

    return (
      <div
        className="relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-lg"
        style={{ 
          contain: "content",
          height: width < 768 ? mobileHeight : '40vh'
        }}
      >
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
            style={{ willChange: "transform, opacity" }}
          >
            <LazySlideImage
              src={slide.image}
              alt={slide.title}
              priority={index === 0 || index === 1}
              onLoad={() => {}}
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

HeroSlider.displayName = "HeroSlider";
SlideOverlay.displayName = "SlideOverlay";
LazySlideImage.displayName = "LazySlideImage";
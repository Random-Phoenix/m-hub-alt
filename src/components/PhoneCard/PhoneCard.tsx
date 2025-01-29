import React, { useState, useCallback, memo, useRef, useEffect } from "react";
import { Heart, Cpu, HardDrive } from "lucide-react";
import { Phone } from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";

interface PhoneCardProps {
  phone: Phone;
  onClick: () => void;
  onImageLoad: () => void;
  isImageLoaded: boolean;
  index: number;
  totalItems: number;
  columns: number;
}

// Utility function to extract brand and model
const extractBrandAndModel = (name: string) => {
  const [brand, ...modelParts] = name.split(" ");
  return { brand, model: modelParts.join(" ") };
};

// Reusable favorite button component
const FavoriteButton: React.FC<{
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}> = memo(({ isFavorite, onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-3 right-3 transition-opacity opacity-0 group-hover:opacity-100"
    aria-label="Add to favorites"
  >
    <Heart
      className={`h-5 w-5 transition-colors ${
        isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-gray-600"
      }`}
    />
  </button>
));

// Lazy loading image component with blur placeholder
const LazyImage = memo(
  ({
    src,
    alt,
    onLoad,
    isLoaded,
    priority,
  }: {
    src: string;
    alt: string;
    onLoad: () => void;
    isLoaded: boolean;
    priority: boolean;
  }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      // If priority, load immediately
      if (priority) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: "50px",
          threshold: 0.1,
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [priority]);

    // Preload high priority images
    useEffect(() => {
      if (priority && src) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = src;
        document.head.appendChild(preloadLink);

        return () => {
          document.head.removeChild(preloadLink);
        };
      }
    }, [src, priority]);

    return (
      <div
        ref={imgRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        {(isInView || priority) && (
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchpriority={priority ? "high" : "low"}
            onLoad={onLoad}
          />
        )}
      </div>
    );
  }
);

export const PhoneCard: React.FC<PhoneCardProps> = memo(
  ({ phone, onClick, onImageLoad, isImageLoaded, index, totalItems, columns }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const { brand, model } = extractBrandAndModel(phone.name);

    const handleClick = useCallback(() => {
      onClick();
    }, [onClick]);

    const handleFavorite = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFavorite((prev) => !prev);
    }, []);

    // Calculate loading priority based on position
    // First row and visible items get high priority
    const isHighPriority = index < columns;
    const isPriorityLoad = isHighPriority || index < (columns * 2);

    return (
      <div
        className="relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 group mt-1.5 mr-1.5 cursor-pointer transform transition-transform hover:translate-y-[-2px]"
        onClick={handleClick}
        style={{
          contain: "content",
          willChange: "transform",
        }}
      >
        {/* Image Container with aspect ratio */}
        <div className="relative pt-[120%] md:pt-[95%]">
          <LazyImage
            src={phone.image}
            alt={phone.name}
            onLoad={onImageLoad}
            isLoaded={isImageLoaded}
            priority={isPriorityLoad}
          />
          {!isMobile && (
            <FavoriteButton isFavorite={isFavorite} onClick={handleFavorite} />
          )}
        </div>

        {/* Content with optimized rendering */}
        <div className="p-1.5 md:p-3 md:pt-2.5">
          <div className="space-y-0.5 md:space-y-1">
            {/* Brand and Specs Row */}
            <div className="flex items-center justify-between">
              <div className="w-full md:w-auto">
                <span className="block md:inline-block text-center md:text-left w-full px-1 md:px-2 py-0.5 bg-gray-50 rounded-md text-[9px] md:text-[10px] font-bold text-gray-600 tracking-wide uppercase font-display">
                  {brand}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] font-medium text-gray-500">
                    8GB
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] font-medium text-gray-500">
                    256GB
                  </span>
                </div>
              </div>
            </div>

            {/* Model Name and Price */}
            <div className="block md:flex md:items-center md:justify-between">
              <h3 className="font-display text-center md:text-left font-semibold text-[11px] md:text-[13px] leading-none tracking-tight text-gray-900 mb-0.5 md:mb-0">
                {model}
              </h3>
              <p className="font-display text-center md:text-left font-bold text-[10px] md:text-xs text-blue-600 leading-none">
                {phone.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PhoneCard.displayName = "PhoneCard";
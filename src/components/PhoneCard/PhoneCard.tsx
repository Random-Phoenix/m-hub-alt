import React, { useState, useCallback, memo, useEffect } from "react";
import { Heart, Cpu, HardDrive } from "lucide-react";
import { Phone } from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";

interface PhoneCardProps {
  phone: Phone;
  onClick: () => void;
}

// Utility function to extract brand and model
const extractBrandAndModel = (name: string) => {
  const [brand, ...modelParts] = name.split(" ");
  return { brand, model: modelParts.join(" ") };
};

// Storage utility functions
const storageUtils = {
  setFavorites: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  getFavorites: (key: string) => {
    try {
      const itemStr = localStorage.getItem(key);
      return itemStr ? JSON.parse(itemStr) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },
};

// Reusable favorite button component
const FavoriteButton: React.FC<{
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}> = memo(({ isFavorite, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-3 right-3 transition-all ${
      isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
    }`}
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  >
    <Heart
      className={`h-5 w-5 transition-colors ${
        isFavorite
          ? "fill-red-500 text-red-500"
          : "text-gray-600 hover:text-gray-600"
      }`}
    />
  </button>
));
FavoriteButton.displayName = "FavoriteButton";

export const PhoneCard: React.FC<PhoneCardProps> = memo(
  ({ phone, onClick }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const { brand, model } = extractBrandAndModel(phone.name);

    // Load favorite state from localStorage on mount
    useEffect(() => {
      const favorites = storageUtils.getFavorites("favoritePhones") || [];
      setIsFavorite(favorites.includes(phone.id));
    }, [phone.id]);

    const handleClick = useCallback(() => {
      onClick();
    }, [onClick]);

    const handleFavorite = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite((prev) => {
          const newState = !prev;
          const favorites = storageUtils.getFavorites("favoritePhones") || [];

          if (newState) {
            // Add to favorites
            const newFavorites = [...favorites, phone.id];
            storageUtils.setFavorites("favoritePhones", newFavorites);
          } else {
            // Remove from favorites
            const newFavorites = favorites.filter(
              (id: number) => id !== phone.id
            );
            storageUtils.setFavorites("favoritePhones", newFavorites);
          }

          return newState;
        });
      },
      [phone.id]
    );

    // Handle image loading error and set a fallback image
    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "/path/to/placeholder-image.jpg"; // Default image in case of error
      },
      []
    );

    return (
      <div
        className="relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 group mt-1.5 mr-1.5 cursor-pointer"
        onClick={handleClick}
      >
        {/* Image Container */}
        <div className="relative pt-[120%] md:pt-[95%] bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <img
            src={phone.image} // Assuming phone.image is a reliable URL
            alt={phone.name}
            loading="lazy" // Lazy load the image
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-lg"
            onError={handleImageError} // Handle image errors
          />

          {/* Favorite Button - Only shown on desktop */}
          {!isMobile && (
            <FavoriteButton isFavorite={isFavorite} onClick={handleFavorite} />
          )}
        </div>

        {/* Content */}
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
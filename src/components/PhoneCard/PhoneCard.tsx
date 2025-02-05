import React, { useState, useCallback, memo, useEffect } from "react";
import { Heart } from "lucide-react";
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
export const storageUtils = {
  setFavorites: (favorites: number[]) => {
    try {
      localStorage.setItem("favoritePhones", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  getFavorites: (): number[] => {
    try {
      const itemStr = localStorage.getItem("favoritePhones");
      return itemStr ? JSON.parse(itemStr) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  toggleFavorite: (phoneId: number) => {
    const favorites = storageUtils.getFavorites();
    const newFavorites = favorites.includes(phoneId)
      ? favorites.filter(id => id !== phoneId)
      : [...favorites, phoneId];
    storageUtils.setFavorites(newFavorites);
    return newFavorites.includes(phoneId);
  }
};

// Favorite indicator component - renamed from FavoriteButton since it's no longer a button
const FavoriteIndicator = memo(({ isFavorite }: { isFavorite: boolean }) => (
  <div
    className="absolute top-3 right-3"
    aria-label="Favorite indicator"
  >
    <Heart
      className="w-6 h-6 fill-red-500 text-red-500"
    />
  </div>
));
FavoriteIndicator.displayName = "FavoriteIndicator";

export const PhoneCard: React.FC<PhoneCardProps> = memo(
  ({ phone, onClick }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const { brand, model } = extractBrandAndModel(phone.name);

    // Load favorite state from localStorage on mount and when it changes
    useEffect(() => {
      const checkFavoriteStatus = () => {
        const favorites = storageUtils.getFavorites();
        setIsFavorite(favorites.includes(phone.id));
      };

      // Check initial status
      checkFavoriteStatus();

      // Add storage event listener to update status when changed from detail page
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "favoritePhones") {
          checkFavoriteStatus();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, [phone.id]);

    const handleClick = useCallback(() => {
      onClick();
    }, [onClick]);

    // Handle image loading error and set a fallback image
    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "/path/to/placeholder-image.jpg"; // Default image in case of error
      },
      []
    );

    return (
      <div
        className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group mt-1.5 mr-1.5 cursor-pointer transition-transform duration-200 hover:-translate-y-1"
        onClick={handleClick}
      >
        {/* Image Container */}
        <div className="relative pt-[120%] md:pt-[95%] bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={phone.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-110 will-change-transform"
            onError={handleImageError}
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />

          {/* Favorite Indicator - Only shown if favorite */}
          {isFavorite && <FavoriteIndicator isFavorite={true} />}
        </div>

        {/* Content */}
        <div className="p-1.5 md:p-3 md:pt-2.5">
          <div className="space-y-0.5 md:space-y-1">
            {/* Brand */}
            <div className="text-center">
              <span className="inline-block px-2 py-0.5 bg-gray-50 rounded-md text-[10px] md:text-[11px] font-bold text-gray-600 tracking-wide uppercase font-display">
                {brand}
              </span>
            </div>

            {/* Model Name and Price */}
            <div className="text-center md:text-center">
              <h3 className="font-display font-semibold text-[12px] md:text-[14px] leading-none tracking-tight text-gray-900 mb-1">
                {model}
              </h3>
              <p className="font-display font-bold text-[11px] md:text-[13px] text-blue-600 leading-none">
                Rs. {phone.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PhoneCard.displayName = "PhoneCard";
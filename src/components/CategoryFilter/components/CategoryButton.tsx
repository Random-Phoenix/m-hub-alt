import React, { memo } from 'react';

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  isMobile?: boolean;
  isBreakpoint?: boolean;
}

export const CategoryButton = memo(({
  category,
  isSelected,
  onClick,
  isMobile = false,
  isBreakpoint = false,
}: CategoryButtonProps) => (
  <button
    onClick={onClick}
    className={`
      relative group flex items-center justify-start rounded-xl transition-colors
      ${isMobile ? "px-4 py-1.5" : isBreakpoint ? "px-4 py-1" : "px-5 py-1.5"}
      ${isSelected
        ? "bg-blue-600 text-white"
        : "hover:bg-white/80 text-gray-600 hover:text-gray-900 bg-white border border-gray-200"
      }
    `}
  >
    <div className="flex flex-col items-start">
      <span className={`font-display tracking-tight transition-colors whitespace-nowrap font-medium ${
        isMobile
          ? "text-[13px]"
          : isBreakpoint
          ? "text-[13px]"
          : "text-[14px]"
      } ${isSelected
        ? "text-white"
        : "text-gray-700 group-hover:text-gray-900"
      }`}>
        {category}
      </span>
      <span className={`transition-colors whitespace-nowrap ${
        isMobile
          ? "text-[10px]"
          : isBreakpoint
          ? "text-[9px]"
          : "text-[11px]"
      } ${isSelected
        ? "text-blue-100"
        : "text-gray-400 group-hover:text-gray-500"
      }`}>
        {category === "Latest Phones"
          ? "50 devices"
          : category === "Budget Phones"
          ? "Under 30k"
          : category === "Premium Phones"
          ? "Above 100k"
          : "High performance"}
      </span>
    </div>
  </button>
));

CategoryButton.displayName = 'CategoryButton';
import React, { memo } from 'react';
import { Filter } from 'lucide-react';

interface FilterButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasActiveFilters: boolean;
  className?: string;
  isMobile?: boolean;
  activeFiltersCount: number;
}

export const FilterButton = memo(({
  isOpen,
  onClick,
  hasActiveFilters,
  className = "",
  isMobile = false,
  activeFiltersCount
}: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 rounded-xl transition-all
      font-display text-sm bg-white hover:bg-gray-50
      ${isMobile ? "p-3" : "px-4 py-2.5"}
      ${hasActiveFilters
        ? "border-2 border-blue-500 text-blue-600"
        : "border border-gray-200 text-gray-700"
      }
      ${className}
    `}
  >
    <Filter className={`w-[18px] h-[18px] ${hasActiveFilters ? "text-blue-500" : "text-gray-500"}`} />
    {!isMobile && (
      <>
        <span className="font-medium">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </>
    )}
  </button>
));

FilterButton.displayName = 'FilterButton';
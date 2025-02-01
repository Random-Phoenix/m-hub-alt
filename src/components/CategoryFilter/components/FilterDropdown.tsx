import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Filter, ChevronRight, X, Check } from 'lucide-react';
import { PriceRangeSlider } from './PriceRangeSlider';
import { FilterOption } from '../types';

interface FilterDropdownProps {
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
  filterOptions: FilterOption[];
}

export const FilterDropdown = memo(({
  selectedFilters,
  setSelectedFilters,
  isFilterOpen,
  setIsFilterOpen,
  isMobile = false,
  buttonRef,
  filterOptions
}: FilterDropdownProps) => {
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const activeFiltersCount = Object.keys(selectedFilters).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen, setIsFilterOpen, buttonRef]);

  const handleOptionSelect = useCallback((optionId: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      const option = filterOptions.find(opt => opt.id === optionId);
      
      if (option?.multiSelect) {
        const currentValues = (prev[optionId] as string[]) || [];
        const valueIndex = currentValues.indexOf(value);
        
        if (valueIndex === -1) {
          newFilters[optionId] = [...currentValues, value];
        } else {
          newFilters[optionId] = currentValues.filter(v => v !== value);
          if ((newFilters[optionId] as string[]).length === 0) {
            delete newFilters[optionId];
          }
        }
      } else {
        if (prev[optionId] === value) {
          delete newFilters[optionId];
        } else {
          newFilters[optionId] = value;
        }
      }
      
      return newFilters;
    });
  }, [setSelectedFilters, filterOptions]);

  const handlePriceRangeChange = useCallback((value: [number, number]) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  }, [setSelectedFilters]);

  return (
    <>
      <div className="px-3 py-2.5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {activeFiltersCount > 0 
                ? `${activeFiltersCount} Filters` 
                : 'All Filters'}
            </h3>
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={() => setSelectedFilters({})}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto custom-scrollbar divide-y divide-gray-50">
        {filterOptions.map((option) => (
          <div key={option.id} className="relative">
            <button
              onClick={() => setOpenSubDropdown(
                openSubDropdown === option.id ? null : option.id
              )}
              className={`
                w-full px-3 py-2 hover:bg-gray-50 transition-colors
                ${openSubDropdown === option.id ? 'bg-blue-50/50' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-7 h-7 rounded-lg flex items-center justify-center
                  ${openSubDropdown === option.id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500'}
                `}>
                  <option.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="text-sm font-medium text-gray-700 block truncate">
                    {option.label}
                  </span>
                  {selectedFilters[option.id] && (
                    <p className="text-xs text-blue-600 mt-0.5 truncate">
                      {option.type === 'range' 
                        ? `Rs. ${(selectedFilters[option.id] as [number, number])[0].toLocaleString()} - Rs. ${(selectedFilters[option.id] as [number, number])[1].toLocaleString()}`
                        : Array.isArray(selectedFilters[option.id])
                          ? (selectedFilters[option.id] as string[])
                              .map(value => option.options?.find(opt => opt.value === value)?.label)
                              .join(', ')
                          : option.options?.find(opt => opt.value === selectedFilters[option.id])?.label
                      }
                    </p>
                  )}
                </div>
                <ChevronRight className={`
                  w-4 h-4 text-gray-400 transition-transform flex-shrink-0
                  ${openSubDropdown === option.id ? 'rotate-90' : ''}
                `} />
              </div>
            </button>

            {openSubDropdown === option.id && (
              <div className="bg-gray-50/80 border-t border-gray-100">
                {option.type === 'range' ? (
                  <PriceRangeSlider
                    value={
                      (selectedFilters[option.id] as [number, number]) || 
                      [option.range!.min, option.range!.max]
                    }
                    onChange={(value) => handlePriceRangeChange(value)}
                    min={option.range!.min}
                    max={option.range!.max}
                    step={option.range!.step}
                  />
                ) : (
                  option.options?.map((opt) => {
                    const isSelected = option.multiSelect
                      ? (selectedFilters[option.id] as string[] || []).includes(opt.value)
                      : selectedFilters[option.id] === opt.value;

                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          handleOptionSelect(option.id, opt.value);
                          if (!option.multiSelect) {
                            setOpenSubDropdown(null);
                          }
                        }}
                        className="w-full px-3 py-1.5 hover:bg-gray-100/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-4 h-4 rounded-full border-2 flex items-center justify-center
                            transition-colors flex-shrink-0
                            ${isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300 bg-white'
                            }
                          `}>
                            {isSelected && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`
                            text-sm transition-colors truncate
                            ${isSelected
                              ? 'text-blue-600 font-medium'
                              : 'text-gray-600'
                            }
                          `}>
                            {opt.label}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
});

FilterDropdown.displayName = 'FilterDropdown';
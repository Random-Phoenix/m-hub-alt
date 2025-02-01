import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import { Filter, ChevronRight, X, Smartphone, Battery, MemoryStick as Memory, HardDrive, Camera, Wifi, DollarSign, ArrowUpDown, Clock, TrendingUp, Check } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isAllDevicesPage?: boolean;
}

const basicFilterOptions = [
  {
    id: "price",
    label: "Price",
    icon: ArrowUpDown,
    options: [
      { value: "low-to-high", label: "Low to High" },
      { value: "high-to-low", label: "High to Low" },
    ],
  },
  {
    id: "date",
    label: "Release Date",
    icon: Clock,
    options: [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
    ],
  },
  {
    id: "popularity",
    label: "Popularity",
    icon: TrendingUp,
    options: [
      { value: "most-viewed", label: "Most Viewed" },
      { value: "trending", label: "Trending" },
    ],
  },
];

const advancedFilterOptions = [
  {
    id: "priceRange",
    label: "Price Range",
    icon: DollarSign,
    type: "range",
    range: {
      min: 0,
      max: 500000,
      step: 1000,
    }
  },
  {
    id: "ram",
    label: "RAM",
    icon: Memory,
    multiSelect: true,
    options: [
      { value: "4gb", label: "4GB" },
      { value: "6gb", label: "6GB" },
      { value: "8gb", label: "8GB" },
      { value: "12gb", label: "12GB" },
      { value: "16gb", label: "16GB+" },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    icon: HardDrive,
    multiSelect: true,
    options: [
      { value: "64gb", label: "64GB" },
      { value: "128gb", label: "128GB" },
      { value: "256gb", label: "256GB" },
      { value: "512gb", label: "512GB" },
      { value: "1tb", label: "1TB+" },
    ],
  },
  {
    id: "camera",
    label: "Camera",
    icon: Camera,
    multiSelect: true,
    options: [
      { value: "under-48mp", label: "Under 48MP" },
      { value: "48mp", label: "48MP" },
      { value: "50mp", label: "50MP" },
      { value: "64mp", label: "64MP" },
      { value: "108mp-plus", label: "108MP+" },
    ],
  },
  {
    id: "battery",
    label: "Battery",
    icon: Battery,
    multiSelect: true,
    options: [
      { value: "3000-4000", label: "3000-4000 mAh" },
      { value: "4000-5000", label: "4000-5000 mAh" },
      { value: "5000-6000", label: "5000-6000 mAh" },
      { value: "above-6000", label: "Above 6000 mAh" },
    ],
  },
  {
    id: "network",
    label: "Network",
    icon: Wifi,
    multiSelect: true,
    options: [
      { value: "4g", label: "4G" },
      { value: "5g", label: "5G" },
    ],
  },
];

const PriceRangeSlider = memo(({
  value,
  onChange,
  min,
  max,
  step
}: {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const formatPrice = useCallback((price: number) => (
    `Rs. ${price.toLocaleString()}`
  ), []);

  const handleChange = useCallback((index: number, newValue: number) => {
    const updatedValue: [number, number] = [...localValue] as [number, number];
    updatedValue[index] = Math.min(Math.max(newValue, min), max);
    
    if (index === 0) {
      updatedValue[0] = Math.min(updatedValue[0], updatedValue[1] - step);
    } else {
      updatedValue[1] = Math.max(updatedValue[1], updatedValue[0] + step);
    }
    
    setLocalValue(updatedValue);
    if (!isDragging) {
      onChange(updatedValue);
    }
  }, [isDragging, localValue, max, min, onChange, step]);

  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);

  return (
    <div className="px-3 py-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium text-gray-900">{formatPrice(localValue[0])}</div>
          <div className="text-xs font-medium text-gray-900">{formatPrice(localValue[1])}</div>
        </div>
        <div className="relative h-2">
          <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
          <div
            className="absolute h-1 bg-blue-500 rounded-full"
            style={{
              left: `${((localValue[0] - min) / (max - min)) * 100}%`,
              right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`
            }}
          />
          {[0, 1].map((index) => (
            <input
              key={index}
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue[index]}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              onMouseDown={() => {
                setIsDragging(true);
                setActiveThumb(index);
              }}
              onMouseUp={() => {
                setIsDragging(false);
                setActiveThumb(null);
                onChange(localValue);
              }}
              onTouchStart={() => {
                setIsDragging(true);
                setActiveThumb(index);
              }}
              onTouchEnd={() => {
                setIsDragging(false);
                setActiveThumb(null);
                onChange(localValue);
              }}
              className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-blue-900/10 hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95 transition-transform"
              style={{
                zIndex: activeThumb === index ? 30 : 20
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

const FilterButton = memo(({
  isOpen,
  onClick,
  hasActiveFilters,
  className = "",
  isMobile = false,
  activeFiltersCount
}: {
  isOpen: boolean;
  onClick: () => void;
  hasActiveFilters: boolean;
  className?: string;
  isMobile?: boolean;
  activeFiltersCount: number;
}) => (
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

const CategoryButton = memo(({
  category,
  isSelected,
  onClick,
  isMobile = false,
  isBreakpoint = false,
}: {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  isMobile?: boolean;
  isBreakpoint?: boolean;
}) => (
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

const FilterComponent = memo(({
  selectedFilters,
  setSelectedFilters,
  isFilterOpen,
  setIsFilterOpen,
  isMobile = false,
  isAllDevicesPage = false,
  buttonRef
}: {
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
  isAllDevicesPage?: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => {
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
      const option = advancedFilterOptions.find(opt => opt.id === optionId);
      
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
  }, [setSelectedFilters]);

  const handlePriceRangeChange = useCallback((value: [number, number]) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  }, [setSelectedFilters]);

  const filterOptions = isAllDevicesPage ? advancedFilterOptions : basicFilterOptions;

  const buttonPosition = buttonRef.current?.getBoundingClientRect();
  const dropdownStyle = useMemo(() => {
    if (!buttonPosition) return {};
    
    const top = buttonPosition.bottom + window.scrollY + 8;
    
    return isMobile ? {
      position: 'absolute' as const,
      top: `${top}px`,
      left: '1rem',
      right: '1rem',
      maxHeight: '80vh',
      zIndex: 50
    } : {
      position: 'absolute' as const,
      top: `${top}px`,
      right: '0',
      width: '240px',
      zIndex: 50
    };
  }, [buttonPosition, isMobile]);

  if (!isFilterOpen) return null;

  return (
    <div 
      ref={filterRef}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-lg animate-fadeIn"
      style={dropdownStyle}
    >
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

      <div className="overflow-y-auto custom-scrollbar divide-y divide-gray-50" style={{ maxHeight: isMobile ? '60vh' : '400px' }}>
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
    </div>
  );
});

const MobileCategoryFilter = memo(({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedFilters,
  setSelectedFilters,
  isFilterOpen,
  setIsFilterOpen,
  isAllDevicesPage = false,
  buttonRef
}: CategoryFilterProps & {
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => (
  <div className="flex items-center gap-4 mb-3 md:hidden">
    <div className="flex-1 overflow-x-auto hide-scrollbar">
      <div className="flex gap-2 pb-1 px-0.5">
        {categories.map((category) => (
          <div key={category} className="flex-shrink-0">
            <CategoryButton
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              isMobile={true}
            />
          </div>
        ))}
      </div>
    </div>
    <div ref={buttonRef} className="relative">
      <FilterButton
        isOpen={isFilterOpen}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        hasActiveFilters={Object.keys(selectedFilters).length > 0}
        isMobile={true}
        activeFiltersCount={Object.keys(selectedFilters).length}
      />
    </div>
  </div>
));

const DesktopCategoryFilter = memo(({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedFilters,
  setSelectedFilters,
  isFilterOpen,
  setIsFilterOpen,
  isAllDevicesPage = false,
  buttonRef
}: CategoryFilterProps & {
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBreakpoint(window.matchMedia("(min-width: 772px) and (max-width: 902px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hidden md:flex items-start gap-3">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
          isBreakpoint={isBreakpoint}
        />
      ))}
      <div ref={buttonRef} className="relative ml-auto">
        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          hasActiveFilters={Object.keys(selectedFilters).length > 0}
          activeFiltersCount={Object.keys(selectedFilters).length}
        />
      </div>
    </div>
  );
});

export const CategoryFilter: React.FC<CategoryFilterProps> = memo(({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  isAllDevicesPage = false 
}) => {
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);
  const [selectedFiltersMobile, setSelectedFiltersMobile] = useState<Record<string, string | string[]>>({});

  const [isFilterOpenDesktop, setIsFilterOpenDesktop] = useState(false);
  const [selectedFiltersDesktop, setSelectedFiltersDesktop] = useState<Record<string, string | string[]>>({});

  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative mb-6">
      <MobileCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFilters={selectedFiltersMobile}
        setSelectedFilters={setSelectedFiltersMobile}
        isFilterOpen={isFilterOpenMobile}
        setIsFilterOpen={setIsFilterOpenMobile}
        isAllDevicesPage={isAllDevicesPage}
        buttonRef={mobileButtonRef}
      />

      <DesktopCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFilters={selectedFiltersDesktop}
        setSelectedFilters={setSelectedFiltersDesktop}
        isFilterOpen={isFilterOpenDesktop}
        setIsFilterOpen={setIsFilterOpenDesktop}
        isAllDevicesPage={isAllDevicesPage}
        buttonRef={desktopButtonRef}
      />

      {isFilterOpenMobile && (
        <FilterComponent
          selectedFilters={selectedFiltersMobile}
          setSelectedFilters={setSelectedFiltersMobile}
          isFilterOpen={isFilterOpenMobile}
          setIsFilterOpen={setIsFilterOpenMobile}
          isMobile={true}
          isAllDevicesPage={isAllDevicesPage}
          buttonRef={mobileButtonRef}
        />
      )}

      {isFilterOpenDesktop && (
        <FilterComponent
          selectedFilters={selectedFiltersDesktop}
          setSelectedFilters={setSelectedFiltersDesktop}
          isFilterOpen={isFilterOpenDesktop}
          setIsFilterOpen={setIsFilterOpenDesktop}
          isAllDevicesPage={isAllDevicesPage}
          buttonRef={desktopButtonRef}
        />
      )}
    </div>
  );
});
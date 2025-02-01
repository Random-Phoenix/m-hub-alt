import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  useMemo,
} from "react";
import { 
  Filter, 
  ChevronRight, 
  X,
  Smartphone, 
  Battery, 
  MemoryStick as Memory, 
  HardDrive, 
  Camera, 
  Wifi, 
  DollarSign,
  ArrowUpDown,
  Clock,
  TrendingUp,
  Check
} from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isAllDevicesPage?: boolean;
}

// Basic filter options for home page
const basicFilterOptions: FilterOption[] = [
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

// Advanced filter options for all devices page
const advancedFilterOptions: FilterOption[] = [
  {
    id: "priceRange",
    label: "Price Range",
    icon: DollarSign,
    options: [
      { value: "under-20k", label: "Under Rs. 20,000" },
      { value: "20k-40k", label: "Rs. 20,000 - 40,000" },
      { value: "40k-60k", label: "Rs. 40,000 - 60,000" },
      { value: "60k-100k", label: "Rs. 60,000 - 100,000" },
      { value: "above-100k", label: "Above Rs. 100,000" },
    ],
  },
  {
    id: "ram",
    label: "RAM",
    icon: Memory,
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
    options: [
      { value: "4g", label: "4G" },
      { value: "5g", label: "5G" },
    ],
  },
];

interface FilterOption {
  id: string;
  label: string;
  icon: React.ElementType;
  options: { value: string; label: string }[];
}

interface FilterButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasActiveFilters: boolean;
  className?: string;
  isMobile?: boolean;
}

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  isMobile?: boolean;
  isBreakpoint?: boolean;
}

interface FilterComponentProps {
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
  isAllDevicesPage?: boolean;
}

const FilterButton = memo(
  ({
    isOpen,
    onClick,
    hasActiveFilters,
    className = "",
    isMobile = false,
  }: FilterButtonProps) => (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 rounded-xl transition-all
        font-display text-sm bg-white hover:bg-gray-50
        ${isMobile ? "p-3" : "px-4 py-2.5"}
        ${className}
        ${
          hasActiveFilters
            ? "border-2 border-blue-500 text-blue-600"
            : "border border-gray-200 text-gray-700"
        }
      `}
    >
      <Filter className={`w-[18px] h-[18px] ${hasActiveFilters ? "text-blue-500" : "text-gray-500"}`} />
      {!isMobile && (
        <>
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
              {Object.keys(hasActiveFilters).length}
            </span>
          )}
        </>
      )}
    </button>
  )
);

const CategoryButton = memo(
  ({
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
      ${
        isSelected
          ? "bg-blue-600 text-white"
          : "hover:bg-white/80 text-gray-600 hover:text-gray-900 bg-white border border-gray-200"
      }
    `}
    >
      <div className="flex flex-col items-start">
        <span
          className={`font-display tracking-tight transition-colors whitespace-nowrap font-medium ${
            isMobile
              ? "text-[13px]"
              : isBreakpoint
              ? "text-[13px]"
              : "text-[14px]"
          } ${
            isSelected
              ? "text-white"
              : "text-gray-700 group-hover:text-gray-900"
          }`}
        >
          {category}
        </span>
        <span
          className={`transition-colors whitespace-nowrap ${
            isMobile
              ? "text-[10px]"
              : isBreakpoint
              ? "text-[9px]"
              : "text-[11px]"
          } ${
            isSelected
              ? "text-blue-100"
              : "text-gray-400 group-hover:text-gray-500"
          }`}
        >
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
  )
);

const FilterComponent = memo(
  ({
    selectedFilters,
    setSelectedFilters,
    isFilterOpen,
    setIsFilterOpen,
    isMobile = false,
    isAllDevicesPage = false,
  }: FilterComponentProps) => {
    const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const activeFiltersCount = Object.keys(selectedFilters).length;

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
          setIsFilterOpen(false);
        }
      };

      if (isFilterOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isFilterOpen, setIsFilterOpen]);

    const handleOptionSelect = useCallback(
      (optionId: string, value: string) => {
        setSelectedFilters((prev) => {
          const newFilters = { ...prev };
          if (prev[optionId] === value) {
            delete newFilters[optionId];
          } else {
            newFilters[optionId] = value;
          }
          return newFilters;
        });
      },
      [setSelectedFilters]
    );

    const filterOptions = isAllDevicesPage ? advancedFilterOptions : basicFilterOptions;

    return (
      <div className="relative" ref={filterRef}>
        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          hasActiveFilters={selectedFilters}
          isMobile={isMobile}
        />
        
        {isFilterOpen && (
          <div
            className={`
              absolute bg-white rounded-xl border border-gray-100 
              overflow-hidden z-[100] animate-fadeIn shadow-lg
              w-56 sm:w-60
              ${isMobile 
                ? "fixed left-0 right-0 mx-4 top-16" 
                : "right-0 mt-2"
              }
            `}
            style={{ maxHeight: "calc(100vh - 180px)" }}
          >
            {/* Header */}
            <div className="px-3 py-2.5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {activeFiltersCount > 0 
                      ? `${activeFiltersCount} Filter${activeFiltersCount > 1 ? 's' : ''} Applied` 
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

            {/* Filter Options */}
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
                            {option.options.find(
                              opt => opt.value === selectedFilters[option.id]
                            )?.label}
                          </p>
                        )}
                      </div>
                      <ChevronRight className={`
                        w-4 h-4 text-gray-400 transition-transform flex-shrink-0
                        ${openSubDropdown === option.id ? 'rotate-90' : ''}
                      `} />
                    </div>
                  </button>

                  {/* Options Dropdown */}
                  {openSubDropdown === option.id && (
                    <div className="bg-gray-50/80 border-t border-gray-100">
                      {option.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            handleOptionSelect(option.id, opt.value);
                            setOpenSubDropdown(null);
                          }}
                          className="w-full px-3 py-1.5 hover:bg-gray-100/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-4 h-4 rounded-full border-2 flex items-center justify-center
                              transition-colors flex-shrink-0
                              ${selectedFilters[option.id] === opt.value
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300 bg-white'
                              }
                            `}>
                              {selectedFilters[option.id] === opt.value && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className={`
                              text-sm transition-colors truncate
                              ${selectedFilters[option.id] === opt.value
                                ? 'text-blue-600 font-medium'
                                : 'text-gray-600'
                              }
                            `}>
                              {opt.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export const CategoryFilter: React.FC<CategoryFilterProps> = memo(
  ({ categories, selectedCategory, setSelectedCategory, isAllDevicesPage = false }) => {
    const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);
    const [selectedFiltersMobile, setSelectedFiltersMobile] = useState<
      Record<string, string>
    >({});

    const [isFilterOpenDesktop, setIsFilterOpenDesktop] = useState(false);
    const [selectedFiltersDesktop, setSelectedFiltersDesktop] = useState<
      Record<string, string>
    >({});

    const [isBreakpoint, setIsBreakpoint] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsBreakpoint(
          window.matchMedia("(min-width: 772px) and (max-width: 902px)").matches
        );
      };

      const debouncedResize = debounce(handleResize, 100);
      handleResize();
      window.addEventListener("resize", debouncedResize);
      return () => window.removeEventListener("resize", debouncedResize);
    }, []);

    const memoizedCategories = useMemo(() => categories, [categories]);

    return (
      <div className="relative mb-6">
        {/* Mobile Category Filter */}
        <div className="md:hidden">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 pb-1 px-0.5">
                {memoizedCategories.map((category) => (
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
            <FilterComponent
              selectedFilters={selectedFiltersMobile}
              setSelectedFilters={setSelectedFiltersMobile}
              isFilterOpen={isFilterOpenMobile}
              setIsFilterOpen={setIsFilterOpenMobile}
              isMobile={true}
              isAllDevicesPage={isAllDevicesPage}
            />
          </div>
        </div>

        {/* Desktop Category Filter */}
        <div className="hidden md:flex items-start gap-3">
          {memoizedCategories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              isBreakpoint={isBreakpoint}
            />
          ))}

          <div className="relative ml-auto">
            <FilterComponent
              selectedFilters={selectedFiltersDesktop}
              setSelectedFilters={setSelectedFiltersDesktop}
              isFilterOpen={isFilterOpenDesktop}
              setIsFilterOpen={setIsFilterOpenDesktop}
              isAllDevicesPage={isAllDevicesPage}
            />
          </div>
        </div>
      </div>
    );
  }
);

const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
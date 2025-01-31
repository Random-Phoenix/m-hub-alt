import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  useMemo,
} from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Clock,
  TrendingUp,
  Check,
  ArrowUpDown,
} from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

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
}

const filterOptions: FilterOption[] = [
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
      flex items-center gap-2 rounded-lg transition-colors border border-gray-200
      font-display text-sm bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50
      ${isMobile ? "p-3" : "px-4 py-2.5"}
      ${className}
    `}
    >
      <SlidersHorizontal className="w-[22px] h-[22px]" />
      {!isMobile && <span>Filter</span>}
      {!isMobile && (
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
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
      relative group flex items-center justify-start rounded-lg transition-colors shadow-sm
      ${isMobile ? "px-4 py-1.5" : isBreakpoint ? "px-4 py-1" : "px-5 py-1.5"}
      ${
        isSelected
          ? "bg-blue-600 text-white shadow-blue-500/5"
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

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

const FilterComponent = memo(
  ({
    selectedFilters,
    setSelectedFilters,
    isFilterOpen,
    setIsFilterOpen,
    isMobile = false,
  }: FilterComponentProps) => {
    const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useClickOutside(filterRef, () => {
      setIsFilterOpen(false);
      setOpenSubDropdown(null);
    });

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

    return (
      <div className="relative" ref={filterRef}>
        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          hasActiveFilters={Object.keys(selectedFilters).length > 0}
          isMobile={isMobile}
        />
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg border border-gray-100 overflow-hidden z-50 animate-fadeIn shadow-sm">
            {filterOptions.map((option) => (
              <div
                key={option.id}
                className="relative border-b border-gray-50 last:border-b-0"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSubDropdown(
                      openSubDropdown === option.id ? null : option.id
                    );
                  }}
                  className="w-full px-4 py-2.5 hover:bg-gray-50/75 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <option.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-500" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-700">
                      {selectedFilters[option.id]
                        ? option.options.find(
                            (opt) => opt.value === selectedFilters[option.id]
                          )?.label
                        : option.label}
                    </span>
                    <ChevronDown
                      className={`ml-auto w-4 h-4 text-gray-400 transition-transform ${
                        openSubDropdown === option.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {openSubDropdown === option.id && (
                  <div className="w-full bg-gray-50/50 border-t border-gray-100">
                    {option.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect(option.id, opt.value);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors group"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedFilters[option.id] === opt.value
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300 group-hover:border-gray-400"
                          }`}
                        >
                          {selectedFilters[option.id] === opt.value && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            selectedFilters[option.id] === opt.value
                              ? "text-blue-600"
                              : "text-gray-600 group-hover:text-gray-700"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export const CategoryFilter: React.FC<CategoryFilterProps> = memo(
  ({ categories, selectedCategory, setSelectedCategory }) => {
    const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);
    const [selectedFiltersMobile, setSelectedFiltersMobile] = useState<
      Record<string, string>
    >({});

    const [isFilterOpenDesktop, setIsFilterOpenDesktop] = useState(false);
    const [selectedFiltersDesktop, setSelectedFiltersDesktop] = useState<
      Record<string, string>
    >({});

    const [isBreakpoint, setIsBreakpoint] = useState(false);

    // Debounced resize handler
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

    // Memoized categories to prevent re-renders
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
            />
          </div>
        </div>
      </div>
    );
  }
);

// Debounce utility function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
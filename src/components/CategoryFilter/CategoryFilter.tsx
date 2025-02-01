import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { CategoryButton } from "./components/CategoryButton";
import { FilterButton } from "./components/FilterButton";
import { FilterDropdown } from "./components/FilterDropdown";
import { basicFilterOptions, advancedFilterOptions } from "./constants";
import type { CategoryFilterProps } from "./types";

const MobileCategoryFilter = memo(({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedFilters,
  setSelectedFilters,
  isFilterOpen,
  setIsFilterOpen,
  isAllDevicesPage = false,
  buttonRef,
  dropdownRef
}: CategoryFilterProps & {
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) => (
  <div className="md:hidden">
    <div className="flex items-center gap-4 mb-3">
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
      <div className="relative">
        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          hasActiveFilters={Object.keys(selectedFilters).length > 0}
          isMobile={true}
          activeFiltersCount={Object.keys(selectedFilters).length}
          ref={buttonRef}
        />
        {isFilterOpen && (
          <div 
            ref={dropdownRef}
            className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn shadow-sm" 
            style={{ maxHeight: isAllDevicesPage ? '70vh' : '60vh' }}
          >
            <FilterDropdown
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              isMobile={true}
              buttonRef={buttonRef}
              filterOptions={isAllDevicesPage ? advancedFilterOptions : basicFilterOptions}
            />
          </div>
        )}
      </div>
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
  buttonRef,
  dropdownRef
}: CategoryFilterProps & {
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
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
      <div className="relative ml-auto">
        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          hasActiveFilters={Object.keys(selectedFilters).length > 0}
          activeFiltersCount={Object.keys(selectedFilters).length}
          ref={buttonRef}
        />
        {isFilterOpen && (
          <div 
            ref={dropdownRef}
            className="absolute right-0 mt-1 w-60 bg-white rounded-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn shadow-sm"
          >
            <FilterDropdown
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              buttonRef={buttonRef}
              filterOptions={isAllDevicesPage ? advancedFilterOptions : basicFilterOptions}
            />
          </div>
        )}
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
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle mobile dropdown
      if (isFilterOpenMobile) {
        if (
          !mobileDropdownRef.current?.contains(event.target as Node) &&
          !mobileButtonRef.current?.contains(event.target as Node)
        ) {
          setIsFilterOpenMobile(false);
        }
      }

      // Handle desktop dropdown
      if (isFilterOpenDesktop) {
        if (
          !desktopDropdownRef.current?.contains(event.target as Node) &&
          !desktopButtonRef.current?.contains(event.target as Node)
        ) {
          setIsFilterOpenDesktop(false);
        }
      }
    };

    if (isFilterOpenMobile || isFilterOpenDesktop) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpenMobile, isFilterOpenDesktop]);

  return (
    <div className="relative mb-6">
      <div className="max-w-7xl mx-auto">
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
          dropdownRef={mobileDropdownRef}
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
          dropdownRef={desktopDropdownRef}
        />
      </div>
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';
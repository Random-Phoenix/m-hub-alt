import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, Flame, History, Trash2, X } from "lucide-react";

interface MobileSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const trendingSearches = [
  { id: 1, text: "iPhone 15 Pro" },
  { id: 2, text: "Galaxy S24 Ultra" },
  { id: 3, text: "Pixel 8 Pro" },
  { id: 4, text: "OnePlus 12" },
];

const MAX_RECENT_SEARCHES = 8;
const LONG_PRESS_DURATION = 500; // 500ms for long press

export const MobileSearch: React.FC<MobileSearchProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [longPressedIndex, setLongPressedIndex] = useState<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle search query updates immediately
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value); // Directly update the search query state
    },
    [setSearchQuery]
  );

  // Handle search actions
  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      setSearchQuery(query);
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item !== query);
        return [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      });
      setIsFocused(false);
    },
    [setSearchQuery]
  );

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  }, []);

  // Remove a single recent search
  const removeRecentSearch = useCallback((index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
    setLongPressedIndex(null);
  }, []);

  // Handle long press on recent searches
  const handleTouchStart = useCallback((index: number) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressedIndex(index);
    }, LONG_PRESS_DURATION);
  }, []);

  // Cancel long press
  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }, []);

  // Persist recent searches to localStorage
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    if (!isFocused) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setLongPressedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFocused]);

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="px-4 py-3">
        <div className="relative mb-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search phones, brands, features..."
              value={searchQuery}
              onChange={handleInputChange} // Directly update state on every keystroke
              onFocus={() => setIsFocused(true)}
              className="w-full pl-11 pr-12 py-3 bg-gray-50/75 border border-gray-200/75 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 
                       focus:bg-white font-display text-[15px] placeholder:text-gray-400 transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 p-0.5 rounded-full 
                         hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Recent Searches */}
          {isFocused && recentSearches.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute left-0 right-0 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 
                       overflow-hidden z-50 shadow-sm -mt-1"
            >
              <div className="p-1.5">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-1.5">
                    <History className="w-3 h-3 text-gray-400" />
                    <span className="text-[11px] font-medium text-gray-500">
                      Recent Searches
                    </span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="p-1 rounded-lg hover:bg-gray-50/80 transition-colors group"
                    aria-label="Clear recent searches"
                  >
                    <Trash2 className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
                <div className="mt-0.5 flex flex-wrap gap-1.5 px-1">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="relative group">
                      <button
                        onTouchStart={() => handleTouchStart(index)}
                        onTouchEnd={handleTouchEnd}
                        onTouchCancel={handleTouchEnd}
                        onClick={() => handleSearch(search)}
                        className="px-2.5 py-1.5 bg-gray-50/80 hover:bg-gray-100/80 rounded-lg text-[11px] 
                                 text-gray-600 active:bg-gray-100 transition-all font-medium tracking-tight"
                      >
                        {search}
                      </button>
                      {longPressedIndex === index && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(index);
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900/90 rounded-full 
                                   flex items-center justify-center shadow-sm ring-1 ring-gray-100 
                                   transition-transform scale-90 hover:scale-100"
                        >
                          <X className="w-2.5 h-2.5 text-gray-100" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Trending Searches */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-0.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <h3 className="text-xs font-semibold text-gray-600">
              Trending Searches
            </h3>
          </div>
          <div className="relative">
            <div className="flex gap-2 pb-1 overflow-x-auto modern-scrollbar px-0.5">
              {trendingSearches.map((trend) => (
                <button
                  key={trend.id}
                  onClick={() => handleSearch(trend.text)}
                  className="flex-shrink-0 px-3.5 py-2 bg-gray-50 active:bg-gray-100 rounded-xl 
                           border border-gray-200/50"
                >
                  <span className="font-display text-[13px] font-semibold text-gray-700 tracking-tight whitespace-nowrap">
                    {trend.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

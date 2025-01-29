import React, { useMemo, memo, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PhoneCard } from "../PhoneCard/PhoneCard";
import { Phone } from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ArrowRight } from "lucide-react";

interface PhoneGridProps {
  phones: Phone[];
  showAll?: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
}

// Memoized Advertisement component
const Advertisement = memo(() => (
  <div className="col-span-full h-40 md:h-56 grid grid-cols-2 gap-3 md:gap-6 my-4">
    {["Advertisement", "Sponsored"].map((label, index) => (
      <div
        key={index}
        className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100"
      >
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative p-4 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-6 h-6 rounded ${
                index === 0 ? "bg-blue-500" : "bg-green-500"
              }`}
            />
            <span className="text-xs text-gray-400">{label}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="space-y-2 w-full max-w-[280px]">
              <div className="h-3 bg-gray-200 rounded-full w-3/4" />
              <div className="h-3 bg-gray-200 rounded-full w-1/2" />
              <div className="h-2 bg-gray-100 rounded-full w-2/3" />
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-gray-400">
                {index === 0 ? "Ads by Google" : "Powered by AdSense"}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
));

// Memoized Pagination component with optimized rendering
const Pagination = memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    const pages = useMemo(() => {
      const maxVisiblePages = 5;
      if (totalPages <= maxVisiblePages)
        return Array.from({ length: totalPages }, (_, i) => i + 1);

      const range = [];
      if (currentPage <= 3) {
        range.push(...[1, 2, 3, 4, -1, totalPages]);
      } else if (currentPage >= totalPages - 2) {
        range.push(
          ...[1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        );
      } else {
        range.push(
          ...[
            1,
            -1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            -1,
            totalPages,
          ]
        );
      }
      return range;
    }, [currentPage, totalPages]);

    const handlePageChange = useCallback(
      (page: number) => {
        if (page !== -1) onPageChange(page);
      },
      [onPageChange]
    );

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>

        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === -1 ? (
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }
);

// Main PhoneGrid component with optimized rendering and virtualization
export const PhoneGrid: React.FC<PhoneGridProps> = memo(
  ({
    phones,
    showAll = false,
    currentPage = 1,
    onPageChange,
    totalPages = 1,
  }) => {
    const { width } = useWindowSize();
    const navigate = useNavigate();
    const location = useLocation();
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    // Calculate grid layout based on screen size
    const { phonesToShow, insertAdAfter, columns } = useMemo(() => {
      const itemsPerRow =
        width < 640 ? 3 : width < 1024 ? 4 : width < 1280 ? 5 : 6;
      const rowsToShow = showAll ? 7 : 5;
      const itemsPerPage = itemsPerRow * rowsToShow;

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const phonesToShow = showAll
        ? phones.slice(start, end)
        : phones.slice(0, itemsPerPage);

      return {
        phonesToShow,
        insertAdAfter: 3 * itemsPerRow,
        columns: itemsPerRow,
      };
    }, [phones, showAll, width, currentPage]);

    const handlePhoneClick = useCallback(
      (phoneId: number) => {
        navigate(`/phone/${phoneId}`, { state: { from: location.pathname } });
      },
      [navigate, location.pathname]
    );

    const handleImageLoad = useCallback((phoneId: number) => {
      setLoadedImages((prev) => new Set(prev).add(phoneId));
    }, []);

    return (
      <div className="space-y-6">
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6"
          style={{
            // Add CSS containment for better performance
            contain: "content",
          }}
        >
          {phonesToShow.map((phone, index) => (
            <React.Fragment key={phone.id}>
              {index === insertAdAfter && !showAll && <Advertisement />}
              <PhoneCard
                phone={phone}
                onClick={() => handlePhoneClick(phone.id)}
                onImageLoad={() => handleImageLoad(phone.id)}
                isImageLoaded={loadedImages.has(phone.id)}
                index={index}
                totalItems={phonesToShow.length}
                columns={columns}
              />
            </React.Fragment>
          ))}
        </div>

        {showAll && onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    );
  }
);

PhoneGrid.displayName = "PhoneGrid";
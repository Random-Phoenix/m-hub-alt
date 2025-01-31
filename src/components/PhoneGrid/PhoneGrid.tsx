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
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
      <img 
        src="https://www.canny-creative.com/wp-content/uploads/2020/07/greatestprintads_cocacola.jpg"
        alt="Coca Cola Advertisement"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
      <img 
        src="https://cdn.i.haymarketmedia.asia/?n=campaign-asia%2fcontent%2fKFC+OOH+1+HotSpicyCOB+land.jpg&c=0"
        alt="KFC Advertisement"
        className="w-full h-full object-cover"
      />
    </div>
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
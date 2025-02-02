import React from 'react';
import { useSwipe } from '../../../../hooks/useSwipe';

interface MediaViewerProps {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const totalItems = images.length;

  const handleSwipeLeft = () => {
    setCurrentIndex((current) => (current + 1) % totalItems);
  };

  const handleSwipeRight = () => {
    setCurrentIndex((current) => (current - 1 + totalItems) % totalItems);
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight);

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Main Media Display */}
      <div className="relative">
        <div 
          {...swipeHandlers}
          className="aspect-[16/12] sm:aspect-video max-h-[200px] sm:max-h-none w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
        >
          <img 
            src={images[currentIndex]} 
            alt={`View ${currentIndex + 1}`}
            className="w-full h-full object-contain sm:object-cover"
          />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-200 ${
                currentIndex === idx 
                  ? 'bg-blue-600 w-4' 
                  : 'bg-gray-300 w-1'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-4 gap-1 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
              currentIndex === idx 
                ? 'border-blue-500 ring-2 ring-blue-500/20' 
                : 'border-gray-100'
            }`}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-contain sm:object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
import React, { useState, useEffect, useCallback, memo, useRef } from 'react';

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
}

export const PriceRangeSlider = memo(({
  value,
  onChange,
  min,
  max,
  step
}: PriceRangeSliderProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const formatPrice = useCallback((price: number) => (
    `Rs. ${price.toLocaleString()}`
  ), []);

  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newValue = min + Math.round((max - min) * percent / step) * step;

    // Determine which thumb to move based on click position
    const distanceToLower = Math.abs(newValue - localValue[0]);
    const distanceToUpper = Math.abs(newValue - localValue[1]);
    const thumbIndex = distanceToLower < distanceToUpper ? 0 : 1;

    const updatedValue: [number, number] = [...localValue] as [number, number];
    updatedValue[thumbIndex] = Math.min(Math.max(newValue, min), max);

    // Ensure thumbs don't cross
    if (thumbIndex === 0) {
      updatedValue[0] = Math.min(updatedValue[0], updatedValue[1] - step);
    } else {
      updatedValue[1] = Math.max(updatedValue[1], updatedValue[0] + step);
    }

    setLocalValue(updatedValue);
    onChange(updatedValue);
  }, [localValue, min, max, step, onChange]);

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
        <div className="relative h-2" ref={trackRef} onClick={handleTrackClick}>
          <div className="absolute w-full h-1 bg-gray-200 rounded-full cursor-pointer" />
          <div
            className="absolute h-1 bg-blue-500 rounded-full cursor-pointer"
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
              onTouchStart={() => {
                setIsDragging(true);
                setActiveThumb(index);
              }}
              onMouseUp={() => {
                setIsDragging(false);
                setActiveThumb(null);
                onChange(localValue);
              }}
              onTouchEnd={() => {
                setIsDragging(false);
                setActiveThumb(null);
                onChange(localValue);
              }}
              className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-blue-900/10 hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95 transition-transform touch-none"
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

PriceRangeSlider.displayName = 'PriceRangeSlider';
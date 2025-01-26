import { useEffect, useCallback } from 'react';

export const useAutoSlide = (
  currentSlide: number,
  setCurrentSlide: (index: number) => void,
  totalSlides: number,
  interval: number = 10000
) => {
  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % totalSlides);
  }, [setCurrentSlide, totalSlides]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [nextSlide, interval]);
};
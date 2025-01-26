import { useCallback, TouchEvent } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useSwipe = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold: number = 50
): SwipeHandlers => {
  let touchStartX = 0;
  let touchEndX = 0;

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchEndX = 0;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }

    touchStartX = 0;
    touchEndX = 0;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};
import { useMemo } from 'react';
import { Phone } from '../types';

interface FilterState {
  price?: 'low-to-high' | 'high-to-low';
  date?: 'newest' | 'oldest';
  popularity?: 'most-viewed' | 'trending';
}

export const usePhoneFilter = (
  phones: Phone[],
  selectedCategory: string,
  searchQuery: string,
  filters: FilterState = {} // Provide default empty object
) => {
  return useMemo(() => {
    if (!phones || !phones.length) return [];

    // First filter by category and search query
    let filteredPhones = phones.filter(phone => {
      const matchesCategory = phone.category === selectedCategory;
      const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // If no phones match the filters, return empty array
    if (!filteredPhones.length) return [];

    // Get maximum values for normalization
    const maxPrice = Math.max(...filteredPhones.map(p => p.price));
    const maxViews = Math.max(...filteredPhones.map(p => p.views));
    const maxDate = Math.max(...filteredPhones.map(p => p.releaseDate.getTime()));
    const minDate = Math.min(...filteredPhones.map(p => p.releaseDate.getTime()));
    const dateRange = maxDate - minDate;

    // Apply all active filters sequentially
    const sortedPhones = [...filteredPhones].sort((a, b) => {
      // Normalize all scores to be between -1 and 1 for fair comparison
      const getScore = (value: number, max: number) => (value / max) * 2 - 1;

      // Initialize weights for each filter type
      const weights = {
        price: filters.price ? 1 : 0,
        date: filters.date ? 1 : 0,
        popularity: filters.popularity ? 1 : 0
      };

      // Calculate total weight for normalization
      const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
      if (totalWeight === 0) return 0;

      let totalScore = 0;

      // Price score
      if (filters.price) {
        const priceScoreA = getScore(a.price, maxPrice);
        const priceScoreB = getScore(b.price, maxPrice);
        const priceScore = filters.price === 'low-to-high'
          ? priceScoreA - priceScoreB
          : priceScoreB - priceScoreA;
        totalScore += (priceScore * weights.price);
      }

      // Date score
      if (filters.date) {
        const dateScoreA = getScore(a.releaseDate.getTime() - minDate, dateRange);
        const dateScoreB = getScore(b.releaseDate.getTime() - minDate, dateRange);
        const dateScore = filters.date === 'newest'
          ? dateScoreB - dateScoreA
          : dateScoreA - dateScoreB;
        totalScore += (dateScore * weights.date);
      }

      // Popularity score
      if (filters.popularity) {
        if (filters.popularity === 'most-viewed') {
          const viewsScoreA = getScore(a.views, maxViews);
          const viewsScoreB = getScore(b.views, maxViews);
          totalScore += ((viewsScoreB - viewsScoreA) * weights.popularity);
        } else if (filters.popularity === 'trending') {
          // Combine views and recency for trending
          const viewsScore = getScore(b.views - a.views, maxViews);
          const recencyScore = getScore(
            b.releaseDate.getTime() - a.releaseDate.getTime(),
            dateRange
          );
          totalScore += ((viewsScore + recencyScore) * weights.popularity * 0.5);
        }
      }

      // Normalize final score
      return totalScore / totalWeight;
    });

    return sortedPhones;
  }, [phones, selectedCategory, searchQuery, filters]);
};
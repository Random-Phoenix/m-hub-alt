import { useMemo } from 'react';
import { Phone } from '../types';

type SortOption = 'low-to-high' | 'high-to-low' | 'newest' | 'oldest' | 'most-viewed' | 'trending';

export const usePhoneFilter = (
  phones: Phone[],
  selectedCategory: string,
  searchQuery: string,
  sortOption?: SortOption
) => {
  return useMemo(() => {
    // First filter by category and search query
    let filteredPhones = phones.filter(phone => {
      const matchesCategory = phone.category === selectedCategory;
      const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Then apply sorting based on the selected option
    if (sortOption) {
      const sortedPhones = [...filteredPhones];
      
      switch (sortOption) {
        case 'low-to-high':
          sortedPhones.sort((a, b) => a.price - b.price);
          break;
        case 'high-to-low':
          sortedPhones.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          sortedPhones.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
          break;
        case 'oldest':
          sortedPhones.sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
          break;
        case 'most-viewed':
          sortedPhones.sort((a, b) => b.views - a.views);
          break;
        case 'trending':
          // First sort by trending flag, then by views
          sortedPhones.sort((a, b) => {
            if (a.trending === b.trending) {
              return b.views - a.views;
            }
            return b.trending ? 1 : -1;
          });
          break;
      }
      
      return sortedPhones;
    }

    return filteredPhones;
  }, [phones, selectedCategory, searchQuery, sortOption]);
};
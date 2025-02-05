import { useMemo } from 'react';
import { Phone } from '../types';

export const usePhoneFilter = (
  phones: Phone[],
  selectedCategory: string,
  searchQuery: string
) => {
  return useMemo(() => {
    return phones.filter(phone => {
      const matchesCategory = phone.category === selectedCategory;
      const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [phones, selectedCategory, searchQuery]);
};
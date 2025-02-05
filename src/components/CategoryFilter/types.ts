import { DivideIcon as LucideIcon } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  icon: LucideIcon;
  type?: 'range';
  range?: {
    min: number;
    max: number;
    step: number;
  };
  multiSelect?: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isAllDevicesPage?: boolean;
  onFilterChange: (filterId: string, value: string | null) => void;
  activeFilters?: Record<string, string>;
}
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
  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: (filters: Record<string, string | string[]>) => void;
  isAllDevicesPage?: boolean;
}
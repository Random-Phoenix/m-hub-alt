import { 
  Filter, ArrowUpDown, Clock, TrendingUp, DollarSign, 
  MemoryStick as Memory, HardDrive, Camera, Battery, Wifi 
} from 'lucide-react';
import { FilterOption } from './types';

export const basicFilterOptions: FilterOption[] = [
  {
    id: "price",
    label: "Price",
    icon: ArrowUpDown,
    options: [
      { value: "low-to-high", label: "Low to High" },
      { value: "high-to-low", label: "High to Low" },
    ],
  },
  {
    id: "date",
    label: "Release Date",
    icon: Clock,
    options: [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
    ],
  },
  {
    id: "popularity",
    label: "Popularity",
    icon: TrendingUp,
    options: [
      { value: "most-viewed", label: "Most Viewed" },
      { value: "trending", label: "Trending" },
    ],
  },
];

export const advancedFilterOptions: FilterOption[] = [
  {
    id: "priceRange",
    label: "Price Range",
    icon: DollarSign,
    type: "range",
    range: {
      min: 0,
      max: 500000,
      step: 1000,
    }
  },
  {
    id: "ram",
    label: "RAM",
    icon: Memory,
    multiSelect: true,
    options: [
      { value: "4gb", label: "4GB" },
      { value: "6gb", label: "6GB" },
      { value: "8gb", label: "8GB" },
      { value: "12gb", label: "12GB" },
      { value: "16gb", label: "16GB+" },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    icon: HardDrive,
    multiSelect: true,
    options: [
      { value: "64gb", label: "64GB" },
      { value: "128gb", label: "128GB" },
      { value: "256gb", label: "256GB" },
      { value: "512gb", label: "512GB" },
      { value: "1tb", label: "1TB+" },
    ],
  },
  {
    id: "camera",
    label: "Camera",
    icon: Camera,
    multiSelect: true,
    options: [
      { value: "under-48mp", label: "Under 48MP" },
      { value: "48mp", label: "48MP" },
      { value: "50mp", label: "50MP" },
      { value: "64mp", label: "64MP" },
      { value: "108mp-plus", label: "108MP+" },
    ],
  },
  {
    id: "battery",
    label: "Battery",
    icon: Battery,
    multiSelect: true,
    options: [
      { value: "3000-4000", label: "3000-4000 mAh" },
      { value: "4000-5000", label: "4000-5000 mAh" },
      { value: "5000-6000", label: "5000-6000 mAh" },
      { value: "above-6000", label: "Above 6000 mAh" },
    ],
  },
  {
    id: "network",
    label: "Network",
    icon: Wifi,
    multiSelect: true,
    options: [
      { value: "4g", label: "4G" },
      { value: "5g", label: "5G" },
    ],
  },
];
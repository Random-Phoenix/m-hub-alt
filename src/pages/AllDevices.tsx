import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navigation/Navbar';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';
import { PhoneGrid } from '../components/PhoneGrid/PhoneGrid';
import { usePhoneFilter } from '../hooks/usePhoneFilter';
import { phones } from '../data/phones';
import { categories } from '../data/categories';
import { ChevronRight } from 'lucide-react';

export const AllDevices = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites] = useState<number[]>([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  // Get the initial category from location state or default to 'Latest Phones'
  const initialCategory = location.state?.category || 'Latest Phones';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredPhones = usePhoneFilter(phones, selectedCategory, searchQuery);
  
  // Calculate total pages
  const { totalPages, itemsPerPage } = useMemo(() => {
    const itemsPerRow = window.innerWidth < 640 ? 3 : 
                       window.innerWidth < 1024 ? 4 : 
                       window.innerWidth < 1280 ? 5 : 6;
    const itemsPerPage = itemsPerRow * 7; // 7 rows per page
    const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);
    return { totalPages, itemsPerPage };
  }, [filteredPhones.length]);

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        favoritesCount={favorites.length}
      />

      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 py-3 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">
                Mobile Phones
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
              Mobile Phones
            </h1>
            <div className="text-sm text-gray-500">
              {filteredPhones.length} devices
            </div>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isAllDevicesPage={true}
          />
          
          <PhoneGrid 
            phones={filteredPhones}
            showAll={true}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};
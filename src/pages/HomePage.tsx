import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from '../components/Navigation/Navbar';
import { HeroSlider } from '../components/Hero/HeroSlider';
import { MobileSearch } from '../components/Search/MobileSearch';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';
import { PhoneGrid } from '../components/PhoneGrid/PhoneGrid';
import { DiscoverMore } from '../components/Marketing/DiscoverMore';
import { Footer } from '../components/Layout/Footer';
import { usePhoneFilter } from '../hooks/usePhoneFilter';
import { phones } from '../data/phones';
import { slides } from '../data/slides';
import { news } from '../data/news';
import { categories } from '../data/categories';

// Lazy load LatestNews component since it's only used on desktop
const LatestNews = lazy(() => import('../components/Hero/LatestNews').then(module => ({
  default: module.LatestNews
})));

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Latest Phones');
  const [favorites] = useState<number[]>([1, 2, 3]);

  const filteredPhones = usePhoneFilter(phones, selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        favoritesCount={favorites.length}
      />

      <div className="pt-14 md:pt-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:hidden">
            <HeroSlider
              slides={slides}
              currentSlide={currentSlide}
              onSlideChange={setCurrentSlide}
            />
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-6 py-4">
            <div className="col-span-2">
              <HeroSlider
                slides={slides}
                currentSlide={currentSlide}
                onSlideChange={setCurrentSlide}
              />
            </div>
            <div className="col-span-1">
              <Suspense fallback={<div className="h-[40vh] bg-white rounded-2xl animate-pulse" />}>
                <LatestNews news={news} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <MobileSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <section className="max-w-7xl mx-auto px-4 py-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <PhoneGrid phones={filteredPhones} />
      </section>

      <DiscoverMore />
      <Footer />
    </div>
  );
};
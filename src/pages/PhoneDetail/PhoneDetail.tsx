import React, { useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, Heart, Share2, Award, Shield, Smartphone,
  Cpu, Battery, Wifi, Camera, Monitor, Check, CircuitBoard,
  HardDrive, Layers
} from 'lucide-react';

import { Navbar } from '../../components/Navigation/Navbar';
import { MediaViewer } from './components/MediaViewer/MediaViewer';
import { ShareMenu } from './components/ShareMenu/ShareMenu';
import { SpecCard } from './components/SpecCard/SpecCard';
import { SpecTable } from './components/SpecTable/SpecTable';
import { mockImages, specifications } from './constants/mockData';
import { phones } from '../../data/phones';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const PhoneDetail = () => {
  useScrollToTop(); // Add this hook at the top of the component

  const { id } = useParams();
  const location = useLocation();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites] = useState<number[]>([1, 2, 3]);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  
  // Find the phone from our data
  const phone = phones.find(p => p.id === Number(id));
  
  if (!phone) return <div>Phone not found</div>;

  const quickSpecs = [
    { icon: Monitor, title: 'Display', value: phone.specs.screen },
    { icon: Cpu, title: 'Processor', value: phone.specs.processor },
    { icon: Camera, title: 'Camera', value: phone.specs.camera },
    { icon: CircuitBoard, title: 'RAM', value: '8GB' },
    { icon: HardDrive, title: 'Storage', value: '256GB' },
    { icon: Battery, title: 'Battery', value: '5000 mAh' }
  ];

  const shareUrl = window.location.href;

  // Determine breadcrumb based on navigation source
  const showAllDevicesInBreadcrumb = location.state?.from === '/all-devices';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        favoritesCount={favorites.length}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-1 py-2 text-xs sm:text-sm">
            <Link to="/" className="text-gray-500">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            {showAllDevicesInBreadcrumb && (
              <>
                <Link to="/all-devices" className="text-gray-500">All Devices</Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{phone.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Media Gallery */}
          <div>
            <MediaViewer 
              images={mockImages}
              currentIndex={currentMediaIndex}
              setCurrentIndex={setCurrentMediaIndex}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg mb-2">
                    {phone.category}
                  </span>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-display">
                    {phone.name}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 ml-4">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50 active:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${
                      isFavorite 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-400'
                    }`} />
                  </button>
                  <button 
                    ref={shareButtonRef}
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50 active:bg-gray-100"
                  >
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                <span className="text-xl sm:text-2xl font-bold text-blue-600 font-display">
                  {phone.price}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                    <Award className="w-3.5 h-3.5" />
                    Official Warranty
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                    <Shield className="w-3.5 h-3.5" />
                    PTA Approved
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {quickSpecs.map((spec, index) => (
                <SpecCard
                  key={index}
                  icon={spec.icon}
                  title={spec.title}
                  value={spec.value}
                />
              ))}
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>5G Connectivity for Ultra-Fast Internet</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>AI-Enhanced Camera System</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Fast Charging Support (65W)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>IP68 Water and Dust Resistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 font-display flex items-center gap-2">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <span>Detailed Specifications</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(specifications).map(([category, specs]) => (
              <SpecTable 
                key={category} 
                title={category.charAt(0).toUpperCase() + category.slice(1)} 
                specs={specs} 
              />
            ))}
          </div>
        </div>
      </div>

      <ShareMenu 
        isOpen={isShareMenuOpen}
        onClose={() => setIsShareMenuOpen(false)}
        url={shareUrl}
        buttonRef={shareButtonRef}
      />
    </div>
  );
};
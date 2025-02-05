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
  useScrollToTop();

  const { id } = useParams();
  const location = useLocation();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites] = useState<number[]>([1, 2, 3]);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  
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
  const showAllDevicesInBreadcrumb = location.state?.from === '/all-devices';

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
              {showAllDevicesInBreadcrumb && (
                <>
                  <Link to="/mobile-phones" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Mobile Phones
                  </Link>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </>
              )}
              <span className="text-gray-900 font-medium truncate">
                {phone.name}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Media Gallery */}
            <div>
              <MediaViewer 
                images={mockImages}
                currentIndex={currentMediaIndex}
                setCurrentIndex={setCurrentMediaIndex}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                      {phone.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-1.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${
                        isFavorite 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`} />
                    </button>
                    <button 
                      ref={shareButtonRef}
                      onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                      className="p-1.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 font-display mb-2">
                  {phone.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-lg md:text-xl font-bold text-blue-600 font-display">
                    Rs. {phone.price.toLocaleString()}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                      <Award className="w-3.5 h-3.5" />
                      Official Warranty
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                      <Shield className="w-3.5 h-3.5" />
                      PTA Approved
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5">
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
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Key Features</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-[13px] text-gray-600">5G Connectivity for Ultra-Fast Internet</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-[13px] text-gray-600">AI-Enhanced Camera System</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-[13px] text-gray-600">Fast Charging Support (65W)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Detailed Specifications</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
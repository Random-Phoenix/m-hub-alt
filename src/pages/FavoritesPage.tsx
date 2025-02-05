import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navigation/Navbar';
import { ChevronRight, Heart, Scale, Plus, Search, X } from 'lucide-react';
import { phones } from '../data/phones';
import { Phone } from '../types';

// Hardcoded favorite phones for initial display
const initialFavorites: Phone[] = [
  phones[0], // iPhone 15 Pro Max
  phones[5], // Vivo V30 Pro
  phones[10], // Tecno Phantom X5
  phones[15], // Asus Zenfone 11
];

const CompareModal = ({
  isOpen,
  onClose,
  favorites,
  onCompare,
}: {
  isOpen: boolean;
  onClose: () => void;
  favorites: Phone[];
  onCompare: (phone1: Phone, phone2: Phone) => void;
}) => {
  const [selectedPhones, setSelectedPhones] = useState<Phone[]>([]);

  if (!isOpen) return null;

  const handlePhoneSelect = (phone: Phone) => {
    if (selectedPhones.includes(phone)) {
      setSelectedPhones(selectedPhones.filter(p => p.id !== phone.id));
    } else if (selectedPhones.length < 2) {
      setSelectedPhones([...selectedPhones, phone]);
    }
  };

  const handleCompare = () => {
    if (selectedPhones.length === 2) {
      onCompare(selectedPhones[0], selectedPhones[1]);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Compare Devices</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Select two devices to compare their specifications side by side
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {favorites.map(phone => (
              <button
                key={phone.id}
                onClick={() => handlePhoneSelect(phone)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedPhones.includes(phone)
                    ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {phone.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {phone.specs.processor}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCompare}
              disabled={selectedPhones.length !== 2}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 
                       transition-colors"
            >
              Compare Selected Devices
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const EmptyState = ({ onAddDevices }: { onAddDevices: () => void }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <Heart className="w-8 h-8 text-blue-500" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No favorite devices yet
    </h3>
    <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
      Start adding devices to your favorites to compare their specifications and make better decisions
    </p>
    <button
      onClick={onAddDevices}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
                 text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Plus className="w-4 h-4" />
      Add Devices
    </button>
  </div>
);

const FavoriteCard = ({ phone }: { phone: Phone }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
    <div className="aspect-[4/3] bg-gray-50 relative">
      <img
        src={phone.image}
        alt={phone.name}
        className="w-full h-full object-cover"
      />
      <button className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm">
        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
      </button>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
        {phone.name}
      </h3>
      <div className="space-y-1 mb-4">
        <p className="text-sm text-gray-500">{phone.specs.processor}</p>
        <p className="text-sm font-medium text-blue-600">Rs. {phone.price.toLocaleString()}</p>
      </div>
      <Link
        to={`/phone/${phone.id}`}
        className="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium 
                 rounded-lg text-center hover:bg-gray-200 transition-colors"
      >
        View Details
      </Link>
    </div>
  </div>
);

export const FavoritesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites] = useState<Phone[]>(initialFavorites);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleCompare = (phone1: Phone, phone2: Phone) => {
    // This will be implemented later when we add the comparison feature
    console.log('Comparing:', phone1.name, 'vs', phone2.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        favoritesCount={favorites.length}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 py-3 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">
              Favorites
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display mb-1">
              Favorite Devices
            </h1>
            <p className="text-sm text-gray-500">
              {favorites.length} {favorites.length === 1 ? 'device' : 'devices'} saved
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              to="/mobile-phones"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 
                       text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 
                       transition-colors order-2 sm:order-1"
            >
              <Plus className="w-4 h-4" />
              Add More Devices
            </Link>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 
                       text-white text-sm font-medium rounded-lg hover:bg-blue-700 
                       transition-colors order-1 sm:order-2"
            >
              <Scale className="w-4 h-4" />
              Compare Devices
            </button>
          </div>
        </div>

        {favorites.length === 0 ? (
          <EmptyState onAddDevices={() => {/* Navigate to all devices */}} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map(phone => (
              <FavoriteCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </div>

      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        favorites={favorites}
        onCompare={handleCompare}
      />
    </div>
  );
};
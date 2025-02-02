import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navigation/Navbar';
import { 
  ChevronRight, Heart, Share2, Copy, Facebook, Twitter, 
  Linkedin, Link as LinkIcon, Award, Shield, Smartphone,
  Cpu, Battery, Wifi, Camera, Monitor, Check, CircuitBoard,
  HardDrive, Layers, ChevronLeft
} from 'lucide-react';
import { phones } from '../data/phones';
import { useSwipe } from '../hooks/useSwipe';

const mockImages = [
  "https://fdn.gsmarena.com/imgroot/reviews/21/samsung-galaxy-s21-ultra/lifestyle/-1024w2/gsmarena_001.jpg",
  "https://fdn.gsmarena.com/imgroot/reviews/21/samsung-galaxy-s21-ultra/lifestyle/-1024w2/gsmarena_002.jpg",
  "https://fdn.gsmarena.com/imgroot/reviews/21/samsung-galaxy-s21-ultra/lifestyle/-1024w2/gsmarena_006.jpg",
  "https://fdn.gsmarena.com/imgroot/reviews/21/samsung-galaxy-s21-ultra/lifestyle/-1024w2/gsmarena_012.jpg"
];

const SpecCard = ({ icon: Icon, title, value }: { 
  icon: React.ElementType; 
  title: string; 
  value: string;
}) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100">
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-0.5 sm:mb-1">{title}</h3>
        <p className="text-xs sm:text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const SpecTable = ({ title, specs }: { title: string; specs: Record<string, string> }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-50 to-transparent border-b border-gray-100">
      <h3 className="font-semibold text-[13px] sm:text-sm text-gray-900">{title}</h3>
    </div>
    <div className="divide-y divide-gray-100">
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="px-3 py-2.5 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-0">
          <span className="text-xs sm:text-sm text-gray-500 sm:w-1/3">{key}</span>
          <span className="text-xs sm:text-sm text-gray-900 font-medium flex-1">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const MediaViewer = ({ 
  images, 
  currentIndex, 
  setCurrentIndex 
}: { 
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const totalItems = images.length;

  const handleSwipeLeft = () => {
    setCurrentIndex((current) => (current + 1) % totalItems);
  };

  const handleSwipeRight = () => {
    setCurrentIndex((current) => (current - 1 + totalItems) % totalItems);
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight);

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Main Media Display */}
      <div className="relative">
        <div 
          {...swipeHandlers}
          className="aspect-[16/12] sm:aspect-video max-h-[200px] sm:max-h-none w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
        >
          <img 
            src={images[currentIndex]} 
            alt={`View ${currentIndex + 1}`}
            className="w-full h-full object-contain sm:object-cover"
          />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-200 ${
                currentIndex === idx 
                  ? 'bg-blue-600 w-4' 
                  : 'bg-gray-300 w-1'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-4 gap-1 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
              currentIndex === idx 
                ? 'border-blue-500 ring-2 ring-blue-500/20' 
                : 'border-gray-100'
            }`}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-contain sm:object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ShareMenu = ({ 
  isOpen, 
  onClose, 
  url,
  buttonRef 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  url: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => {
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  const shareButtons = [
    { icon: Facebook, label: 'Facebook', color: 'bg-[#1877F2]', link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { icon: Twitter, label: 'Twitter', color: 'bg-[#1DA1F2]', link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}` },
    { icon: Linkedin, label: 'LinkedIn', color: 'bg-[#0A66C2]', link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` }
  ];

  const buttonPosition = buttonRef.current?.getBoundingClientRect();
  const isMobile = window.innerWidth < 640;
  
  const style = isMobile ? {
    top: `${buttonPosition ? buttonPosition.bottom + window.scrollY + 8 : 0}px`,
    left: '16px',
    right: '16px',
    position: 'fixed' as const,
    zIndex: 50
  } : {
    top: `${buttonPosition ? buttonPosition.bottom + window.scrollY + 8 : 0}px`,
    right: `${buttonPosition ? window.innerWidth - buttonPosition.right : 0}px`,
    position: 'fixed' as const,
    width: '320px',
    zIndex: 50
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div 
        ref={menuRef}
        style={style}
        className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn"
      >
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-900">Share this device</h3>
            <p className="text-xs text-gray-500 mt-0.5">Choose your preferred platform</p>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {shareButtons.map(({ icon: Icon, label, color, link }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} text-white p-2.5 rounded-xl flex flex-col items-center gap-2 active:opacity-90 transition-opacity`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-medium">{label}</span>
              </a>
            ))}
          </div>

          {/* Copy Link */}
          <div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600 truncate">{url}</span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-900 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PhoneDetail = () => {
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

  const specifications = {
    build: {
      'OS': 'Android 14',
      'UI': 'Funtouch 14',
      'Dimensions': '163.4 x 75.93 x 7.95 mm',
      'Weight': '188 g',
      'Colors': 'Titanium Silver, Emerald Green'
    },
    display: {
      'Type': 'AMOLED Capacitive Touchscreen',
      'Size': phone.specs.screen,
      'Resolution': '1080 x 2400 Pixels (~395 PPI)',
      'Features': '120Hz, 800 nits (peak)'
    },
    performance: {
      'CPU': phone.specs.processor,
      'GPU': 'Adreno 610',
      'RAM': '8GB',
      'Storage': '128GB Built-in, UFS 2.2',
      'Card': 'microSD Card (supports up to 1TB)'
    },
    camera: {
      'Main': phone.specs.camera,
      'Features': 'Night, Portrait, Documents, Slo-mo, Time-lapse, Pro',
      'Front': '32 MP'
    },
    connectivity: {
      'WLAN': 'Wi-Fi 802.11 a/b/g/n/ac, dual-band',
      'Bluetooth': 'v5.0 with A2DP, LE',
      'GPS': 'Yes + GPS, GLONASS, GALILEO, BDS',
      'Radio': 'FM Radio',
      'USB': 'USB Type-C 2.0'
    },
    features: {
      'Sensors': 'Accelerometer, Compass, Fingerprint, Gyro, Proximity',
      'Audio': '3.5mm Audio Jack, 24-bit/192kHz audio',
      'Browser': 'HTML5',
      'Messaging': 'SMS, MMS, Email, Push Mail, IM'
    }
  };

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
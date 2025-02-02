import React, { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { Smartphone, Heart, Search, Menu, X, User, Mail, Scale } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useNavigate, Link } from 'react-router-dom';

const GoogleIcon = memo(() => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
));

const ProfileMenu = memo(({ isOpen, onClose, className = '' }: { isOpen: boolean; onClose: () => void; className?: string }) => {
  const content = useMemo(
    () => (
      <div
        className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn ${className}`}
      >
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Welcome to PhoneDive
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Sign in to access your account
          </p>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 bg-white text-gray-700 text-sm font-medium transition-colors group">
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
              <Mail className="w-4 h-4" />
              <span>Continue with Email</span>
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    ),
    [className]
  );

  if (!isOpen) return null;
  return content;
});

const IconButton = memo(({ icon: Icon, label, onClick, badge, className = '' }: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  badge?: number;
  className?: string;
}) => {
  const buttonContent = useMemo(() => (
    <>
      <Icon className="h-[22px] w-[22px] text-gray-700" />
      {badge && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] text-[11px] font-semibold bg-blue-600 text-white rounded-full ring-2 ring-white">
          {badge}
        </span>
      )}
    </>
  ), [Icon, badge]);

  return (
    <button 
      className={`relative p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {buttonContent}
    </button>
  );
});

const SearchInput = memo(({ inputRef, placeholder }: {
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder: string;
}) => (
  <div className="relative flex-1">
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="w-full h-10 pl-11 pr-4 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500/30 font-display text-[15px] placeholder:text-gray-400 transition-all"
      autoComplete="off"
    />
    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
  </div>
));

export const Navbar = memo(({ 
  isMenuOpen, 
  setIsMenuOpen, 
  favoritesCount 
}: { 
  isMenuOpen: boolean; 
  setIsMenuOpen: (isOpen: boolean) => void; 
  favoritesCount: number;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const scrollListenerRef = useRef<number>();
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    if (scrollListenerRef.current) return;

    scrollListenerRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsScrolled(currentScrollY > 10);
        lastScrollY.current = currentScrollY;
      }
      scrollListenerRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollListenerRef.current) {
        cancelAnimationFrame(scrollListenerRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
      
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setIsProfileMenuOpen(false);
      }
      
      const isClickInsideSearch = (
        searchInputRef.current?.contains(target) ||
        desktopSearchInputRef.current?.contains(target)
      );
      
      if (!isClickInsideSearch) {
        setIsSearchActive(false);
      }
    };

    if (isMenuOpen || isSearchActive || isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen, setIsMenuOpen, isSearchActive, isProfileMenuOpen]);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const logo = useMemo(
    () => (
      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Smartphone className="h-[26px] w-[26px] text-blue-600" />
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          PhoneDive
        </span>
      </Link>
    ),
    []
  );

  const desktopLinks = useMemo(() => (
    <div className="hidden md:flex items-center space-x-1 ml-10">
      <Link to="/mobile-phones" className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-colors">
        Phones
      </Link>
      <Link to="/compare" className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-colors">
        Compare
      </Link>
      <a href="#" className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-colors">
        News & Reviews
      </a>
    </div>
  ), []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-200 font-display
        ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}
      `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16 px-4">
          <div className={`flex items-center flex-shrink-0 ${isSearchActive ? 'hidden' : 'flex'}`}>
            {logo}
          </div>
          
          {desktopLinks}
          
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            <div className="w-[260px] lg:w-[280px]">
              <SearchInput
                inputRef={desktopSearchInputRef}
                placeholder="Search phones..."
              />
            </div>
            <div className="relative">
              <IconButton
                icon={Heart}
                label="Favorites"
                badge={favoritesCount}
                onClick={() => navigate('/favorites')}
              />
            </div>
            <div className="relative" ref={profileMenuRef}>
              <IconButton
                icon={User}
                label="Profile"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              />
              <ProfileMenu 
                isOpen={isProfileMenuOpen} 
                onClose={() => setIsProfileMenuOpen(false)} 
              />
            </div>
          </div>

          <div className={`md:hidden flex items-center ${isSearchActive ? 'w-full' : 'ml-auto'} space-x-2`}>
            <div className={`relative ${isSearchActive ? 'flex-1' : ''}`}>
              {isSearchActive ? (
                <div className="flex items-center bg-white animate-slideIn-horizontal">
                  <div className="relative flex-1">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search phones..."
                      className="w-full h-10 pl-11 pr-4 bg-white rounded-xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500/30 font-display text-[15px] placeholder:text-gray-400 transition-all"
                      autoComplete="off"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                  <button
                    className="p-2 ml-1.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    onClick={() => setIsSearchActive(false)}
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              ) : (
                <IconButton
                  icon={Search}
                  label="Search"
                  onClick={() => setIsSearchActive(true)}
                />
              )}
            </div>
            <div className="relative">
              <IconButton
                icon={Heart}
                label="Favorites"
                badge={favoritesCount}
                onClick={() => navigate('/favorites')}
              />
            </div>
            <div className="relative" ref={menuRef}>
              <IconButton
                icon={isMenuOpen ? X : Menu}
                label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <MobileMenu 
                isOpen={isMenuOpen} 
                onProfileClick={() => {
                  setIsMenuOpen(false);
                  setIsProfileMenuOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
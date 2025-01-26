import React from "react";
import { 
  Smartphone, Mail, Globe, 
  QrCode, Star, Award, BookOpen, Newspaper,
  Facebook, Instagram, Youtube, Heart,
  ArrowUpDown
} from "lucide-react";

const LanguageSelector = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 
               bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
    <Globe className="w-4 h-4" />
    <span>English</span>
  </div>
);

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Desktop Footer */}
        <div className="hidden md:block py-5">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {/* Brand and Newsletter Section */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        <span className="text-lg font-bold tracking-tight">MobileHUB</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Your trusted source for mobile tech</p>
                    </div>
                    {/* QR Code Section - Right side of MobileHUB */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                      <QrCode className="w-7 h-7 text-gray-400" />
                      <div className="whitespace-nowrap">
                        <p className="text-[12px] font-medium text-gray-900">App Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Newsletter Input */}
                <div className="flex items-stretch gap-2 max-w-md">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-3 pr-8 py-2 text-sm rounded-lg border border-gray-200 outline-none 
                               ring-blue-500/20 focus:ring-2 focus:bg-white font-display
                               placeholder:text-gray-400 transition-all"
                    />
                    <Mail className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg 
                             hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links - Reduced left margin */}
            <div className="col-span-4 md:col-span-2 md:ml-8">
              <h4 className="text-[14px] font-semibold text-gray-900 mb-2 whitespace-nowrap">Quick Links</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 
                                       group transition-colors whitespace-nowrap">
                    <Smartphone className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                    Latest Phones
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 
                                       group transition-colors whitespace-nowrap">
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                    Compare Phones
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 
                                       group transition-colors whitespace-nowrap">
                    <Heart className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                    Favourites
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources - Adjusted spacing */}
            <div className="col-span-4 md:col-span-2 md:ml-4">
              <h4 className="text-[14px] font-semibold text-gray-900 mb-2 whitespace-nowrap">Resources</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 
                                       group transition-colors whitespace-nowrap">
                    <Newspaper className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                    News & Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 
                                       group transition-colors whitespace-nowrap">
                    <BookOpen className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                    User Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Company and Additional Features */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col md:items-end gap-3">
                {/* Trust Badges */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-[11px] text-gray-600 whitespace-nowrap">Expert Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span className="text-[11px] text-gray-600 whitespace-nowrap">Trusted Specs</span>
                  </div>
                </div>

                {/* Social and Language */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                       className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                       className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                       className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </div>
                  <LanguageSelector />
                </div>

                {/* Support Links */}
                <div className="flex items-center gap-3">
                  <a href="#" className="text-[13px] text-gray-600 hover:text-blue-600 whitespace-nowrap">Privacy</a>
                  <a href="#" className="text-[13px] text-gray-600 hover:text-blue-600 whitespace-nowrap">Terms</a>
                  <a href="#" className="text-[13px] text-gray-600 hover:text-blue-600 whitespace-nowrap">FAQ</a>
                  <a href="#" className="text-[13px] text-gray-600 hover:text-blue-600 whitespace-nowrap">Contact</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              © 2025 MobileHUB. All rights reserved.
            </p>
          </div>
        </div>

        {/* Mobile Footer with Responsive Layouts */}
        <div className="md:hidden">
          {/* Newsletter Section */}
          <div className="px-3 py-1 border-b border-gray-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span className="text-base font-bold tracking-tight">MobileHUB</span>
                </div>
                
                {/* Social Links - Left of App Coming Soon */}
                <div className="flex items-center gap-1">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                     className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-all">
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                     className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-all">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                     className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-all">
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* App Coming Soon - Always single line */}
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg shrink-0">
                <QrCode className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[9px] sm:text-[10px] text-gray-600 whitespace-nowrap">App Coming Soon</span>
              </div>
            </div>

            {/* Quick Links and Trust Badges in a more compact layout */}
            <div className="flex items-center justify-between mt-2 mb-1.5">
              <div className="flex gap-4">
                <div className="flex gap-3">
                  <a href="#" className="text-[10px] text-gray-600">Latest</a>
                  <a href="#" className="text-[10px] text-gray-600">Compare</a>
                  <a href="#" className="text-[10px] text-gray-600">News</a>
                  <a href="#" className="text-[10px] text-gray-600">Guides</a>
                </div>
              </div>

              {/* Trust Badges - Compact */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-green-500" />
                  <span className="text-[9px] text-gray-600">Expert</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-blue-500" />
                  <span className="text-[9px] text-gray-600">Trusted</span>
                </div>
              </div>
            </div>

            {/* Newsletter - Left aligned */}
            <div className="flex flex-col items-start">
              <div className="relative w-full max-w-[280px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-24 py-1.5 text-sm rounded-lg border border-gray-200 outline-none 
                           ring-blue-500/20 focus:ring-2 focus:bg-white font-display text-[15px] 
                           placeholder:text-gray-400 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white 
                           text-xs font-medium rounded-md active:scale-[0.98] transition-transform"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Stay updated with the latest mobile tech news</p>
            </div>
          </div>

          {/* Support Links */}
          <div className="px-4 py-1 border-b border-gray-100">
            <div className="flex items-center justify-center gap-2">
              <a href="#" className="px-2 py-1 text-[11px] font-medium text-gray-600 whitespace-nowrap">
                Privacy
              </a>
              <a href="#" className="px-2 py-1 text-[11px] font-medium text-gray-600 whitespace-nowrap">
                Terms
              </a>
              <a href="#" className="px-2 py-1 text-[11px] font-medium text-gray-600 whitespace-nowrap">
                FAQ
              </a>
              <a href="#" className="px-2 py-1 text-[11px] font-medium text-gray-600 whitespace-nowrap">
                Contact
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="px-4 py-1 bg-gray-50/50">
            <p className="text-[10px] text-center text-gray-500">
              © 2025 MobileHUB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
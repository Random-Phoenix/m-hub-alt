import React, { useState } from "react";
import { 
  Smartphone, Mail, ArrowUpRight, Twitter, Linkedin, Github, Phone, Globe, 
  ChevronDown, QrCode, Shield, Award, BookOpen, Newspaper, Star, HelpCircle
} from "lucide-react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 
                 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>English</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-lg border 
                      border-gray-100 p-1 animate-fadeIn">
          <button 
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-900 rounded-lg
                     hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-4 h-4 text-gray-400" />
            <span>English</span>
            <Star className="w-3 h-3 text-blue-500 ml-auto" />
          </button>
        </div>
      )}
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop Footer */}
        <div className="hidden md:block p-2">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Brand and Newsletter Section */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-5">
              <div className="flex items-center gap-2 mb-1.5">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-base font-bold tracking-tight">MobileHUB</span>
              </div>
              <div className="relative max-w-md">
                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-3 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 outline-none 
                               ring-blue-500/20 focus:ring-2 focus:bg-white font-display text-[15px] 
                               placeholder:text-gray-400 transition-all min-w-[280px]"
                    />
                    <Mail className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg 
                             hover:bg-blue-700 active:scale-[0.98] transition-all"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Stay updated with the latest mobile tech news</p>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-600">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-600">Verified Products</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-4 lg:col-span-2 xl:col-span-2">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {['Latest Phones', 'Compare Phones', 'Search'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-4 lg:col-span-3 xl:col-span-2">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2">
                {[
                  { label: 'News & Reviews', icon: Newspaper },
                  { label: 'User Guides', icon: BookOpen }
                ].map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 
                                         group transition-colors">
                      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company and Additional Features */}
            <div className="col-span-4 lg:col-span-3 xl:col-span-3">
              <div className="flex flex-col items-end gap-3">
                {/* Company Link */}
                <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 
                                     group transition-colors">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                  About Us
                </a>

                {/* Support Links */}
                <div className="flex flex-col items-end gap-2">
                  <a href="#" className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
                    Privacy Policy
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 
                                           group-hover:translate-x-0 transition-all" />
                  </a>
                  <a href="#" className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
                    Terms
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 
                                           group-hover:translate-x-0 transition-all" />
                  </a>
                  <a href="#" className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
                    FAQ
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 
                                           group-hover:translate-x-0 transition-all" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg text-sm font-medium 
                             text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Contact
                  </a>
                </div>

                {/* Social and Language */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <a href="#" className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 
                                         transition-all">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 
                                         transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 
                                         transition-all">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              © 2024 MobileHUB. All rights reserved.
            </p>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden">
          {/* Newsletter Section */}
          <div className="px-3 py-1.5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-sm font-bold tracking-tight">MobileHUB</span>
                </div>
              </div>
              {/* Social Links and Language Selector for Mobile */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <a href="#" className="p-1 rounded-lg text-gray-500 hover:text-blue-600 transition-all">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a href="#" className="p-1 rounded-lg text-gray-500 hover:text-blue-600 transition-all">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href="#" className="p-1 rounded-lg text-gray-500 hover:text-blue-600 transition-all">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
                <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-600 bg-gray-50 rounded-lg">
                  <Globe className="w-3.5 h-3.5" />
                  <span>EN</span>
                </button>
              </div>
            </div>
            <form className="space-y-1 flex flex-col items-center">
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
              <p className="text-[10px] text-gray-500">Stay updated with the latest mobile tech news</p>
            </form>
          </div>

          {/* Support Links */}
          <div className="px-4 py-1.5 border-b border-gray-100">
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
              <a 
                href="#" 
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 rounded-lg 
                         text-[11px] font-medium text-blue-600 whitespace-nowrap"
              >
                <Phone className="w-3 h-3" />
                Contact
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="px-4 py-1.5 bg-gray-50/50">
            <p className="text-[10px] text-center text-gray-500">
              © 2024 MobileHUB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
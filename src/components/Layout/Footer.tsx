import React from "react";
import { Smartphone, Mail, ArrowUpRight, Twitter, Linkedin, Github, Phone, Globe, ChevronDown, QrCode } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop Footer */}
        <div className="hidden md:block p-2">
          <div className="flex items-start justify-between">
            {/* Brand and Newsletter Section */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-base font-bold tracking-tight">MobileHUB</span>
              </div>
              <div className="relative">
                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-3 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 outline-none 
                               ring-blue-500/20 focus:ring-2 focus:bg-white font-display text-[15px] 
                               placeholder:text-gray-400 transition-all"
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
            </div>

            {/* Right Section with Support Links and Additional Features */}
            <div className="space-y-3">
              {/* Support Links */}
              <div className="flex items-center gap-4 justify-end">
                <a href="#" className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
                  Privacy Policy
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
                <a href="#" className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
                  Terms
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
                <a href="#" className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
                  FAQ
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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

              {/* Additional Features Section */}
              <div className="flex items-center gap-4 justify-end">
                {/* Social Links */}
                <div className="flex items-center gap-2">
                  <a href="#" className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                {/* Language Selector */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Coming Soon App Section */}
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="relative group cursor-pointer">
                    <QrCode className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="text-xs font-medium text-gray-900 mb-1">Mobile app coming soon</div>
                      <p className="text-xs text-gray-500">Stay tuned for updates!</p>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-gray-900">Mobile App</div>
                    <div className="text-xs text-gray-500">Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-center mt-2 pt-2 border-t border-gray-100">
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
            </div>
            <form className="space-y-1">
              <div className="relative max-w-[280px]">
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
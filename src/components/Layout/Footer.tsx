import React, { memo } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  Smartphone,
  Mail,
  Globe,
  QrCode,
  Star,
  Award,
  BookOpen,
  Newspaper,
  Heart,
  ArrowUpDown,
} from "lucide-react";

// Memoized components to prevent unnecessary re-renders
const LanguageSelector = memo(() => (
  <div
    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 
               bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors"
  >
    <Globe className="w-4 h-4" />
    <span>English</span>
  </div>
));
LanguageSelector.displayName = "LanguageSelector";

// Pre-defined constants to avoid recreating objects on each render
const SOCIAL_LINKS = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com", label: "Youtube" },
] as const;

const QUICK_LINKS = [
  { icon: Smartphone, text: "Latest Phones", href: "#" },
  { icon: ArrowUpDown, text: "Compare Phones", href: "#" },
  { icon: Heart, text: "Favourites", href: "#" },
] as const;

const RESOURCE_LINKS = [
  { icon: Newspaper, text: "News & Reviews", href: "#" },
  { icon: BookOpen, text: "User Guides", href: "#" },
] as const;

const TRUST_BADGES = [
  { icon: Award, text: "Expert Reviews", color: "text-green-500" },
  { icon: Star, text: "Trusted Specs", color: "text-blue-500" },
] as const;

const SUPPORT_LINKS = ["Privacy", "Terms", "FAQ", "Contact"] as const;

// Memoized social link component
const SocialLink = memo(
  ({
    icon: Icon,
    href,
    label,
  }: {
    icon: React.ElementType;
    href: string;
    label: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all"
      aria-label={label}
    >
      <Icon className="w-[18px] h-[18px]" />
    </a>
  )
);
SocialLink.displayName = "SocialLink";

// Memoized quick link component
const QuickLink = memo(
  ({
    icon: Icon,
    text,
    href,
  }: {
    icon: React.ElementType;
    text: string;
    href: string;
  }) => (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 
                 group transition-colors whitespace-nowrap"
      >
        <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
        {text}
      </a>
    </li>
  )
);
QuickLink.displayName = "QuickLink";

// Main Footer component
export const Footer = memo(() => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Desktop Footer */}
        <div className="hidden md:block py-2">
          <div className="grid grid-cols-12 gap-3 lg:gap-4">
            {/* Brand and Newsletter Section */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        <span className="text-lg font-bold tracking-tight">
                          MobileHUB
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Your trusted source for mobile tech
                      </p>
                    </div>
                    {/* QR Code Section */}
                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 rounded-xl">
                      <QrCode className="w-6 h-6 text-gray-400" />
                      <div className="whitespace-nowrap">
                        <p className="text-[11px] font-medium text-gray-900">
                          App Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Newsletter Input */}
                <div className="flex items-stretch gap-1.5 max-w-md">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-3 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 outline-none 
                               ring-blue-500/20 focus:ring-2 focus:bg-white font-display
                               placeholder:text-gray-400 transition-all"
                    />
                    <Mail className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg 
                             hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-4 md:col-span-2 md:ml-6">
              <h4 className="text-[13px] font-semibold text-gray-900 mb-1.5">
                Quick Links
              </h4>
              <ul className="space-y-1">
                {QUICK_LINKS.map((link) => (
                  <QuickLink key={link.text} {...link} />
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-4 md:col-span-2 md:ml-3">
              <h4 className="text-[13px] font-semibold text-gray-900 mb-1.5">
                Resources
              </h4>
              <ul className="space-y-1">
                {RESOURCE_LINKS.map((link) => (
                  <QuickLink key={link.text} {...link} />
                ))}
              </ul>
            </div>

            {/* Company and Additional Features */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col md:items-end gap-1.5">
                {/* Trust Badges */}
                <div className="flex items-center gap-3">
                  {TRUST_BADGES.map(({ icon: Icon, text, color }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                      <span className="text-[11px] md:text-[12px] text-gray-600 whitespace-nowrap">
                        {" "}
                        {/* Increased to 12px for desktop */}
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social, Language, and Support Links */}
                <div className="flex flex-col items-end gap-2 mt-6">
                  {/* Social and Language */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {SOCIAL_LINKS.map((link) => (
                        <SocialLink key={link.label} {...link} />
                      ))}
                    </div>
                    <LanguageSelector />
                  </div>
                  {/* Support Links */}
                  <div className="flex items-center gap-2">
                    {SUPPORT_LINKS.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-[12px] text-gray-600 hover:text-blue-600 whitespace-nowrap"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-center mt-2 pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              © 2025 MobileHUB. All rights reserved.
            </p>
          </div>
        </div>

        {/* Mobile Footer - Optimized with memoization */}
        <MobileFooter />
      </div>
    </footer>
  );
});

// Separate mobile footer component to reduce main component complexity
const MobileFooter = memo(() => (
  <div className="md:hidden">
    {/* Newsletter Section */}
    <div className="px-3 py-1 border-b border-gray-100">
      <div className="flex items-center justify-between mb-1.5">
        {/* MobileHUB Name */}
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-blue-600" />
          <span className="text-base font-bold tracking-tight">MobileHUB</span>
        </div>

        {/* Social Links and App Coming Soon */}
        <div className="flex items-center gap-2">
          {/* Social Links */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>

          {/* App Coming Soon */}
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg shrink-0">
            <QrCode className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[9px] sm:text-[10px] text-gray-600 whitespace-nowrap">
              App Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Quick Links and Trust Badges */}
      <div className="flex items-center justify-between mt-2 mb-1.5">
        <div className="flex gap-4">
          <div className="flex gap-3">
            {["Latest", "Compare", "News", "Guides"].map((link) => (
              <a key={link} href="#" className="text-[10px] text-gray-600">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-2">
          {TRUST_BADGES.map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-1">
              <Icon className={`w-3 h-3 ${color}`} />
              <span className="text-[9px] text-gray-600">
                {text.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
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
        {/* Dynamic Content for Empty Space */}
        <div className="mt-1 text-[10px] text-gray-500">
          Stay updated with the latest mobile tech news and exclusive offers.
        </div>
      </div>
    </div>

    {/* Support Links */}
    <div className="px-4 py-1 border-b border-gray-100">
      <div className="flex items-center justify-center gap-2">
        {SUPPORT_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="px-2 py-1 text-[11px] font-medium text-gray-600 whitespace-nowrap"
          >
            {link}
          </a>
        ))}
      </div>
    </div>

    {/* Copyright */}
    <div className="px-4 py-1 bg-gray-50/50">
      <p className="text-[10px] text-center text-gray-500">
        © 2025 MobileHUB. All rights reserved.
      </p>
    </div>
  </div>
));
MobileFooter.displayName = "MobileFooter";

Footer.displayName = "Footer";

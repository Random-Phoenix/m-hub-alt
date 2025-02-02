import React, { useState, memo, useMemo } from 'react';
import { ChevronRight, User, Smartphone, Newspaper, ArrowLeft, Mail, Scale } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onProfileClick: () => void;
}

// Memoized menu item component
const MenuItem = memo(({ 
  icon: Icon, 
  label, 
  onClick, 
  iconBgColor = 'bg-gray-50',
  iconRingColor = 'ring-gray-200/75',
  iconTextColor = 'text-gray-600'
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  iconBgColor?: string;
  iconRingColor?: string;
  iconTextColor?: string;
}) => {
  const content = useMemo(() => (
    <>
      <div className={`flex-shrink-0 w-7 h-7 rounded-full ${iconBgColor} ring-1 ${iconRingColor} flex items-center justify-center transition-transform group-hover:scale-[0.95]`}>
        <Icon className={`h-3.5 w-3.5 ${iconTextColor}`} />
      </div>
      <span className="text-[13px] font-medium text-gray-800 group-hover:text-gray-900">{label}</span>
    </>
  ), [Icon, label, iconBgColor, iconRingColor, iconTextColor]);

  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-2.5 mx-1.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors group"
    >
      {content}
    </button>
  );
});

// Memoized sign in view component
const SignInView = memo(({ onBack }: { onBack: () => void }) => {
  const header = useMemo(() => (
    <div className="text-center pt-2">
      <h3 className="text-[13px] font-semibold text-gray-900 tracking-tight">Welcome Back</h3>
      <p className="text-[11px] text-gray-500 mb-3">Sign in to continue</p>
    </div>
  ), []);

  const buttons = useMemo(() => (
    <div className="flex gap-1.5">
      <button className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 bg-gradient-to-b from-white to-gray-50/90 text-gray-700 text-xs font-medium transition-all hover:shadow-sm active:scale-[0.98]">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Google</span>
      </button>
      
      <button className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white text-xs font-medium transition-all hover:shadow-sm active:scale-[0.98]">
        <Mail className="w-3.5 h-3.5" />
        <span>Email</span>
      </button>
    </div>
  ), []);

  const footer = useMemo(() => (
    <div className="mt-2.5 pt-2 border-t border-gray-100">
      <p className="text-[10px] text-gray-400 text-center font-medium">
        By continuing, you agree to our Terms
      </p>
    </div>
  ), []);

  return (
    <div className="fixed top-[69px] right-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100/75 overflow-hidden animate-fadeIn backdrop-blur-sm">
      <div className="p-3 relative">
        <button 
          onClick={onBack}
          className="absolute left-2 top-2.5 w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Back to menu"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gray-700" />
        </button>

        {header}
        {buttons}
        {footer}
      </div>
    </div>
  );
});

// Main MobileMenu component
export const MobileMenu = memo(({ isOpen, onProfileClick }: MobileMenuProps) => {
  const [showSignIn, setShowSignIn] = useState(false);

  if (!isOpen) return null;

  if (showSignIn) {
    return <SignInView onBack={() => setShowSignIn(false)} />;
  }

  return (
    <div className="fixed top-[69px] right-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/75 overflow-hidden animate-fadeIn">
      <nav className="py-1">
        <MenuItem 
          icon={Smartphone}
          label="Mobile Phones"
          iconBgColor="bg-blue-50"
          iconRingColor="ring-blue-100/75"
          iconTextColor="text-blue-600"
        />
        <MenuItem 
          icon={Scale}
          label="Compare Phones"
          iconBgColor="bg-green-50"
          iconRingColor="ring-green-100/75"
          iconTextColor="text-green-600"
        />
        <MenuItem 
          icon={Newspaper}
          label="News & Reviews"
          iconBgColor="bg-purple-50"
          iconRingColor="ring-purple-100/75"
          iconTextColor="text-purple-600"
        />
        <MenuItem 
          icon={User}
          label="Sign In"
          onClick={() => setShowSignIn(true)}
        />
      </nav>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';
import React, { useState, useRef, useEffect } from 'react';
import { Copy, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ 
  isOpen, 
  onClose, 
  url,
  buttonRef 
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
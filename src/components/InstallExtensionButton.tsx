import React, { useState, useRef, useEffect } from 'react';
import { BROWSERS } from '../constants/browsers';
import { translations } from '../translations';
import type { Language } from '../translations';

interface InstallExtensionButtonProps {
  currentLang?: Language;
  className?: string;
}

export const InstallExtensionButton: React.FC<InstallExtensionButtonProps> = ({
  currentLang = 'en',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tLang = translations[currentLang] || translations.en;
  const label = tLang.nav?.install || 'Install extension';

  const toggleDropdown = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 260px below, but enough room above, open upward
      setOpenUpward(spaceBelow < 260 && rect.top > 260);
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Install extension options"
        className="inline-flex items-center justify-center text-center h-11 px-8 rounded-none btn-header-install font-sans text-[15px] font-semibold tracking-normal cursor-pointer active:scale-95 shrink-0 focus-visible:ring-1 focus-visible:ring-white leading-none box-border shadow-2xl min-w-[220px]"
      >
        <span>{label}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Supported Browsers"
          className={`absolute left-0 right-0 ${
            openUpward ? 'bottom-full mb-2' : 'top-full mt-2'
          } w-full min-w-full bg-[#090909] border border-[#1A1A1F] rounded-none shadow-2xl flex flex-col py-1 z-50 text-left`}
        >
          {BROWSERS.map((browser) => (
            <a
              key={browser.id}
              href={browser.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 px-3.5 py-2.5 text-white/90 font-medium text-[13px] tracking-normal bg-transparent hover:bg-white/[0.08] hover:text-white transition-colors duration-100 cursor-pointer no-underline select-none rounded-none"
            >
              <span className="text-white/80 group-hover:text-[#FF5500] transition-colors duration-100 shrink-0 flex items-center justify-center">
                {browser.icon('w-[20px] h-[20px] shrink-0 fill-current')}
              </span>
              <span className="truncate">{browser.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { BROWSERS } from '../constants/browsers';

export const HeroCtaButtons: React.FC = () => {
  return (
    <div className="w-full self-stretch mt-8 sm:mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
        {BROWSERS.map((browser) => (
          <button
            key={browser.id}
            type="button"
            onClick={() => window.open(browser.url, '_blank', 'noopener,noreferrer')}
            className="w-full h-14 sm:h-16 bg-[#FFFFFF] hover:bg-[#FF5500] text-[#000000] border border-[#FFFFFF] rounded-none flex items-center justify-center gap-2.5 sm:gap-3.5 font-sans text-base sm:text-lg md:text-xl font-bold tracking-tight transition-all duration-150 cursor-pointer select-none group px-3 sm:px-4"
          >
            <span className="text-black group-hover:text-black transition-colors shrink-0 flex items-center justify-center">
              {browser.icon('w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 fill-current')}
            </span>
            <span className="whitespace-nowrap">{browser.heroName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

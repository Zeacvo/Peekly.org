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
            className="w-full h-12 bg-[#FFFFFF] hover:bg-[#FF5500] text-[#000000] border border-[#FFFFFF] rounded-none flex items-center justify-center gap-2 font-mono text-xs font-extrabold uppercase tracking-wider transition-all duration-150 hover:shadow-[0_0_16px_rgba(255,85,0,0.45)] cursor-pointer select-none group"
          >
            <span className="text-black group-hover:text-black transition-colors shrink-0 flex items-center justify-center">
              {browser.icon('w-5 h-5 shrink-0 fill-current')}
            </span>
            <span className="whitespace-nowrap">{browser.heroName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

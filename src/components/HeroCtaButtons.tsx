import React from 'react';
import { BROWSERS } from '../constants/browsers';

export const HeroCtaButtons: React.FC = () => {
  return (
    <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-2 sm:gap-2.5 max-w-7xl mx-auto w-full px-2 mt-2 sm:mt-3 overflow-x-auto lg:overflow-visible py-2 scrollbar-none">
      {BROWSERS.map((browser) => (
        <a
          key={browser.id}
          href={browser.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2.5 px-3.5 sm:px-4 lg:px-5 py-2.5 sm:py-3 bg-white text-black font-sans font-extrabold uppercase text-[12px] lg:text-[13px] tracking-wider rounded-none border border-transparent hover:border-white hover:bg-[#FF5500] hover:text-black hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] active:scale-95 transition-all duration-150 cursor-pointer select-none shrink-0"
        >
          <span className="text-black group-hover:text-black transition-colors shrink-0 flex items-center justify-center">
            {browser.icon('w-7 h-7 shrink-0 fill-current')}
          </span>
          <span className="whitespace-nowrap">{browser.heroName}</span>
        </a>
      ))}
    </div>
  );
};

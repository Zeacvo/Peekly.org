import React, { useState, useEffect } from 'react';

// Ambient multi-script character rotation from supported site languages:
// 'Я' (ru), '文' (zh), 'あ' (ja), '한' (ko), 'ع' (ar), 'Ü' (de/tr), 'Ł' (pl), 'Є' (uk)
const SCRIPTS = ['Я', '文', 'あ', '한', 'ع', 'Ü', 'Ł', 'Є'];

interface LanguageIconProps {
  className?: string;
}

export const LanguageIcon: React.FC<LanguageIconProps> = ({ className = "w-3.5 h-3.5" }) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Soft fade out + micro scale down
      setIsFading(true);

      setTimeout(() => {
        // 2. Change character while invisible
        setIndex((prev) => (prev + 1) % SCRIPTS.length);
        // 3. Fade back in with smooth ease-in-out transition
        setIsFading(false);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`relative shrink-0 select-none flex items-center justify-center ${className}`} 
      aria-hidden="true"
    >
      {/* 1. Bottom-right base tile ('A' on dark background with subtle border) */}
      <div className="absolute right-0 bottom-0 w-[9px] h-[9px] rounded-none bg-[#141414] border border-white/25 group-hover:border-white/60 group-hover/lang:border-white/60 flex items-center justify-center font-bold text-[6.5px] text-neutral-400 group-hover:text-white group-hover/lang:text-white leading-none transition-colors duration-200 z-0">
        A
      </div>

      {/* 2. Top-left dynamic script tile (Soft ambient cross-fade between world alphabets) */}
      <div className="absolute left-0 top-0 w-[9px] h-[9px] rounded-none bg-neutral-300 group-hover:bg-white group-hover/lang:bg-white text-black flex items-center justify-center font-bold text-[6.5px] leading-none z-10 transition-colors duration-200 shadow-[0_0_0_1px_#000000]">
        <span 
          className={`inline-block leading-none transition-all duration-500 ease-in-out ${
            isFading ? 'opacity-0 scale-90 blur-[0.5px]' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          {SCRIPTS[index]}
        </span>
      </div>
    </div>
  );
};

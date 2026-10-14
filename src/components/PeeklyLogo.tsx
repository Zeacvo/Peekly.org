import React from 'react';

interface PeeklyLogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Peekly Tactical Eye Logo
 * Faithful vector replication of the official brand asset (Screenshot 3).
 * Uses currentColor to adapt to parent text-white, text-black, and hover:text-[#FF5500].
 */
export const PeeklyLogo: React.FC<PeeklyLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg 
      width={Math.round(size * 1.57)} 
      height={size} 
      viewBox="6 22 88 56" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-colors duration-150 ${className}`}
    >
      {/* Outer Eyelid Silhouette with Circular Iris Cutout */}
      <path 
        d="M 8 50 C 24 30, 36 24, 50 24 C 64 24, 76 30, 92 50 C 76 70, 64 76, 50 76 C 36 76, 24 70, 8 50 Z M 50 29 A 21 21 0 1 0 50 71 A 21 21 0 1 0 50 29 Z" 
        fill="currentColor"
        fillRule="evenodd"
      />

      {/* Crosshair Target Reticle Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="13.5" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3.2" 
      />

      {/* Solid Center Dot Pupil */}
      <circle 
        cx="50" 
        cy="50" 
        r="4.5" 
        fill="currentColor" 
      />

      {/* 4 Tactical Crosshair Bars (Top, Bottom, Left, Right) */}
      <rect x="48.25" y="32" width="3.5" height="11.5" rx="0.5" fill="currentColor" />
      <rect x="48.25" y="56.5" width="3.5" height="11.5" rx="0.5" fill="currentColor" />
      <rect x="32" y="48.25" width="11.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="56.5" y="48.25" width="11.5" height="3.5" rx="0.5" fill="currentColor" />
    </svg>
  );
};

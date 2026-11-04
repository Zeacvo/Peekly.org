import React from 'react';

export const DefaultUserAvatar: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-12 h-12 text-white',
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="256" cy="148" r="110" />
    <path d="M72 470c0-110 82-190 184-190s184 80 184 190v12H72v-12z" />
  </svg>
);

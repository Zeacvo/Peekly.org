import React, { useState, useEffect } from 'react';
import { DefaultUserAvatar } from './DefaultUserAvatar';

export interface UserAvatarProps {
  user?: {
    nickname?: string | null;
    avatar?: string | null;
    avatar_url?: string | null;
    avatarUrl?: string | null;
    picture?: string | null;
    faceit_avatar?: string | null;
    faceitAvatar?: string | null;
  } | null;
  size?: number;
  className?: string;
  imgClassName?: string;
}

export function getUserAvatarUrl(user?: {
  nickname?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
  avatarUrl?: string | null;
  picture?: string | null;
  faceit_avatar?: string | null;
  faceitAvatar?: string | null;
} | null): string | null {
  if (!user) return null;
  const raw =
    user.avatar ||
    user.avatar_url ||
    user.avatarUrl ||
    user.picture ||
    user.faceit_avatar ||
    user.faceitAvatar;

  if (raw && typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed && !trimmed.includes('default_avatar.png')) {
      return trimmed;
    }
  }

  // Fallback: check localStorage for matching user nickname if avatar is in local storage
  if (typeof window !== 'undefined' && user.nickname) {
    try {
      const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed?.nickname?.toLowerCase() === user.nickname.toLowerCase() &&
          (parsed.avatar || parsed.avatar_url || parsed.picture)
        ) {
          const localUrl = (parsed.avatar || parsed.avatar_url || parsed.picture).trim();
          if (localUrl && !localUrl.includes('default_avatar.png')) {
            return localUrl;
          }
        }
      }
    } catch {}
  }

  return null;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 24,
  className = 'w-full h-full text-[#FFFFFF]',
  imgClassName = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);
  const avatarUrl = getUserAvatarUrl(user);

  useEffect(() => {
    setHasError(false);
  }, [avatarUrl]);

  if (avatarUrl && !hasError) {
    return (
      <img
        src={avatarUrl}
        alt={user?.nickname || 'User'}
        className={imgClassName}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    );
  }

  return <DefaultUserAvatar size={size} className={className} />;
};

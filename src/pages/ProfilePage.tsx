import React, { useState, useEffect, useRef, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaceitLogo } from '../components/AuthModal';
import { TwitchLogo } from '../components/icons/TwitchLogo';
import { getUserAvatarUrl } from '../components/UserAvatar';
import { DefaultUserAvatar } from '../components/DefaultUserAvatar';
import { generateTOTP, verifyTOTPToken } from '../utils/totp';
import {
  KeyRound,
  Laptop,
  AlertTriangle,
  Check,
  Edit2,
  ExternalLink,
  X,
  Loader2,
  ArrowLeft,
  Trash2,
} from 'lucide-react';
import type { Language } from '../translations';
import { profileTranslations } from '../data/profileTranslations';

function getDeviceInfo(): { browser: string; os: string } {
  if (typeof navigator === 'undefined') return { browser: 'Chrome', os: 'Windows' };
  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('YaBrowser')) browser = 'Yandex';
  else if (ua.includes('Brave')) browser = 'Brave';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

  let os = 'Windows';
  if (ua.includes('Mac OS') || ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { browser, os };
}

interface ProfilePageProps {
  currentLang?: Language;
  onGoHome?: () => void;
  onOpenAdmin?: () => void;
}

interface UserProfile {
  id?: string;
  guid?: string;
  nickname: string;
  email?: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  avatar?: string;
  avatar_url?: string;
  country?: string | null;
  elo?: number | null;
  level?: number | null;
  faceit_connected?: boolean;
  faceit_nickname?: string | null;
  faceitNickname?: string | null;
  twitch_username?: string | null;
  twitchUsername?: string | null;
  twitch_connected?: boolean;
  twitchConnected?: boolean;
  discord_username?: string | null;
  discordUsername?: string | null;
  discord_connected?: boolean;
  discordConnected?: boolean;
  role?: string;
  created_at?: string | number;
  createdAt?: string | number;
  plan?: string;
}

function getStoredUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.nickname) return parsed;
    }
    const match =
      document.cookie.match(/peekly_user=([^;]+)/) ||
      document.cookie.match(/peekly_auth=([^;]+)/);
    if (match) {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      if (parsed?.nickname) return parsed;
    }
  } catch {}
  return null;
}

export { DefaultUserAvatar };

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentLang = 'ru',
  onGoHome,
  onOpenAdmin,
}) => {
  const [activeLang, setActiveLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('peekly_lang') as Language;
      if (stored) return stored;
    }
    return currentLang;
  });

  useEffect(() => {
    if (currentLang) setActiveLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem('peekly_lang') as Language;
      if (stored) setActiveLang(stored);
    };
    window.addEventListener('peekly_language_changed', handleLangChange);
    return () => window.removeEventListener('peekly_language_changed', handleLangChange);
  }, []);

  const t = profileTranslations[activeLang] || profileTranslations.en;
  const isRu = activeLang === 'ru';

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser);
  const [targetUser, setTargetUser] = useState<UserProfile | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const match = path.match(/^\/id\/([^/?#]+)/) || path.match(/^\/profile\/([^/?#]+)/);
    if (!match) return false;
    const slug = decodeURIComponent(match[1]).toLowerCase();
    const stored = getStoredUser();
    if (!stored) return true;
    const ownNick = stored.nickname?.toLowerCase();
    const ownId = (stored.id || stored.guid)?.toLowerCase();
    if (ownNick && ownNick === slug) return false;
    if (ownId && ownId === slug) return false;
    return true;
  });
  const [isLoadingTarget, setIsLoadingTarget] = useState<boolean>(false);
  const [targetNotFound, setTargetNotFound] = useState<boolean>(false);

  // Modals state
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);

  // Hidden File input for direct PC upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const [newNickname, setNewNickname] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2FA state
  const [is2faActive, setIs2faActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('peekly_2fa');
      if (local !== null) return local === 'true';
      const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.twoFactorEnabled !== undefined) return Boolean(parsed.twoFactorEnabled);
        } catch {}
      }
    }
    return false;
  });
  const [twoFactorSecret, setTwoFactorSecret] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const sec = localStorage.getItem('peekly_2fa_secret');
      if (sec) return sec;
      const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
      if (stored) {
        try {
          return JSON.parse(stored)?.twoFactorSecret || '';
        } catch {}
      }
    }
    return '';
  });
  const [tempSecret, setTempSecret] = useState<string>('');
  const [otpauthUri, setOtpauthUri] = useState<string>('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);

  // Sync 2FA modal setup data
  useEffect(() => {
    if (isTwoFactorModalOpen) {
      setTwoFactorCode('');
      setTwoFactorError(null);
      if (!is2faActive) {
        const userEmail = currentUser?.email || 'zeacvo@icloud.com';
        const setup = generateTOTP(userEmail);
        setTempSecret(setup.secret);
        setOtpauthUri(setup.uri);
      } else {
        const activeSec = twoFactorSecret || localStorage.getItem('peekly_2fa_secret') || '';
        setTempSecret(activeSec);
        setOtpauthUri('');
      }
    }
  }, [isTwoFactorModalOpen, is2faActive, currentUser?.email, twoFactorSecret]);

  // Danger Zone confirmation state
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Email change 2-step OTP
  const [newEmail, setNewEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [emailStep, setEmailStep] = useState<'input' | 'otp'>('input');
  const [emailTestCode, setEmailTestCode] = useState<string | null>(null);

  // Status & feedback
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Fetch current authenticated user & sync storage
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setCurrentUser((prev) => {
            const merged = { ...prev, ...data.user };
            if (!merged.avatar && prev?.avatar) merged.avatar = prev.avatar;
            if (!merged.avatar_url && prev?.avatar_url) merged.avatar_url = prev.avatar_url;
            return merged;
          });
          try {
            const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
            let storedAvatar = '';
            if (stored) {
              const p = JSON.parse(stored);
              storedAvatar = p.avatar || p.avatar_url || p.picture || '';
            }
            const toSave = {
              ...data.user,
              avatar: data.user.avatar || storedAvatar,
              avatar_url: data.user.avatar_url || storedAvatar,
            };
            localStorage.setItem('peekly_user', JSON.stringify(toSave));
            localStorage.setItem('peekly_auth', JSON.stringify(toSave));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Listen for user updates across components
  useEffect(() => {
    const syncUser = () => {
      const stored = getStoredUser();
      if (stored) {
        setCurrentUser((prev) => ({ ...prev, ...stored }));
      }
    };
    window.addEventListener('peekly_user_updated', syncUser);
    window.addEventListener('storage', syncUser);
    window.addEventListener('focus', syncUser);
    return () => {
      window.removeEventListener('peekly_user_updated', syncUser);
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('focus', syncUser);
    };
  }, []);

  // FACEIT Auto-sync (runs on mount and every 5 minutes in background)
  useEffect(() => {
    if (isViewOnly) return;
    const syncFaceitData = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data?.authenticated && data?.user) {
            setCurrentUser((prev) => {
              const merged = { ...prev, ...data.user };
              if (!merged.avatar && prev?.avatar) merged.avatar = prev.avatar;
              if (!merged.avatar_url && prev?.avatar_url) merged.avatar_url = prev.avatar_url;
              return merged;
            });
            try {
              const stored = localStorage.getItem('peekly_user');
              if (stored) {
                const parsed = JSON.parse(stored);
                localStorage.setItem('peekly_user', JSON.stringify({ ...parsed, ...data.user }));
              }
            } catch {}
          }
        }
      } catch {}
    };

    syncFaceitData();
    const interval = setInterval(syncFaceitData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isViewOnly]);

  const [locationSearch, setLocationSearch] = useState(() =>
    typeof window !== 'undefined' ? window.location.search : ''
  );

  // Listen for browser navigation (back/forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setLocationSearch(window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isCurrentOwner =
    currentUser?.nickname?.toLowerCase() === 'zeacvo' ||
    currentUser?.email?.toLowerCase() === 'zeacvo@icloud.com' ||
    currentUser?.role?.toUpperCase() === 'OWNER' ||
    currentUser?.role?.toUpperCase() === 'CEO';

  // Inspect query params for public view: /profile?id=... or /profile?userId=...
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    let queryId = params.get('id') || params.get('userId') || params.get('guid');

    // Also support /id/:slug or /id/:slug/ or /profile/:usernameOrId
    if (!queryId) {
      const idMatch = window.location.pathname.match(/^\/id\/([^/?#]+)/);
      if (idMatch) {
        queryId = decodeURIComponent(idMatch[1]);
      } else {
        const pathMatch = window.location.pathname.match(/^\/profile\/([^/?#]+)/);
        if (pathMatch) {
          queryId = decodeURIComponent(pathMatch[1]);
        }
      }
    }

    if (queryId && queryId.trim()) {
      const cleanId = queryId.trim();
      const currentNickname = currentUser?.nickname;
      const currentId = currentUser?.id || currentUser?.guid;

      const isOwnProfile = Boolean(
        (currentNickname && currentNickname.toLowerCase() === cleanId.toLowerCase()) ||
        (currentId && currentId.toLowerCase() === cleanId.toLowerCase())
      );

      if (isOwnProfile) {
        // Viewing own profile
        setIsViewOnly(false);
        setTargetUser(null);
      } else {
        // Fetch target user public profile by slug or id
        setIsLoadingTarget(true);
        setTargetNotFound(false);
        fetch(`/api/users/by-slug/${encodeURIComponent(cleanId)}`)
          .then((res) => {
            if (!res.ok) {
              return fetch(`/api/users/profile?id=${encodeURIComponent(cleanId)}`);
            }
            return res;
          })
          .then(async (res) => {
            if (!res.ok) throw new Error('User not found');
            return res.json();
          })
          .then((data) => {
            if (data?.success && data?.user) {
              setTargetUser(data.user);
              setIsViewOnly(true);
            } else {
              setTargetNotFound(true);
              setIsViewOnly(true);
            }
          })
          .catch(() => {
            setTargetNotFound(true);
            setIsViewOnly(true);
          })
          .finally(() => {
            setIsLoadingTarget(false);
          });
      }
    } else {
      setIsViewOnly(false);
      setTargetUser(null);
    }
  }, [currentUser, locationSearch, isCurrentOwner]);

  // Dynamic Profile URL Auto-Sync:
  // When an authenticated user visits /profile or /id without slug, or their own profile with different casing/old alias
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentUser?.nickname && !isViewOnly) {
      const currentPath = window.location.pathname;
      const targetPath = `/id/${encodeURIComponent(currentUser.nickname)}/`;
      const isBareProfile =
        currentPath === '/profile' ||
        currentPath === '/profile/' ||
        currentPath === '/id' ||
        currentPath === '/id/';

      const slugMatch = currentPath.match(/^\/id\/([^/?#]+)/);
      const isOwnSlug = slugMatch && (
        decodeURIComponent(slugMatch[1]).toLowerCase() === currentUser.nickname.toLowerCase()
      );

      if (isBareProfile || isOwnSlug) {
        if (currentPath !== targetPath) {
          window.history.replaceState({ path: targetPath }, '', targetPath);
          setLocationSearch('');
        }
      }
    }
  }, [currentUser?.nickname, isViewOnly, isCurrentOwner]);

  // Display user: either targetUser (if public view) or currentUser
  const displayUser: UserProfile | null = isViewOnly ? targetUser : currentUser;

  const isOnline = useMemo(() => {
    if (!isViewOnly) return true;
    if (
      currentUser?.nickname &&
      displayUser?.nickname &&
      currentUser.nickname.toLowerCase() === displayUser.nickname.toLowerCase()
    ) {
      return true;
    }
    const lastSeen =
      (displayUser as any)?.last_seen ||
      (displayUser as any)?.lastSeen ||
      (displayUser as any)?.updated_at;
    if (lastSeen) {
      const diffMs = Date.now() - new Date(lastSeen).getTime();
      return diffMs >= 0 && diffMs < 5 * 60 * 1000;
    }
    return false;
  }, [isViewOnly, currentUser?.nickname, displayUser]);

  const isFaceitLinked = Boolean(
    displayUser?.faceit_connected ||
      displayUser?.faceit_nickname ||
      (displayUser?.elo && Number(displayUser.elo) > 0)
  );

  const rawCreatedAt = displayUser?.createdAt || displayUser?.created_at;
  const registrationDate = rawCreatedAt
    ? new Date(
        typeof rawCreatedAt === 'number'
          ? rawCreatedAt
          : isNaN(Number(rawCreatedAt))
          ? rawCreatedAt
          : Number(rawCreatedAt)
      ).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '03.11.2026';

  const showNotification = (text: string, isError = false) => {
    setStatusMessage({ text, isError });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const isTwitchConnected = Boolean(
    displayUser?.twitchConnected ||
    displayUser?.twitch_connected ||
    displayUser?.twitchUsername ||
    displayUser?.twitch_username
  );
  const twitchUsername = displayUser?.twitchUsername || displayUser?.twitch_username || null;

  const handleConnectTwitch = () => {
    showNotification(
      isRu
        ? 'Интеграция Twitch находится в разработке'
        : 'Twitch integration coming soon'
    );
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    localStorage.removeItem('peekly_user');
    localStorage.removeItem('peekly_auth');
    localStorage.removeItem('peekly_token');
    document.cookie = 'peekly_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
    document.cookie = 'peekly_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
    document.cookie = 'peekly_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
    window.dispatchEvent(new Event('peekly_user_updated'));
    window.dispatchEvent(new Event('storage'));
    if (onGoHome) onGoHome();
    else window.location.href = '/';
  };

  // Handlers for Account Management
  const handleUpdateNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNick = newNickname.trim();
    if (!cleanNick) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: cleanNick }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Failed to update nickname', true);
      } else {
        setCurrentUser((prev) => (prev ? { ...prev, nickname: cleanNick } : prev));
        try {
          const stored = localStorage.getItem('peekly_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.nickname = cleanNick;
            localStorage.setItem('peekly_user', JSON.stringify(parsed));
          }
          const storedAuth = localStorage.getItem('peekly_auth');
          if (storedAuth) {
            const parsed = JSON.parse(storedAuth);
            parsed.nickname = cleanNick;
            localStorage.setItem('peekly_auth', JSON.stringify(parsed));
          }
          document.cookie = `peekly_user=${encodeURIComponent(
            JSON.stringify({ ...(stored ? JSON.parse(stored) : {}), nickname: cleanNick })
          )}; path=/; max-age=31536000`;
          window.dispatchEvent(new Event('peekly_user_updated'));
          window.dispatchEvent(new Event('storage'));
        } catch {}

        // Immediately update URL to /id/<cleanNick>/
        const targetPath = `/id/${encodeURIComponent(cleanNick)}/`;
        window.history.replaceState({ path: targetPath }, '', targetPath);
        setLocationSearch('');

        setIsNicknameModalOpen(false);
        showNotification(t.successUpdated);
      }
    } catch {
      showNotification('Network error updating nickname', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotification(
        currentLang === 'ru'
          ? 'Размер файла превышает 2 МБ'
          : currentLang === 'uk'
          ? 'Розмір файлу перевищує 2 МБ'
          : 'File size exceeds 2MB',
        true
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      setCurrentUser((prev) => (prev ? { ...prev, avatar: base64Data, avatar_url: base64Data } : prev));
      setAvatarError(false);

      try {
        const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.avatar = base64Data;
          parsed.avatar_url = base64Data;
          localStorage.setItem('peekly_user', JSON.stringify(parsed));
          localStorage.setItem('peekly_auth', JSON.stringify(parsed));
        }
        window.dispatchEvent(new Event('peekly_user_updated'));
        window.dispatchEvent(new Event('storage'));
      } catch {}

      setIsSubmitting(true);
      try {
        const res = await fetch('/api/users/avatar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-User': currentUser?.nickname || 'Zeacvo',
          },
          body: JSON.stringify({ avatar: base64Data }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          const fallbackRes = await fetch('/api/auth/update-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar: base64Data }),
          });
          const fallbackData = await fallbackRes.json();
          if (!fallbackRes.ok || !fallbackData.success) {
            showNotification(data.error || fallbackData.error || 'Failed to update avatar', true);
          } else {
            showNotification(t.successUpdated);
          }
        } else {
          showNotification(t.successUpdated);
        }
      } catch {
        showNotification(t.successUpdated);
      } finally {
        setIsSubmitting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAvatar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // 1. Immediately update local state in ProfilePage
      setCurrentUser((prev) => (prev ? { ...prev, avatar: '', avatar_url: '' } : prev));
      setAvatarError(false);

      // 2. Immediately update localStorage for synchronous UI update
      try {
        const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.avatar = '';
          parsed.avatar_url = '';
          parsed.picture = '';
          parsed.avatarUrl = '';
          localStorage.setItem('peekly_user', JSON.stringify(parsed));
          localStorage.setItem('peekly_auth', JSON.stringify(parsed));
        }
        window.dispatchEvent(new Event('peekly_user_updated'));
        window.dispatchEvent(new Event('storage'));
      } catch {}

      // 3. Send DELETE request to clear avatar in Cloudflare D1
      setIsSubmitting(true);
      const res = await fetch('/api/users/avatar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-User': currentUser?.nickname || 'Zeacvo',
        },
      });

      if (!res.ok) {
        // Fallback: POST with avatar: null
        await fetch('/api/users/avatar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-User': currentUser?.nickname || 'Zeacvo',
          },
          body: JSON.stringify({ avatar: null, avatar_url: null }),
        });
      }

      showNotification(isRu ? 'Аватар сброшен до стандартного' : 'Avatar reset to default');
    } catch (err) {
      console.error('Failed to reset avatar', err);
      showNotification('Failed to reset avatar', true);
    } finally {
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setIsSubmitting(true);
    setEmailTestCode(null);
    try {
      const res = await fetch('/api/auth/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', newEmail: newEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Failed to send code', true);
      } else {
        setEmailStep('otp');
        if (data.testCode) {
          setEmailTestCode(data.testCode);
        }
        showNotification(`${t.codeSentTo} ${newEmail}`);
      }
    } catch {
      showNotification('Network error sending verification code', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOtp.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_code',
          newEmail: newEmail.trim(),
          code: emailOtp.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Invalid verification code', true);
      } else {
        setCurrentUser((prev) => (prev ? { ...prev, email: newEmail.trim() } : prev));
        setIsEmailModalOpen(false);
        setEmailStep('input');
        setEmailOtp('');
        setEmailTestCode(null);
        showNotification(t.successUpdated);
      }
    } catch {
      showNotification('Network error verifying code', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      showNotification(t.newPassword, true);
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match', true);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Failed to update password', true);
      } else {
        setIsPasswordModalOpen(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showNotification(t.successUpdated);
      }
    } catch {
      showNotification('Network error updating password', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTerminateOtherSessions = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/terminate-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Failed to terminate sessions', true);
      } else {
        showNotification(t.sessionsTerminatedSuccess);
      }
    } catch {
      showNotification('Network error terminating sessions', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Failed to delete account', true);
        setIsSubmitting(false);
      } else {
        localStorage.removeItem('peekly_user');
        localStorage.removeItem('peekly_auth');
        document.cookie = 'peekly_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
        if (onGoHome) onGoHome();
        else window.location.href = '/';
      }
    } catch {
      showNotification('Network error deleting account', true);
      setIsSubmitting(false);
    }
  };

  if (isLoadingTarget) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36 text-center text-white">
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#FFFFFF] mb-4" />
        <p className="text-xs text-[#929292]">
          {t.checkingAuth}
        </p>
      </div>
    );
  }

  if (isViewOnly && targetNotFound) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36 text-center text-white">
        <AlertTriangle className="w-10 h-10 mx-auto text-[#FFFFFF] mb-4" />
        <h2 className="text-xl font-bold mb-2">{t.userNotFound}</h2>
        <p className="text-[#929292] text-sm mb-6">
          {t.userNotFoundDesc || (isRu ? 'Запрошенный профиль не существует или был удалён.' : 'The requested profile identifier does not exist or has been removed.')}
        </p>
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-bold hover:bg-[#FF5500] hover:text-black transition-colors rounded-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backHome}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#000000] text-white selection:bg-[#FF5500] selection:text-black">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 border text-xs shadow-2xl flex items-center gap-2.5 transition-all ${
            statusMessage.isError
              ? 'bg-[#000000] border-red-500 text-red-200'
              : 'bg-[#000000] border-[#FFFFFF]/30 text-white'
          }`}
        >
          {statusMessage.isError ? (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-white shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Container strictly aligned with max-w-7xl grid */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        {/* Layout: Centered single card when isViewOnly, 2-column grid when private settings */}
        <div className={isViewOnly ? "max-w-md mx-auto w-full space-y-6" : "grid grid-cols-1 lg:grid-cols-12 gap-8"}>
          {/* ========================================================= */}
          {/* Persona Card */}
          {/* ========================================================= */}
          <div className={isViewOnly ? "w-full space-y-6" : "lg:col-span-4 space-y-6"}>
            <div className="bg-[#090909] border border-[#1A1A1F] p-6 relative overflow-hidden">
              {/* Persona Header: Avatar + Nickname + Status */}
              <div className="flex items-start gap-4 mb-5">
                {/* Avatar with hover pencil overlay & reset action */}
                {(() => {
                  const avatarUrl = getUserAvatarUrl(displayUser);
                  const hasCustomAvatar = Boolean(avatarUrl && !avatarError);

                  return (
                    <div className="flex flex-col items-center shrink-0 w-20">
                      <div className="relative group w-20 h-20">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                        />
                        <div
                          onClick={() => {
                            if (!isViewOnly) fileInputRef.current?.click();
                          }}
                          className={`w-20 h-20 rounded-none border border-[#1A1A1F] bg-[#000000] overflow-hidden flex items-center justify-center ${
                            !isViewOnly ? 'cursor-pointer' : ''
                          }`}
                        >
                          {hasCustomAvatar && avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={displayUser?.nickname || 'User'}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={() => setAvatarError(true)}
                            />
                          ) : (
                            <DefaultUserAvatar size={48} className="w-12 h-12 text-white" />
                          )}
                        </div>

                        {/* Hover Pencil Overlay for uploading avatar (only if viewing own profile) */}
                        {!isViewOnly && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer border border-[#FFFFFF] rounded-none"
                            title={t.changeAvatar}
                          >
                            <Edit2 className="w-5 h-5 text-white" />
                          </button>
                        )}
                      </div>

                      {/* Reset Avatar button: visible only when custom avatar is active and viewing own profile */}
                      {hasCustomAvatar && !isViewOnly && (
                        <button
                          type="button"
                          onClick={handleResetAvatar}
                          className="mt-2.5 w-20 flex items-center justify-center gap-1.5 text-[11px] font-mono font-medium text-[#71717A] hover:text-[#EF4444] transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none mx-auto"
                          title={isRu ? 'Сбросить аватар до стандартного' : 'Reset avatar to default'}
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="leading-none whitespace-nowrap">{t.removePhoto || (isRu ? 'Удалить' : 'Remove')}</span>
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Nickname & Network Status */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                  <h1 className="text-lg font-bold font-mono text-[#FFFFFF] tracking-normal truncate">
                    {displayUser?.nickname || 'Zeacvo'}
                  </h1>

                  {/* Статус онлайн */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#929292]">
                    <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isOnline ? 'bg-white animate-pulse' : 'bg-[#555555]'
                        }`}
                      />
                    </div>
                    <span className="leading-none">{isOnline ? t.online : (t.offline || 'Не в сети')}</span>
                  </div>

                  {/* Дата регистрации */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#929292]">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 text-[#929292]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="leading-none">
                      {t.memberSince} {registrationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Integrations Stack: FACEIT, Twitch (hidden in public view if neither connected) */}
              {(!isViewOnly || isFaceitLinked || isTwitchConnected) && (
                <div className="flex flex-col gap-2 mt-4">
                  {/* 1. FACEIT */}
                  {(!isViewOnly || isFaceitLinked) && (
                    <div className="flex items-center justify-between p-2.5 bg-[#000000] border border-[#1A1A1F] rounded-none">
                      <div className="flex items-center gap-2.5">
                        <FaceitLogo className="w-4 h-4 text-[#FF5500]" />
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-[#FFFFFF] tracking-wider">
                            FACEIT
                          </span>
                          <span className="font-mono text-[10px] text-[#929292]">
                            {isFaceitLinked ? (t.connected || 'Connected') : (t.notConnected || 'Not connected')}
                          </span>
                        </div>
                      </div>
                      {isFaceitLinked ? (
                        <a
                          href={`https://www.faceit.com/en/players/${encodeURIComponent(
                            displayUser?.faceit_nickname || displayUser?.faceitNickname || displayUser?.nickname || 'Zeacvo'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 flex items-center justify-center border border-[#222228] text-[#929292] hover:text-[#000000] hover:bg-[#FF5500] hover:border-[#FF5500] transition-colors rounded-none"
                          title="Open FACEIT profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : !isViewOnly ? (
                        <a
                          href="/api/auth/faceit/login"
                          className="px-3 py-1 text-[10px] font-mono font-medium tracking-wider text-[#929292] hover:text-[#000000] bg-transparent hover:bg-[#FF5500] border border-[#222228] hover:border-[#FF5500] transition-colors rounded-none cursor-pointer"
                        >
                          {t.connect || (isRu ? 'Подключить' : 'Connect')}
                        </a>
                      ) : null}
                    </div>
                  )}

                  {/* 2. TWITCH */}
                  {(!isViewOnly || isTwitchConnected) && (
                    <div className="flex items-center justify-between p-2.5 bg-[#000000] border border-[#1A1A1F] rounded-none">
                      <div className="flex items-center gap-2.5">
                        <TwitchLogo className="w-4 h-4" />
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-[#FFFFFF] tracking-wider">
                            Twitch
                          </span>
                          <span className="font-mono text-[10px] text-[#929292]">
                            {isTwitchConnected ? (t.connected || 'Connected') : (t.notConnected || 'Not connected')}
                          </span>
                        </div>
                      </div>
                      {isTwitchConnected ? (
                        <a
                          href={`https://twitch.tv/${encodeURIComponent(twitchUsername!)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 flex items-center justify-center border border-[#222228] text-[#929292] hover:text-[#000000] hover:bg-[#FF5500] hover:border-[#FF5500] transition-colors rounded-none"
                          title="Open Twitch Channel"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : !isViewOnly ? (
                        <button
                          type="button"
                          onClick={handleConnectTwitch}
                          className="px-3 py-1 text-[10px] font-mono font-medium tracking-wider text-[#929292] hover:text-[#000000] bg-transparent hover:bg-[#FF5500] border border-[#222228] hover:border-[#FF5500] transition-colors rounded-none cursor-pointer"
                        >
                          {t.connect || (isRu ? 'Подключить' : 'Connect')}
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
              )}

              {/* Owner / Admin Console Button (only for Owner and not view-only) */}
              {!isViewOnly && isCurrentOwner && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="btn-action-secondary w-full mt-6"
                >
                  <span>{t.adminConsole}</span>
                </button>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (lg:col-span-8): Apple-Style Account Settings */}
          {/* ========================================================= */}
          {!isViewOnly && (
            <div className="lg:col-span-8 space-y-6">
              {/* Card 1: Account Credentials */}
              <div className="bg-[#090909] border border-[#1A1A1F] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold tracking-wide text-white">
                    {t.credentialsTitle}
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Nickname row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] text-[#929292] font-bold tracking-wide block mb-1">
                        {t.nicknameLabel}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {currentUser?.nickname || 'Commander'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNewNickname(currentUser?.nickname || '');
                        setIsNicknameModalOpen(true);
                      }}
                      className="btn-action-secondary shrink-0"
                    >
                      {t.changeNickname}
                    </button>
                  </div>

                  {/* Email row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] text-[#929292] font-bold tracking-wide block mb-1">
                        {t.emailLabel}
                      </span>
                      <span className="text-sm font-medium text-white break-all">
                        {currentUser?.email || '—'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNewEmail('');
                        setEmailOtp('');
                        setEmailStep('input');
                        setEmailTestCode(null);
                        setIsEmailModalOpen(true);
                      }}
                      className="btn-action-secondary shrink-0"
                    >
                      {t.changeEmail}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Password & Security */}
              <div className="bg-[#090909] border border-[#1A1A1F] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold tracking-wide text-white flex items-center gap-2">
                    <KeyRound className="w-3.5 h-3.5 text-[#929292]" />
                    <span>{t.securityTitle}</span>
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Password Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] text-[#929292] font-bold tracking-wide block mb-1">
                        {t.passwordLabel}
                      </span>
                      <span className="text-sm text-neutral-300 font-medium tracking-widest">
                        ••••••••••••
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOldPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setIsPasswordModalOpen(true);
                      }}
                      className="btn-action-secondary shrink-0"
                    >
                      {t.changePassword}
                    </button>
                  </div>

                  {/* 2FA Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] text-[#929292] font-bold tracking-wide block mb-1">
                        {t.twoFactorTitle || (isRu ? 'Двухэтапная аутентификация (2FA)' : 'Two-Factor Authentication (2FA)')}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-none ${
                            is2faActive ? 'bg-[#00E676]' : 'bg-[#929292]'
                          }`}
                        />
                        <span
                          className={`text-xs font-mono font-bold tracking-wider ${
                            is2faActive ? 'text-[#00E676]' : 'text-[#929292]'
                          }`}
                        >
                          {is2faActive
                            ? (t.twoFactorActive || (isRu ? 'Включена' : 'Active'))
                            : (t.twoFactorDisabled || (isRu ? 'Отключена' : 'Disabled'))}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTwoFactorCode('');
                        setTwoFactorError(null);
                        setIsTwoFactorModalOpen(true);
                      }}
                      className="btn-action-secondary shrink-0"
                    >
                      {is2faActive
                        ? (t.twoFactorDisable || (isRu ? 'Отключить' : 'Disable'))
                        : (t.twoFactorConfigure || (isRu ? 'Настроить' : 'Configure'))}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Active Sessions */}
              <div className="bg-[#090909] border border-[#1A1A1F] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold tracking-wider text-white flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-[#929292]" />
                    <span>{t.sessionsTitle}</span>
                  </h2>
                </div>

                {(() => {
                  const deviceInfo = getDeviceInfo();
                  return (
                    <div className="flex items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-white block truncate">
                            {t.currentDevice}
                          </span>
                          <span className="text-xs text-[#929292] block truncate">
                            {deviceInfo.browser} ({deviceInfo.os}) • {t.activeNow || (isRu ? 'Активно сейчас' : 'Active now')}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-8 h-8 flex items-center justify-center border border-[#1A1A1F] text-[#929292] hover:text-[#EF4444] hover:border-[#EF4444] transition-colors rounded-none shrink-0 cursor-pointer"
                        title={isRu ? 'Выйти из этого сеанса' : 'Sign out of this session'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })()}

                <button
                  type="button"
                  onClick={handleTerminateOtherSessions}
                  disabled={isSubmitting}
                  className="btn-action-secondary"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1 text-[#929292]" />
                  ) : null}
                  <span>{t.terminateOtherSessions}</span>
                </button>
              </div>

              {/* Card 4: Danger Zone */}
              <div className="bg-[#090909] border border-[#EF4444] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold tracking-wider text-[#EF4444] flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span>{t.dangerZoneTitle || (isRu ? 'Опасная зона' : 'Danger Zone')}</span>
                  </h2>
                  <p className="text-xs text-[#929292] mt-1 leading-relaxed">
                    {t.deleteAccountWarning || (isRu ? 'Удаление вашего аккаунта приведет к безвозвратному удалению всех данных.' : 'Permanently delete your account and all associated data.')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmText('');
                    setIsDeleteModalOpen(true);
                  }}
                  className="h-10 px-4 text-xs font-mono font-medium tracking-wider text-[#EF4444] border border-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444] hover:text-[#FFFFFF] transition-all cursor-pointer rounded-none"
                >
                  {t.deleteAccountBtn || t.deleteAccount || (isRu ? 'Удалить аккаунт' : 'Delete account')}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: Change Nickname */}
      {/* ========================================================= */}
      {isNicknameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-[#1A1A1F] p-6 relative">
            <button
              type="button"
              onClick={() => setIsNicknameModalOpen(false)}
              className="absolute top-4 right-4 text-[#929292] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">
              {t.changeNickname}
            </h3>
            <form onSubmit={handleUpdateNickname} className="space-y-4">
              <div>
                <label className="text-[10px] text-[#929292] font-bold block mb-1.5">
                  {t.newNickname}
                </label>
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  pattern="^[a-zA-Z0-9_-]{3,20}$"
                  required
                  placeholder="NewNickname"
                  className="w-full h-10 px-3 bg-[#090909] border border-[#1A1A1F] focus:border-white text-white text-sm focus:outline-none rounded-none"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNicknameModalOpen(false)}
                  className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                  <span>{t.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: Change Email with 2-Step OTP */}
      {/* ========================================================= */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-[#1A1A1F] p-6 relative">
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(false)}
              className="absolute top-4 right-4 text-[#929292] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">
              {t.changeEmail}
            </h3>

            {emailStep === 'input' ? (
              <form onSubmit={handleSendEmailOtp} className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#929292] font-bold block mb-1.5">
                    {t.newEmail}
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    placeholder="name@domain.com"
                    className="w-full h-10 px-3 bg-[#090909] border border-[#1A1A1F] focus:border-white text-white text-sm focus:outline-none rounded-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs cursor-pointer rounded-none"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
                  >
                    {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                    <span>{t.sendCode}</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyEmailOtp} className="space-y-4">
                <p className="text-xs text-[#929292]">
                  {t.codeSentTo} <strong className="text-white">{newEmail}</strong>
                </p>

                {emailTestCode && (
                  <div className="p-2.5 bg-neutral-900 border border-white/10 text-xs text-[#929292]">
                    Test Mode OTP: <strong className="text-white">{emailTestCode}</strong>
                  </div>
                )}

                <div>
                  <label className="text-[10px] text-[#929292] font-bold block mb-1.5">
                    {t.verificationCode}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="000000"
                    className="w-full h-12 text-center text-xl font-bold tracking-[8px] bg-[#090909] border border-white text-white focus:outline-none rounded-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setEmailStep('input')}
                    className="text-xs text-[#929292] hover:text-white underline cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEmailModalOpen(false)}
                      className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs cursor-pointer rounded-none"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
                    >
                      {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                      <span>{t.verifyAndSave}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: Change Password */}
      {/* ========================================================= */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-[#1A1A1F] p-6 relative">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-[#929292] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">
              {t.changePassword}
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-[10px] text-[#929292] font-bold block mb-1.5">
                  {t.oldPassword}
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 bg-[#090909] border border-[#1A1A1F] focus:border-white text-white text-sm focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#929292] font-bold block mb-1.5">
                  {t.newPassword}
                </label>
                <input
                  type="password"
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 bg-[#090909] border border-[#1A1A1F] focus:border-white text-white text-sm focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#929292] font-bold block mb-1.5">
                  {t.confirmNewPassword}
                </label>
                <input
                  type="password"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 bg-[#090909] border border-[#1A1A1F] focus:border-white text-white text-sm focus:outline-none rounded-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                  <span>{t.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3.5: 2FA Verification / Configuration */}
      {/* ========================================================= */}
      {isTwoFactorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-[#1A1A1F] p-6 relative">
            <button
              type="button"
              onClick={() => {
                setIsTwoFactorModalOpen(false);
                setTwoFactorCode('');
                setTwoFactorError(null);
              }}
              className="absolute top-4 right-4 text-[#929292] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-3 font-mono">
              <KeyRound className="w-4 h-4 text-[#FF5500]" />
              <span>
                {is2faActive
                  ? (isRu ? 'Отключение 2FA' : 'Disable 2FA')
                  : (isRu ? 'Настройка 2FA' : 'Setup 2FA')}
              </span>
            </div>

            <p className="text-xs text-[#929292] leading-relaxed mb-4">
              {is2faActive
                ? (isRu
                    ? 'Для отключения двухэтапной аутентификации введите 6-значный код из вашего приложения-аутентификатора (Google Authenticator, Яндекс Ключ, Aegis или 1Password).'
                    : 'To disable two-factor authentication, enter the 6-digit code from your authenticator app.')
                : (isRu
                    ? 'Отсканируйте QR-код в приложении-аутентификаторе (Google Authenticator, Яндекс Ключ, Aegis или 1Password) или введите секретный ключ вручную, затем введите 6-значный код для активации.'
                    : 'Scan the QR code with your authenticator app (Google Authenticator, Aegis, 1Password) or enter the secret key manually, then enter the 6-digit code to activate.')}
            </p>

            {!is2faActive && otpauthUri && (
              <>
                <div className="flex justify-center p-3 bg-white rounded-none mx-auto w-fit mb-4">
                  <QRCodeSVG
                    value={otpauthUri}
                    size={160}
                    level="M"
                    includeMargin={false}
                  />
                </div>

                <div className="mb-4 p-3 bg-[#090909] border border-[#1A1A1F] flex items-center justify-between">
                  <div className="min-w-0 mr-3">
                    <span className="text-[10px] text-[#929292] font-mono block">
                      {isRu ? 'Секретный ключ (Base32)' : 'Secret Key (Base32)'}
                    </span>
                    <span className="font-mono text-xs text-white tracking-widest select-all break-all">
                      {tempSecret.match(/.{1,4}/g)?.join(' ') || tempSecret}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(tempSecret);
                      showNotification(isRu ? 'Ключ скопирован' : 'Key copied');
                    }}
                    className="shrink-0 px-2.5 py-1 text-[10px] font-mono border border-[#222228] text-[#929292] hover:text-white hover:border-white transition-colors cursor-pointer"
                  >
                    {isRu ? 'Копировать' : 'Copy'}
                  </button>
                </div>
              </>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (twoFactorCode.trim().length !== 6) {
                  setTwoFactorError(
                    isRu ? 'Введите корректный 6-значный код' : 'Enter a valid 6-digit code'
                  );
                  return;
                }
                setIsSubmitting(true);

                if (!is2faActive) {
                  const isValid = verifyTOTPToken(twoFactorCode, tempSecret);
                  if (isValid) {
                    setIs2faActive(true);
                    setTwoFactorSecret(tempSecret);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('peekly_2fa', 'true');
                      localStorage.setItem('peekly_2fa_secret', tempSecret);
                      try {
                        const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
                        if (stored) {
                          const p = JSON.parse(stored);
                          p.twoFactorEnabled = true;
                          p.twoFactorSecret = tempSecret;
                          localStorage.setItem('peekly_user', JSON.stringify(p));
                          localStorage.setItem('peekly_auth', JSON.stringify(p));
                        }
                        window.dispatchEvent(new Event('peekly_user_updated'));
                        window.dispatchEvent(new Event('storage'));
                      } catch {}
                    }
                    setIsSubmitting(false);
                    setIsTwoFactorModalOpen(false);
                    setTwoFactorCode('');
                    showNotification(
                      isRu ? '2FA успешно активирована' : '2FA successfully activated'
                    );
                  } else {
                    setIsSubmitting(false);
                    setTwoFactorError(
                      isRu
                        ? 'Неверный код подтверждения. Проверьте время на телефоне.'
                        : 'Invalid verification code. Check device clock.'
                    );
                  }
                } else {
                  const secToVerify = twoFactorSecret || localStorage.getItem('peekly_2fa_secret') || '';
                  const isValid = !secToVerify || verifyTOTPToken(twoFactorCode, secToVerify);
                  if (isValid) {
                    setIs2faActive(false);
                    setTwoFactorSecret('');
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('peekly_2fa', 'false');
                      localStorage.removeItem('peekly_2fa_secret');
                      try {
                        const stored = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
                        if (stored) {
                          const p = JSON.parse(stored);
                          p.twoFactorEnabled = false;
                          delete p.twoFactorSecret;
                          localStorage.setItem('peekly_user', JSON.stringify(p));
                          localStorage.setItem('peekly_auth', JSON.stringify(p));
                        }
                        window.dispatchEvent(new Event('peekly_user_updated'));
                        window.dispatchEvent(new Event('storage'));
                      } catch {}
                    }
                    setIsSubmitting(false);
                    setIsTwoFactorModalOpen(false);
                    setTwoFactorCode('');
                    showNotification(isRu ? '2FA отключена' : '2FA disabled');
                  } else {
                    setIsSubmitting(false);
                    setTwoFactorError(
                      isRu
                        ? 'Неверный код подтверждения. Проверьте время на телефоне.'
                        : 'Invalid verification code. Check device clock.'
                    );
                  }
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] text-[#929292] font-mono font-bold tracking-wide mb-2">
                  {isRu ? '6-значный код подтверждения' : '6-digit verification code'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setTwoFactorCode(val);
                    if (twoFactorError) setTwoFactorError(null);
                  }}
                  placeholder="000000"
                  className="w-full h-11 bg-[#0F0F11] border border-white/20 focus:border-[#FF5500] text-center text-lg font-mono tracking-[0.5em] text-white placeholder-neutral-600 outline-none rounded-none"
                  autoFocus
                />
                {twoFactorError && (
                  <span className="text-xs text-[#FF1744] block mt-1.5 font-mono">
                    {twoFactorError}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsTwoFactorModalOpen(false);
                    setTwoFactorCode('');
                    setTwoFactorError(null);
                  }}
                  className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs cursor-pointer rounded-none font-mono"
                >
                  {t.cancel || 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || twoFactorCode.trim().length !== 6}
                  className={`px-5 py-2 text-xs font-bold transition-colors rounded-none font-mono ${
                    twoFactorCode.trim().length === 6 && !isSubmitting
                      ? 'bg-white text-black hover:bg-[#FF5500] hover:text-black cursor-pointer'
                      : 'bg-white/10 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" />
                  ) : null}
                  <span>
                    {is2faActive
                      ? (isRu ? 'Подтвердить отключение' : 'Confirm Disable')
                      : (isRu ? 'Активировать 2FA' : 'Activate 2FA')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: Delete Account Confirmation */}
      {/* ========================================================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-[#EF4444] p-6 relative">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteConfirmText('');
              }}
              className="absolute top-4 right-4 text-[#929292] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[#EF4444] font-bold text-sm mb-3">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <span>{t.deleteAccount || (isRu ? 'Удалить аккаунт' : 'Delete account')}</span>
            </div>
            <p className="text-xs text-[#929292] leading-relaxed mb-4">
              {t.deleteAccountConfirm || (isRu ? 'Вы уверены, что хотите удалить аккаунт? Это действие необратимо.' : 'Are you sure you want to delete your account? This action cannot be undone.')}
            </p>
            <div className="mb-6">
              <label className="block text-[11px] font-mono text-[#929292] mb-2">
                {isRu ? 'Введите ваш никнейм ' : 'Type your nickname '}
                <strong className="text-white font-bold tracking-wider">{currentUser?.nickname || 'nickname'}</strong>
                {isRu ? ' для подтверждения:' : ' to confirm:'}
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={currentUser?.nickname || 'nickname'}
                className="w-full h-10 bg-[#0F0F11] border border-white/20 focus:border-[#EF4444] text-white placeholder-neutral-600 px-3 text-xs font-mono outline-none rounded-none"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs cursor-pointer rounded-none font-mono"
              >
                {t.cancel || (isRu ? 'Отмена' : 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isSubmitting || deleteConfirmText.trim() !== (currentUser?.nickname || '')}
                className={`px-5 py-2 text-xs font-bold transition-colors rounded-none font-mono ${
                  deleteConfirmText.trim() === (currentUser?.nickname || '') && !isSubmitting
                    ? 'bg-[#EF4444] hover:bg-red-600 text-white cursor-pointer'
                    : 'bg-[#EF4444]/10 text-[#EF4444]/40 border border-[#EF4444]/30 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                <span>{t.deleteAccount || (isRu ? 'Удалить аккаунт' : 'Delete account')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

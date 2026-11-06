import React, { useState, useEffect, useRef } from 'react';
import { FaceitLogo } from '../components/AuthModal';
import { TwitchLogo } from '../components/icons/TwitchLogo';
import { getUserAvatarUrl } from '../components/UserAvatar';
import { DefaultUserAvatar } from '../components/DefaultUserAvatar';
import {
  KeyRound,
  Laptop,
  AlertTriangle,
  Check,
  Edit2,
  ExternalLink,
  Calendar,
  X,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import type { Language } from '../translations';
import { profileTranslations } from '../data/profileTranslations';

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
  const t = profileTranslations[currentLang] || profileTranslations.en;
  const isRu = currentLang === 'ru';

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser);
  const [targetUser, setTargetUser] = useState<UserProfile | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [isLoadingTarget, setIsLoadingTarget] = useState<boolean>(false);
  const [targetNotFound, setTargetNotFound] = useState<boolean>(false);

  // Modals state
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Hidden File input for direct PC upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const [newNickname, setNewNickname] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

      if (
        (currentNickname && currentNickname.toLowerCase() === cleanId.toLowerCase()) ||
        (currentId && currentId.toLowerCase() === cleanId.toLowerCase())
      ) {
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
  }, [currentUser, locationSearch]);

  // Dynamic Profile URL Auto-Sync:
  // When an authenticated user visits /profile or /id without slug, auto-populate /id/<Nickname>/
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentUser?.nickname && !isViewOnly) {
      const currentPath = window.location.pathname;
      const targetPath = `/id/${encodeURIComponent(currentUser.nickname)}/`;
      if (
        currentPath === '/profile' ||
        currentPath.startsWith('/profile') ||
        currentPath === '/id' ||
        currentPath === '/id/'
      ) {
        if (currentPath !== targetPath) {
          window.history.replaceState({ path: targetPath }, '', targetPath);
          setLocationSearch('');
        }
      }
    }
  }, [currentUser?.nickname, isViewOnly]);

  // Display user: either targetUser (if public view) or currentUser
  const displayUser: UserProfile | null = isViewOnly ? targetUser : currentUser;

  const isOwner =
    displayUser?.nickname?.toLowerCase() === 'zeacvo' ||
    displayUser?.email?.toLowerCase() === 'zeacvo@icloud.com' ||
    displayUser?.role?.toUpperCase() === 'OWNER' ||
    displayUser?.role?.toUpperCase() === 'CEO';

  const isCurrentOwner =
    currentUser?.nickname?.toLowerCase() === 'zeacvo' ||
    currentUser?.email?.toLowerCase() === 'zeacvo@icloud.com' ||
    currentUser?.role?.toUpperCase() === 'OWNER' ||
    currentUser?.role?.toUpperCase() === 'CEO';

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

  // Handlers for Account Management
  const handleUpdateNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNickname.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: newNickname.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotification(data.error || 'Failed to update nickname', true);
      } else {
        setCurrentUser((prev) => (prev ? { ...prev, nickname: newNickname.trim() } : prev));
        try {
          const stored = localStorage.getItem('peekly_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.nickname = newNickname.trim();
            localStorage.setItem('peekly_user', JSON.stringify(parsed));
          }
          window.dispatchEvent(new Event('peekly_user_updated'));
          window.dispatchEvent(new Event('storage'));
        } catch {}
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
        <p className="text-xs uppercase tracking-wider text-[#929292]">
          {t.checkingAuth}
        </p>
      </div>
    );
  }

  if (isViewOnly && targetNotFound) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36 text-center text-white">
        <AlertTriangle className="w-10 h-10 mx-auto text-[#FFFFFF] mb-4" />
        <h2 className="text-xl font-bold uppercase mb-2">{t.userNotFound}</h2>
        <p className="text-[#929292] text-sm mb-6">
          The requested profile identifier does not exist or has been removed.
        </p>
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-bold uppercase hover:bg-neutral-200 transition-colors rounded-none"
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
        {/* Public View Header Banner (if viewing other user) */}
        {isViewOnly && (
          <div className="bg-[#090909] border border-[#1A1A1F] p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-black tracking-widest uppercase text-white">
                  {t.publicProfileTitle}
                </h2>
                <p className="text-xs text-[#929292] mt-0.5">
                  {t.viewOnlyNotice}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#1A1A1F] hover:border-white text-xs font-bold uppercase text-[#929292] hover:text-white transition-colors rounded-none shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backHome}</span>
            </button>
          </div>
        )}

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ========================================================= */}
          {/* LEFT COLUMN (lg:col-span-4): Persona Card */}
          {/* ========================================================= */}
          <div className={`${isViewOnly ? 'lg:col-span-5' : 'lg:col-span-4'} space-y-6`}>
            <div className="bg-[#090909] border border-[#1A1A1F] p-6 relative overflow-hidden">
              {/* Persona Header: Avatar + Nickname + Status */}
              <div className="flex items-start gap-4 mb-5">
                {/* Avatar with hover pencil overlay & reset action */}
                {(() => {
                  const avatarUrl = getUserAvatarUrl(displayUser);
                  const hasCustomAvatar = Boolean(avatarUrl && !avatarError);

                  return (
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative group">
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
                          className={`w-20 h-20 rounded-none border border-[#222228] bg-[#000000] overflow-hidden flex items-center justify-center ${
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
                          className="mt-2 text-[11px] font-mono text-[#929292] hover:text-[#FFFFFF] uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                          title={isRu ? 'Сбросить аватар до стандартного' : 'Reset avatar to default'}
                        >
                          <span>✕</span>
                          <span>{t.removeAvatar || (isRu ? 'Удалить фото' : 'Remove photo')}</span>
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Nickname & Network Status */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold text-white truncate uppercase">
                    {displayUser?.nickname || 'Player'}
                  </h1>

                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#929292]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#929292]" />
                    <span>{t.online}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#929292]">
                    <Calendar className="w-3.5 h-3.5 text-[#929292] shrink-0" />
                    <span>
                      {t.memberSince} {registrationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Integrations Stack: FACEIT, Twitch */}
              <div className="flex flex-col gap-2 mt-4">
                {/* 1. FACEIT */}
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
                  ) : (
                    <a
                      href="/api/auth/faceit/login"
                      className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#929292] hover:text-[#000000] bg-transparent hover:bg-[#FF5500] border border-[#222228] hover:border-[#FF5500] transition-colors rounded-none cursor-pointer"
                    >
                      {t.connect || (isRu ? 'Подключить' : 'Connect')}
                    </a>
                  )}
                </div>

                {/* 2. TWITCH */}
                <div className="flex items-center justify-between p-2.5 bg-[#000000] border border-[#1A1A1F] rounded-none">
                  <div className="flex items-center gap-2.5">
                    <TwitchLogo className="w-4 h-4 text-[#FFFFFF]" />
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold text-[#FFFFFF] tracking-wider">
                        TWITCH
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
                  ) : (
                    <button
                      type="button"
                      onClick={handleConnectTwitch}
                      className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#929292] hover:text-[#000000] bg-transparent hover:bg-[#FF5500] border border-[#222228] hover:border-[#FF5500] transition-colors rounded-none cursor-pointer"
                    >
                      {t.connect || (isRu ? 'Подключить' : 'Connect')}
                    </button>
                  )}
                </div>
              </div>

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
          {!isViewOnly ? (
            <div className="lg:col-span-8 space-y-6">
              {/* Card 1: Account Credentials */}
              <div className="bg-[#090909] border border-[#1A1A1F] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                    {t.credentialsTitle}
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Nickname row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#929292] font-bold tracking-wider block mb-1">
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
                      <span className="text-[10px] uppercase text-[#929292] font-bold tracking-wider block mb-1">
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <KeyRound className="w-3.5 h-3.5 text-[#929292]" />
                    <span>{t.securityTitle}</span>
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-[#929292] font-bold tracking-wider block mb-1">
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
              </div>

              {/* Card 3: Active Sessions */}
              <div className="bg-[#090909] border border-[#1A1A1F] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-[#929292]" />
                    <span>{t.sessionsTitle}</span>
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#929292]" />
                    <div>
                      <span className="text-sm font-bold text-white block">
                        {t.currentDevice}
                      </span>
                      <span className="text-xs text-[#929292]">
                        {t.currentDeviceDesc}
                      </span>
                    </div>
                  </div>
                </div>

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

              {/* Card 4: Danger Zone (Non-owner accounts) */}
              {!isCurrentOwner && (
                <div className="bg-[#090909] border border-red-900/30 p-6">
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>{t.dangerZoneTitle}</span>
                    </h2>
                    <p className="text-xs text-[#929292] mt-1 leading-relaxed">
                      {t.deleteAccountWarning}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="btn-action-interactive h-9 px-4 bg-transparent border-red-600/40 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    {t.deleteAccount}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Public View Summary Card */
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#090909] border border-[#1A1A1F] p-6">
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                    {t.publicProfileTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#000000] border border-[#1A1A1F]">
                    <span className="text-[10px] uppercase text-[#929292] font-bold block mb-1">
                      {t.region}
                    </span>
                    <span className="text-white font-bold">
                      {displayUser?.country || 'BY'}
                    </span>
                  </div>

                  <div className="p-4 bg-[#000000] border border-[#1A1A1F]">
                    <span className="text-[10px] uppercase text-[#929292] font-bold block mb-1">
                      {t.profileId}
                    </span>
                    <span className="text-[#929292] font-bold">
                      {isOwner ? t.ownerBadge : t.freeBadge}
                    </span>
                  </div>
                </div>
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
            <h3 className="text-base font-bold text-white uppercase mb-4">
              {t.changeNickname}
            </h3>
            <form onSubmit={handleUpdateNickname} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-[#929292] font-bold block mb-1.5">
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
                  className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs uppercase cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-white text-black text-xs font-bold uppercase hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
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
            <h3 className="text-base font-bold text-white uppercase mb-4">
              {t.changeEmail}
            </h3>

            {emailStep === 'input' ? (
              <form onSubmit={handleSendEmailOtp} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase text-[#929292] font-bold block mb-1.5">
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
                    className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs uppercase cursor-pointer rounded-none"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-white text-black text-xs font-bold uppercase hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
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
                  <label className="text-[10px] uppercase text-[#929292] font-bold block mb-1.5">
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
                      className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs uppercase cursor-pointer rounded-none"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-white text-black text-xs font-bold uppercase hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
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
            <h3 className="text-base font-bold text-white uppercase mb-4">
              {t.changePassword}
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-[#929292] font-bold block mb-1.5">
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
                <label className="text-[10px] uppercase text-[#929292] font-bold block mb-1.5">
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
                <label className="text-[10px] uppercase text-[#929292] font-bold block mb-1.5">
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
                  className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs uppercase cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-white text-black text-xs font-bold uppercase hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
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
      {/* MODAL 4: Delete Account Confirmation */}
      {/* ========================================================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-red-600/50 p-6 relative">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-[#929292] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-red-500 font-bold text-sm uppercase mb-3">
              <AlertTriangle className="w-5 h-5" />
              <span>{t.deleteAccount}</span>
            </div>
            <p className="text-xs text-[#929292] leading-relaxed mb-6">
              {t.deleteAccountConfirm}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white text-xs uppercase cursor-pointer rounded-none"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase transition-colors cursor-pointer rounded-none"
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                <span>{t.deleteAccount}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

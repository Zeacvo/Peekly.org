import React, { useState, useEffect, useRef } from 'react';
import { FaceitLogo } from '../components/AuthModal';
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
  Copy,
} from 'lucide-react';
import type { Language } from '../translations';
import { profileTranslations } from '../data/profileTranslations';
import { calculateFaceitLevel } from '../../functions/api/storage/usersDb';

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
  role?: string;
  created_at?: string | number;
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
  >
    <circle cx="256" cy="148" r="110" />
    <path d="M72 470c0-110 82-190 184-190s184 80 184 190v12H72v-12z" />
  </svg>
);

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentLang = 'ru',
  onGoHome,
  onOpenAdmin,
}) => {
  const t = profileTranslations[currentLang] || profileTranslations.en;

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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Fetch current authenticated user
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setCurrentUser(data.user);
          try {
            localStorage.setItem('peekly_user', JSON.stringify(data.user));
            localStorage.setItem('peekly_auth', JSON.stringify(data.user));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Inspect query params for public view: /profile?id=... or /profile?userId=...
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const queryId = params.get('id') || params.get('userId');

    if (queryId && queryId.trim()) {
      const cleanId = queryId.trim();
      const currentId = currentUser?.id || currentUser?.guid || currentUser?.nickname;

      if (currentId && (currentId === cleanId || currentUser?.nickname?.toLowerCase() === cleanId.toLowerCase())) {
        // Viewing own profile
        setIsViewOnly(false);
        setTargetUser(null);
      } else {
        // Fetch target user public profile
        setIsLoadingTarget(true);
        setTargetNotFound(false);
        fetch(`/api/users/profile?id=${encodeURIComponent(cleanId)}`)
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
  }, [currentUser]);

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

  const faceitElo = displayUser?.elo ? Number(displayUser.elo) : null;
  const faceitLevel = displayUser?.level || (faceitElo ? calculateFaceitLevel(faceitElo) : 8);

  const registrationDate = displayUser?.created_at
    ? new Date(
        typeof displayUser.created_at === 'number'
          ? displayUser.created_at
          : isNaN(Number(displayUser.created_at))
          ? displayUser.created_at
          : Number(displayUser.created_at)
      ).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '2026';

  const showNotification = (text: string, isError = false) => {
    setStatusMessage({ text, isError });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
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

  const copyEmail = (emailStr?: string) => {
    if (!emailStr) return;
    navigator.clipboard?.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (isLoadingTarget) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36 text-center text-white">
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#FF5500] mb-4" />
        <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
          {t.checkingAuth}
        </p>
      </div>
    );
  }

  if (isViewOnly && targetNotFound) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36 text-center text-white">
        <AlertTriangle className="w-10 h-10 mx-auto text-[#FF5500] mb-4" />
        <h2 className="text-xl font-mono font-bold uppercase mb-2">{t.userNotFound}</h2>
        <p className="text-neutral-400 text-sm font-mono mb-6">
          The requested profile identifier does not exist or has been removed.
        </p>
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#FF5500] transition-colors rounded-none"
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
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 border font-mono text-xs shadow-2xl flex items-center gap-2.5 transition-all ${
            statusMessage.isError
              ? 'bg-red-950/90 border-red-500 text-red-200'
              : 'bg-black/90 border-emerald-500 text-emerald-300'
          }`}
        >
          {statusMessage.isError ? (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Container strictly aligned with max-w-7xl grid */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        {/* Public View Header Banner (if viewing other user) */}
        {isViewOnly && (
          <div className="bg-[#0A0A0E] border border-[#1A1A1F] p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-pulse shrink-0" />
              <div>
                <h2 className="font-mono text-xs font-black tracking-widest uppercase text-white">
                  {t.publicProfileTitle}
                </h2>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  {t.viewOnlyNotice}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-white/20 hover:border-white text-xs font-mono font-bold uppercase text-neutral-300 hover:text-white transition-colors rounded-none shrink-0"
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
            <div className="bg-[#0A0A0E] border border-[#1A1A1F] p-6 relative overflow-hidden">
              {/* Persona Header: Avatar + Nickname + Status */}
              <div className="flex items-start gap-4 mb-5">
                {/* Avatar with hover pencil overlay */}
                <div className="relative group shrink-0">
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
                    {(displayUser?.avatar || displayUser?.avatar_url) &&
                    !avatarError &&
                    !(displayUser?.avatar || displayUser?.avatar_url)?.includes('default_avatar.png') ? (
                      <img
                        src={displayUser.avatar || displayUser.avatar_url}
                        alt={displayUser.nickname}
                        className="w-full h-full object-cover"
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
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer border border-[#FF5500] rounded-none"
                      title={t.changeAvatar}
                    >
                      <Edit2 className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>

                {/* Nickname, Badges, Member Since */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold font-mono text-white truncate uppercase mb-1">
                    {displayUser?.nickname || 'Player'}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {isOwner ? (
                      <span className="bg-[#000000] border border-[#FF5500] text-[#FF5500] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none">
                        {t.ownerBadge}
                      </span>
                    ) : (
                      <span className="bg-[#000000] border border-[#222228] text-[#8F9098] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none">
                        {t.freeBadge}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{t.online}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8F9098]">
                    <Calendar className="w-3.5 h-3.5 text-[#8F9098] shrink-0" />
                    <span>
                      {t.memberSince} {registrationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* FACEIT Integration Block */}
              <div className="border-t border-[#1A1A1F] pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
                    <FaceitLogo className="w-4 h-4" />
                    <span>FACEIT CS2</span>
                  </div>
                  {isFaceitLinked ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                      <Check className="w-3 h-3" />
                      <span>{t.verified}</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-400 font-mono text-[10px] font-bold">
                      {t.notLinked}
                    </span>
                  )}
                </div>

                {isFaceitLinked ? (
                  <div className="space-y-3 font-mono">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-black border border-white/10">
                        <span className="text-[10px] uppercase text-neutral-500 font-bold block mb-0.5">
                          {t.cs2Level}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 bg-white/10 border border-white/20 font-bold text-white text-xs">
                            LVL {faceitLevel}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-black border border-white/10">
                        <span className="text-[10px] uppercase text-neutral-500 font-bold block mb-0.5">
                          {t.cs2Elo}
                        </span>
                        <span className="text-white font-bold text-sm">
                          {faceitElo ? faceitElo.toLocaleString() : '1,699'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-neutral-500">
                        {t.region}: <strong className="text-white">{displayUser?.country || 'BY'}</strong>
                      </span>
                      <a
                        href={`https://www.faceit.com/en/players/${encodeURIComponent(
                          displayUser?.faceit_nickname || displayUser?.nickname || ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#FF5500] hover:text-white transition-colors"
                      >
                        <span>{t.viewOnFaceit}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-xs font-mono text-neutral-400 mb-4 leading-relaxed">
                      {t.faceitNotConnected}
                    </p>
                    {!isViewOnly && (
                      <a
                        href="/api/auth/faceit/login"
                        className="w-full h-9 border border-white/20 bg-white/5 hover:bg-white hover:text-black font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors"
                      >
                        <FaceitLogo className="w-3.5 h-3.5" />
                        <span>{t.connectFaceit}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Owner / Admin Console Button (only for Owner and not view-only) */}
              {!isViewOnly && isCurrentOwner && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="btn-action-interactive w-full h-10 mt-6"
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
              <div className="bg-[#0A0A0E] border border-[#222228] p-6">
                <div className="mb-5 pb-3 border-b border-[#1A1A1F]">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {t.credentialsTitle}
                  </h2>
                </div>

                <div className="space-y-4 font-mono">
                  {/* Nickname row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#8F9098] font-bold tracking-wider block mb-1">
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
                      className="btn-action-interactive h-10 px-5 shrink-0"
                    >
                      {t.changeNickname}
                    </button>
                  </div>

                  {/* Email row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#8F9098] font-bold tracking-wider block mb-1">
                        {t.emailLabel}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white break-all">
                          {currentUser?.email || '—'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          <Check className="w-3 h-3" />
                          <span>{t.verified}</span>
                        </span>
                        {currentUser?.email && (
                          <button
                            type="button"
                            onClick={() => copyEmail(currentUser.email)}
                            className="p-1 text-[#8F9098] hover:text-white transition-colors cursor-pointer"
                            title="Copy email"
                          >
                            {copiedEmail ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
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
                      className="btn-action-interactive h-10 px-5 shrink-0"
                    >
                      {t.changeEmail}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Password & Security */}
              <div className="bg-[#0A0A0E] border border-[#222228] p-6">
                <div className="mb-5 pb-3 border-b border-[#1A1A1F]">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <KeyRound className="w-3.5 h-3.5 text-[#8F9098]" />
                    <span>{t.securityTitle}</span>
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3 font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-[#8F9098] font-bold tracking-wider block mb-1">
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
                    className="btn-action-interactive h-10 px-5 shrink-0"
                  >
                    {t.changePassword}
                  </button>
                </div>
              </div>

              {/* Card 3: Active Sessions */}
              <div className="bg-[#0A0A0E] border border-[#222228] p-6">
                <div className="mb-5 pb-3 border-b border-[#1A1A1F]">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-[#8F9098]" />
                    <span>{t.sessionsTitle}</span>
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#000000] border border-[#1A1A1F] gap-3 font-mono mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="text-sm font-bold text-white block">
                        {t.currentDevice}
                      </span>
                      <span className="text-xs text-[#8F9098]">
                        {t.currentDeviceDesc}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTerminateOtherSessions}
                  disabled={isSubmitting}
                  className="btn-action-interactive h-10 px-5"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1 text-black" />
                  ) : null}
                  <span>{t.terminateOtherSessions}</span>
                </button>
              </div>

              {/* Card 4: Danger Zone (Non-owner accounts) */}
              {!isCurrentOwner && (
                <div className="bg-red-950/10 border border-red-900/30 p-6">
                  <div className="mb-4">
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>{t.dangerZoneTitle}</span>
                    </h2>
                    <p className="text-xs font-mono text-[#8F9098] mt-1 leading-relaxed">
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
              <div className="bg-[#0A0A0E] border border-[#222228] p-6">
                <div className="mb-5 pb-3 border-b border-[#1A1A1F]">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {t.publicProfileTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 bg-[#000000] border border-[#1A1A1F]">
                    <span className="text-[10px] uppercase text-[#8F9098] font-bold block mb-1">
                      {t.region}
                    </span>
                    <span className="text-white font-bold">
                      {displayUser?.country || 'BY'}
                    </span>
                  </div>

                  <div className="p-4 bg-[#000000] border border-[#1A1A1F]">
                    <span className="text-[10px] uppercase text-[#8F9098] font-bold block mb-1">
                      {t.profileId}
                    </span>
                    <span className="text-[#FF5500] font-bold">
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
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-mono font-bold text-white uppercase mb-4">
              {t.changeNickname}
            </h3>
            <form onSubmit={handleUpdateNickname} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1.5">
                  {t.newNickname}
                </label>
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  pattern="^[a-zA-Z0-9_-]{3,20}$"
                  required
                  placeholder="NewNickname"
                  className="w-full h-10 px-3 bg-[#0F0F11] border border-white/20 focus:border-white text-white font-mono text-sm focus:outline-none rounded-none"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNicknameModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-neutral-400 hover:text-white font-mono text-xs uppercase cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#FF5500] transition-colors cursor-pointer rounded-none"
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
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-mono font-bold text-white uppercase mb-4">
              {t.changeEmail}
            </h3>

            {emailStep === 'input' ? (
              <form onSubmit={handleSendEmailOtp} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1.5">
                    {t.newEmail}
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    placeholder="name@domain.com"
                    className="w-full h-10 px-3 bg-[#0F0F11] border border-white/20 focus:border-white text-white font-mono text-sm focus:outline-none rounded-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="px-4 py-2 border border-white/20 text-neutral-400 hover:text-white font-mono text-xs uppercase cursor-pointer rounded-none"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#FF5500] transition-colors cursor-pointer rounded-none"
                  >
                    {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : null}
                    <span>{t.sendCode}</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyEmailOtp} className="space-y-4">
                <p className="text-xs font-mono text-neutral-400">
                  {t.codeSentTo} <strong className="text-white">{newEmail}</strong>
                </p>

                {emailTestCode && (
                  <div className="p-2.5 bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
                    Test Mode OTP: <strong className="text-[#FF5500]">{emailTestCode}</strong>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1.5">
                    {t.verificationCode}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="000000"
                    className="w-full h-12 text-center text-xl font-mono font-bold tracking-[8px] bg-[#0F0F11] border border-white text-white focus:outline-none rounded-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setEmailStep('input')}
                    className="text-xs font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEmailModalOpen(false)}
                      className="px-4 py-2 border border-white/20 text-neutral-400 hover:text-white font-mono text-xs uppercase cursor-pointer rounded-none"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#FF5500] transition-colors cursor-pointer rounded-none"
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
      {/* MODAL 4: Change Password */}
      {/* ========================================================= */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-[#1A1A1F] p-6 relative">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-mono font-bold text-white uppercase mb-4">
              {t.changePassword}
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1.5">
                  {t.oldPassword}
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 bg-[#0F0F11] border border-white/20 focus:border-white text-white font-mono text-sm focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1.5">
                  {t.newPassword}
                </label>
                <input
                  type="password"
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 bg-[#0F0F11] border border-white/20 focus:border-white text-white font-mono text-sm focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1.5">
                  {t.confirmNewPassword}
                </label>
                <input
                  type="password"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 bg-[#0F0F11] border border-white/20 focus:border-white text-white font-mono text-sm focus:outline-none rounded-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-neutral-400 hover:text-white font-mono text-xs uppercase cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#FF5500] transition-colors cursor-pointer rounded-none"
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
      {/* MODAL 5: Delete Account Confirmation */}
      {/* ========================================================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000000] border border-red-600/50 p-6 relative">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-red-500 font-mono font-bold text-sm uppercase mb-3">
              <AlertTriangle className="w-5 h-5" />
              <span>{t.deleteAccount}</span>
            </div>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed mb-6">
              {t.deleteAccountConfirm}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-white/20 text-neutral-400 hover:text-white font-mono text-xs uppercase cursor-pointer rounded-none"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDeleteAccount}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer rounded-none"
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

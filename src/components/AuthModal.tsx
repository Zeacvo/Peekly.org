import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PeeklyLogo } from './PeeklyLogo';
import {
  isValidEmail,
  isValidNickname,
  checkPasswordRequirements,
} from '../../functions/api/utils/auth.ts';

export const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const AppleLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.87-.9.04-2 .6-2.65 1.36-.58.65-1.09 1.73-1.01 2.77 1 .08 2.03-.51 2.65-1.26z" />
  </svg>
);

export const FaceitLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
    <path
      d="M23.999 2.705a.167.167 0 00-.312-.1 1141.27 1141.27 0 00-6.053 9.375H.218c-.221 0-.301.282-.11.352 7.227 2.73 17.667 6.836 23.5 9.134.15.06.39-.08.39-.18z"
      fill="#FF5500"
    />
  </svg>
);

export const PrivacyIcon: React.FC<{ className?: string }> = ({
  className = 'text-neutral-400 mb-2 shrink-0',
}) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.9C9.47 18.84 7.4 16.64 6.8 14C7.86 13.36 9.8 13 12 13C14.2 13 16.14 13.36 17.2 14C16.6 16.64 14.53 18.84 12 19.9Z" />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (session: {
    nickname: string;
    email: string;
    country: string;
    elo: number;
    level: number;
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [view, setView] = useState<'login' | 'register' | 'verify'>('login');
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [devCode, setDevCode] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleClose = useCallback(() => {
    setError(null);
    setSuccessNotice(null);
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Dynamic Apple Password Requirements
  const pwReqs = useMemo(() => checkPasswordRequirements(password), [password]);
  const isConfirmMismatch =
    Boolean(confirmPassword) && password !== confirmPassword;

  if (!isOpen) return null;

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    setError(null);
    alert(
      `${provider === 'google' ? 'Google' : 'Apple'} Sign-In is configured for production. Please use Email or FACEIT for instant verification.`
    );
  };

  const handleContinueEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Invalid email or password.');
        setIsLoading(false);
        return;
      }

      const sessionData = data.user;
      try {
        localStorage.setItem('peekly_auth', JSON.stringify(sessionData));
        localStorage.setItem('peekly_user', JSON.stringify(sessionData));
        window.dispatchEvent(new Event('storage'));
      } catch {}

      if (onLoginSuccess) {
        onLoginSuccess(sessionData);
      }
      onClose();
    } catch (err) {
      setError(`Connection error: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNickname = nickname.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanNickname) {
      setError('Nickname is required.');
      return;
    }
    if (!isValidNickname(cleanNickname)) {
      setError(
        'Nickname must be 3-20 characters long and contain only Latin letters, numbers, underscores, or hyphens.'
      );
      return;
    }
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!pwReqs.isValid) {
      setError('Please meet all password requirements listed in the checklist.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: cleanNickname,
          email: cleanEmail,
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Registration failed.');
        setIsLoading(false);
        return;
      }

      // Transition to code verification screen
      if (data?.devCode) {
        setDevCode(data.devCode);
      }
      setSuccessNotice(`Verification code sent to ${cleanEmail}`);
      setView('verify');
    } catch (err) {
      setError(`Connection error: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = verificationCode.trim().replace(/\D/g, '');
    const cleanEmail = email.trim().toLowerCase();

    if (cleanCode.length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          code: cleanCode,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Invalid or expired verification code.');
        setIsLoading(false);
        return;
      }

      const sessionData = data.user;
      try {
        localStorage.setItem('peekly_auth', JSON.stringify(sessionData));
        localStorage.setItem('peekly_user', JSON.stringify(sessionData));
        window.dispatchEvent(new Event('storage'));
      } catch {}

      if (onLoginSuccess) {
        onLoginSuccess(sessionData);
      }
      onClose();
    } catch (err) {
      setError(`Verification error: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setError(null);
    setSuccessNotice('Sending new code...');

    try {
      const res = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || 'Failed to resend code.');
        setSuccessNotice(null);
        return;
      }
      if (data?.devCode) {
        setDevCode(data.devCode);
      }
      setSuccessNotice('A new 6-digit code has been sent!');
    } catch {
      setError('Failed to resend code. Please check your connection.');
      setSuccessNotice(null);
    }
  };

  // Strength Bar Colors
  let strengthColor = 'bg-neutral-600';
  let strengthLabel = 'Weak';
  if (pwReqs.score > 0 && pwReqs.score < 40) {
    strengthColor = 'bg-red-500';
    strengthLabel = 'Weak';
  } else if (pwReqs.score >= 40 && pwReqs.score <= 70) {
    strengthColor = 'bg-yellow-500';
    strengthLabel = 'Medium';
  } else if (pwReqs.score > 70) {
    strengthColor = 'bg-emerald-500';
    strengthLabel = 'Strong';
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-[460px] max-h-[92vh] overflow-y-auto bg-black border border-white/15 p-7 sm:p-8 relative shadow-2xl rounded-none">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 transition-colors cursor-pointer rounded-none"
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Center Logo */}
        <div className="flex justify-center mb-1">
          <PeeklyLogo size={36} className="text-white h-9 w-auto" />
        </div>

        {error && (
          <div className="my-3 p-2.5 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono text-center rounded-none">
            {error}
          </div>
        )}

        {successNotice && (
          <div className="my-3 p-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center rounded-none">
            {successNotice}
          </div>
        )}

        {/* =========================================================================
            VIEW 1: SIGN IN - STEP 1 (EMAIL)
           ========================================================================= */}
        {view === 'login' && step === 1 && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-5 font-sans">
              Sign in to Peekly
            </h2>

            <div className="w-full flex flex-col gap-3.5">
              {/* Social Auth Buttons (Google, Apple, FACEIT) */}
              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
                >
                  <GoogleLogo className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('apple')}
                  className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
                >
                  <AppleLogo className="w-4 h-4" />
                  <span>Continue with Apple</span>
                </button>

                <a
                  href="/api/auth/faceit/login"
                  className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
                >
                  <FaceitLogo className="w-4 h-4" />
                  <span>Sign in with FACEIT</span>
                </a>
              </div>

              {/* Clean Divider with OR */}
              <div className="w-full flex items-center my-1">
                <div className="flex-1 border-t border-white/10" />
                <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  OR
                </span>
                <div className="flex-1 border-t border-white/10" />
              </div>

              {/* Email Form */}
              <form
                onSubmit={handleContinueEmail}
                noValidate
                className="w-full flex flex-col gap-3.5"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                  autoFocus
                />

                <div className="w-full flex justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      setView('register');
                      setError(null);
                      setSuccessNotice(null);
                    }}
                    className="text-xs text-neutral-400 hover:text-white transition font-mono cursor-pointer text-left"
                  >
                    Create Your Peekly Account ↗
                  </button>
                </div>

                {/* Privacy Disclaimer */}
                <div className="w-full flex flex-col items-center text-center my-1">
                  <PrivacyIcon />
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-[340px] mx-auto">
                    Your Peekly Account information is used to allow you to sign in
                    securely and access your CS2 stats.{' '}
                    <a
                      href="/legal/account-privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition"
                    >
                      See how your data is managed...
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!email.trim()}
                  className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                    !email.trim()
                      ? 'bg-white/20 text-neutral-400 cursor-not-allowed border-none shadow-none'
                      : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-sm'
                  }`}
                >
                  CONTINUE
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 1: SIGN IN - STEP 2 (PASSWORD)
           ========================================================================= */}
        {view === 'login' && step === 2 && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-5 font-sans">
              Sign in to Peekly
            </h2>

            <form
              onSubmit={handleSignIn}
              noValidate
              className="w-full flex flex-col gap-4"
            >
              <div className="w-full flex flex-col">
                <div className="w-full h-11 border border-white/20 border-b-0 bg-black px-3.5 flex items-center justify-between rounded-none">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 mr-2">
                      Email:
                    </span>
                    <span className="text-white text-sm font-sans truncate">
                      {email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError(null);
                      setSuccessNotice(null);
                    }}
                    className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer shrink-0"
                  >
                    Edit
                  </button>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono w-full">
                <label className="flex items-center gap-2 text-neutral-400 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-white bg-black border border-white/20 w-3.5 h-3.5 rounded-none cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert(`A password reset link will be sent to ${email}`)
                  }
                  className="text-neutral-400 hover:text-white cursor-pointer"
                >
                  Forgot password? ↗
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                  isLoading || !password.trim()
                    ? 'bg-white/20 text-neutral-400 cursor-not-allowed border-none shadow-none'
                    : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-sm'
                }`}
              >
                {isLoading ? 'PLEASE WAIT...' : 'SIGN IN'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError(null);
                }}
                className="text-xs font-mono text-neutral-400 hover:text-white transition cursor-pointer text-center"
              >
                ← Back to email
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: CREATE ACCOUNT (WITH APPLE PASSWORD POPOVER)
           ========================================================================= */}
        {view === 'register' && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-1 font-sans">
              Create Your Peekly Account
            </h2>
            <p className="text-xs text-neutral-400 text-center mb-5 font-mono leading-relaxed">
              One Peekly Account is all you need. Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setView('login');
                  setStep(1);
                  setError(null);
                  setSuccessNotice(null);
                }}
                className="text-white hover:text-neutral-300 ml-1 cursor-pointer transition font-mono"
              >
                Sign in ↗
              </button>
            </p>

            {/* Social Auth Buttons */}
            <div className="w-full flex flex-col gap-2.5 mb-3.5">
              <button
                type="button"
                onClick={() => handleSocialAuth('google')}
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth('apple')}
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
              >
                <AppleLogo className="w-4 h-4" />
                <span>Continue with Apple</span>
              </button>

              <a
                href="/api/auth/faceit/login"
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
              >
                <FaceitLogo className="w-4 h-4" />
                <span>Sign in with FACEIT</span>
              </a>
            </div>

            {/* Clean Divider with OR */}
            <div className="w-full flex items-center my-2">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                OR
              </span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Registration Form */}
            <form
              onSubmit={handleRegisterSubmit}
              noValidate
              className="w-full flex flex-col gap-3"
            >
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname (e.g. Zeacvo)"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                autoFocus
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (e.g. user@example.com)"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
              />

              {/* Password Input with Popover Anchor */}
              <div className="w-full relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  placeholder="Password"
                  className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                />

                {/* Apple Password Requirements Popover */}
                {(isPasswordFocused || password.length > 0) && (
                  <div className="w-full mt-2 p-3.5 bg-[#0D0D0D] border border-white/20 rounded-none shadow-2xl animate-fade-in font-sans">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-neutral-400">Password Strength:</span>
                      <span
                        className={`font-bold ${
                          strengthLabel === 'Strong'
                            ? 'text-emerald-400'
                            : strengthLabel === 'Medium'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {strengthLabel}
                      </span>
                    </div>

                    {/* Dynamic Strength Progress Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-none overflow-hidden mb-3">
                      <div
                        className={`h-full transition-all duration-300 ${strengthColor}`}
                        style={{ width: `${Math.max(10, pwReqs.score)}%` }}
                      />
                    </div>

                    {/* Apple Requirements Checklist */}
                    <div className="space-y-1.5 text-xs">
                      <div
                        className={`flex items-center gap-2 transition-colors ${
                          pwReqs.hasLength ? 'text-emerald-400 font-medium' : 'text-neutral-500'
                        }`}
                      >
                        <span>{pwReqs.hasLength ? '✓' : '•'}</span>
                        <span>At least 8 characters.</span>
                      </div>

                      <div
                        className={`flex items-center gap-2 transition-colors ${
                          pwReqs.hasNumber ? 'text-emerald-400 font-medium' : 'text-neutral-500'
                        }`}
                      >
                        <span>{pwReqs.hasNumber ? '✓' : '•'}</span>
                        <span>At least 1 number.</span>
                      </div>

                      <div
                        className={`flex items-center gap-2 transition-colors ${
                          pwReqs.hasUpper ? 'text-emerald-400 font-medium' : 'text-neutral-500'
                        }`}
                      >
                        <span>{pwReqs.hasUpper ? '✓' : '•'}</span>
                        <span>At least 1 uppercase letter.</span>
                      </div>

                      <div
                        className={`flex items-center gap-2 transition-colors ${
                          pwReqs.hasLower ? 'text-emerald-400 font-medium' : 'text-neutral-500'
                        }`}
                      >
                        <span>{pwReqs.hasLower ? '✓' : '•'}</span>
                        <span>At least 1 lowercase letter.</span>
                      </div>

                      <div
                        className={`flex items-center gap-2 transition-colors ${
                          pwReqs.hasSpecial ? 'text-emerald-400 font-medium' : 'text-neutral-500'
                        }`}
                      >
                        <span>{pwReqs.hasSpecial ? '✓' : '•'}</span>
                        <span>At least one special character (!@#$%^&*).</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-neutral-400 italic mt-2.5 pt-2 border-t border-white/10 font-sans">
                      Avoid using a password that you use with other websites.
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="w-full">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className={`w-full h-11 bg-black border text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans ${
                    isConfirmMismatch
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/20 focus:border-white'
                  }`}
                />
                {isConfirmMismatch && (
                  <p className="text-red-400 text-xs font-mono mt-1 text-left">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  isLoading ||
                  !nickname.trim() ||
                  !email.trim() ||
                  !pwReqs.isValid ||
                  password !== confirmPassword
                }
                className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                  isLoading ||
                  !nickname.trim() ||
                  !email.trim() ||
                  !pwReqs.isValid ||
                  password !== confirmPassword
                    ? 'bg-white/20 text-neutral-400 cursor-not-allowed border-none shadow-none'
                    : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-sm'
                }`}
              >
                {isLoading ? 'PLEASE WAIT...' : 'CREATE ACCOUNT'}
              </button>

              {/* Privacy Disclaimer */}
              <div className="w-full flex flex-col items-center text-center my-1">
                <PrivacyIcon />
                <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-[340px] mx-auto">
                  Your Peekly Account information is used to allow you to sign in securely
                  and protect your account.{' '}
                  <a
                    href="/legal/account-privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    See how your data is managed...
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: OTP EMAIL VERIFICATION CODE
           ========================================================================= */}
        {view === 'verify' && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-1 font-sans">
              Enter Verification Code
            </h2>
            <p className="text-xs text-neutral-400 text-center mb-5 font-mono leading-relaxed">
              A 6-digit code has been sent to your email: <br />
              <span className="text-white font-bold">{email}</span>
            </p>

            {devCode && (
              <div className="mb-4 p-2.5 bg-[#141414] border border-[#FF5500]/40 text-center">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mr-2">
                  Dev Test Code:
                </span>
                <button
                  type="button"
                  onClick={() => setVerificationCode(devCode)}
                  className="font-mono text-sm font-bold text-[#FF5500] hover:underline cursor-pointer"
                  title="Click to autofill code"
                >
                  {devCode} (Click to fill)
                </button>
              </div>
            )}

            <form
              onSubmit={handleVerifyCodeSubmit}
              noValidate
              className="w-full flex flex-col gap-4"
            >
              <div className="w-full">
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="000000"
                  className="w-full h-13 bg-black border border-white/20 focus:border-white text-white font-mono text-2xl tracking-[0.6em] sm:tracking-[0.8em] text-center uppercase outline-none rounded-none transition"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                  isLoading || verificationCode.length !== 6
                    ? 'bg-white/20 text-neutral-400 cursor-not-allowed border-none shadow-none'
                    : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-sm'
                }`}
              >
                {isLoading ? 'VERIFYING...' : 'VERIFY & COMPLETE'}
              </button>

              <div className="flex items-center justify-between text-xs font-mono w-full text-neutral-400">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="hover:text-white transition cursor-pointer"
                >
                  Didn't receive a code? Resend
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setView('register');
                    setError(null);
                    setSuccessNotice(null);
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  ← Edit details
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

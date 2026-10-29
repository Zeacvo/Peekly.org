import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PeeklyLogo } from './PeeklyLogo';
import { isValidEmail, isValidNickname, checkPasswordRequirements } from '../../functions/api/utils/auth.ts';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          [key: string]: unknown;
        }
      ) => string;
      reset?: (widgetId?: string) => void;
      remove?: (widgetId?: string) => void;
    };
  }
}

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

export const ExclamationIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5 shrink-0' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-9.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5.5zm0 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z"
      clipRule="evenodd"
    />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialError?: string | null;
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
  initialError,
  onLoginSuccess,
}) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // Password visibility toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mandatory terms agreement checkbox
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Form validation & focus states
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Opt-in for announcements & updates (default enabled)
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(initialError || null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const widgetIdRef = useRef<string | null>(null);

  // Derived validation states
  const isNicknameValid = isValidNickname(nickname);
  const isEmailValid = isValidEmail(email);
  const pwdReq = checkPasswordRequirements(password);
  const isConfirmValid = confirmPassword.length > 0 && confirmPassword === password;

  const showNicknameError = nicknameTouched && !isNicknameValid;
  const showEmailError = emailTouched && !isEmailValid;
  const showPasswordError = passwordTouched && !pwdReq.isValid && !isPasswordFocused;
  const showConfirmError = confirmPasswordTouched && !isConfirmValid;
  const showLoginEmailError = emailTouched && email.trim().length > 0 && !isEmailValid;

  const isRegisterFormValid =
    isNicknameValid &&
    isEmailValid &&
    pwdReq.isValid &&
    isConfirmValid &&
    Boolean(turnstileToken) &&
    termsAgreed;

  const getStrengthColor = (score: number) => {
    if (score < 40) return 'bg-[#FF1744]';
    if (score < 100) return 'bg-[#FF5500]';
    return 'bg-[#00E676]';
  };

  const requirements = [
    { met: pwdReq.hasLength, label: 'At least 8 characters' },
    { met: pwdReq.hasNumber, label: 'At least 1 number' },
    { met: pwdReq.hasUpper, label: 'At least 1 uppercase letter' },
    { met: pwdReq.hasLower, label: 'At least 1 lowercase letter' },
    { met: pwdReq.hasSpecial, label: 'At least one special character' },
  ];

  const resetFormValidation = () => {
    setNicknameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
    setConfirmPasswordTouched(false);
    setIsPasswordFocused(false);
    setTermsAgreed(false);
    setShowLoginPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  useEffect(() => {
    if (initialError) {
      setError(initialError);
    }
  }, [initialError]);

  const handleClose = useCallback(() => {
    setError(null);
    setInfoNotice(null);
    resetFormValidation();
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

  // Turnstile Widget lifecycle
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isOpen && view === 'register') {
      const renderWidget = () => {
        const container = document.getElementById('turnstile-container');
        if (window.turnstile && container) {
          if (container.childElementCount > 0) return true;
          try {
            widgetIdRef.current = window.turnstile.render('#turnstile-container', {
              sitekey: '0x4AAAAAAFqpQSJmI_csGCP9',
              theme: 'dark',
              callback: (token: string) => setTurnstileToken(token),
              'expired-callback': () => setTurnstileToken(''),
              'error-callback': () => setTurnstileToken(''),
            });
            return true;
          } catch (err) {
            console.warn('[Turnstile] render error:', err);
            return false;
          }
        }
        return false;
      };

      if (!renderWidget()) {
        timer = setInterval(() => {
          if (renderWidget() && timer) {
            clearInterval(timer);
            timer = null;
          }
        }, 120);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
      widgetIdRef.current = null;
      setTurnstileToken('');
    };
  }, [isOpen, view]);

  if (!isOpen) return null;

  const handleGoogleSignIn = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setError(null);
    setEmailTouched(false);
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: `${window.location.origin}/api/auth/callback/google`,
      client_id: '175792545120-g65mab5slga4lsoc5asdm8ruii9u15ia.apps.googleusercontent.com',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
  };

  const handleContinueEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError('Enter a valid email address to use as your account email.');
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
    setNicknameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    const cleanNickname = nickname.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!isValidNickname(cleanNickname)) {
      setError('3 to 20 characters, letters and numbers only.');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setError('Enter a valid email address to use as your account email.');
      return;
    }
    const currentPwdReq = checkPasswordRequirements(password);
    if (!currentPwdReq.isValid) {
      setError('Must meet all password requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAgreed) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    if (!turnstileToken) {
      setError('Please complete the Cloudflare Turnstile human verification.');
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
          turnstileToken,
          newsletterOptIn,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 409) {
          const conflictMsg =
            data?.error ||
            (data?.field === 'email'
              ? 'Email already registered. Please sign in instead.'
              : 'Username is already taken. Please choose another.');
          setError(conflictMsg);
          if (
            data?.field === 'nickname' ||
            data?.error?.toLowerCase().includes('nickname') ||
            data?.error?.toLowerCase().includes('username')
          ) {
            setNicknameTouched(true);
          } else {
            setEmailTouched(true);
          }
        } else {
          setError(data?.error || 'Registration failed.');
        }

        if (window.turnstile?.reset) {
          try {
            window.turnstile.reset(widgetIdRef.current || undefined);
          } catch {}
          setTurnstileToken('');
        }
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
      if (window.turnstile?.reset) {
        try {
          window.turnstile.reset(widgetIdRef.current || undefined);
        } catch {}
        setTurnstileToken('');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="w-full max-w-[420px] max-h-[92vh] overflow-y-auto bg-black border border-white/15 p-7 sm:p-8 relative shadow-2xl rounded-none">
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

        {error && view === 'login' && (
          <div className="my-3 p-2.5 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono text-center rounded-none">
            {error}
          </div>
        )}

        {infoNotice && (
          <div className="my-3 p-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center rounded-none">
            {infoNotice}
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
              {/* Social Auth Buttons (Google, FACEIT) */}
              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
                >
                  <GoogleLogo className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>

                <a
                  href="/api/auth/faceit/login"
                  className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
                >
                  <FaceitLogo className="w-4 h-4" />
                  <span>Continue with FACEIT</span>
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
                <div className="w-full flex flex-col">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!emailTouched) setEmailTouched(true);
                    }}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Email"
                    className={`w-full h-11 bg-[#0F0F11] border ${
                      showLoginEmailError
                        ? '!border-[#FF1744] bg-[#FF1744]/5'
                        : 'border-white/15 focus:border-white/50'
                    } text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition-colors font-sans`}
                  />
                  {showLoginEmailError && (
                    <span className="text-xs text-[#FF1744] flex items-center gap-1.5 mt-1 font-mono tracking-tight">
                      <ExclamationIcon />
                      <span>Enter a valid email address to use as your account email.</span>
                    </span>
                  )}
                </div>

                <div className="w-full flex justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      setView('register');
                      setError(null);
                      resetFormValidation();
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
                    }}
                    className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer shrink-0"
                  >
                    Edit
                  </button>
                </div>

                <div className="relative w-full">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-11 bg-[#0F0F11] border border-white/15 focus:border-white/50 text-white placeholder-neutral-500 pl-3.5 pr-10 text-sm outline-none rounded-none transition font-sans"
                    autoFocus
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1 flex items-center justify-center focus:outline-none"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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
                  onClick={() => {
                    setError(null);
                    setInfoNotice(
                      email.trim()
                        ? `A password reset link will be sent to ${email}`
                        : 'Please enter your email address to receive a password reset link.'
                    );
                  }}
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
            VIEW 2: CREATE ACCOUNT (WITH TURNSTILE HUMAN VERIFICATION)
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
                  resetFormValidation();
                }}
                className="text-white hover:text-neutral-300 ml-1 cursor-pointer transition font-mono"
              >
                Sign in ↗
              </button>
            </p>

            {/* Social Auth Buttons (Google, FACEIT) */}
            <div className="w-full flex flex-col gap-2.5 mb-3.5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>

              <a
                href="/api/auth/faceit/login"
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
              >
                <FaceitLogo className="w-4 h-4" />
                <span>Continue with FACEIT</span>
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
              {/* Nickname Input */}
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    if (error) setError(null);
                    if (!nicknameTouched) setNicknameTouched(true);
                  }}
                  onBlur={() => setNicknameTouched(true)}
                  placeholder="Nickname"
                  className={`w-full h-11 bg-[#0F0F11] border ${
                    showNicknameError
                      ? '!border-[#FF1744] bg-[#FF1744]/5'
                      : 'border-white/15 focus:border-white/50'
                  } text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition-colors font-sans`}
                />
                {showNicknameError && (
                  <span className="text-xs text-[#FF1744] flex items-center gap-1.5 mt-1 font-mono tracking-tight">
                    <ExclamationIcon />
                    <span>3 to 20 characters, letters and numbers only.</span>
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="w-full flex flex-col">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                    if (!emailTouched) setEmailTouched(true);
                  }}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="Email address"
                  className={`w-full h-11 bg-[#0F0F11] border ${
                    showEmailError
                      ? '!border-[#FF1744] bg-[#FF1744]/5'
                      : 'border-white/15 focus:border-white/50'
                  } text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition-colors font-sans`}
                />
                {showEmailError && (
                  <span className="text-xs text-[#FF1744] flex items-center gap-1.5 mt-1 font-mono tracking-tight">
                    <ExclamationIcon />
                    <span>Enter a valid email address to use as your account email.</span>
                  </span>
                )}
              </div>

              {/* Password Input with Dynamic Apple-style Popover */}
              <div className="w-full flex flex-col">
                <div className="relative w-full">
                  {isPasswordFocused && (
                    <div
                      className="absolute bottom-full left-0 mb-2 w-full sm:w-[340px] bg-[#141416] border border-white/20 p-4 shadow-2xl z-50 rounded-none pointer-events-none"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-1.5">
                        <span>Strength: {pwdReq.score}%</span>
                      </div>
                      <div className="w-full h-[3px] bg-white/10 rounded-none overflow-hidden mb-3">
                        <div
                          className={`h-full transition-all duration-200 ${getStrengthColor(pwdReq.score)}`}
                          style={{ width: `${pwdReq.score}%` }}
                        />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-200 mt-1 mb-2">
                        Password Requirements
                      </div>
                      <div className="space-y-1.5 font-mono text-xs">
                        {requirements.map((req, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 transition-colors ${
                              req.met ? 'text-[#00E676] font-semibold' : 'text-neutral-500 font-normal'
                            }`}
                          >
                            <span className={`w-3.5 text-center shrink-0 ${req.met ? 'text-[#00E676] font-bold' : 'opacity-40'}`}>
                              {req.met ? '✓' : '•'}
                            </span>
                            <span>{req.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] leading-relaxed text-neutral-400 mt-3 pt-2.5 border-t border-white/10 font-sans">
                        Avoid using a password that you use with other websites or that might be easy for someone else to guess.
                      </div>
                    </div>
                  )}

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (!passwordTouched) setPasswordTouched(true);
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => {
                      setIsPasswordFocused(false);
                      setPasswordTouched(true);
                    }}
                    placeholder="Password"
                    className={`w-full h-11 bg-[#0F0F11] border ${
                      showPasswordError
                        ? '!border-[#FF1744] bg-[#FF1744]/5'
                        : 'border-white/15 focus:border-white/50'
                    } text-white placeholder-neutral-500 pl-3.5 pr-10 text-sm outline-none rounded-none transition-colors font-sans`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1 flex items-center justify-center focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {showPasswordError && (
                  <span className="text-xs text-[#FF1744] flex items-center gap-1.5 mt-1 font-mono tracking-tight">
                    <ExclamationIcon />
                    <span>Must meet all password requirements.</span>
                  </span>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="w-full flex flex-col">
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (!confirmPasswordTouched) setConfirmPasswordTouched(true);
                    }}
                    onBlur={() => setConfirmPasswordTouched(true)}
                    placeholder="Confirm password"
                    className={`w-full h-11 bg-[#0F0F11] border ${
                      showConfirmError
                        ? '!border-[#FF1744] bg-[#FF1744]/5'
                        : 'border-white/15 focus:border-white/50'
                    } text-white placeholder-neutral-500 pl-3.5 pr-10 text-sm outline-none rounded-none transition-colors font-sans`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1 flex items-center justify-center focus:outline-none"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {showConfirmError && (
                  <span className="text-xs text-[#FF1744] flex items-center gap-1.5 mt-1 font-mono tracking-tight">
                    <ExclamationIcon />
                    <span>Passwords do not match.</span>
                  </span>
                )}
              </div>

              {/* Checkbox 1: Announcements & Updates (Clean Brutalist Black) */}
              <div className="flex items-start gap-3 my-2 bg-black">
                <input
                  type="checkbox"
                  id="peekly-announcements"
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-none bg-black border border-white/30 checked:bg-[#FF5500] checked:border-[#FF5500] focus:ring-0 cursor-pointer accent-[#FF5500]"
                />
                <label htmlFor="peekly-announcements" className="text-xs text-neutral-300 select-none cursor-pointer leading-tight">
                  <span className="font-semibold text-white">Announcements & Updates.</span> Receive product updates and CS2 analytics via email.
                </label>
              </div>

              {/* Checkbox 2: Terms & Privacy (Clean Brutalist Black) */}
              <div className="flex items-start gap-3 my-2 bg-black">
                <input
                  type="checkbox"
                  id="terms-agree"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-none bg-black border border-white/30 checked:bg-[#FF5500] checked:border-[#FF5500] focus:ring-0 cursor-pointer accent-[#FF5500]"
                />
                <label htmlFor="terms-agree" className="text-xs text-neutral-300 select-none cursor-pointer leading-tight">
                  I agree to the{' '}
                  <a
                    href="/legal/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-[#FF5500] transition-colors"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-[#FF5500] transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Cloudflare Turnstile Human Verification Container (Theme: dark, Centered) */}
              <div className="w-full flex justify-center items-center my-3 bg-black py-1">
                <div id="turnstile-container" className="flex justify-center" />
              </div>

              {/* System Error Banner */}
              {error && (
                <div className="w-full my-2 p-2.5 bg-red-950/80 border border-[#FF1744] text-[#FF1744] text-xs font-mono text-left rounded-none flex items-start gap-2">
                  <ExclamationIcon className="w-4 h-4 shrink-0 text-[#FF1744] mt-0.5" />
                  <span className="leading-snug">{error}</span>
                </div>
              )}

              {/* Submit Button - Disabled until form is fully valid and Turnstile is completed */}
              <button
                type="submit"
                disabled={isLoading || !isRegisterFormValid}
                className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                  isLoading || !isRegisterFormValid
                    ? 'opacity-40 cursor-not-allowed bg-white/20 text-neutral-400 border-none shadow-none'
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
      </div>
    </div>
  );
};

export default AuthModal;

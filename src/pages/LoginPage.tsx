import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { PeeklyLogo } from '../components/PeeklyLogo';
import { GoogleLogo, FaceitLogo, PrivacyIcon, ExclamationIcon } from '../components/AuthModal';
import { isValidEmail } from '../../functions/api/utils/auth.ts';
import type { Language } from '../translations';
import { getAuthTranslations } from '../data/authTranslations';
import { verifyTOTPToken } from '../utils/totp';

interface LoginPageProps {
  currentLang?: Language;
  onGoHome?: () => void;
  onNavigateRegister?: () => void;
  initialError?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentLang,
  onGoHome,
  onNavigateRegister,
  initialError,
}) => {
  const t = getAuthTranslations(currentLang);
  const isRu = currentLang === 'ru';
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [pendingSession, setPendingSession] = useState<any>(null);
  const [pending2faSecret, setPending2faSecret] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = isValidEmail(email);
  const showLoginEmailError = emailTouched && email.trim().length > 0 && !isEmailValid;

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
        // Local-first dev fallback: support local testing when running Vite without Cloudflare D1
        const storedAuth = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
        if (storedAuth) {
          try {
            const parsed = JSON.parse(storedAuth);
            if (parsed.email?.toLowerCase() === cleanEmail) {
              const is2faActive = Boolean(
                parsed.twoFactorEnabled ||
                localStorage.getItem('peekly_2fa') === 'true'
              );
              const secret = parsed.twoFactorSecret || localStorage.getItem('peekly_2fa_secret') || '';
              if (is2faActive && secret) {
                setPendingSession(parsed);
                setPending2faSecret(secret);
                setStep(3);
                setTwoFactorCode('');
                setIsLoading(false);
                return;
              } else {
                localStorage.setItem('peekly_auth', JSON.stringify(parsed));
                localStorage.setItem('peekly_user', JSON.stringify(parsed));
                window.dispatchEvent(new Event('storage'));
                window.dispatchEvent(new Event('peekly_user_updated'));
                setIsLoading(false);
                if (onGoHome) onGoHome(); else window.location.href = '/';
                return;
              }
            }
          } catch {}
        }
        setError(data?.error || (isRu ? 'Неверный адрес электронной почты или пароль.' : 'Invalid email or password.'));
        setIsLoading(false);
        return;
      }

      const sessionData = data.user;

      // Check if 2FA is active for this account
      const is2faActive = Boolean(
        sessionData?.twoFactorEnabled ||
        (localStorage.getItem('peekly_2fa') === 'true' &&
         (cleanEmail === (JSON.parse(localStorage.getItem('peekly_user') || '{}').email?.toLowerCase() || 'zeacvo@icloud.com')))
      );
      const secret = sessionData?.twoFactorSecret || localStorage.getItem('peekly_2fa_secret') || '';

      if (is2faActive && secret) {
        setPendingSession(sessionData);
        setPending2faSecret(secret);
        setStep(3);
        setTwoFactorCode('');
        setIsLoading(false);
        return;
      }

      try {
        localStorage.setItem('peekly_auth', JSON.stringify(sessionData));
        localStorage.setItem('peekly_user', JSON.stringify(sessionData));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('peekly_user_updated'));
      } catch {}

      if (onGoHome) {
        onGoHome();
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError(`Connection error: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorCode.trim().length !== 6) {
      setError(isRu ? 'Введите 6-значный код подтверждения' : 'Enter a 6-digit verification code');
      return;
    }
    setIsLoading(true);
    setError(null);

    const isValid = verifyTOTPToken(twoFactorCode, pending2faSecret);
    if (!isValid) {
      setIsLoading(false);
      setError(
        isRu
          ? 'Неверный код подтверждения. Проверьте время на телефоне.'
          : 'Invalid verification code. Check device clock.'
      );
      return;
    }

    const sessionData = pendingSession || {
      nickname: email.split('@')[0],
      email: email.trim().toLowerCase(),
      twoFactorEnabled: true,
    };

    try {
      localStorage.setItem('peekly_auth', JSON.stringify(sessionData));
      localStorage.setItem('peekly_user', JSON.stringify(sessionData));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('peekly_user_updated'));
    } catch {}

    setIsLoading(false);
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  const navigateToRegister = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (onNavigateRegister) {
      onNavigateRegister();
    } else {
      try {
        history.pushState(null, '', '/register');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch {
        window.location.href = '/register';
      }
    }
  };

  const navigateHome = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      try {
        history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch {
        window.location.href = '/';
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 bg-black text-white font-sans antialiased">
      <div className="w-full max-w-[440px] bg-black border border-white/15 p-7 sm:p-8 relative shadow-2xl rounded-none flex flex-col">
        {/* Clickable Header Logo */}
        <div className="flex justify-center mb-2">
          <a
            href="/"
            onClick={navigateHome}
            className="group inline-flex items-center gap-2 cursor-pointer transition-transform active:scale-95 no-underline"
            aria-label="Back to home"
          >
            <PeeklyLogo
              size={40}
              className="text-white group-hover:text-[#FF5500] transition-colors h-10 w-auto"
            />
          </a>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-white text-center font-sans tracking-tight mb-5">
          {t.signInTitle}
        </h1>

        {/* Global Error Notice */}
        {error && (
          <div className="mb-4 p-2.5 bg-red-950/80 border border-[#FF1744] text-[#FF1744] text-xs font-mono text-left rounded-none flex items-start gap-2">
            <ExclamationIcon className="w-4 h-4 shrink-0 text-[#FF1744] mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Info Notice */}
        {infoNotice && (
          <div className="mb-4 p-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center rounded-none">
            {infoNotice}
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <div className="w-full flex flex-col gap-3.5">
            {/* Social Auth Buttons (Google, FACEIT) */}
            <div className="w-full flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center rounded-none transition cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mr-3">
                  <GoogleLogo className="w-4 h-4" />
                </div>
                <span>{t.continueGoogle}</span>
              </button>

              <a
                href="/api/auth/faceit/login"
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center rounded-none transition cursor-pointer no-underline"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mr-3">
                  <FaceitLogo className="w-4 h-4" fill="#FF5500" />
                </div>
                <span>{t.continueFaceit}</span>
              </a>
            </div>

            {/* Clean Divider with OR */}
            <div className="w-full flex items-center my-1">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                {t.orDivider}
              </span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleContinueEmail} noValidate className="w-full flex flex-col gap-3.5">
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
                  placeholder={t.emailPlaceholder}
                  className={`w-full h-11 bg-[#0F0F11] border ${
                    showLoginEmailError
                      ? '!border-[#FF1744] bg-[#FF1744]/5'
                      : 'border-white/15 focus:border-white/50'
                  } text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition-colors font-sans`}
                />
                {showLoginEmailError && (
                  <span className="text-xs text-[#FF1744] flex items-center gap-1.5 mt-1 font-mono tracking-tight">
                    <ExclamationIcon />
                    <span>{t.enterValidEmail}</span>
                  </span>
                )}
              </div>

              <div className="w-full flex justify-start">
                <a
                  href="/register"
                  onClick={navigateToRegister}
                  className="text-xs text-neutral-400 hover:text-white transition font-mono cursor-pointer text-left no-underline whitespace-nowrap inline-flex items-center gap-1"
                >
                  <span>{t.createAccountLink}</span>
                  <span className="text-[11px] leading-none">↗</span>
                </a>
              </div>

              {/* Privacy Disclaimer */}
              <div className="w-full flex flex-col items-center text-center my-1">
                <PrivacyIcon />
                <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-[340px] mx-auto">
                  {t.loginDisclaimer}{' '}
                  <a
                    href="/legal/account-privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {t.dataManagedLink}
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
                {t.continueBtn}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: PASSWORD */}
        {step === 2 && (
          <form onSubmit={handleSignIn} noValidate className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <div className="w-full h-11 border border-white/20 border-b-0 bg-black px-3.5 flex items-center justify-between rounded-none">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 mr-2">
                    Email:
                  </span>
                  <span className="text-white text-sm font-sans truncate">{email}</span>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.passwordPlaceholder}
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
                {t.forgotPassword} ↗
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
              {isLoading ? t.pleaseWait : t.signInBtn}
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
        )}

        {/* STEP 3: 2FA TOTP VERIFICATION */}
        {step === 3 && (
          <form onSubmit={handleVerify2FA} noValidate className="w-full flex flex-col gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 border border-[#1A1A1F] bg-[#090909] flex items-center justify-center mb-3">
                <KeyRound className="w-5 h-5 text-[#FF5500]" />
              </div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-white mb-1">
                {isRu ? 'Двухэтапная аутентификация' : 'Two-Factor Authentication'}
              </h2>
              <p className="text-xs font-mono text-[#929292] leading-relaxed max-w-[320px]">
                {isRu
                  ? 'Введите 6-значный код из Google Authenticator, Яндекс Ключ или Aegis'
                  : 'Enter the 6-digit code from your authenticator app'}
              </p>
            </div>

            <div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => {
                  setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  if (error) setError(null);
                }}
                autoFocus
                placeholder="000000"
                className="w-full h-12 bg-[#0F0F11] border border-white/20 focus:border-[#FF5500] text-center text-xl font-mono tracking-[0.5em] text-white placeholder-neutral-600 outline-none rounded-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || twoFactorCode.trim().length !== 6}
              className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                isLoading || twoFactorCode.trim().length !== 6
                  ? 'bg-white/20 text-neutral-400 cursor-not-allowed border-none shadow-none'
                  : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-sm'
              }`}
            >
              {isLoading ? t.pleaseWait : (isRu ? 'ПОДТВЕРДИТЬ И ВОЙТИ' : 'VERIFY & SIGN IN')}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(2);
                setError(null);
                setTwoFactorCode('');
              }}
              className="text-xs font-mono text-neutral-400 hover:text-white transition cursor-pointer text-center"
            >
              ← {isRu ? 'Назад к паролю' : 'Back to password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

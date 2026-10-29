import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PeeklyLogo } from '../components/PeeklyLogo';
import { GoogleLogo, FaceitLogo, PrivacyIcon, ExclamationIcon } from '../components/AuthModal';
import { isValidEmail } from '../../functions/api/utils/auth.ts';

interface LoginPageProps {
  onGoHome?: () => void;
  onNavigateRegister?: () => void;
  initialError?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onGoHome,
  onNavigateRegister,
  initialError,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          Sign in to Peekly
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
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>

              <a
                href="/api/auth/faceit/login"
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer no-underline"
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
                <a
                  href="/register"
                  onClick={navigateToRegister}
                  className="text-xs text-neutral-400 hover:text-white transition font-mono cursor-pointer text-left no-underline"
                >
                  Create Your Peekly Account ↗
                </a>
              </div>

              {/* Privacy Disclaimer */}
              <div className="w-full flex flex-col items-center text-center my-1">
                <PrivacyIcon />
                <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-[340px] mx-auto">
                  Your Peekly Account information is used to allow you to sign in securely and access
                  your CS2 stats.{' '}
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
        )}
      </div>
    </div>
  );
};

export default LoginPage;

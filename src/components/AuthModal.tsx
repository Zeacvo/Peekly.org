import React, { useState, useEffect, useCallback } from 'react';
import { PeeklyLogo } from './PeeklyLogo';

export const FaceitLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M23.999 2.705a.167.167 0 00-.312-.1 1141.27 1141.27 0 00-6.053 9.375H.218c-.221 0-.301.282-.11.352 7.227 2.73 17.667 6.836 23.5 9.134.15.06.39-.08.39-.18z"
      fill="#FF5500"
    />
  </svg>
);

export const PrivacyIcon: React.FC<{ className?: string }> = ({
  className = 'text-neutral-400 mb-2.5 shrink-0',
}) => (
  <svg
    width="24"
    height="24"
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
  const [view, setView] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = useCallback(() => {
    setError(null);
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

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('Please enter your nickname.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters.');
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
          nickname: nickname.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Registration failed.');
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
      <div className="w-full max-w-[460px] bg-black border border-white/15 p-8 relative shadow-2xl rounded-none">
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

        {/* VIEW 1: SIGN IN - STEP 1 (EMAIL) */}
        {view === 'login' && step === 1 && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-6 font-sans">
              Sign in to Peekly
            </h2>

            <form
              onSubmit={handleContinue}
              noValidate
              className="w-full flex flex-col gap-4"
            >
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                autoFocus
              />

              {/* Link to Create Account */}
              <div className="w-full flex justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setView('register');
                    setError(null);
                  }}
                  className="text-xs text-neutral-400 hover:text-white transition font-mono cursor-pointer text-left"
                >
                  Create Your Peekly Account ↗
                </button>
              </div>

              {/* Privacy Disclaimer Block */}
              <div className="w-full flex flex-col items-center text-center my-1">
                <PrivacyIcon />
                <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-[340px] mx-auto">
                  Your Peekly Account information is used to allow you to sign in securely
                  and access your CS2 stats.{' '}
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

              {/* Action Button */}
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

              {/* FACEIT Button */}
              <a
                href="/api/auth/faceit/login"
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2.5 rounded-none transition cursor-pointer"
              >
                <FaceitLogo />
                <span>SIGN IN WITH FACEIT</span>
              </a>
            </form>
          </div>
        )}

        {/* VIEW 1: SIGN IN - STEP 2 (PASSWORD) */}
        {view === 'login' && step === 2 && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-6 font-sans">
              Sign in to Peekly
            </h2>

            <form
              onSubmit={handleSignIn}
              noValidate
              className="w-full flex flex-col gap-4"
            >
              <div className="w-full flex flex-col">
                {/* Upper Cell: Fixed Email with Edit toggle */}
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

                {/* Lower Cell: Password Input */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                  autoFocus
                />
              </div>

              {/* Remember Me & Forgot Password Row */}
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

              {/* Action Buttons */}
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

              <a
                href="/api/auth/faceit/login"
                className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2.5 rounded-none transition cursor-pointer"
              >
                <FaceitLogo />
                <span>SIGN IN WITH FACEIT</span>
              </a>
            </form>
          </div>
        )}

        {/* VIEW 2: CREATE ACCOUNT */}
        {view === 'register' && (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-1 font-sans">
              Create Your Peekly Account
            </h2>
            <p className="text-xs text-neutral-400 text-center mb-6 font-mono leading-relaxed">
              One Peekly Account is all you need. Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setView('login');
                  setStep(1);
                  setError(null);
                }}
                className="text-white hover:text-neutral-300 ml-1 cursor-pointer transition font-mono"
              >
                Sign in ↗
              </button>
            </p>

            <form
              onSubmit={handleRegister}
              noValidate
              className="w-full flex flex-col gap-3.5"
            >
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
                autoFocus
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full h-11 bg-black border border-white/20 focus:border-white text-white placeholder-neutral-500 px-3.5 text-sm outline-none rounded-none transition font-sans"
              />

              <button
                type="submit"
                disabled={
                  isLoading ||
                  !nickname.trim() ||
                  !email.trim() ||
                  !password.trim() ||
                  !confirmPassword.trim()
                }
                className={`w-full h-11 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition ${
                  isLoading ||
                  !nickname.trim() ||
                  !email.trim() ||
                  !password.trim() ||
                  !confirmPassword.trim()
                    ? 'bg-white/20 text-neutral-400 cursor-not-allowed border-none shadow-none'
                    : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-sm'
                }`}
              >
                {isLoading ? 'PLEASE WAIT...' : 'CREATE ACCOUNT'}
              </button>

              {/* Privacy Disclaimer Block */}
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

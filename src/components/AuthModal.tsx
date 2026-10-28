import React, { useState, useEffect, useCallback } from 'react';
import { PeeklyLogo } from './PeeklyLogo';

export const FaceitLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#FF5500"
    className={`shrink-0 ${className}`}
  >
    <path d="M23.999 2.503a.502.502 0 0 0-.447-.28H.448A.5.5 0 0 0 .1 3.078l7.684 9.176a.5.5 0 0 0 .383.178h8.868a.5.5 0 0 0 .383-.822L9.585 3.224h13.967a.5.5 0 0 0 .447-.721zm-7.684 9.421H7.447a.5.5 0 0 0-.383.822l7.834 8.755a.5.5 0 0 0 .383.178h7.871a.5.5 0 0 0 .348-.855l-7.186-8.9z" />
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
  const [faceitNickname, setFaceitNickname] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    const cleanEmail = email.trim();
    const isZeacvo =
      cleanEmail.toLowerCase() === 'zeacvo@icloud.com' ||
      cleanEmail.toLowerCase().includes('zeacvo');

    const sessionData = {
      nickname: isZeacvo ? 'Zeacvo' : cleanEmail.split('@')[0],
      email: cleanEmail,
      country: 'BY',
      elo: isZeacvo ? 1699 : 1500,
      level: isZeacvo ? 8 : 6,
    };

    try {
      localStorage.setItem('peekly_auth', JSON.stringify(sessionData));
      localStorage.setItem('peekly_user', JSON.stringify(sessionData));
      document.cookie = `peekly_auth=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; Path=/; Max-Age=2592000; SameSite=Lax`;
      document.cookie = `peekly_user=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; Path=/; Max-Age=2592000; SameSite=Lax`;
      window.dispatchEvent(new Event('storage'));
    } catch {}

    if (onLoginSuccess) {
      onLoginSuccess(sessionData);
    }

    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!faceitNickname.trim()) {
      setError('Please enter your FACEIT Nickname.');
      return;
    }

    const cleanNickname = faceitNickname.trim();
    const cleanEmail = email.trim();
    const isZeacvo =
      cleanNickname.toLowerCase() === 'zeacvo' ||
      cleanEmail.toLowerCase() === 'zeacvo@icloud.com';

    const sessionData = {
      nickname: cleanNickname,
      email: cleanEmail,
      country: 'BY',
      elo: isZeacvo ? 1699 : 1600,
      level: isZeacvo ? 8 : 7,
    };

    try {
      localStorage.setItem('peekly_auth', JSON.stringify(sessionData));
      localStorage.setItem('peekly_user', JSON.stringify(sessionData));
      document.cookie = `peekly_auth=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; Path=/; Max-Age=2592000; SameSite=Lax`;
      document.cookie = `peekly_user=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; Path=/; Max-Age=2592000; SameSite=Lax`;
      window.dispatchEvent(new Event('storage'));
    } catch {}

    if (onLoginSuccess) {
      onLoginSuccess(sessionData);
    }

    onClose();
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
      <div className="w-full max-w-[440px] bg-[#0A0A0A] border border-white/10 p-8 sm:p-10 relative shadow-2xl rounded-none">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 transition-colors cursor-pointer"
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
          <div className="my-3 p-2.5 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono text-center">
            {error}
          </div>
        )}

        {/* VIEW 1: SIGN IN - STEP 1 (EMAIL) */}
        {view === 'login' && step === 1 && (
          <form onSubmit={handleContinue} className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-6 font-sans">
              Sign in to Peekly
            </h2>

            <div className="border border-white/20 focus-within:border-white transition p-3 bg-black">
              <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent text-white text-sm outline-none font-sans"
                autoFocus
                required
              />
            </div>

            <div className="mt-3 mb-5 flex justify-start">
              <button
                type="button"
                onClick={() => {
                  setView('register');
                  setError(null);
                }}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer transition-colors"
              >
                Create Your Peekly Account ↗
              </button>
            </div>

            {/* Privacy Disclaimer */}
            <div className="my-6 text-center">
              <svg
                className="w-7 h-7 text-neutral-400 mx-auto mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="7" r="3" />
                <circle cx="15" cy="7" r="3" />
                <path d="M4 19c0-2.8 2.2-5 5-5h6c2.8 0 5 2.2 5 5" />
              </svg>
              <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-xs mx-auto">
                Your Peekly Account information is used to allow you to sign in securely
                and access your CS2 stats.{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white underline"
                >
                  See how your data is managed...
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer rounded-none"
            >
              Continue
            </button>

            <div className="my-4 text-center text-neutral-600 text-xs font-mono">
              OR
            </div>

            <a
              href="/api/auth/faceit/login"
              className="w-full py-2.5 bg-[#121315] border border-white/15 hover:border-white/40 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition cursor-pointer rounded-none uppercase tracking-wider"
            >
              <FaceitLogo size={16} />
              <span>Sign in with FACEIT</span>
            </a>
          </form>
        )}

        {/* VIEW 1: SIGN IN - STEP 2 (PASSWORD) */}
        {view === 'login' && step === 2 && (
          <form onSubmit={handleSignIn} className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-6 font-sans">
              Sign in to Peekly
            </h2>

            {/* Apple ID Style Stacked Field */}
            <div className="border border-white/20 bg-black mb-3">
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-neutral-500">
                    Email
                  </label>
                  <div className="text-white text-sm font-sans truncate max-w-[280px]">
                    {email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="p-3 focus-within:bg-white/[0.02]">
                <label className="block text-[10px] uppercase font-mono text-neutral-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs font-mono mb-6">
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
              className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer rounded-none"
            >
              SIGN IN
            </button>

            <div className="my-4 text-center text-neutral-600 text-xs font-mono">
              OR
            </div>

            <a
              href="/api/auth/faceit/login"
              className="w-full py-2.5 bg-[#121315] border border-white/15 hover:border-white/40 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition cursor-pointer rounded-none uppercase tracking-wider"
            >
              <FaceitLogo size={16} />
              <span>Sign in with FACEIT</span>
            </a>
          </form>
        )}

        {/* VIEW 2: CREATE ACCOUNT */}
        {view === 'register' && (
          <form onSubmit={handleRegister} className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-1 font-sans">
              Create Your Peekly Account
            </h2>
            <p className="text-xs text-neutral-400 text-center mb-6 font-mono">
              Track your FACEIT stats and dominate the lobby
            </p>

            <div className="border border-white/20 bg-black divide-y divide-white/10 mb-5">
              <div className="p-3">
                <label className="block text-[10px] uppercase font-mono text-neutral-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  autoFocus
                  required
                />
              </div>
              <div className="p-3">
                <label className="block text-[10px] uppercase font-mono text-neutral-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  required
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-0.5">
                  <label className="block text-[10px] uppercase font-mono text-neutral-400">
                    FACEIT Nickname
                  </label>
                  <span className="text-[10px] font-mono text-[#FF5500]">
                    Required for stats
                  </span>
                </div>
                <input
                  type="text"
                  value={faceitNickname}
                  onChange={(e) => setFaceitNickname(e.target.value)}
                  placeholder="e.g. Zeacvo"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  required
                />
                <p className="text-[10px] text-neutral-500 font-mono mt-1">
                  Used to sync your ELO, rank, and match history
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer rounded-none mb-3"
            >
              CREATE ACCOUNT
            </button>

            <div className="my-3 text-center text-neutral-600 text-xs font-mono">
              OR
            </div>

            <a
              href="/api/auth/faceit/login"
              className="w-full py-2.5 bg-[#121315] border border-white/15 hover:border-white/40 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition cursor-pointer rounded-none uppercase tracking-wider"
            >
              <FaceitLogo size={16} />
              <span>Sign up in 1 click with FACEIT</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setView('login');
                setStep(1);
                setError(null);
              }}
              className="text-xs text-neutral-400 hover:text-white mt-4 block mx-auto font-mono cursor-pointer transition-colors"
            >
              Already have an account? Sign in ↗
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

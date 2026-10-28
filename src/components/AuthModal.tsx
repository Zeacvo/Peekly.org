import React, { useState, useEffect, useCallback } from 'react';
import { PeeklyLogo } from './PeeklyLogo';

export const FaceitLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="14"
    viewBox="0 0 24 18"
    fill="none"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M23.998 0.771c-.066-.341-.336-.606-.677-.665-.341-.059-.684.088-.86.37L10.98 17.229c-.215.344-.06.797.311.947.117.047.24.068.361.063l11.669-.001c.379 0 .708-.261.792-.63L23.998.771z"
      fill="#FF5500"
    />
    <path
      d="M0 0.771c.066-.341.336-.606.677-.665.341-.059.684.088.86.37l5.228 8.375-3.87 5.76L0 .771z"
      fill="#FF5500"
    />
  </svg>
);

export const PrivacyIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    className={`mx-auto mb-2 text-neutral-400 ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm6 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6 2c-3.11 0-6 1.57-6 4v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1c0-2.43-2.89-4-6-4zm6 1c-.34 0-.67.03-.99.09.62.83.99 1.84.99 2.91v1h4a1 1 0 0 0 1-1v-1c0-1.87-2.13-3-5-3z" />
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

    const cleanNickname = nickname.trim();
    const cleanEmail = email.trim();
    const isZeacvo =
      cleanNickname.toLowerCase() === 'zeacvo' ||
      cleanEmail.toLowerCase() === 'zeacvo@icloud.com';

    const sessionData = {
      nickname: cleanNickname,
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

            <div className="border border-white/15 focus-within:border-white transition p-3 bg-black">
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
              <PrivacyIcon />
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

            {/* Action Buttons (without OR separator) */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer rounded-none"
              >
                Continue
              </button>

              <a
                href="/api/auth/faceit/login"
                className="w-full h-10 bg-black border border-white/20 hover:border-white/40 text-white font-mono font-bold text-xs flex items-center justify-center gap-2.5 transition cursor-pointer rounded-none uppercase tracking-wider"
              >
                <FaceitLogo />
                <span>SIGN IN WITH FACEIT</span>
              </a>
            </div>
          </form>
        )}

        {/* VIEW 1: SIGN IN - STEP 2 (PASSWORD) */}
        {view === 'login' && step === 2 && (
          <form onSubmit={handleSignIn} className="mt-3">
            <h2 className="text-xl font-bold text-white text-center mb-6 font-sans">
              Sign in to Peekly
            </h2>

            {/* Apple ID Style Stacked Field */}
            <div className="border border-white/15 bg-black mb-3">
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-neutral-500 mb-0.5">
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
                <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
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

            {/* Action Buttons (without OR separator) */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer rounded-none"
              >
                SIGN IN
              </button>

              <a
                href="/api/auth/faceit/login"
                className="w-full h-10 bg-black border border-white/20 hover:border-white/40 text-white font-mono font-bold text-xs flex items-center justify-center gap-2.5 transition cursor-pointer rounded-none uppercase tracking-wider"
              >
                <FaceitLogo />
                <span>SIGN IN WITH FACEIT</span>
              </a>
            </div>
          </form>
        )}

        {/* VIEW 2: CREATE ACCOUNT (Apple ID Style) */}
        {view === 'register' && (
          <form onSubmit={handleRegister} className="mt-3">
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
                className="text-white underline ml-1 hover:text-neutral-200 cursor-pointer"
              >
                Sign in ↗
              </button>
            </p>

            <div className="border border-white/15 bg-black divide-y divide-white/10 mb-5">
              <div className="p-3 focus-within:bg-white/[0.02]">
                <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                  Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Zeacvo"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  autoFocus
                  required
                />
              </div>
              <div className="p-3 focus-within:bg-white/[0.02]">
                <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  required
                />
              </div>
              <div className="p-3 focus-within:bg-white/[0.02]">
                <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
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
              <div className="p-3 focus-within:bg-white/[0.02]">
                <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full bg-transparent text-white text-sm outline-none font-sans"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer rounded-none"
            >
              CONTINUE
            </button>

            {/* Privacy Disclaimer */}
            <div className="mt-6 text-center">
              <PrivacyIcon />
              <p className="text-[11px] text-neutral-500 font-sans leading-relaxed max-w-xs mx-auto">
                Your Peekly Account information is used to allow you to sign in securely
                and protect your account.{' '}
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
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

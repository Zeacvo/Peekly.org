import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PeeklyLogo } from '../components/PeeklyLogo';
import { GoogleLogo, FaceitLogo, PrivacyIcon, ExclamationIcon } from '../components/AuthModal';
import {
  isValidEmail,
  isValidNickname,
  checkPasswordRequirements,
} from '../../functions/api/utils/auth.ts';

interface RegisterPageProps {
  onGoHome?: () => void;
  onNavigateLogin?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onGoHome, onNavigateLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // Password visibility toggles
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

  const [error, setError] = useState<string | null>(null);
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

  // Turnstile Widget lifecycle
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const renderWidget = () => {
      const container = document.getElementById('turnstile-container');
      if (window.turnstile && container) {
        if (container.childElementCount > 0) return true;
        try {
          widgetIdRef.current = window.turnstile.render('#turnstile-container', {
            sitekey: '0x4AAAAAAFqpQSJmI_csGCP9',
            theme: 'dark',
            callback: (token: string) => {
              setTurnstileToken(token);
              setError(null);
            },
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
  }, []);

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
            data?.error?.toLowerCase().includes('username') ||
            data?.error?.toLowerCase().includes('nickname')
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

      // Instant redirect to home page with active session
      if (onGoHome) {
        onGoHome();
      } else {
        window.location.href = data?.redirect || '/';
      }
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

  const navigateToLogin = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (onNavigateLogin) {
      onNavigateLogin();
    } else {
      try {
        history.pushState(null, '', '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch {
        window.location.href = '/login';
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

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-black text-white text-center font-sans tracking-tight mb-1">
          Create Your Peekly Account
        </h1>
        <p className="text-xs text-neutral-400 text-center mb-5 font-mono leading-relaxed">
          One Peekly Account is all you need. Already have an account?{' '}
          <a
            href="/login"
            onClick={navigateToLogin}
            className="text-white hover:text-[#FF5500] underline ml-1 cursor-pointer transition font-mono"
          >
            Sign in ↗
          </a>
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
            className="w-full h-11 bg-black border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-3 rounded-none transition cursor-pointer no-underline"
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
        <form onSubmit={handleRegisterSubmit} noValidate className="w-full flex flex-col gap-3">
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

          {/* Password Input with Dynamic Apple-style Popover and Eye Toggle */}
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              {isPasswordFocused && (
                <div className="absolute bottom-full left-0 mb-2 w-full sm:w-[340px] bg-[#141416] border border-white/20 p-4 shadow-2xl z-50 rounded-none pointer-events-none">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-1.5">
                    <span>Strength: {pwdReq.score}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/10 rounded-none overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-200 ${getStrengthColor(
                        pwdReq.score
                      )}`}
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
                        <span
                          className={`w-3.5 text-center shrink-0 ${
                            req.met ? 'text-[#00E676] font-bold' : 'opacity-40'
                          }`}
                        >
                          {req.met ? '✓' : '•'}
                        </span>
                        <span>{req.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] leading-relaxed text-neutral-400 mt-3 pt-2.5 border-t border-white/10 font-sans">
                    Avoid using a password that you use with other websites or that might be easy
                    for someone else to guess.
                  </div>
                </div>
              )}

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
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

          {/* Confirm Password Input with Eye Toggle */}
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError(null);
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
            <label
              htmlFor="peekly-announcements"
              className="text-xs text-neutral-300 select-none cursor-pointer leading-tight"
            >
              <span className="font-semibold text-white">Announcements & Updates.</span> Receive
              product updates and CS2 analytics via email.
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
            <label
              htmlFor="terms-agree"
              className="text-xs text-neutral-300 select-none cursor-pointer leading-tight"
            >
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
              Your Peekly Account information is used to allow you to sign in securely and protect
              your account.{' '}
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
    </div>
  );
};

export default RegisterPage;

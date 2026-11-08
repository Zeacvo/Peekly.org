import React, { useEffect, useState } from 'react';

interface LinkSuccessPageProps {
  currentLang?: string;
  onGoHome?: () => void;
}

export const LinkSuccessPage: React.FC<LinkSuccessPageProps> = ({ onGoHome }) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');
      let parsed: any = null;
      if (dataParam) {
        try {
          parsed = JSON.parse(decodeURIComponent(dataParam));
        } catch {
          parsed = JSON.parse(dataParam);
        }
      }
      if (!parsed) {
        const match = document.cookie.match(/peekly_user=([^;]+)/);
        if (match) {
          parsed = JSON.parse(decodeURIComponent(match[1]));
        }
      }
      if (parsed) {
        setProfile(parsed);
      }

      // Notify extension
      const EXTENSION_ID = 'ohkbcdegfepkjgljolmmonkpncjhoaek';
      if (typeof window !== 'undefined' && (window as any).chrome?.runtime?.sendMessage) {
        (window as any).chrome.runtime.sendMessage(EXTENSION_ID, {
          type: 'PEEKLY_AUTH_SUCCESS',
          profile: parsed,
        }, () => {});
      }

      if (window.opener) {
        window.opener.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: parsed }, '*');
      }

      if (parsed) {
        localStorage.setItem('peekly_auth_token', JSON.stringify({ profile: parsed, ts: Date.now() }));
      }
    } catch (e) {
      console.warn('[LinkSuccessPage] Init error:', e);
    }

    const timer = setTimeout(() => {
      try {
        window.close();
      } catch {}
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    try {
      window.close();
    } catch {}
    setTimeout(() => {
      window.location.href = '/profile';
    }, 200);
  };

  return (
    <div
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100%',
          height: 64,
          background: '#000000',
          borderBottom: '1px solid #1A1A1F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href="/"
            onClick={onGoHome ? (e) => { e.preventDefault(); onGoHome(); } : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            <svg width="22" height="22" viewBox="6 22 88 56" fill="currentColor">
              <path
                d="M 8 50 C 24 30, 36 24, 50 24 C 64 24, 76 30, 92 50 C 76 70, 64 76, 50 76 C 36 76, 24 70, 8 50 Z M 50 29 A 21 21 0 1 0 50 71 A 21 21 0 1 0 50 29 Z"
                fillRule="evenodd"
              />
              <circle cx="50" cy="50" r="13.5" fill="none" stroke="#000000" strokeWidth="3.2" />
              <circle cx="50" cy="50" r="4.5" />
            </svg>
            <span>PEEKLY</span>
          </a>
          <a
            href="/"
            onClick={onGoHome ? (e) => { e.preventDefault(); onGoHome(); } : undefined}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 12px',
              background: '#090909',
              border: '1px solid #1A1A1F',
              borderRadius: 0,
              color: '#929292',
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF5500';
              e.currentTarget.style.borderColor = '#FF5500';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#929292';
              e.currentTarget.style.borderColor = '#1A1A1F';
            }}
          >
            &lt; Back to Home
          </a>
        </div>
      </header>

      {/* Main card */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
        }}
      >
        <div
          style={{
            background: '#090909',
            border: '1px solid #1A1A1F',
            borderRadius: 0,
            padding: '44px 36px',
            maxWidth: 480,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Green checkmark badge */}
          <div
            style={{
              width: 48,
              height: 48,
              border: '2px solid #00E676',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              color: '#00E676',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00E676"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            Successfully linked!
          </h1>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: '#929292',
              maxWidth: 360,
              marginBottom: 28,
            }}
          >
            {profile?.nickname
              ? `Your FACEIT account (${profile.nickname}) is now connected to Peekly. You can close this window and return to the extension.`
              : 'Your FACEIT account is now connected to Peekly. You can close this window and return to the extension.'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              width: '100%',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                background: '#FFFFFF',
                color: '#000000',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '11px 24px',
                border: '1px solid #FFFFFF',
                borderRadius: 0,
                cursor: 'pointer',
                minWidth: 140,
                transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF5500';
                e.currentTarget.style.borderColor = '#FF5500';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.color = '#000000';
              }}
            >
              Close Window
            </button>
            <a
              href="/profile"
              style={{
                background: '#090909',
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '11px 24px',
                border: '1px solid #1A1A1F',
                borderRadius: 0,
                textDecoration: 'none',
                minWidth: 140,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF5500';
                e.currentTarget.style.color = '#FF5500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1A1A1F';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Go to Profile
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: '100%',
          background: '#000000',
          borderTop: '1px solid #1A1A1F',
          padding: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 11,
          color: '#929292',
          boxSizing: 'border-box',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <span>PEEKLY — CS2 / FACEIT Companion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="/privacy"
            style={{ color: '#929292', textDecoration: 'none' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF5500';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#929292';
            }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            style={{ color: '#929292', textDecoration: 'none' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF5500';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#929292';
            }}
          >
            Terms of Service
          </a>
          <span>&copy; 2026 Peekly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

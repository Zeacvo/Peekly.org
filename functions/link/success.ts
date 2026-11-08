/**
 * Peekly for FACEIT - Extension Link Success Endpoint (Cloudflare Pages Function)
 * Path: /link/success
 * Apple-inspired Brutalist link confirmation screen matching Forecast UI & Canonical Design System.
 */

interface EventContext {
  request: Request;
  env?: Record<string, unknown>;
}

export async function onRequest(context: EventContext): Promise<Response> {
  const url = new URL(context.request.url);
  const dataParam = url.searchParams.get('data');

  let profile = {
    guid: '',
    id: '',
    nickname: '',
    avatar: '',
    country: '',
    elo: 0,
    level: 1,
    plan: 'FREE',
  };

  if (dataParam) {
    try {
      profile = JSON.parse(decodeURIComponent(dataParam));
    } catch {
      try {
        profile = JSON.parse(dataParam);
      } catch {}
    }
  }

  // Fallback to cookie if available
  if (!profile.nickname) {
    const cookieHeader = context.request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/peekly_user=([^;]+)/);
    if (match) {
      try {
        profile = JSON.parse(decodeURIComponent(match[1]));
      } catch {}
    }
  }

  const payloadJson = JSON.stringify(profile);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account linked | Peekly for FACEIT</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border-radius: 0px !important;
    }
    html, body {
      background-color: #000000;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    a {
      color: inherit;
      text-decoration: none;
    }

    /* Site Header */
    .site-header {
      width: 100%;
      height: 64px;
      background: #000000;
      border-bottom: 1px solid #1A1A1F;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .brand-logo svg {
      width: 22px;
      height: 22px;
      color: #FFFFFF;
    }
    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: #090909;
      border: 1px solid #1A1A1F;
      color: #929292;
      font-size: 12px;
      font-weight: 600;
      transition: color 0.15s ease, border-color 0.15s ease;
    }
    .btn-back:hover {
      color: #FF5500;
      border-color: #FF5500;
    }

    /* Main Container */
    .main-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
    }
    .success-card {
      background: #090909;
      border: 1px solid #1A1A1F;
      padding: 44px 36px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
    }

    /* Green circular checkmark badge matching Forecast */
    .check-circle {
      width: 48px;
      height: 48px;
      border: 2px solid #00E676;
      border-radius: 9999px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: #00E676;
    }
    .check-circle svg {
      width: 26px;
      height: 26px;
      stroke: #00E676;
      stroke-width: 2.4;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .title {
      font-size: 20px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.01em;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .desc {
      font-size: 13px;
      line-height: 1.5;
      color: #929292;
      max-width: 360px;
      margin-bottom: 28px;
    }

    /* Buttons */
    .actions {
      display: flex;
      gap: 12px;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: #FFFFFF;
      color: #000000;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 11px 24px;
      border: 1px solid #FFFFFF;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
      min-width: 140px;
    }
    .btn-primary:hover {
      background: #FF5500;
      border-color: #FF5500;
      color: #FFFFFF;
    }
    .btn-secondary {
      background: #090909;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 11px 24px;
      border: 1px solid #1A1A1F;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
      min-width: 140px;
    }
    .btn-secondary:hover {
      border-color: #FF5500;
      color: #FF5500;
    }

    /* Footer */
    .site-footer {
      width: 100%;
      background: #000000;
      border-top: 1px solid #1A1A1F;
      padding: 24px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #929292;
      box-sizing: border-box;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .footer-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .footer-right a:hover {
      color: #FF5500;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="site-header">
    <div class="brand-group">
      <a href="/" class="brand-logo" aria-label="Peekly Home">
        <svg viewBox="6 22 88 56" fill="currentColor">
          <path d="M 8 50 C 24 30, 36 24, 50 24 C 64 24, 76 30, 92 50 C 76 70, 64 76, 50 76 C 36 76, 24 70, 8 50 Z M 50 29 A 21 21 0 1 0 50 71 A 21 21 0 1 0 50 29 Z" fill-rule="evenodd"/>
          <circle cx="50" cy="50" r="13.5" fill="none" stroke="#000000" stroke-width="3.2"/>
          <circle cx="50" cy="50" r="4.5"/>
        </svg>
        <span>PEEKLY</span>
      </a>
      <a href="/" class="btn-back">&lt; Back to Home</a>
    </div>
  </header>

  <!-- Center Card -->
  <main class="main-wrap">
    <div class="success-card">
      <div class="check-circle" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h1 class="title">Successfully linked!</h1>
      <p class="desc">Your FACEIT account is now connected to Peekly. You can close this window and return to the extension.</p>

      <div class="actions">
        <button class="btn-primary" id="closeBtn" onclick="closeWindow()">Close Window</button>
        <a href="/profile" class="btn-secondary">Go to Profile</a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-left">
      <span>PEEKLY — CS2 / FACEIT Companion</span>
    </div>
    <div class="footer-right">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <span>&copy; 2026 Peekly. All rights reserved.</span>
    </div>
  </footer>

  <script>
    const payload = ${payloadJson};

    function sendToExtension() {
      // 1. Send via chrome.runtime.sendMessage to all known Peekly extension IDs
      const KNOWN_EXTENSION_IDS = [
        'ohkbcdegfepkjgljolmmonkpncjhoaek',
        'cmfgneodcjfofdcglbbhcghijgcjcokk',
      ];
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
          for (const extId of KNOWN_EXTENSION_IDS) {
            try {
              chrome.runtime.sendMessage(extId, {
                type: 'PEEKLY_AUTH_SUCCESS',
                profile: payload,
              }, (res) => {
                if (chrome.runtime?.lastError) void chrome.runtime.lastError;
              });
            } catch (e) {}
          }
        }
      } catch (e) {}

      // 2. Broadcast window postMessage & custom event for content scripts
      try {
        window.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: payload }, '*');
      } catch (e) {}
      try {
        document.dispatchEvent(new CustomEvent('PEEKLY_AUTH_SUCCESS', { detail: payload }));
      } catch (e) {}

      // 3. PostMessage to opener if opened in a popup
      try {
        if (window.opener) {
          window.opener.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: payload }, '*');
        }
      } catch (e) {}

      // 4. LocalStorage sync for cross-tab listeners
      try {
        localStorage.setItem('peekly_auth_token', JSON.stringify({ profile: payload, ts: Date.now() }));
      } catch (e) {}
    }

    sendToExtension();

    function closeWindow() {
      try {
        window.close();
      } catch (e) {}
      // Fallback redirect if browser prevents window.close()
      setTimeout(() => {
        window.location.href = '/profile';
      }, 300);
    }

    // Auto-close after 3.5 seconds
    setTimeout(() => {
      try { window.close(); } catch (e) {}
    }, 3500);
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

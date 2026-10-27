/**
 * FACEIT OAuth Callback Endpoint (Cloudflare Pages Function & Dev Middleware)
 * Client ID: d58837f4-984d-41a5-bd76-615ef5156660
 * Redirect URI: https://peekly.org/api/auth/faceit/callback
 */

import { upsertPlayer, type PlayerUser } from '../../storage/usersDb.ts';

export const FACEIT_OAUTH_CONFIG = {
  clientId: 'd58837f4-984d-41a5-bd76-615ef5156660',
  clientSecret: 'Q1bKg6518H5P50iQvBUJRdn1nms5JqB6qBIjOsGg',
  redirectUri: 'https://peekly.org/api/auth/faceit/callback',
  tokenEndpoint: 'https://api.faceit.com/auth/v1/oauth/token',
  userEndpoint: 'https://api.faceit.com/auth/v1/resources/user',
  playerEndpoint: 'https://api.faceit.com/users/v1/nicknames',
};

export interface FaceitProfilePayload {
  guid: string;
  nickname: string;
  avatar: string;
  country: string;
  elo: number;
  level: number;
  membership: string;
}

export function generateSuccessHtml(profile: FaceitProfilePayload): string {
  const payloadJson = JSON.stringify(profile);
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Peekly Auth</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Play:wght@700;800&family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        background: #0a0a0c;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'Play', -apple-system, BlinkMacSystemFont, sans-serif;
        user-select: none;
      }
      .card {
        text-align: center;
        padding: 32px 40px;
        background: #111215;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        max-width: 420px;
      }
      .badge {
        display: inline-block;
        padding: 4px 10px;
        background: rgba(255, 85, 0, 0.15);
        color: #ff5500;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 14px;
        border: 1px solid rgba(255, 85, 0, 0.3);
      }
      h2 {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #ffffff;
      }
      p {
        color: #8b8e96;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        margin-top: 8px;
      }
      .pulse-bar {
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        margin-top: 20px;
        overflow: hidden;
        position: relative;
      }
      .pulse-bar::after {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0; width: 40%;
        background: #ff5500;
        animation: slide 1.2s infinite ease-in-out;
      }
      @keyframes slide {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="badge">TACTICAL SYNC OK</div>
      <h2>SYNCHRONIZED WITH PEEKLY</h2>
      <p>Returning to FACEIT...</p>
      <div class="pulse-bar"></div>
    </div>
    <script>
      const payload = ${payloadJson};
      // 1. Отправка через postMessage (если открыто как popup или фрейм)
      try {
        if (window.opener) {
          window.opener.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: payload }, '*');
        }
      } catch (e) {}
      try {
        window.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: payload }, '*');
      } catch (e) {}

      // 2. Запись во временный localStorage для кросс-вкладочного слушателя расширения
      try {
        localStorage.setItem('peekly_auth_token', JSON.stringify({ profile: payload, ts: Date.now() }));
      } catch (e) {}

      // 3. Прямая отправка в расширение Chrome (через externally_connectable)
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
          chrome.runtime.sendMessage('ohkbcdegfepkjgljolmmonkpncjhoaek', {
            type: 'PEEKLY_AUTH_SUCCESS',
            profile: payload,
          }, () => {});
        }
      } catch (e) {}

      // 4. Автоматическое закрытие вкладки
      setTimeout(() => {
        try { window.close(); } catch (e) {}
      }, 1000);
    </script>
  </body>
</html>`;
}

export function generateErrorHtml(message: string, status = 400, _title = 'AUTHORIZATION ERROR'): string {
  const displayMessage = message || 'Authorization failed or request was cancelled.';
  const safeMessage = displayMessage
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${status} — Peekly for FACEIT</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      background-color: #000000;
      color: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    a { color: inherit; text-decoration: none; }
    
    /* Site Header */
    .site-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      height: 64px;
      background-color: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    @media (min-width: 640px) {
      .site-header { height: 80px; }
    }
    .header-inner {
      width: 100%;
      max-width: 1152px;
      margin: 0 auto;
      padding: 0 16px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    @media (min-width: 640px) {
      .header-inner { padding: 0 24px; }
    }
    .brand-link {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .brand-logo {
      color: #ffffff;
      transition: color 0.15s ease;
      height: 28px;
      width: auto;
    }
    @media (min-width: 640px) {
      .brand-logo { height: 32px; }
    }
    .brand-link:hover .brand-logo {
      color: #ff5500;
    }
    .brand-name {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 0.05em;
      color: #ffffff;
      line-height: 1;
      user-select: none;
    }
    @media (min-width: 640px) {
      .brand-name { font-size: 24px; }
    }
    @media (min-width: 768px) {
      .brand-name { font-size: 28px; }
    }
    .header-nav {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .nav-changelog {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #a3a3a3;
      transition: color 0.15s ease;
      cursor: pointer;
    }
    .nav-changelog:hover { color: #ffffff; }
    .changelog-cursor {
      color: #ffffff;
      font-family: monospace;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    .nav-lang {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #a3a3a3;
      cursor: pointer;
      user-select: none;
      transition: color 0.15s ease;
    }
    .nav-lang:hover { color: #ffffff; }
    .btn-header-install {
      display: none;
      align-items: center;
      justify-content: center;
      height: 36px;
      padding: 0 16px;
      background: #ffffff;
      color: #000000;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: background-color 0.15s ease, color 0.15s ease;
      cursor: pointer;
      margin-left: 8px;
    }
    @media (min-width: 640px) {
      .btn-header-install { display: inline-flex; }
    }
    .btn-header-install:hover {
      background: #ff5500;
      color: #000000;
    }

    /* Main Central Section */
    .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 16px 64px;
      max-width: 1024px;
      margin: 0 auto;
      width: 100%;
    }
    .error-number {
      font-family: inherit;
      font-weight: 900;
      font-size: clamp(80px, 14vw, 140px);
      color: #ffffff;
      letter-spacing: -0.04em;
      line-height: 1;
      text-align: center;
      margin: 0 0 24px 0;
      user-select: none;
      filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.95));
    }
    .error-desc {
      font-size: 15px;
      color: #8b8e96;
      line-height: 1.6;
      max-width: 440px;
      margin: 0 auto 32px;
      text-align: center;
    }
    .home-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 32px;
      background: #ffffff;
      color: #000000;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid #ffffff;
      transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      cursor: pointer;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .home-btn:hover {
      background: #ff5500;
      color: #000000;
      border-color: #ffffff;
    }

    /* Site Footer */
    .site-footer {
      width: 100%;
      background-color: #000000;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 32px 0 40px;
      margin-top: auto;
    }
    .footer-inner {
      width: 100%;
      max-width: 1152px;
      margin: 0 auto;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
    }
    @media (min-width: 768px) {
      .footer-inner {
        flex-direction: row;
        align-items: flex-end;
        padding: 0 24px;
      }
    }
    .footer-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 440px;
      gap: 12px;
      text-align: left;
    }
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .footer-logo svg {
      color: #a3a3a3;
      transition: color 0.15s ease;
    }
    .footer-logo:hover svg {
      color: #ff5500;
    }
    .footer-disclaimer {
      font-size: 11px;
      color: #737373;
      line-height: 1.6;
      margin: 0;
    }
    .footer-right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      font-size: 12px;
    }
    @media (min-width: 768px) {
      .footer-right {
        align-items: flex-end;
        text-align: right;
      }
    }
    .footer-link {
      color: #a3a3a3;
      font-size: 12px;
      transition: color 0.15s ease;
    }
    .footer-link:hover {
      color: #ffffff;
    }
    .footer-copy {
      font-size: 11px;
      color: #737373;
      margin-top: 4px;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <!-- Header matching site -->
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand-link" aria-label="Peekly Home">
        <svg width="44" height="28" viewBox="6 22 88 56" fill="none" class="brand-logo">
          <path d="M 8 50 C 24 30, 36 24, 50 24 C 64 24, 76 30, 92 50 C 76 70, 64 76, 50 76 C 36 76, 24 70, 8 50 Z M 50 29 A 21 21 0 1 0 50 71 A 21 21 0 1 0 50 29 Z" fill="currentColor" fill-rule="evenodd"/>
          <circle cx="50" cy="50" r="13.5" fill="none" stroke="currentColor" stroke-width="3.2"/>
          <circle cx="50" cy="50" r="4.5" fill="currentColor"/>
          <rect x="48.25" y="32" width="3.5" height="11.5" rx="0.5" fill="currentColor"/>
          <rect x="48.25" y="56.5" width="3.5" height="11.5" rx="0.5" fill="currentColor"/>
          <rect x="32" y="48.25" width="11.5" height="3.5" rx="0.5" fill="currentColor"/>
          <rect x="56.5" y="48.25" width="11.5" height="3.5" rx="0.5" fill="currentColor"/>
        </svg>
        <span class="brand-name">PEEKLY</span>
      </a>

      <div class="header-nav">
        <a href="/#changelog" class="nav-changelog">
          <span style="color:#ffffff;font-family:monospace;">&gt;<span class="changelog-cursor">_</span></span>
          <span style="display:inline;">Changelog</span>
        </a>

        <div class="nav-lang">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="flex-shrink:0;">
            <rect x="0" y="0" width="8" height="8" fill="#e5e5e5" />
            <rect x="5.5" y="5.5" width="8" height="8" fill="#141414" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
            <text x="4" y="6.5" font-size="6" font-family="'Inter',sans-serif" font-weight="bold" fill="#000" text-anchor="middle">文</text>
            <text x="9.5" y="12" font-size="6" font-family="'Inter',sans-serif" font-weight="bold" fill="#a3a3a3" text-anchor="middle">A</text>
          </svg>
          <span>English</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#737373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1L5 5L9 1" />
          </svg>
        </div>

        <a href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk" target="_blank" rel="noopener noreferrer" class="btn-header-install">
          INSTALL EXTENSION
        </a>
      </div>
    </div>
  </header>

  <!-- Central Error Block matching 404 exactly -->
  <main class="main-wrapper">
    <h1 class="error-number">${status}</h1>
    <p class="error-desc">${safeMessage}</p>
    <a href="/" class="home-btn">&lt; GO TO HOME PAGE</a>
  </main>
</body>
</html>`;
}

interface EventContext {
  request: Request;
  env?: Record<string, unknown>;
}

function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export async function onRequest(context: EventContext): Promise<Response> {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const stateVerifier = url.searchParams.get('state');

  // If FACEIT redirected with an error (e.g. user cancelled or access_denied)
  const oauthError = url.searchParams.get('error');
  const oauthErrorDescription = url.searchParams.get('error_description');
  if (oauthError) {
    const errorUrl = new URL('/auth/error', context.request.url);
    errorUrl.searchParams.set('status', '400');
    errorUrl.searchParams.set('message', oauthErrorDescription || oauthError);
    return Response.redirect(errorUrl.toString(), 302);
  }

  if (!code) {
    const errorUrl = new URL('/auth/error', context.request.url);
    errorUrl.searchParams.set('status', '400');
    errorUrl.searchParams.set('message', 'Missing required authorization code parameter.');
    return Response.redirect(errorUrl.toString(), 302);
  }

  // Extract PKCE verifier from state parameter (or cookie fallback)
  let verifier = '';
  if (stateVerifier) {
    verifier = stateVerifier.startsWith('v_') ? stateVerifier.substring(2) : stateVerifier;
  } else {
    const cookieHeader = context.request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/faceit_verifier=([^;]+)/);
    if (match) {
      verifier = match[1];
    }
  }

  try {
    // 1. Exchange authorization code for access token
    const basicAuth = btoa(`${FACEIT_OAUTH_CONFIG.clientId}:${FACEIT_OAUTH_CONFIG.clientSecret}`);
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code: String(code),
      redirect_uri: FACEIT_OAUTH_CONFIG.redirectUri,
    });

    // If client provided verifier via state or cookie, pass code_verifier to FACEIT
    if (verifier) {
      tokenParams.append('code_verifier', verifier);
    }

    const tokenRes = await fetch(FACEIT_OAUTH_CONFIG.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams,
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      let errDescription = errText;
      try {
        const parsed = JSON.parse(errText);
        if (parsed.error_description) {
          errDescription = parsed.error_description;
        } else if (parsed.error) {
          errDescription = parsed.error;
        }
      } catch {}

      const errorUrl = new URL('/auth/error', context.request.url);
      errorUrl.searchParams.set('status', '400');
      errorUrl.searchParams.set('message', errDescription);
      return Response.redirect(errorUrl.toString(), 302);
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string; id_token?: string };
    const accessToken = tokenData.access_token;

    let guid = '';
    let nickname = '';
    let email = '';
    let avatar = '';
    let country = '';
    let membership = 'free';

    // 2. Decode id_token if available (contains verified OpenID claims)
    if (tokenData.id_token) {
      const idPayload = parseJwt(tokenData.id_token);
      if (idPayload) {
        guid = idPayload.guid || idPayload.sub || idPayload.id || '';
        nickname = idPayload.nickname || idPayload.preferred_username || '';
        email = idPayload.email || '';
        avatar = idPayload.picture || idPayload.avatar || '';
        country = idPayload.country || '';
        membership = idPayload.membership || 'free';
      }
    }

    // 3. Fetch user profile from userEndpoint as primary/supplementary source
    if (accessToken) {
      try {
        const userRes = await fetch(FACEIT_OAUTH_CONFIG.userEndpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (userRes.ok) {
          const userData = (await userRes.json()) as {
            guid?: string;
            sub?: string;
            id?: string;
            nickname?: string;
            email?: string;
            avatar?: string;
            country?: string;
            membership?: string;
            memberships?: string[];
          };
          guid = userData.guid || userData.sub || userData.id || guid;
          nickname = userData.nickname || nickname;
          email = userData.email || email;
          avatar = userData.avatar || avatar;
          country = userData.country || country;
          membership = Array.isArray(userData.memberships)
            ? userData.memberships[0] || membership
            : userData.membership || membership;
        }
      } catch {}
    }

    if (!nickname) {
      const errorUrl = new URL('/auth/error', context.request.url);
      errorUrl.searchParams.set('status', '400');
      errorUrl.searchParams.set('message', 'Could not determine FACEIT user nickname.');
      return Response.redirect(errorUrl.toString(), 302);
    }

    // 4. Competitive CS2 stats
    let elo = 1699;
    let level = 8;
    if (nickname) {
      try {
        const playerRes = await fetch(
          `${FACEIT_OAUTH_CONFIG.playerEndpoint}/${encodeURIComponent(nickname)}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        if (playerRes.ok) {
          const playerData = (await playerRes.json()) as {
            games?: {
              cs2?: { faceit_elo?: number; skill_level?: number };
              csgo?: { faceit_elo?: number; skill_level?: number };
            };
          };
          const cs2 = playerData.games?.cs2;
          const csgo = playerData.games?.csgo;
          if (cs2?.faceit_elo != null || csgo?.faceit_elo != null) {
            elo = Number(cs2?.faceit_elo ?? csgo?.faceit_elo);
            level = Number(cs2?.skill_level ?? csgo?.skill_level);
          }
        }
      } catch {}
    }


    const userEmail =
      email ||
      (nickname.toLowerCase() === 'zeacvo'
        ? 'zeacvo@icloud.com'
        : `${nickname.toLowerCase()}@player.faceit.com`);

    const userRecord: PlayerUser = {
      guid: guid || `usr-${Date.now()}`,
      nickname,
      email: userEmail,
      avatar: avatar || 'https://assets.faceit-cdn.net/avatars/default_avatar.png',
      country: country || 'RU',
      elo,
      level,
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
      plan:
        nickname.toLowerCase() === 'zeacvo' ||
        membership.toLowerCase().includes('pro') ||
        membership.toLowerCase().includes('premium')
          ? 'PRO'
          : 'FREE',
    };

    try {
      await upsertPlayer(context.env, userRecord);
    } catch (dbErr) {
      console.warn('[Storage] Player upsert warning:', dbErr);
    }

    const isCeo =
      nickname.toLowerCase() === 'zeacvo' || userEmail.toLowerCase() === 'zeacvo@icloud.com';

    const targetUrl = isCeo
      ? new URL('/admin', context.request.url).toString()
      : new URL('/', context.request.url).toString();

    const sessionData = { nickname, email: userEmail, guid: userRecord.guid };
    const cookieValue = encodeURIComponent(JSON.stringify(sessionData));

    const headers = new Headers();
    headers.set('Location', targetUrl);
    headers.append(
      'Set-Cookie',
      `peekly_auth=${cookieValue}; Path=/; SameSite=Lax; Max-Age=2592000`
    );

    return new Response(null, {
      status: 302,
      headers,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const errorUrl = new URL('/auth/error', context.request.url);
    errorUrl.searchParams.set('status', '500');
    errorUrl.searchParams.set('message', message);
    return Response.redirect(errorUrl.toString(), 302);
  }
}

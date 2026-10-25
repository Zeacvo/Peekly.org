/**
 * FACEIT OAuth Callback Endpoint (Cloudflare Pages Function & Dev Middleware)
 * Client ID: d58837f4-984d-41a5-bd76-615ef5156660
 * Redirect URI: https://peekly.org/api/auth/faceit/callback
 */

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

export function generateErrorHtml(message: string, status = 400, title = 'AUTHORIZATION ERROR'): string {
  const safeMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const statusBadge = status === 400
    ? 'STATUS: BAD_REQUEST'
    : status === 500
    ? 'STATUS: SERVER_ERROR'
    : `STATUS: ERROR_${status}`;

  const statusTitleText = status === 400 ? 'Bad Request' : status === 500 ? 'Internal Server Error' : 'Error';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${status}: ${statusTitleText} — Peekly</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #000000;
      color: #ffffff;
      font-family: 'Play', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .background-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    .container {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 20px;
      max-width: 680px;
    }
    .watermark-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
    .watermark-number {
      font-size: clamp(80px, 15vw, 140px);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.04em;
      color: #ffffff;
      text-shadow: 0 8px 32px rgba(0, 0, 0, 0.95);
      user-select: none;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #0f1013;
      border: 1px solid #1f2127;
      padding: 5px 12px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #8b8e96;
      margin-bottom: 16px;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff5500;
      box-shadow: 0 0 8px #ff5500;
    }
    .title {
      font-size: clamp(24px, 4vw, 32px);
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 12px;
      color: #ffffff;
    }
    .subtitle {
      font-size: 14px;
      color: #8b8e96;
      line-height: 1.6;
      margin-bottom: 32px;
      max-width: 480px;
      word-break: break-word;
    }
    .home-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #ffffff;
      color: #000000;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      border: 1px solid #ffffff;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .home-btn:hover {
      background: #ff5500;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 0 0 16px rgba(255, 85, 0, 0.4);
    }
  </style>
</head>
<body>
  <div class="background-grid"></div>
  <div class="container">
    <div class="watermark-container">
      <div class="watermark-number">${status}</div>
    </div>
    
    <div class="status-badge">
      <span class="status-dot"></span>
      ${statusBadge}
    </div>

    <h1 class="title">${title}</h1>
    <p class="subtitle">${safeMessage}</p>

    <a href="/" class="home-btn">&lt; Go to home page</a>
  </div>
</body>
</html>`;
}

interface EventContext {
  request: Request;
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
    return new Response(
      generateErrorHtml(oauthErrorDescription || oauthError, 400, 'AUTHORIZATION ERROR'),
      {
        status: 400,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }

  if (!code) {
    return new Response(generateErrorHtml('Missing required authorization code parameter.', 400), {
      status: 400,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
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

      return new Response(
        generateErrorHtml(errDescription, 400, 'AUTHORIZATION ERROR'),
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string; id_token?: string };
    const accessToken = tokenData.access_token;

    let guid = '';
    let nickname = '';
    let avatar = '';
    let country = '';
    let membership = 'free';

    // 2. Decode id_token if available (contains verified OpenID claims)
    if (tokenData.id_token) {
      const idPayload = parseJwt(tokenData.id_token);
      if (idPayload) {
        guid = idPayload.guid || idPayload.sub || idPayload.id || '';
        nickname = idPayload.nickname || idPayload.preferred_username || '';
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
            avatar?: string;
            country?: string;
            membership?: string;
            memberships?: string[];
          };
          guid = userData.guid || userData.sub || userData.id || guid;
          nickname = userData.nickname || nickname;
          avatar = userData.avatar || avatar;
          country = userData.country || country;
          membership = Array.isArray(userData.memberships)
            ? userData.memberships[0] || membership
            : userData.membership || membership;
        }
      } catch {}
    }

    if (!nickname) {
      return new Response(
        generateErrorHtml(`Could not determine FACEIT user nickname: ${JSON.stringify(tokenData)}`, 400),
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
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

    const profile: FaceitProfilePayload = {
      guid,
      nickname,
      avatar,
      country,
      elo,
      level,
      membership,
    };

    // Redirect user to the extension completion page with profile payload
    const successUrl = new URL('/auth/extension-success', context.request.url);
    successUrl.searchParams.set('data', JSON.stringify(profile));

    return Response.redirect(successUrl.toString(), 302);
  } catch (err) {
    const message = err instanceof Error ? (err.stack || err.message) : String(err);
    return new Response(generateErrorHtml(`Internal Error: ${message}`, 400), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { onRequest as onCallbackRequest, generateErrorHtml } from './functions/api/auth/faceit/callback.ts';
import { onRequest as onLoginRequest } from './functions/api/auth/faceit/login.ts';
import { onRequest as onSuccessRequest } from './functions/auth/extension-success.ts';
import { onRequest as onFeedbackRequest } from './functions/api/feedback.ts';

function spa404Plugin(): Plugin {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
    },
  };
}

function faceitOAuthDevPlugin(): Plugin {
  return {
    name: 'faceit-oauth-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, 'http://localhost:5173');
        if (
          url.pathname === '/api/auth/faceit/callback' ||
          url.pathname === '/api/auth/faceit/login' ||
          url.pathname === '/auth/extension-success' ||
          url.pathname === '/api/feedback'
        ) {
          try {
            const fullUrl = `http://localhost:5173${req.url}`;
            const headers = new Headers();
            for (const [key, val] of Object.entries(req.headers)) {
              if (Array.isArray(val)) {
                for (const v of val) headers.append(key, v);
              } else if (typeof val === 'string') {
                headers.set(key, val);
              }
            }

            let reqBody: Buffer | undefined;
            if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
              const chunks: Buffer[] = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              }
              if (chunks.length > 0) {
                reqBody = Buffer.concat(chunks);
              }
            }

            const webReq = new Request(fullUrl, {
              method: req.method,
              headers,
              body: reqBody,
              duplex: 'half',
            } as RequestInit);

            let response: Response;
            if (url.pathname === '/api/auth/faceit/login') {
              response = await onLoginRequest();
            } else if (url.pathname === '/auth/extension-success') {
              response = await onSuccessRequest({ request: webReq });
            } else if (url.pathname === '/api/feedback') {
              response = await onFeedbackRequest({ request: webReq });
            } else {
              response = await onCallbackRequest({ request: webReq });
            }

            res.statusCode = response.status;
            response.headers.forEach((val: string, key: string) => {
              res.setHeader(key, val);
            });
            const body = await response.text();
            res.end(body);
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(generateErrorHtml(String(err), 500, 'SERVER ERROR'));
            return;
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    faceitOAuthDevPlugin(),
    spa404Plugin(),
  ],
});

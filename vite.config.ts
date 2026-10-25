import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { onRequest } from './functions/api/auth/faceit/callback.ts';

function faceitOAuthDevPlugin(): Plugin {
  return {
    name: 'faceit-oauth-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, 'http://localhost:5173');
        if (url.pathname === '/api/auth/faceit/callback') {
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

            const webReq = new Request(fullUrl, {
              method: req.method,
              headers,
            });
            const response = await onRequest({ request: webReq });
            res.statusCode = response.status;
            response.headers.forEach((val: string, key: string) => {
              res.setHeader(key, val);
            });
            const body = await response.text();
            res.end(body);
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(String(err));
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
  ],
});

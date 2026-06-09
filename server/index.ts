import express from 'express';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const canonicalHost = 'www.umrahtaxi.cab';

function stripTrailingSlash(value: string) {
  if (value === '/') return value;
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, '..', 'dist', 'public');

  app.use((req, res, next) => {
    const host = req.headers.host?.split(':')[0];

    if (process.env.NODE_ENV === 'production' && host === 'umrahtaxi.cab') {
      res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
      return;
    }

    next();
  });

  app.use(express.static(staticPath, { redirect: false }));

  // Handle client-side routes and serve generated SEO HTML files when present.
  app.get('*', (req, res) => {
    const normalizedPath = stripTrailingSlash(req.path);
    const safePath = normalizedPath.replace(/^\/+/, '').replace(/\.\./g, '');
    const routeHtml = safePath
      ? path.join(staticPath, safePath, 'index.html')
      : path.join(staticPath, 'index.html');

    if (fs.existsSync(routeHtml)) {
      res.sendFile(routeHtml);
      return;
    }

    res.sendFile(path.join(staticPath, 'index.html'));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

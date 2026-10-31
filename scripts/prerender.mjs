import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Read service routes and data dynamically or parse from file
const serviceRoutesFile = path.resolve(rootDir, 'src/data/serviceRoutes.ts');
const serviceRoutesContent = fs.readFileSync(serviceRoutesFile, 'utf-8');
const routeMatches = [...serviceRoutesContent.matchAll(/'([^']+)'/g)].map((m) => m[1]);

console.log(`[prerender] Found ${routeMatches.length} service routes to prepare.`);

const distIndexHtml = path.resolve(distDir, 'index.html');
if (!fs.existsSync(distIndexHtml)) {
  console.log('[prerender] dist/index.html not found yet. Run `vite build` first.');
  process.exit(0);
}

const template = fs.readFileSync(distIndexHtml, 'utf-8');

for (const route of routeMatches) {
  const targetDir = path.resolve(distDir, route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Customize page canonical and title if matching pattern
  const pageHtml = template
    .replace(
      /<link rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="https://smartscaletech.vercel.app/${route}" />`
    )
    .replace(
      /<meta property="og:url"[^>]*>/i,
      `<meta property="og:url" content="https://smartscaletech.vercel.app/${route}" />`
    );

  fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`[prerender] Wrote static entry: /${route}/index.html`);
}

console.log('[prerender] Static HTML prerendering complete!');

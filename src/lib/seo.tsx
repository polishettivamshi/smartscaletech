import { useEffect } from 'react';

export const SITE_URL = 'https://smartscaletech.vercel.app';

type JsonLd = Record<string, unknown>;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: JsonLd[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Held across mounts so it can be re-attached when returning to the homepage. */
let homeFaqSchema: HTMLScriptElement | null = null;

/**
 * The homepage FAQPage ships in index.html so it is present before hydration.
 * It must not appear on service routes, which inject their own FAQPage —
 * two competing FAQPage entities on one page is invalid structured data.
 */
function syncHomeFaqSchema(isHome: boolean): void {
  if (!homeFaqSchema) {
    homeFaqSchema = document.head.querySelector<HTMLScriptElement>('script[data-home-faq]');
  }
  if (!homeFaqSchema) return;

  if (isHome) {
    if (!homeFaqSchema.isConnected) document.head.appendChild(homeFaqSchema);
  } else if (homeFaqSchema.isConnected) {
    homeFaqSchema.remove();
  }
}

/**
 * Per-route head manager. Googlebot renders client-side JS, so it reads the
 * title, description, canonical and JSON-LD this injects on mount.
 */
export const SEO = ({ title, description, path, jsonLd = [] }: SEOProps) => {
  const jsonLdString = JSON.stringify(jsonLd);

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    syncHomeFaqSchema(path === '/');

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const blocks: JsonLd[] = JSON.parse(jsonLdString);
    const created = blocks.map((block) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      return script;
    });

    return () => created.forEach((script) => script.remove());
  }, [title, description, path, jsonLdString]);

  return null;
};

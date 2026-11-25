import { canonicalServiceSlugs } from './serviceRoutes';
import { servicePages, ServicePageData, WHATSAPP_URL } from './servicePages';

export type ServiceVertical = 'business' | 'career';

export interface StructuredServiceEntry {
  slug: string;
  canonicalPath: string;
  legacyPath?: string;
  vertical: ServiceVertical;
  name: string;
  shortDesc: string;
  categoryLabel: string;
  badge: string;
  h1: string;
  h1Highlight: string;
  intro: string[];
  problemsSolved: string[];
  benefits: { title: string; desc: string }[];
  deliverables: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  technologies: string[];
  pricingSummary: string;
  priceTag: string;
  offerServiceId?: string;
  priceOffer?: {
    standardPrice: number | readonly [number, number];
    offerPrice: number | readonly [number, number];
  };
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  previewImage: string;
  previewAlt: string;
}

const OFFER_SERVICE_BY_SLUG: Record<string, string> = {
  'web-development': 'web-development',
  'ui-ux-design': 'ui-ux-design',
  'ai-integration': 'ai-integration',
  'api-development': 'api-development',
  'cloud-devops': 'cloud-devops',
  'seo-growth': 'seo-growth',
  'content-strategy': 'content-strategy',
  'ad-campaigns': 'ad-campaigns',
  'brand-identity': 'brand-identity',
  'resume-writing': 'ats-resume',
  'linkedin-optimization': 'linkedin-opt',
  'naukri-optimization': 'naukri-indeed',
  'indeed-optimization': 'naukri-indeed',
  'interview-coaching': 'interview-coaching',
  'github-audit': 'github-audit',
  'cover-letter': 'cover-letter',
  'salary-negotiation': 'salary-negotiation',
  'personal-portfolio': 'portfolio-site',
  'final-year-projects': 'final-year-project',
  'resume-writing-freshers-hyderabad': 'ats-resume',
  'linkedin-profile-writer-software-engineers-hyderabad': 'linkedin-opt',
  'freelance-portfolio-website-hyderabad': 'portfolio-site',
};

const LEGACY_PRICE_OFFERS: Record<
  string,
  { standardPrice: number | readonly [number, number]; offerPrice: number | readonly [number, number] }
> = {
  'executive-resume-writing-hyderabad': { standardPrice: 2499, offerPrice: 1999 },
  'college-placement-resume-hyderabad': {
    standardPrice: [799, 999],
    offerPrice: [639, 799],
  },
};

export function getOfferServiceId(slug: string): string | undefined {
  return OFFER_SERVICE_BY_SLUG[slug];
}

const BUSINESS_SLUGS: Record<string, StructuredServiceEntry> = {
  'web-development': {
    slug: 'web-development',
    offerServiceId: 'web-development',
    canonicalPath: '/services/web-development',
    legacyPath: '/web-development-hyderabad',
    vertical: 'business',
    name: 'Web Development',
    shortDesc: 'Custom websites and scalable React, Python, FastAPI & Django web applications.',
    categoryLabel: 'Tech & Design',
    badge: 'Business Solutions',
    h1: 'Custom Web Development',
    h1Highlight: 'Websites & Full-Stack Apps',
    intro: [
      'Templates bloat page weight and flatten your positioning. We engineer fast, responsive websites and custom full-stack web applications using React, TypeScript, Python, FastAPI, and Django.',
      'From initial information architecture and REST backends through technical SEO, lead capture, and edge cloud deployment, every build is structured for mobile speed and search visibility.',
    ],
    problemsSolved: [
      'Slow multi-second loading on Indian mobile networks',
      'Generic theme layouts or brittle spreadsheets holding operations back',
      'Missing Search Console, sitemap, and structured JSON-LD setup',
    ],
    benefits: [
      { title: 'Clean, maintainable codebase', desc: 'Zero bloated page builders—you retain full code ownership.' },
      { title: 'Mobile-first layout discipline', desc: 'Responsive UI tested across desktop, tablet, and mobile viewports.' },
      { title: 'Search-structured from launch', desc: 'Semantic headings, OpenGraph metadata, and prerendered HTML readiness.' },
    ],
    deliverables: [
      { title: 'Custom websites & web apps', desc: 'Tailored landing pages, company sites, or custom SaaS dashboards.' },
      { title: 'Lead & WhatsApp integration', desc: 'Validated inquiry forms plus direct WhatsApp & email workflows.' },
      { title: 'Technical SEO setup', desc: 'Sitemap, robots, metadata, and structured schema implementation.' },
      { title: 'Cloud deployment & walkthrough', desc: 'Live production deploy plus full source code repository handover.' },
    ],
    process: [
      { title: 'Discover', desc: 'Clarify your target audience, workflows, and conversion path.' },
      { title: 'Architecture & UI', desc: 'Map sitemap structure, editorial typography, and wireframes.' },
      { title: 'Build & Review', desc: 'Develop responsive React components and APIs, then review staging.' },
      { title: 'Launch & Handover', desc: 'Deploy to edge hosting, verify indexing, and hand over full source code.' },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Python / FastAPI', 'Django / Node.js', 'Edge Cloud Hosting'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹7,999, save ₹2,000 off ₹9,999.',
    priceTag: 'From ₹7,999',
    faqs: servicePages['web-development-hyderabad'].faqs,
    relatedSlugs: ['ui-ux-design', 'api-development', 'seo-growth'],
    previewImage: '/assets/aistudio/web_development_8934074c.webp',
    previewAlt: 'Custom Web Development with React, Python, FastAPI, Django and JavaScript for modern business websites and web apps',
  },
  'ui-ux-design': {
    slug: 'ui-ux-design',
    offerServiceId: 'ui-ux-design',
    canonicalPath: '/services/ui-ux-design',
    legacyPath: '/ui-ux-design-hyderabad',
    vertical: 'business',
    name: 'UI/UX Design',
    shortDesc: 'Editorial interfaces, wireframes, and scalable Figma design systems.',
    categoryLabel: 'Design & Experience',
    badge: 'Business Solutions',
    h1: 'UI/UX Design Systems',
    h1Highlight: 'Built to Convert & Scale',
    intro: servicePages['ui-ux-design-hyderabad'].intro,
    problemsSolved: [
      'Cluttered screens causing visitors to drop off before understanding the offer',
      'Inconsistent buttons, spacing, and typography across product views',
      'Friction in onboarding, checkout, or lead submission flows',
    ],
    benefits: [
      { title: 'Hierarchy-first layouts', desc: 'Clear reading rhythm and intentional contrast on every viewport.' },
      { title: 'Engineering-aware specs', desc: 'Tokens and components designed for seamless React/CSS translation.' },
      { title: 'Accessible interaction states', desc: 'Focus styles, error banners, and readable mobile tap targets.' },
    ],
    deliverables: servicePages['ui-ux-design-hyderabad'].included,
    process: servicePages['ui-ux-design-hyderabad'].process,
    technologies: ['Figma', 'Component Tokens', 'Responsive Grids', 'Usability Audits', 'Prototyping'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹3,199, save ₹800 off ₹3,999.',
    priceTag: 'From ₹3,199',
    faqs: servicePages['ui-ux-design-hyderabad'].faqs,
    relatedSlugs: ['web-development', 'brand-identity', 'content-strategy'],
    previewImage: '/assets/aistudio/UI_UX_Design_Transformation__Before_and_After_4e26727a.webp',
    previewAlt: 'UI/UX Design system transformation before and after',
  },
  'ai-integration': {
    slug: 'ai-integration',
    offerServiceId: 'ai-integration',
    canonicalPath: '/services/ai-integration',
    vertical: 'business',
    name: 'AI Integration',
    shortDesc: 'Server-side AI advisors, document workflows, and structured automation.',
    categoryLabel: 'Automation & Intelligence',
    badge: 'Business Solutions',
    h1: 'AI Integration & Workflows',
    h1Highlight: 'Practical Automation',
    intro: [
      'We help businesses integrate practical AI capabilities—from grounded customer service advisors and knowledge search to structured document triage—without exposing API keys or relying on brittle prompts.',
      'Every integration runs behind server-side proxy endpoints with strict validation, graceful fallbacks, and clean UI controls.',
    ],
    problemsSolved: [
      'Repetitive lead qualification and FAQ inquiries consuming team time',
      'Unstructured documents or knowledge bases that are hard to search',
      'Prototype AI demos missing timeout handling, validation, or human handoff',
    ],
    benefits: [
      { title: 'Server-side key safety', desc: 'Credentials stay strictly in server environment variables, never in browser code.' },
      { title: 'Deterministic fallbacks', desc: 'If an upstream model times out, structured domain logic responds reliably.' },
      { title: 'Human handoff built in', desc: 'Seamless routing to WhatsApp or email whenever human judgement is needed.' },
    ],
    deliverables: [
      { title: 'Custom AI workflow or advisor', desc: 'Tailored to your service catalog, pricing, or documentation.' },
      { title: 'Express / FastAPI proxy routes', desc: 'Input sanitization, rate discipline, and safe payload limits.' },
      { title: 'Clean conversational or form UI', desc: 'Accessible controls with starter prompts, copy, and reset.' },
    ],
    process: [
      { title: 'Use-case audit', desc: 'Verify where AI saves measurable time vs. where simple rules work better.' },
      { title: 'Knowledge grounding', desc: 'Structure accurate service facts so responses never invent claims.' },
      { title: 'API & UI build', desc: 'Connect backend endpoints with reliable fallback handling.' },
      { title: 'Testing & deploy', desc: 'Verify latency, edge cases, and mobile responsiveness.' },
    ],
    technologies: ['Gemini / LLM APIs', 'Node.js / Express', 'Python / FastAPI', 'Structured Extraction', 'React UI'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹6,399, save ₹1,600 off ₹7,999.',
    priceTag: 'From ₹6,399',
    faqs: [
      { q: 'Will my API keys be exposed in the frontend?', a: 'Never. All model requests execute on server-side routes using protected environment configuration.' },
      { q: 'What happens if the AI API is unavailable?', a: 'We engineer clean domain fallbacks and direct WhatsApp/email handoff so visitors are never stuck.' },
    ],
    relatedSlugs: ['api-development', 'web-development', 'cloud-devops'],
    previewImage: '/assets/aistudio/AI_Integration_Tech_Illustration_b5cebfe1.webp',
    previewAlt: 'Custom AI workflow integration architecture',
  },
  'api-development': {
    slug: 'api-development',
    offerServiceId: 'api-development',
    canonicalPath: '/services/api-development',
    vertical: 'business',
    name: 'API Development & Integration',
    shortDesc: 'REST/GraphQL APIs plus third-party payment, maps, CRM & webhook integrations.',
    categoryLabel: 'Tech & Design',
    badge: 'Business Solutions',
    h1: 'API Development & Integration',
    h1Highlight: 'Reliable Backend Systems',
    intro: [
      'We build predictable REST and GraphQL APIs in Node.js (Express/TypeScript) and Python (FastAPI/Django) alongside third-party integrations for payments, maps, CRMs, webhooks, and analytics.',
      'Every endpoint ships with strict input validation, rate-limit protection, timeout safeguards, and clean OpenAPI documentation.',
    ],
    problemsSolved: [
      'Unvalidated webhook endpoints or fragile backend scripts breaking silently',
      'Missing API documentation slowing down frontend collaboration',
      'Manual copy-pasting between website inquiries, payments, and CRM tools',
    ],
    benefits: [
      { title: 'Clean schemas & validation', desc: 'Strict request checking before data touches your database.' },
      { title: 'Idempotent 3rd-party webhooks', desc: 'Retries, timeouts, and server-side secret hygiene built in.' },
      { title: 'OpenAPI / endpoint docs', desc: 'Clear contracts for your frontend and mobile developers.' },
    ],
    deliverables: [
      { title: 'Production REST / GraphQL APIs', desc: 'Modular routes with validation, auth, and rate limiting.' },
      { title: 'Third-party webhook & SDK setup', desc: 'Payment gateways, WhatsApp/email dispatch, maps & CRM connectors.' },
      { title: 'Database models & tests', desc: 'Structured persistence with automated endpoint checks.' },
    ],
    process: [
      { title: 'Contract & provider review', desc: 'Agree on endpoints, rate limits, auth, and webhook payloads.' },
      { title: 'Implementation', desc: 'Write typed controllers, database queries, and security headers.' },
      { title: 'Integration testing', desc: 'Verify happy paths, invalid input rejection, and timeout safety.' },
      { title: 'Deployment', desc: 'Deploy and hand over full repository with env template.' },
    ],
    technologies: ['FastAPI', 'Node.js / Express', 'Django', 'PostgreSQL', 'REST / GraphQL', 'OAuth & Webhooks'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹3,999, save ₹1,000 off ₹4,999.',
    priceTag: 'From ₹3,999',
    faqs: [
      { q: 'Can you connect to an existing React or mobile frontend?', a: 'Yes, we align directly with your existing frontend payloads or refactor them cleanly together.' },
      { q: 'Can you integrate payment links, UPI, or WhatsApp notifications?', a: 'Yes, we build direct mobile-compatible UPI workflows and structured WhatsApp/email dispatch.' },
    ],
    relatedSlugs: ['web-development', 'cloud-devops', 'ai-integration'],
    previewImage: '/assets/aistudio/API_Development_and_Integration_Infographic_b3aa9d6c.webp',
    previewAlt: 'API Development and Third-Party API Integration including payments, maps, databases and webhooks',
  },
  'cloud-devops': {
    slug: 'cloud-devops',
    offerServiceId: 'cloud-devops',
    canonicalPath: '/services/cloud-devops',
    vertical: 'business',
    name: 'Cloud Deployment & DevOps',
    shortDesc: 'Docker packaging, CI/CD pipelines, SSL domains, and reliable hosting.',
    categoryLabel: 'Infrastructure & Delivery',
    badge: 'Business Solutions',
    h1: 'Cloud Deployment & DevOps',
    h1Highlight: 'Predictable Releases',
    intro: [
      'Ship confidently with containerized builds, automated GitHub Actions CI/CD, custom domain SSL, and practical cloud deployment setups tailored to your budget.',
    ],
    problemsSolved: [
      'Manual FTP or ad-hoc deployments breaking live production sites',
      'High monthly cloud bills for simple marketing or portfolio sites',
      'Missing SSL, DNS misconfigurations, or broken SPA routing',
    ],
    benefits: [
      { title: 'Right-sized hosting', desc: 'Static CDN hosting where possible (₹0/mo tier) or clean containerized backends.' },
      { title: 'Automated CI/CD', desc: 'Build and deploy checks triggered automatically from Git pushes.' },
    ],
    deliverables: [
      { title: 'Docker & build setup', desc: 'Reproducible production container or static edge configuration.' },
      { title: 'CI/CD workflow', desc: 'GitHub Actions build & test verification pipeline.' },
      { title: 'DNS, SSL & routing', desc: 'Custom domain configuration with clean SPA/server routing.' },
    ],
    process: [
      { title: 'Environment audit', desc: 'Review repo build scripts, env vars, and traffic requirements.' },
      { title: 'Pipeline setup', desc: 'Configure containerization, build validation, and secrets.' },
      { title: 'Cutover & docs', desc: 'Verify HTTPS, custom domains, and hand over runbook.' },
    ],
    technologies: ['Docker', 'GitHub Actions', 'Vercel / Cloud Run', 'Nginx', 'HTTPS / DNS'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹3,199, save ₹800 off ₹3,999.',
    priceTag: 'From ₹3,199',
    faqs: [
      { q: 'Do we keep ownership of our cloud and GitHub accounts?', a: 'Always. We configure everything inside your own organization accounts.' },
    ],
    relatedSlugs: ['web-development', 'api-development', 'seo-growth'],
    previewImage: '/assets/aistudio/Cloud_Deployment___DevOps_Infographic_21d73257.webp',
    previewAlt: 'Cloud deployment and DevOps CI/CD pipeline',
  },
  'seo-growth': {
    slug: 'seo-growth',
    offerServiceId: 'seo-growth',
    canonicalPath: '/services/seo-growth',
    vertical: 'business',
    name: 'Digital Marketing (SEO & Growth)',
    shortDesc: 'Technical SEO, structured schema, sitemaps, and search visibility.',
    categoryLabel: 'Growth & Visibility',
    badge: 'Marketing & Growth',
    h1: 'Technical SEO & Search Growth',
    h1Highlight: 'Clean Discoverability',
    intro: [
      'Search visibility starts with clean HTML architecture, structured JSON-LD schema, canonical discipline, and fast loading—not keyword stuffing.',
    ],
    problemsSolved: [
      'React SPAs invisible to crawlers due to missing prerendered metadata',
      'Duplicate URLs or missing sitemaps preventing Google Search Console indexing',
      'Missing Organization, Service, and FAQ structured data',
    ],
    benefits: [
      { title: 'Crawler-ready architecture', desc: 'Unique page titles, descriptions, canonicals, and static route HTML.' },
      { title: 'Honest growth baseline', desc: 'Clean analytics setup and verified Search Console submission.' },
    ],
    deliverables: [
      { title: 'Technical SEO audit & fixes', desc: 'Heading hierarchy, canonical tags, and performance polish.' },
      { title: 'JSON-LD structured schema', desc: 'Organization, Service, Breadcrumb, and FAQ schema.' },
      { title: 'Sitemap & Search Console setup', desc: 'Clean XML sitemap ready for submission.' },
    ],
    process: [
      { title: 'Technical crawl audit', desc: 'Identify indexing blockers, slow assets, and missing metadata.' },
      { title: 'Implementation', desc: 'Wire canonical tags, schema, prerendering, and sitemap.' },
      { title: 'Verification', desc: 'Validate markup and submit updated sitemap.' },
    ],
    technologies: ['Technical SEO', 'JSON-LD Schema', 'Google Search Console', 'Core Web Vitals', 'Prerendering'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹2,399, save ₹600 off ₹2,999.',
    priceTag: 'From ₹2,399',
    faqs: [
      { q: 'Do you guarantee a #1 Google rank?', a: 'No ethical agency can guarantee search rankings, as algorithms depend on competition and domain history. We implement clean technical foundations so search engines index your site accurately.' },
    ],
    relatedSlugs: ['content-strategy', 'web-development', 'ad-campaigns'],
    previewImage: '/assets/aistudio/SEO_Optimization__From_Fourth_to_First_18c20dc6.webp',
    previewAlt: 'Technical SEO and structured schema optimization',
  },
  'content-strategy': {
    slug: 'content-strategy',
    offerServiceId: 'content-strategy',
    canonicalPath: '/services/content-strategy',
    vertical: 'business',
    name: 'Content Strategy',
    shortDesc: 'Clear landing page copy, service positioning, and search-aligned editorial plans.',
    categoryLabel: 'Growth & Visibility',
    badge: 'Marketing & Growth',
    h1: 'Content Strategy & Copywriting',
    h1Highlight: 'Clear Positioning',
    intro: [
      'Good design cannot rescue vague copy. We write concise, straightforward landing pages, service explanations, and editorial topic calendars rooted in what buyers actually ask.',
    ],
    problemsSolved: [
      'Jargon-heavy websites where visitors cannot tell what you sell in 5 seconds',
      'Inconsistent tone across homepages, service pages, and LinkedIn posts',
    ],
    benefits: [
      { title: 'Plain-spoken clarity', desc: 'Direct explanation of who you serve, what you deliver, and how to start.' },
      { title: 'Zero hollow buzzwords', desc: 'Authentic positioning that earns reader trust.' },
    ],
    deliverables: [
      { title: 'Website & landing page copy', desc: 'Structured headlines, problem/solution sections, and clear CTAs.' },
      { title: '30-day editorial roadmap', desc: 'Topic clusters mapped to buyer questions and search intent.' },
    ],
    process: [
      { title: 'Voice & offer discovery', desc: 'Extract your real differentiators and client questions.' },
      { title: 'Drafting & structuring', desc: 'Write scannable copy aligned to visual layout blocks.' },
      { title: 'Review & finalize', desc: 'Refine wording collaboratively until accurate.' },
    ],
    technologies: ['UX Copywriting', 'Topic Clusters', 'Editorial Calendars', 'Positioning'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹1,599, save ₹400 off ₹1,999.',
    priceTag: 'From ₹1,599',
    faqs: [
      { q: 'Can you rewrite existing website text?', a: 'Yes, we audit your existing pages and supply structured replacement copy ready for deployment.' },
    ],
    relatedSlugs: ['seo-growth', 'brand-identity', 'web-development'],
    previewImage: '/assets/aistudio/Content_Strategy_Planning_Illustration_8d124a95.webp',
    previewAlt: 'Content strategy editorial planning',
  },
  'ad-campaigns': {
    slug: 'ad-campaigns',
    offerServiceId: 'ad-campaigns',
    canonicalPath: '/services/ad-campaigns',
    vertical: 'business',
    name: 'Ad Campaigns',
    shortDesc: 'Structured Google & Meta campaign setup with conversion tracking.',
    categoryLabel: 'Growth & Visibility',
    badge: 'Marketing & Growth',
    h1: 'Paid Search & Social Campaigns',
    h1Highlight: 'Measured Acquisition',
    intro: [
      'Launch targeted Google Search and Meta lead campaigns paired with fast landing pages and properly wired conversion tracking—so every rupee spent is measurable.',
    ],
    problemsSolved: [
      'Wasted ad spend on broad keywords without negative keyword lists',
      'Missing pixel or conversion events making ROI impossible to track',
    ],
    benefits: [
      { title: 'Landing page alignment', desc: 'Ads point to focused pages matching the exact search intent.' },
      { title: 'Transparent setup', desc: 'Campaigns live inside your own ad accounts with full billing visibility.' },
    ],
    deliverables: [
      { title: 'Campaign & ad group architecture', desc: 'Intent-segmented search or audience targeting setup.' },
      { title: 'Ad copy & creative briefs', desc: 'Clean, policy-compliant variations tailored to your offer.' },
      { title: 'Conversion tracking setup', desc: 'Lead form and WhatsApp click measurement.' },
    ],
    process: [
      { title: 'Goal & budget alignment', desc: 'Define target geography, lead cost limits, and offer.' },
      { title: 'Tracking & build', desc: 'Configure ad groups, exclusions, and landing events.' },
      { title: 'Launch review', desc: 'Verify delivery and hand over clear performance metrics.' },
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'Conversion Tracking', 'Landing Optimization'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹2,399, save ₹600 off ₹2,999 (ad spend remains separate).',
    priceTag: 'From ₹2,399',
    faqs: [
      { q: 'Does the setup price include ad budget?', a: 'No, the offer price covers campaign setup, targeting, and tracking configuration. Your ad budget is billed directly by Google or Meta inside your own ad account.' },
    ],
    relatedSlugs: ['seo-growth', 'content-strategy', 'web-development'],
    previewImage: '/assets/aistudio/Ad_Campaigns_Marketing_Illustration_e01f5573.webp',
    previewAlt: 'Google and Meta ad campaign targeting and setup',
  },
  'brand-identity': {
    slug: 'brand-identity',
    offerServiceId: 'brand-identity',
    canonicalPath: '/services/brand-identity',
    vertical: 'business',
    name: 'Brand Identity',
    shortDesc: 'Minimalist logos, color systems, typography pairings, and visual kits.',
    categoryLabel: 'Design & Experience',
    badge: 'Design & Brand',
    h1: 'Brand Identity Systems',
    h1Highlight: 'Cohesive Visual Language',
    intro: [
      'Establish a cohesive, memorable visual presence across web, social profiles, and documents—built on disciplined typography, accessible color palettes, and crisp vector marks.',
    ],
    problemsSolved: [
      'Fragmented logos and mismatched colors across LinkedIn, decks, and website',
      'Low-contrast graphics that fail on mobile screens',
    ],
    benefits: [
      { title: 'Built for web and print', desc: 'Vector marks and color tokens engineered for real contrast.' },
      { title: 'Ready-to-use templates', desc: 'LinkedIn banners, profile avatars, and CSS palette tokens included.' },
    ],
    deliverables: [
      { title: 'Logo mark suite', desc: 'Clean vector SVG and PNG variants for light and dark backgrounds.' },
      { title: 'Color & font guidelines', desc: 'Accessible color values and Google Font pairings.' },
      { title: 'Social & web collateral', desc: 'Branded headers and open-graph social card assets.' },
    ],
    process: [
      { title: 'Positioning brief', desc: 'Review industry benchmarks and brand personality.' },
      { title: 'Concept directions', desc: 'Explore typographic and mark directions cleanly.' },
      { title: 'System handover', desc: 'Deliver vector sources and digital brand sheet.' },
    ],
    technologies: ['Vector SVG', 'Design Tokens', 'Typography Systems', 'Social Collateral'],
    pricingSummary: 'Exclusive Startup Launch Offer: starting from ₹1,999, save ₹500 off ₹2,499.',
    priceTag: 'From ₹1,999',
    faqs: [
      { q: 'Do I receive scalable SVG source files?', a: 'Yes, you receive vector SVGs alongside crisp PNG exports.' },
    ],
    relatedSlugs: ['ui-ux-design', 'web-development', 'content-strategy'],
    previewImage: '/assets/aistudio/Brand_Identity_Design_System_2afc4b6a.webp',
    previewAlt: 'Brand identity system color palette and logo kit',
  },
};

const CAREER_SLUGS: Record<string, StructuredServiceEntry> = {
  'resume-writing': {
    slug: 'resume-writing',
    offerServiceId: 'ats-resume',
    canonicalPath: '/services/resume-writing',
    legacyPath: '/ats-resume-writing-hyderabad',
    vertical: 'career',
    name: 'ATS Resume Writing',
    shortDesc: 'Single-column ATS-safe resumes engineered around role keywords and quantified impact.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'ATS Resume Writing',
    h1Highlight: 'Built for Screening & Hiring Managers',
    intro: servicePages['ats-resume-writing-hyderabad'].intro,
    problemsSolved: [
      'Multi-column Canva templates scrambling inside Workday or Naukri parsers',
      'Task-list bullet points lacking measurable outcomes and technical context',
      'Missing role keywords that drop qualified candidates out of ATS filters',
    ],
    benefits: servicePages['ats-resume-writing-hyderabad'].why,
    deliverables: servicePages['ats-resume-writing-hyderabad'].included,
    process: servicePages['ats-resume-writing-hyderabad'].process,
    technologies: ['Workday & Taleo Safe', 'Naukri Parsing', 'STAR Bullet Architecture', 'Editable Word + PDF'],
    pricingSummary: servicePages['ats-resume-writing-hyderabad'].pricing,
    priceTag: 'From ₹239',
    faqs: servicePages['ats-resume-writing-hyderabad'].faqs,
    relatedSlugs: ['linkedin-optimization', 'naukri-optimization', 'cover-letter'],
    previewImage: '/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp',
    previewAlt: 'ATS Resume Optimization Before 42% vs After 97% transformation',
  },
  'linkedin-optimization': {
    slug: 'linkedin-optimization',
    offerServiceId: 'linkedin-opt',
    canonicalPath: '/services/linkedin-optimization',
    legacyPath: '/linkedin-profile-optimization-hyderabad',
    vertical: 'career',
    name: 'LinkedIn Optimization',
    shortDesc: 'Search-weighted LinkedIn headline, About story, Experience bullets, and custom banner.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'LinkedIn Profile Optimization',
    h1Highlight: 'Built for Recruiter Search',
    intro: servicePages['linkedin-profile-optimization-hyderabad'].intro,
    problemsSolved: [
      'Generic headlines that fail LinkedIn Recruiter search ranking',
      'Empty About narratives and unquantified Experience entries',
      'Default blank cover banner reducing profile credibility',
    ],
    benefits: servicePages['linkedin-profile-optimization-hyderabad'].why,
    deliverables: servicePages['linkedin-profile-optimization-hyderabad'].included,
    process: servicePages['linkedin-profile-optimization-hyderabad'].process,
    technologies: ['LinkedIn Search SEO', '220-Char Headlines', 'Skills Matrix', 'Custom Banner'],
    pricingSummary: servicePages['linkedin-profile-optimization-hyderabad'].pricing,
    priceTag: 'From ₹319',
    faqs: servicePages['linkedin-profile-optimization-hyderabad'].faqs,
    relatedSlugs: ['resume-writing', 'naukri-optimization', 'personal-portfolio'],
    previewImage: '/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp',
    previewAlt: 'LinkedIn Profile Optimization Before 35-40% vs After 95-97% transformation',
  },
  'naukri-optimization': {
    slug: 'naukri-optimization',
    offerServiceId: 'naukri-indeed',
    canonicalPath: '/services/naukri-optimization',
    vertical: 'career',
    name: 'Naukri Profile Optimization',
    shortDesc: 'Keyword-tuned Naukri headlines, IT skill tags, and recruiter search preferences.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'Naukri Profile Optimization',
    h1Highlight: 'Higher Recruiter Discovery',
    intro: [
      'Having an updated PDF is only half of the India job search—Naukri ranks candidate profiles using profile completeness, resume headline keywords, preferred locations, and IT skills matrices.',
      'We audit and rewrite your Naukri profile fields so recruiters find your exact tech stack and experience level—delivered ready-to-paste without ever needing your login password.',
    ],
    problemsSolved: [
      'Incomplete career preferences hiding your profile from active searches',
      'Outdated headlines and missing IT skill tags on Naukri',
    ],
    benefits: [
      { title: 'Zero credential risk', desc: 'Delivered as a clean step-by-step document you paste into your own account.' },
      { title: 'Naukri-specific tuning', desc: 'Aligned to Naukri headline character limits, notice period & location filters.' },
    ],
    deliverables: [
      { title: 'Naukri Resume Headline & Summary', desc: 'Concise, keyword-targeted summary tailored to Indian hiring filters.' },
      { title: 'IT Skills & Project Alignment', desc: 'Structured skill tagging and quantified employment impact.' },
      { title: 'Profile Completeness Audit', desc: 'Checklist covering career preferences and active-search hygiene.' },
    ],
    process: [
      { title: 'Share profile & resume', desc: 'Send screenshots or text of your current Naukri sections.' },
      { title: 'Keyword & field rewrite', desc: 'Prepare tailored headlines, summary, and key skill tags.' },
      { title: 'Apply & verify', desc: 'Update your account cleanly with our post-update check.' },
    ],
    technologies: ['Naukri Recruiter Search', 'IT Skills Matrix', 'Keyword Alignment'],
    pricingSummary: 'Exclusive Startup Launch Offer: ₹239, save ₹60 off ₹299.',
    priceTag: '₹239',
    faqs: [
      { q: 'Do you need my Naukri password?', a: 'Never. We send exact copy and section screenshots so you remain in full control of your account.' },
    ],
    relatedSlugs: ['indeed-optimization', 'resume-writing', 'linkedin-optimization'],
    previewImage: '/assets/aistudio/Naukri_Profile_Transformation_before_and_after_fb24f600.webp',
    previewAlt: 'Naukri Profile Optimization Before 38% vs After 96% transformation',
  },
  'indeed-optimization': {
    slug: 'indeed-optimization',
    offerServiceId: 'naukri-indeed',
    canonicalPath: '/services/indeed-optimization',
    vertical: 'career',
    name: 'Indeed Profile Optimization',
    shortDesc: 'Employer-discoverable Indeed profile rewrite with stack tags and quantified summary.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'Indeed Profile Optimization',
    h1Highlight: 'Direct Employer Discovery',
    intro: [
      'Global and Indian product startups use Indeed Employer Search to filter candidates directly by structured job titles, verified skill assessments, and clear work summaries.',
      'We rewrite your Indeed profile with crisp keyword-aligned role titles, clean plain-text structure, and quantified outcomes so direct hiring teams can evaluate you in seconds.',
    ],
    problemsSolved: [
      'Barebones auto-parsed Indeed profiles missing key frameworks and impact metrics',
      'Weak role titles preventing discovery in direct employer search',
    ],
    benefits: [
      { title: 'Password-free delivery', desc: 'Ready-to-paste sections plus layout checklist you apply safely yourself.' },
      { title: 'Aligned across portals', desc: 'Matches your ATS resume and LinkedIn positioning seamlessly.' },
    ],
    deliverables: [
      { title: 'Keyword-rich role title & summary', desc: 'Tailored to domestic and remote employer searches.' },
      { title: 'Structured skills & work history', desc: 'Clean bullet rewrites with core stack tags.' },
    ],
    process: [
      { title: 'Audit Indeed profile', desc: 'Review your existing Indeed CV and target roles.' },
      { title: 'Rewrite & tag skills', desc: 'Structure employer-discoverable copy and skills.' },
      { title: 'Publish & verify', desc: 'Apply cleanly with visibility checklist.' },
    ],
    technologies: ['Indeed Employer Search', 'Role Keyword Taxonomy', 'STAR Summaries'],
    pricingSummary: 'Exclusive Startup Launch Offer: ₹239, save ₹60 off ₹299.',
    priceTag: '₹239',
    faqs: [
      { q: 'Do I share my Indeed login credentials?', a: 'No. We send structured text and exact update steps so your account stays completely private.' },
    ],
    relatedSlugs: ['naukri-optimization', 'resume-writing', 'linkedin-optimization'],
    previewImage: '/assets/aistudio/Indeed_Profile_Optimization_before_after_490b5e8e.webp',
    previewAlt: 'Indeed Profile Optimization Before 45% vs After 98% transformation',
  },
  'interview-coaching': {
    slug: 'interview-coaching',
    offerServiceId: 'interview-coaching',
    canonicalPath: '/services/interview-coaching',
    vertical: 'career',
    name: '1-on-1 Interview Coaching',
    shortDesc: 'Mock technical & HR interviews with personalized feedback and answer frameworks.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: '1-on-1 Interview Coaching',
    h1Highlight: 'Prepare, Practice & Perform',
    intro: [
      'A strong resume gets you shortlisted—clear project storytelling and calm technical answers convert the interview into an offer.',
      'Practice realistic 45-minute technical and HR rounds 1-on-1 with direct actionable feedback on how to explain system decisions, trade-offs, and behavioral scenarios.',
    ],
    problemsSolved: [
      'Difficulty explaining architecture decisions smoothly under interview pressure',
      'Vague answers to behavioral and "walk me through your project" questions',
    ],
    benefits: [
      { title: 'Engineer-led feedback', desc: 'Realistic mock rounds tailored to software, data, or product roles.' },
      { title: 'Written improvement notes', desc: 'Walk away with exact question breakdowns and phrasing upgrades.' },
    ],
    deliverables: [
      { title: '45-min 1-on-1 Mock Interview', desc: 'Technical + behavioral screening tailored to your target role.' },
      { title: 'Actionable feedback sheet', desc: 'Clear checklist of topics and storytelling fixes to tighten.' },
    ],
    process: [
      { title: 'Share resume & target role', desc: 'We prepare role-relevant technical and HR questions.' },
      { title: 'Live 45-min mock session', desc: 'Simulate realistic interview rounds and follow-ups.' },
      { title: 'Structured debrief', desc: 'Receive written notes on strongest and weakest answers.' },
    ],
    technologies: ['Technical Mock Rounds', 'Behavioral STAR Answers', 'Project Defense Prep'],
    pricingSummary: 'Exclusive Startup Launch Offer: ₹479, save ₹120 off ₹599 per session.',
    priceTag: '₹479',
    faqs: [
      { q: 'Is interview coaching suitable for freshers?', a: 'Yes, especially for defending final year projects, internships, and HR screening rounds.' },
    ],
    relatedSlugs: ['github-audit', 'salary-negotiation', 'resume-writing'],
    previewImage: '/assets/aistudio/interview_coaching_72395159.webp',
    previewAlt: '1-on-1 Interview Coaching with mock interviews, personalized feedback, resume tips and confidence coaching',
  },
  'github-audit': {
    slug: 'github-audit',
    offerServiceId: 'github-audit',
    canonicalPath: '/services/github-audit',
    vertical: 'career',
    name: 'GitHub & Portfolio Audit',
    shortDesc: 'Custom developer README, stack badges, pinned repositories, and code presentation polish.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'GitHub & Portfolio Audit',
    h1Highlight: 'Recruiter-Ready Developer Profile',
    intro: [
      'Hiring managers and engineering leads click your GitHub link before interviews. Empty profiles or undocumented repositories waste your best proof of skill.',
      'We craft a crisp GitHub Profile README, stack badges, clean pinned-repository descriptions, and live demo alignment so reviewers understand your engineering strengths at a glance.',
    ],
    problemsSolved: [
      'Empty default GitHub profiles with no bio or context',
      'Undocumented repositories without setup steps, architecture notes, or previews',
    ],
    benefits: [
      { title: '24-hour fast turnaround', desc: 'Delivered as clean Markdown files and repo recommendations ready to push.' },
      { title: 'Zero credential sharing', desc: 'You commit the README and pin changes directly in your own GitHub account.' },
    ],
    deliverables: [
      { title: 'Custom GitHub Profile README.md', desc: 'Clean bio, stack badges, social links, and highlight layout.' },
      { title: 'Pinned Repo & README Checklist', desc: 'Upgraded descriptions and setup structure for your top 4–6 repos.' },
    ],
    process: [
      { title: 'Audit current GitHub', desc: 'Review your repositories, commits, and target developer role.' },
      { title: 'Draft README & repo fixes', desc: 'Write custom Markdown profile and repository highlight copy.' },
      { title: 'Push & verify', desc: 'Publish cleanly to your profile and verify rendering.' },
    ],
    technologies: ['GitHub Markdown', 'Stack Badges', 'Repository Docs', 'Pinned Highlights'],
    pricingSummary: 'Exclusive Startup Launch Offer: ₹319, save ₹80 off ₹399.',
    priceTag: '₹319',
    faqs: [
      { q: 'Do you need my GitHub password?', a: 'Never. We deliver the Markdown files and exact checklist so you push changes yourself.' },
    ],
    relatedSlugs: ['personal-portfolio', 'interview-coaching', 'resume-writing'],
    previewImage: '/assets/aistudio/GitHub_Profile_Transformation_before_and_after_51bf91d8.webp',
    previewAlt: 'GitHub Profile Optimization Before 45% vs After 97% transformation',
  },
  'cover-letter': {
    slug: 'cover-letter',
    offerServiceId: 'cover-letter',
    canonicalPath: '/services/cover-letter',
    vertical: 'career',
    name: 'Cover Letter Mastery',
    shortDesc: 'Concise, role-specific cover letters connecting your projects directly to the employer.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'Role-Tailored Cover Letter Mastery',
    h1Highlight: 'Direct & Persuasive',
    intro: [
      'Generic "To Whom It May Concern" templates get skipped immediately. We write tight, three-paragraph cover letters pairing your strongest metrics directly to the hiring team’s needs.',
    ],
    problemsSolved: [
      'Repetitive cover letters that simply copy-paste resume lines',
      'Unclear career switch or fresher motivation framing',
    ],
    benefits: [
      { title: 'Adaptable modular template', desc: 'Includes an editable Word master plus email/LinkedIn outreach variant.' },
      { title: '24-hour delivery', desc: 'Delivered quickly alongside your resume or application deadline.' },
    ],
    deliverables: [
      { title: 'Role-targeted cover letter', desc: 'Written specifically around your target job title and industry.' },
      { title: 'Recruiter outreach note', desc: 'Short LinkedIn / email DM version for direct hiring manager outreach.' },
    ],
    process: [
      { title: 'Share resume & target role', desc: 'Send your CV and sample job postings.' },
      { title: 'Narrative framing', desc: 'Connect 2–3 core achievements directly to employer priorities.' },
      { title: 'Word & PDF delivery', desc: 'Receive editable files with one quick refinement round.' },
    ],
    technologies: ['Editable Word + PDF', 'Cold Outreach Copy', 'STAR Storytelling'],
    pricingSummary: 'Exclusive Startup Launch Offer: ₹159, save ₹40 off ₹199.',
    priceTag: '₹159',
    faqs: [
      { q: 'Can I reuse the cover letter for multiple companies?', a: 'Yes, we structure modular hook brackets so you can adapt it cleanly to each company in two minutes.' },
    ],
    relatedSlugs: ['resume-writing', 'linkedin-optimization', 'salary-negotiation'],
    previewImage: '/assets/aistudio/Cover_Letter_Mastery_Illustration_4198fb9f.webp',
    previewAlt: 'Cover Letter Mastery tailored to target job descriptions for higher recruiter shortlisting',
  },
  'salary-negotiation': {
    slug: 'salary-negotiation',
    offerServiceId: 'salary-negotiation',
    canonicalPath: '/services/salary-negotiation',
    vertical: 'career',
    name: 'Salary Negotiation Tips',
    shortDesc: 'Compensation benchmarking and structured counter-offer email & call scripts.',
    categoryLabel: 'Career Branding',
    badge: 'Career Solutions',
    h1: 'Salary & Offer Negotiation Strategy',
    h1Highlight: 'Confident Compensation Prep',
    intro: [
      'Accepting the first offer figure without benchmarking or a structured counter-offer often leaves significant base pay on the table. We help you prepare realistic, respectful negotiation scripts grounded in your offer components.',
    ],
    problemsSolved: [
      'Anxiety around discussing expected CTC or countering an initial offer',
      'Confusion comparing fixed base, variable bonus, and joining perks',
    ],
    benefits: [
      { title: 'Practical scripts, not hype', desc: 'Polite, professional email and call phrasing that protects your offer relationship.' },
      { title: 'Component breakdown', desc: 'Understand fixed vs. variable vs. retention components clearly.' },
    ],
    deliverables: [
      { title: '30-minute 1-on-1 strategy session', desc: 'Review your offer letter, experience, and target range.' },
      { title: 'Custom counter-offer scripts', desc: 'Ready-to-send HR email and phone talking points.' },
    ],
    process: [
      { title: 'Share offer & background', desc: 'Review current/offered CTC and alternative interviews.' },
      { title: 'Strategy session', desc: 'Practice responses to common HR pushback scenarios.' },
      { title: 'Written scripts', desc: 'Leave with exact email copy ready to send.' },
    ],
    technologies: ['CTC Breakdown', 'HR Scripts', '1-on-1 Coaching'],
    pricingSummary: 'Exclusive Startup Launch Offer: ₹399, save ₹100 off ₹499 per session.',
    priceTag: '₹399',
    faqs: [
      { q: 'Can negotiating get my offer revoked?', a: 'When approached respectfully with market context and gratitude, professional counter-offers rarely risk an offer—we coach you on calm, collaborative phrasing.' },
    ],
    relatedSlugs: ['interview-coaching', 'resume-writing', 'cover-letter'],
    previewImage: '/assets/aistudio/Salary_Negotiation_Tips_Infographic_1aad5edc.webp',
    previewAlt: 'Salary Negotiation Tips infographic covering CTC benchmarking, counter-offers and compensation strategy',
  },
  'personal-portfolio': {
    slug: 'personal-portfolio',
    offerServiceId: 'portfolio-site',
    canonicalPath: '/services/personal-portfolio',
    legacyPath: '/portfolio-website-hyderabad',
    vertical: 'career',
    name: 'Personal Portfolios',
    shortDesc: 'Custom React portfolio sites connecting live projects, case studies, and your ATS resume.',
    categoryLabel: 'Tech & Design',
    badge: 'Career Solutions',
    h1: 'Personal Portfolio Websites',
    h1Highlight: 'Stand Out Beyond a PDF',
    intro: servicePages['portfolio-website-hyderabad'].intro,
    problemsSolved: [
      'Link-in-bio pages that fail to show architectural engineering depth',
      'Template portfolios broken on mobile devices',
    ],
    benefits: servicePages['portfolio-website-hyderabad'].why,
    deliverables: servicePages['portfolio-website-hyderabad'].included,
    process: servicePages['portfolio-website-hyderabad'].process,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel / GitHub Pages', 'SEO Schema'],
    pricingSummary: servicePages['portfolio-website-hyderabad'].pricing,
    priceTag: 'From ₹2,399',
    faqs: servicePages['portfolio-website-hyderabad'].faqs,
    relatedSlugs: ['github-audit', 'resume-writing', 'final-year-projects'],
    previewImage: '/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp',
    previewAlt: 'Personal Portfolio Website Transformation Before 42% vs After 98%',
  },
  'final-year-projects': {
    slug: 'final-year-projects',
    offerServiceId: 'final-year-project',
    canonicalPath: '/services/final-year-projects',
    legacyPath: '/final-year-projects-hyderabad',
    vertical: 'career',
    name: 'Final Year Projects',
    shortDesc: 'Working B.Tech, M.Tech & MCA projects with source code, documentation & viva prep.',
    categoryLabel: 'Tech & Design',
    badge: 'Student & Academic',
    h1: 'Final Year Project Development',
    h1Highlight: 'Code, Report & Viva Readiness',
    intro: servicePages['final-year-projects-hyderabad'].intro,
    problemsSolved: [
      'Broken copy-paste zip files students cannot run or explain during viva',
      'Missing system diagrams, ER models, and university-formatted documentation',
    ],
    benefits: servicePages['final-year-projects-hyderabad'].why,
    deliverables: servicePages['final-year-projects-hyderabad'].included,
    process: servicePages['final-year-projects-hyderabad'].process,
    technologies: ['Python / FastAPI / Flask', 'React / MERN', 'AI & Machine Learning', 'Cloud / Docker', 'SQL'],
    pricingSummary: servicePages['final-year-projects-hyderabad'].pricing,
    priceTag: 'From ₹3,999',
    faqs: servicePages['final-year-projects-hyderabad'].faqs,
    relatedSlugs: ['personal-portfolio', 'resume-writing', 'github-audit'],
    previewImage: '/assets/aistudio/Final_Year_Projects__Ideas_in_Code_c262fb23.webp',
    previewAlt: 'Final Year Projects for B.Tech, M.Tech and MCA students with Python, Java, MERN, AI/ML implementation and viva support',
  },
};

export const ALL_STRUCTURED_SERVICES: Record<string, StructuredServiceEntry> = {
  ...BUSINESS_SLUGS,
  ...CAREER_SLUGS,
};

export const BUSINESS_SERVICES_LIST = Object.values(BUSINESS_SLUGS);
export const CAREER_SERVICES_LIST = Object.values(CAREER_SLUGS);

// Resolve legacy Hyderabad routes and earlier combined/alias slugs cleanly without 404s
const LEGACY_TO_STRUCTURED: Record<string, string> = {
  'ats-resume-writing-hyderabad': 'resume-writing',
  'linkedin-profile-optimization-hyderabad': 'linkedin-optimization',
  'web-development-hyderabad': 'web-development',
  'ui-ux-design-hyderabad': 'ui-ux-design',
  'portfolio-website-hyderabad': 'personal-portfolio',
  'final-year-projects-hyderabad': 'final-year-projects',
  'web-application-development': 'web-development',
  'third-party-api-integration': 'api-development',
  'resume-optimization': 'naukri-optimization',
  'career-branding': 'interview-coaching',
};

export function resolveServiceEntry(slug: string): StructuredServiceEntry | undefined {
  if (ALL_STRUCTURED_SERVICES[slug]) {
    return ALL_STRUCTURED_SERVICES[slug];
  }
  const mappedKey = LEGACY_TO_STRUCTURED[slug];
  if (mappedKey && ALL_STRUCTURED_SERVICES[mappedKey]) {
    return ALL_STRUCTURED_SERVICES[mappedKey];
  }
  const legacyPage = servicePages[slug];
  if (!legacyPage) return undefined;

  return {
    slug,
    canonicalPath: `/${slug}`,
    vertical: 'career',
    name: legacyPage.h1,
    shortDesc: legacyPage.metaDescription,
    categoryLabel: legacyPage.badge,
    badge: legacyPage.badge,
    h1: legacyPage.h1,
    h1Highlight: legacyPage.h1Highlight,
    intro: legacyPage.intro,
    problemsSolved: [
      'Generic layouts failing ATS or recruiter visual screening',
      'Unclear positioning relative to Hyderabad and remote tech hiring standards',
    ],
    benefits: legacyPage.why,
    deliverables: legacyPage.included,
    process: legacyPage.process,
    technologies: ['ATS Safe Formatting', 'Keyword Research', 'Role Positioning'],
    offerServiceId: getOfferServiceId(slug),
    priceOffer: LEGACY_PRICE_OFFERS[slug],
    pricingSummary: legacyPage.pricing,
    priceTag: 'Transparent Pricing',
    faqs: legacyPage.faqs,
    relatedSlugs: legacyPage.related,
    previewImage: '/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp',
    previewAlt: legacyPage.h1,
  };
}

export { canonicalServiceSlugs, WHATSAPP_URL };

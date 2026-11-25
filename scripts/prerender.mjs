import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const SITE_URL = 'https://smartscaletech.vercel.app';

// Route specific metadata dictionary for SEO prerendering
const ROUTE_METADATA = {
  'ats-resume-writing-hyderabad': {
    title: 'ATS Resume Writing Services in Hyderabad | Smart Scale Tech',
    description: 'Professional ATS resume writing in Hyderabad. Keyword-optimised resumes that clear applicant tracking systems. First draft in 24-48 hours, revisions included.',
    h1: 'ATS Resume Writing Services in Hyderabad'
  },
  'linkedin-profile-optimization-hyderabad': {
    title: 'LinkedIn Profile Optimization Services in Hyderabad | Smart Scale Tech',
    description: 'LinkedIn profile makeover in Hyderabad. Keyword-targeted headline, about section, and recruiter-search optimization to 5x inbound views.',
    h1: 'LinkedIn Profile Optimization Services in Hyderabad'
  },
  'web-development-hyderabad': {
    title: 'Web Development Services in Hyderabad | Smart Scale Tech',
    description: 'Custom, SEO-first web development in Hitech City, Hyderabad. Fast React/TypeScript websites, lead capture, and performance tailored for Indian businesses.',
    h1: 'Web Development Services in Hyderabad'
  },
  'ui-ux-design-hyderabad': {
    title: 'UI/UX Design Services in Hyderabad | Smart Scale Tech',
    description: 'User research, wireframes, high-fidelity prototypes, and design systems for web apps and SaaS in Hitech City, Hyderabad.',
    h1: 'UI/UX Design Services in Hyderabad'
  },
  'portfolio-website-hyderabad': {
    title: 'Portfolio Website Development in Hyderabad | Smart Scale Tech',
    description: 'Custom personal portfolio websites for developers, designers, and freelancers in Hyderabad. Fast, animated, mobile-ready, and Google indexed.',
    h1: 'Portfolio Website Development in Hyderabad'
  },
  'final-year-projects-hyderabad': {
    title: 'Final Year Project Development in Hyderabad | Smart Scale Tech',
    description: 'Working full-stack web and AI application final year projects with source code, report documentation, viva prep, and deployment in Hyderabad.',
    h1: 'Final Year Project Development in Hyderabad'
  },
  'resume-writing-freshers-hyderabad': {
    title: 'Resume Writing for Freshers in Hyderabad | Smart Scale Tech',
    description: 'ATS resume writing for college freshers in Hyderabad starting at ₹399. Project-first layouts, role keywords, and 24-hr turnaround.',
    h1: 'Resume Writing for Freshers in Hyderabad'
  },
  'linkedin-profile-writer-software-engineers-hyderabad': {
    title: 'LinkedIn Profile Writer for Software Engineers in Hyderabad | Smart Scale Tech',
    description: 'LinkedIn optimization for Hyderabad software engineers. High-CTR headline, tech stack keywords, and GitHub/project linking for inbound recruiters.',
    h1: 'LinkedIn Profile Writer for Software Engineers in Hyderabad'
  },
  'executive-resume-writing-hyderabad': {
    title: 'Executive Resume Writing Services in Hyderabad | Smart Scale Tech',
    description: 'Executive resume writing for senior leaders, managers, and architects in Hyderabad. Quantified business impact, scale metrics, and dual ATS optimization.',
    h1: 'Executive Resume Writing Services in Hyderabad'
  },
  'college-placement-resume-hyderabad': {
    title: 'Campus Placement Resume Writing in Hyderabad | Smart Scale Tech',
    description: 'Placement cell approved ATS resumes for engineering students in Hyderabad. Highlight mini-projects, hackathons, and skills for college placement drives.',
    h1: 'Campus Placement Resume Writing in Hyderabad'
  },
  'freelance-portfolio-website-hyderabad': {
    title: 'Freelance Portfolio Website Development in Hyderabad | Smart Scale Tech',
    description: 'High-converting freelance portfolio websites in Hyderabad. Custom design, zero monthly hosting costs, mobile-first, and Google Search ready.',
    h1: 'Freelance Portfolio Website Development in Hyderabad'
  },
  'free-ats-resume-checker': {
    title: 'Free ATS Resume Checker & Job Description Matcher | Smart Scale Tech',
    description: 'Check your resume score on ATS scanners (Workday, Greenhouse, Taleo, Naukri) free in 10 seconds. Compare your resume directly against any Job Description.',
    h1: 'Free ATS Resume Checker & Job Description Matcher'
  },
  'ats-checker': {
    title: 'Free ATS Resume Checker & Job Description Matcher | Smart Scale Tech',
    description: 'Check your resume score on ATS scanners (Workday, Greenhouse, Taleo, Naukri) free in 10 seconds. Compare your resume directly against any Job Description.',
    h1: 'Free ATS Resume Checker & Job Description Matcher'
  },
  'linkedin-headline-generator': {
    title: 'Free LinkedIn & Naukri Headline Generator | Smart Scale Tech',
    description: 'Generate 4 recruiter-searchable LinkedIn and Naukri headlines under 220 characters plus a matching About section tailored to your role and skills.',
    h1: 'Free LinkedIn & Naukri Headline Generator'
  },
  'job-readiness-audit': {
    title: 'Free 60-Second Job Readiness Audit | Smart Scale Tech',
    description: 'Score your resume ATS health, LinkedIn visibility, Naukri strength, and portfolio readiness in 60 seconds and fix what blocks interview calls.',
    h1: 'Free 60-Second Job Readiness Audit'
  },
  'custom-package-builder': {
    title: 'Custom Service Package & Price Estimator | Smart Scale Tech',
    description: 'Build your own ATS resume, LinkedIn optimization, portfolio website, or web development bundle and unlock automatic 10% to 20% bundle discounts.',
    h1: 'Custom Career & Tech Package Builder'
  },
  'privacy-policy': {
    title: 'Privacy Policy | Smart Scale Tech',
    description: 'How Smart Scale Tech collects, uses and protects candidate and client information for resume writing and web development services.',
    h1: 'Privacy Policy - Smart Scale Tech'
  },
  'terms-of-service': {
    title: 'Terms of Service | Smart Scale Tech',
    description: 'Terms and conditions governing Smart Scale Tech ATS resume writing, LinkedIn optimization, and web development services.',
    h1: 'Terms of Service - Smart Scale Tech'
  },
  'request-service': {
    title: 'Request Services | Smart Scale Tech LinkedIn Portal',
    description: 'Submit your service request for ATS resume writing, LinkedIn profile optimization, or web development directly to founder Vamshi via WhatsApp (+91 90008 59695) or email.',
    h1: 'Request Services from Smart Scale Tech'
  },
  'linkedin-service-request': {
    title: 'LinkedIn Service Request Portal | Smart Scale Tech',
    description: 'Submit your service request for ATS resume writing, LinkedIn profile optimization, or web development directly to founder Vamshi via WhatsApp (+91 90008 59695) or email.',
    h1: 'LinkedIn Service Request Portal'
  },
  'refund-policy': {
    title: 'Refund & Cancellation Policy | Smart Scale Tech (SST)',
    description: 'Cancellation, revision-first guarantee, and milestone refund policy for Smart Scale Tech (SST / SmartScaleTech) services.',
    h1: 'Refund & Cancellation Policy'
  },
  'about': {
    title: 'About SmartScaleTech (SST) | Hitech City Digital Studio',
    description: 'SmartScaleTech (SST) is an independent engineering and career solutions studio in Hitech City, Hyderabad founded by Vamshi Polishetti.',
    h1: 'About SmartScaleTech (SST)'
  },
  'tools': {
    title: 'Free Career & Pricing Tools | SmartScaleTech (SST)',
    description: 'Free browser-based ATS resume and JD checker, LinkedIn headline generator, job readiness audit, and interactive bundle pricing estimator.',
    h1: 'Free Career & Pricing Tools'
  },
  'work': {
    title: 'Selected Work & Case Studies | SmartScaleTech (SST)',
    description: 'Explore verified ATS resume samples, LinkedIn transformations, custom website architectures, and client-side diagnostic tools by SmartScaleTech.',
    h1: 'Selected Work & Case Studies'
  },
  'work/python-backend-ats-resume-sample': {
    title: 'Single-Column ATS Resume Architecture (Python Backend) | SmartScaleTech',
    description: 'Production-ready single-column ATS resume structured around STAR outcomes, clean plain-text parsing, and recruiter-scannable hierarchy.',
    h1: 'Single-Column ATS Resume Architecture (Python Backend)'
  },
  'work/business-web-ui-architecture-concept': {
    title: 'Editorial Business Website & UI System | SmartScaleTech',
    description: 'Conversion-oriented multi-section website architecture built with semantic React markup, mobile-first grids, and structured JSON-LD metadata.',
    h1: 'Editorial Business Website & UI System'
  },
  'work/developer-portfolio-system-concept': {
    title: 'Recruiter-Ready Developer Portfolio Website | SmartScaleTech',
    description: 'Fast, structured personal portfolio connecting GitHub projects, case study architecture, and downloadable ATS resume in one clean link.',
    h1: 'Recruiter-Ready Developer Portfolio Website'
  },
  'work/ats-jd-diagnostic-tool': {
    title: 'Client-Side ATS Resume & Job Description Diagnostic | SmartScaleTech',
    description: 'Interactive browser tool comparing resume drafts against role benchmarks and live Job Descriptions without requiring login or storing resumes.',
    h1: 'Client-Side ATS Resume & Job Description Diagnostic'
  },
  'work/linkedin-profile-makeover-sample': {
    title: 'LinkedIn & Naukri Recruiter Search Optimization | SmartScaleTech',
    description: 'Complete rewrite of LinkedIn Headline, About narrative, Experience impact bullets, and custom profile header design for recruiter search.',
    h1: 'LinkedIn & Naukri Recruiter Search Optimization'
  },
  'work/brand-identity-editorial-system': {
    title: 'Visual Identity & Digital Brand Guidelines | SmartScaleTech',
    description: 'Minimalist typographic brand kit covering logo mark proportions, high-contrast color tokens, social banners, and web component rules.',
    h1: 'Visual Identity & Digital Brand Guidelines'
  },
  'final-year-projects': {
    title: 'Final Year Projects Showcase (B.Tech, M.Tech, MCA) | SmartScaleTech',
    description: 'Working full-stack web, MERN, Python, and AI/ML final year projects with complete source code, IEEE report documentation, PPT, and 1-on-1 viva preparation.',
    h1: 'Final Year Projects Catalog'
  },
  'services/web-development': {
    title: 'Custom Web Development | SmartScaleTech (SST)',
    description: 'Custom business websites and scalable React, Python, FastAPI & Django web applications built in Hitech City, Hyderabad.',
    h1: 'Custom Web Development'
  },
  'services/ui-ux-design': {
    title: 'UI/UX Design Systems | SmartScaleTech (SST)',
    description: 'Editorial interfaces, wireframes, and scalable Figma design systems engineered for conversion and clarity.',
    h1: 'UI/UX Design Systems'
  },
  'services/ai-integration': {
    title: 'AI Integration & Workflows | SmartScaleTech (SST)',
    description: 'Server-side AI advisors, document workflows, and structured automation built with safe proxy endpoints and reliable fallbacks.',
    h1: 'AI Integration & Workflows'
  },
  'services/api-development': {
    title: 'API Development & Integration | SmartScaleTech (SST)',
    description: 'REST/GraphQL APIs in Node.js and Python plus third-party payment, maps, CRM, and webhook integrations.',
    h1: 'API Development & Integration'
  },
  'services/cloud-devops': {
    title: 'Cloud Deployment & DevOps | SmartScaleTech (SST)',
    description: 'Docker packaging, GitHub Actions CI/CD pipelines, custom domain SSL, and right-sized cloud hosting.',
    h1: 'Cloud Deployment & DevOps'
  },
  'services/seo-growth': {
    title: 'Digital Marketing (SEO & Growth) | SmartScaleTech (SST)',
    description: 'Technical SEO, structured JSON-LD schema, XML sitemaps, and clean Search Console readiness.',
    h1: 'Technical SEO & Search Growth'
  },
  'services/content-strategy': {
    title: 'Content Strategy & Copywriting | SmartScaleTech (SST)',
    description: 'Clear landing page copy, service positioning, and search-aligned editorial roadmaps.',
    h1: 'Content Strategy & Copywriting'
  },
  'services/ad-campaigns': {
    title: 'Ad Campaigns Setup | SmartScaleTech (SST)',
    description: 'Structured Google Search and Meta lead campaign setup paired with conversion tracking.',
    h1: 'Paid Search & Social Campaigns'
  },
  'services/brand-identity': {
    title: 'Brand Identity Systems | SmartScaleTech (SST)',
    description: 'Minimalist vector logo suites, accessible color palettes, typography pairings, and digital brand kits.',
    h1: 'Brand Identity Systems'
  },
  'services/resume-writing': {
    title: 'ATS Resume Writing | SmartScaleTech (SST)',
    description: 'Single-column ATS-safe resumes engineered around role keywords and quantified impact.',
    h1: 'ATS Resume Writing'
  },
  'services/linkedin-optimization': {
    title: 'LinkedIn Profile Optimization | SmartScaleTech (SST)',
    description: 'Search-weighted LinkedIn headline, About story rewrite, Experience bullets, and custom profile banner.',
    h1: 'LinkedIn Profile Optimization'
  },
  'services/naukri-optimization': {
    title: 'Naukri Profile Optimization | SmartScaleTech (SST)',
    description: 'Keyword-tuned Naukri headlines, IT skill tags, and recruiter search preferences without sharing passwords.',
    h1: 'Naukri Profile Optimization'
  },
  'services/indeed-optimization': {
    title: 'Indeed Profile Optimization | SmartScaleTech (SST)',
    description: 'Employer-discoverable Indeed profile rewrite with stack tags and quantified career summary.',
    h1: 'Indeed Profile Optimization'
  },
  'services/interview-coaching': {
    title: '1-on-1 Interview Coaching | SmartScaleTech (SST)',
    description: 'Realistic 45-minute technical and HR mock interviews with personalized feedback and answer frameworks.',
    h1: '1-on-1 Interview Coaching'
  },
  'services/github-audit': {
    title: 'GitHub & Portfolio Audit | SmartScaleTech (SST)',
    description: 'Custom GitHub Profile README, tech badges, pinned repositories, and live demo alignment polish.',
    h1: 'GitHub & Portfolio Audit'
  },
  'services/cover-letter': {
    title: 'Cover Letter Mastery | SmartScaleTech (SST)',
    description: 'Concise, role-specific cover letters connecting your projects directly to employer priorities.',
    h1: 'Role-Tailored Cover Letter Mastery'
  },
  'services/salary-negotiation': {
    title: 'Salary Negotiation Tips | SmartScaleTech (SST)',
    description: 'Compensation benchmarking and structured counter-offer email and call scripts.',
    h1: 'Salary & Offer Negotiation Strategy'
  },
  'services/personal-portfolio': {
    title: 'Personal Portfolio Websites | SmartScaleTech (SST)',
    description: 'Custom React portfolio sites connecting live projects, case studies, and your downloadable ATS resume.',
    h1: 'Personal Portfolio Websites'
  },
  'services/final-year-projects': {
    title: 'Final Year Project Development | SmartScaleTech (SST)',
    description: 'Working B.Tech, M.Tech and MCA projects with source code, documentation, and 1-on-1 viva readiness.',
    h1: 'Final Year Project Development'
  }
};

const distIndexHtml = path.resolve(distDir, 'index.html');
if (!fs.existsSync(distIndexHtml)) {
  console.log('[prerender] dist/index.html not found yet. Run `vite build` first.');
  process.exit(0);
}

const template = fs.readFileSync(distIndexHtml, 'utf-8');
const routes = Object.keys(ROUTE_METADATA);

console.log(`[prerender] Preparing unique static SEO HTML for ${routes.length} routes...`);

for (const route of routes) {
  const meta = ROUTE_METADATA[route];
  const targetDir = path.resolve(distDir, route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const canonicalRoute = route === 'ats-checker' ? 'free-ats-resume-checker' : route;
  const pageUrl = `${SITE_URL}/${canonicalRoute}`;

  let pageHtml = template
    // Unique Title
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`)
    // Unique Canonical
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${pageUrl}" />`)
    // Unique Meta Description
    .replace(/<meta[^>]*name="description"[^>]*content="[^"]*"/i, `<meta name="description" content="${meta.description}"`)
    // Unique OpenGraph
    .replace(/<meta[^>]*property="og:title"[^>]*content="[^"]*"/i, `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta[^>]*property="og:description"[^>]*content="[^"]*"/i, `<meta property="og:description" content="${meta.description}"`)
    .replace(/<meta[^>]*property="og:url"[^>]*content="[^"]*"/i, `<meta property="og:url" content="${pageUrl}"`)
    // Unique Twitter
    .replace(/<meta[^>]*name="twitter:title"[^>]*content="[^"]*"/i, `<meta name="twitter:title" content="${meta.title}"`)
    .replace(/<meta[^>]*name="twitter:description"[^>]*content="[^"]*"/i, `<meta name="twitter:description" content="${meta.description}"`)
    // Remove home-only FAQ schema on subpages
    .replace(/<script type="application\/ld\+json" data-home-faq="true">[\s\S]*?<\/script>/i, '')
    // Update pre-hydration crawler fallback H1 and P
    .replace(
      /<h1>Smart Scale Tech \(SST \/ SmartScaleTech\) — Digital Engineering &amp; Career Studio<\/h1>/i,
      `<h1>${meta.h1} | Smart Scale Tech (SST)</h1>`
    )
    .replace(
      /<p>Independent digital technology and career solutions studio in Hitech City, Hyderabad building custom websites, UI\/UX systems, AI workflows, ATS resumes, LinkedIn profiles, and final year projects\.<\/p>/i,
      `<p>${meta.description}</p>`
    );

  fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`[prerender] Wrote customized SEO entry: /${route}/index.html`);
}

console.log('[prerender] All route HTML files prerendered with unique titles, meta descriptions, and canonicals!');

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
    title: 'Free ATS Resume Checker & Scanner | Smart Scale Tech',
    description: 'Check your resume score on ATS scanners (Workday, Greenhouse, Taleo) for free. Get instant score, keyword gaps, and formatting suggestions.',
    h1: 'Free ATS Resume Checker & Score Scanner'
  },
  'dashboard': {
    title: 'Candidate Career Progress Dashboard | Smart Scale Tech',
    description: 'Track your ATS score evolution, recruiter search visibility, and interview callbacks over time with Smart Scale Tech Hyderabad.',
    h1: 'Candidate Career Progress Dashboard'
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

  const pageUrl = `${SITE_URL}/${route}`;

  let pageHtml = template
    // Unique Title
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`)
    // Unique Canonical
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${pageUrl}" />`)
    // Unique Meta Description
    .replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${meta.description}"`)
    // Unique OpenGraph
    .replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${meta.description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${pageUrl}"`)
    // Unique Twitter
    .replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${meta.title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${meta.description}"`)
    // Remove home-only FAQ schema on subpages
    .replace(/<script type="application\/ld\+json" data-home-faq="true">[\s\S]*?<\/script>/i, '')
    // Update pre-hydration crawler fallback H1 and P
    .replace(
      /<h1>Smart Scale Tech \(SmartScaleTech\) - ATS Resume Writing &amp; Web Development in Hyderabad<\/h1>/i,
      `<h1>${meta.h1} | Smart Scale Tech</h1>`
    )
    .replace(
      /<p>Smart Scale Tech \(SmartScaleTech\) is a premier digital branding and career agency in Hitech City, Hyderabad, India specializing in ATS-friendly resume writing, LinkedIn profile optimization, UI\/UX design, and custom web development across India.<\/p>/i,
      `<p>${meta.description}</p>`
    );

  fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`[prerender] Wrote customized SEO entry: /${route}/index.html`);
}

console.log('[prerender] All route HTML files prerendered with unique titles, meta descriptions, and canonicals!');

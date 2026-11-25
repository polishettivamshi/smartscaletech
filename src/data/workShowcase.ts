export type WorkCategory =
  | 'All'
  | 'Websites & UI'
  | 'Resume & Career'
  | 'Dashboards & Tools'
  | 'Brand & Identity';

export interface WorkCaseStudy {
  slug: string;
  title: string;
  category: Exclude<WorkCategory, 'All'>;
  kindLabel: 'Real Career Sample' | 'Studio Demonstration' | 'Internal Product';
  clientOrContext: string;
  shortDesc: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  timeline: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcomes: string[];
  serviceLink: string;
}

export const WORK_SHOWCASE: WorkCaseStudy[] = [
  {
    slug: 'python-backend-ats-resume-sample',
    title: 'Single-Column ATS Resume Architecture (Python Backend)',
    category: 'Resume & Career',
    kindLabel: 'Real Career Sample',
    clientOrContext: 'Verified Founder Sample · Python & FastAPI Engineer',
    shortDesc:
      'Production-ready single-column ATS resume structured around STAR outcomes, clean plain-text parsing, and recruiter-scannable hierarchy.',
    image: '/assets/aistudio/Vamshi_Polishetti_Python_Developer_Resume_5be69310.webp',
    imageAlt: 'Verified ATS-ready Python Developer Resume sample by SmartScaleTech',
    technologies: ['LaTeX / Word Structure', 'STAR Method', 'ATS Plain-Text Parsing', 'Role Keyword Taxonomy'],
    timeline: '24–48 Hours',
    challenge:
      'Multi-column Canva templates and unquantified duty lists frequently scramble inside automated ATS parsers such as Workday and Naukri.',
    solution:
      'Rebuilt the entire hierarchy into a strict single-column layout with clear typographic section boundaries, quantified API throughput metrics, and grouped stack keywords.',
    deliverables: [
      'Editable Word (.docx) + clean PDF master copy',
      'Plain-text ATS parsing verification check',
      'Role-aligned Summary and Technical Skills matrix',
      'Quantified Experience & Project impact bullets',
    ],
    outcomes: [
      'Scores 97/100 on our client-side role benchmark rubric',
      'Zero table or graphic elements that break text extraction',
      'Designed for 6–10 second human recruiter visual scan',
    ],
    serviceLink: '/services/resume-writing',
  },
  {
    slug: 'business-web-ui-architecture-concept',
    title: 'Editorial Business Website & UI System',
    category: 'Websites & UI',
    kindLabel: 'Studio Demonstration',
    clientOrContext: 'Concept Build · Modern Service & SaaS Brand',
    shortDesc:
      'Conversion-oriented multi-section website architecture built with semantic React markup, mobile-first grids, and structured JSON-LD metadata.',
    image: '/assets/aistudio/UI_UX_Design_Transformation__Before_and_After_4e26727a.webp',
    imageAlt: 'Editorial business website and UI transformation demonstration by SmartScaleTech',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'JSON-LD Schema', 'Edge CDN'],
    timeline: '5–10 Working Days',
    challenge:
      'Legacy brochure templates suffer from slow mobile rendering, generic visual noise, and fragmented service navigation that loses leads before contact.',
    solution:
      'Designed a calm grid system with clear contrast, scannable service pathways, integrated WhatsApp & inquiry capture, and prerendered SEO HTML per route.',
    deliverables: [
      'Custom responsive desktop & mobile UI system',
      'Up to 5 tailored pages with semantic HTML headings',
      'Lead capture forms integrated with email/WhatsApp dispatch',
      'Technical SEO setup with sitemap & Search Console readiness',
    ],
    outcomes: [
      'Demonstrates clear before/after information hierarchy improvements',
      'Zero proprietary CMS lock-in — full source code handed over',
      'Edge-deployed static assets engineered for fast mobile loads',
    ],
    serviceLink: '/services/web-development',
  },
  {
    slug: 'developer-portfolio-system-concept',
    title: 'Recruiter-Ready Developer Portfolio Website',
    category: 'Websites & UI',
    kindLabel: 'Studio Demonstration',
    clientOrContext: 'Concept Build · Full-Stack Engineer Showcase',
    shortDesc:
      'Fast, structured personal portfolio connecting GitHub projects, case study architecture, and downloadable ATS resume in one clean link.',
    image: '/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp',
    imageAlt: 'Developer portfolio website design comparison by SmartScaleTech',
    technologies: ['React', 'TypeScript', 'Responsive Grid', 'SEO Metadata', 'Vercel / GitHub Pages'],
    timeline: '3–5 Days',
    challenge:
      'Plain HTML bio links and uncurated GitHub profiles fail to explain architectural decisions to hiring managers.',
    solution:
      'Structured dedicated project breakdowns covering problem statement, stack choice, outcome metrics, and direct resume/WhatsApp actions.',
    deliverables: [
      'Custom responsive portfolio build with full source repository',
      'Structured project case study sections',
      'Embedded ATS resume link & direct recruiter contact',
      'Zero monthly hosting cost cloud deployment walkthrough',
    ],
    outcomes: [
      'Gives engineering candidates a single shareable personal domain asset',
      'Search-structured for personal name discovery',
    ],
    serviceLink: '/services/personal-portfolio',
  },
  {
    slug: 'ats-jd-diagnostic-tool',
    title: 'Client-Side ATS Resume & Job Description Diagnostic',
    category: 'Dashboards & Tools',
    kindLabel: 'Internal Product',
    clientOrContext: 'Live Free Utility · SmartScaleTech Studio',
    shortDesc:
      'Interactive browser tool comparing resume drafts against role benchmarks and live Job Descriptions without requiring login or storing resumes.',
    image: '/assets/aistudio/API_Development_and_Integration_Infographic_b3aa9d6c.webp',
    imageAlt: 'Client-side ATS diagnostic and API workflow preview',
    technologies: ['TypeScript', 'Client-Side NLP Heuristics', 'React', 'Accessible UI'],
    timeline: 'Live Interactive Tool',
    challenge:
      'Job seekers struggle to identify missing technical keywords and unquantified bullets before applying to portal screenings.',
    solution:
      'Engineered an in-browser keyword extractor and scoring rubric checking STAR metrics, ownership verbs, standard headings, and word balance.',
    deliverables: [
      'Role Benchmark Scanner covering 9 tech & marketing roles',
      'Custom Job Description keyword extraction engine',
      'Actionable missing-skill & structural checklist',
    ],
    outcomes: [
      '100% browser-side evaluation with immediate feedback',
      'Zero paywall or mandatory account signup',
    ],
    serviceLink: '/free-ats-resume-checker',
  },
  {
    slug: 'linkedin-profile-makeover-sample',
    title: 'LinkedIn & Naukri Recruiter Search Optimization',
    category: 'Resume & Career',
    kindLabel: 'Studio Demonstration',
    clientOrContext: 'Career Profile Architecture · Software & Cloud Roles',
    shortDesc:
      'Complete rewrite of LinkedIn Headline, About narrative, Experience impact bullets, and custom profile header design for recruiter search.',
    image: '/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp',
    imageAlt: 'LinkedIn profile before and after optimization comparison',
    technologies: ['LinkedIn Search SEO', 'Keyword Mapping', 'Copywriting', 'Custom Banner Design'],
    timeline: '24–48 Hours',
    challenge:
      'Generic headlines like "Looking for opportunities" exclude qualified professionals from LinkedIn Recruiter Boolean keyword filters.',
    solution:
      'Engineered keyword-weighted 220-character headlines, crisp first-person narratives, and 50 curated skills delivered ready-to-paste.',
    deliverables: [
      'Custom 220-char search-weighted Headline variants',
      'Complete About section & STAR Experience bullet rewrites',
      'Custom branded LinkedIn profile banner asset',
      'Password-free ready-to-paste handover document',
    ],
    outcomes: [
      'Candidates keep 100% custody of account credentials',
      'Aligned across LinkedIn, Naukri, and resume documents',
    ],
    serviceLink: '/services/linkedin-optimization',
  },
  {
    slug: 'brand-identity-editorial-system',
    title: 'Visual Identity & Digital Brand Guidelines',
    category: 'Brand & Identity',
    kindLabel: 'Studio Demonstration',
    clientOrContext: 'Concept Build · Architecture & Tech Consultancy',
    shortDesc:
      'Minimalist typographic brand kit covering logo mark proportions, high-contrast color tokens, social banners, and web component rules.',
    image: '/assets/aistudio/Brand_Identity_Design_System_2afc4b6a.webp',
    imageAlt: 'Brand identity design system preview by SmartScaleTech',
    technologies: ['Brand Strategy', 'SVG Vector Marks', 'Design Tokens', 'Editorial Typography'],
    timeline: '3–5 Days',
    challenge:
      'Early-stage teams often launch with inconsistent template colors and illegible marks across web and social channels.',
    solution:
      'Built a disciplined design-token identity kit designed for crisp contrast across light cream, white, and dark architectural surfaces.',
    deliverables: [
      'Original vector logo suite (light & dark variants)',
      'Defined color palette with accessible text pairs',
      'Typography scale & reusable social collateral kit',
    ],
    outcomes: [
      'Consistent cross-channel visual authority from day one',
      'Directly translatable into CSS custom properties and React UI',
    ],
    serviceLink: '/services/brand-identity',
  },
];

export function getWorkBySlug(slug: string): WorkCaseStudy | undefined {
  return WORK_SHOWCASE.find((item) => item.slug === slug);
}

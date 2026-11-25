export interface ServiceTransformation {
  id: string;
  tabLabel: string;
  serviceTitle: string;
  category: 'Career Branding' | 'Tech & Design' | 'Marketing & Strategy';
  image: string;
  imageAlt: string;
  metricLabel: string;
  beforeScore: string;
  afterScore: string;
  summary: string;
  improvements: string[];
  serviceSlug?: string;
}

export interface ServiceShowcase {
  id: string;
  serviceTitle: string;
  category: 'Career Branding' | 'Tech & Design' | 'Marketing & Strategy';
  image: string;
  imageAlt: string;
  badgeLabel: string;
  summary: string;
  improvements: string[];
  serviceSlug?: string;
}

export type ServiceVisual =
  | (ServiceTransformation & { kind: 'transformation' })
  | (ServiceShowcase & { kind: 'showcase' });

export const SERVICE_TRANSFORMATIONS: ServiceTransformation[] = [
  {
    id: 'ats-resume',
    tabLabel: 'ATS Resume',
    serviceTitle: 'ATS Resume Writing',
    category: 'Career Branding',
    image: '/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp',
    imageAlt: 'ATS Resume Optimization Before 42% vs After 97% transformation',
    metricLabel: 'ATS Resume Score',
    beforeScore: '42%',
    afterScore: '97%',
    summary:
      'Transformed a sparse, unoptimized CV into a single-column, keyword-dense ATS resume with quantified experience and impact-driven project bullets.',
    improvements: [
      'Clean single-column ATS hierarchy parseable by Workday, Taleo & Naukri',
      'Structured Technical Skills matrix aligned to target engineering roles',
      'Quantified experience and project outcomes (STAR / XYZ impact metrics)',
    ],
    serviceSlug: '/services/resume-writing',
  },
  {
    id: 'linkedin',
    tabLabel: 'LinkedIn',
    serviceTitle: 'LinkedIn Optimization',
    category: 'Career Branding',
    image: '/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp',
    imageAlt: 'LinkedIn Profile Optimization Before 35-40% vs After 95-97% transformation',
    metricLabel: 'Profile Strength',
    beforeScore: '35–40%',
    afterScore: '95–97%',
    summary:
      'Upgraded a blank, generic LinkedIn profile into a recruiter magnet with a custom tech banner, keyword-rich headline, and Open-to-Work optimization.',
    improvements: [
      'Custom branded header banner & verified professional profile framing',
      'High-CTR searchable headline packed with core role & stack keywords',
      'Structured Experience, Skills & Recruiter visibility configuration',
    ],
    serviceSlug: '/services/linkedin-optimization',
  },
  {
    id: 'naukri',
    tabLabel: 'Naukri Profile',
    serviceTitle: 'Naukri Profile Optimization',
    category: 'Career Branding',
    image: '/assets/aistudio/Naukri_Profile_Transformation_before_and_after_fb24f600.webp',
    imageAlt: 'Naukri Profile Optimization Before 38% vs After 96% transformation',
    metricLabel: 'Profile Strength',
    beforeScore: '38%',
    afterScore: '96%',
    summary:
      'Completed missing career preferences, headline metrics, and recruiter search fields so the profile ranks higher in Naukri Recruiter searches.',
    improvements: [
      'Impact-driven profile headline highlighting years of experience & stack',
      'Complete career preferences (preferred location, role, shift & employment type)',
      'Structured key skills & basic details for maximum recruiter Nvites',
    ],
    serviceSlug: '/services/naukri-optimization',
  },
  {
    id: 'indeed',
    tabLabel: 'Indeed Profile',
    serviceTitle: 'Indeed Profile Optimization',
    category: 'Career Branding',
    image: '/assets/aistudio/Indeed_Profile_Optimization_before_after_490b5e8e.webp',
    imageAlt: 'Indeed Profile Optimization Before 45% vs After 98% transformation',
    metricLabel: 'Profile Strength',
    beforeScore: '45%',
    afterScore: '98%',
    summary:
      'Converted a barebones Indeed profile into a complete, employer-discoverable technical profile with stack tags and quantified backend summary.',
    improvements: [
      'Employer-discoverable visibility toggle & complete contact details',
      'Keyword-rich role title with core cloud, database & framework tags',
      'Quantified backend engineering summary tailored for direct employer search',
    ],
    serviceSlug: '/services/indeed-optimization',
  },
  {
    id: 'github',
    tabLabel: 'GitHub Audit',
    serviceTitle: 'Github & Portfolio Audit',
    category: 'Career Branding',
    image: '/assets/aistudio/GitHub_Profile_Transformation_before_and_after_51bf91d8.webp',
    imageAlt: 'GitHub Profile Optimization Before 45% vs After 97% transformation',
    metricLabel: 'Profile Strength',
    beforeScore: '45%',
    afterScore: '97%',
    summary:
      'Turned an empty default GitHub account into an impressive developer showcase with a custom README, tech badges, and pinned project highlights.',
    improvements: [
      'Custom GitHub Profile README with bio, social badges & specialization',
      'Color-coded tech stack & tooling badges for instant recruiter scanning',
      'Pinned flagship projects with clean descriptions & live links',
    ],
    serviceSlug: '/services/github-audit',
  },
  {
    id: 'portfolio',
    tabLabel: 'Personal Portfolio',
    serviceTitle: 'Personal Portfolios',
    category: 'Tech & Design',
    image: '/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp',
    imageAlt: 'Personal Portfolio Website Transformation Before 42% vs After 98%',
    metricLabel: 'Portfolio Quality',
    beforeScore: '42%',
    afterScore: '98%',
    summary:
      'Elevated a plain HTML-style bio page into a high-converting dark-mode developer portfolio with interactive project CTAs and key career stats.',
    improvements: [
      'Modern hero layout with clear value proposition & Resume download CTA',
      'Instant credibility bar highlighting experience, projects & GitHub reach',
      'Clean responsive navigation with direct Hire Me conversion trigger',
    ],
    serviceSlug: '/services/personal-portfolio',
  },
  {
    id: 'ui-ux',
    tabLabel: 'UI/UX Design',
    serviceTitle: 'UI/UX Design',
    category: 'Tech & Design',
    image: '/assets/aistudio/UI_UX_Design_Transformation__Before_and_After_4e26727a.webp',
    imageAlt: 'UI/UX Design Transformation Before 45% vs After 98% quality',
    metricLabel: 'UI/UX Quality',
    beforeScore: '45%',
    afterScore: '98%',
    summary:
      'Redesigned a cluttered, dated agency layout into a modern conversion-focused interface with clear visual hierarchy and crisp service cards.',
    improvements: [
      'High-contrast hero typography with primary & secondary action buttons',
      'Responsive 4-card service grid replacing plain bullet lists',
      'Consistent spacing, brand palette & mobile-first user flow',
    ],
    serviceSlug: '/services/ui-ux-design',
  },
  {
    id: 'seo',
    tabLabel: 'SEO & Growth',
    serviceTitle: 'SEO & Growth',
    category: 'Marketing & Strategy',
    image: '/assets/aistudio/SEO_Optimization__From_Fourth_to_First_18c20dc6.webp',
    imageAlt: 'Google SEO Optimization Before and After metadata transformation',
    metricLabel: 'Search Readiness',
    beforeScore: '35–45%',
    afterScore: '95–100%',
    summary:
      'Improved search metadata, canonical structure, and Organization schema to strengthen branded search discovery and indexing clarity.',
    improvements: [
      'Structured JSON-LD WebSite, Organization & LocalBusiness schema',
      'Optimized search title, meta description & official site name display',
      'Prerendered route HTML & sitemap indexing for clean search visibility',
    ],
    serviceSlug: '/services/seo-growth',
  },
];

export const SERVICE_SHOWCASES: ServiceShowcase[] = [
  {
    id: 'interview-coaching',
    serviceTitle: 'Interview Coaching',
    category: 'Career Branding',
    image: '/assets/aistudio/interview_coaching_72395159.webp',
    imageAlt:
      '1-on-1 Interview Coaching with mock interviews, personalized feedback, resume tips and confidence coaching',
    badgeLabel: '1-on-1 Coaching',
    summary:
      'Prepare, practice, and perform in technical and HR rounds with realistic mock interviews, actionable feedback, and profile alignment.',
    improvements: [
      'Realistic 1-on-1 technical & HR mock interview sessions',
      'Personalized answer structuring & confidence-building feedback',
      'Resume & project storytelling alignment for top tech roles',
    ],
  },
  {
    id: 'cover-letter-mastery',
    serviceTitle: 'Cover Letter Mastery',
    category: 'Career Branding',
    image: '/assets/aistudio/Cover_Letter_Mastery_Illustration_4198fb9f.webp',
    imageAlt:
      'Cover Letter Mastery tailored to target job descriptions for higher recruiter shortlisting',
    badgeLabel: 'Role-Tailored',
    summary:
      'Persuasive, role-specific cover letters engineered to pair seamlessly with your ATS resume and stand out to hiring managers.',
    improvements: [
      'Targeted value hook aligned with the exact job description',
      'Concise achievement storytelling highlighting measurable impact',
      'Clean editable format ready for portals, LinkedIn & direct emails',
    ],
  },
  {
    id: 'salary-negotiation',
    serviceTitle: 'Salary Negotiation Tips',
    category: 'Career Branding',
    image: '/assets/aistudio/Salary_Negotiation_Tips_Infographic_1aad5edc.webp',
    imageAlt:
      'Salary Negotiation Tips infographic covering CTC benchmarking, counter-offers and compensation strategy',
    badgeLabel: 'Offer Strategy',
    summary:
      'Structured compensation coaching and counter-offer scripts to maximize your base pay, joining bonus, and equity package.',
    improvements: [
      'Market CTC benchmarking for your experience & target city',
      'Word-for-word HR counter-offer email & call negotiation scripts',
      'Total compensation breakdown across fixed pay, bonus & ESOPs',
    ],
  },
  {
    id: 'final-year-projects',
    serviceTitle: 'Final Year Projects',
    category: 'Tech & Design',
    image: '/assets/aistudio/Final_Year_Projects__Ideas_in_Code_c262fb23.webp',
    imageAlt:
      'Final Year Projects for B.Tech, M.Tech and MCA students with Python, Java, MERN, AI/ML implementation and viva support',
    badgeLabel: 'End-to-End Build',
    summary:
      'From project idea to final submission—complete technical implementation, database design, IEEE-style documentation, and viva demo prep.',
    improvements: [
      'B.Tech, M.Tech & MCA projects in Python, Java, MERN & AI/ML',
      'Database design, full source code & clean IEEE-ready documentation',
      'Live deployment walkthrough & 1-on-1 viva defense coaching',
    ],
    serviceSlug: '/final-year-projects-hyderabad',
  },
  {
    id: 'ai-integration',
    serviceTitle: 'AI Integration',
    category: 'Tech & Design',
    image: '/assets/aistudio/AI_Integration_Tech_Illustration_b5cebfe1.webp',
    imageAlt:
      'Custom AI Integration with intelligent chatbots, workflow automation and database connectivity',
    badgeLabel: 'AI Automation',
    summary:
      'Custom AI workflows, RAG search systems, and domain-trained assistants integrated directly into your product or operations stack.',
    improvements: [
      'Custom LLM chatbots & automated lead/support qualification flows',
      'Document indexing, knowledge-base search & structured extraction',
      'Secure backend API orchestration with cloud observability',
    ],
  },
  {
    id: 'web-development',
    serviceTitle: 'Web Development',
    category: 'Tech & Design',
    image: '/assets/aistudio/web_development_8934074c.webp',
    imageAlt:
      'Custom Web Development with React, Python, FastAPI, Django and JavaScript for modern business websites and web apps',
    badgeLabel: 'Full-Stack Build',
    summary:
      'Modern, scalable, high-performance business websites, web apps, landing pages, and e-commerce platforms built with React, Python, FastAPI, and Django.',
    improvements: [
      'Business websites, portfolio sites, landing pages & e-commerce stores',
      'Fast React frontend paired with scalable FastAPI, Django & Python APIs',
      'Secure architecture, deployment & ongoing maintenance support',
    ],
    serviceSlug: '/web-development-hyderabad',
  },
  {
    id: 'api-development',
    serviceTitle: 'API Development & Integration',
    category: 'Tech & Design',
    image: '/assets/aistudio/API_Development_and_Integration_Infographic_b3aa9d6c.webp',
    imageAlt:
      'API Development & Third-Party API Integration including payments, maps, databases and webhooks',
    badgeLabel: 'Backend APIs',
    summary:
      'High-throughput REST & GraphQL APIs plus reliable third-party integrations (payment gateways, maps, CRMs, webhooks, and cloud storage).',
    improvements: [
      'Scalable FastAPI / Node.js / Django APIs with OpenAPI docs & JWT auth',
      'Third-party payment, maps, email, SMS & webhook integrations',
      'Rate limiting, database connection pooling & fault-tolerant retries',
    ],
  },
  {
    id: 'cloud-devops',
    serviceTitle: 'Cloud Deployment & DevOps',
    category: 'Tech & Design',
    image: '/assets/aistudio/Cloud_Deployment___DevOps_Infographic_21d73257.webp',
    imageAlt:
      'Cloud Deployment & DevOps with Docker, Kubernetes, CI/CD pipelines and server monitoring',
    badgeLabel: 'CI/CD & Cloud',
    summary:
      'Zero-downtime cloud deployments using Docker, Kubernetes, automated CI/CD pipelines, HTTPS routing, and uptime monitoring.',
    improvements: [
      'Docker containerization & automated GitHub Actions CI/CD pipelines',
      'AWS / GCP / Vercel / VPS production setup with SSL & reverse proxy',
      'Log monitoring, automated backups & auto-scaling readiness',
    ],
  },
  {
    id: 'content-strategy',
    serviceTitle: 'Content Strategy',
    category: 'Marketing & Strategy',
    image: '/assets/aistudio/Content_Strategy_Planning_Illustration_8d124a95.webp',
    imageAlt:
      'Content Strategy Planning with editorial calendars, target audience mapping and SEO topics',
    badgeLabel: 'Growth Content',
    summary:
      'Data-backed editorial roadmaps, search-intent topic clusters, and high-converting landing copy built to establish authority.',
    improvements: [
      'Monthly content calendar mapped to high-intent buyer keywords',
      'Conversion-focused website copy, case studies & LinkedIn posts',
      'Clear KPI tracking across organic reach, leads & engagement',
    ],
  },
  {
    id: 'ad-campaigns',
    serviceTitle: 'Ad Campaigns',
    category: 'Marketing & Strategy',
    image: '/assets/aistudio/Ad_Campaigns_Marketing_Illustration_e01f5573.webp',
    imageAlt:
      'Ad Campaigns across Google Ads, Meta Ads and YouTube with ROI-focused targeting',
    badgeLabel: 'Paid Growth',
    summary:
      'ROI-driven Google, Meta, and YouTube ad campaigns engineered with tight audience targeting, creative testing, and conversion tracking.',
    improvements: [
      'High-intent Google Search & Meta lead-generation campaign setup',
      'Pixel & conversion API tracking for accurate cost-per-lead ROI',
      'A/B tested ad creatives paired with conversion-ready landing pages',
    ],
  },
  {
    id: 'brand-identity',
    serviceTitle: 'Brand Identity',
    category: 'Marketing & Strategy',
    image: '/assets/aistudio/Brand_Identity_Design_System_2afc4b6a.webp',
    imageAlt:
      'Brand Identity Design System covering logo design, color palette, typography and brand assets',
    badgeLabel: 'Design System',
    summary:
      'Cohesive visual identity systems covering custom logos, color palettes, typography pairings, and ready-to-use brand collateral.',
    improvements: [
      'Original vector logo suite tailored for digital & print clarity',
      'Curated brand color system, font pairing & UI component tokens',
      'Social media banners, business cards & shareable brand guidelines',
    ],
  },
];

export const SLUG_TO_TRANSFORMATION_ID: Record<string, string> = {
  // Legacy Hyderabad slugs
  'ats-resume-writing-hyderabad': 'ats-resume',
  'resume-writing-freshers-hyderabad': 'ats-resume',
  'executive-resume-writing-hyderabad': 'ats-resume',
  'college-placement-resume-hyderabad': 'ats-resume',
  'linkedin-profile-optimization-hyderabad': 'linkedin',
  'linkedin-profile-writer-software-engineers-hyderabad': 'linkedin',
  'portfolio-website-hyderabad': 'portfolio',
  'freelance-portfolio-website-hyderabad': 'portfolio',
  'ui-ux-design-hyderabad': 'ui-ux',
  'web-development-hyderabad': 'web-development',
  'final-year-projects-hyderabad': 'final-year-projects',
  // Canonical /services/* slugs
  'resume-writing': 'ats-resume',
  'linkedin-optimization': 'linkedin',
  'naukri-optimization': 'naukri',
  'indeed-optimization': 'indeed',
  'github-audit': 'github',
  'interview-coaching': 'interview-coaching',
  'cover-letter': 'cover-letter-mastery',
  'salary-negotiation': 'salary-negotiation',
  'personal-portfolio': 'portfolio',
  'final-year-projects': 'final-year-projects',
  'web-development': 'web-development',
  'ui-ux-design': 'ui-ux',
  'ai-integration': 'ai-integration',
  'api-development': 'api-development',
  'cloud-devops': 'cloud-devops',
  'seo-growth': 'seo',
  'content-strategy': 'content-strategy',
  'ad-campaigns': 'ad-campaigns',
  'brand-identity': 'brand-identity',
};

export function getTransformationByTitle(title: string): ServiceTransformation | undefined {
  return SERVICE_TRANSFORMATIONS.find(
    (item) => item.serviceTitle.toLowerCase() === title.toLowerCase()
  );
}

export function getTransformationBySlug(slug: string): ServiceTransformation | undefined {
  const id = SLUG_TO_TRANSFORMATION_ID[slug];
  return id ? SERVICE_TRANSFORMATIONS.find((item) => item.id === id) : undefined;
}

export function getServiceVisualByTitle(title: string): ServiceVisual | undefined {
  const transformation = SERVICE_TRANSFORMATIONS.find(
    (item) => item.serviceTitle.toLowerCase() === title.toLowerCase()
  );
  if (transformation) {
    return { ...transformation, kind: 'transformation' };
  }

  const showcase = SERVICE_SHOWCASES.find(
    (item) => item.serviceTitle.toLowerCase() === title.toLowerCase()
  );
  if (showcase) {
    return { ...showcase, kind: 'showcase' };
  }

  return undefined;
}

export function getServiceVisualBySlug(slug: string): ServiceVisual | undefined {
  const id = SLUG_TO_TRANSFORMATION_ID[slug];
  if (!id) return undefined;

  const transformation = SERVICE_TRANSFORMATIONS.find((item) => item.id === id);
  if (transformation) {
    return { ...transformation, kind: 'transformation' };
  }

  const showcase = SERVICE_SHOWCASES.find((item) => item.id === id);
  if (showcase) {
    return { ...showcase, kind: 'showcase' };
  }

  return undefined;
}

/**
 * Single source of truth for legacy and canonical service routes.
 * Preserves all existing Hyderabad SEO slugs alongside clean /services/* paths.
 */
export const serviceRoutes = [
  'ats-resume-writing-hyderabad',
  'linkedin-profile-optimization-hyderabad',
  'web-development-hyderabad',
  'ui-ux-design-hyderabad',
  'portfolio-website-hyderabad',
  'final-year-projects-hyderabad',
  'resume-writing-freshers-hyderabad',
  'linkedin-profile-writer-software-engineers-hyderabad',
  'executive-resume-writing-hyderabad',
  'college-placement-resume-hyderabad',
  'freelance-portfolio-website-hyderabad',
];

export const canonicalServiceSlugs = [
  // Business Solutions (9)
  'web-development',
  'ui-ux-design',
  'ai-integration',
  'api-development',
  'cloud-devops',
  'seo-growth',
  'content-strategy',
  'ad-campaigns',
  'brand-identity',
  // Career Solutions (10)
  'resume-writing',
  'linkedin-optimization',
  'naukri-optimization',
  'indeed-optimization',
  'interview-coaching',
  'github-audit',
  'cover-letter',
  'salary-negotiation',
  'personal-portfolio',
  'final-year-projects',
] as const;

export type CanonicalServiceSlug = (typeof canonicalServiceSlugs)[number];

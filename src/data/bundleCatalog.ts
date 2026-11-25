export type AudienceTrack = 'all' | 'job-seekers' | 'business';

export interface CatalogService {
  id: string;
  name: string;
  track: 'job-seekers' | 'business';
  category: string;
  standardPrice: number;
  price: number;
  turnaround: string;
  desc: string;
}

export const SERVICE_CATALOG: CatalogService[] = [
  {
    id: 'ats-resume',
    name: 'ATS Resume Writing (Word + PDF)',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 299,
    price: 239,
    turnaround: '24–48 hrs',
    desc: 'Single-column ATS format structured for Workday, Taleo, and Naukri.',
  },
  {
    id: 'linkedin-opt',
    name: 'LinkedIn Profile Optimization + Custom Banner',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 399,
    price: 319,
    turnaround: '24–48 hrs',
    desc: 'Keyword headline, About story rewrite, skills & custom header banner.',
  },
  {
    id: 'naukri-indeed',
    name: 'Naukri & Indeed Profile Optimization',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 299,
    price: 239,
    turnaround: '24 hrs',
    desc: 'Complete job portal keyword tuning and career preference alignment.',
  },
  {
    id: 'github-audit',
    name: 'GitHub Profile README & Repo Audit',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 399,
    price: 319,
    turnaround: '24 hrs',
    desc: 'Custom developer README, stack badges & pinned repository polish.',
  },
  {
    id: 'cover-letter',
    name: 'Role-Tailored Cover Letter Mastery',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 199,
    price: 159,
    turnaround: '24 hrs',
    desc: 'Persuasive editable cover letter aligned to your target role.',
  },
  {
    id: 'interview-coaching',
    name: '1-on-1 Mock Interview Coaching',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 599,
    price: 479,
    turnaround: 'Scheduled 45 min',
    desc: 'Technical/HR mock round with personalized feedback & Q&A notes.',
  },
  {
    id: 'salary-negotiation',
    name: 'Salary & Offer Negotiation Strategy',
    track: 'job-seekers',
    category: 'Career Branding',
    standardPrice: 499,
    price: 399,
    turnaround: 'Scheduled 30 min',
    desc: 'Market CTC benchmarking and counter-offer email/call scripts.',
  },
  {
    id: 'portfolio-site',
    name: 'Custom Personal Portfolio Website',
    track: 'job-seekers',
    category: 'Tech & Projects',
    standardPrice: 2999,
    price: 2399,
    turnaround: '3–4 days',
    desc: 'Responsive React portfolio deployed on cloud hosting with source code.',
  },
  {
    id: 'final-year-project',
    name: 'Final Year Project (Code + Report + Viva Prep)',
    track: 'job-seekers',
    category: 'Tech & Projects',
    standardPrice: 4999,
    price: 3999,
    turnaround: '4–7 days',
    desc: 'End-to-end B.Tech / M.Tech / MCA build in Python, Java, MERN or AI/ML.',
  },
  {
    id: 'web-development',
    name: 'Custom Business / SaaS Website',
    track: 'business',
    category: 'Web & Engineering',
    standardPrice: 9999,
    price: 7999,
    turnaround: '5–7 days',
    desc: 'Responsive website with WhatsApp lead capture, schema & hosting setup.',
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design & Wireframe System',
    track: 'business',
    category: 'Web & Engineering',
    standardPrice: 3999,
    price: 3199,
    turnaround: '3–5 days',
    desc: 'Conversion-focused UI screens, components & mobile/desktop layouts.',
  },
  {
    id: 'api-development',
    name: 'API Development & 3rd-Party Integration',
    track: 'business',
    category: 'Web & Engineering',
    standardPrice: 4999,
    price: 3999,
    turnaround: '3–5 days',
    desc: 'FastAPI / Node / Django REST APIs, payments, webhooks & database integration.',
  },
  {
    id: 'cloud-devops',
    name: 'Cloud Deployment, Docker & CI/CD Setup',
    track: 'business',
    category: 'Web & Engineering',
    standardPrice: 3999,
    price: 3199,
    turnaround: '2–3 days',
    desc: 'Docker containers, GitHub Actions CI/CD, SSL domain routing & uptime setup.',
  },
  {
    id: 'ai-integration',
    name: 'AI Chatbot & Workflow Automation Integration',
    track: 'business',
    category: 'Web & Engineering',
    standardPrice: 7999,
    price: 6399,
    turnaround: '3–5 days',
    desc: 'Custom AI assistant or document workflow integrated into your website/CRM.',
  },
  {
    id: 'seo-growth',
    name: 'Technical SEO, Schema & Search Console Setup',
    track: 'business',
    category: 'Marketing & Brand',
    standardPrice: 2999,
    price: 2399,
    turnaround: '2–3 days',
    desc: 'Structured JSON-LD schema, sitemap indexing & meta optimization.',
  },
  {
    id: 'content-strategy',
    name: 'SEO Content Strategy & Landing Copy',
    track: 'business',
    category: 'Marketing & Brand',
    standardPrice: 1999,
    price: 1599,
    turnaround: '2–3 days',
    desc: 'Conversion-focused landing page copy plus 30-day keyword content roadmap.',
  },
  {
    id: 'ad-campaigns',
    name: 'Google & Meta Ad Campaign Setup',
    track: 'business',
    category: 'Marketing & Brand',
    standardPrice: 2999,
    price: 2399,
    turnaround: '2–3 days',
    desc: 'Targeted lead-generation ad setup with conversion & pixel tracking.',
  },
  {
    id: 'brand-identity',
    name: 'Logo & Brand Identity Design Kit',
    track: 'business',
    category: 'Marketing & Brand',
    standardPrice: 2499,
    price: 1999,
    turnaround: '2–4 days',
    desc: 'Custom logo suite, color palette, typography & social media banners.',
  },
];

export const BUNDLE_ADDONS = [
  { id: 'rush-24h', name: 'Express Priority Turnaround (24-Hour Priority)', standardPrice: 499, price: 399 },
  { id: 'extra-jd-tailoring', name: 'Additional Role/JD Resume Variant', standardPrice: 199, price: 159 },
  { id: 'domain-dns-setup', name: 'Custom Domain & DNS Configuration Support', standardPrice: 499, price: 399 },
] as const;

export interface BundleCalculation {
  selectedServices: CatalogService[];
  standardSubtotal: number;
  subtotal: number;
  standardAddonsTotal: number;
  addonsTotal: number;
  discountRate: number;
  discountAmount: number;
  totalSavings: number;
  finalTotal: number;
}

export function calculateBundleTotals(
  selectedServiceIds: string[],
  selectedAddonIds: string[] = []
): BundleCalculation {
  const uniqueServiceIds = Array.from(new Set(selectedServiceIds));
  const selectedServices = SERVICE_CATALOG.filter((s) => uniqueServiceIds.includes(s.id));
  const standardSubtotal = selectedServices.reduce((sum, s) => sum + s.standardPrice, 0);
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  let discountRate = 0;
  if (selectedServices.length >= 5) discountRate = 0.2;
  else if (selectedServices.length >= 3) discountRate = 0.15;
  else if (selectedServices.length === 2) discountRate = 0.1;

  const discountAmount = Math.round(subtotal * discountRate);

  const uniqueAddonIds = Array.from(new Set(selectedAddonIds));
  const selectedAddons = BUNDLE_ADDONS.filter((a) => uniqueAddonIds.includes(a.id));
  const standardAddonsTotal = selectedAddons.reduce((sum, a) => sum + a.standardPrice, 0);
  const addonsTotal = selectedAddons.reduce(
    (sum, a) => sum + a.price,
    0
  );
  const finalTotal = subtotal - discountAmount + addonsTotal;

  return {
    selectedServices,
    standardSubtotal,
    subtotal,
    standardAddonsTotal,
    addonsTotal,
    discountRate,
    discountAmount,
    totalSavings: standardSubtotal + standardAddonsTotal - finalTotal,
    finalTotal,
  };
}

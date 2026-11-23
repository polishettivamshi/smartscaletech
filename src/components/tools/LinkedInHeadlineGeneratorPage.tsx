import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Sparkles,
  Copy,
  Check,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  Search,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { Button } from '../ui/Button';
import { trackEvent } from '../../lib/analytics';

const ROLE_PRESETS: Record<string, { skills: string[]; highlight: string }> = {
  'Python Backend Developer': {
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
    highlight: '2+ Yrs Building Scalable REST APIs & Cloud Systems',
  },
  'Full-Stack Developer (MERN)': {
    skills: ['React.js', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'MongoDB'],
    highlight: 'Building High-Throughput SaaS Web Apps',
  },
  'Java Spring Boot Developer': {
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'SQL', 'Docker'],
    highlight: 'Enterprise Backend Systems & Low-Latency APIs',
  },
  'Software Engineering Fresher': {
    skills: ['Java', 'Python', 'React', 'SQL', 'DSA', 'Git'],
    highlight: 'B.Tech CS 2025/2026 Grad | 3+ Deployed Full-Stack Projects',
  },
  'Data Analyst / BI': {
    skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'ETL'],
    highlight: 'Turning Raw Business Data into Executive Dashboards',
  },
  'UI/UX Designer': {
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'SaaS UX'],
    highlight: 'Conversion-Focused Product Interfaces & Web Flows',
  },
};

const QUICK_SKILLS = [
  'React.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'Java',
  'Spring Boot',
  'SQL',
  'AWS',
  'Docker',
  'Node.js',
  'Power BI',
  'Figma',
];

const EXPERIENCE_LEVELS = [
  'Fresher / Recent Graduate',
  '1–3 Years Experience',
  '3–6 Years Experience',
  '6+ Years / Senior Lead',
];

const PAGE_FAQS = [
  {
    q: 'Why does a LinkedIn headline matter more than a job title?',
    a: 'LinkedIn Recruiter search algorithms weight your headline heavily. Replacing generic lines like "Looking for opportunities" with exact role keywords, stack skills, and proof points dramatically increases profile search appearances.',
  },
  {
    q: 'Can I also use these generated headlines on Naukri and Indeed?',
    a: 'Yes. The keyword-separated headlines work directly as your Naukri Resume Headline and LinkedIn Headline, both of which drive recruiter search ranking.',
  },
  {
    q: 'What is included in the paid SmartScaleTech LinkedIn Makeover?',
    a: 'In addition to a custom headline, founder Vamshi rewrites your About story, restructures experience/project bullets, adds a custom tech banner, optimizes 50 skill tags, and audits your Naukri profile.',
  },
];

const headlineJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Free LinkedIn & Naukri Headline Generator by SmartScaleTech',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/linkedin-headline-generator`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    provider: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'LinkedIn Headline Generator', item: `${SITE_URL}/linkedin-headline-generator` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PAGE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export const LinkedInHeadlineGeneratorPage = () => {
  const [role, setRole] = useState('Python Backend Developer');
  const [experience, setExperience] = useState('1–3 Years Experience');
  const [skillsText, setSkillsText] = useState('Python, FastAPI, Django, PostgreSQL, AWS, Docker');
  const [highlight, setHighlight] = useState('2+ Yrs Building Scalable REST APIs & Cloud Systems');
  const [location, setLocation] = useState('Hyderabad • Immediate Joiner / Open to Roles');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handlePresetChange = (selectedRole: string) => {
    setRole(selectedRole);
    const preset = ROLE_PRESETS[selectedRole];
    if (preset) {
      setSkillsText(preset.skills.join(', '));
      setHighlight(preset.highlight);
    }
  };

  const addQuickSkill = (skill: string) => {
    const existing = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!existing.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      setSkillsText([...existing, skill].join(', '));
    }
  };

  const parsedSkills = useMemo(
    () =>
      skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 6),
    [skillsText]
  );

  const expShort = useMemo(() => {
    if (experience.startsWith('Fresher')) return 'Entry-Level / Fresher';
    if (experience.startsWith('1–3')) return '1–3 Yrs Exp';
    if (experience.startsWith('3–6')) return '3–6 Yrs Exp';
    return '6+ Yrs Senior';
  }, [experience]);

  const generatedHeadlines = useMemo(() => {
    const topSkills = parsedSkills.join(', ') || 'Core Tech Stack';
    const topThree = parsedSkills.slice(0, 3).join(' • ') || 'Modern Stack';
    const cleanRole = role.trim() || 'Software Engineer';
    const cleanHighlight = highlight.trim() || 'Delivering Production-Grade Software';
    const cleanLocation = location.trim();

    return [
      {
        id: 'recruiter-seo',
        badge: 'Best for Recruiter Search (LinkedIn + Naukri)',
        text: `${cleanRole} (${expShort}) | ${topSkills} | ${cleanHighlight}${
          cleanLocation ? ` | ${cleanLocation}` : ''
        }`.slice(0, 220),
      },
      {
        id: 'impact-first',
        badge: 'Impact & Outcome Formula',
        text: `${cleanRole} — ${cleanHighlight} | Core Stack: ${topSkills}${
          cleanLocation ? ` | ${cleanLocation}` : ''
        }`.slice(0, 220),
      },
      {
        id: 'fresher-high-signal',
        badge: 'High-Signal Concise Stack',
        text: `${cleanRole} | ${topThree} | ${cleanHighlight} | Open to ${cleanRole} Opportunities`.slice(
          0,
          220
        ),
      },
      {
        id: 'naukri-short',
        badge: 'Compact Naukri Resume Headline (< 140 chars)',
        text: `${cleanRole} (${expShort}) with hands-on expertise in ${topSkills}. ${cleanHighlight}.`.slice(
          0,
          140
        ),
      },
    ];
  }, [role, expShort, parsedSkills, highlight, location]);

  const generatedAbout = useMemo(() => {
    const cleanRole = role.trim() || 'Software Engineer';
    const skillsLine = parsedSkills.join(', ') || 'modern technologies';
    return [
      `Results-driven ${cleanRole} (${experience}) specializing in ${skillsLine}. ${
        highlight.trim() || 'Focused on building reliable, scalable products.'
      }`,
      ``,
      `What I bring to an engineering team:`,
      `• Core Technical Stack: ${skillsLine}`,
      `• End-to-end ownership from architecture and clean code to testing and cloud deployment`,
      `• Clear collaboration across product, design, and backend teams`,
      ``,
      `Currently exploring ${cleanRole} opportunities (${location || 'India / Remote'}). Connect or message me directly on LinkedIn.`,
    ].join('\n');
  }, [role, experience, parsedSkills, highlight, location]);

  const copyText = async (id: string, text: string) => {
    trackEvent('cta_click', { cta: 'copy_linkedin_headline', variant: id });
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Ignore clipboard failure
    }
  };

  const whatsappUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello Vamshi,\n\nI used the SmartScaleTech LinkedIn Headline Generator for my target role: *${role}* (${experience}).\nSkills: ${parsedSkills.join(
      ', '
    )}\n\nI want to upgrade my full LinkedIn profile + custom tech banner + Naukri profile. Please share details.`
  )}`;

  return (
    <main className="bg-page text-page min-h-screen pt-24 pb-20">
      <SEO
        title="Free LinkedIn & Naukri Headline Generator | Smart Scale Tech (SST)"
        description="Generate recruiter-searchable LinkedIn and Naukri profile headlines tailored to your tech role, skills, and experience in seconds. Built by Smart Scale Tech (SST) Hyderabad."
        keywords="linkedin headline generator free, naukri headline generator, software engineer linkedin headline examples, recruiter searchable linkedin summary, sst linkedin optimizer, smart scale tech hyderabad"
        path="/linkedin-headline-generator"
        jsonLd={headlineJsonLd}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold uppercase tracking-wider mb-4">
            <Linkedin size={14} /> Free Career Branding Tool
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Free <span className="text-primary">LinkedIn &amp; Naukri</span> Headline Generator
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Stop using &ldquo;Looking for opportunities.&rdquo; Craft keyword-rich, recruiter-searchable headlines under 220 characters in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl shadow-slate-100 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Quick Role Preset
              </label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {Object.keys(ROLE_PRESETS).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetChange(preset)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                      role === preset
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Full-Stack React Developer"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Experience Level
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Top 4–6 Searchable Skills (comma separated)
              </label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="Python, FastAPI, React, PostgreSQL, AWS"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_SKILLS.map((sk) => (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => addQuickSkill(sk)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-primary/10 hover:text-primary text-[10px] font-bold text-slate-600 cursor-pointer transition-colors"
                  >
                    + {sk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Key Achievement or Value Hook
              </label>
              <input
                type="text"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="e.g. 2+ Yrs Building Scalable APIs | 99.9% Uptime"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City / Availability Tag (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Hyderabad • Open to Opportunities"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Generated Outputs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" /> Ready-to-Use Headlines
                </h2>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  LinkedIn 220-char safe
                </span>
              </div>

              <div className="space-y-3">
                {generatedHeadlines.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-primary/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                        {item.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.text.length} chars
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      {item.text}
                    </p>
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => copyText(item.id, item.text)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary text-xs font-bold text-slate-700 hover:text-primary cursor-pointer transition-colors"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={13} className="text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={13} /> Copy Headline
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated About Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <UserCheck size={18} className="text-[#0A66C2]" /> Matching LinkedIn &ldquo;About&rdquo; Starter
                </h3>
                <button
                  type="button"
                  onClick={() => copyText('about', generatedAbout)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-primary text-xs font-bold text-slate-700 hover:text-primary cursor-pointer"
                >
                  {copiedId === 'about' ? (
                    <>
                      <Check size={13} className="text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy About Text
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-700 whitespace-pre-wrap leading-relaxed">
                {generatedAbout}
              </pre>
            </div>

            {/* Upgrade CTA */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  35–40% → 95–97% Profile Strength
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  Want Complete LinkedIn + Custom Tech Banner + Naukri Makeover?
                </h3>
                <p className="text-xs text-slate-300">
                  We rewrite your entire profile, design a custom header banner, and optimize 50 search skills in 24–48 hrs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-11 px-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs">
                    <MessageCircle size={15} className="mr-1.5" /> WhatsApp Vamshi
                  </Button>
                </a>
                <Link to="/custom-package-builder" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 px-4 rounded-xl border-white/25 text-white hover:bg-white/10 font-bold text-xs"
                  >
                    Build Bundle <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-linking & SEO FAQ */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Search size={18} className="text-primary" /> Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {PAGE_FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                  <dt className="text-sm font-bold text-slate-900">{faq.q}</dt>
                  <dd className="mt-1 text-xs text-slate-600 leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h2 className="text-xl font-black text-slate-900">More Free Career Tools</h2>
            <div className="space-y-3">
              <Link
                to="/free-ats-resume-checker"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary">
                    Free ATS Resume &amp; JD Match Checker
                  </p>
                  <p className="text-xs text-slate-500">Compare your resume directly against any Job Description</p>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-primary" />
              </Link>
              <Link
                to="/job-readiness-audit"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary">
                    60-Second Job Readiness Self-Audit
                  </p>
                  <p className="text-xs text-slate-500">Find the #1 bottleneck blocking your interview calls</p>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-primary" />
              </Link>
              <Link
                to="/custom-package-builder"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary flex items-center gap-1.5">
                    Custom Package Builder <CheckCircle2 size={14} className="text-emerald-600" />
                  </p>
                  <p className="text-xs text-slate-500">Pick only the services you need and save up to 20%</p>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-primary" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

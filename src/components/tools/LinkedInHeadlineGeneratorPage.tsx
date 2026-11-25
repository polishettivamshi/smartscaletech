import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Check,
  MessageCircle,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { Button } from '../ui/Button';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Accordion } from '../ui/Accordion';
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
    highlight: 'CS Graduate | Deployed Full-Stack Projects',
  },
  'Data Analyst / BI': {
    skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'ETL'],
    highlight: 'Turning Operational Data into Executive Dashboards',
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
    q: 'Why does a LinkedIn headline matter more than a generic job title?',
    a: 'Recruiter Boolean filters scan headlines heavily. Replacing generic lines like "Looking for opportunities" with target role keywords, core tools, and concrete domain scope increases relevance.',
  },
  {
    q: 'Can I reuse these headlines on Naukri and Indeed?',
    a: 'Yes. The keyword-separated formats fit both LinkedIn Headlines (up to 220 characters) and Naukri Resume Headlines directly.',
  },
  {
    q: 'What is included in the paid LinkedIn Optimization service?',
    a: 'We craft your headline, first-person About narrative, STAR experience bullets, curated 50-skill matrix, custom profile banner, and ready-to-paste handover without needing your password.',
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
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'LinkedIn Headline Generator', item: `${SITE_URL}/linkedin-headline-generator` },
    ],
  },
];

export const LinkedInHeadlineGeneratorPage = () => {
  const [role, setRole] = useState('Python Backend Developer');
  const [experience, setExperience] = useState('1–3 Years Experience');
  const [skillsText, setSkillsText] = useState('Python, FastAPI, Django, PostgreSQL, AWS, Docker');
  const [highlight, setHighlight] = useState('2+ Yrs Building Scalable REST APIs & Cloud Systems');
  const [location, setLocation] = useState('Hyderabad · Open to Roles');
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
    const topThree = parsedSkills.slice(0, 3).join(' · ') || 'Modern Stack';
    const cleanRole = role.trim() || 'Software Engineer';
    const cleanHighlight = highlight.trim() || 'Delivering Production Software';
    const cleanLocation = location.trim();

    return [
      {
        id: 'recruiter-seo',
        badge: 'Recruiter Search Format (LinkedIn + Naukri)',
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
        badge: 'Concise Stack Headline',
        text: `${cleanRole} | ${topThree} | ${cleanHighlight} | Open to ${cleanRole} Roles`.slice(
          0,
          220
        ),
      },
      {
        id: 'naukri-short',
        badge: 'Compact Naukri Headline (< 140 chars)',
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
      `Core Focus Areas:`,
      `• Primary Stack: ${skillsLine}`,
      `• End-to-end ownership from clean implementation and testing to cloud deployment`,
      `• Clear collaboration across engineering, product, and design teams`,
      ``,
      `Exploring ${cleanRole} opportunities (${location || 'India / Remote'}). Connect or message me directly on LinkedIn.`,
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
    `Hello SmartScaleTech,\n\nI used the LinkedIn Headline Generator for target role: *${role}* (${experience}).\nSkills: ${parsedSkills.join(
      ', '
    )}\n\nI would like details on the LinkedIn & Naukri Profile Makeover.`
  )}`;

  return (
    <main className="bg-[#F3EEE3] text-[#111111] min-h-screen pt-10 sm:pt-14 pb-20">
      <SEO
        title="Free LinkedIn & Naukri Headline Generator | SmartScaleTech (SST)"
        description="Generate Boolean-friendly LinkedIn and Naukri profile headlines tailored to your target engineering or design role in seconds."
        path="/linkedin-headline-generator"
        jsonLd={headlineJsonLd}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Free Tools', to: '/tools' },
            { label: 'LinkedIn Headline Generator' },
          ]}
          className="mb-7"
        />

        <div className="max-w-3xl mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
            Free Career Utility · 220-Character Safe
          </p>
          <h1 className="text-hero-display font-extrabold text-[#111111]">
            LinkedIn &amp; Naukri Headline Generator
          </h1>
          <p className="mt-3 text-base text-[#57534E] leading-relaxed">
            Replace generic bio filler with clear role keywords, primary technical tools, and
            recruiter-scannable value hooks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#D8D3C9] space-y-5">
            <div>
              <span className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                Role Preset
              </span>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {Object.keys(ROLE_PRESETS).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetChange(preset)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer border ${
                      role === preset
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#F3EEE3]/50 text-[#57534E] border-[#D8D3C9] hover:text-[#111111]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                aria-label="Target role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Full-Stack React Developer"
                className="w-full h-11 px-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
              />
            </div>

            <div>
              <label
                htmlFor="hl-exp"
                className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
              >
                Experience Level
              </label>
              <select
                id="hl-exp"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="hl-skills"
                className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
              >
                Core Skills (Comma Separated)
              </label>
              <input
                id="hl-skills"
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="Python, FastAPI, React, PostgreSQL"
                className="w-full h-11 px-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_SKILLS.map((sk) => (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => addQuickSkill(sk)}
                    className="px-2 py-0.5 rounded bg-[#F3EEE3] hover:bg-[#D9541E]/15 text-[11px] font-semibold text-[#111111] cursor-pointer"
                  >
                    + {sk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="hl-highlight"
                className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
              >
                Key Focus or Proof Point
              </label>
              <input
                id="hl-highlight"
                type="text"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
              />
            </div>

            <div>
              <label
                htmlFor="hl-location"
                className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
              >
                Location / Availability Tag
              </label>
              <input
                id="hl-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
              />
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8D3C9] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-[#111111]">
                  Generated Headline Options
                </h2>
                <span className="text-[11px] font-bold text-[#16845B]">220-char LinkedIn limit</span>
              </div>

              <div className="space-y-3">
                {generatedHeadlines.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9541E]">
                        {item.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-[#57534E] tabular-nums">
                        {item.text.length} chars
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#111111] leading-relaxed">{item.text}</p>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => copyText(item.id, item.text)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D8D3C9] hover:border-[#111111] text-xs font-bold text-[#111111] cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={13} className="text-[#16845B]" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={13} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8D3C9] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                  <UserCheck size={17} className="text-[#D9541E]" /> Matching &ldquo;About&rdquo; Draft
                </h3>
                <button
                  type="button"
                  onClick={() => copyText('about', generatedAbout)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3EEE3] border border-[#D8D3C9] text-xs font-bold text-[#111111] cursor-pointer"
                >
                  {copiedId === 'about' ? 'Copied' : 'Copy About'}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-xs font-sans text-[#57534E] whitespace-pre-wrap leading-relaxed">
                {generatedAbout}
              </pre>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#161616] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E87A4E]">
                  Complete LinkedIn &amp; Naukri Makeover
                </p>
                <h3 className="text-lg font-extrabold mt-1">
                  Want our studio to rewrite your full profile &amp; header banner?
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md">
                    <MessageCircle size={15} /> Discuss on WhatsApp
                  </Button>
                </a>
                <Link to="/services/linkedin-optimization">
                  <Button
                    variant="outline"
                    size="md"
                    className="border-white/25 text-white hover:bg-white/10"
                  >
                    Details <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 bg-white rounded-2xl border border-[#D8D3C9] p-7 sm:p-9">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-6">
            Headline &amp; Profile FAQs
          </h2>
          <Accordion
            items={PAGE_FAQS.map((f) => ({ question: f.q, answer: f.a }))}
            defaultOpenIndex={0}
          />
        </section>
      </div>
    </main>
  );
};

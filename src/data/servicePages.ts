import { serviceRoutes } from './serviceRoutes';

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  h1Highlight: string;
  intro: string[];
  includedTitle: string;
  included: { title: string; desc: string }[];
  processTitle: string;
  process: { title: string; desc: string }[];
  whyTitle: string;
  why: { title: string; desc: string }[];
  pricingTitle: string;
  pricing: string;
  faqs: ServiceFAQ[];
  related: string[];
}

export const WHATSAPP_URL =
  'https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%0A%0AI%27m%20interested%20in%20your%20services.%0A%0AName%3A%0AEmail%3A%0APhone%3A%0A%0AMy%20Requirement%3A%0A%0APreferred%20Time%20for%20Discussion%3A';

export const servicePages: Record<string, ServicePageData> = {
  'ats-resume-writing-hyderabad': {
    slug: 'ats-resume-writing-hyderabad',
    title: 'ATS Resume Writing Services in Hyderabad | SmartScaleTech',
    metaDescription:
      'Professional ATS resume writing in Hyderabad. Keyword-optimised resumes that clear applicant tracking systems. First draft in 3-5 days, unlimited revisions.',
    badge: 'Career Services',
    h1: 'ATS Resume Writing Services',
    h1Highlight: 'in Hyderabad',
    intro: [
      'Around 97% of large employers now screen applications through an Applicant Tracking System before a recruiter ever opens the file. If your resume is not parsed correctly, your experience never reaches a human — no matter how strong it is.',
      'SmartScaleTech writes ATS-friendly resumes in Hitech City, Hyderabad for job seekers across India. We rebuild your resume so it parses cleanly, carries the right keywords for your target role, and still reads well when a recruiter finally sees it.',
    ],
    includedTitle: 'What you get',
    included: [
      {
        title: 'ATS-safe formatting',
        desc: 'Single-column layouts and standard section headings. No tables, text boxes or graphics that break parsing.',
      },
      {
        title: 'Role-specific keywords',
        desc: 'We analyse live job descriptions for your target role and weave in the exact terminology screening software filters for.',
      },
      {
        title: 'Impact-driven rewrite',
        desc: 'Task lists become quantified achievements. "Increased signups by 34%" reads better to software and to hiring managers.',
      },
      {
        title: 'Summary and skills section',
        desc: 'A targeted professional summary and a scannable skills block built around the role you are applying for.',
      },
      {
        title: 'Format handoff',
        desc: 'Editable Word and PDF versions, plus guidance on which format to upload where.',
      },
      {
        title: 'Unlimited revisions',
        desc: 'We keep editing until the resume genuinely represents you.',
      },
    ],
    processTitle: 'How it works',
    process: [
      {
        title: 'Send your current resume',
        desc: 'Share what you have, even if it is rough. Add the job descriptions you are targeting.',
      },
      {
        title: 'We map the keyword gap',
        desc: 'We compare your experience against what the ATS and the recruiter are actually filtering for.',
      },
      {
        title: 'First draft in 3-5 days',
        desc: 'You receive a rewritten, ATS-tested resume as an editable file.',
      },
      {
        title: 'Revise until it is right',
        desc: 'Unlimited rounds, then a final Word and PDF handover.',
      },
    ],
    whyTitle: 'Why SmartScaleTech',
    why: [
      {
        title: 'Built for Indian hiring',
        desc: 'Naukri, Foundit, LinkedIn and iCIMS each parse differently. We test across the ones you will actually use.',
      },
      {
        title: 'Remote across India',
        desc: 'Based in Hitech City, Hyderabad. Everything is delivered digitally, so your location never matters.',
      },
      {
        title: 'Reply within 30 minutes',
        desc: 'Message us on WhatsApp and a human responds, usually within half an hour during working hours.',
      },
    ],
    pricingTitle: 'Pricing',
    pricing:
      'ATS resume writing is included in the Career Starter plan at ₹999 one-time, or ₹499 per month. That also covers LinkedIn optimisation, Naukri profile setup and GitHub optimisation.',
    faqs: [
      {
        q: 'How do I know if my resume is ATS-friendly?',
        a: 'Paste your resume as plain text. If section headings merge, dates shift, or columns scramble, the ATS is reading it incorrectly. We rebuild it so the plain-text version stays clean.',
      },
      {
        q: 'Will an ATS resume look boring?',
        a: 'No. ATS-safe means structurally simple, not visually empty. You get clean typography and deliberate hierarchy — just no tables, text boxes or graphics that break parsing.',
      },
      {
        q: 'Do you write resumes for freshers and experienced professionals?',
        a: 'Yes. For freshers we emphasise projects, internships and skills. For experienced candidates we focus on quantified impact and career progression.',
      },
      {
        q: 'How long until I get my resume?',
        a: 'First draft within 3-5 business days. Revisions usually turn around in 24-48 hours.',
      },
    ],
    related: [
      'linkedin-profile-optimization-hyderabad',
      'portfolio-website-hyderabad',
      'final-year-projects-hyderabad',
    ],
  },

  'linkedin-profile-optimization-hyderabad': {
    slug: 'linkedin-profile-optimization-hyderabad',
    title: 'LinkedIn Profile Optimization Services in Hyderabad | SmartScaleTech',
    metaDescription:
      'LinkedIn profile optimization in Hyderabad. Get found by recruiters with a keyword-rich headline, about section and skills. Hitech City based, remote across India.',
    badge: 'Career Services',
    h1: 'LinkedIn Profile Optimization',
    h1Highlight: 'in Hyderabad',
    intro: [
      'Recruiters on LinkedIn do not search for people, they search for keywords. If your headline says "Looking for opportunities" and your About section is three lines long, you are invisible to the search that matters.',
      'SmartScaleTech rewrites LinkedIn profiles in Hitech City, Hyderabad so recruiters searching for your skills find you first — and so the profile convinces them once they land on it.',
    ],
    includedTitle: 'What you get',
    included: [
      {
        title: 'Headline rewrite',
        desc: 'Your headline is the highest-weight field in LinkedIn search. We build it around the terms recruiters actually type.',
      },
      {
        title: 'About section',
        desc: 'A first-person narrative carrying your keywords naturally, ending in a clear call to action.',
      },
      {
        title: 'Experience section',
        desc: 'Role descriptions rewritten around measurable outcomes rather than responsibility lists.',
      },
      {
        title: 'Skills and endorsements',
        desc: 'Skills sequenced by search value and aligned with your target roles.',
      },
      {
        title: 'Recruiter-search audit',
        desc: 'We show you where you currently appear when recruiters search your target title.',
      },
      {
        title: 'Banner and headshot guidance',
        desc: 'Practical direction on the two visual elements that decide whether someone stops scrolling.',
      },
    ],
    processTitle: 'How it works',
    process: [
      {
        title: 'Profile audit',
        desc: 'Send us your LinkedIn URL. We assess how you currently appear in recruiter search.',
      },
      {
        title: 'Keyword mapping',
        desc: 'We identify the terms tied to your target roles and where they belong in your profile.',
      },
      {
        title: 'Full rewrite',
        desc: 'Headline, About, Experience and Skills rewritten and delivered as ready-to-paste text.',
      },
      {
        title: 'Publish and review',
        desc: 'You apply the changes to your own account. We review the live profile and adjust anything that reads wrong.',
      },
    ],
    whyTitle: 'Why SmartScaleTech',
    why: [
      {
        title: 'We optimise what ranks',
        desc: 'LinkedIn search weights headline, skills and location most heavily. We focus on the fields that move you up, not every field equally.',
      },
      {
        title: 'Written for your market',
        desc: "Hyderabad's IT corridor has specific expectations. We write for the recruiters who will actually read your profile.",
      },
      {
        title: 'Remote and fast',
        desc: 'Based in Hitech City, working with candidates across India. Most profiles are rewritten within three working days.',
      },
    ],
    pricingTitle: 'Pricing',
    pricing:
      'LinkedIn optimization is included in Career Starter at ₹999 one-time, or ₹499 per month, alongside ATS resume writing, Naukri setup and GitHub optimisation.',
    faqs: [
      {
        q: 'How long does LinkedIn optimization take?',
        a: 'Most profiles are rewritten within three working days of receiving your current profile and your target roles.',
      },
      {
        q: 'Do you write the profile or just advise?',
        a: 'We write the final text and deliver it ready to paste. You stay in control of your own account — we never ask for your login.',
      },
      {
        q: 'Do you optimize Naukri and Indeed profiles too?',
        a: 'Yes. Naukri profile setup is included in Career Starter, and Indeed optimization is available on request.',
      },
      {
        q: 'Can you help if I am changing careers?',
        a: 'Yes, and it is one of the cases where this matters most. We reframe existing experience around the keywords of your target field.',
      },
    ],
    related: [
      'ats-resume-writing-hyderabad',
      'portfolio-website-hyderabad',
      'web-development-hyderabad',
    ],
  },

  'web-development-hyderabad': {
    slug: 'web-development-hyderabad',
    title: 'Web Development Services in Hyderabad | SmartScaleTech',
    metaDescription:
      'Custom web development in Hyderabad. Fast, SEO-ready business websites and web apps built in Hitech City. Pricing from ₹5,999. WhatsApp us today.',
    badge: 'Tech Services',
    h1: 'Web Development Services',
    h1Highlight: 'in Hyderabad',
    intro: [
      'Most business websites are slow, hard to update and invisible on Google. A template that takes four seconds to load on a phone is costing you enquiries every single day.',
      'SmartScaleTech builds custom websites in Hitech City, Hyderabad — fast, mobile-first, and structured so search engines can read them properly from day one. No page builders, no bloated themes.',
    ],
    includedTitle: 'What you get',
    included: [
      {
        title: 'Custom design',
        desc: 'Designed around your business and content, not squeezed into a template sold a thousand times.',
      },
      {
        title: 'Mobile-first build',
        desc: 'Over 80% of Indian web traffic is mobile. Every layout is designed for the phone first, then widened.',
      },
      {
        title: 'SEO foundations',
        desc: 'Semantic headings, structured data, sitemaps and clean metadata built in — not bolted on later.',
      },
      {
        title: 'Lead capture',
        desc: 'Contact forms, WhatsApp deep links and click-to-call, so an enquiry is always one tap away.',
      },
      {
        title: 'Performance',
        desc: 'Optimised images, compressed assets and lazy loading. We target sub-two-second loads on Indian mobile connections.',
      },
      {
        title: 'Handover and training',
        desc: 'You get the code and a walkthrough, so you are never locked into us.',
      },
    ],
    processTitle: 'How it works',
    process: [
      {
        title: 'Discovery call',
        desc: 'A WhatsApp or phone call to understand the business, the audience and what the site must achieve.',
      },
      {
        title: 'Structure and content',
        desc: 'We map the pages and help shape the copy. You supply the facts, we make them read well.',
      },
      {
        title: 'Design and build',
        desc: 'You review a working build rather than a static mockup, so you see exactly what ships.',
      },
      {
        title: 'Launch and index',
        desc: 'Deployment, sitemap submission and Search Console setup so Google starts crawling immediately.',
      },
    ],
    whyTitle: 'Why SmartScaleTech',
    why: [
      {
        title: 'Built by people who do SEO',
        desc: 'We write the markup, not just the visuals. That is why our sites are indexable from launch.',
      },
      {
        title: 'Priced for Indian businesses',
        desc: 'Business Web starts at ₹5,999 for five premium pages, with Google Maps and WhatsApp integration included.',
      },
      {
        title: 'Hitech City based, working nationwide',
        desc: 'We build for salons, hospitals, schools, startups and professionals across India.',
      },
    ],
    pricingTitle: 'Pricing',
    pricing:
      'Business Web starts at ₹5,999 one-time, or ₹2,999 per month, for five premium pages, custom lead forms, SEO and Google Maps setup, WhatsApp integration and a performance audit.',
    faqs: [
      {
        q: 'How long does a business website take?',
        a: 'A five-page business site typically takes 10-15 working days from kickoff, depending on how quickly content and feedback arrive.',
      },
      {
        q: 'Do you use WordPress?',
        a: 'We build custom React sites for performance and long-term SEO. If you specifically need WordPress for in-house editing, we can discuss it.',
      },
      {
        q: 'Will I be able to edit the site myself?',
        a: 'Yes. We hand over the code and walk you through it. Nothing is locked behind a proprietary builder.',
      },
      {
        q: 'Do you provide hosting?',
        a: 'Hosting is included for one year with the Portfolio Launch plan. For business sites we help you set up your own account so you retain full control.',
      },
    ],
    related: [
      'ui-ux-design-hyderabad',
      'portfolio-website-hyderabad',
      'ats-resume-writing-hyderabad',
    ],
  },

  'ui-ux-design-hyderabad': {
    slug: 'ui-ux-design-hyderabad',
    title: 'UI/UX Design Services in Hyderabad | SmartScaleTech',
    metaDescription:
      'UI/UX design in Hyderabad. Conversion-focused interfaces, design systems and app flows from a Hitech City studio. Research-led, delivered in Figma.',
    badge: 'Design Services',
    h1: 'UI/UX Design Services',
    h1Highlight: 'in Hyderabad',
    intro: [
      'A beautiful interface that users cannot navigate is a failed design. Most product teams skip the research and jump straight to screens — then wonder why activation stalls.',
      'SmartScaleTech is a UI/UX design studio in Hitech City, Hyderabad. We design around what users actually do, then hand over a system your developers can build without guessing.',
    ],
    includedTitle: 'What you get',
    included: [
      {
        title: 'User research and flows',
        desc: 'Interviews, journey maps and task flows before any visual work begins.',
      },
      {
        title: 'Wireframes',
        desc: 'Low-fidelity structure first, so layout problems are solved while they are cheap to change.',
      },
      {
        title: 'High-fidelity UI',
        desc: 'Pixel-accurate screens in Figma with responsive variants for mobile, tablet and desktop.',
      },
      {
        title: 'Design system',
        desc: 'Reusable components, spacing rules and a colour and type scale your team can extend.',
      },
      {
        title: 'Usability review',
        desc: 'We test key flows against real tasks and fix the friction before development starts.',
      },
      {
        title: 'Developer handoff',
        desc: 'Specs, assets and tokens exported so engineering builds exactly what was designed.',
      },
    ],
    processTitle: 'How it works',
    process: [
      {
        title: 'Understand the problem',
        desc: "We start with the business goal and the user's job, not with a colour palette.",
      },
      {
        title: 'Map and wireframe',
        desc: 'Flows and wireframes, reviewed together before any visual design.',
      },
      {
        title: 'Design',
        desc: 'High-fidelity screens and a component library, iterated with you in Figma.',
      },
      {
        title: 'Handoff',
        desc: 'Documented, developer-ready files plus a review session with your team.',
      },
    ],
    whyTitle: 'Why SmartScaleTech',
    why: [
      {
        title: 'Design that ships',
        desc: 'We design within the constraints of the framework you build in, so nothing gets thrown away in development.',
      },
      {
        title: 'Systems, not screens',
        desc: 'You leave with a reusable library, which makes the next feature ten times faster.',
      },
      {
        title: 'Local and responsive',
        desc: 'Hitech City based, working with product teams across Hyderabad and India.',
      },
    ],
    pricingTitle: 'Pricing',
    pricing:
      'UI/UX design is quoted per project depending on scope and screen count, and is bundled into our website plans when the design work is part of a build. Message us on WhatsApp for a scoped quote.',
    faqs: [
      {
        q: 'What do I receive at the end?',
        a: 'A Figma file with high-fidelity screens, responsive variants, a component library and exported design tokens.',
      },
      {
        q: 'Do you also build the product?',
        a: 'Yes. We handle design and development together, which removes the usual handoff failures.',
      },
      {
        q: 'How many revision rounds are included?',
        a: 'Design is iterated with you through each phase, so revisions are continuous rather than limited to a final round.',
      },
      {
        q: 'Can you improve an existing product?',
        a: 'Yes. We run a usability review of what exists, identify the friction, and redesign the flows that matter most.',
      },
    ],
    related: [
      'web-development-hyderabad',
      'portfolio-website-hyderabad',
      'ats-resume-writing-hyderabad',
    ],
  },

  'portfolio-website-hyderabad': {
    slug: 'portfolio-website-hyderabad',
    title: 'Portfolio Website Development in Hyderabad | SmartScaleTech',
    metaDescription:
      'Recruiter-ready portfolio websites in Hyderabad. Animated, fast and linked to your resume. Built in Hitech City with one year hosting included. From ₹2,999.',
    badge: 'Tech Services',
    h1: 'Portfolio Website Development',
    h1Highlight: 'in Hyderabad',
    intro: [
      'When a recruiter shortlists you, they search your name. What they find decides whether you get the call. A GitHub profile with private repos and a bare LinkedIn link is a missed opportunity.',
      'SmartScaleTech builds portfolio websites in Hitech City, Hyderabad that give developers, designers and freshers a link worth sending — fast, animated, and built to be found on Google when someone searches your name.',
      'Most portfolios are a single page: a photo, a bio and a list of links. Yours should be a small website, with a page per project carrying the problem, your approach, the stack and the result. That is what gets a recruiter to scroll.',
    ],
    includedTitle: 'What you get',
    included: [
      {
        title: 'Project pages',
        desc: 'A dedicated page per project with the problem, approach, stack and outcome — not a grid of thumbnails.',
      },
      {
        title: 'Resume integration',
        desc: 'Your ATS resume downloadable and embedded, so portfolio and resume work as one asset.',
      },
      {
        title: 'Custom domain',
        desc: 'yourname.com reads far better in an email signature than a shared subdomain. We help you set it up.',
      },
      {
        title: 'Animations',
        desc: 'Purposeful motion that signals front-end skill without slowing the page down.',
      },
      {
        title: 'SEO for your name',
        desc: 'Structured data and metadata set up so your portfolio, not an old social post, ranks for your name.',
      },
      {
        title: 'One year hosting',
        desc: 'Hosting is included for the first year in the Portfolio Launch plan.',
      },
    ],
    processTitle: 'How it works',
    process: [
      {
        title: 'Share your work',
        desc: 'Send your projects, repos or even rough notes. We help structure them.',
      },
      {
        title: 'Content shaping',
        desc: 'We write the project narratives so each one shows how you think, not just what you built.',
      },
      {
        title: 'Design and build',
        desc: 'A custom animated portfolio, reviewed with you before launch.',
      },
      {
        title: 'Launch and setup',
        desc: 'Domain, hosting and Search Console configured so Google indexes your name.',
      },
    ],
    whyTitle: 'Why SmartScaleTech',
    why: [
      {
        title: 'We write, not just build',
        desc: 'Most portfolio builders hand you a template and leave the writing to you. We shape the narrative.',
      },
      {
        title: 'Built to be found',
        desc: 'Structured data and a sitemap give your portfolio a real chance at ranking for your own name.',
      },
      {
        title: 'Made for the Hyderabad market',
        desc: "We know what recruiters at Hyderabad's IT corridor look for in a developer portfolio.",
      },
    ],
    pricingTitle: 'Pricing',
    pricing:
      'Portfolio Launch is ₹2,999 one-time, or ₹1,999 per month, and includes the animated portfolio website, ATS resume writing, LinkedIn and GitHub preparation, SEO optimisation and one year of hosting.',
    faqs: [
      {
        q: 'Do I need a portfolio if I have a GitHub profile?',
        a: 'A GitHub profile shows code; a portfolio shows judgement. Recruiters rarely read repositories, but they will spend two minutes on a well-built portfolio.',
      },
      {
        q: 'Can I add projects later?',
        a: 'Yes. We hand over the code so you can extend it, and additional pages can be added at any time.',
      },
      {
        q: 'Do you write the project descriptions?',
        a: 'Yes. You supply the facts and screenshots; we shape them into narratives that show your decision-making.',
      },
      {
        q: 'Will my portfolio rank on Google for my name?',
        a: 'We set up the structured data and metadata to give it the best chance. New sites typically take a few weeks to be indexed.',
      },
    ],
    related: [
      'web-development-hyderabad',
      'ats-resume-writing-hyderabad',
      'ui-ux-design-hyderabad',
    ],
  },

  'final-year-projects-hyderabad': {
    slug: 'final-year-projects-hyderabad',
    title: 'Final Year Project Development in Hyderabad | SmartScaleTech',
    metaDescription:
      'Final year project development in Hyderabad for CSE, IT and ECE students. Full source code, documentation and viva support. Hitech City based.',
    badge: 'Academic Services',
    h1: 'Final Year Project Development',
    h1Highlight: 'in Hyderabad',
    intro: [
      'A final year project is often the first thing an interviewer actually asks about. Many students submit something generic, cannot explain it, and lose the conversation.',
      'SmartScaleTech builds final year projects in Hitech City, Hyderabad for CSE, IT, ECE and allied students. We build systems you can genuinely explain — and we make sure you can defend every decision in the viva.',
      'We do not sell the same project to fifty students. Every build is scoped to your requirement, so you are not standing in front of a panel presenting work three other people also bought.',
    ],
    includedTitle: 'What you get',
    included: [
      {
        title: 'Working application',
        desc: 'A complete, runnable system built on a stack your syllabus and your interviewer will both respect.',
      },
      {
        title: 'Source code handover',
        desc: 'Full source, with a walkthrough so you understand every module before submission.',
      },
      {
        title: 'Documentation and report',
        desc: "Abstract, system design, ER diagrams, screenshots and chapters formatted to your university's structure.",
      },
      {
        title: 'Presentation deck',
        desc: 'A slide deck that walks the panel through the problem, architecture and results.',
      },
      {
        title: 'Viva preparation',
        desc: 'A question list covering your stack, database design and algorithms — with answers you can defend.',
      },
      {
        title: 'Deployment',
        desc: 'Hosted so you can demo it live rather than running it off a laptop in the lab.',
      },
    ],
    processTitle: 'How it works',
    process: [
      {
        title: 'Shortlist a domain',
        desc: 'Tell us your branch and interests. We suggest three suitable problem statements.',
      },
      {
        title: 'Approve the scope',
        desc: 'We agree the modules, stack and deliverables before building starts.',
      },
      {
        title: 'Build and review',
        desc: 'We build in stages and walk you through each part as it lands.',
      },
      {
        title: 'Submit ready',
        desc: 'Code, documentation, presentation and viva preparation, delivered well before your deadline.',
      },
    ],
    whyTitle: 'Why SmartScaleTech',
    why: [
      {
        title: 'You will understand it',
        desc: 'Every project ends with a walkthrough. If you cannot explain it, we have not finished.',
      },
      {
        title: 'Built to your syllabus',
        desc: "We work to your university's report format and evaluation criteria, not a generic template.",
      },
      {
        title: 'Deadline-safe',
        desc: 'We schedule backwards from your submission date and confirm milestones up front.',
      },
    ],
    pricingTitle: 'Pricing',
    pricing:
      'Final year project pricing depends on scope and stack. Full builds with documentation and viva support start at ₹2,999. Message us on WhatsApp with your branch and deadline for a quote.',
    faqs: [
      {
        q: 'Which technologies do you build in?',
        a: 'Common stacks include Python, Django, Flask, MERN, Java, PHP and MySQL, plus AI and ML integration where your project calls for it. We recommend a stack that suits your syllabus.',
      },
      {
        q: 'Will the same project be given to other students?',
        a: 'No. Each build is scoped to your requirement, so you are not submitting work that another student also bought.',
      },
      {
        q: 'Can you help if I have already started?',
        a: 'Yes. Send what you have. We take over, fix or extend existing work.',
      },
      {
        q: 'How early should I approach you?',
        a: 'Six to eight weeks before submission is comfortable. We can work faster, but it narrows your choices.',
      },
    ],
    related: [
      'ats-resume-writing-hyderabad',
      'portfolio-website-hyderabad',
      'web-development-hyderabad',
    ],
  },
};

export const serviceSlugs = Object.keys(servicePages);

// Fail loudly in development if a routed slug has no content behind it.
serviceRoutes.forEach((slug) => {
  if (!servicePages[slug]) {
    throw new Error(`Missing service page content for route "${slug}"`);
  }
});

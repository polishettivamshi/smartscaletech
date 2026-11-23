import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  app.use(express.json({ limit: '64kb' }));

  const cleanField = (val: unknown, maxLen: number): string =>
    typeof val === 'string' ? val.trim().slice(0, maxLen) : '';

  const maskPhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 4 ? `***${digits.slice(-4)}` : '***';
  };

  // Service Request endpoint for LinkedIn & Website proposals
  app.post('/api/service-request', async (req, res) => {
    try {
      const data = req.body;
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Invalid request payload' });
      }

      const name = cleanField(data.name, 120);
      const phone = cleanField(data.phone, 40);
      const email = cleanField(data.email, 160);
      const service = cleanField(data.service, 160);
      const timeline = cleanField(data.timeline, 120);
      const budget = cleanField(data.budget, 120);

      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      console.log('[Service Request Received]', {
        service: service || 'General',
        phoneSuffix: maskPhone(phone),
        hasEmail: Boolean(email),
        timeline: timeline || 'Unspecified',
        budget: budget || 'Unspecified',
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message: 'Service request recorded successfully',
        founderWhatsApp: '919000859695',
        founderEmail: 'smartscaletechforyou@gmail.com',
      });
    } catch {
      console.error('[Service Request Error] Failed to process request');
      return res.status(500).json({ error: 'Failed to process service request' });
    }
  });

  // AI Agent endpoint for SmartScaleTech Career & Service Assistant
  app.post('/api/agent/chat', async (req, res) => {
    try {
      const body = req.body;
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid request payload' });
      }

      const message = cleanField(body.message, 1500);
      const history = body.history;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });
          const systemInstruction = `You are the official SmartScaleTech AI Career & Service Advisor ("SmartScale AI Advisor") based in Hitech City, Hyderabad.
SmartScaleTech is a premier digital branding, career engineering, and web development agency helping job seekers, students, and businesses grow.

Latest Agency Details, Pricing & Tools:
- Location: Hitech City, Hyderabad, Telangana, India.
- WhatsApp Direct Contact: +91 90008 59695 (Founder Vamshi replies within 5 minutes!).
- Email: smartscaletechforyou@gmail.com
- Standard Turnaround Time: 24 to 48 hours for resumes/profiles; 3 to 7 days for websites & final year projects. Urgent express delivery available.
- Confidentiality: We NEVER ask for your LinkedIn, Naukri, or GitHub passwords — everything is delivered ready-to-paste or with full source code ownership.

Official Bundles (with automatic bundle discounts):
  * Career Starter Bundle: ₹1,500 (Save ₹396 off ₹1,896) — ATS Resume (Word + PDF) + LinkedIn Optimization + Naukri & Indeed Setup + GitHub Profile Audit + unlimited revisions.
  * Portfolio Launch Bundle (Most Popular): ₹3,000 (Save ₹396 off ₹3,396) — Custom Animated Portfolio Website + ATS Resume + LinkedIn & GitHub Setup + Free Cloud Deployment (₹0/mo hosting) + Google SEO + Full Source Code.
  * Business Web Bundle: ₹6,000 (Save ₹998 off ₹6,998) — 5 Custom Responsive Pages + WhatsApp Lead Capture + Technical SEO & Google Search Console/Maps Setup + Performance Audit + Free Cloud Hosting + 30 Days Support.
  * Custom Package Builder (/custom-package-builder): Pick any 2+ services to unlock 10% off (2 items), 15% off (3-4 items), or 20% off (5+ items) automatically.

Individual Services (19 total):
  * Career & Job Portals: Cover Letter Mastery (₹299), GitHub Audit (₹399), ATS Resume Writing (₹499), LinkedIn Makeover + Custom Banner (₹499), Naukri & Indeed Optimization (₹499), Mock Interview Coaching (₹499), Salary & Offer Negotiation (₹499).
  * Websites & Tech Projects: Custom Portfolio Website (₹1,999), Final Year Projects with Code + Report + Viva Prep (₹2,999), Business/SaaS Web Development (₹4,999), UI/UX Design (₹2,499), API Development & Integration (₹2,499), Cloud Deployment & DevOps CI/CD (₹1,999), AI Chatbot & Workflow Integration (₹2,999).
  * Growth & Brand: Technical SEO Setup (₹1,999), Content Strategy (₹1,499), Google/Meta Ad Campaigns (₹1,999), Brand Identity & Logo Kit (₹1,999).

4 Free Interactive Tools on Our Website:
  * Free ATS Resume Checker & Job Description Matcher (/free-ats-resume-checker) — Check ATS score (0-100), STAR metrics, sections & match your resume word-for-word against any Job Description.
  * Free LinkedIn & Naukri Headline Generator (/linkedin-headline-generator) — Generates 4 recruiter-searchable 220-char headlines + matching About section.
  * 60-Second Job Readiness Audit (/job-readiness-audit) — 6-checkpoint diagnostic scoring ATS health, LinkedIn, Naukri, GitHub, and interview readiness.
  * Custom Package & Price Estimator (/custom-package-builder) — Live discount calculator (10%-20% off).
  * Service Proposal Request Form (/request-service) — Submit exact requirements for a free quote (₹0 upfront).

Tone & Instructions:
- Keep answers concise, structured with bullet points, practical, and strictly truthful.
- When helpful, include internal markdown links like [Free ATS Checker](/free-ats-resume-checker), [Custom Package Builder](/custom-package-builder), [Headline Generator](/linkedin-headline-generator), [Job Readiness Audit](/job-readiness-audit), or [Request Proposal](/request-service).
- Invite visitors to message founder Vamshi on WhatsApp (+91 90008 59695) for a 5-minute reply.`;

          const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

          if (Array.isArray(history)) {
            for (const h of history.slice(-6)) {
              if (h && typeof h === 'object' && (h.role === 'user' || h.role === 'model')) {
                const entryText = cleanField(h.text ?? h.content, 1000);
                if (entryText) {
                  contents.push({
                    role: h.role,
                    parts: [{ text: entryText }]
                  });
                }
              }
            }
          }

          contents.push({
            role: 'user',
            parts: [{ text: message }]
          });

          // Allow up to 2.5 seconds for API response before gracefully returning domain response
          const timeoutPromise = new Promise<null>((resolve) =>
            setTimeout(() => resolve(null), 2500)
          );

          const apiCall = ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            }
          }).catch(() => null);

          const response = await Promise.race([apiCall, timeoutPromise]);

          if (response && response.text) {
            return res.json({ reply: response.text });
          }
        } catch {
          // Gracefully continue to domain knowledge base
        }
      }

      // Domain knowledge fallback (ensures 100% uptime even if API key is temporarily absent or offline)
      const q = message.toLowerCase();
      let reply = '';
      if (q.includes('headline') || q.includes('about section')) {
        reply = `Try our **[Free LinkedIn & Naukri Headline Generator](/linkedin-headline-generator)**! Pick your role preset and core stack to generate 4 recruiter-searchable headlines (under 220 chars) plus a matching About section starter in seconds.\n\nWant a full profile rewrite + custom tech banner? It's ₹499 individually or bundled in **Career Starter (₹1,500)**.`;
      } else if (q.includes('readiness') || q.includes('audit') || q.includes('no calls') || q.includes('interview call') || q.includes('not getting')) {
        reply = `Not getting callbacks? Take our **[60-Second Job Readiness Audit](/job-readiness-audit)**!\n\nIt checks 6 hiring bottlenecks—ATS structure, STAR metrics, LinkedIn headline, Naukri completeness, GitHub/portfolio proof, and interview prep—and gives you an instant 0–100 action plan.`;
      } else if (q.includes('bundle') || q.includes('custom') || q.includes('calculator') || q.includes('discount') || q.includes('estimator')) {
        reply = `Use our **[Custom Package Builder](/custom-package-builder)** to pick only what you need and unlock automatic discounts:\n\n• **2 Services**: **10% off**\n• **3–4 Services**: **15% off**\n• **5+ Services**: **20% off**\n\nOr pick a ready bundle: **Career Starter (₹1,500)**, **Portfolio Launch (₹3,000)**, or **Business Web (₹6,000)**!`;
      } else if (q.includes('final year') || q.includes('b.tech') || q.includes('m.tech') || q.includes('mca') || q.includes('viva') || q.includes('college project')) {
        reply = `Our **Final Year Projects (₹2,999)** cover B.Tech, M.Tech, and MCA builds in Python, Java, MERN, Cloud & AI/ML.\n\nYou get working source code, database design, university-formatted project report, presentation deck, cloud demo deployment, and 1-on-1 viva preparation.\n\nExplore domain ideas on [Final Year Projects](/final-year-projects) or message Vamshi on WhatsApp (+91 90008 59695)!`;
      } else if (q.includes('portfolio') || q.includes('website') || q.includes('web dev') || q.includes('business web') || q.includes('saas') || q.includes('api') || q.includes('devops') || q.includes('ai integration')) {
        reply = `Here are our latest web & engineering packages:\n\n• **Portfolio Website**: ₹1,999 standalone (or **₹3,000** in **Portfolio Launch** with ATS Resume + LinkedIn + GitHub)\n• **Business Web + SEO Bundle**: **₹6,000** (Save ₹998 off ₹6,998 — 5 custom pages, WhatsApp leads, Search Console & free cloud hosting)\n• **Engineering Add-ons**: UI/UX Design (₹2,499), API Development (₹2,499), Cloud/DevOps CI/CD (₹1,999), AI Chatbot Integration (₹2,999)\n\nCustomize yours on the **[Custom Package Builder](/custom-package-builder)**!`;
      } else if (q.includes('naukri') || q.includes('github') || q.includes('interview') || q.includes('salary') || q.includes('cover letter')) {
        reply = `Beyond resumes, we also offer standalone career upgrades:\n\n• **Role-Tailored Cover Letter**: ₹299\n• **GitHub README & Repo Audit**: ₹399\n• **Naukri & Indeed Optimization**: ₹499 (boosts profile strength to 96–98%)\n• **1-on-1 Mock Interview Coaching**: ₹499 (45-min technical/HR round)\n• **Salary & Offer Negotiation Strategy**: ₹499\n\nCombine any 2+ on the **[Custom Package Builder](/custom-package-builder)** to save 10%–20%!`;
      } else if (q.includes('request') || q.includes('form') || q.includes('proposal')) {
        reply = `You can submit your exact requirement via our **[Service Proposal Request Form](/request-service)** (₹0 upfront).\n\nYour request routes directly to founder Vamshi on WhatsApp (+91 90008 59695) and email (smartscaletechforyou@gmail.com) for a **5-minute reply**!`;
      } else if (q.includes('contact') || q.includes('whatsapp') || q.includes('call') || q.includes('phone') || q.includes('book') || q.includes('reach') || q.includes('number') || q.includes('password') || q.includes('confidential')) {
        reply = `You can connect directly with founder Vamshi on WhatsApp at **+91 90008 59695** (5-minute reply during 9 AM–9 PM IST).\n\n🔒 **100% Confidential**: We never ask for your LinkedIn, Naukri, or GitHub passwords—we deliver ready-to-paste copy and full source code directly to you.`;
      } else if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('charge') || q.includes('fee')) {
        reply = `Here are our latest official bundle prices (with built-in savings):\n\n• **Career Starter**: **₹1,500** *(Save ₹396 off ₹1,896 — ATS Resume + LinkedIn + Naukri + GitHub)*\n• **Portfolio Launch (Popular)**: **₹3,000** *(Save ₹396 off ₹3,396 — Animated Portfolio + ATS Resume + LinkedIn + GitHub + Free Hosting)*\n• **Business Web + SEO**: **₹6,000** *(Save ₹998 off ₹6,998 — 5-Page Business Site + Search Console + WhatsApp Capture)*\n\nSingle services start from **₹299–₹499**, or build your own mix for up to **20% off** in our **[Custom Package Builder](/custom-package-builder)**!`;
      } else if (/\bats\b/i.test(q) || q.includes('score') || q.includes('checker') || q.includes('scanner') || q.includes('workday') || q.includes('jd') || q.includes('job description')) {
        reply = `Most ATS systems (Workday, Greenhouse, Taleo, Naukri) filter out resumes with multi-column tables, graphics, or missing JD keywords.\n\nTest your current resume right now in our **[Free ATS Resume & JD Match Checker](/free-ats-resume-checker)**—paste your resume AND any Job Description to spot missing keywords and STAR metrics immediately!`;
      } else if (q.includes('time') || q.includes('fast') || q.includes('turnaround') || q.includes('duration') || q.includes('deliver') || q.includes('revision') || q.includes('sample')) {
        reply = `• **Resumes, LinkedIn, Naukri & GitHub**: **24–48 hours** (same-day express available)\n• **Portfolio & Business Websites**: **3–7 days**\n• **Revisions**: Unlimited revisions until you are 100% interview-ready\n\nYou can also preview a real 97/100 Python Developer resume sample directly on the homepage or message us on WhatsApp (+91 90008 59695)!`;
      } else if (q.includes('linkedin')) {
        reply = `Our **LinkedIn Profile Makeover (₹499)** includes a recruiter-SEO headline, story-driven About summary, quantified role bullets, 50 searchable skills, and a custom tech banner—delivered ready-to-paste with zero password access needed.\n\nTry our **[Free LinkedIn Headline Generator](/linkedin-headline-generator)** right now!`;
      } else if (q.includes('hyderabad') || q.includes('location') || q.includes('office') || q.includes('hitech')) {
        reply = `SmartScaleTech is based in **Hitech City, Hyderabad** (serving Mindspace/Hyderabad candidates locally as well as professionals across India and globally online)!`;
      } else {
        reply = `Hello! I'm your **SmartScale AI Advisor** from Hitech City, Hyderabad.\n\nI can help you explore:\n• **[Free ATS & JD Match Checker](/free-ats-resume-checker)** (Role scan + Job Description match)\n• **[Free LinkedIn Headline Generator](/linkedin-headline-generator)** & **[60-Sec Job Readiness Audit](/job-readiness-audit)**\n• **Latest Bundles**: Career Starter (**₹1,500**), Portfolio Launch (**₹3,000**), Business Web (**₹6,000**)\n• **[Custom Package Builder](/custom-package-builder)** (save **10%–20%** automatically)\n\nAsk me anything or tap a quick topic below!`;
      }

      return res.json({ reply });
    } catch {
      console.error('[Agent Chat Error] Failed to process agent request');
      return res.status(500).json({ error: 'Internal server error processing agent request' });
    }
  });

  // Client serving in production vs development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.use((_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SmartScaleTech Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

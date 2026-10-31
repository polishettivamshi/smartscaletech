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

  app.use(express.json());

  // AI Agent endpoint for SmartScaleTech Career & Service Assistant
  app.post('/api/agent/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
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
          const systemInstruction = `You are the official SmartScaleTech AI Career & Service Advisor ("SmartScale Bot") based in Hitech City, Hyderabad.
SmartScaleTech is a premier digital branding and career engineering agency helping job seekers, freshers, tech professionals, and students improve their hiring outcomes.

Agency Details & Services:
- Location: Hitech City, Hyderabad, Telangana, India.
- WhatsApp Direct Contact: +91 99896 90518 (We reply within 5 minutes!).
- Standard Turnaround Time: 24 to 48 hours. Urgent priority delivery available.
- Transparent Packages:
  * Freshers ATS Resume (0-1 yrs): ₹399 - Clean single-column ATS layout, 50+ role keywords, 24-hr delivery.
  * Working Professionals ATS Resume (1-5 yrs): ₹699 - Workday & Greenhouse compliance, quantified impact metrics.
  * Senior / Tech Lead ATS Resume (5+ yrs): ₹1,199 - Executive framing, leadership impact, architecture highlights.
  * LinkedIn Profile Makeover: ₹599 - High-CTR search headline, compelling story About summary, skill endorsements strategy.
  * Career Launch Combo: ₹1,499 - Complete overhaul: ATS Resume + LinkedIn Makeover + Custom Cover Letter + 2 rounds of revisions.
- ATS Score Guarantee: All re-engineered resumes are targeted and benchmarked to score 95-98/100 on ATS parsers (Workday, Greenhouse, Taleo, Darwinbox).
- Free Tools: Free ATS Resume Checker and Candidate Progress Tracker on our website.

Tone & Instructions:
- Keep answers concise, practical, highly encouraging, and strictly truthful.
- Never invent fake statistics or unverified client names.
- Highlight our 5-minute WhatsApp response time and invite them to message founder Vamshi at +91 99896 90518 or use our booking modal.`;

          const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

          if (Array.isArray(history)) {
            for (const h of history.slice(-6)) {
              if (h.role === 'user' || h.role === 'model') {
                contents.push({
                  role: h.role,
                  parts: [{ text: String(h.text || h.content || '') }]
                });
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
      if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('charge') || q.includes('fee')) {
        reply = `Here are our transparent fixed pricing packages:\n\n• **Fresher ATS Resume (0-1 yrs)**: ₹399 (24-hr delivery, 50+ keywords)\n• **Working Pro ATS Resume (1-5 yrs)**: ₹699 (Workday & Greenhouse optimized)\n• **Senior / Tech Lead (5+ yrs)**: ₹1,199 (Executive framing & metrics)\n• **LinkedIn Profile Makeover**: ₹599 (5x search visibility boost)\n• **Career Launch Combo**: ₹1,499 (Resume + LinkedIn + Cover Letter + 48-hr delivery)\n\nWe guarantee an ATS benchmark score of 95-98/100. Would you like to check your resume score for free first?`;
      } else if (q.includes('ats') || q.includes('score') || q.includes('checker') || q.includes('scanner') || q.includes('workday')) {
        reply = `Most applicant tracking systems (Workday, Greenhouse, Taleo, Darwinbox) reject 75%+ of resumes due to fancy columns, tables, non-standard headers, and missing technical keywords.\n\nSmartScaleTech re-engineers your resume into a clean, single-column, metric-driven document that scores **97–98/100** on ATS scanners.\n\nYou can try our **Free ATS Resume Checker** on this site right now, or message us on WhatsApp for a personalized audit!`;
      } else if (q.includes('contact') || q.includes('whatsapp') || q.includes('call') || q.includes('phone') || q.includes('book') || q.includes('reach')) {
        reply = `You can connect directly with our founder Vamshi on WhatsApp at **+91 99896 90518**.\n\n⚡ We reply within **5 minutes**! Feel free to send your existing resume PDF for a complimentary review.`;
      } else if (q.includes('time') || q.includes('fast') || q.includes('turnaround') || q.includes('duration') || q.includes('deliver')) {
        reply = `Our standard turnaround time is **24 to 48 hours** from when you submit your details.\n\nFor urgent job applications or placement deadlines, same-day express delivery is also available upon request!`;
      } else if (q.includes('linkedin')) {
        reply = `Our **LinkedIn Profile Makeover (₹599)** includes:\n\n1. High-CTR searchable headline with recruiter keywords\n2. First-person story-driven About / Summary hook\n3. Quantified experience bullets that showcase real impact\n4. Top 50 skill optimization for algorithmic discovery\n\nMost clients see a 5x to 10x increase in weekly recruiter search appearances!`;
      } else if (q.includes('hyderabad') || q.includes('location') || q.includes('office') || q.includes('hitech')) {
        reply = `SmartScaleTech is based in **Hitech City, Hyderabad** (near Mindspace & Knowledge City). We help candidates locally across Hyderabad as well as pan-India and globally for remote roles!`;
      } else if (q.includes('dashboard') || q.includes('tracker') || q.includes('progress')) {
        reply = `Check out our **Candidate Progress Tracker** on the \`/dashboard\` page! It tracks your ATS score evolution (from initial scan 52/100 to interview-ready 98/100), interview callbacks, and weekly recruiter visibility over time.`;
      } else {
        reply = `Hello! I'm your **SmartScaleTech Career Advisor** from Hitech City, Hyderabad.\n\nI can help you with:\n• **ATS Resume Writing** (scoring 97–98/100 on Workday & Greenhouse)\n• **LinkedIn Optimization** to get recruiter inmails\n• **Transparent Pricing** (starting at just ₹399)\n• **Free ATS Scan & Progress Tracker**\n\nHow can I help you accelerate your job search today?`;
      }

      return res.json({ reply });
    } catch (err: any) {
      console.error('Agent chat error:', err);
      return res.status(500).json({ error: 'Internal server error processing agent request' });
    }
  });

  // Client serving in production vs development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
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

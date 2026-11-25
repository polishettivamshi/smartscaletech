# SmartScaleTech

SmartScaleTech is a digital services and career solutions website for businesses, professionals, and graduates. It includes service discovery, portfolio examples, career tools, proposal forms, and the SmartScale Studio Advisor chatbot.

🔗 **Live site:** [smartscaletech](https://smartscaletech.vercel.app)

## 📸 Preview

![SmartScaleTech Homepage](./screenshots/homepage.png)

## Features

- Responsive landing page with a full-section hero video (`public/videos/SmartScaleTech Hero Section.mp4`).
- Business and career service pages, project showcases, pricing, and a custom package builder.
- Free career tools, including an ATS resume checker, LinkedIn headline generator, and job-readiness audit.
- Website lead and service-request forms that deliver branded email through Resend.
- SmartScale Studio Advisor chatbot with service guidance, pricing information, and WhatsApp contact.
- Search metadata and prerendered HTML for public routes.

## Tech stack

- React 19, TypeScript, and Vite
- Tailwind CSS 4
- Express local development server
- Resend for lead email delivery
- Google Gemini for live chatbot responses
- Lucide React icons

## Requirements

- Node.js 20 or newer
- npm

## Local setup

Run commands from the project root (the directory containing `package.json`):

```bash
npm install
```

Copy `.env.example` to `.env` and add the server-side credentials you want to use:

```env
GEMINI_API_KEY=your_gemini_api_key
MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=smartscaletechforyou@gmail.com
MAIL_PASSWORD=your_google_app_password
MAIL_ENCRYPTION=tls
SMTP_USE_TLS=true
MAIL_FROM=smartscaletechforyou@gmail.com
MAIL_FROM_NAME="Smart Scale Tech"
EMAIL_TO=your_inbox@example.com
```

`GEMINI_API_KEY` enables live chatbot answers. Gmail SMTP delivery requires `MAIL_USERNAME` and a Google App Password in `MAIL_PASSWORD` (not your regular Gmail password); enable 2-Step Verification on the Google account to create an App Password. `MAIL_FROM` should be the authenticated Gmail address. `EMAIL_TO` is optional and defaults to `MAIL_USERNAME`. The optional `VITE_UPI_ID` and `VITE_LEAD_WEBHOOK_URL` settings are documented in `.env.example`. Never commit `.env` or real credentials.

Start the local Express server and Vite app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If email or live chatbot replies are not configured, those integrations may be unavailable; the chatbot includes local fallback answers.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local application server |
| `npm run lint` | Run the TypeScript check |
| `npm test` | Run the Node.js test suite |
| `npm run build` | Build and prerender the production site |
| `npm run preview` | Preview the Vite production build |

## Deployment

The site supports Vercel deployment. Configure `GEMINI_API_KEY` and the Gmail SMTP variables (`MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ENCRYPTION`, `SMTP_USE_TLS`, and `MAIL_FROM`) in the deployment environment; set `EMAIL_TO` and `MAIL_FROM_NAME` as needed. Verify outbound Gmail SMTP connectivity from the deployed function before relying on production email delivery.

## Project structure

- `src/components/home/` — homepage sections
- `src/components/layout/` — shared navigation, footer, and layout elements
- `src/components/chat/` — SmartScale Studio Advisor
- `src/components/services/` — service pages and request forms
- `src/components/tools/` — career tools and package builder
- `src/lib/` — shared utilities and tests
- `api/` — Vercel serverless API handlers and shared email template
- `server.ts` — local Express server and API endpoints
- `public/` — static assets, logo, and hero video

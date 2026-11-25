# Security Summary

## Reviewed Files

- `server.ts` — Backend Express API (`/api/service-request`, `/api/agent/chat`), JSON parsing, HTTP headers, and Gemini SDK integration
- `vite.config.ts` & `.env.example` & `.gitignore` — Build configuration and environment variable boundaries
- `src/lib/leads.ts` — Lead capture, WhatsApp/email formatting, and optional webhook forwarding
- `src/lib/atsScanner.ts` — Client-side resume and job-description text parsing
- `src/lib/analytics.ts` & `src/lib/seo.tsx` — Client event counters and JSON-LD head management
- `src/components/services/LinkedInServiceRequestForm.tsx` — Service proposal request intake form
- `src/components/home/BookingModal.tsx` & `src/components/home/PaymentModal.tsx` — Booking modal and UPI QR payment dialog
- `src/components/tools/ATSCheckerTool.tsx` — Interactive ATS & JD Match scanner and LinkedIn share action
- `src/components/chat/CareerAssistantBot.tsx` — Career advisor chat widget and session storage persistence
- `src/App.tsx` & `vercel.json` & `netlify.toml` — Client routing and deployment response headers

## Secret, Password & Key Leak Check

- **Result**: **No leaked passwords, private keys, or API secrets found.**
- `GEMINI_API_KEY` is accessed exclusively on the server inside `server.ts` and is never referenced or inlined in `vite.config.ts` or client `src/` files.
- `.gitignore` excludes `.env*` files while keeping `.env.example` (empty placeholders only). No `.env` file with real credentials exists in the repository.
- Intentional public business details only (`+91 9000859695`, `smartscaletechforyou@gmail.com`, public business UPI ID configurable via `VITE_UPI_ID`, and the agency's public sample resume image).

## Issues Resolved

| Area | Finding | Fix Applied |
| :--- | :--- | :--- |
| Backend API (`server.ts`) | Unbounded JSON body limit, weak field checks, and raw customer PII (name, phone, email) printed to server logs | Enforced `express.json({ limit: '64kb' })`, added strict string/length/email validation on `/api/service-request` and `/api/agent/chat`, masked phone suffixes in logs, and disabled `x-powered-by` |
| HTTP Response Headers (`server.ts`, `vercel.json`) | Missing baseline browser protection headers on Express responses and Vercel deployment config | Added `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` |
| Browser PII Storage (`src/lib/leads.ts`) | Visitor form submissions (`name`, `phone`, `email`, `linkedInUrl`, `projectBrief`) were written to unencrypted `localStorage` (`smartscaletech_leads_v1`) despite no UI reading it | Removed `localStorage` PII persistence, cleared legacy stored entries on form submit, and restricted `VITE_LEAD_WEBHOOK_URL` to validated `https:` (or localhost) URLs |
| Service & Booking Forms (`LinkedInServiceRequestForm.tsx`, `BookingModal.tsx`) | Blocking `alert()` dialogs and missing whitespace/email format checks | Replaced `alert()` calls with inline `role="alert"` banners, added trimmed field and email format checks, and relied on explicit confirmation links |
| External Window Safety (`ATSCheckerTool.tsx`) | LinkedIn share popup omitted `noopener,noreferrer` and anonymous sample scans triggered lead webhook dispatches | Added `'noopener,noreferrer'` to `window.open` and only dispatched `submitLead` when optional contact info was actually entered |
| Client Input Bounds & Storage Safety (`atsScanner.ts`, `CareerAssistantBot.tsx`, `App.tsx`) | Unbounded pasted text length, unvalidated `sessionStorage` chat array parsing, and missing `key` prop on mapped routes | Capped scanner text to 30,000 chars, enforced `maxLength={1500}` on chat input, validated parsed `sessionStorage` message objects, and added `key={slug}` to route mapping |

## Safeguards Verified

- **Safe React Rendering**: Zero `dangerouslySetInnerHTML`, `eval()`, `new Function()`, or raw `innerHTML` assignments exist across `src/` or `scripts/`.
- **Clean Server-Side AI Proxy**: Gemini API requests run through `/api/agent/chat` on the backend with a 2.5s timeout and safe fallback responses.
- **No Third-Party Account Passwords Requested**: Service pages and workflows never collect LinkedIn, Gmail, or Naukri credentials from clients.
- **Dependency Audit**: `bun audit` checked all 282 packages against `bun.lock` with 0 known vulnerabilities.

## PoC Verification

1. **Oversized or Malformed API Requests (`/api/service-request` & `/api/agent/chat`)**:
   - Submitting non-object JSON, payloads exceeding `64kb`, invalid email strings, or empty `name`/`phone`/`message` fields now returns HTTP `400` with generic validation messages and never crashes the route or dumps raw stack traces or unmasked phone/email strings to logs.
   - Sending `history` entries that are non-objects or overly long text strings safely filters out invalid entries and truncates text to 1,000 characters (`1,500` for `message`).
2. **Browser PII & Storage Hygiene (`src/lib/leads.ts`, `CareerAssistantBot.tsx`)**:
   - Submitting either the Quick Booking modal or the Service Request form no longer writes PII into `localStorage` (`smartscaletech_leads_v1` is actively removed if present from older visits).
   - Malformed JSON or tampered array items in `sessionStorage.getItem('smartscale_bot_messages')` fail structural type validation and cleanly fall back to `INITIAL_MESSAGES`.
3. **Inline Validation & Safe External Tabs (`LinkedInServiceRequestForm.tsx`, `ATSCheckerTool.tsx`)**:
   - Submitting empty or malformed email fields shows an inline `role="alert"` banner instead of calling `window.alert`.
   - Clicking "Share My Score on LinkedIn" opens LinkedIn with `'noopener,noreferrer'`, preventing access to `window.opener`.
4. **Dependency Vulnerability Scan (`bun audit`)**:
   - Executed `bun audit` against the workspace lockfile (`bun.lock`, 282 packages): **No vulnerabilities found**.

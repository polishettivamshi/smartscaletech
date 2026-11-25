import { ArrowRight, Code2, PencilRuler, Rocket, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Breadcrumb } from '../ui/Breadcrumb';
import { StatusBanner } from '../ui/StatusBanner';

export const HowItWorks = () => {
  const timeline = [
    {
      stepNum: '01',
      label: 'Discover',
      Icon: Search,
      timing: 'Day 1 · 10-Min Brief',
      name: 'Scope, Goals & Audit',
      deliverable: 'Clear Project Brief',
      description:
        'Share your existing resume, target role, or business product requirements directly with us via form or WhatsApp.',
    },
    {
      stepNum: '02',
      label: 'Plan & Design',
      Icon: PencilRuler,
      timing: 'Hour 12 · Structure',
      name: 'Wireframe & Keyword Map',
      deliverable: 'Draft Architecture',
      description:
        'Receive a clean structural blueprint, ATS keyword hierarchy, or interactive interface wireframe to confirm direction early.',
    },
    {
      stepNum: '03',
      label: 'Build & Refine',
      Icon: Code2,
      timing: 'Hour 24–36 · Iteration',
      name: 'Development & 1-on-1 Polish',
      deliverable: 'Reviewed Staging Build',
      description:
        'Refine typography, quantified impact bullets, responsiveness, and copy directly together until every section passes review.',
    },
    {
      stepNum: '04',
      label: 'Deliver & Support',
      Icon: Rocket,
      timing: 'Hour 48 · Handover',
      name: 'Final Assets & Live Deploy',
      deliverable: 'Full Source & Files',
      description:
        'Walk away with editable source files (.docx + PDF or GitHub repository), edge deployment, and post-launch handover guidance.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#F3EEE3] py-20 sm:py-24 border-y border-[#D8D3C9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Studio Process"
            title="Four disciplined phases."
            highlight="Zero guesswork."
            description="Whether we are rewriting a technical career profile in 48 hours or engineering a custom business web build, every milestone has a concrete output."
          />

          <div className="shrink-0 self-start lg:self-auto">
            <Link to="/request-service">
              <Button variant="dark" size="lg">
                Start Phase 01 <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Horizontal 4-col on desktop with editorial step line, clean vertical stack on mobile */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {timeline.map((step) => (
            <div
              key={step.stepNum}
              className="flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border border-[#D8D3C9] hover:border-[#111111]/40 transition-colors"
            >
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3EEE3] text-[#D9541E]">
                  <step.Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#D9541E] tabular-nums">
                    {step.stepNum} — {step.label}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#EAE3D5]">
                  <span className="text-[11px] font-medium text-[#57534E] tabular-nums">
                    {step.timing}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#111111] leading-snug">{step.name}</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE3D5] flex items-center justify-between text-xs">
                <span className="text-[#6B6862] font-medium">Deliverable</span>
                <span className="font-bold text-[#111111]">{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PrivacyPolicy = () => {
  return (
    <section id="privacy-policy" className="bg-[#F3EEE3] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
          className="mb-6"
        />
        <div className="bg-white border border-[#D8D3C9] rounded-2xl p-8 sm:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
            Legal &amp; Data Practices
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] pb-8 border-b border-[#EAE3D5]">
            SmartScaleTech respects your privacy when you visit https://smartscaletech.vercel.app
            and use our branding, ATS resume, LinkedIn optimization, final year project, or web
            development services.
          </p>

          <div className="mt-8 space-y-8 text-[#57534E] text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">1. Information We Collect</h2>
              <p>
                When you contact us or request a quote, we may collect your name, email address,
                phone or WhatsApp number, project requirements, professional background, and
                optional portfolio or resume documents shared voluntarily for evaluation.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">2. Client-Side Interactive Tools</h2>
              <p>
                Our free ATS Resume &amp; JD Checker, LinkedIn Headline Generator, and Job Readiness
                Audit evaluate text locally in your browser without requiring account sign-in.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">3. How We Use Information</h2>
              <p>
                We use inquiry information solely to reply to requests, scope projects, deliver
                purchased work, and maintain website stability. We never sell personal data or
                share client resumes with third-party marketers.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">4. Security &amp; Retention</h2>
              <p>
                Submitted documents and inquiry details are handled confidentially using standard
                access controls. You may request deletion of shared files after project completion.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">5. Contact</h2>
              <p>
                For privacy or data removal inquiries, email{' '}
                <a
                  href="mailto:smartscaletechforyou@gmail.com"
                  className="font-semibold text-[#111111] underline underline-offset-4 hover:text-[#D9541E]"
                >
                  smartscaletechforyou@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TermsOfService = () => {
  return (
    <section id="terms-of-service" className="bg-[#F3EEE3] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Terms of Service' }]}
          className="mb-6"
        />
        <div className="bg-white border border-[#D8D3C9] rounded-2xl p-8 sm:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
            Service Terms
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-4">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] pb-8 border-b border-[#EAE3D5]">
            These terms apply to your use of SmartScaleTech at https://smartscaletech.vercel.app
            and services requested through the studio.
          </p>

          <div className="mt-8 space-y-8 text-[#57534E] text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">1. Acceptance of Terms</h2>
              <p>
                By visiting this site or submitting a project request, you agree to these Terms of
                Service. Specific project scope, pricing, and delivery schedules are confirmed in
                writing before paid execution starts.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">2. Services Covered</h2>
              <p>
                SmartScaleTech delivers web development, UI/UX systems, API &amp; AI integrations,
                technical SEO, ATS-aligned resume writing, LinkedIn &amp; Naukri profile branding,
                and academic final year project mentoring. Hiring outcomes remain subject to
                employer decisions and market conditions.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">3. Client Responsibilities</h2>
              <p>
                Clients agree to provide accurate background details, timely feedback during
                revision rounds, and licensed assets or third-party credentials where needed for
                integration projects.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">4. Intellectual Property</h2>
              <p>
                Custom deliverables, websites, source repositories, and documents crafted for your
                project become your property upon agreed settlement. SmartScaleTech retains rights
                to its proprietary site code, tools, and general studio templates.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">5. Limitation of Liability</h2>
              <p>
                SmartScaleTech is not liable for indirect or consequential losses arising from use
                of free browser tools or custom services. Total liability is limited to the fee
                actually paid for the specific service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RefundPolicy = () => {
  return (
    <section id="refund-policy" className="bg-[#F3EEE3] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Refund Policy' }]}
          className="mb-6"
        />
        <div className="bg-white border border-[#D8D3C9] rounded-2xl p-8 sm:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
            Cancellations &amp; Revisions
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] pb-6 border-b border-[#EAE3D5]">
            Clear expectations for deposits, revision rounds, and cancellations on digital career
            and software engineering projects at SmartScaleTech.
          </p>

          <StatusBanner tone="info" title="Standard Studio Terms — Subject to Written Project Scope" className="mt-6">
            Before starting custom engineering or career projects, exact milestones and revision
            terms are confirmed in writing via WhatsApp or email. If your business requires custom
            commercial refund clauses, update this page before live billing.
          </StatusBanner>

          <div className="mt-8 space-y-8 text-[#57534E] text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">1. Before Work Begins</h2>
              <p>
                If you cancel an order in writing before initial drafting, research, or development
                has started, any advance payment is eligible for a full refund minus third-party
                payment transfer fees, if applicable.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">2. Revision-First Commitment</h2>
              <p>
                Because ATS resumes, LinkedIn makeovers, portfolios, and custom code involve dedicated
                manual time, delivered first drafts are covered by included revision rounds rather than
                automatic refunds once drafting has commenced. We refine layouts, phrasing, and UI
                fixes until the agreed scope is met.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">3. Milestone-Based Web &amp; App Builds</h2>
              <p>
                Multi-week website or software projects are scoped by milestone. If a project is paused
                or cancelled mid-way, charges apply only to completed and delivered milestone work; any
                unused balance for unstarted phases is refundable.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#111111] mb-2">4. Requesting Cancellation or Review</h2>
              <p>
                Reach out directly on{' '}
                <a
                  href="mailto:smartscaletechforyou@gmail.com"
                  className="font-semibold text-[#111111] underline underline-offset-4 hover:text-[#D9541E]"
                >
                  smartscaletechforyou@gmail.com
                </a>{' '}
                or WhatsApp (+91 90008 59695) with your booking name and payment reference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

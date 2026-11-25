/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { TrustGuaranteeBanner } from './components/home/TrustGuaranteeBanner';
import { WhoWeHelpSection } from './components/home/WhoWeHelpSection';
import { Services } from './components/home/Services';
import { SelectedWorkSection } from './components/home/SelectedWorkSection';
import { ResumeComparison } from './components/home/ResumeComparison';
import { FreeToolsSection } from './components/home/FreeToolsSection';
import { HowItWorks, PrivacyPolicy, TermsOfService, RefundPolicy } from './components/home/HomeSections';
import { Pricing } from './components/home/Pricing';
import { FAQ } from './components/home/FAQ';
import { CTASection } from './components/home/CTASection';
import { Footer } from './components/layout/Footer';
import { NotFound } from './components/layout/NotFound';
import { FloatingActions } from './components/home/FloatingActions';
import { SampleShowcaseModal } from './components/home/SampleShowcaseModal';
import { FreeATSCheckerPage } from './components/tools/FreeATSCheckerPage';
import { LinkedInHeadlineGeneratorPage } from './components/tools/LinkedInHeadlineGeneratorPage';
import { JobReadinessAuditPage } from './components/tools/JobReadinessAuditPage';
import { CustomPackageBuilderPage } from './components/tools/CustomPackageBuilderPage';
import { FinalYearProjectsPage } from './components/services/FinalYearProjectsPage';
import { LinkedInServiceRequestPage } from './components/services/LinkedInServiceRequestPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { CaseStudyPage } from './components/pages/CaseStudyPage';
import { AboutPage } from './components/pages/AboutPage';
import { ToolsDirectoryPage } from './components/pages/ToolsDirectoryPage';
import { SEO } from './lib/seo';
import { serviceRoutes } from './data/serviceRoutes';
import { CareerAssistantBot } from './components/chat/CareerAssistantBot';
import { LinkedInServiceRequestForm } from './components/services/LinkedInServiceRequestForm';

// Lazy-loaded so service page data stays out of the initial homepage bundle.
const ServicePage = lazy(() =>
  import('./components/services/ServicePage').then((m) => ({ default: m.ServicePage }))
);

const CanonicalServiceRoute = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  return <ServicePage slug={slug} />;
};

/** Restores homepage metadata when navigating back and honours #hash scrolling. */
const RouteEffects = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  if (pathname === '/') {
    return (
      <SEO
        title="Smart Scale Tech (SST) | SmartScaleTech - Digital Engineering & Career Studio Hyderabad"
        description="Smart Scale Tech (SST / SmartScaleTech) is an independent digital technology and career solutions studio in Hitech City, Hyderabad building custom websites, web apps, UI/UX, AI integrations, ATS resumes, LinkedIn optimization & final year projects."
        keywords="sst, sst smart scale tech, sst hyderabad, smart scale tech, smart scale tech official website, smartscaletech, smart scale tech hyderabad, free ats resume checker, ats resume writing hyderabad, linkedin profile optimization hyderabad, web development hyderabad, portfolio website hyderabad, final year projects hyderabad"
        path="/"
      />
    );
  }

  if (pathname === '/privacy-policy') {
    return (
      <SEO
        title="Privacy Policy | Smart Scale Tech (SST)"
        description="How Smart Scale Tech (SST / SmartScaleTech) collects, uses and protects your information when you use our resume, LinkedIn and web development services."
        keywords="sst privacy policy, smart scale tech privacy policy, smartscaletech confidential resume writing"
        path="/privacy-policy"
      />
    );
  }

  if (pathname === '/terms-of-service') {
    return (
      <SEO
        title="Terms of Service | Smart Scale Tech (SST)"
        description="The terms that apply to your use of Smart Scale Tech (SST / SmartScaleTech) and any resume writing, optimization or web development services requested through this site."
        keywords="sst terms of service, smart scale tech terms, smartscaletech hyderabad terms"
        path="/terms-of-service"
      />
    );
  }

  if (pathname === '/refund-policy') {
    return (
      <SEO
        title="Refund & Cancellation Policy | Smart Scale Tech (SST)"
        description="Cancellation, revision-first guarantee, and milestone refund policy for Smart Scale Tech (SST / SmartScaleTech) services."
        keywords="sst refund policy, smart scale tech cancellation policy, smartscaletech revisions"
        path="/refund-policy"
      />
    );
  }

  if (pathname === '/request-service' || pathname === '/linkedin-service-request') {
    return (
      <SEO
        title="Request Services | Smart Scale Tech (SST) Hyderabad"
        description="Submit your service request to Smart Scale Tech (SST) for ATS resume writing, LinkedIn profile optimization, final year projects, or web development via WhatsApp (+91 90008 59695)."
        keywords="sst request service, smart scale tech contact, book ats resume hyderabad, smartscaletech proposal, linkedin optimization booking hyderabad"
        path="/request-service"
      />
    );
  }

  return null;
};

function HomePage() {
  const [isSamplesOpen, setIsSamplesOpen] = useState(false);

  return (
    <main className="bg-page text-page transition-all duration-300">
      <Hero onOpenSamples={() => setIsSamplesOpen(true)} />
      <TrustGuaranteeBanner onOpenSamples={() => setIsSamplesOpen(true)} />
      <WhoWeHelpSection />
      <Services />
      <SelectedWorkSection />
      <ResumeComparison />
      <HowItWorks />
      <FreeToolsSection />
      <Pricing />
      <FAQ />
      <section id="project-inquiry" className="bg-[#F3EEE3] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
              Free Scope Consultation
            </p>
            <h2 className="text-section-display font-extrabold text-[#111111]">
              Tell us what you need.
            </h2>
            <p className="mt-3 text-base text-[#57534E] leading-relaxed">
              Share your project or career goals and we’ll email your brief to our studio. You can
              also choose to open WhatsApp after submitting.
            </p>
          </div>
          <LinkedInServiceRequestForm sourcePage="/" isCompact />
        </div>
      </section>
      <CTASection />

      <SampleShowcaseModal
        isOpen={isSamplesOpen}
        onClose={() => setIsSamplesOpen(false)}
      />
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-page flex flex-col">
        <Navbar />
        <RouteEffects />
        <div id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<ProjectsPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/tools" element={<ToolsDirectoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/free-ats-resume-checker" element={<FreeATSCheckerPage />} />
            <Route path="/ats-checker" element={<Navigate to="/free-ats-resume-checker" replace />} />
            <Route path="/linkedin-headline-generator" element={<LinkedInHeadlineGeneratorPage />} />
            <Route path="/job-readiness-audit" element={<JobReadinessAuditPage />} />
            <Route path="/custom-package-builder" element={<CustomPackageBuilderPage />} />
            <Route path="/final-year-projects" element={<FinalYearProjectsPage />} />
            <Route path="/request-service" element={<LinkedInServiceRequestPage />} />
            <Route path="/linkedin-service-request" element={<LinkedInServiceRequestPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route
              path="/services/:slug"
              element={
                <Suspense fallback={<div className="min-h-[60vh]" />}>
                  <CanonicalServiceRoute />
                </Suspense>
              }
            />
            {serviceRoutes.map((slug) => (
              <Fragment key={slug}>
                <Route
                  path={`/${slug}`}
                  element={
                    <Suspense fallback={<div className="min-h-[60vh]" />}>
                      <ServicePage slug={slug} />
                    </Suspense>
                  }
                />
              </Fragment>
            ))}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <FloatingActions />
        <CareerAssistantBot />
      </div>
    </Router>
  );
}

export default App;

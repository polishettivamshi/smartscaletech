/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { FreeResumeAuditBanner } from './components/layout/FreeResumeAuditBanner';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { ResumeComparison } from './components/home/ResumeComparison';
import { FreeToolsSection } from './components/home/FreeToolsSection';
import { FounderSection } from './components/home/FounderSection';
import { FreeATSCheckerPage } from './components/tools/FreeATSCheckerPage';
import { LinkedInHeadlineGeneratorPage } from './components/tools/LinkedInHeadlineGeneratorPage';
import { JobReadinessAuditPage } from './components/tools/JobReadinessAuditPage';
import { CustomPackageBuilderPage } from './components/tools/CustomPackageBuilderPage';
import { HowItWorks, PrivacyPolicy, TermsOfService } from './components/home/HomeSections';
import { Pricing } from './components/home/Pricing';
import { FAQ } from './components/home/FAQ';
import { CTASection } from './components/home/CTASection';
import { Footer } from './components/layout/Footer';
import { NotFound } from './components/layout/NotFound';
import { FloatingActions } from './components/home/FloatingActions';
import { SEO } from './lib/seo';
import { serviceRoutes } from './data/serviceRoutes';
import { CareerAssistantBot } from './components/chat/CareerAssistantBot';
import { LinkedInServiceRequestPage } from './components/services/LinkedInServiceRequestPage';
import { TrustGuaranteeBanner } from './components/home/TrustGuaranteeBanner';
import { SampleShowcaseModal } from './components/home/SampleShowcaseModal';
import { VerifiedBenchmarksSection } from './components/home/VerifiedBenchmarksSection';
import { FinalYearProjectsPage } from './components/services/FinalYearProjectsPage';

// Lazy-loaded so each service page's content stays out of the homepage bundle.
const ServicePage = lazy(() =>
  import('./components/services/ServicePage').then((m) => ({ default: m.ServicePage }))
);

/** Restores the homepage title/meta after visiting a service page, and
 *  honours #hash links instead of resetting scroll to the top. */
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
        title="Smart Scale Tech (SST) | SmartScaleTech - ATS Resume & Web Development Hyderabad"
        description="Smart Scale Tech (SST / SmartScaleTech) is the official website for ATS resume writing, free ATS checker, LinkedIn optimization, final year projects & web development in Hitech City, Hyderabad."
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

  return null;
};

function HomePage() {
  const [isSamplesOpen, setIsSamplesOpen] = useState(false);

  return (
    <main className="bg-page text-page transition-all duration-300">
      <Hero onOpenSamples={() => setIsSamplesOpen(true)} />
      <TrustGuaranteeBanner onOpenSamples={() => setIsSamplesOpen(true)} />
      <Services />
      <ResumeComparison />
      <FreeToolsSection />
      <HowItWorks />
      <FounderSection />
      <VerifiedBenchmarksSection onOpenSamples={() => setIsSamplesOpen(true)} />
      <Pricing />
      <FAQ />
      <CTASection />

      {/* Modals */}
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
        <FreeResumeAuditBanner />
        <Navbar />
        <RouteEffects />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route path="/404" element={<NotFound />} />
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

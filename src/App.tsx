/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { ResumeComparison } from './components/home/ResumeComparison';
import { FounderSection } from './components/home/FounderSection';
import { TrustedBy } from './components/home/TrustedBy';
import { Testimonials } from './components/home/Testimonials';
import { WhyJoin, HowItWorks, PrivacyPolicy, TermsOfService } from './components/home/HomeSections';
import { Pricing } from './components/home/Pricing';
import { FAQ } from './components/home/FAQ';
import { CTASection } from './components/home/CTASection';
import { Footer } from './components/layout/Footer';
import { NotFound } from './components/layout/NotFound';
import { FloatingActions } from './components/home/FloatingActions';
import { SEO } from './lib/seo';
import { serviceRoutes } from './data/serviceRoutes';

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
        title="SmartScaleTech | Resume Writing & Web Development, Hyderabad"
        description="Hitech City, Hyderabad based agency for ATS resume writing, LinkedIn optimization, and custom web development across India."
        path="/"
      />
    );
  }

  if (pathname === '/privacy-policy') {
    return (
      <SEO
        title="Privacy Policy | SmartScaleTech"
        description="How SmartScaleTech collects, uses and protects your information when you use our resume, LinkedIn and web development services."
        path="/privacy-policy"
      />
    );
  }

  if (pathname === '/terms-of-service') {
    return (
      <SEO
        title="Terms of Service | SmartScaleTech"
        description="The terms that apply to your use of SmartScaleTech and any resume writing, optimization or web development services requested through this site."
        path="/terms-of-service"
      />
    );
  }

  return null;
};

function HomePage() {
  return (
    <main className="bg-page text-page transition-all duration-300">
      <Hero />
      <TrustedBy />
      <Services />
      <ResumeComparison />
      <HowItWorks />
      <Testimonials />
      <FounderSection />
      <WhyJoin />
      <Pricing />
      <FAQ />
      <CTASection />
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-page">
        <Navbar />
        <RouteEffects />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/404" element={<NotFound />} />
          {serviceRoutes.map((slug) => (
            <Route
              path={`/${slug}`}
              element={
                <Suspense fallback={<div className="min-h-[60vh]" />}>
                  <ServicePage slug={slug} />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;

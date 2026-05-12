/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { TrustedBy } from './components/home/TrustedBy';
import { Testimonials } from './components/home/Testimonials';
import { WhyJoin, HowItWorks } from './components/home/HomeSections';
import { Pricing } from './components/home/Pricing';
import { FAQ } from './components/home/FAQ';
import { CTASection } from './components/home/CTASection';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/home/FloatingActions';

function HomePage() {
  return (
    <main className="bg-page text-page transition-all duration-300">
      <Hero />
      <TrustedBy />
      <Services />
      <HowItWorks />
      <Testimonials />
      <WhyJoin />
      <Pricing />
      <FAQ />
      <CTASection />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-page">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
}

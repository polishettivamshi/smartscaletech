import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBundleTotals,
  SERVICE_CATALOG,
  BUNDLE_ADDONS,
} from '../../data/bundleCatalog';
import {
  scanResumeText,
  scanResumeVsJD,
  extractJDKeywords,
} from '../atsScanner';
import {
  ALL_STRUCTURED_SERVICES,
  resolveServiceEntry,
} from '../../data/serviceCatalog';
import { formatServiceRequestText } from '../leads';

describe('calculateBundleTotals', () => {
  it('uses the startup offer prices for every core service and add-on', () => {
    assert.deepEqual(
      SERVICE_CATALOG.map(({ standardPrice, price }) => [standardPrice, price]),
      [
        [299, 239], [399, 319], [299, 239], [399, 319], [199, 159],
        [599, 479], [499, 399], [2999, 2399], [4999, 3999], [9999, 7999],
        [3999, 3199], [4999, 3999], [3999, 3199], [7999, 6399],
        [2999, 2399], [1999, 1599], [2999, 2399], [2499, 1999],
      ]
    );
    assert.deepEqual(
      BUNDLE_ADDONS.map(({ standardPrice, price }) => [standardPrice, price]),
      [[499, 399], [199, 159], [499, 399]]
    );
  });

  it('returns zero totals when no services or addons are selected', () => {
    const result = calculateBundleTotals([]);
    assert.equal(result.selectedServices.length, 0);
    assert.equal(result.standardSubtotal, 0);
    assert.equal(result.subtotal, 0);
    assert.equal(result.standardAddonsTotal, 0);
    assert.equal(result.discountRate, 0);
    assert.equal(result.discountAmount, 0);
    assert.equal(result.totalSavings, 0);
    assert.equal(result.addonsTotal, 0);
    assert.equal(result.finalTotal, 0);
  });

  it('applies 0% discount for 1 selected service', () => {
    const ats = SERVICE_CATALOG.find((s) => s.id === 'ats-resume')!;
    const result = calculateBundleTotals(['ats-resume']);
    assert.equal(result.selectedServices.length, 1);
    assert.equal(result.subtotal, ats.price);
    assert.equal(result.discountRate, 0);
    assert.equal(result.discountAmount, 0);
    assert.equal(result.finalTotal, ats.price);
  });

  it('applies 10% discount for 2 distinct selected services and deduplicates repeated IDs', () => {
    const result = calculateBundleTotals(['ats-resume', 'linkedin-opt', 'ats-resume']);
    assert.equal(result.selectedServices.length, 2);
    const expectedSubtotal = 239 + 319;
    const expectedDiscount = Math.round(expectedSubtotal * 0.1);
    assert.equal(result.subtotal, expectedSubtotal);
    assert.equal(result.discountRate, 0.1);
    assert.equal(result.discountAmount, expectedDiscount);
    assert.equal(result.finalTotal, expectedSubtotal - expectedDiscount);
    assert.equal(result.standardSubtotal, 299 + 399);
    assert.equal(result.totalSavings, 299 + 399 - result.finalTotal);
  });

  it('applies 15% discount for 3 to 4 services', () => {
    const result = calculateBundleTotals(['ats-resume', 'linkedin-opt', 'naukri-indeed']);
    assert.equal(result.selectedServices.length, 3);
    assert.equal(result.discountRate, 0.15);
    const expectedSubtotal = 239 + 319 + 239;
    const expectedDiscount = Math.round(expectedSubtotal * 0.15);
    assert.equal(result.subtotal, expectedSubtotal);
    assert.equal(result.discountAmount, expectedDiscount);
    assert.equal(result.finalTotal, expectedSubtotal - expectedDiscount);
  });

  it('applies 20% discount for 5+ services and adds add-ons after discount', () => {
    const ids = ['ats-resume', 'linkedin-opt', 'naukri-indeed', 'github-audit', 'cover-letter'];
    const addon = BUNDLE_ADDONS[0];
    const result = calculateBundleTotals(ids, [addon.id, addon.id]);
    assert.equal(result.selectedServices.length, 5);
    assert.equal(result.discountRate, 0.2);
    const expectedSubtotal = 239 + 319 + 239 + 319 + 159;
    const expectedDiscount = Math.round(expectedSubtotal * 0.2);
    assert.equal(result.addonsTotal, addon.price);
    assert.equal(result.finalTotal, expectedSubtotal - expectedDiscount + addon.price);
    assert.equal(result.totalSavings, 299 + 399 + 299 + 399 + 199 + addon.standardPrice - result.finalTotal);
  });
});

describe('ATS scanner heuristics', () => {
  it('scores a comprehensive MERN full-stack resume well with matched keywords and metrics', () => {
    const strongResume = `
      Vamshi Engineer | vamshi@example.com | https://linkedin.com/in/vamshi | https://github.com/vamshi
      Summary
      Full-Stack Software Engineer with 3+ years building React, TypeScript, Node.js, and PostgreSQL web applications.
      Skills
      React, Node.js, TypeScript, JavaScript, REST API, Express, MongoDB, PostgreSQL, Redux, Git, Docker, AWS, Tailwind, Microservices, GraphQL
      Experience
      Architected a React and TypeScript dashboard that reduced page load latency by 45% for 20k+ active users.
      Engineered REST API microservices with Node.js, Express, MongoDB, and PostgreSQL, automated CI/CD via Docker and AWS, and delivered 99.9% uptime.
      Optimized SQL queries and GraphQL endpoints, increasing throughput by 3x across 12+ enterprise clients.
      Projects
      Built a scalable e-commerce analytics tool using React, Redux, Tailwind, and Node.js.
      Education
      B.Tech in Computer Science and Engineering, Hyderabad.
      Additional details covering agile delivery, unit testing, cloud security, API rate limiting, schema modeling, and cross-functional engineering mentorship across distributed product teams in India to satisfy comprehensive single-page context depth and recruiter review standards across all technical disciplines.
      Further engineering impact included implementing Redis caching layers, orchestrating containerized staging environments, writing reusable UI primitives, mentoring junior contributors on pull request hygiene, and maintaining zero-downtime deployment checklists across backend and frontend repositories.
    `;

    const result = scanResumeText(strongResume, 'Full-Stack Developer (MERN / MEAN)');
    assert.equal(result.mode, 'role');
    assert.ok(result.score >= 85, `Expected strong score >= 85, got ${result.score}`);
    assert.equal(result.grade, 'A+ (Interview Ready)');
    assert.equal(result.hasContactSignals, true);
    assert.equal(result.missingSections.length, 0);
    assert.ok(result.matchedKeywords.includes('React'));
    assert.ok(result.matchedKeywords.includes('TypeScript'));
  });

  it('flags missing sections, low word count, and missing metrics on minimal resume text', () => {
    const weakResume = 'Student looking for a software job. Knows basic coding.';
    const result = scanResumeText(weakResume, 'Full-Stack Developer (MERN / MEAN)');
    assert.ok(result.score < 55, `Expected low score < 55, got ${result.score}`);
    assert.ok(result.risks.length >= 3);
    assert.ok(result.missingSections.length >= 3);
    assert.equal(result.hasContactSignals, false);
  });

  it('extracts React, TypeScript, and Docker from JD and scores resume against JD', () => {
    const jd = `
      We are hiring a Frontend & Platform Engineer in Hyderabad.
      Requirements: Strong experience with React, TypeScript, Docker, Node.js, REST API, and Git.
    `;
    const keywords = extractJDKeywords(jd);
    assert.ok(keywords.includes('React'));
    assert.ok(keywords.includes('TypeScript'));
    assert.ok(keywords.includes('Docker'));

    const candidateResume = `
      Summary
      Frontend Developer | dev@example.com | linkedin.com/in/dev
      Skills
      React, TypeScript, Git
      Experience
      Built responsive UI components in React and TypeScript, reducing bundle size by 30%.
      Education
      B.Tech Computer Science
    `;
    const jdMatch = scanResumeVsJD(candidateResume, jd);
    assert.equal(jdMatch.mode, 'jd');
    assert.ok(jdMatch.matchedKeywords.includes('React'));
    assert.ok(jdMatch.matchedKeywords.includes('TypeScript'));
    assert.ok(jdMatch.missingKeywords.includes('Docker'));
  });
});

describe('serviceCatalog integrity', () => {
  it('contains 19 distinct services with unique preview images and valid related slugs', () => {
    const entries = Object.values(ALL_STRUCTURED_SERVICES);
    assert.equal(entries.length, 19);

    const images = new Set(entries.map((e) => e.previewImage));
    assert.equal(images.size, 19, 'Expected every service to have its own unique preview visual');

    for (const entry of entries) {
      for (const rel of entry.relatedSlugs) {
        assert.ok(resolveServiceEntry(rel), `Missing related service entry for slug: ${rel}`);
      }
    }

    assert.equal(resolveServiceEntry('naukri-optimization')?.name, 'Naukri Profile Optimization');
    assert.equal(resolveServiceEntry('indeed-optimization')?.name, 'Indeed Profile Optimization');
    assert.equal(resolveServiceEntry('interview-coaching')?.name, '1-on-1 Interview Coaching');
    assert.equal(resolveServiceEntry('github-audit')?.name, 'GitHub & Portfolio Audit');
    assert.equal(resolveServiceEntry('web-application-development')?.slug, 'web-development');
    assert.equal(resolveServiceEntry('third-party-api-integration')?.slug, 'api-development');
  });
});

describe('formatServiceRequestText', () => {
  it('formats lead details with service, client name, email, and WhatsApp/Phone', () => {
    const output = formatServiceRequestText(
      {
        name: 'Ananya Rao',
        phone: '+91 98765 43210',
        email: 'ananya@example.com',
        service: 'Custom Website Development',
        timeline: '5–10 Working Days',
        budget: '₹6,000 Bundle',
        projectBrief: 'Need a fast React site for our clinic.',
        sourcePage: '/services/web-development',
      },
      '2026-11-24T10:00:00.000Z'
    );

    assert.match(output, /Custom Website Development/);
    assert.match(output, /Ananya Rao/);
    assert.match(output, /ananya@example\.com/);
    assert.match(output, /\+91 98765 43210/);
    assert.match(output, /Need a fast React site for our clinic\./);
  });
});

import React from 'react';
import { SEO } from '../../lib/seo';
import { ProgressTracker } from './ProgressTracker';

export const DashboardPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-50/50 py-6 sm:py-10">
      <SEO
        title="Candidate Career Progress Dashboard | SmartScaleTech"
        description="Track your resume ATS score improvements, recruiter search visibility, and interview callbacks over time with SmartScaleTech Hyderabad."
        path="/dashboard"
      />
      <ProgressTracker />
    </main>
  );
};

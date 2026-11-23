import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Code2,
  Brain,
  Cloud,
  Database,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  FileText,
  Presentation,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { SEO } from '../../lib/seo';
import { Button } from '../ui/Button';

type ProjectDomain = 'all' | 'ai-ml' | 'mern' | 'cloud-devops' | 'data';

interface ProjectBlueprint {
  id: string;
  title: string;
  domain: Exclude<ProjectDomain, 'all'>;
  domainLabel: string;
  degreeFit: string;
  stack: string[];
  summary: string;
  highlights: string[];
}

const DOMAIN_FILTERS: { id: ProjectDomain; label: string }[] = [
  { id: 'all', label: 'All Projects (8)' },
  { id: 'ai-ml', label: 'AI & Machine Learning' },
  { id: 'mern', label: 'Full-Stack MERN / Web' },
  { id: 'cloud-devops', label: 'Cloud & DevOps' },
  { id: 'data', label: 'Data Analytics & Python' },
];

const PROJECT_CATALOG: ProjectBlueprint[] = [
  {
    id: 'ai-resume-screener',
    title: 'AI-Powered Resume Screening & Skill Gap Analyzer',
    domain: 'ai-ml',
    domainLabel: 'AI / NLP',
    degreeFit: 'B.Tech CSE · AI&ML · MCA',
    stack: ['Python', 'FastAPI / Flask', 'NLP / TF-IDF', 'React'],
    summary:
      'Automated candidate-to-JD ranking engine using NLP keyword extraction, cosine similarity scoring, and recruiter feedback reports.',
    highlights: ['Live web dashboard', 'IEEE-aligned paper structure', 'Visual score analytics'],
  },
  {
    id: 'medical-disease-pred',
    title: 'Multi-Disease Early Risk Prediction Portal',
    domain: 'ai-ml',
    domainLabel: 'Machine Learning',
    degreeFit: 'B.Tech · M.Tech · Data Science',
    stack: ['Scikit-Learn', 'XGBoost', 'Streamlit / React', 'SQLite'],
    summary:
      'Ensemble ML pipeline predicting diabetes, heart, and kidney risk metrics with SHAP feature explainability for clinical viva demos.',
    highlights: ['Trained model artifacts', 'Confusion matrix metrics', 'REST API inference'],
  },
  {
    id: 'smart-lms-mern',
    title: 'Full-Stack Campus Placement & Coding Portal',
    domain: 'mern',
    domainLabel: 'MERN Stack',
    degreeFit: 'B.Tech · MCA · BCA',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    summary:
      'Multi-role campus placement tracker with student resume uploads, company eligibility filtering, and admin interview scheduling.',
    highlights: ['Role-based authentication', 'REST API docs', 'Responsive admin dashboard'],
  },
  {
    id: 'telehealth-booking',
    title: 'Real-Time Telehealth Consultation & Pharmacy App',
    domain: 'mern',
    domainLabel: 'Full-Stack Web',
    degreeFit: 'B.Tech CSE · IT · MCA',
    stack: ['TypeScript', 'React', 'Express', 'PostgreSQL / Mongo'],
    summary:
      'End-to-end appointment scheduling platform with doctor availability slots, digital prescriptions, and automated reminders.',
    highlights: ['ER & DFD diagrams ready', 'Clean modular codebase', 'Cloud demo hosted'],
  },
  {
    id: 'cicd-docker-k8s',
    title: 'Zero-Downtime Microservices CI/CD Pipeline on Cloud',
    domain: 'cloud-devops',
    domainLabel: 'Cloud & DevOps',
    degreeFit: 'B.Tech · M.Tech Cloud',
    stack: ['Docker', 'GitHub Actions', 'Nginx', 'AWS / Cloud Run'],
    summary:
      'Automated build, container vulnerability scan, and blue-green cloud deployment architecture with health monitoring endpoints.',
    highlights: ['Live CI/CD workflow', 'Architecture blueprint', 'Prometheus-style metrics'],
  },
  {
    id: 'serverless-invoice',
    title: 'Serverless Expense & GST Invoice Processing Engine',
    domain: 'cloud-devops',
    domainLabel: 'Cloud Architecture',
    degreeFit: 'B.Tech CSE · Cloud Computing',
    stack: ['Node.js', 'Cloud Functions', 'Cloud Storage', 'React'],
    summary:
      'Event-driven serverless pipeline parsing uploaded receipts, generating GST-compliant PDFs, and storing audit trails.',
    highlights: ['Scalable serverless flow', 'Low-latency API', 'Full deployment guide'],
  },
  {
    id: 'ecommerce-churn',
    title: 'Customer Churn & Revenue Cohort Analytics Dashboard',
    domain: 'data',
    domainLabel: 'Data Analytics',
    degreeFit: 'B.Tech · MBA Analytics · MCA',
    stack: ['Python', 'Pandas', 'SQL', 'Interactive Charts'],
    summary:
      'RFM segmentation and churn prediction platform visualizing customer retention KPIs and seasonal sales forecasts.',
    highlights: ['Interactive KPI filters', 'Clean CSV pipeline', 'Executive summary report'],
  },
  {
    id: 'fraud-detection',
    title: 'Real-Time UPI & Credit Card Anomaly Detection System',
    domain: 'data',
    domainLabel: 'Data Science',
    degreeFit: 'B.Tech AI&DS · M.Tech',
    stack: ['Python', 'Isolation Forest', 'FastAPI', 'React'],
    summary:
      'Transaction risk scoring engine flagging velocity anomalies and unusual spending patterns with explainable alert logs.',
    highlights: ['SMOTE class balancing', 'Simulated live feed', 'ROC-AUC comparison'],
  },
];

const PACKAGE_INCLUSIONS = [
  {
    icon: Code2,
    title: '100% Working Source Code',
    desc: 'Clean, modular, well-commented code pushed to your GitHub with environment setup scripts.',
  },
  {
    icon: FileText,
    title: 'University Project Report & Diagrams',
    desc: 'IEEE / university-formatted synopsis, system architecture, UML, ER, and DFD documentation.',
  },
  {
    icon: Presentation,
    title: 'Review PPTs & Cloud Demo Link',
    desc: 'Ready-to-present Review 1, Review 2 & Final Viva slide decks plus a live deployed URL.',
  },
  {
    icon: Terminal,
    title: '1-on-1 Code Walkthrough & Viva Prep',
    desc: 'Direct session with Founder Vamshi so you can explain every file, API, and model in your viva.',
  },
];

export const FinalYearProjectsPage = () => {
  const [activeDomain, setActiveDomain] = useState<ProjectDomain>('all');

  const filteredProjects =
    activeDomain === 'all'
      ? PROJECT_CATALOG
      : PROJECT_CATALOG.filter((p) => p.domain === activeDomain);

  return (
    <main className="bg-white min-h-screen">
      <SEO
        title="Final Year Projects Hyderabad (B.Tech, M.Tech, MCA) | Smart Scale Tech (SST)"
        description="End-to-end B.Tech, M.Tech & MCA final year projects in Hitech City, Hyderabad by Smart Scale Tech (SST) across AI/ML, MERN Full-Stack, Cloud DevOps & Data Science with source code, report, PPT & viva prep."
        keywords="final year projects hyderabad, btech final year projects hitech city, mca mtech ieee projects hyderabad, ai ml mern final year project center hyderabad, sst final year projects, smart scale tech final year projects"
        path="/final-year-projects"
      />

      {/* Hero Header */}
      <section className="bg-linear-to-b from-indigo-50/70 via-white to-white pt-14 pb-16 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-primary">
                <GraduationCap size={16} />
                <span>Hitech City, Hyderabad · B.Tech, M.Tech, MCA &amp; BCA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Final Year Projects Built for Real Viva &amp; Resume Value
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Stop buying broken copy-paste zip files. Get a clean, working project you genuinely understand—complete with source code, university documentation, PPT decks, live cloud hosting, and 1-on-1 viva training starting at <strong className="text-slate-900">₹2,999</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20need%20a%20Final%20Year%20Project%20synopsis%20and%20demo%20list."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 whitespace-nowrap">
                    <MessageCircle size={17} className="mr-2" /> Get Synopsis List on WhatsApp
                  </Button>
                </a>
                <Link to="/custom-package-builder">
                  <Button
                    variant="outline"
                    className="h-12 px-6 rounded-xl border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 whitespace-nowrap"
                  >
                    Add ATS Resume (+Bundle Discount) <ArrowRight size={15} className="ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
                <img
                  src="/assets/aistudio/Final_Year_Projects__Ideas_in_Code_c262fb23.webp"
                  alt="Final Year Projects Architecture and Code Development by SmartScaleTech"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included in ₹2,999 */}
      <section className="py-16 bg-slate-50/70 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                All-Inclusive Package · ₹2,999
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Everything You Need From Synopsis to Final Viva
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck size={16} /> 100% Working Execution Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGE_INCLUSIONS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <item.icon size={21} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable Project Catalog */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Explore Project Ideas by Domain
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose a ready blueprint or share your own IEEE base paper—we customize it end-to-end.
              </p>
            </div>

            {/* Domain Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
              {DOMAIN_FILTERS.map((filter) => {
                const isActive = activeDomain === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveDomain(filter.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const IconComp =
                project.domain === 'ai-ml'
                  ? Brain
                  : project.domain === 'cloud-devops'
                  ? Cloud
                  : project.domain === 'data'
                  ? Database
                  : Code2;

              return (
                <div
                  key={project.id}
                  className="p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-primary/40 hover:shadow-xl transition-all flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <IconComp size={20} />
                        </div>
                        <div className="text-xs text-slate-500">
                          <span className="font-bold text-primary">{project.domainLabel}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{project.degreeFit}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{project.summary}</p>

                    <div className="text-xs font-semibold text-slate-700 mb-4">
                      Stack: <span className="text-slate-500 font-medium">{project.stack.join(' · ')}</span>
                    </div>

                    <div className="space-y-1.5">
                      {project.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-lg font-black text-slate-900 tabular-nums">₹2,999</span>
                      <span className="text-xs text-slate-500 ml-1.5">Complete Package</span>
                    </div>

                    <a
                      href={`https://wa.me/919000859695?text=${encodeURIComponent(
                        `Hello SmartScaleTech, I want the synopsis & demo details for Final Year Project: "${project.title}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      <MessageCircle size={14} /> Request Synopsis &amp; Demo
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

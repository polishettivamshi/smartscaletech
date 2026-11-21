import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  FileText,
  Linkedin,
  Rocket,
  Briefcase,
  GraduationCap,
  Users,
  ArrowRight,
  Code,
  Brain,
  Target,
  Search,
  Palette,
  Megaphone,
  Globe,
  Layout,
  Github,
  Eye,
  X,
  CheckCircle2,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import {
  getServiceVisualByTitle,
  ServiceVisual,
} from '../../data/serviceTransformations';
import { Button } from '../ui/Button';

interface ServiceItem {
  title: string;
  desc: string;
  icon: ReactNode;
  link?: string;
}

interface ServiceGroup {
  category: string;
  icon: ReactNode;
  items: ServiceItem[];
}

const services: ServiceGroup[] = [
  {
    category: "SmartScaleTech Career Branding Accelerator",
    icon: <Briefcase className="text-primary" />,
    items: [
      {
        title: "ATS Resume Writing",
        desc: "Technically engineered single-page resumes designed to rank #1 in Applicant Tracking Systems.",
        icon: <FileText size={20} className="text-indigo-600" />,
        link: "/ats-resume-writing-hyderabad"
      },
      {
        title: "LinkedIn Optimization",
        desc: "Strategic keyword placement and headline optimization to 10x your recruiter impressions.",
        icon: <Linkedin size={20} className="text-blue-600" />,
        link: "/linkedin-profile-optimization-hyderabad"
      },
      {
        title: "Naukri Profile Optimization",
        desc: "Expert profile enhancement for India's largest job portal with keyword optimization and visibility boost.",
        icon: <Users size={20} className="text-orange-600" />
      },
      {
        title: "Indeed Profile Optimization",
        desc: "Global Indeed profile optimization to get discovered by international recruiters and employers.",
        icon: <Globe size={20} className="text-emerald-600" />
      },
      {
        title: "Interview Coaching",
        desc: "One-on-one sessions with industry HRs to master coding and behavioral rounds.",
        icon: <Target size={20} className="text-emerald-600" />
      },
      {
        title: "Github & Portfolio Audit",
        desc: "Complete review of your technical presence to ensure you stand out to top-tier tech companies.",
        icon: <Github size={20} className="text-slate-900" />
      },
      {
        title: "Cover Letter Mastery",
        desc: "Compelling cover letters tailored to each role that complement your resume and captivate hiring managers.",
        icon: <FileText size={20} className="text-rose-600" />
      },
      {
        title: "Salary Negotiation Tips",
        desc: "Expert guidance on negotiating salary tips, benefits, and equity packages to maximize your earnings.",
        icon: <Rocket size={20} className="text-yellow-600" />
      }
    ],
  },
  {
    category: "SmartScaleTech Premium Tech & Design",
    icon: <Code className="text-accent" />,
    items: [
      {
        title: "Final Year Projects",
        desc: "Complete end-to-end development of academic projects with scalable architecture and documentation.",
        icon: <GraduationCap size={20} className="text-cyan-600" />,
        link: "/final-year-projects-hyderabad"
      },
      {
        title: "Personal Portfolios",
        desc: "Recruiter-ready portfolios with smooth animations to showcase your coding projects.",
        icon: <Layout size={20} className="text-purple-600" />,
        link: "/portfolio-website-hyderabad"
      },
      {
        title: "AI Integration",
        desc: "Custom AI solutions for your business, including specialized chatbots and automation tools.",
        icon: <Brain size={20} className="text-indigo-500" />
      },
      {
        title: "UI/UX Design",
        desc: "User-centric design systems that prioritize conversion and seamless interaction.",
        icon: <Palette size={20} className="text-pink-500" />,
        link: "/ui-ux-design-hyderabad"
      },
      {
        title: "Web Development",
        desc: "High-performance, scalable web applications built with modern frameworks like React.",
        icon: <Globe size={20} className="text-blue-500" />,
        link: "/web-development-hyderabad"
      },
      {
        title: "API Development & Integration",
        desc: "Robust REST and GraphQL APIs with proper authentication, rate limiting, and documentation.",
        icon: <Code size={20} className="text-lime-600" />
      },
      {
        title: "Cloud Deployment & DevOps",
        desc: "AWS, Azure, and GCP deployment with CI/CD pipelines, monitoring, and auto-scaling solutions.",
        icon: <Rocket size={20} className="text-orange-500" />
      }
    ],
  },
  {
    category: "SmartScaleTech Marketing & Strategy",
    icon: <Target className="text-emerald-500" />,
    items: [
      {
        title: "SEO & Growth",
        desc: "Advanced search engine optimization to make your brand visible to the right audience.",
        icon: <Search size={20} className="text-amber-500" />
      },
      {
        title: "Content Strategy",
        desc: "Data-driven content plans designed to build authority and engage your target market.",
        icon: <FileText size={20} className="text-red-500" />
      },
      {
        title: "Ad Campaigns",
        desc: "Precision-targeted digital advertising to maximize ROI and scale your business quickly.",
        icon: <Megaphone size={20} className="text-orange-500" />
      },
      {
        title: "Brand Identity",
        desc: "Comprehensive branding packages including logo design, color theory, and brand voice.",
        icon: <Rocket size={20} className="text-indigo-600" />
      }
    ],
  }
];

export const Services = () => {
  const [selectedVisual, setSelectedVisual] =
    useState<ServiceVisual | null>(null);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">SmartScaleTech Services in Hitech City, Hyderabad</h2>
          <p className="text-slate-500">ATS resume writing, LinkedIn optimization, web development, UI/UX design, and SEO services for job seekers and businesses in Hitech City, Hyderabad, India.</p>
        </div>

        <div className="space-y-24">
          {services.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div className="flex items-center gap-3 mb-12 border-b border-slate-100 pb-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-900 shadow-sm">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wider">{group.category}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {group.items.map((service, idx) => {
                  const visual = getServiceVisualByTitle(service.title);

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-6">
                          <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                            {service.icon}
                          </div>
                          {visual?.kind === 'transformation' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black">
                              <TrendingUp size={11} />
                              {visual.beforeScore} → {visual.afterScore}
                            </span>
                          )}
                          {visual?.kind === 'showcase' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black">
                              <Sparkles size={11} />
                              {visual.badgeLabel}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed mb-5">
                          {service.desc}
                        </p>

                        {visual && (
                          <button
                            type="button"
                            onClick={() => setSelectedVisual(visual)}
                            className="w-full mb-5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:border-primary/50 transition-all text-left cursor-pointer group/img"
                          >
                            <img
                              src={visual.image}
                              alt={visual.imageAlt}
                              loading="lazy"
                              className="w-full aspect-video object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                            />
                            <div className="px-3 py-2 flex items-center justify-between bg-slate-50 text-[11px] font-bold text-slate-700 group-hover/img:text-primary">
                              <span className="inline-flex items-center gap-1">
                                <Eye size={13} />{' '}
                                {visual.kind === 'transformation'
                                  ? 'View Before & After'
                                  : 'Preview Service Details'}
                              </span>
                              <span
                                className={
                                  visual.kind === 'transformation'
                                    ? 'text-emerald-600 font-black'
                                    : 'text-primary font-black'
                                }
                              >
                                {visual.kind === 'transformation'
                                  ? visual.afterScore
                                  : visual.badgeLabel}
                              </span>
                            </div>
                          </button>
                        )}
                      </div>

                      {service.link && (
                        <Link
                          to={service.link}
                          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary hover:gap-2.5 transition-all pt-1"
                          aria-label={service.title}
                        >
                          Learn more <ArrowRight size={14} />
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Visual Lightbox Modal */}
      {selectedVisual && (
        <div
          className="fixed inset-0 z-[130] bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedVisual(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">
                  {selectedVisual.category} •{' '}
                  {selectedVisual.kind === 'transformation'
                    ? 'Before & After Proof'
                    : 'Service Overview'}
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  {selectedVisual.kind === 'transformation'
                    ? `${selectedVisual.serviceTitle} (${selectedVisual.beforeScore} → ${selectedVisual.afterScore})`
                    : `${selectedVisual.serviceTitle} — ${selectedVisual.badgeLabel}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisual(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={selectedVisual.image}
                  alt={selectedVisual.imageAlt}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  {selectedVisual.improvements.map((point) => (
                    <div key={point} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 md:justify-end">
                  <a
                    href={`https://wa.me/919000859695?text=${encodeURIComponent(
                      `Hello SmartScaleTech, I want to book ${selectedVisual.serviceTitle}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full sm:w-auto h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs">
                      <MessageCircle size={15} className="mr-1.5" /> Book on WhatsApp
                    </Button>
                  </a>
                  <Link
                    to={selectedVisual.serviceSlug || '/request-service'}
                    onClick={() => setSelectedVisual(null)}
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-11 px-5 rounded-xl border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      Request Proposal <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

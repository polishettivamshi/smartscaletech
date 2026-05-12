import { motion } from 'motion/react';
import { FileText, Linkedin, Rocket, Briefcase, GraduationCap, Users, ArrowRight, Code, Brain, Target, Search, Palette, Megaphone, Globe, Layout, Github } from 'lucide-react';

const services = [
  {
    category: "Career Branding Accelerator",
    icon: <Briefcase className="text-primary" />,
    items: [
      {
        title: "ATS Resume Writing",
        desc: "Technically engineered single-page resumes designed to rank #1 in Applicant Tracking Systems.",
        icon: <FileText size={20} className="text-indigo-600" />
      },
      {
        title: "LinkedIn Optimization",
        desc: "Strategic keyword placement and headline optimization to 10x your recruiter impressions.",
        icon: <Linkedin size={20} className="text-blue-600" />
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
        title: "Salary Negotiation",
        desc: "Expert guidance on negotiating salary, benefits, and equity packages to maximize your earnings.",
        icon: <Rocket size={20} className="text-yellow-600" />
      }
    ],
    footerLink: "Explore Career Services"
  },
  {
    category: "Premium Tech & Design",
    icon: <Code className="text-accent" />,
    items: [
      {
        title: "Final Year Projects",
        desc: "Complete end-to-end development of academic projects with scalable architecture and documentation.",
        icon: <GraduationCap size={20} className="text-cyan-600" />
      },
      {
        title: "Personal Portfolios",
        desc: "Recruiter-ready portfolios with smooth animations to showcase your coding projects.",
        icon: <Layout size={20} className="text-purple-600" />
      },
      {
        title: "Mobile App Development",
        desc: "Native and cross-platform mobile apps using React Native and Flutter for iOS and Android.",
        icon: <Briefcase size={20} className="text-teal-600" />
      },
      {
        title: "AI Integration",
        desc: "Custom AI solutions for your business, including specialized chatbots and automation tools.",
        icon: <Brain size={20} className="text-indigo-500" />
      },
      {
        title: "UI/UX Design",
        desc: "User-centric design systems that prioritize conversion and seamless interaction.",
        icon: <Palette size={20} className="text-pink-500" />
      },
      {
        title: "Web Development",
        desc: "High-performance, scalable web applications built with modern frameworks like React.",
        icon: <Globe size={20} className="text-blue-500" />
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
    footerLink: "Explore Tech Services"
  },
  {
    category: "Marketing & Strategy",
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
    footerLink: "Explore Marketing Services"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-500">Tailored solutions for your digital and professional growth.</p>
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
                {group.items.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="p-8 sm:p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-center md:justify-start">
                 <button className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                    {group.footerLink} <ArrowRight size={18} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


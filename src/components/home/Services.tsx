import { motion } from 'motion/react';
import { FileText, Linkedin, Rocket, Briefcase, GraduationCap, Users, ArrowRight, Code, Brain, Target, Search } from 'lucide-react';

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
        title: "Interview Coaching",
        desc: "One-on-one sessions with industry HRs to master coding and behavioral rounds.",
        icon: <Target size={20} className="text-emerald-600" />
      }
    ],
    footerLink: "Explore Career Services"
  },
  {
    category: "Premium Tech & Design",
    icon: <Code className="text-accent" />,
    items: [
      {
        title: "Personal Portfolios",
        desc: "Recruiter-ready portfolios with smooth animations to showcase your coding projects.",
        icon: <Users size={20} className="text-purple-600" />
      },
      {
        title: "AI Integration",
        desc: "Custom AI solutions for your business, including specialized chatbots and automation tools.",
        icon: <Brain size={20} className="text-indigo-500" />
      },
      {
        title: "SEO & Growth",
        desc: "Advanced search engine optimization to make your brand visible to the right audience.",
        icon: <Search size={20} className="text-amber-500" />
      }
    ],
    footerLink: "Explore Tech Services"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-slate-500 dark:text-slate-400">Tailored solutions for your digital and professional growth.</p>
        </div>

        <div className="space-y-24">
          {services.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div className="flex items-center gap-3 mb-12 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">{group.category}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                {group.items.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="p-8 sm:p-10 rounded-[40px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl dark:shadow-none transition-all group"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-8 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
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


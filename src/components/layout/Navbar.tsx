import { Link } from 'react-router-dom';
import {
  Zap,
  Menu as MenuIcon,
  X,
  Linkedin,
  ChevronDown,
  FileSearch,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FREE_TOOL_LINKS = [
  {
    name: 'Free ATS Resume & JD Checker',
    desc: 'Scan CV score & Job Description gaps',
    to: '/free-ats-resume-checker',
    icon: FileSearch,
  },
  {
    name: 'LinkedIn Headline Generator',
    desc: 'Generate 4 recruiter-searchable headlines',
    to: '/linkedin-headline-generator',
    icon: Linkedin,
  },
  {
    name: '60-Second Job Readiness Audit',
    desc: 'Diagnose your #1 callback bottleneck',
    to: '/job-readiness-audit',
    icon: ShieldCheck,
  },
  {
    name: 'Custom Bundle Builder',
    desc: 'Mix services & save up to 20%',
    to: '/custom-package-builder',
    icon: SlidersHorizontal,
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Before & After', href: '/#transformations' },
    { name: 'Projects', href: '/final-year-projects' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-nav backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Smart<span className="text-primary">Scale</span>Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* Free Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsToolsOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Zap size={13} fill="currentColor" /> Free Tools <ChevronDown size={13} />
            </button>

            {isToolsOpen && (
              <div className="absolute left-0 top-full pt-2 w-72 z-50">
                <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 space-y-1">
                  {FREE_TOOL_LINKS.map((tool) => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      onClick={() => setIsToolsOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <tool.icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-primary">
                          {tool.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{tool.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-xs font-bold text-slate-600 transition-colors hover:text-primary whitespace-nowrap shrink-0"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            to="/custom-package-builder"
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal size={14} />
            <span>Build Bundle</span>
          </Link>

          <Link
            to="/request-service"
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-bold text-xs shadow-md shadow-[#0A66C2]/20 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            title="Submit Service Request (LinkedIn Portal)"
          >
            <Linkedin size={15} fill="currentColor" />
            <span>Request Service</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-slate-100 bg-white shadow-2xl"
          >
            <div className="p-6 space-y-5">
              <div className="space-y-2 pb-2 border-b border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Free Tools &amp; Bundle Builder
                </p>
                {FREE_TOOL_LINKS.map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 text-xs font-black text-slate-800 bg-slate-50 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-xl"
                  >
                    <tool.icon size={15} className="text-primary" /> {tool.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center text-base font-black uppercase tracking-[0.15em] text-slate-700 hover:text-primary transition-colors py-1.5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link to="/request-service" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full h-12 rounded-2xl bg-[#0A66C2] font-black uppercase tracking-wider text-xs shadow-md">
                    Request Service
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

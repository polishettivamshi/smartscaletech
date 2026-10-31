import { Link } from 'react-router-dom';
import { Zap, Moon, Sun, ChevronDown, Menu as MenuIcon, X, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-nav backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Zap size={24} fill="currentColor" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Smart<span className="text-primary">Scale</span>Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/free-ats-resume-checker"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-wider shadow-xs"
          >
            <Zap size={13} fill="currentColor" /> Free ATS Checker
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-xs font-black uppercase tracking-wider shadow-2xs border border-emerald-200"
          >
            <TrendingUp size={13} /> Tracker
          </Link>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.linkedin.com/company/smartscale-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-slate-200 text-[#0A66C2] hover:bg-[#0A66C2]/5 font-bold text-xs transition-colors"
          >
            <span>Follow</span>
          </a>

          <a href="/#pricing" className="hidden sm:block">
            <Button className="h-10 rounded-xl px-5 font-black uppercase tracking-wider text-xs shadow-md shadow-primary/20">
              Get Started
            </Button>
          </a>

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
             <div className="p-8 space-y-6">
                <div className="flex flex-col gap-2 pb-2">
                  <Link
                    to="/free-ats-resume-checker"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-4 py-3 rounded-xl"
                  >
                    <Zap size={16} fill="currentColor" /> Free ATS Resume Checker
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl"
                  >
                    <TrendingUp size={16} /> Candidate Progress Tracker
                  </Link>
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center text-lg font-black uppercase tracking-[0.2em] text-slate-700 hover:text-primary transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4">
                  <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20">
                       Get Started
                    </Button>
                  </a>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

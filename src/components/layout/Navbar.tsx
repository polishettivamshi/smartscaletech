import { Link } from 'react-router-dom';
import { Zap, Moon, Sun, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800 bg-nav backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Zap size={24} fill="currentColor" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Smart<span className="text-primary">Scale</span>Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="flex h-9 w-16 items-center rounded-full bg-slate-100 dark:bg-slate-800 p-1 transition-colors relative"
            aria-label="Toggle dark mode"
          >
            <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-sm transition-transform duration-300 ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}>
              {isDarkMode ? <Moon size={14} className="text-primary" /> : <Sun size={14} className="text-amber-500" />}
            </div>
          </button>
          
          <a href="#pricing" className="hidden sm:block">
            <Button className="h-10 rounded-xl px-6 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
              Join Now
            </Button>
          </a>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 lg:hidden text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
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
            className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl"
          >
             <div className="p-8 space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center text-lg font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-2"
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

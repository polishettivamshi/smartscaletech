import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#161616] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-white/15">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87A4E] mb-4">
              Start Today · Hitech City &amp; Remote
            </p>
            <h2 className="text-section-display font-extrabold text-white">
              Let&apos;s build something that matters.
            </h2>
            <p className="mt-4 text-base text-white/75 leading-relaxed">
              Launch a clean business website, ship an AI workflow integration, or prepare an
              ATS-ready resume and developer portfolio with direct founder collaboration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <Link to="/request-service">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Project <ArrowRight size={16} />
              </Button>
            </Link>
            <a
              href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/25 text-white hover:bg-white/10 hover:border-white"
              >
                <MessageCircle size={16} /> Talk to Us
              </Button>
            </a>
          </div>
        </div>

        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/70">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1">
              Business Solutions
            </span>
            Web Engineering · UI/UX Systems · APIs · AI Workflows · SEO
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1">
              Career Solutions
            </span>
            ATS Resumes · LinkedIn &amp; Naukri · Developer Portfolios · Projects
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1">
              Direct Contact
            </span>
            <a
              href="mailto:smartscaletechforyou@gmail.com"
              className="underline underline-offset-4 hover:text-white"
            >
              smartscaletechforyou@gmail.com
            </a>{' '}
            · +91 90008 59695
          </div>
        </div>
      </div>
    </section>
  );
};

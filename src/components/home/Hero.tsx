import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onOpenSamples?: () => void;
}

export const Hero = ({ onOpenSamples }: HeroProps = {}) => {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-[#F3EEE3] py-10 sm:min-h-[calc(100svh-5rem)] sm:py-14 lg:py-20">
      <video
        src="/videos/SmartScaleTech%20Hero%20Section.mp4"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#F3EEE3]/25" />
      <div className="relative mx-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-5 rounded-3xl border border-white/50 bg-white/45 p-4 shadow-xl backdrop-blur-sm sm:p-6 lg:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E]">
            Independent Digital Studio · Hitech City, Hyderabad
          </p>

          <h1 className="text-hero-display font-extrabold text-[#111111]">
            <span className="block">We build digital experiences.</span>
            <span className="block text-[#D9541E] mt-1">That move you.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
            Smart Scale Tech (SST) partners with businesses and professionals across India to design conversion-focused websites, web apps, AI workflows, ATS-ready resumes, and recruiter-searchable LinkedIn profiles.
          </p>

          {/* Primary & Secondary Editorial Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to="/request-service">
              <Button variant="primary" size="lg">
                Start a Project <ArrowRight size={16} />
              </Button>
            </Link>

            <Link to="/work">
              <Button variant="outline" size="lg">
                Explore Our Work
              </Button>
            </Link>
          </div>

          {/* Subtle Functional Tool & Sample Links */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#57534E]">
            <Link
              to="/free-ats-resume-checker"
              className="text-[#111111] hover:text-[#D9541E] underline underline-offset-4 transition-colors"
            >
              Run Free ATS Resume Check →
            </Link>
            {onOpenSamples && (
              <button
                type="button"
                onClick={onOpenSamples}
                className="inline-flex items-center gap-1.5 text-[#57534E] hover:text-[#111111] cursor-pointer transition-colors"
              >
                <Eye size={14} />
                <span>Inspect Real Work Samples</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  FileText,
  Linkedin,
  Globe,
  MessageCircle,
  ExternalLink,
  ZoomIn,
  ArrowRight,
} from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { OfferPrice } from '../ui/OfferPrice';

interface SampleShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'fullstack' | 'fresher' | 'linkedin' | 'portfolio';
}

export const SampleShowcaseModal = ({
  isOpen,
  onClose,
  defaultTab = 'fullstack',
}: SampleShowcaseModalProps) => {
  const [activeTab, setActiveTab] = useState<'fullstack' | 'fresher' | 'linkedin' | 'portfolio'>(
    defaultTab
  );
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        maxWidthClass="max-w-4xl"
        subtitle="Verified Deliverables & Studio Samples"
        title="Inspect Before & After Work"
      >
        <div className="flex items-center gap-2 px-5 py-3 bg-cream/70 border-b border-border-hairline overflow-x-auto">
          {[
            { id: 'fullstack' as const, label: 'ATS Resume (Real Sample)', icon: FileText },
            { id: 'fresher' as const, label: 'Resume Before & After', icon: ArrowRight },
            { id: 'linkedin' as const, label: 'LinkedIn Makeover', icon: Linkedin },
            { id: 'portfolio' as const, label: 'Portfolio Comparison', icon: Globe },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-carbon text-white'
                    : 'bg-white border border-border-hairline text-muted-accessible hover:text-carbon'
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {activeTab === 'fullstack' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-cream/70 border border-border-hairline text-xs">
                <span className="font-bold text-carbon flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-success shrink-0" />
                  Single-Column Plain-Text ATS Structure (Python Backend Engineer)
                </span>
                <span className="text-[11px] font-bold uppercase text-muted-accessible bg-white px-2.5 py-1 rounded border border-border-hairline">
                  Real Career Sample · <OfferPrice standardPrice={299} offerPrice={239} compact />
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/aistudio/Vamshi_Polishetti_Python_Developer_Resume_5be69310.webp',
                    alt: 'Real ATS-Optimized Python Developer Resume Sample by SmartScaleTech',
                  })
                }
                className="group relative block mx-auto max-w-2xl rounded-2xl border border-border-hairline bg-cream p-2.5 cursor-zoom-in text-left"
              >
                <img
                  src="/assets/aistudio/Vamshi_Polishetti_Python_Developer_Resume_5be69310.webp"
                  alt="Real ATS-Optimized Python Developer Resume Sample by SmartScaleTech"
                  className="w-full h-auto rounded-xl border border-border-hairline bg-white"
                />
                <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-carbon text-white text-[11px] font-bold opacity-90 group-hover:opacity-100">
                  <ZoomIn size={13} /> Zoom
                </span>
              </button>
            </div>
          )}

          {activeTab === 'fresher' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-cream/70 border border-border-hairline text-xs">
                <span className="font-bold text-carbon flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#D9541E] shrink-0" />
                  Layout Hierarchy &amp; Keyword Comparison · Studio Demonstration
                </span>
                <span className="text-[11px] font-bold uppercase text-muted-accessible bg-white px-2.5 py-1 rounded border border-border-hairline">
                  ATS Resume Service
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp',
                    alt: 'Resume Optimization Before vs After comparison',
                  })
                }
                className="group relative block w-full rounded-2xl border border-border-hairline bg-cream p-2 cursor-zoom-in"
              >
                <img
                  src="/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp"
                  alt="Resume Optimization Before vs After comparison"
                  className="w-full h-auto rounded-xl"
                />
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-carbon text-white text-[11px] font-bold">
                  <ZoomIn size={13} /> Zoom
                </span>
              </button>
            </div>
          )}

          {activeTab === 'linkedin' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-cream/70 border border-border-hairline text-xs">
                <span className="font-bold text-carbon flex items-center gap-1.5">
                  <Linkedin size={15} className="text-[#D9541E] shrink-0" />
                  Searchable Headline, About &amp; Banner Architecture · Studio Demonstration
                </span>
                <span className="text-[11px] font-bold uppercase text-muted-accessible bg-white px-2.5 py-1 rounded border border-border-hairline">
                  LinkedIn Optimization
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp',
                    alt: 'LinkedIn Profile Transformation Before and After',
                  })
                }
                className="group relative block w-full rounded-2xl border border-border-hairline bg-cream p-2 cursor-zoom-in"
              >
                <img
                  src="/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp"
                  alt="LinkedIn Profile Transformation Before and After"
                  className="w-full h-auto rounded-xl"
                />
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-carbon text-white text-[11px] font-bold">
                  <ZoomIn size={13} /> Zoom
                </span>
              </button>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-cream/70 border border-border-hairline text-xs">
                <span className="font-bold text-carbon flex items-center gap-1.5">
                  <Globe size={15} className="text-[#D9541E] shrink-0" />
                  Responsive Personal Portfolio Website · Studio Demonstration
                </span>
                <span className="text-[11px] font-bold uppercase text-muted-accessible bg-white px-2.5 py-1 rounded border border-border-hairline">
                  Portfolio Launch
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp',
                    alt: 'Personal Portfolio Transformation Before vs After',
                  })
                }
                className="group relative block w-full rounded-2xl border border-border-hairline bg-cream p-2 cursor-zoom-in"
              >
                <img
                  src="/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp"
                  alt="Personal Portfolio Transformation Before vs After"
                  className="w-full h-auto rounded-xl"
                />
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-carbon text-white text-[11px] font-bold">
                  <ZoomIn size={13} /> Zoom
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-cream/60 border-t border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted-accessible">
            Single services start from <OfferPrice standardPrice={199} offerPrice={159} startingFrom compact /> ·
            Turnaround in 24–48 hours.
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link to="/request-service" className="flex-1 sm:flex-none" onClick={onClose}>
              <Button variant="primary" size="sm" className="w-full">
                Request Proposal <ExternalLink size={13} />
              </Button>
            </Link>
            <a
              href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20saw%20your%20work%20samples%20and%20want%20to%20discuss%20my%20profile."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button variant="secondary" size="sm" className="w-full">
                <MessageCircle size={13} /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </Dialog>

      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomImage.alt}
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-150 bg-carbon/90 flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setZoomImage(null)}
            aria-label="Close zoom view"
            className="fixed top-4 right-4 p-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
          <img
            src={zoomImage.src}
            alt={zoomImage.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[92vh] w-auto h-auto rounded-xl bg-white shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

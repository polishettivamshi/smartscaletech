import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  FileText,
  Linkedin,
  Globe,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ZoomIn,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

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
  const [activeTab, setActiveTab] = useState<'fullstack' | 'fresher' | 'linkedin' | 'portfolio'>(defaultTab);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">
                    Real Client-Ready Deliverables
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Preview Real Work Samples
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sample showcase"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('fullstack')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'fullstack'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <FileText size={14} /> ATS Resume Sample (97/100)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fresher')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'fresher'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <ArrowRight size={14} /> Resume Before &amp; After (42% → 97%)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('linkedin')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'linkedin'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Linkedin size={14} /> LinkedIn Makeover (95–97%)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('portfolio')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Globe size={14} /> Portfolio Website (98%)
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-800 text-xs leading-relaxed space-y-4">
              {activeTab === 'fullstack' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                    <span className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      ATS Score: 97/100 • Clean Single-Column LaTeX/ATS Format (Python Backend Engineer)
                    </span>
                    <span className="text-[11px] font-black uppercase text-emerald-700 bg-white px-2.5 py-0.5 rounded shadow-xs">
                      Working Pro Pack (₹399)
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setZoomImage({
                        src: '/assets/aistudio/Vamshi_Polishetti_Python_Developer_Resume_5be69310.webp',
                        alt: 'Real ATS-Optimized Python Developer Resume Sample by SmartScaleTech',
                      })
                    }
                    className="group relative mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-100 p-2 sm:p-3 shadow-inner cursor-zoom-in"
                  >
                    <img
                      src="/assets/aistudio/Vamshi_Polishetti_Python_Developer_Resume_5be69310.webp"
                      alt="Real ATS-Optimized Python Developer Resume Sample by SmartScaleTech"
                      className="w-full h-auto rounded-xl border border-slate-200 bg-white shadow-sm"
                    />
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 text-white text-[11px] font-bold shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={13} /> Tap to Zoom
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'fresher' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                      Before (42% Score) → After (97% ATS Resume Score) • Workday, Taleo &amp; Naukri Ready
                    </span>
                    <span className="text-[11px] font-black uppercase text-indigo-700 bg-white px-2.5 py-0.5 rounded shadow-xs">
                      Fresher / Pro (From ₹199)
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setZoomImage({
                        src: '/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp',
                        alt: 'Resume Optimization Before 42% vs After 97% transformation',
                      })
                    }
                    className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-2 cursor-zoom-in"
                  >
                    <img
                      src="/assets/aistudio/Resume_Optimization__Before___After_38faafe1.webp"
                      alt="Resume Optimization Before 42% vs After 97% transformation"
                      className="w-full h-auto rounded-xl"
                    />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 text-white text-[11px] font-bold shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={13} /> Tap to Zoom
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'linkedin' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <Linkedin size={16} className="text-[#0A66C2] shrink-0" />
                      Profile Strength: 35–40% Before → 95–97% After Optimization
                    </span>
                    <span className="text-[11px] font-black uppercase text-blue-700 bg-white px-2.5 py-0.5 rounded shadow-xs">
                      LinkedIn 360° (₹299)
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setZoomImage({
                        src: '/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp',
                        alt: 'LinkedIn Profile Transformation Before 35-40% vs After 95-97%',
                      })
                    }
                    className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-2 cursor-zoom-in"
                  >
                    <img
                      src="/assets/aistudio/LinkedIn_Profile_Transformation__Before_and_After_970bdafd.webp"
                      alt="LinkedIn Profile Transformation Before 35-40% vs After 95-97%"
                      className="w-full h-auto rounded-xl"
                    />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 text-white text-[11px] font-bold shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={13} /> Tap to Zoom
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <Globe size={16} className="text-purple-600 shrink-0" />
                      Portfolio Quality: 42% Before → 98% After Custom Launch
                    </span>
                    <span className="text-[11px] font-black uppercase text-purple-700 bg-white px-2.5 py-0.5 rounded shadow-xs">
                      Portfolio Launch (₹999)
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setZoomImage({
                        src: '/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp',
                        alt: 'Personal Portfolio Transformation Before 42% vs After 98%',
                      })
                    }
                    className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-2 cursor-zoom-in"
                  >
                    <img
                      src="/assets/aistudio/Personal_Portfolio_Transformation_before_after_cbbb2d79.webp"
                      alt="Personal Portfolio Transformation Before 42% vs After 98%"
                      className="w-full h-auto rounded-xl"
                    />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 text-white text-[11px] font-bold shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={13} /> Tap to Zoom
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium text-center sm:text-left">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Ready to transform your profile? Services start from ₹199.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link to="/request-service" className="flex-1 sm:flex-none" onClick={onClose}>
                  <Button className="w-full sm:w-auto h-11 px-5 rounded-xl bg-primary hover:bg-primary-dark font-bold text-xs shadow-md">
                    Request Proposal (₹0 Free) <ExternalLink size={13} className="ml-1.5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20saw%20your%20sample%20resumes%20and%20portfolios%20on%20SmartScaleTech%20and%20want%20to%20get%20started."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 px-4 rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold text-xs"
                  >
                    <MessageCircle size={15} className="mr-1.5 text-emerald-600" />
                    WhatsApp Vamshi
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Image Zoom Overlay */}
          <AnimatePresence>
            {zoomImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoomImage(null)}
                className="fixed inset-0 z-[130] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              >
                <button
                  type="button"
                  onClick={() => setZoomImage(null)}
                  aria-label="Close zoom view"
                  className="fixed top-4 right-4 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                >
                  <X size={22} />
                </button>
                <img
                  src={zoomImage.src}
                  alt={zoomImage.alt}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[92vh] w-auto h-auto rounded-2xl shadow-2xl bg-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

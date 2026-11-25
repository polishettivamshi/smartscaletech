interface TrustGuaranteeBannerProps {
  onOpenSamples?: () => void;
}

const TRUST_SIGNALS = [
  {
    value: 'Direct Founder Work',
    label: 'Consult directly with Vamshi Polishetti - no outsourced templates or middle layers.',
  },
  {
    value: '24–48 Hr Turnaround',
    label: 'First resume & LinkedIn drafts delivered within 48 hours with revision rounds.',
  },
  {
    value: '19+ Digital Services',
    label: 'Full-stack web apps, UI/UX, AI integration, SEO, ATS resumes & academic projects.',
  },
  {
    value: 'Full Code Ownership',
    label: 'Clean React/TypeScript repositories and editable Word + PDF files handed over.',
  },
];

export const TrustGuaranteeBanner = ({ onOpenSamples }: TrustGuaranteeBannerProps = {}) => {
  return (
    <section
      aria-label="Verified Studio Standards"
      className="bg-[#F3EEE3] border-y border-[#D8D3C9] py-14 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-7 sm:mb-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
            How We Work
          </p>
          <h2 className="text-section-display font-extrabold text-[#111111]">
            Direct, transparent, accountable.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TRUST_SIGNALS.map((item) => (
            <div
              key={item.value}
              className="h-full rounded-2xl border border-[#D8D3C9] bg-white p-5 sm:p-6 space-y-2"
            >
              <p className="font-display text-sm sm:text-base font-extrabold text-[#111111]">
                {item.value}
              </p>
              <p className="text-xs text-[#57534E] leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>

        {onOpenSamples && (
          <div className="mt-5 rounded-2xl border border-[#D8D3C9] bg-white px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-[#57534E] leading-relaxed">
              Every claim on our site is verifiable - inspect sample deliverables or test our free tools directly.
            </span>
            <button
              type="button"
              onClick={onOpenSamples}
              className="font-bold text-[#111111] hover:text-[#D9541E] underline underline-offset-4 cursor-pointer shrink-0"
            >
              Preview Deliverable Samples →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  X,
  ChevronDown,
  ArrowRight,
  FileSearch,
  Linkedin,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { BUSINESS_SERVICES_LIST, CAREER_SERVICES_LIST } from '../../data/serviceCatalog';
import { SERVICE_CATALOG } from '../../data/bundleCatalog';
import { OfferPrice } from '../ui/OfferPrice';

const FREE_TOOL_LINKS = [
  {
    name: 'All Free Tools',
    desc: 'Directory of career & pricing utilities',
    to: '/tools',
    icon: SlidersHorizontal,
  },
  {
    name: 'ATS Resume & JD Checker',
    desc: 'Compare CV against role keywords & JDs',
    to: '/free-ats-resume-checker',
    icon: FileSearch,
  },
  {
    name: 'LinkedIn Headline Generator',
    desc: 'Create 220-char recruiter-searchable headlines',
    to: '/linkedin-headline-generator',
    icon: Linkedin,
  },
  {
    name: '60-Second Job Readiness Audit',
    desc: 'Pinpoint callback bottlenecks across 6 checks',
    to: '/job-readiness-audit',
    icon: ShieldCheck,
  },
  {
    name: 'Custom Bundle Builder',
    desc: 'Mix services & save 10%–20% automatically',
    to: '/custom-package-builder',
    icon: SlidersHorizontal,
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'services' | 'tools' | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 bg-[#F3EEE3]/95 backdrop-blur-md ${
        hasScrolled ? 'border-b border-[#D8D3C9]' : 'border-b border-[#D8D3C9]/50'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-18 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9541E] rounded-lg px-1 py-0.5"
        >
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-[#111111]">
            SmartScale<span className="text-[#D9541E]">Tech</span>
          </span>
        </Link>

        {/* Desktop Center Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {/* Services Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              aria-expanded={openDropdown === 'services'}
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'services' ? null : 'services'))
              }
              className="inline-flex items-center gap-1 text-sm font-medium text-[#111111] hover:text-[#D9541E] transition-colors cursor-pointer py-2"
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-150 ${
                  openDropdown === 'services' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[680px] z-50">
                <div className="rounded-2xl bg-white border border-[#D8D3C9] shadow-2xl p-6 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E] pb-2.5 mb-3 border-b border-[#D8D3C9]">
                      Business Solutions
                    </p>
                    <ul className="space-y-1.5">
                      {BUSINESS_SERVICES_LIST.map((srv) => (
                        <li key={srv.slug}>
                          {(() => {
                            const offer = SERVICE_CATALOG.find(
                              (item) => item.id === srv.offerServiceId
                            );
                            return (
                          <Link
                            to={srv.canonicalPath}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-[#F3EEE3]/70 transition-colors group"
                          >
                            <span className="text-sm font-semibold text-[#111111] group-hover:text-[#D9541E]">
                              {srv.name}
                            </span>
                            {offer ? (
                              <OfferPrice
                                standardPrice={offer.standardPrice}
                                offerPrice={offer.price}
                                compact
                                startingFrom
                              />
                            ) : (
                              <span className="text-[11px] font-medium text-[#57534E] tabular-nums">
                                {srv.priceTag}
                              </span>
                            )}
                          </Link>
                            );
                          })()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E] pb-2.5 mb-3 border-b border-[#D8D3C9]">
                        Career Solutions
                      </p>
                      <ul className="space-y-1.5">
                        {CAREER_SERVICES_LIST.map((srv) => (
                          <li key={srv.slug}>
                            {(() => {
                              const offer = SERVICE_CATALOG.find(
                                (item) => item.id === srv.offerServiceId
                              );
                              return (
                            <Link
                              to={srv.canonicalPath}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-[#F3EEE3]/70 transition-colors group"
                            >
                              <span className="text-sm font-semibold text-[#111111] group-hover:text-[#D9541E]">
                                {srv.name}
                              </span>
                              {offer ? (
                                <OfferPrice
                                  standardPrice={offer.standardPrice}
                                  offerPrice={offer.price}
                                  compact
                                />
                              ) : (
                                <span className="text-[11px] font-medium text-[#57534E] tabular-nums">
                                  {srv.priceTag}
                                </span>
                              )}
                            </Link>
                              );
                            })()}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D8D3C9] flex items-center justify-between text-xs">
                      <Link
                        to="/final-year-projects"
                        onClick={() => setOpenDropdown(null)}
                        className="font-semibold text-[#111111] hover:text-[#D9541E]"
                      >
                        Final Year Projects Catalog →
                      </Link>
                      <Link
                        to="/custom-package-builder"
                        onClick={() => setOpenDropdown(null)}
                        className="font-semibold text-[#D9541E] hover:underline"
                      >
                        Bundle Builder
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/work"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith('/work')
                ? 'text-[#D9541E]'
                : 'text-[#111111] hover:text-[#D9541E]'
            }`}
          >
            Our Work
          </Link>

          {/* Free Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('tools')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              aria-expanded={openDropdown === 'tools'}
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'tools' ? null : 'tools'))
              }
              className="inline-flex items-center gap-1 text-sm font-medium text-[#111111] hover:text-[#D9541E] transition-colors cursor-pointer py-2"
            >
              <span>Free Tools</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-150 ${
                  openDropdown === 'tools' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'tools' && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50">
                <div className="rounded-2xl bg-white border border-[#D8D3C9] shadow-2xl p-2 space-y-1">
                  {FREE_TOOL_LINKS.map((tool) => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F3EEE3]/70 transition-colors group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-[#F3EEE3] text-[#111111] group-hover:text-[#D9541E] flex items-center justify-center shrink-0 mt-0.5">
                        <tool.icon size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111111] group-hover:text-[#D9541E]">
                          {tool.name}
                        </p>
                        <p className="text-xs text-[#57534E]">{tool.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/#pricing"
            className="text-sm font-medium text-[#111111] hover:text-[#D9541E] transition-colors"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === '/about' ? 'text-[#D9541E]' : 'text-[#111111] hover:text-[#D9541E]'
            }`}
          >
            About
          </Link>
        </div>

        {/* Right Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/custom-package-builder"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] border border-[#D8D3C9] bg-white hover:border-[#111111] px-3.5 py-2.5 rounded-xl transition-colors"
          >
            Build Bundle
          </Link>

          <Link
            to="/request-service"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#D9541E] text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight size={14} />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 lg:hidden text-[#111111] hover:bg-[#EAE3D5] rounded-xl transition-colors cursor-pointer"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#D8D3C9] bg-[#F3EEE3] max-h-[82vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E] px-2 pb-1">
                Navigation
              </p>
              {[
                { label: 'Services Overview', to: '/#services' },
                { label: 'Our Work & Case Studies', to: '/work' },
                { label: 'Before & After Showcase', to: '/#transformations' },
                { label: 'Final Year Projects', to: '/final-year-projects' },
                { label: 'Pricing & Bundles', to: '/#pricing' },
                { label: 'About Studio', to: '/about' },
                { label: 'FAQ', to: '/#faq' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#111111] hover:bg-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1 pt-4 border-t border-[#D8D3C9]">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E] px-2 pb-1">
                Free Career &amp; Pricing Tools
              </p>
              {FREE_TOOL_LINKS.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-[#D8D3C9] text-sm font-semibold text-[#111111]"
                >
                  <tool.icon size={15} className="text-[#D9541E] shrink-0" />
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/request-service"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#D9541E] text-white text-sm font-semibold text-center"
              >
                Start a Project / Request Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

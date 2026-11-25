import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  FileText,
  Mail,
  MessageCircle,
  Presentation,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { SEO } from '../../lib/seo';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';
import { OfferPrice } from '../ui/OfferPrice';
import { submitProjectInquiry } from '../../lib/leads';

const PROJECT_DOMAINS = [
  'AI / Machine Learning',
  'Full-Stack Web / MERN',
  'Cloud & DevOps',
  'Data Science / Python',
  'Other',
];

const PACKAGE_INCLUSIONS = [
  {
    icon: Code2,
    title: 'Working Source Code',
    desc: 'Clean, modular, well-commented code pushed to your GitHub with environment setup scripts.',
  },
  {
    icon: FileText,
    title: 'Project Report & Diagrams',
    desc: 'IEEE / university-formatted synopsis, system architecture, UML, ER, and DFD documentation.',
  },
  {
    icon: Presentation,
    title: 'Review PPTs & Cloud Demo Link',
    desc: 'Ready-to-present Review 1, Review 2 & Final Viva slide decks plus a live deployed URL.',
  },
  {
    icon: Terminal,
    title: '1-on-1 Code Walkthrough & Viva Prep',
    desc: 'Direct session with Founder Vamshi so you can explain every file, API, and model in your viva.',
  },
];

export const FinalYearProjectsPage = () => {
  const [projectRequest, setProjectRequest] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    domain: '',
    technologies: '',
    deadline: '',
    details: '',
  });
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchError, setDispatchError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState('');

  const handleProjectRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowContactOptions(true);
    setDispatchError('');
    setEmailSent(false);
    setWhatsappFallbackUrl('');
  };

  const dispatchProjectRequest = async (channel: 'email' | 'whatsapp') => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setDispatchError('');
    setEmailSent(false);
    setWhatsappFallbackUrl('');
    const whatsappWindow = channel === 'whatsapp' ? window.open('about:blank', '_blank') : null;

    try {
      const { whatsappUrl } = await submitProjectInquiry({
        name: projectRequest.name.trim(),
        email: projectRequest.email.trim(),
        phone: projectRequest.phone.trim(),
        course: projectRequest.course,
        domain: projectRequest.domain,
        technologies: projectRequest.technologies,
        deadline: projectRequest.deadline,
        details: projectRequest.details,
      });

      if (channel === 'whatsapp') {
        if (whatsappWindow) {
          whatsappWindow.opener = null;
          whatsappWindow.location.href = whatsappUrl;
        } else {
          setWhatsappFallbackUrl(whatsappUrl);
        }
      } else {
        setEmailSent(true);
      }
    } catch {
      whatsappWindow?.close();
      setDispatchError(
        'We could not send your request right now. Please try again or contact us directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F3EEE3] min-h-screen">
      <SEO
        title="Final Year Projects Hyderabad (B.Tech, M.Tech, MCA) | Smart Scale Tech (SST)"
        description="End-to-end B.Tech, M.Tech & MCA final year projects in Hitech City, Hyderabad by Smart Scale Tech (SST) across AI/ML, MERN Full-Stack, Cloud DevOps & Data Science with source code, report, PPT & viva prep."
        keywords="final year projects hyderabad, btech final year projects hitech city, mca mtech ieee projects hyderabad, ai ml mern final year project center hyderabad, sst final year projects"
        path="/final-year-projects"
      />

      <section className="pt-12 pb-16 sm:pt-16 border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/#services' },
              { label: 'Final Year Projects' },
            ]}
            className="mb-7"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E]">
                Hitech City, Hyderabad · B.Tech, M.Tech, MCA &amp; BCA
              </p>
              <h1 className="text-hero-display font-extrabold text-[#111111]">
                Final Year Projects built for real viva &amp; resume value.
              </h1>
              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
                Stop buying broken copy-paste zip files. Get a clean, working build you genuinely
                understand—complete with source code, university documentation, PPT decks, cloud
                demo link, and 1-on-1 viva training at our startup launch offer.
              </p>
              <OfferPrice standardPrice={4999} offerPrice={3999} startingFrom />
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20need%20a%20Final%20Year%20Project%20synopsis%20and%20demo%20list."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    <MessageCircle size={16} /> Get Synopsis List on WhatsApp
                  </Button>
                </a>
                <Link to="/custom-package-builder">
                  <Button variant="secondary" size="lg">
                    Add ATS Resume (+Bundle Discount) <ArrowRight size={15} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#D8D3C9] bg-white p-2">
                <img
                  src="/assets/aistudio/Final_Year_Projects__Ideas_in_Code_c262fb23.webp"
                  alt="Final Year Projects Architecture and Code Development by SmartScaleTech"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-1">
                Complete Package · Exclusive Startup Launch Offer
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                From Synopsis Approval to Final Viva
              </h2>
            </div>
            <span className="text-xs font-bold text-[#16845B] inline-flex items-center gap-1.5">
              <ShieldCheck size={15} /> Clean Execution &amp; Code Walkthrough Included
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGE_INCLUSIONS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#F3EEE3]/45 border border-[#D8D3C9] space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-white border border-[#D8D3C9] text-[#111111] flex items-center justify-center">
                  <item.icon size={19} />
                </div>
                <h3 className="text-base font-extrabold text-[#111111]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#F3EEE3]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
              Custom Project Inquiry
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Request a project based on your requirements.
            </h2>
            <p className="mt-2 text-sm text-[#57534E]">
              Tell us about your project, course, preferred technologies, and deadline. Then share
              your completed brief directly to our team by email or WhatsApp.
            </p>
          </div>

          <form
            onSubmit={handleProjectRequest}
            className="rounded-2xl bg-white border border-[#D8D3C9] p-5 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="block text-xs font-bold text-[#111111]">Your name *</span>
                <input
                  required
                  value={projectRequest.name}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, name: event.target.value });
                    setShowContactOptions(false);
                    setEmailSent(false);
                    setWhatsappFallbackUrl('');
                  }}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-bold text-[#111111]">Email address *</span>
                <input
                  required
                  type="email"
                  value={projectRequest.email}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, email: event.target.value });
                    setShowContactOptions(false);
                    setEmailSent(false);
                    setWhatsappFallbackUrl('');
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-bold text-[#111111]">Phone / WhatsApp number *</span>
                <input
                  required
                  type="tel"
                  value={projectRequest.phone}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, phone: event.target.value });
                    setShowContactOptions(false);
                    setEmailSent(false);
                    setWhatsappFallbackUrl('');
                  }}
                  placeholder="+91 90000 00000"
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-bold text-[#111111]">Course / degree</span>
                <input
                  value={projectRequest.course}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, course: event.target.value });
                    setShowContactOptions(false);
                  }}
                  placeholder="e.g. B.Tech CSE, MCA"
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-bold text-[#111111]">Project domain *</span>
                <select
                  required
                  value={projectRequest.domain}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, domain: event.target.value });
                    setShowContactOptions(false);
                  }}
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                >
                  <option value="" disabled>Select a domain</option>
                  {PROJECT_DOMAINS.map((domain) => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-bold text-[#111111]">Preferred technologies</span>
                <input
                  value={projectRequest.technologies}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, technologies: event.target.value });
                    setShowContactOptions(false);
                  }}
                  placeholder="e.g. Python, React, Java"
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
              <label className="space-y-1.5 sm:col-span-2">
                <span className="block text-xs font-bold text-[#111111]">Target deadline</span>
                <input
                  value={projectRequest.deadline}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, deadline: event.target.value });
                    setShowContactOptions(false);
                  }}
                  placeholder="e.g. 15 December or flexible"
                  className="w-full rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
              <label className="space-y-1.5 sm:col-span-2">
                <span className="block text-xs font-bold text-[#111111]">Project requirements *</span>
                <textarea
                  required
                  rows={5}
                  value={projectRequest.details}
                  onChange={(event) => {
                    setProjectRequest({ ...projectRequest, details: event.target.value });
                    setShowContactOptions(false);
                  }}
                  placeholder="Describe the idea, required features, university guidelines, or base paper."
                  className="w-full resize-y rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/35 px-3.5 py-3 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </label>
            </div>

            {showContactOptions ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="dark"
                    className="flex-1"
                    disabled={isSubmitting}
                    onClick={() => dispatchProjectRequest('email')}
                  >
                    <Mail size={15} /> {isSubmitting ? 'Sending...' : 'Share by Email'}
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    className="flex-1"
                    disabled={isSubmitting}
                    onClick={() => dispatchProjectRequest('whatsapp')}
                  >
                    <MessageCircle size={15} /> {isSubmitting ? 'Sending...' : 'Share by WhatsApp'}
                  </Button>
                </div>
                {emailSent && (
                  <p role="status" className="text-sm font-semibold text-[#16845B]">
                    Your project inquiry has been sent to our team by email.
                  </p>
                )}
                {whatsappFallbackUrl && (
                  <a
                    href={whatsappFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#D9541E] underline"
                  >
                    WhatsApp did not open automatically. Open the prepared message.
                  </a>
                )}
                {dispatchError && (
                  <p role="alert" className="text-sm font-semibold text-red-700">
                    {dispatchError}
                  </p>
                )}
              </div>
            ) : (
              <Button type="submit" variant="primary">
                Continue to Contact Options <ArrowRight size={15} />
              </Button>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

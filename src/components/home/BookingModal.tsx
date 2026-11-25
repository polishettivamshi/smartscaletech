import React, { useState } from 'react';
import { Check, Phone, User, Send, ShieldCheck, MessageCircle } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { StatusBanner } from '../ui/StatusBanner';
import { submitLead } from '../../lib/leads';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export const BookingModal = ({ isOpen, onClose, planName }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experienceLevel: 'Fresher / College Student',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    if (!cleanName || cleanPhone.length < 7) {
      setFormError('Please enter your full name and a valid WhatsApp/phone number.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const { whatsappUrl } = await submitLead({
        name: cleanName,
        phone: cleanPhone,
        service: planName || 'General Inquiry',
        sourcePage: window.location.pathname || '/',
        note: `Level: ${formData.experienceLevel}`,
      });

      setWhatsappLink(whatsappUrl);
      setIsSuccess(true);
    } catch {
      setFormError('Unable to save request right now. Please message +91 90008 59695 on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormError(null);
    setFormData({ name: '', phone: '', experienceLevel: 'Fresher / College Student' });
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleResetAndClose}
      maxWidthClass="max-w-md"
      subtitle="Project & Career Brief"
      title={isSuccess ? 'Request Registered' : `Discuss ${planName || 'Your Scope'}`}
    >
      <div className="p-6 sm:p-7">
        {isSuccess ? (
          <div className="text-center py-3">
            <div className="h-14 w-14 bg-[#16845B]/15 text-[#16845B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={28} />
            </div>
            <h4 className="text-xl font-extrabold text-[#111111] mb-2">Lead Saved &amp; Ready</h4>
            <p className="text-[#57534E] text-sm mb-6 leading-relaxed">
              We have registered your inquiry for <strong>{planName}</strong>. Continue directly on
              WhatsApp to share files or confirm timeline.
            </p>

            <a
              href={whatsappLink || 'https://wa.me/919000859695'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#111111] hover:bg-[#D9541E] text-white font-semibold text-sm transition-colors"
            >
              <MessageCircle size={17} /> Open WhatsApp Chat Now
            </a>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-4 text-xs font-semibold text-[#57534E] hover:text-[#111111] underline underline-offset-4 cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Share your name and WhatsApp number so we can send tailored work samples and scope
              options without lengthy forms.
            </p>

            <div className="space-y-1.5">
              <label
                htmlFor="booking-name"
                className="text-xs font-bold text-[#111111] uppercase tracking-wider block"
              >
                Full Name <span className="text-[#D9541E]">*</span>
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]"
                />
                <input
                  id="booking-name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 bg-[#F3EEE3]/45 border border-[#D8D3C9] rounded-xl pl-10 pr-3 text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E] focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="booking-phone"
                className="text-xs font-bold text-[#111111] uppercase tracking-wider block"
              >
                WhatsApp Number <span className="text-[#D9541E]">*</span>
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]"
                />
                <input
                  id="booking-phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 bg-[#F3EEE3]/45 border border-[#D8D3C9] rounded-xl pl-10 pr-3 text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E] focus:border-transparent"
                  placeholder="e.g. 9000859695"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="booking-stage"
                className="text-xs font-bold text-[#111111] uppercase tracking-wider block"
              >
                Current Profile / Track
              </label>
              <select
                id="booking-stage"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full h-11 bg-[#F3EEE3]/45 border border-[#D8D3C9] rounded-xl px-3 text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E] focus:border-transparent"
              >
                <option value="Fresher / College Student">Fresher / College Student</option>
                <option value="1-3 Years Experience">1–3 Years Experience (Junior/Mid)</option>
                <option value="4-8 Years Experience">4–8 Years Experience (Senior)</option>
                <option value="8+ Years / Manager / Lead">8+ Years / Lead / Manager</option>
                <option value="Business / Founder">Business / Startup Founder (Web/UI/AI)</option>
              </select>
            </div>

            {formError && <StatusBanner tone="error">{formError}</StatusBanner>}

            <Button type="submit" disabled={isSubmitting} variant="primary" size="lg" className="w-full">
              {isSubmitting ? 'Saving Request...' : (
                <>
                  Save &amp; Continue to WhatsApp <Send size={15} />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-[#57534E] pt-1">
              <ShieldCheck size={14} className="text-[#16845B]" />
              No automated spam. Direct 1-on-1 conversation.
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
};

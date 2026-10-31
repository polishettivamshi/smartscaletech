import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Phone, User, Send, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitLead } from '../../lib/leads';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export const BookingModal = ({ isOpen, onClose, planName }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experienceLevel: 'Fresher / Entry-Level',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { whatsappUrl } = await submitLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        service: planName || 'General Inquiry',
        sourcePage: window.location.pathname || '/',
        note: `Level: ${formData.experienceLevel}`,
      });

      setWhatsappLink(whatsappUrl);
      setIsSuccess(true);

      // Attempt to open WhatsApp window safely
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup blocked:', err);
      }
    } catch (err) {
      console.error('Lead submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '', experienceLevel: 'Fresher / Entry-Level' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            <button
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Lead Saved &amp; Dispatched!</h3>
                  <p className="text-slate-600 text-sm font-medium mb-6">
                    We have registered your request for <strong>{planName}</strong>. Our team replies on WhatsApp within 5 minutes.
                  </p>

                  <a
                    href={whatsappLink || 'https://wa.me/919000859695'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 transition-all"
                  >
                    <MessageCircle size={18} /> Open WhatsApp Chat Now
                  </a>

                  <button
                    onClick={handleResetAndClose}
                    className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 underline"
                  >
                    Done &amp; Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
                      <Clock size={12} /> Fast Turnaround
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Book {planName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill 2 simple fields. We will message you on WhatsApp with samples and pricing options.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400"
                          placeholder="e.g. Rahul Sharma"
                        />
                      </div>
                    </div>

                    {/* WhatsApp / Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400"
                          placeholder="e.g. 9000859695"
                        />
                      </div>
                    </div>

                    {/* Quick Profile Level */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your Current Stage
                      </label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        <option value="Fresher / College Student">Fresher / College Student</option>
                        <option value="1-3 Years Experience">1-3 Years Experience (Junior/Mid)</option>
                        <option value="4-8 Years Experience">4-8 Years Experience (Senior)</option>
                        <option value="8+ Years / Manager / Lead">8+ Years / Manager / Lead</option>
                        <option value="Business / Founder">Business / Founder (Website/UI)</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark shadow-md shadow-primary/20 font-bold text-sm mt-2"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          Continue to WhatsApp <Send size={16} />
                        </span>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400 pt-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      No spam guarantee. Direct 1-on-1 discussion.
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

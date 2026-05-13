import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Mail, Phone, User, Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export const BookingModal = ({ isOpen, onClose, planName }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct the WhatsApp message
    const message = `Hello SmartScaleTech! \nI'm interested in the "${planName}" plan.\n\nMy Details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nPlease get in touch with me soon!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919000859695?text=${encodedMessage}`;

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', email: '', phone: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-10">
              {isSuccess ? (
                <div className="text-center py-12">
                   <div className="h-20 w-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={40} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                   <p className="text-slate-700 font-medium">Our experts will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Booking for</p>
                    <h3 className="text-3xl font-black text-slate-900">{planName}</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                       <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-12 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-300"
                            placeholder="John Doe"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                       <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-12 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-300"
                            placeholder="john@example.com"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                       <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-12 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-300"
                            placeholder="+91 9123456789"
                          />
                       </div>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 font-bold"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Complete Booking <Send size={18} className="ml-2" /></>
                      )}
                    </Button>
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

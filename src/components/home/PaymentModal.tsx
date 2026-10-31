import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, QrCode, Smartphone, MessageCircle, Copy, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitLead } from '../../lib/leads';
import { trackEvent } from '../../lib/analytics';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: string; // e.g. "999" or "499"
}

export const PaymentModal = ({ isOpen, onClose, planName, amount }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [hasInitiated, setHasInitiated] = useState(false);

  // Clean numeric amount
  const numericAmount = amount.replace(/[^0-9]/g, '') || '999';
  
  // UPI Configuration (configurable via VITE_UPI_ID in .env or defaults to founder's UPI ID)
  const upiId = (import.meta as any).env?.VITE_UPI_ID || '9000859695@ybl';
  const payeeName = 'SmartScaleTech';
  const transactionNote = encodeURIComponent(`SmartScaleTech ${planName}`);
  
  // Standard NPCI UPI URI
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${numericAmount}&cu=INR&tn=${transactionNote}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePaymentInitiated = async () => {
    trackEvent('payment_click', { plan: planName, amount: numericAmount });
    if (name || phone) {
      await submitLead({
        name: name || 'Payment Initiator',
        phone: phone || 'Pending Phone',
        service: `${planName} (Paid/Initiated ₹${numericAmount})`,
        sourcePage: window.location.pathname,
        note: `Initiated ₹${numericAmount} payment`,
      });
    }
    setHasInitiated(true);
  };

  const confirmWhatsAppUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello SmartScaleTech,\n\nI have initiated the payment of ₹${numericAmount} for the *${planName}* package.\n\nName: ${name || '[My Name]'}\nPhone: ${phone || '[My Phone]'}\n\nAttaching payment screenshot below.`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  ₹
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Instant Advance / Payment</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Secure UPI &amp; Instant Booking Confirmation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-400 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 space-y-5 flex-1">
              {/* Package Summary */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div>
                  <span className="text-[10px] font-black uppercase text-primary tracking-wider">Selected Package</span>
                  <p className="text-base font-black text-slate-900">{planName}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">₹{numericAmount}</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">One-Time / Advance</span>
                </div>
              </div>

              {!hasInitiated ? (
                <>
                  {/* Lead details before paying (ensures owner knows who paid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9000859695"
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* UPI QR & App intent */}
                  <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-center gap-1.5">
                      <QrCode size={16} className="text-primary" /> Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
                    </p>
                    <div className="inline-block p-2 bg-white rounded-xl shadow-md border border-slate-200">
                      <img
                        src={qrCodeUrl}
                        alt="UPI Payment QR Code"
                        className="w-44 h-44 mx-auto object-contain"
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-2 text-xs">
                      <span className="text-slate-500 font-medium">UPI ID:</span>
                      <code className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {upiId}
                      </code>
                      <button
                        onClick={handleCopyUpi}
                        className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                      >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={13} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    {/* Direct Mobile App Button */}
                    <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row gap-2">
                      <a
                        href={upiUri}
                        onClick={handlePaymentInitiated}
                        className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md shadow-primary/20 transition-all"
                      >
                        <Smartphone size={16} /> Pay via UPI App on Mobile
                      </a>
                      <Button
                        onClick={handlePaymentInitiated}
                        variant="outline"
                        className="h-11 px-4 rounded-xl text-xs font-bold border-slate-300"
                      >
                        I have Scanned &amp; Paid <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <Check size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900">Confirm Payment on WhatsApp</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Click below to send us your transaction confirmation or screenshot. Our team will verify and start your draft right away!
                    </p>
                  </div>
                  <a
                    href={confirmWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 transition-all"
                  >
                    <MessageCircle size={18} /> Send Screenshot to WhatsApp
                  </a>
                </div>
              )}

              {/* Trust footer */}
              <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-500" /> Direct UPI / Zero Gateway Fee
                </span>
                <span>•</span>
                <span>Receipt issued on WhatsApp</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

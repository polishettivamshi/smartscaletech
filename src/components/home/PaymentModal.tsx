import { useState } from 'react';
import { Check, ShieldCheck, QrCode, Smartphone, MessageCircle, Copy, ArrowRight } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { StatusBanner } from '../ui/StatusBanner';
import { submitLead } from '../../lib/leads';
import { trackEvent } from '../../lib/analytics';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: string;
  standardAmount?: string;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  planName,
  amount,
  standardAmount,
}: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [hasInitiated, setHasInitiated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const numericAmount = amount.replace(/[^0-9]/g, '') || '1500';
  const numericStandardAmount = standardAmount?.replace(/[^0-9]/g, '');
  const paymentSaving =
    numericStandardAmount && Number(numericStandardAmount) > Number(numericAmount)
      ? Number(numericStandardAmount) - Number(numericAmount)
      : 0;
  const upiId = (import.meta as { env?: Record<string, string> }).env?.VITE_UPI_ID || 'polishettivamshi123@ybl';
  const payeeName = 'SmartScaleTech';
  const transactionNote = encodeURIComponent(`SmartScaleTech ${planName}`);

  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${numericAmount}&cu=INR&tn=${transactionNote}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePaymentInitiated = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setEmailError(null);
    trackEvent('payment_click', { plan: planName, amount: numericAmount });
    try {
      if (name.trim() || phone.trim()) {
        await submitLead({
          name: name.trim() || 'Payment Initiator',
          phone: phone.trim() || 'Pending Phone',
          service: `${planName} (UPI Initiated ₹${numericAmount})`,
          sourcePage: window.location.pathname,
          note: `Initiated ₹${numericAmount} UPI checkout`,
        });
      }
    } catch {
      setEmailError('We could not email your booking notice. Please confirm it on WhatsApp.');
    } finally {
      setIsSaving(false);
      setHasInitiated(true);
    }
  };

  const confirmWhatsAppUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello SmartScaleTech,\n\nI have initiated the payment of ₹${numericAmount} for the *${planName}* package.\n\nName: ${name || '[My Name]'}\nPhone: ${phone || '[My Phone]'}\n\nAttaching payment screenshot below.`
  )}`;

  const handleClose = () => {
    setHasInitiated(false);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      maxWidthClass="max-w-lg"
      subtitle="Direct UPI Checkout"
      title="Instant Booking & Advance"
    >
      <div className="p-6 space-y-5">
      {emailError && <StatusBanner tone="error">{emailError}</StatusBanner>}
      <div className="flex items-center justify-between p-4 rounded-xl bg-cream/70 border border-border-hairline">
          <div>
            <span className="text-[11px] font-bold uppercase text-[#D9541E] tracking-wider block">
              Selected Package
            </span>
            <p className="text-base font-extrabold text-carbon mt-0.5">{planName}</p>
          </div>
          <div className="text-right tabular-nums">
            {paymentSaving > 0 && (
              <span className="block text-xs font-medium text-[#78716C] line-through">
                ₹{Number(numericStandardAmount).toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-2xl font-extrabold text-[#D9541E]">
              ₹{Number(numericAmount).toLocaleString('en-IN')}
            </span>
            {paymentSaving > 0 && (
              <span className="block text-[10px] font-bold text-[#D9541E]">
                Save ₹{paymentSaving.toLocaleString('en-IN')}
              </span>
            )}
            <span className="block text-[10px] font-bold text-muted-accessible uppercase">
              One-Time / Advance
            </span>
          </div>
        </div>

        {!hasInitiated ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label htmlFor="pay-name" className="font-bold text-carbon block mb-1">
                  Your Name
                </label>
                <input
                  id="pay-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-10 px-3 bg-cream/45 border border-border-hairline rounded-xl font-medium text-carbon focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>
              <div>
                <label htmlFor="pay-phone" className="font-bold text-carbon block mb-1">
                  WhatsApp Number
                </label>
                <input
                  id="pay-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9000859695"
                  className="w-full h-10 px-3 bg-cream/45 border border-border-hairline rounded-xl font-medium text-carbon focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>
            </div>

            <div className="text-center p-5 rounded-xl bg-cream/45 border border-border-hairline">
              <p className="text-xs font-bold text-carbon mb-3 flex items-center justify-center gap-1.5">
                <QrCode size={15} className="text-[#D9541E]" /> Scan with GPay / PhonePe / Paytm / BHIM
              </p>
              <div className="inline-block p-2.5 bg-white rounded-xl border border-border-hairline">
                <img
                  src={qrCodeUrl}
                  alt="UPI Payment QR Code"
                  className="w-44 h-44 mx-auto object-contain"
                />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs">
                <span className="text-muted-accessible font-medium">UPI ID:</span>
                <code className="font-mono font-bold text-carbon bg-white px-2.5 py-1 rounded border border-border-hairline">
                  {upiId}
                </code>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="text-[#D9541E] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-success" /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-border-hairline flex flex-col sm:flex-row gap-2.5">
                <a
                  href={upiUri}
                  onClick={handlePaymentInitiated}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#D9541E] hover:bg-primary-dark text-white font-semibold text-xs transition-colors"
                >
                  <Smartphone size={15} /> Open UPI App
                </a>
                <Button
                  type="button"
                  onClick={handlePaymentInitiated}
                  disabled={isSaving}
                  variant="secondary"
                  className="h-11 px-4 text-xs"
                >
                  I Have Scanned &amp; Paid <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 rounded-xl bg-success/8 border border-success/30 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto">
              <Check size={24} />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-carbon">Confirm Screenshot on WhatsApp</h4>
              <p className="text-xs text-muted-accessible mt-1 leading-relaxed">
                Send your transaction screenshot on WhatsApp so we verify receipt and start Phase 01
                immediately.
              </p>
            </div>
            <a
              href={confirmWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-carbon hover:bg-[#D9541E] text-white font-semibold text-xs transition-colors"
            >
              <MessageCircle size={16} /> Send Payment Confirmation
            </a>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-muted-accessible">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck size={14} className="text-success" /> Direct UPI · Zero Gateway Markup
          </span>
          <span>·</span>
          <span>Receipt issued on WhatsApp</span>
        </div>
      </div>
    </Dialog>
  );
};

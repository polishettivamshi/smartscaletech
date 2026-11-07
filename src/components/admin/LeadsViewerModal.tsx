import { useState, useEffect } from 'react';
import { X, Download, Trash2, Phone, Calendar, ArrowUpRight, ShieldCheck, Activity, Mail, Linkedin, FileText, ExternalLink } from 'lucide-react';
import { getStoredLeads, Lead } from '../../lib/leads';
import { getLocalAnalyticsCounts } from '../../lib/analytics';

interface LeadsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadsViewerModal = ({ isOpen, onClose }: LeadsViewerModalProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const refreshLeads = () => {
    setLeads(getStoredLeads());
    setCounts(getLocalAnalyticsCounts());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }
  }, [isOpen]);

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'LinkedIn', 'Role', 'Timeline', 'Budget', 'SourcePage', 'Timestamp', 'Note'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${l.service.replace(/"/g, '""')}"`,
      `"${(l.linkedInUrl || '').replace(/"/g, '""')}"`,
      `"${(l.currentRole || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${l.sourcePage.replace(/"/g, '""')}"`,
      `"${l.timestamp}"`,
      `"${(l.note || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smartscaletech_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear stored leads? Make sure you exported them first.')) {
      localStorage.removeItem('smartscaletech_leads_v1');
      setLeads([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-primary" size={22} /> SmartScaleTech Lead Inbox
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Every lead captured via modals or forms is saved locally and logged here in real-time.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action bar */}
        {/* Analytics Event Counters */}
        <div className="grid grid-cols-4 gap-2 px-6 py-2.5 bg-slate-50 border-b border-slate-100 text-[11px] text-center">
          <div className="p-2 rounded-xl bg-white border border-slate-200">
            <span className="block text-slate-400 font-bold uppercase text-[9px]">Leads Saved</span>
            <span className="text-base font-black text-slate-900">{leads.length}</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200">
            <span className="block text-slate-400 font-bold uppercase text-[9px]">Form Submits</span>
            <span className="text-base font-black text-primary">{counts.form_submit || 0}</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200">
            <span className="block text-slate-400 font-bold uppercase text-[9px]">WhatsApp Clicks</span>
            <span className="text-base font-black text-green-600">{counts.whatsapp_click || 0}</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200">
            <span className="block text-slate-400 font-bold uppercase text-[9px]">Payment Clicks</span>
            <span className="text-base font-black text-amber-600">{counts.payment_click || 0}</span>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-100 text-xs">
          <span className="font-bold text-slate-700">
            Captured Leads List
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-colors disabled:opacity-40"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={handleClear}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold transition-colors disabled:opacity-40"
            >
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>

        {/* Leads List */}
        <div className="overflow-y-auto p-6 space-y-3 flex-1">
          {leads.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="font-semibold text-sm">No leads captured yet.</p>
              <p className="text-xs mt-1">When visitors submit any booking modal or contact form, they will appear here instantly.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">{lead.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
                      {lead.service}
                    </span>
                    {lead.budget && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                        {lead.budget}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                      <Phone size={13} className="text-emerald-600" /> {lead.phone}
                    </span>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 text-slate-600 hover:text-primary hover:underline">
                        <Mail size={13} /> {lead.email}
                      </a>
                    )}
                    {lead.linkedInUrl && (
                      <a 
                        href={lead.linkedInUrl.startsWith('http') ? lead.linkedInUrl : `https://${lead.linkedInUrl}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-[#0A66C2] font-semibold hover:underline"
                      >
                        <Linkedin size={13} /> Profile <ExternalLink size={10} />
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Calendar size={13} /> {new Date(lead.timestamp).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {lead.note && <p className="text-slate-600 italic bg-white/70 p-2 rounded-lg border border-slate-100">{lead.note}</p>}
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <a
                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20${encodeURIComponent(
                      lead.name
                    )}%2C%20thank%20you%20for%20contacting%20SmartScaleTech%20regarding%20${encodeURIComponent(
                      lead.service
                    )}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm"
                  >
                    WhatsApp <ArrowUpRight size={13} />
                  </a>

                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}?subject=Regarding%20your%20SmartScaleTech%20Service%20Request%20(${encodeURIComponent(lead.service)})`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold transition-all"
                    >
                      Email
                    </a>
                  )}

                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-all"
                  >
                    Call
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

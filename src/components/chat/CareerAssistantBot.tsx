import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  RefreshCw, 
  Minimize2, 
  Maximize2, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'init-1',
    role: 'model',
    text: `👋 Hi there! I'm your **SmartScale AI Advisor** from Hitech City, Hyderabad.\n\nAsk me about our **latest bundles (Career Starter ₹1,500 · Portfolio Launch ₹3,000 · Business Web ₹6,000)**, our **Custom Package Builder (save 10%–20%)**, or our **Free Career Tools** ([ATS & JD Match Checker](/free-ats-resume-checker), [Headline Generator](/linkedin-headline-generator), [60-Sec Readiness Audit](/job-readiness-audit))!\n\nTap a question below or type your own:`,
    timestamp: 'Just now',
  },
];

const SUGGESTIONS = [
  '💰 Latest bundles & prices?',
  '🧮 Build a custom discounted bundle',
  '🎯 Free ATS & JD Match Checker',
  '✍️ LinkedIn Headline Generator',
  '📊 Why no interview calls? (Audit)',
  '🎓 Final Year Projects & Portfolio',
  '⚡ Turnaround, samples & privacy',
  '📲 WhatsApp Vamshi (+91 90008 59695)',
];

const CALLOUT_DISMISSED_KEY = 'smartscale_advisor_callout_seen';

export const CareerAssistantBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLaunchCallout, setShowLaunchCallout] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('smartscale_bot_messages');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (
            Array.isArray(parsed) &&
            parsed.length > 0 &&
            parsed.every(
              (item) =>
                item &&
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                (item.role === 'user' || item.role === 'model') &&
                typeof item.text === 'string' &&
                typeof item.timestamp === 'string'
            )
          ) {
            return parsed;
          }
        } catch {
          sessionStorage.removeItem('smartscale_bot_messages');
        }
      }
    }
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadySeen = sessionStorage.getItem(CALLOUT_DISMISSED_KEY);
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setShowLaunchCallout(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('smartscale_bot_messages', JSON.stringify(messages));
      } catch (e) {
        console.error(e);
      }
    }
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  const dismissCallout = () => {
    setShowLaunchCallout(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CALLOUT_DISMISSED_KEY, '1');
    }
  };

  const openAdvisor = () => {
    dismissCallout();
    setIsOpen(true);
    setIsMinimized(false);
  };

  const getLocalFallbackReply = (textToSend: string): string => {
    const q = textToSend.toLowerCase();
    if (q.includes('headline') || q.includes('about section')) {
      return `Use our **[Free LinkedIn & Naukri Headline Generator](/linkedin-headline-generator)** to create 4 recruiter-searchable headlines (under 220 chars) plus a matching About section in seconds.\n\nFor a full done-for-you LinkedIn makeover + custom tech banner, it's **₹499** standalone or included in **Career Starter (₹1,500)**!`;
    }
    if (q.includes('readiness') || q.includes('audit') || q.includes('no interview') || q.includes('not getting') || q.includes('callback')) {
      return `Not getting callbacks? Run our **[60-Second Job Readiness Audit](/job-readiness-audit)**.\n\nIt scores your resume ATS format, STAR impact metrics, LinkedIn visibility, Naukri strength, GitHub/portfolio proof, and interview prep on a 0–100 scale and pinpoints your #1 bottleneck.`;
    }
    if (q.includes('bundle') || q.includes('custom') || q.includes('calculator') || q.includes('discount') || q.includes('estimator')) {
      return `Build your own bundle on the **[Custom Package Builder](/custom-package-builder)** and unlock automatic savings:\n\n• **2 Services**: **10% off**\n• **3–4 Services**: **15% off**\n• **5+ Services**: **20% off**\n\nOr pick an official bundle: **Career Starter (₹1,500)**, **Portfolio Launch (₹3,000)**, or **Business Web (₹6,000)**.`;
    }
    if (q.includes('final year') || q.includes('b.tech') || q.includes('m.tech') || q.includes('mca') || q.includes('viva') || q.includes('college project')) {
      return `Our **Final Year Projects (₹2,999)** support B.Tech, M.Tech & MCA students across Python, Java, MERN, Cloud & AI/ML.\n\nIncludes working source code, database design, university-formatted report, PPT deck, cloud demo deployment, and viva Q&A prep. Explore domain ideas on **[Final Year Projects](/final-year-projects)**!`;
    }
    if (q.includes('portfolio') || q.includes('website') || q.includes('web dev') || q.includes('business web') || q.includes('saas') || q.includes('api') || q.includes('devops') || q.includes('ai integration')) {
      return `Latest web & tech packages:\n\n• **Portfolio Website**: ₹1,999 standalone (or **₹3,000** in **Portfolio Launch** with ATS Resume + LinkedIn + GitHub)\n• **Business Web + SEO Bundle**: **₹6,000** *(Save ₹998 off ₹6,998 — 5 custom pages, WhatsApp leads, Search Console & free cloud hosting)*\n• **Tech Add-ons**: UI/UX Design (₹2,499), API Development (₹2,499), Cloud/DevOps CI/CD (₹1,999), AI Chatbot Integration (₹2,999)\n\nCustomize on the **[Custom Package Builder](/custom-package-builder)**!`;
    }
    if (q.includes('naukri') || q.includes('github') || q.includes('interview') || q.includes('salary') || q.includes('cover letter')) {
      return `Individual career upgrades available anytime:\n\n• **Role-Tailored Cover Letter**: ₹299\n• **GitHub README & Repo Audit**: ₹399\n• **Naukri & Indeed Optimization**: ₹499 (96–98% profile strength)\n• **1-on-1 Mock Interview Coaching**: ₹499 (45-min technical/HR mock)\n• **Salary & Offer Negotiation Strategy**: ₹499\n\nPick 2+ in the **[Custom Package Builder](/custom-package-builder)** to save 10%–20%!`;
    }
    if (q.includes('request') || q.includes('form') || q.includes('proposal')) {
      return `Submit your exact requirement via our **[Service Proposal Request Form](/request-service)** (₹0 upfront).\n\nYour request goes straight to founder Vamshi on WhatsApp (+91 90008 59695) and email (smartscaletechforyou@gmail.com) for a **5-minute reply**!`;
    }
    if (q.includes('whatsapp') || q.includes('contact') || q.includes('call') || q.includes('phone') || q.includes('reach') || q.includes('number') || q.includes('password') || q.includes('privacy') || q.includes('confidential')) {
      return `Chat directly with founder Vamshi on WhatsApp at **+91 90008 59695** (replies in **~5 minutes**).\n\n🔒 **100% Confidential**: We never ask for your LinkedIn, Naukri, or GitHub passwords—we deliver ready-to-paste copy and full source code directly to you.`;
    }
    if (q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('package')) {
      return `Latest official bundle prices (with built-in bundle discounts):\n\n• **Career Starter**: **₹1,500** *(Save ₹396 off ₹1,896 — ATS Resume + LinkedIn + Naukri + GitHub)*\n• **Portfolio Launch (Popular)**: **₹3,000** *(Save ₹396 off ₹3,396 — Portfolio Site + ATS Resume + LinkedIn + GitHub + Free Hosting)*\n• **Business Web + SEO**: **₹6,000** *(Save ₹998 off ₹6,998 — 5 Pages + Search Console + WhatsApp Capture)*\n\nSingle services start from **₹299–₹499**, or mix any services in our **[Custom Package Builder](/custom-package-builder)** for up to **20% off**!`;
    }
    if (q.includes('turnaround') || q.includes('time') || q.includes('deliver') || q.includes('fast') || q.includes('revision') || q.includes('sample')) {
      return `• **Resumes, LinkedIn, Naukri & GitHub**: **24–48 hours** (express option available)\n• **Portfolio & Business Sites**: **3–7 days**\n• **Revisions**: Unlimited revisions until you're 100% confident\n\nYou can preview a real 97/100 Python Developer resume sample on the homepage or message us on WhatsApp (+91 90008 59695)!`;
    }
    if (/\bats\b/i.test(q) || q.includes('workday') || q.includes('greenhouse') || q.includes('score') || q.includes('jd') || q.includes('checker')) {
      return `Our **[Free ATS Resume & JD Match Checker](/free-ats-resume-checker)** now supports two modes:\n\n• **Role Benchmark Scan**: Checks keywords, STAR metrics & sections across 9 tech roles\n• **Resume vs. Job Description Match**: Paste any job posting to see exact matching & missing skills before you apply!\n\nOur done-for-you ATS resumes target **97–98/100** compatibility.`;
    }
    return `SmartScaleTech helps candidates and businesses stand out with ATS-verified resumes, LinkedIn & Naukri upgrades, portfolios, and custom web apps.\n\nExplore our **[Free ATS Checker](/free-ats-resume-checker)**, **[Headline Generator](/linkedin-headline-generator)**, **[Job Readiness Audit](/job-readiness-audit)**, or **[Custom Package Builder](/custom-package-builder)**—or chat with Vamshi on WhatsApp (+91 90008 59695)!`;
  };

  const handleSendMessage = async (userPrompt?: string) => {
    const textToSend = userPrompt || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'model',
        text: data.reply || getLocalFallbackReply(userMsg.text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'model',
        text: getLocalFallbackReply(userMsg.text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('smartscale_bot_messages');
  };

  const renderInlineSegment = (segment: string, keyPrefix: string): React.ReactNode => {
    // Parse safe internal markdown links [Label](/path)
    const linkParts = segment.split(/(\[[^\]]+\]\(\/[a-zA-Z0-9\-\/#]*\))/g);
    return linkParts.map((part, idx) => {
      const match = part.match(/^\[([^\]]+)\]\((\/[a-zA-Z0-9\-\/#]*)\)$/);
      if (match) {
        return (
          <Link
            key={`${keyPrefix}-${idx}`}
            to={match[2]}
            onClick={() => setIsOpen(false)}
            className="text-primary hover:underline font-bold"
          >
            {match[1]}
          </Link>
        );
      }
      return part;
    });
  };

  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
      const isBullet = line.startsWith('• ') || line.startsWith('- ');
      const content = isBullet ? line.slice(2) : line;

      const boldParts = content.split(/(\*\*[^*]+\*\*)/g);
      const renderedLine = boldParts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-black text-slate-900">
              {renderInlineSegment(part.slice(2, -2), `${lIdx}-${pIdx}`)}
            </strong>
          );
        }
        return (
          <React.Fragment key={pIdx}>
            {renderInlineSegment(part, `${lIdx}-${pIdx}`)}
          </React.Fragment>
        );
      });

      if (isBullet) {
        return (
          <div key={lIdx} className="flex items-start gap-1.5 my-1">
            <span className="text-primary font-bold">•</span>
            <span>{renderedLine}</span>
          </div>
        );
      }
      return (
        <p key={lIdx} className={line.trim() === '' ? 'h-2' : 'my-1'}>
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Highlighted Floating Trigger + Launch Spotlight */}
      {!isOpen && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-2.5 max-w-[calc(100vw-5.5rem)]">
          {/* Launch Welcome Callout Bubble */}
          {showLaunchCallout && (
            <div className="relative bg-slate-900 text-white rounded-2xl p-3.5 pr-8 shadow-2xl border border-indigo-400/40 max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300">
              <button
                type="button"
                onClick={dismissCallout}
                aria-label="Dismiss SmartScale AI Advisor notice"
                className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={13} />
              </button>
              <button
                type="button"
                onClick={openAdvisor}
                className="text-left group cursor-pointer block w-full"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300 mb-1">
                  <Sparkles size={11} /> SmartScale AI Advisor
                </div>
                <p className="text-xs font-semibold text-slate-100 leading-snug">
                  Ask about latest bundles, free ATS &amp; JD checker, or custom 20% discounts!
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 group-hover:underline">
                  Chat instantly <ArrowRight size={11} />
                </span>
              </button>
              <span className="absolute -bottom-1.5 left-7 w-3 h-3 bg-slate-900 border-r border-b border-indigo-400/40 rotate-45" />
            </div>
          )}

          {/* Highlighted Trigger Button */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-linear-to-r from-primary via-amber-400 to-indigo-500 opacity-60 blur-md animate-pulse pointer-events-none"
            />
            <button
              type="button"
              onClick={openAdvisor}
              className="relative group flex items-center gap-3 bg-linear-to-r from-slate-900 via-primary to-indigo-600 hover:from-primary hover:to-indigo-700 text-white pl-3.5 pr-4.5 py-3 rounded-full shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/40 ring-2 ring-amber-300/60 cursor-pointer"
              aria-label="Open SmartScale AI Advisor"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-900" />
                </span>
              </div>

              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span>SmartScale AI Advisor</span>
                  <Sparkles size={12} className="text-amber-300 animate-pulse" />
                </div>
                <div className="text-[10px] text-amber-100 font-semibold flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-black uppercase text-[9px]">
                    Free
                  </span>
                  <span>Ask Pricing, ATS &amp; Tools</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-50 flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 transition-all duration-300 overflow-hidden ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-[calc(100vw-2rem)] sm:w-[420px] h-[590px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
                  <Bot size={20} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full" />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5">
                  SmartScale AI Advisor
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-md">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-300">
                  Hitech City, Hyderabad • Instant Answers 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Restart chat"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body when expanded */}
          {!isMinimized && (
            <>
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60">
                {messages.map((m) => {
                  const isUser = m.role === 'user';

                  return (
                    <div 
                      key={m.id} 
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isUser 
                            ? 'bg-primary text-white rounded-br-xs' 
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{m.text}</p>
                        ) : (
                          <div>
                            {renderFormattedText(m.text)}
                            
                            {/* Action footer on bot messages */}
                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                              <span className="text-[10px]">{m.timestamp}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCopyText(m.id, m.text)}
                                  className="hover:text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                                  title="Copy message"
                                >
                                  {copiedId === m.id ? (
                                    <>
                                      <Check size={12} className="text-emerald-500" />
                                      <span className="text-emerald-500 font-bold">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                                
                                <a 
                                  href="https://wa.me/919000859695" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-0.5"
                                >
                                  <MessageCircle size={12} /> WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 bg-white border border-slate-200 rounded-xl w-fit">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span>SmartScale AI Advisor is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Question Chips */}
              <div className="px-3.5 py-2.5 bg-slate-100/80 border-t border-slate-200/60 overflow-x-auto flex gap-1.5 no-scrollbar">
                {SUGGESTIONS.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => handleSendMessage(sug)}
                    disabled={isLoading}
                    className="whitespace-nowrap text-[11px] font-semibold bg-white hover:bg-primary hover:text-white text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    maxLength={1500}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about bundles, ATS checker, or services..."
                    className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-primary focus:outline-hidden transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-primary/20 shrink-0 cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
                  <span>5-min WhatsApp reply (+91 90008 59695)</span>
                  <div className="flex items-center gap-2.5">
                    <Link
                      to="/custom-package-builder"
                      onClick={() => setIsOpen(false)}
                      className="text-slate-600 hover:text-primary font-bold"
                    >
                      Bundle Builder
                    </Link>
                    <Link
                      to="/free-ats-resume-checker"
                      onClick={() => setIsOpen(false)}
                      className="text-primary hover:underline font-bold"
                    >
                      Free ATS Checker
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

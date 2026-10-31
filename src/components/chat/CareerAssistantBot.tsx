import React, { useState, useRef, useEffect } from 'react';
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
  ExternalLink,
  ChevronDown
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
    text: `👋 Hi there! I'm the **SmartScaleTech Career AI Advisor** from Hitech City, Hyderabad.\n\nWhether you need an **ATS-friendly resume (scoring 97–98/100)**, **LinkedIn optimization**, or quick advice on tech jobs and pricing, I'm here to help!\n\nWhat can I assist you with today?`,
    timestamp: 'Just now',
  },
];

const SUGGESTIONS = [
  '💰 What are your packages & prices?',
  '🎯 How do you make resumes score 98% on ATS?',
  '⚡ What is the turnaround time?',
  '📲 Connect on WhatsApp (+91 99896 90518)',
];

export const CareerAssistantBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('smartscale_bot_messages');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
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
      // Call backend proxy route
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
        text: data.reply || 'I am ready to help you optimize your resume. Please feel free to ask any question or connect on WhatsApp!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('API route call error, using local assistant fallback:', err);
      // Seamless local domain fallback
      const q = textToSend.toLowerCase();
      let fallbackText = '';
      if (q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('package')) {
        fallbackText = `Here is our transparent fixed pricing:\n\n• **Freshers ATS Resume**: ₹399 (24-hr turnaround, single column)\n• **Working Pro ATS Resume (1-5 yrs)**: ₹699 (Workday/Greenhouse compliant)\n• **Senior / Tech Lead (5+ yrs)**: ₹1,199 (Executive framing & metrics)\n• **LinkedIn Profile Makeover**: ₹599 (5x search boost)\n• **Career Launch Combo**: ₹1,499 (Resume + LinkedIn + Cover Letter)\n\nAll packages guarantee a **95–98/100 ATS pass score**.`;
      } else if (q.includes('turnaround') || q.includes('time') || q.includes('deliver') || q.includes('fast')) {
        fallbackText = `Our turnaround time is **24 to 48 hours**. For urgent requirements, same-day delivery is available upon request!`;
      } else if (q.includes('ats') || q.includes('workday') || q.includes('greenhouse') || q.includes('score')) {
        fallbackText = `We design resumes to pass applicant tracking systems like Workday, Greenhouse, Taleo, and Darwinbox with a benchmark score of **97–98/100** by using clean single-column structure, standard section headers, and high-density role keywords.`;
      } else if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone') || q.includes('reach')) {
        fallbackText = `You can chat directly with founder Vamshi on WhatsApp at **+91 99896 90518**.\n\n⚡ We reply within **5 minutes**!`;
      } else {
        fallbackText = `Thanks for reaching out! SmartScaleTech helps candidates get more interview calls through ATS-optimized resumes (98/100 score) and LinkedIn profile makeovers. Feel free to ask about our packages or message us directly on WhatsApp (+91 99896 90518)!`;
      }

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'model',
        text: fallbackText,
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

  // Helper to format simple markdown-like text
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
      // Process bold markers (**text**)
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.startsWith('• ') || line.startsWith('- ')) {
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
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 group flex items-center gap-3 bg-linear-to-r from-primary to-indigo-600 hover:from-primary-hover hover:to-indigo-700 text-white pl-3.5 pr-4.5 py-3 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
          aria-label="Open SmartScale AI Advisor"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-primary rounded-full animate-pulse" />
          </div>

          <div className="text-left">
            <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <span>SmartScale AI</span>
              <Sparkles size={11} className="text-amber-300" />
            </div>
            <div className="text-[10px] text-white/80 font-medium">
              Instant Career Advice
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-50 flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 transition-all duration-300 overflow-hidden ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh]'
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
                  Hitech City, Hyderabad • Replies 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors"
                title="Restart chat"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors"
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
                                  className="hover:text-slate-700 flex items-center gap-1 transition-colors"
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
                    <span>SmartScale AI is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions row if few messages */}
              {messages.length <= 3 && (
                <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 overflow-x-auto flex gap-1.5 no-scrollbar">
                  {SUGGESTIONS.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      className="whitespace-nowrap text-[11px] font-semibold bg-white hover:bg-primary hover:text-white text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-2xs"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}

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
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about ATS resumes, pricing, or turnaround..."
                    className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-primary focus:outline-hidden transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-primary/20 shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
                  <span>Guaranteed 5-min WhatsApp response (+91 99896 90518)</span>
                  <a href="/dashboard" className="text-primary hover:underline font-bold">
                    View Progress Tracker
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  MessageCircle,
  RefreshCw,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'init-1',
    role: 'model',
    text: `Welcome to **SmartScale Studio Advisor**.\n\nExplore our services:\n1. **Business Solutions**: [Website Development](/services/web-development), [UI/UX Design](/services/ui-ux-design), and [AI Integrations](/services/ai-integrations).\n2. **Career Solutions**: [ATS Resume Writing](/services/resume-writing), [LinkedIn Optimization](/services/linkedin-optimization), and [Custom Bundle Builder](/custom-package-builder).\n\nPick a prompt below or ask your question directly:`,
    timestamp: 'Just now',
  },
];

const SUGGESTIONS = [
  'Which service is right for me?',
  'How much does a website cost?',
  'Can you improve my resume?',
  'How do I build a service bundle?',
  'What AI integration services do you offer?',
];

export const CareerAssistantBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('smartscale_bot_messages_v2');
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
          sessionStorage.removeItem('smartscale_bot_messages_v2');
        }
      }
    }
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('smartscale_bot_messages_v2', JSON.stringify(messages));
      } catch {
        // Ignore storage quota errors
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
      }, 120);
    }
  }, [isOpen, isMinimized]);

  const getLocalFallbackReply = (textToSend: string): string => {
    const q = textToSend.toLowerCase();

    if (q.includes('right for me') || q.includes('which service')) {
      return `We serve two clear tracks:\n\n• **Businesses & Startups**: Explore [Website Development](/services/web-development), [UI/UX Design](/services/ui-ux-design), or [AI Integrations](/services/ai-integrations) for custom React/TypeScript products.\n• **Professionals & Graduates**: Start with our [Free ATS Checker](/free-ats-resume-checker), [ATS Resume Writing](/services/resume-writing), or [Final Year Projects](/final-year-projects).\n\nTell me your current goal or [Request a Free Proposal](/request-service)!`;
    }

    if (q.includes('ai integration') || q.includes('automation') || q.includes('chatbot')) {
      return `Our **[AI Workflow & Chatbot Integration](/services/ai-integrations)** starts at ~~₹7,999~~ **₹6,399** (save **₹1,600**) in the Exclusive Startup Launch Offer.\n\nWe connect custom knowledge assistants, automated inquiry routing, and structured LLM APIs safely behind server-side endpoints with clean UI controls. [Discuss AI Integration](/request-service) directly!`;
    }

    if (q.includes('website') || q.includes('web dev') || q.includes('how much') || q.includes('cost')) {
      return `Transparent website pricing:\n\n• **Portfolio Website**: ~~₹2,999~~ **₹2,399** (save **₹600**), or **Portfolio Launch** bundle: ~~₹2,246~~ **₹1,999** (save **₹247**).\n• **Business Website**: Starting from ~~₹9,999~~ **₹7,999** (save **₹2,000**); the **Business Web** bundle is ~~₹5,498~~ **₹4,999** (save **₹499**).\n\nExplore [Website Development](/services/web-development) or configure add-ons in the [Custom Bundle Builder](/custom-package-builder).`;
    }

    if (q.includes('improve my resume') || q.includes('resume') || /\bats\b/i.test(q)) {
      return `Yes. You can inspect your current draft right now in our **[Free ATS Resume & JD Checker](/free-ats-resume-checker)**.\n\nFor a full expert rewrite, **[ATS Resume Writing](/services/resume-writing)** is ~~₹299~~ **₹239** (save **₹60**; 24–48h turnaround, editable Word + PDF, single-column Workday/Naukri structure) or is included in **Career Starter** (~~₹1,046~~ **₹899**, save **₹147**).`;
    }

    if (q.includes('bundle') || q.includes('custom') || q.includes('discount') || q.includes('package')) {
      return `Open the 6-step **[Custom Package Builder](/custom-package-builder)** to select only what you need:\n\n• **2 Services**: Automatic **10% off**\n• **3–4 Services**: Automatic **15% off**\n• **5+ Services**: Automatic **20% off**\n\nOr pick a fixed bundle: **Career Starter** (~~₹1,046~~ ₹899, save ₹147), **Portfolio Launch** (~~₹2,246~~ ₹1,999, save ₹247), or **Business Web** (~~₹5,498~~ ₹4,999, save ₹499).`;
    }

    if (q.includes('linkedin') || q.includes('headline')) {
      return `Test our **[LinkedIn Headline Generator](/linkedin-headline-generator)** free, or book a full **[LinkedIn Profile Optimization](/services/linkedin-optimization)** for ~~₹399~~ **₹319** (save **₹80**), delivered ready-to-paste without needing account passwords.`;
    }

    if (q.includes('final year') || q.includes('student') || q.includes('project')) {
      return `Explore **[Final Year Projects](/final-year-projects)**, starting from ~~₹4,999~~ **₹3,999** (save **₹1,000**), with working source code, IEEE-aligned report documentation, presentation slides, cloud demo, and 1-on-1 viva walkthrough.`;
    }

    return `Ask about **[Website Development](/services/web-development)**, **[ATS Resume Writing](/services/resume-writing)**, **[AI Integrations](/services/ai-integrations)**, or use our **[Custom Bundle Builder](/custom-package-builder)**.\n\nFor direct scoping, message founder Vamshi on WhatsApp (+91 90008 59695) or [Request a Proposal](/request-service).`;
  };

  const handleSendMessage = async (userPrompt?: string) => {
    const textToSend = (userPrompt ?? inputValue).trim();
    if (!textToSend || isLoading) return;

    setLastFailedPrompt(null);
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
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
      setLastFailedPrompt(textToSend);
      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'model',
        isFallback: true,
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
    setLastFailedPrompt(null);
    sessionStorage.removeItem('smartscale_bot_messages_v2');
  };

  const renderInlineSegment = (segment: string, keyPrefix: string): React.ReactNode => {
    const linkParts = segment.split(/(\[[^\]]+\]\(\/[a-zA-Z0-9\-\/#]*\))/g);
    return linkParts.map((part, idx) => {
      const match = part.match(/^\[([^\]]+)\]\((\/[a-zA-Z0-9\-\/#]*)\)$/);
      if (match) {
        return (
          <Link
            key={`${keyPrefix}-${idx}`}
            to={match[2]}
            onClick={() => setIsOpen(false)}
            className="text-[#D9541E] hover:underline font-bold"
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
    let listIndex = 0;
    return lines.map((line, lIdx) => {
      const listMatch = line.match(/^(?:([0-9]+)[.)]\s+|[•-]\s+)/);
      const isListItem = Boolean(listMatch);
      const listNumber = listMatch?.[1] ? Number(listMatch[1]) : listIndex + 1;
      const content = isListItem ? line.slice(listMatch[0].length) : line;

      if (isListItem) {
        listIndex = listNumber;
      } else {
        listIndex = 0;
      }

      const boldParts = content.split(/(\*\*[^*]+\*\*)/g);
      const renderedLine = boldParts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-carbon">
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

      if (isListItem) {
        return (
          <div key={lIdx} className="flex items-start gap-1.5 my-1">
            <span className="min-w-[1.25rem] text-[#D9541E] font-bold">{listNumber}.</span>
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
      {/* Restrained editorial launcher bottom-left */}
      {!isOpen && (
        <div className="fixed bottom-16 left-4 sm:left-6 z-40">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="advisor-glow flex items-center gap-2.5 bg-dark-surface hover:bg-[#D9541E] text-white px-4 py-2.5 rounded-xl border border-white/15 transition-colors cursor-pointer"
            aria-label="Open SmartScale Studio Advisor"
          >
            <MessageSquare size={16} />
            <span className="text-xs font-bold tracking-tight">SST Chat Bot</span>
          </button>
        </div>
      )}

      {/* Advisor Drawer / Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SmartScale Studio Advisor"
          className={`fixed left-4 sm:left-6 bottom-16 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-border-hairline overflow-hidden transition-all duration-200 ${
            isMinimized
              ? 'w-72 h-14'
              : 'w-[calc(100vw-2rem)] sm:w-100 h-135 max-h-[78vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-dark-surface text-white shrink-0">
            <div>
              <h3 className="font-extrabold text-sm">SmartScale Studio Advisor</h3>
              {!isMinimized && (
                <p className="text-[11px] text-white/65">
                  Hitech City · Scope, Pricing &amp; Tool Guide
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 text-white/70">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Close advisor"
                aria-label="Close advisor"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-cream/45">
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[90%] rounded-xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                          isUser
                            ? 'bg-carbon text-white'
                            : 'bg-white text-muted-accessible border border-border-hairline'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{m.text}</p>
                        ) : (
                          <div>
                            {renderFormattedText(m.text)}
                            <div className="mt-2.5 pt-2 border-t border-cream-subtle flex items-center justify-between text-[11px] text-muted">
                              <span>{m.timestamp}</span>
                              <div className="flex items-center gap-3">
                                {m.isFallback && lastFailedPrompt && (
                                  <button
                                    type="button"
                                    onClick={() => handleSendMessage(lastFailedPrompt)}
                                    className="inline-flex items-center gap-1 text-[#D9541E] font-semibold hover:underline cursor-pointer"
                                  >
                                    <RotateCcw size={11} /> Retry live reply
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleCopyText(m.id, m.text)}
                                  className="hover:text-carbon inline-flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedId === m.id ? (
                                    <>
                                      <Check size={11} className="text-success" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={11} /> Copy
                                    </>
                                  )}
                                </button>
                                <a
                                  href="https://wa.me/919000859695"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="whatsapp-glow rounded-md px-1.5 py-1 text-success font-semibold hover:underline inline-flex items-center gap-1"
                                >
                                  <MessageCircle size={11} /> WhatsApp
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
                  <div className="flex items-center gap-2 text-muted-accessible text-xs py-2 px-3 bg-white border border-border-hairline rounded-xl w-fit">
                    <span className="h-2 w-2 rounded-full bg-[#D9541E] animate-pulse" />
                    <span>Thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Chips */}
              <div className="px-3.5 py-2.5 bg-cream-subtle/70 border-t border-border-hairline overflow-x-auto flex gap-1.5 no-scrollbar">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleSendMessage(sug)}
                    disabled={isLoading}
                    className="whitespace-nowrap text-[11px] font-semibold bg-white hover:bg-carbon hover:text-white text-carbon px-3 py-1.5 rounded-lg border border-border-hairline transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-border-hairline">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    maxLength={1500}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about services, pricing, or ATS tools..."
                    className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-cream/45 border border-border-hairline focus:bg-white focus:border-carbon focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-[#D9541E] hover:bg-primary-dark text-white disabled:opacity-40 cursor-pointer transition-colors shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={15} />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-muted-accessible">
                  <Link
                    to="/request-service"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#D9541E] font-semibold"
                  >
                    Request Free Proposal
                  </Link>
                  <Link
                    to="/custom-package-builder"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#D9541E] font-semibold"
                  >
                    Bundle Builder
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

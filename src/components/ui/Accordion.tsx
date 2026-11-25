import React, { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItemData {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div className="divide-y divide-[#D8D3C9] border-y border-[#D8D3C9]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const triggerId = `${baseId}-trigger-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div key={item.id || item.question} className="py-1">
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9541E] rounded-lg px-1"
            >
              <span
                className={`text-sm sm:text-base font-bold transition-colors ${
                  isOpen ? 'text-[#D9541E]' : 'text-[#111111] group-hover:text-[#D9541E]'
                }`}
              >
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`h-7 w-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? 'bg-[#111111] border-[#111111] text-white'
                    : 'bg-white border-[#D8D3C9] text-[#57534E]'
                }`}
              >
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="pb-5 px-1 text-sm leading-relaxed text-[#57534E]"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#57534E]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              {idx > 0 && (
                <li aria-hidden="true" className="text-[#9E988C]">
                  <ChevronRight size={13} />
                </li>
              )}
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="hover:text-[#111111] transition-colors underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#111111] font-semibold' : ''}>
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

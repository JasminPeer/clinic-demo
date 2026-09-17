import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { api } from '../../services/api';

export const FaqAccordion = ({ limit = 6 }) => {
  const [faqs, setFaqs] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    api.getFaqs().then(data => setFaqs(data || []));
  }, []);

  const displayList = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-none">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Clear Answers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Everything you need to know about clinic visits, tests, appointments, and doctors.
        </p>
      </div>

      <div className="space-y-3">
        {displayList.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-white border-brand-300 shadow-sm' : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-800' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

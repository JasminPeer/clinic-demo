import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Appointments', 'Doctors', 'Diagnostics', 'Reports', 'Payments', 'Clinic Visits', 'Health Information'];

export const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    api.getFaqs({ category }).then((data) => setFaqs(data || []));
  }, [category]);

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Patient Support Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Clear, upfront answers regarding appointments, fees, diagnostic testing, home collection, and doctor consultations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setOpenIdx(0); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              category === cat
                ? 'bg-brand-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3">
        {filtered.map((faq, idx) => {
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
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase text-brand-700 tracking-wider">
                    {faq.category}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </div>
                </div>
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
    </div>
  );
};

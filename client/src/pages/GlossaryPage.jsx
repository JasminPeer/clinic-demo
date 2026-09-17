import React, { useState, useEffect } from 'react';
import { Search, BookA, ArrowRight, Stethoscope } from 'lucide-react';
import { api } from '../services/api';

const ALPHABET = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export const GlossaryPage = () => {
  const [terms, setTerms] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getGlossary({ letter: selectedLetter, search }).then((data) => {
      setTerms(data || []);
      setLoading(false);
    });
  }, [selectedLetter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <BookA className="w-3.5 h-3.5" />
          <span>Health Literacy & Understanding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Medical Terms, Explained Simply
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Demystifying complex clinical vocabulary so you can understand lab reports, doctor recommendations, and health literature with confidence.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medical term or concept (e.g. CBC, Hypertension, HbA1c, Biopsy)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </div>
      </div>

      {/* A-Z Alphabet Filter Row */}
      <div className="bg-white rounded-2xl p-2 sm:p-3 border border-slate-200 shadow-xs mb-8 flex flex-wrap items-center justify-center gap-1 text-xs">
        {ALPHABET.map((char) => (
          <button
            key={char}
            onClick={() => setSelectedLetter(char)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-bold transition-all ${
              selectedLetter === char
                ? 'bg-brand-800 text-white shadow-xs scale-110'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Terms Grid */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">
        <span>Displaying {terms.length} Terms</span>
        <span>Filter: {selectedLetter}</span>
      </div>

      {terms.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
          <p className="font-bold text-slate-800">No glossary terms found matching "{search || selectedLetter}"</p>
          <button
            onClick={() => { setSelectedLetter('All'); setSearch(''); }}
            className="mt-3 px-4 py-2 rounded-xl bg-brand-50 text-brand-800 font-bold text-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {item.term}
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-800 border border-brand-100">
                  {item.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.simpleDefinition}
              </p>

              {item.clinicalContext && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
                  <strong className="text-slate-700">Clinical Context: </strong>
                  {item.clinicalContext}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

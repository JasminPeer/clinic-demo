import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Microscope, Clock, Home, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Blood Tests', 'Urine Tests', 'Imaging', 'Cardiac Tests', 'Diabetes Tests', 'Hormone Tests', 'Preventive Screening'];

export const DiagnosticsPage = () => {
  const [tests, setTests] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDiagnostics({ category, search }).then((data) => {
      setTests(data || []);
      setLoading(false);
    });
  }, [category, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md mb-2">
          <Microscope className="w-3.5 h-3.5" />
          <span>Diagnostic Laboratory & Imaging</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Diagnostics & Pathology Tests
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          NABL-standard automated testing, digital radiography, sonography, and fast home blood sample collection across Kanchipuram.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search test name or organ (e.g. CBC, Lipid Profile, Thyroid, ECG, Ultrasound)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                category === cat
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test.slug}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {test.category}
                </span>
                {test.homeSampleOption && (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <Home className="w-3 h-3" /> Home Collection
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-1">
                <Link to={`/diagnostics/${test.slug}`} className="hover:text-brand-800 transition-colors">
                  {test.name}
                </Link>
              </h2>

              <p className="text-xs text-brand-700 font-medium mb-2">{test.tagline}</p>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{test.description}</p>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div><strong className="text-slate-700">Checks: </strong>{test.whatItChecks}</div>
                <div><strong className="text-slate-700">Preparation: </strong>{test.preparation}</div>
                <div className="flex items-center gap-1 text-slate-500 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Report ready in: <strong>{test.reportTime}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-brand-900">{test.demoPrice}</span>
                <span className="text-[10px] text-slate-400 block -mt-1">*demo rate</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/diagnostics/${test.slug}`}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                >
                  Details
                </Link>
                <Link
                  to={`/appointments?test=${test.slug}`}
                  className="px-4 py-1.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold shadow-xs"
                >
                  Book Test
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

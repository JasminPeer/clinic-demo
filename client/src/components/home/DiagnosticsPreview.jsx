import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Clock, Home, ArrowRight, Check } from 'lucide-react';
import { api } from '../../services/api';

export const DiagnosticsPreview = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.getDiagnostics().then(data => setTests(data || []));
  }, []);

  return (
    <section className="bg-slate-100/70 py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md mb-2">
              <span>NABL Standard Testing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Diagnostic Lab & Digital Imaging
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              High-precision automated pathology, quick report delivery, and home sample collection across Kanchipuram.
            </p>
          </div>

          <Link
            to="/diagnostics"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-900 hover:underline shrink-0"
          >
            <span>Explore All Tests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.slice(0, 6).map((test) => (
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

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  <Link to={`/diagnostics/${test.slug}`} className="hover:text-brand-800 transition-colors">
                    {test.name}
                  </Link>
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {test.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <strong className="font-semibold text-slate-700">Checks:</strong>
                    <span className="line-clamp-1">{test.whatItChecks}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Report in: <strong>{test.reportTime}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-brand-900">{test.demoPrice}</span>
                  <span className="text-[10px] text-slate-400 block -mt-1">*demo rate</span>
                </div>

                <Link
                  to={`/appointments?test=${test.slug}`}
                  className="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Book Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

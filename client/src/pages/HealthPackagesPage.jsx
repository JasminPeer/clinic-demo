import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { api } from '../services/api';

export const HealthPackagesPage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api.getPackages().then(data => setPackages(data || []));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Preventive Healthcare Packages</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Comprehensive Health Screening Packages
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          CareSphere preventive checkups tailored for women, seniors, heart health, diabetes, and complete master health screening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.slug}
            className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              pkg.popular
                ? 'bg-gradient-to-b from-brand-50/70 to-white border-brand-300 shadow-md ring-1 ring-brand-300/40'
                : 'bg-white border-slate-200/80 shadow-soft hover:shadow-card-hover'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-brand-800 uppercase tracking-wide">
                  {pkg.testCount} Tests Included
                </span>
                {pkg.popular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-800 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-300" /> Recommended
                  </span>
                )}
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                <Link to={`/health-packages/${pkg.slug}`}>{pkg.title}</Link>
              </h2>
              <p className="text-xs text-brand-700 font-semibold mb-2">{pkg.tagline}</p>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{pkg.description}</p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                <strong className="text-slate-700">Ideal For: </strong>
                <span className="text-slate-600">{pkg.idealFor}</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Included Parameters:</div>
                {pkg.testsIncluded.slice(0, 5).map((test, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{test}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <div className="text-2xl font-black text-brand-900 tracking-tight">{pkg.demoPrice}</div>
                <div className="text-[11px] text-slate-400 line-through">{pkg.originalPrice}</div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/health-packages/${pkg.slug}`}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
                >
                  View Details
                </Link>
                <Link
                  to={`/appointments?package=${pkg.slug}`}
                  className="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-xs"
                >
                  Book Package
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
